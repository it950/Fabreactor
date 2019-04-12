import FabricreatorListStore from "./ListStore";
import { computed, action } from "mobx";

export default class FabricreatorViewItemStore {

    root: FabricreatorListStore;

    @action
    public onDismiss = () => {
        this.root.dismissViewItemPanel();
    }

    @computed
    get isOpen() {
    
        return this.root.viewItemPanelVisible;
    }

    @computed
    get itemTitle() {
        if (this.root.currentViewItem) {
            return this.root.currentViewItem[this.root.itemProperties.title];
        }

        return null;
    }


    @computed
    get itemDescription() {
        if (this.root.currentViewItem) {
            return this.root.currentViewItem[this.root.itemProperties.description];
        }

        return null;
    }

    @computed
    get itemSecondaryDescription() {
        if (this.root.currentViewItem) {
            return this.root.currentViewItem[this.root.itemProperties.secondaryDescription];
        }

        return null;
    }

    @computed
    get itemColor() {
        if (this.root.currentViewItem) {
            return this.root.currentViewItem[this.root.itemProperties.color];
        }

        return null;
    }

    constructor(private rootStore: FabricreatorListStore) {
        this.root = this.rootStore;

    }
}