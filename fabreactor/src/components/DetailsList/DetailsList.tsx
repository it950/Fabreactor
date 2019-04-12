import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { IFabreactorDetailsListProps } from './IDetailsListProps';
import { DetailsList, IDetailsRowProps } from 'office-ui-fabric-react/lib/DetailsList';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { FabreactorProgressBar } from '../ProgressBar/ProgressBar';

@inject('store')
@observer
export class FabreactorDetailsList extends React.Component<IFabreactorDetailsListProps, any> {

    constructor(props: IFabreactorDetailsListProps) {
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
            <FabreactorProgressBar percentComplete={actionProgress!.percentComplete} description={actionProgress!.description}
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