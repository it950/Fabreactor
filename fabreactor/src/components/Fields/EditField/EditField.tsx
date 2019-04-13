import * as React from 'react';
import { observer } from 'mobx-react';
import { IFabreactorEditFieldProps } from './IEditFieldProps';
import { FabreactorFieldType } from '../../../types';
import { FabreactorTextEditField } from '../TextField/TextEditField';
import { IFabreactorFieldEditProps } from '../IFieldEditProps';
import { FabreactorMetadataEditField } from '../MetadataField/MetadataEditField';

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

        const fieldProps: IFabreactorFieldEditProps = {
            value: value,
            autoFocus: autoFocus,
            errorMessage: errorMessage,
            onChange: onFieldChange,
            onValidate: onFieldValidate,
            required: field.required,
            description: field.description,
            label: field.name
        };

        switch (field.type) {

            case FabreactorFieldType.text:
                html = <FabreactorTextEditField fieldProps={fieldProps} />;
                break;
            case FabreactorFieldType.multiline:
                html = <FabreactorTextEditField fieldProps={fieldProps} multiline={true} />;
                break;
            case FabreactorFieldType.url:
                html = <FabreactorTextEditField icon={"Link"} fieldProps={fieldProps} />;
                break;
            case FabreactorFieldType.email:
                html = <FabreactorTextEditField icon={"Mail"} fieldProps={fieldProps} />;
                break;
            case FabreactorFieldType.phone:
                html = <FabreactorTextEditField icon={"Phone"} fieldProps={fieldProps} />;
                break;
            case FabreactorFieldType.metadata:
                html = <FabreactorMetadataEditField options={field.options!} fieldProps={fieldProps} multiValue={field.multiValue} />;
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