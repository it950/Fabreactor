import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { IFabreactorNewItemPanelProps } from './INewItemPanelProps';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { FabreactorForm } from '../../Form/Form';

@inject('store')
@observer
export class FabreactorNewItemPanel extends React.Component<IFabreactorNewItemPanelProps, any> {

    constructor(props: IFabreactorNewItemPanelProps) {
        super(props);

    }

    render() {
        const { title, isOpen, isLoading, locales } = this.props.store!;

        const panelContent = isLoading ? <Spinner size={SpinnerSize.large} /> : <FabreactorForm locales={locales} />;

        return (
            <Panel headerText={title} isOpen={isOpen}>
                {panelContent}
            </Panel>
        );
    }
}