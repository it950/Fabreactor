import * as React from 'react';
import { observer, Provider } from 'mobx-react';
import { IFabreactorListProps } from './IListProps';
import FabreactorListStore from '../../stores/ListStore';
import { FabreactorListBase } from './ListBase';

@observer
export class FabreactorList extends React.Component<IFabreactorListProps, any> {

    store: FabreactorListStore;

    constructor(props: IFabreactorListProps) {
        super(props);

        this.store = new FabreactorListStore({
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
                <FabreactorListBase />
            </Provider>
        );
    }
}