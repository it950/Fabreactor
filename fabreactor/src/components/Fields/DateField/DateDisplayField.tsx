import * as React from 'react';
import { observer } from 'mobx-react';
import { IFabreactorDateDisplayFieldProps } from './IDateDisplayFieldProps';
import * as moment from 'moment';

@observer
export class FabreactorDateDisplayField extends React.Component<IFabreactorDateDisplayFieldProps, any> {

    constructor(props: IFabreactorDateDisplayFieldProps) {
        super(props);

    }

    render() {

        const { asTimeAgo, value } = this.props;

        const content = value ? asTimeAgo ? moment(value).fromNow() :
            moment(value).format("DD-MM-YYYY") : <span></span>;

        return (
            <span>
                {content}
            </span>
        );
    }
}