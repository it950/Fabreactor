import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './CommandBar.module.css';
import { IFabreactorCommandBarProps } from './ICommandBarProps';
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { FabreactorDeleteDialog } from '../DeleteDialog/DeleteDialog';

@inject('store')
@observer
export class FabreactorCommandBar extends React.Component<IFabreactorCommandBarProps, any> {
    constructor(props: IFabreactorCommandBarProps) {
        super(props);
    }

    private renderSearch = () => {
        const { onSearch, onSearchCleared, searchQuery } = this.props.store!;

        return (    
            <SearchBox value={searchQuery!}
                className={"commandBarSearchBox"} onSearch={onSearch} onClear={onSearchCleared}
                onEscape={onSearchCleared} />
        );
    }
  
    render() {
        const { farItems, items, locales, confirmDelete, onDeleteDismissed, onDeleteConfirmed, selectedItemCount } = this.props.store!;

        const renderItems = items.map((y: ICommandBarItemProps) => {
            if (y.key == "search") {
                y.onRender = this.renderSearch;
            }

            return y;
        });

        return (
            <div>
                <CommandBar items={renderItems} farItems={farItems} />

                <FabreactorDeleteDialog locales={locales} isVisible={confirmDelete}
                    onCancel={onDeleteDismissed} onConfirm={onDeleteConfirmed} itemCount={selectedItemCount} />

            </div>
        );
    }

}