import { FabricreatorField, FabricreatorFieldType } from "fabricreator";
import * as faker from 'faker';

export default class FabricreatorDataRepository {

    items: any[] = [];

    fields: FabricreatorField[] = [{
        name: "Id",
        key: "id",
        type: FabricreatorFieldType.text
    }, {
        name: "Name",
        key: "name",
        type: FabricreatorFieldType.text
    }, {
        name: "Job Title",
        key: "jobTitle",
        type: FabricreatorFieldType.text
    }, {
        name: "Job Type",
        key: "jobType",
        type: FabricreatorFieldType.text
    }, {
        name: "Color",
        key: "color",
        type: FabricreatorFieldType.color
    }, {
        name: "Created",
        key: "created",
        type: FabricreatorFieldType.dateTime
    }, {
        name: "Modified",
        key: "modified",
        type: FabricreatorFieldType.dateTime
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