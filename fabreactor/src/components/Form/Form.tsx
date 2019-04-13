import * as React from 'react';
import { observer } from 'mobx-react';
import { IFabreactorFormProps } from './IFormProps';
import { FabreactorEditField } from '../Fields/EditField/EditField';

@observer
export class FabreactorForm extends React.Component<IFabreactorFormProps, any> {

    constructor(props: IFabreactorFormProps) {
        super(props);

    }

    render() {
        const { fields, item, onFieldChange, locales, onFieldValidate, errorMessages } = this.props;

        const fieldContent = fields.map((field, index) => {
            const value = item[field.key];
            const autoFocus = index == 0;

            const errorMessage = errorMessages.has(field.key) ? errorMessages.get(field.key) : undefined;

            return <FabreactorEditField field={field} value={value} onValidate={onFieldValidate} errorMessage={errorMessage}
                locales={locales} key={field.key} onChange={onFieldChange} autoFocus={autoFocus} />;
        });

        return (
            <form>
                {fieldContent}
            </form>
        );
    }
}