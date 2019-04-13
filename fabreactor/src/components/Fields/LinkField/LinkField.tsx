import * as React from 'react';
import { observer } from 'mobx-react';
import { IFabreactorLinkFieldProps } from './ILinkFieldProps';
import { Link } from 'office-ui-fabric-react/lib/Link';

@observer
export class FabreactorLinkField extends React.Component<IFabreactorLinkFieldProps, any> {

    constructor(props: IFabreactorLinkFieldProps) {
        super(props);
    }

    render() {
        const { url, text } = this.props;
        const content = text ? text : url;

        const result = url ?
            <Link href={url}>
                {content}
            </Link> : <span></span>;

        return (
            <span>
                {result}
            </span>
        );
    }
}