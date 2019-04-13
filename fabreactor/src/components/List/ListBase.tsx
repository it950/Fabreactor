import * as React from 'react';
import { observer, inject, Provider } from 'mobx-react';
import { IFabreactorListBaseProps } from './IListBaseProps';
import { FabreactorDetailsList } from '../DetailsList/DetailsList';
import { FabreactorCommandBar } from '../CommandBar/CommandBar';
import { FabreactorDeleteFailedMessageBar } from '../MessageBars';
import { FabreactorViewItemPanel, FabreactorNewItemPanel } from '../Panels';
import { ScrollablePane } from "office-ui-fabric-react/lib/ScrollablePane";
import { Sticky, StickyPositionType } from 'office-ui-fabric-react/lib/Sticky';

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
        const { commandBarStore, detailsListStore, locales, failedDeleteItemCount, dismissFailedDelete, viewItemStore, newItemStore } = this.props.store!;

        return (
            <span>
                <FabreactorDeleteFailedMessageBar locales={locales} itemCount={failedDeleteItemCount} onDismiss={dismissFailedDelete} />

                <ScrollablePane>

                    <Sticky stickyPosition={StickyPositionType.Header}>
                        <Provider store={commandBarStore}>
                            <FabreactorCommandBar />
                        </Provider>
                    </Sticky>

                    <Provider store={detailsListStore}>
                        <FabreactorDetailsList />
                    </Provider>

                </ScrollablePane>

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