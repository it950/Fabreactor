import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { IFabreactorDetailsListProps } from './IDetailsListProps';
import { DetailsList, IDetailsRowProps, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { FabreactorProgressBar } from '../ProgressBar/ProgressBar';
import { FabreactorDisplayField } from '../Fields/DisplayField/DisplayField';

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

    private onRenderItemColumn = (item: any, index: number, column: IColumn) => {
        const { locales, fields } = this.props.store!;
        const field = fields.find(a => a.key == column.key);
        const value = item[column.key];

        return (
            <FabreactorDisplayField locales={locales} field={field!} value={value} />
        );
    }
   
    render() {
        const { columns, listItems, viewLoading, selection, actionProgress, keyProperty } = this.props.store!;
        const { renderMissingItem, onRenderItemColumn } = this;

        const detailList = viewLoading ? <Spinner /> : actionProgress ?
            <FabreactorProgressBar percentComplete={actionProgress!.percentComplete} description={actionProgress!.description}
                title={actionProgress!.title} />
            :
            <DetailsList items={listItems} onRenderMissingItem={renderMissingItem} key={keyProperty}
                onRenderItemColumn={onRenderItemColumn}
            selection={selection} selectionPreservedOnEmptyClick={true} columns={columns} />;

        return (
            <div>
                {detailList}
            </div>
        );
    }
}