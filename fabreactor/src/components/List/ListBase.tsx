import * as React from 'react';
import { observer, inject, Provider } from 'mobx-react';
import { IFabreactorListBaseProps } from './IListBaseProps';
import { FabreactorDetailsList } from '../DetailsList/DetailsList';
import { FabreactorCommandBar } from '../CommandBar/CommandBar';
import { FabreactorDeleteFailedMessageBar } from '../MessageBars/DeleteFailedMessageBar/DeleteFailedMessageBar';
import { FabreactorViewItemPanel } from '../Panels/ViewItemPanel/ViewItemPanel';
import { FabreactorNewItemPanel } from '../Panels/NewItemPanel/NewItemPanel';

@inject("store")
@observer
export class FabreactorListBase extends React.Component<IFabreactorListBaseProps, any> {
    constructor(props: IFabreactorListBaseProps) {
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
                <FabreactorDeleteFailedMessageBar locales={locales} itemCount={itemsDeleteFailed.length} onDismiss={dismissFailedDelete} />

                <Provider store={commandBarStore}>
                    <FabreactorCommandBar />
                </Provider>

                <Provider store={detailsListStore}>
                    <FabreactorDetailsList />
                </Provider>

                <Provider store={viewItemStore}>
                    <FabreactorViewItemPanel />
                </Provider>

                <Provider store={newItemStore}>
                    <FabreactorNewItemPanel />
                </Provider>

            </span>
        );


    }
}