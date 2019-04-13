import * as React from 'react';
import { observer } from 'mobx-react';
import { IFabreactorMetadataButtonProps } from './IMetadataButtonProps';
import { ButtonType } from 'office-ui-fabric-react/lib/Button';
import { FabreactorButton } from '../../Buttons';

@observer
export class FabreactorMetadataButton extends React.Component<IFabreactorMetadataButtonProps, any> {

    constructor(props: IFabreactorMetadataButtonProps) {
        super(props);

    }

    private onSelect = (key: string) => {
        const { onChange } = this.props;

        onChange(key, true);
    }

    private onDeselect = (key: string) => {
        const { onChange } = this.props;

        onChange(key, false);
    }

    render() {
        const { isChecked, id, label } = this.props;
        const { onSelect, onDeselect } = this;

        const buttonProps = {
            key: id,
            text: label,
            type: isChecked ? ButtonType.primary : ButtonType.default,
        };

        const button = isChecked ?
            <FabreactorButton button={buttonProps} onClick={onDeselect} />
            : <FabreactorButton button={buttonProps} onClick={onSelect} />;
        
        return (
            <span>
                {button}
            </span>
        );
    }
}