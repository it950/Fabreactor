import * as React from 'react';
import { observer } from 'mobx-react';
import { IFabricreatorFormProps } from './IFormProps';

@observer
export class FabricreatorForm extends React.Component<IFabricreatorFormProps, any> {

    constructor(props: IFabricreatorFormProps) {
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