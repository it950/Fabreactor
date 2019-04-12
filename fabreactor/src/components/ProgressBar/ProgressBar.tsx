import * as React from 'react';
import { observer } from 'mobx-react';
import { IFabreactorProgressBarProps } from './IProgressBarProps';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import './ProgressBar.module.css';

@observer
export class FabreactorProgressBar extends React.Component<IFabreactorProgressBarProps, any> {

    constructor(props: IFabreactorProgressBarProps) {
        super(props);
    }

    render() {
        const { title, description, percentComplete} = this.props;

        return (
            <ProgressIndicator className={"progressBarPadding"} label={title} description={description} percentComplete={percentComplete} />
        );
    }
}