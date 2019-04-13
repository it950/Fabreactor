import * as React from 'react';
import { observer } from 'mobx-react';
import { IFabreactorMessageBarProps } from './IMessageBarProps';
import { MessageBar } from 'office-ui-fabric-react/lib/MessageBar';

@observer
export class FabreactorMessageBar extends React.Component<IFabreactorMessageBarProps, any> {

    constructor(props: IFabreactorMessageBarProps) {
        super(props);
    }

    render() {
        const { type, onDismiss, children } = this.props;

        return (
            <MessageBar
                messageBarType={type}
                isMultiline={false}
                onDismiss={onDismiss}
                dismissButtonAriaLabel="Close">
                {children}
            </MessageBar>
        );
    }
}