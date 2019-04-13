import * as React from 'react';
import { observer } from 'mobx-react';
import { IFabreactorDisplayFieldProps } from './IDisplayFieldProps';
import { FabreactorFieldType } from '../../../types';
import { FabreactorDateDisplayField } from '../DateField/DateDisplayField';
import { FabreactorTextDisplayField } from '../TextField/TextDisplayField';

@observer
export class FabreactorDisplayField extends React.Component<IFabreactorDisplayFieldProps, any> {

    constructor(props: IFabreactorDisplayFieldProps) {
        super(props);

    }

    render() {

        const { field, value, locales } = this.props;

        let html = null;

        switch (field.type) {

            case FabreactorFieldType.dateTime:
                html = <FabreactorDateDisplayField value={value} locales={locales} />;

                break;
            case FabreactorFieldType.text:
                html = <FabreactorTextDisplayField value={value} />;

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