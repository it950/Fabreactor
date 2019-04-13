import { MessageBarType } from "office-ui-fabric-react/lib/MessageBar";

export interface IFabreactorMessageBarProps {
    type: MessageBarType;
    onDismiss: () => void;
}
