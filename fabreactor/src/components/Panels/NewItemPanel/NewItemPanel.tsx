import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { IFabreactorNewItemPanelProps } from './INewItemPanelProps';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { FabreactorForm } from '../../Form/Form';
import { FabreactorButtonRow } from '../../Buttons/ButtonRow/ButtonRow';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

@inject('store')
@observer
export class FabreactorNewItemPanel extends React.Component<IFabreactorNewItemPanelProps, any> {

    constructor(props: IFabreactorNewItemPanelProps) {
        super(props);

    }

    private onRenderButtonRow = () => {
        const { footerButtons, onFooterButtonClick } = this.props.store!;

        return <FabreactorButtonRow buttons={footerButtons} onClick={onFooterButtonClick} />
    }

    render() {
        const { title, isOpen, isLoading, locales, fields, item, errorMessage, dismissError,
            onFieldChange, onDismiss, onFieldValidate, errorMessages, isSaving } = this.props.store!;
        const { onRenderButtonRow } = this;

        const errorBar = errorMessage ? <MessageBar messageBarType={MessageBarType.error} isMultiline={false} onDismiss={dismissError} dismissButtonAriaLabel="Close">
            {errorMessage}
        </MessageBar> : <span></span>;

        const panelContent = isLoading || isSaving ? <Spinner size={SpinnerSize.large} />
            : <FabreactorForm onFieldChange={onFieldChange} locales={locales} errorMessages={errorMessages}
                onFieldValidate={onFieldValidate} fields={fields} item={item} />;

        return (
            <Panel headerText={title} type={PanelType.medium} isOpen={isOpen} onRenderFooterContent={onRenderButtonRow} onDismiss={onDismiss}>

                {errorBar}

                <div className={"ms-Grid"}>
                    <div className={"ms-Grid-row"}>
                        <div className={"ms-Grid-col ms-sm12 ms-md12 ms-lg10 ms-xl10"}>
                            {panelContent}
                        </div>
                    </div>
                </div>
            </Panel>
        );
    }
}