import * as React from 'react';
import { observer, Provider } from 'mobx-react';
import { IFabricreatorListProps } from './IListProps';
import FabricreatorListStore from '../../stores/ListStore';
import { FabricreatorListBase } from './ListBase';

@observer
export class FabricreatorList extends React.Component<IFabricreatorListProps, any> {

    store: FabricreatorListStore;

    constructor(props: IFabricreatorListProps) {
        super(props);

        this.store = new FabricreatorListStore({
            views: this.props.views,
            onGetView: this.props.onGetView,
            defaultViewKey: this.props.defaultViewKey,
            onDeleteItem: this.props.onDeleteItem,
            onNewItem: this.props.onNewItem,
            itemProperties: this.props.itemProperties,
            language: this.props.language
        });

    }

    render() {
        return (
            <Provider store={this.store}>
                <FabricreatorListBase />
            </Provider>
        );
    }
}