import * as React from 'react';
import { observer } from 'mobx-react';
import { IFabreactorEditFieldProps } from './IEditFieldProps';
import { FabreactorFieldType } from '../../../types';
import { FabreactorTextEditField } from '../TextField/TextEditField';

@observer
export class FabreactorEditField extends React.Component<IFabreactorEditFieldProps, any> {

    constructor(props: IFabreactorEditFieldProps) {
        super(props);
    }

    private onFieldChange = (value: any) => {
        const { onChange, field } = this.props;

        onChange(field, value);
    }

    private onFieldValidate = (value: any) => {
        const { onValidate, field } = this.props;

        return onValidate(field, value);
    }

    render() {
        const { field, value, errorMessage, autoFocus } = this.props;
        const { onFieldChange, onFieldValidate } = this;

        let html = null;

        switch (field.type) {

            case FabreactorFieldType.text:
                html = <FabreactorTextEditField value={value} onChange={onFieldChange} label={field.name} autoFocus={autoFocus}
                    errorMessage={errorMessage} required={field.required} onValidate={onFieldValidate} />;
                break;
            default:
                break;
        }

        return (
            <span>
                {html}
            </span>
        );
    }
}