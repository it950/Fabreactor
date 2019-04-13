import { FabreactorField, FabreactorFieldType, FabreactorFieldGroup } from "fabreactor";
import * as faker from 'faker';

export default class FabreactorDataRepository {

    items: any[] = [];

    fields: FabreactorFieldExtension[] = [{
        name: "Id",
        key: "id",
        readOnly: true,
        group: "Group 1",
        type: FabreactorFieldType.text
    }, {
        name: "Name",
        key: "name",
        required: true,
        group: "Group 1",
        type: FabreactorFieldType.text
    }, {
        name: "Job Title",
        key: "jobTitle",
        group: "Group 2",
        type: FabreactorFieldType.text
    }, {
        name: "Job Type",
        key: "jobType",
        group: "Group 2",
        type: FabreactorFieldType.text
    }, {
        name: "Color",
        key: "color",
        group: "Group 2",
        type: FabreactorFieldType.color
    }, {
        name: "Created",
        key: "created",
        readOnly: true,
        type: FabreactorFieldType.dateTime
    }, {
        name: "Modified",
        key: "modified",
        readOnly: true,
        type: FabreactorFieldType.dateTime
    }
    ];

    get newItemFields(): FabreactorFieldGroup[] {
        const grouped = this.groupBy(this.fields.filter(t => t.group && !t.readOnly), "group");
        return Object.keys(grouped).map(t => {
            return {
                name: t,
                fields: grouped[t]
            };
        });
    }

    private groupBy = (xs: any, key: any) => {
        return xs.reduce((rv: any, x: any) => {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    }

    public randomItem = () => {
        return {
            id: faker.random.uuid(),
            name: faker.name.findName(),
            jobTitle: faker.name.jobTitle(),
            jobType: faker.name.jobType(),
            color: faker.internet.color(),
            created: new Date(),
            modified: faker.date.recent(),
        };
    }

    public newItem = () => {
        const now = new Date();

        return {
            id: faker.random.uuid(),
            color: faker.internet.color(),
            jobType: faker.name.jobType(),
            created: now,
            modified: now,
        };
    }

    public addItem = (item: any[]) => {
        this.items.push(item);
        return item;
    }

    private initData() {
        for (let i = 0; i < this.itemCount; i++) {

            this.items.push(this.randomItem());
        }
    }

    constructor(private itemCount: number) {
        this.initData();
    }
}

class FabreactorFieldExtension extends FabreactorField {
    group?: string;
}