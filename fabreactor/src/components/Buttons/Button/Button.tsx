import * as React from 'react';
import { observer } from 'mobx-react';
import { IFabreactorButtonProps } from './IButtonProps';
import { PrimaryButton, DefaultButton, ButtonType } from 'office-ui-fabric-react/lib/Button';

@observer
export class FabreactorButton extends React.Component<IFabreactorButtonProps, any> {

    constructor(props: IFabreactorButtonProps) {
        super(props);

    }

    private onClick = () => {
        const { button, onClick } = this.props;

        onClick(button.key);
    }

    render() {
        const { button } = this.props;
        const { onClick } = this;

        let buttonsHtml = null;

        switch (button.type) {
            case ButtonType.primary:
                buttonsHtml = <PrimaryButton onClick={onClick} text={button.text} />
                break;
            case ButtonType.default:
                buttonsHtml = <DefaultButton onClick={onClick} text={button.text} />
                break;
            default:
                break;
        }

        return (
            <span>
                {buttonsHtml}
            </span>
        );
    }
}