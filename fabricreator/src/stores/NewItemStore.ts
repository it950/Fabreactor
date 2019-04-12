import FabricreatorListStore from "./ListStore";
import { computed, observable } from "mobx";
import { FabricreatorField } from "../types";

export default class FabricreatorNewItemStore {

    root: FabricreatorListStore;

    @observable
    public newItem: any;

    @observable
    public newItemFields: FabricreatorField[] = [];

    constructor(private rootStore: FabricreatorListStore) {
        this.root = this.rootStore;

    }

    @computed
    get locales() {
        return this.root.locales;
    }


    @computed
    get isLoading() {
        return this.newItem == null;
    }


    @computed
    get title() {
        return this.root.locales.strings.newItem;
    }

    @computed
    get isOpen() {
        return this.root.newItemPanelVisible;
    }
}