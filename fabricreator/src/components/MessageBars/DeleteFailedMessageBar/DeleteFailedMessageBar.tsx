import * as React from 'react';
import { observer } from 'mobx-react';
import { IFabricreatorDeleteFailedMessageBarProps } from './IDeleteFailedMessageBarProps';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

@observer
export class FabricreatorDeleteFailedMessageBar extends React.Component<IFabricreatorDeleteFailedMessageBarProps, any> {

    constructor(props: IFabricreatorDeleteFailedMessageBarProps) {
        super(props);

    }

    render() {
        const { onDismiss, itemCount, locales } = this.props;
        const warning = locales.strings.formatString(locales.strings.deleteFailed, itemCount);

        const messageBar = itemCount > 0 ?
            <MessageBar
                messageBarType={MessageBarType.warning}
                isMultiline={false}
                onDismiss={onDismiss}
                dismissButtonAriaLabel="Close">
                {warning}
            </MessageBar>
            : <span></span>;

        return (
            <span>
                {messageBar}
            </span>
        );
    }
}