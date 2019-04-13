import * as React from 'react';
import { observer } from 'mobx-react';
import { IFabreactorButtonRowProps } from './IButtonRowProps';
import { FabreactorButton } from '../Button/Button';
import './ButtonRow.module.css';

@observer
export class FabreactorButtonRow extends React.Component<IFabreactorButtonRowProps, any> {

    constructor(props: IFabreactorButtonRowProps) {
        super(props);
    }

    render() {
        const { buttons, onClick } = this.props;

        const buttonsHtml = buttons.map(y => {
            const button = <FabreactorButton button={y} onClick={onClick} />;

            return <span key={y.key} className={"buttonRowPadding"} >
                {button}
            </span>;
        });

        return (
            <span>
                {buttonsHtml}
            </span>
        );
    }
}