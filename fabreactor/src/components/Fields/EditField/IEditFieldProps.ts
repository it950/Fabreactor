import locales from "../../../locales";
import { FabreactorField } from "types";

export interface IFabreactorEditFieldProps {
    locales: locales;
    field: FabreactorField;
    value?: any;
    errorMessage?: string;
    autoFocus?: boolean;
    onChange: (field: FabreactorField, value: any) => void;
    onValidate: (field: FabreactorField, value: any) => string;
}
