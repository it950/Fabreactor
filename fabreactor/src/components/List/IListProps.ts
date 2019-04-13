import { FabreactorView, FabreactorResultPage, FabreactorQuery, FabreactorItemProperties, FabreactorForm } from "../../types";

export interface IFabreactorListProps {
    views: FabreactorView[];
    onGetView: (query: FabreactorQuery) => Promise<FabreactorResultPage>;
    itemProperties: FabreactorItemProperties;

    defaultViewKey?: string;
    language?: string;
    onSearch?: (query: string, page: number) => Promise<FabreactorResultPage>;

    onDeleteItem?: (itemId: any) => Promise<boolean>;

    // New item for the new form
    onNewItem?: () => Promise<FabreactorForm>;

    // Save new form, should return saved item
    onAddItem?: (item: any) => Promise<any>;

}
