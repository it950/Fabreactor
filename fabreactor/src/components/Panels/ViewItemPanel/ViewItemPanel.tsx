import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { IFabreactorViewItemPanelProps } from './IViewItemPanelProps';
import { FabreactorItemPanel } from '../ItemPanel/ItemPanel';

@inject('store')
@observer
export class FabreactorViewItemPanel extends React.Component<IFabreactorViewItemPanelProps, any> {

    constructor(props: IFabreactorViewItemPanelProps) {
        super(props);
    }

    render() {
        const { isOpen, onDismiss, itemTitle, itemDescription, itemSecondaryDescription, itemColor } = this.props.store!;

        return (
            <FabreactorItemPanel isOpen={isOpen} onDismiss={onDismiss} title={itemTitle} color={itemColor} image={""}
                description={itemDescription} secondaryDescription={itemSecondaryDescription}>
            </FabreactorItemPanel>
        );
    }
}