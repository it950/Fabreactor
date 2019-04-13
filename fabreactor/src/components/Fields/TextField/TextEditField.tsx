import * as React from 'react';
import { observer } from 'mobx-react';
import { IFabreactorTextEditFieldProps } from './ITextEditFieldProps';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

@observer
export class FabreactorTextEditField extends React.Component<IFabreactorTextEditFieldProps, any> {

    constructor(props: IFabreactorTextEditFieldProps) {
        super(props);

    }

    private onChange = (event: React.FormEvent, newValue: string | undefined) => {
        const { onChange } = this.props;
        onChange(newValue);
    }

    render() {
        const { value, description, icon, onValidate, errorMessage, label, autoFocus, required } = this.props;
        const { onChange } = this;
        const iconProps = icon ? { iconName: icon } : {};

        return (
            <span>
                <TextField description={description} value={value} iconProps={iconProps}
                    autoComplete={"off"} label={label} autoFocus={autoFocus} required={required}
                    onChange={onChange} validateOnLoad={false} validateOnFocusOut onGetErrorMessage={onValidate} errorMessage={errorMessage} />
            </span>
        );
    }
}