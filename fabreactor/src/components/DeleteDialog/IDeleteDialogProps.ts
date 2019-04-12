import locales from "../../locales";

export interface IFabricreatorDeleteDialogProps {
    locales: locales;
    isVisible: boolean;
    itemCount: number;
    onConfirm: () => void;
    onCancel: () => void;

}
