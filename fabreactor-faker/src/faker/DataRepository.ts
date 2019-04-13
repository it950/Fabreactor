import { FabreactorField, FabreactorFieldType, FabreactorFieldGroup } from "fabreactor";
import 'faker';
import * as faker from 'faker/locale/nl';

export default class FabreactorDataRepository {

    items: any[] = [];
    metadata: any[] = [];

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
        name: "Email",
        key: "email",
        group: "Group 1",
        type: FabreactorFieldType.email
    }, {
        name: "Phone",
        key: "phone",
        group: "Group 1",
        type: FabreactorFieldType.phone
    }, {
        name: "Url",
        key: "url",
        group: "Group 1",
        type: FabreactorFieldType.url
    }, {
        name: "Metadata",
        key: "metadata",
        group: "Group 1",
        type: FabreactorFieldType.metadata
    }, {
        name: "Metadata multi",
        key: "metadatamulti",
        multiValue: true,
        group: "Group 1",
        type: FabreactorFieldType.metadata
    }, {
        name: "Multiline",
        key: "multiline",
        group: "Group 1",
        type: FabreactorFieldType.multiline
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
        type: FabreactorFieldType.datetime
    }, {
        name: "Modified",
        key: "modified",
        readOnly: true,
        type: FabreactorFieldType.datetime
    }];

    get newItemFields(): FabreactorFieldGroup[] {

        const fields = this.fields.filter(t => t.group && !t.readOnly);

        fields.forEach(t => {
            if (t.type == FabreactorFieldType.metadata) {
                t.options = this.metadata;
            }
        });

        const grouped = this.groupBy(fields, "group");

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
            email: faker.internet.email(),
            phone: faker.phone.phoneNumber(),
            url: faker.internet.url(),
            metadata: this.metadata[faker.random.number(4)],
            metadatamulti: this.metadata.filter(y => faker.random.number(50) > 20),
            multiline: faker.lorem.lines(),
            color: faker.internet.color(),
            created: new Date(),
            modified: faker.date.recent(),
        };
    }

    public randomMetadata = () => {
        return {
            key: faker.random.uuid(),
            title: faker.database.type(),
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

        for (let i = 0; i < 5; i++) {
            this.metadata.push(this.randomMetadata());
        }

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