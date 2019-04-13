import { ButtonType } from "office-ui-fabric-react/lib/Button";

export class FabreactorFilter {
    key: string;
    values: any[];
}

export class FabreactorLookup {
    key: string;
    title: string;
}

export class FabreactorQuery {
    viewKey: string;
    page: number;
    filters: FabreactorFilter[];
}

export class FabreactorResultPage {
    items: any[];
    page: number;
    totalPages: number;
}

export class FabreactorAction {
    name: string;
    key: string;
    icon?: string;
    type: FabreactorActionType;
    actions?: FabreactorAction[];
}

export class FabreactorFieldGroup {
    name: string;
    fields?: FabreactorField[];
}

export class FabreactorForm {
    item: any;
    groups: FabreactorFieldGroup[];
    actions?: FabreactorAction[];
}

export class FabreactorButton {
    text: string;
    key: string;
    type: ButtonType;
}

export class FabreactorField {
    name: string;
    description?: string;
    key: string;
    type: FabreactorFieldType;
    sortable?: boolean;
    minWidth?: number;
    filterable?: boolean;
    readOnly?: boolean;
    required?: boolean;

    // Used on metadata, choice, lookup, user fields
    multiValue?: boolean;

    // Used on metadata, choice fields
    options?: FabreactorLookup[];
}

export enum FabreactorFieldType {
    text = 0,
    url = 1,
    email = 2,
    lookup = 3,
    boolean = 4,
    user = 5,
    datetime = 6,
    number = 7,
    image = 8,
    phone = 9,
    multiline = 10,
    choice = 11,
    percent = 12,
    currency = 13,
    metadata = 14,
    file = 15,
    color = 16
}

export enum FabreactorDynamicViewType {
    month = 0,
    year = 1,
}

export enum FabreactorActionType {
    custom = 0,
    newForm = 1,
    viewForm = 2,
    service = 3,
}

export class FabreactorView {
    name: string;
    key: string;
    dynamicViewType?: FabreactorDynamicViewType;
    actions?: FabreactorAction[];
    fields: FabreactorField[];
}

export class FabreactorItemProperties {
    key: string;
    title: string;
    description: string;
    secondaryDescription: string;
    color: string;
}

export class FabriactActionProgress {
    title: any;
    description?: string;
    percentComplete: number;
}