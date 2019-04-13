import { IFabreactorFieldEditProps } from "../IFieldEditProps";
import { FabreactorLookup } from "../../../types";

export interface IFabreactorMetadataEditFieldProps {
    fieldProps: IFabreactorFieldEditProps;
    options: FabreactorLookup[];
    multiValue?: boolean;
}
