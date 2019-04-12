import * as React from 'react';
import { observer, inject, Provider } from 'mobx-react';
import { IFabricreatorListBaseProps } from './IListBaseProps';
import { FabricreatorDetailsList } from '../DetailsList/DetailsList';
import { FabricreatorCommandBar } from '../CommandBar/CommandBar';
import { FabricreatorDeleteFailedMessageBar } from '../MessageBars/DeleteFailedMessageBar/DeleteFailedMessageBar';
import { FabricreatorViewItemPanel } from '../Panels/ViewItemPanel/ViewItemPanel';
import { FabricreatorNewItemPanel } from '../Panels/NewItemPanel/NewItemPanel';

@inject("store")
@observer
export class FabricreatorListBase extends React.Component<IFabricreatorListBaseProps, any> {
    constructor(props: IFabricreatorListBaseProps) {
        super(props);
      

    }

    componentDidMount() {
        this.props.store!.init();
    }

    componentWillUnmount() {
        this.props.store!.cancelAllActions();
    }

    render() {
        const { commandBarStore, detailsListStore, locales, itemsDeleteFailed, dismissFailedDelete, viewItemStore, newItemStore } = this.props.store!;

        return (
            <span>
                <FabricreatorDeleteFailedMessageBar locales={locales} itemCount={itemsDeleteFailed.length} onDismiss={dismissFailedDelete} />

                <Provider store={commandBarStore}>
                    <FabricreatorCommandBar />
                </Provider>

                <Provider store={detailsListStore}>
                    <FabricreatorDetailsList />
                </Provider>

                <Provider store={viewItemStore}>
                    <FabricreatorViewItemPanel />
                </Provider>

                <Provider store={newItemStore}>
                    <FabricreatorNewItemPanel />
                </Provider>

            </span>
        );


    }
}