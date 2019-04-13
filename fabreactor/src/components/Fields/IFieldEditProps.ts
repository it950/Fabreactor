
export interface IFabreactorFieldEditProps {
    value?: any;
    description?: string;
    label?: string;
    onChange: (value: any) => void;
    onValidate: (value: any) => string;
    required?: boolean;
    autoFocus?: boolean;
    errorMessage?: string;

}
