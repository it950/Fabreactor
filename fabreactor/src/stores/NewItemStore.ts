import FabreactorListStore from "./ListStore";
import { computed, observable } from "mobx";
import { FabreactorField } from "../types";

export default class FabreactorNewItemStore {

    root: FabreactorListStore;

    @observable
    public newItem: any;

    @observable
    public newItemFields: FabreactorField[] = [];

    constructor(private rootStore: FabreactorListStore) {
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