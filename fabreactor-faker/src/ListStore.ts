import { FabreactorView, FabreactorResultPage, FabreactorQuery, FabreactorItemProperties, FabreactorNewItemResult } from "fabreactor";
import * as faker from 'faker';
import { of } from "rxjs";
import { delay, map } from "rxjs/operators";
import FabreactorDataRepository from "./DataRepository";

export default class FabreactorListStore {

    data: FabreactorDataRepository;
    views: FabreactorView[] = [];

    itemProperties: FabreactorItemProperties = {
        title: "name",
        description: "jobTitle",
        secondaryDescription: "jobType",
        color: "color",
        key: "id"
    }

    constructor(private itemCount: number = 1000, private itemsPerPage: number = 200) {
        this.data = new FabreactorDataRepository(this.itemCount);
        this.initViews();
        
    }

    private arrayToPage = (array: any[], page: number) => {
        
        const startPosition = (page - 1) * this.itemsPerPage;
        return array.slice(startPosition, (startPosition + this.itemsPerPage));
    }

    public onGetView = (query: FabreactorQuery): Promise<FabreactorResultPage> => {
        return of(this.arrayToPage(this.data.items, query.page)).pipe(delay(500), map(y => {
            return {
                items: y,
                page: query.page,
                totalPages: this.data.items.length / this.itemsPerPage
            };
        })).toPromise();
    }

    public onDeleteItem = (itemId: string): Promise<boolean> => {
        const deleteItem = faker.random.number(100) < 80;

        if (deleteItem) {
            this.data.items = this.data.items.filter(t => t.id != itemId);
        }

        return of(deleteItem)
            .pipe(delay(500))
            .toPromise();
    }

    public onNewItem = (): Promise<FabreactorNewItemResult> => {
        const newItem = {
            item: this.data.newItem(),
            fields: this.data.fields
        };

        return of(newItem)
            .pipe(delay(500))
            .toPromise();
    }

    public onSearch = (query: string): Promise<FabreactorResultPage> => {
        return of(this.data.items.filter(t => t.name.toLowerCase().indexOf(query) > -1)).pipe(delay(500), map(y => {
            return {
                items: y,
                page: 1,
                totalPages: 1
            };
        })).toPromise();
    }

    private initViews = () => {
        this.views = [{
            name: "View 1",
            key: "view1",
            fields: this.data.fields.slice(1, 4)
        }, {
            name: "View 2",
            key: "view2",
            fields: this.data.fields.slice(1, 5)
        }, {
            name: "Dyanmic view",
            key: "dynamicview",
            fields: this.data.fields.slice(1, 4)
        }];
    }

}

export const FakeStore = (itemCount: number, itemsPerPage: number) => {
    new FabreactorListStore(itemCount, itemsPerPage);
}