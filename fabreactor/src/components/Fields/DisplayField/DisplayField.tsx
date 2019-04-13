import * as React from 'react';
import { observer } from 'mobx-react';
import { IFabreactorDisplayFieldProps } from './IDisplayFieldProps';
import { FabreactorFieldType } from '../../../types';
import { FabreactorTextDisplayField, FabreactorDateDisplayField, FabreactorLinkField } from '../';

@observer
export class FabreactorDisplayField extends React.Component<IFabreactorDisplayFieldProps, any> {

    constructor(props: IFabreactorDisplayFieldProps) {
        super(props);

    }

    render() {

        const { field, value, locales } = this.props;

        let html = null;

        switch (field.type) {

            case FabreactorFieldType.datetime:
                html = <FabreactorDateDisplayField value={value} locales={locales} />;

                break;
            case FabreactorFieldType.text:
            case FabreactorFieldType.multiline:
                html = <FabreactorTextDisplayField value={value} />;

                break;
            case FabreactorFieldType.url:
                html = <FabreactorLinkField url={value} text={value} />;
                break;
            case FabreactorFieldType.email:
                const mailUrl = value ? `mailto:${value}` : undefined;
                html = <FabreactorLinkField url={mailUrl} text={value} />;

                break;
            case FabreactorFieldType.phone:
                const phoneUrl = value ? `tel:${value}` : undefined;
                html = <FabreactorLinkField url={phoneUrl} text={value} />;

                break;
            case FabreactorFieldType.metadata:
                const metadataValue = value ? field.multiValue ? value.map((t: any) => t.title).join(", ") : value.title : null;

                html = <FabreactorTextDisplayField value={metadataValue} />;

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