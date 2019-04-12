export interface FabreactorFilter {
    key: string;
    values: any[];
}

export interface FabreactorQuery {
    viewKey: string;
    page: number;
    filters: FabreactorFilter[];
}

export interface FabreactorResultPage {
    items: any[];
    page: number;
    totalPages: number;
}


export interface FabreactorNewItemResult {
    item: any;
    fields: FabreactorField[];
}

export interface FabreactorAction {
    name: string;
    key: string;
    icon?: string;
    type: FabreactorActionType;
    actions?: FabreactorAction[];
}

export interface FabreactorGroup {
    name: string;
    key: string;
    collapsable?: boolean;
    actions?: FabreactorAction[];
    fields?: FabreactorField[];

}

export interface FabreactorField {
    name: string;
    key: string;
    type: FabreactorFieldType;
    sortable?: boolean;
    minWidth?: number;
    filterable?: boolean;
}

export interface FabriactViewForm {
    item: any;
    groups: FabreactorGroup[];
    actions?: FabreactorAction[];
}

export enum FabreactorFieldType {
    text = 0,
    url = 1,
    email = 2,
    lookup = 3,
    boolean = 4,
    integer = 5,
    user = 6,
    dateTime = 7,
    number = 8,
    image = 9,
    phone = 10,
    multiLine = 11,
    choice = 12,
    percent = 13,
    currency = 14,
    managedMetadata = 15,
    file = 17,
    color = 18,
    login = 19
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

export interface FabreactorView {
    name: string;
    key: string;
    dynamicViewType?: FabreactorDynamicViewType;
    actions?: FabreactorAction[];
    fields: FabreactorField[];
}


export interface FabreactorItemProperties {
    key: string;
    title: string;
    description: string;
    secondaryDescription: string;
    color: string;
}


export interface FabriactActionProgress {
    title: any;
    description?: string;
    percentComplete: number;
}