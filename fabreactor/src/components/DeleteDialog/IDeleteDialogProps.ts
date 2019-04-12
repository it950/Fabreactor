import locales from "../../locales";

export interface IFabreactorDeleteDialogProps {
    locales: locales;
    isVisible: boolean;
    itemCount: number;
    onConfirm: () => void;
    onCancel: () => void;

}
