import locales from "../../../locales";

export interface IFabreactorDeleteFailedMessageBarProps {
    locales: locales;
    itemCount: number;
    onDismiss: () => void;
}
