
export interface IFabreactorTextEditFieldProps {
    value?: string;
    description?: string;
    label?: string;
    icon?: string;
    onChange: (value: any) => void;
    onValidate: (value: any) => string;
    required?: boolean;
    autoFocus?: boolean;
    errorMessage?: string;
}
