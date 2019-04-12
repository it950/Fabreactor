import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { IFabricreatorViewItemPanelProps } from './IViewItemPanelProps';
import { FabricreatorItemPanel } from '../ItemPanel/ItemPanel';

@inject('store')
@observer
export class FabricreatorViewItemPanel extends React.Component<IFabricreatorViewItemPanelProps, any> {

    constructor(props: IFabricreatorViewItemPanelProps) {
        super(props);
    }

    render() {
        const { isOpen, onDismiss, itemTitle, itemDescription, itemSecondaryDescription, itemColor } = this.props.store!;

        return (
            <FabricreatorItemPanel isOpen={isOpen} onDismiss={onDismiss} title={itemTitle} color={itemColor} image={""}
                description={itemDescription} secondaryDescription={itemSecondaryDescription}>
            </FabricreatorItemPanel>
        );
    }
}