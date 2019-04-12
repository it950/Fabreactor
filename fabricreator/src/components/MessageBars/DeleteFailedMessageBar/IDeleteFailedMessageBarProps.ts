import locales from "../../../locales";

export interface IFabricreatorDeleteFailedMessageBarProps {
    locales: locales;
    itemCount: number;
    onDismiss: () => void;
}
