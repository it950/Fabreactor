import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './CommandBar.module.css';
import { IFabricreatorCommandBarProps } from './ICommandBarProps';
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { FabricreatorDeleteDialog } from '../DeleteDialog/DeleteDialog';

@inject('store')
@observer
export class FabricreatorCommandBar extends React.Component<IFabricreatorCommandBarProps, any> {
    constructor(props: IFabricreatorCommandBarProps) {
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

                <FabricreatorDeleteDialog locales={locales} isVisible={confirmDelete}
                    onCancel={onDeleteDismissed} onConfirm={onDeleteConfirmed} itemCount={selectedItemCount} />

            </div>
        );
    }

}