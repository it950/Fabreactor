import * as React from 'react';
import { observer } from 'mobx-react';
import { IFabreactorTextDisplayFieldProps } from './ITextDisplayFieldProps';

@observer
export class FabreactorTextDisplayField extends React.Component<IFabreactorTextDisplayFieldProps, any> {

    constructor(props: IFabreactorTextDisplayFieldProps) {
        super(props);

    }

    render() {

        const { value } = this.props;

        return (
            <span>
                {value}
            </span>
        );
    }
}