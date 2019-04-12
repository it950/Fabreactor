import { FabricreatorView, FabricreatorResultPage, FabricreatorQuery, FabricreatorItemProperties, FabricreatorNewItemResult } from "../../types";

export interface IFabricreatorListProps {
    views: FabricreatorView[];
    itemProperties: FabricreatorItemProperties;

    defaultViewKey?: string;
    language?: string;
    onSearch?: (query: string) => Promise<FabricreatorResultPage>;
    onDeleteItem?: (itemId: any) => Promise<boolean>;
    onGetView: (query: FabricreatorQuery) => Promise<FabricreatorResultPage>;
    onNewItem?: () => Promise<FabricreatorNewItemResult>;

}
