import * as React from 'react';
import { observer } from 'mobx-react';
import { IFabreactorFieldLabelProps } from './IFieldLabelProps';
import { Label } from 'office-ui-fabric-react/lib/Label';

@observer
export class FabreactorFieldLabel extends React.Component<IFabreactorFieldLabelProps, any> {

    constructor(props: IFabreactorFieldLabelProps) {
        super(props);

    }

    render() {
        const { required, label } = this.props;

        return (
            <Label className={"modernFieldLabel"} required={required}>
                {label}
            </Label>
        );

    }
}