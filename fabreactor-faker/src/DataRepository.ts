import { FabreactorField, FabreactorFieldType } from "fabreactor";
import * as faker from 'faker';

export default class FabreactorDataRepository {

    items: any[] = [];

    fields: FabreactorField[] = [{
        name: "Id",
        key: "id",
        type: FabreactorFieldType.text
    }, {
        name: "Name",
        key: "name",
        type: FabreactorFieldType.text
    }, {
        name: "Job Title",
        key: "jobTitle",
        type: FabreactorFieldType.text
    }, {
        name: "Job Type",
        key: "jobType",
        type: FabreactorFieldType.text
    }, {
        name: "Color",
        key: "color",
        type: FabreactorFieldType.color
    }, {
        name: "Created",
        key: "created",
        type: FabreactorFieldType.dateTime
    }, {
        name: "Modified",
        key: "modified",
        type: FabreactorFieldType.dateTime
    }
    ];

    public newItem = () => {
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

    private initData() {
        for (let i = 0; i < this.itemCount; i++) {

            this.items.push(this.newItem());
        }
    }

    constructor(private itemCount: number) {
        this.initData();
    }
}