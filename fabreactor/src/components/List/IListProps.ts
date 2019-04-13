import { FabreactorView, FabreactorResultPage, FabreactorQuery, FabreactorItemProperties, FabreactorForm } from "../../types";

export interface IFabreactorListProps {
    views: FabreactorView[];
    itemProperties: FabreactorItemProperties;

    defaultViewKey?: string;
    language?: string;
    onSearch?: (query: string, page: number) => Promise<FabreactorResultPage>;
    onDeleteItem?: (itemId: any) => Promise<boolean>;
    onGetView: (query: FabreactorQuery) => Promise<FabreactorResultPage>;
    onNewItem?: () => Promise<FabreactorForm>;
    onAddItem?: (item: any) => Promise<any>;

}
