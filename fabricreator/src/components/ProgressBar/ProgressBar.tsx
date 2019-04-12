import * as React from 'react';
import { observer } from 'mobx-react';
import { IFabricreatorProgressBarProps } from './IProgressBarProps';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import './ProgressBar.module.css';

@observer
export class FabricreatorProgressBar extends React.Component<IFabricreatorProgressBarProps, any> {

    constructor(props: IFabricreatorProgressBarProps) {
        super(props);
    }

    render() {
        const { title, description, percentComplete} = this.props;

        return (
            <ProgressIndicator className={"progressBarPadding"} label={title} description={description} percentComplete={percentComplete} />
        );
    }
}