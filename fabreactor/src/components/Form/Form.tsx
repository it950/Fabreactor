import * as React from 'react';
import { observer } from 'mobx-react';
import { IFabreactorFormProps } from './IFormProps';

@observer
export class FabreactorForm extends React.Component<IFabreactorFormProps, any> {

    constructor(props: IFabreactorFormProps) {
        super(props);

    }

    render() {
        const {  } = this.props;

        return (
            <form>

            </form>
        );
    }
}