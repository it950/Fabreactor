export interface FabricreatorFilter {
    key: string;
    values: any[];
}

export interface FabricreatorQuery {
    viewKey: string;
    page: number;
    filters: FabricreatorFilter[];
}

export interface FabricreatorResultPage {
    items: any[];
    page: number;
    totalPages: number;
}


export interface FabricreatorNewItemResult {
    item: any;
    fields: FabricreatorField[];
}

export interface FabricreatorAction {
    name: string;
    key: string;
    icon?: string;
    type: FabricreatorActionType;
    actions?: FabricreatorAction[];
}

export interface FabricreatorGroup {
    name: string;
    key: string;
    collapsable?: boolean;
    actions?: FabricreatorAction[];
    fields?: FabricreatorField[];

}

export interface FabricreatorField {
    name: string;
    key: string;
    type: FabricreatorFieldType;
    sortable?: boolean;
    minWidth?: number;
    filterable?: boolean;
}

export interface FabriactViewForm {
    item: any;
    groups: FabricreatorGroup[];
    actions?: FabricreatorAction[];
}

export enum FabricreatorFieldType {
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


export enum FabricreatorDynamicViewType {
    month = 0,
    year = 1,
}

export enum FabricreatorActionType {
    custom = 0,
    newForm = 1,
    viewForm = 2,
    service = 3,
}

export interface FabricreatorView {
    name: string;
    key: string;
    dynamicViewType?: FabricreatorDynamicViewType;
    actions?: FabricreatorAction[];
    fields: FabricreatorField[];
}


export interface FabricreatorItemProperties {
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