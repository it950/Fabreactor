import { FabreactorButton } from "../../../types";

export interface IFabreactorButtonRowProps {
    buttons: FabreactorButton[];
    onClick: (buttonKey: string) => void;
}
