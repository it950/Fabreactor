import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { IFabricreatorDetailsListProps } from './IDetailsListProps';
import { DetailsList, IDetailsRowProps } from 'office-ui-fabric-react/lib/DetailsList';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { FabricreatorProgressBar } from '../ProgressBar/ProgressBar';

@inject('store')
@observer
export class FabricreatorDetailsList extends React.Component<IFabricreatorDetailsListProps, any> {

    constructor(props: IFabricreatorDetailsListProps) {
        super(props);
    }

    private renderMissingItem = (index: number | undefined, rowProps: IDetailsRowProps | undefined): React.ReactNode => {
        const { onNextPage } = this.props.store!;

        onNextPage();

        return (
            <Spinner size={SpinnerSize.small} />
        );
    }

   
    render() {
        const { columns, listItems, viewLoading, selection, actionProgress, keyProperty } = this.props.store!;
        const { renderMissingItem } = this;

        const detailList = viewLoading ? <Spinner /> : actionProgress ?
            <FabricreatorProgressBar percentComplete={actionProgress!.percentComplete} description={actionProgress!.description}
                title={actionProgress!.title} />
            :
            <DetailsList items={listItems} onRenderMissingItem={renderMissingItem} key={keyProperty}
            selection={selection} selectionPreservedOnEmptyClick={true} columns={columns} />;

        return (
            <div>
                {detailList}
            </div>
        );
    }
}