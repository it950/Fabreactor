﻿import { computed, action } from "mobx";
import { IColumn, Selection } from "office-ui-fabric-react/lib/DetailsList";
import FabricreatorListStore from "./ListStore";

export default class FabricreatorDetailsListStore {

    private root: FabricreatorListStore;

    public selection: Selection;

    constructor(private rootStore: FabricreatorListStore) {
        this.root = this.rootStore;

        this.selection = new Selection({ onSelectionChanged: this.root.onSelectionChanged });
    }

    @computed
    get keyProperty() {
        return this.root.keyProperty;
    }

    @computed
    get actionProgress() {
        return this.root.actionProgress;
    }

    @action
    public onNextPage = () => {
        return this.root.onNextPage();
    }

    @computed
    get listItems(): any[] {
        if (!this.root.hasNextPage) {
            return this.root.listItems;
        }

        return this.root.listItems.concat(null);
    }

    @computed
    get viewLoading(): boolean {
        return this.root.viewLoading;
    }

    @computed
    get columns(): IColumn[] {
        return this.root.currentViewFields.map(t => {
            return {
                key: t.key,
                name: t.name,
                fieldName: t.key,
                minWidth: t.minWidth ? t.minWidth : 100
            }
        });
    }

    public getKey = (item: any, index?: number) => {
        if (item) {
            return item[this.keyProperty];
        }

        return null;
        
    }

    public getSelection = () => {
        return this.selection.getSelection().filter(y => y != null);
    }

    public deselectKey = (key: any) => {
        console.log(key);
        this.selection.setKeySelected(key, false, false);
    }
}