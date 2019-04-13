import * as React from 'react';
import { observer } from 'mobx-react';
import { IFabreactorDeleteFailedMessageBarProps } from './IDeleteFailedMessageBarProps';
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { FabreactorMessageBar } from '../MessageBar/MessageBar';

@observer
export class FabreactorDeleteFailedMessageBar extends React.Component<IFabreactorDeleteFailedMessageBarProps, any> {

    constructor(props: IFabreactorDeleteFailedMessageBarProps) {
        super(props);
    }

    render() {
        const { onDismiss, itemCount, locales } = this.props;
        const warning = locales.strings.formatString(locales.strings.deleteFailed, itemCount);

        const messageBar = itemCount > 0 ?
            <FabreactorMessageBar
                type={MessageBarType.warning}
                onDismiss={onDismiss}>
                {warning}
            </FabreactorMessageBar>
            : <span></span>;

        return (
            <span>
                {messageBar}
            </span>
        );
    }
}