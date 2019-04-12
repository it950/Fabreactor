import * as React from 'react';
import { observer } from 'mobx-react';
import './ItemPanel.module.css';
import { IFabreactorItemPanelProps } from './IItemPanelProps';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';

@observer
export class FabreactorItemPanel extends React.Component<IFabreactorItemPanelProps, any> {

    constructor(props: IFabreactorItemPanelProps) {
        super(props);
    }

    public onRenderHeader = (): JSX.Element => {
        return (<span></span>);
    }

    public onRenderNavigation = (): JSX.Element => {
        const { onDismiss, color, title, description, secondaryDescription, image } = this.props;

        return (
            <div>
                <div className={"itemPanelHeader"} style={{ backgroundColor: color }}>
                    <div className={"ms-Grid itemPanelHeaderGrid"}>
                        <div className={"ms-Grid-row"}>
                            <div className={"ms-Grid-col ms-sm3 ms-md3 ms-lg2"}>
                                <Persona imageUrl={image} size={PersonaSize.size72} hidePersonaDetails={true} />
                            </div>
                            <div className={"ms-Grid-col ms-sm8 ms-md8 ms-lg9"}>

                                <div className={"ms-Grid"}>
                                    <div className={"ms-Grid-row"}>
                                        <div className={"ms-Grid-col ms-sm12"}>
                                            <div className={"itemPanelLargeFont"}>
                                                {title}
                                            </div>
                                        </div>

                                    </div>
                                    <div className={"ms-Grid-row"}>
                                        <div className={"ms-Grid-col ms-sm12 "}>
                                            <div className={"itemPanelSmallFont"}>
                                                {description}
                                            </div>
                                        </div>

                                    </div>
                                    <div className={"ms-Grid-row"}>
                                        <div className={"ms-Grid-col ms-sm12"}>
                                            <div className={"itemPanelLargeFont"}>
                                                {secondaryDescription}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className={"ms-Grid-col ms-sm1"}>
                                <div className={"ms-textAlignRight"}>
                                    <i onClick={onDismiss} className={"ms-Icon ms-Icon--ChromeClose itemPanelCloseButton"} aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>




            </div>
        );
    }

    render() {
        const { isOpen, onDismiss } = this.props;
        const { onRenderHeader, onRenderNavigation } = this;

        return (
            <Panel isOpen={isOpen} type={PanelType.medium} isLightDismiss={true}
                onDismiss={onDismiss} onRenderHeader={onRenderHeader} onRenderNavigation={onRenderNavigation}>

                {this.props.children}

            </Panel>
        );
    }
}