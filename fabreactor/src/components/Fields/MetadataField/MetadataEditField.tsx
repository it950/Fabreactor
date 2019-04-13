import * as React from 'react';
import { observer } from 'mobx-react';
import { IFabreactorMetadataEditFieldProps } from './IMetadataEditFieldProps';
import { FabreactorMetadataButton } from './MetadataButton';
import { Label } from 'office-ui-fabric-react/lib/Label';

@observer
export class FabreactorMetadataEditField extends React.Component<IFabreactorMetadataEditFieldProps, any> {

    constructor(props: IFabreactorMetadataEditFieldProps) {
        super(props);

    }

    private onChange = (key: string, isChecked: boolean) => {
        const { onChange, value } = this.props.fieldProps;
        const { multiValue, options } = this.props;

        const option = options.find(d => d.key == key);

        if (!multiValue) {
            onChange(isChecked ? option : null);
        }
        else {
            let newValue: any[] = value ? value.map((t: any) => t) : [];

            if (isChecked) {
                newValue.push(option);
            }
            else {
                newValue = newValue.filter(r => r.key != key);
            }

            onChange(newValue);
        }
    }

    render() {
        const { value, label } = this.props.fieldProps;
        const { options, multiValue } = this.props;
        const { onChange } = this;

        const buttons = options.map(b => {
            const isChecked = value ? multiValue ? value.find((f: any) => f.key == b.key) != null : value.key == b.key : false;

            return <FabreactorMetadataButton key={b.key} id={b.key} label={b.title} isChecked={isChecked} onChange={onChange} />;
        });

        return (
            <span>
                <Label>
                    {label}
                </Label>

                {buttons}

            </span>
        );
    }
}