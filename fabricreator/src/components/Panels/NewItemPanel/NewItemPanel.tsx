import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { IFabricreatorNewItemPanelProps } from './INewItemPanelProps';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { FabricreatorForm } from '../../Form/Form';

@inject('store')
@observer
export class FabricreatorNewItemPanel extends React.Component<IFabricreatorNewItemPanelProps, any> {

    constructor(props: IFabricreatorNewItemPanelProps) {
        super(props);

    }

    render() {
        const { title, isOpen, isLoading, locales } = this.props.store!;

        const panelContent = isLoading ? <Spinner size={SpinnerSize.large} /> : <FabricreatorForm locales={locales} />;

        return (
            <Panel headerText={title} isOpen={isOpen}>
                {panelContent}
            </Panel>
        );
    }
}