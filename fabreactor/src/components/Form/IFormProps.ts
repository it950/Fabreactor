import locales from "../../locales";
import { FabreactorField } from "types";

export interface IFabreactorFormProps {
    locales: locales;
    fields: FabreactorField[];
    errorMessages: Map<string, string>;
    item: any;
    onFieldChange: (field: FabreactorField, value: any) => void;
    onFieldValidate: (field: FabreactorField, value: any) => string;

}
