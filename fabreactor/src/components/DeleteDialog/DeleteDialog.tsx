import * as React from 'react';
import { observer } from 'mobx-react';
import { IFabreactorDeleteDialogProps } from './IDeleteDialogProps';
import { Dialog, DialogFooter, DialogType } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';

@observer
export class FabreactorDeleteDialog extends React.Component<IFabreactorDeleteDialogProps, any> {

    constructor(props: IFabreactorDeleteDialogProps) {
        super(props);

    }

    render() {

        const { onCancel, onConfirm, locales, isVisible, itemCount } = this.props;

        const props = {
            type: DialogType.normal,
            title: locales.strings.formatString(locales.strings.confirmDeleteTitle, itemCount),
            subText: locales.strings.formatString(locales.strings.confirmDeleteText, itemCount)
        };

        return (
            <Dialog
                hidden={!isVisible}
                onDismiss={onCancel}
                dialogContentProps={props}>

                <DialogFooter>
                    <PrimaryButton onClick={onConfirm} text={locales.strings.yes} />
                    <DefaultButton onClick={onCancel} text={locales.strings.no} />
                </DialogFooter>
            </Dialog>
        );
    }
}