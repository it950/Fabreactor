import { computed, action } from "mobx";
import { IColumn, Selection } from "office-ui-fabric-react/lib/DetailsList";
import FabreactorListStore from "./ListStore";

export default class FabreactorDetailsListStore {

    private root: FabreactorListStore;

    public selection: Selection;

    constructor(private rootStore: FabreactorListStore) {
        this.root = this.rootStore;

        this.selection = new Selection({ onSelectionChanged: this.root.onSelectionChanged });
    }

    @computed
    get locales() {
        return this.root.locales;

    }
    @computed
    get keyProperty() {
        return this.root.keyProperty;
    }

    @computed
    get actionProgress() {
        return this.root.actionProgress;
    }

    @action
    public onNextPage = () => {
        return this.root.onNextPage();
    }

    @computed
    get listItems(): any[] {
        if (!this.root.hasNextPage) {
            return this.root.listItems;
        }

        return this.root.listItems.concat(null);
    }

    @computed
    get viewLoading(): boolean {
        return this.root.viewLoading;
    }

    @computed
    get fields() {
        return this.root.currentViewFields;
    }

    @computed
    get columns(): IColumn[] {
        return this.root.currentViewFields.map(t => {
            return {
                key: t.key,
                name: t.name,
                fieldName: t.key,
                minWidth: t.minWidth ? t.minWidth : 100
            }
        });
    }

    public getKey = (item: any, index?: number) => {
        if (item) {
            return item[this.keyProperty];
        }

        return null;
        
    }

    public getSelection = () => {
        return this.selection.getSelection().filter(y => y != null);
    }

    public deselectKey = (key: any) => {
        this.selection.setKeySelected(key, false, false);
    }
}