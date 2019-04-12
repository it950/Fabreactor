import { observable, action, computed } from "mobx";
import { FabricreatorResultPage, FabricreatorView, FabricreatorQuery, FabriactActionProgress } from "../types";
import FabricreatorCommandBarStore from "./CommandBarStore";
import FabricreatorDetailsListStore from "./DetailsListStore";
import locales from "../locales";
import { IFabricreatorListProps } from "../index";
import { from, Subscription } from "rxjs";
import { concatMap, map, finalize } from "rxjs/operators";
import FabricreatorViewItemStore from "./ViewItemStore";
import FabricreatorNewItemStore from "./NewItemStore";

export default class FabricreatorListStore {

    public commandBarStore: FabricreatorCommandBarStore;
    public detailsListStore: FabricreatorDetailsListStore;
    public viewItemStore: FabricreatorViewItemStore;
    public newItemStore: FabricreatorNewItemStore;

    public locales: locales;

    private deleteSubscription: Subscription;
    private viewSubscription: Subscription;


    @observable
    public items: FabricreatorResultPage[] = [];

    @observable
    public views: FabricreatorView[];

    @observable
    public selectedItems: any[] = [];

    @observable
    public viewLoading: boolean;

    @observable
    public viewItemPanelVisible: boolean;

    @observable
    public newItemPanelVisible: boolean;


    @observable
    public actionProgress: FabriactActionProgress | null;

    @observable
    public itemsDeleteFailed: any[] = [];

    constructor(protected api: IFabricreatorListProps) {
        this.views = api.views;

        this.locales = new locales(this.api.language);
        this.commandBarStore = new FabricreatorCommandBarStore(this);
        this.detailsListStore = new FabricreatorDetailsListStore(this);
        this.viewItemStore = new FabricreatorViewItemStore(this);
        this.newItemStore = new FabricreatorNewItemStore(this);
    }

    @computed
    get listItems(): any[] {
        const items = [].concat.apply([], this.items.map(y => y.items));

        return items;
    }

    @computed
    get hasNextPage() {
        return this.nextPage > 1;
    }

    @computed
    get keyProperty() {
        return this.api.itemProperties.key;
    }

    @computed
    get hasDelete() {
        return this.api.onDeleteItem != null;
    }

    @computed
    get hasSearch() {
        return this.api.onSearch != null;
    }

    @computed
    get hasNewItem() {
        return this.api.onNewItem != null;
    }

    @computed
    get nextPage() {

        if (this.items && this.items.length > 0 && this.items[this.items.length - 1].totalPages > this.items[this.items.length - 1].page) {
            const lastItem = this.items[this.items.length - 1];

            if (lastItem.totalPages > lastItem.page) {
                return lastItem.page + 1;
            }
        }

        return 1;
    }

    @computed
    get currentViewFields() {
        if (this.commandBarStore.currentView) {
            return this.commandBarStore.currentView.fields;
        }

        return [];
    }

    @computed
    get currentViewKey() {
        if (this.commandBarStore.currentView) {
            return this.commandBarStore.currentView.key;
        }

        return null;
    }

    @computed
    get currentViewItem() {
        if (this.selectedItems.length == 1) {
            return this.selectedItems[0];
        }

        return null;
    }


    @computed
    get defaultViewKey() {
        if (this.api.defaultViewKey) {
            return this.api.defaultViewKey;
        }

        return this.views[0].key;
    }


    @action
    public onSelectionChanged = () => {
        this.viewItemPanelVisible = this.detailsListStore.getSelection().length == 1 && this.detailsListStore.getSelection().length >= this.selectedItems.length;
        this.selectedItems = this.detailsListStore.getSelection();
    }


    @action
    public onNextPage = () => {
        this.fetchView(this.buildQuery(this.nextPage));

    }

    @action
    public onSearch = (query: string) => {
        if (this.api.onSearch) {
            return this.api.onSearch(query);
        }

        return null;
    }

    @action
    public onNewItem = () => {
        this.newItemPanelVisible = true;

        from(this.api.onNewItem!()).pipe(map(y => {
            this.newItemStore.newItemFields = y.fields;
            this.newItemStore.newItem = y.item;
            console.log(y);
        })).subscribe();

     //   return null;

    }
    @action
    public onViewClicked = (viewKey: string) => {
        this.cancelDelete();

        this.fetchView(this.buildQuery(1));
    }


    @action
    public fetchView = (query: FabricreatorQuery) => {
        this.cancelView();

        this.viewSubscription = this.onGetView(query).subscribe();
    }

    @action
    public onGetView = (query: FabricreatorQuery) => {
        if (query.page == 1) {
            this.viewLoading = true;
        }

        return from(this.api.onGetView(query)).pipe(map(y => {
                const { page, items, totalPages } = y;

                if (this.currentViewKey == query.viewKey) {
                    if (page == 1) {
                        this.items = [{ items: items, page: page, totalPages: totalPages }];
                    }
                    else {
                        if (this.nextPage == page) {
                            this.items.push({ items: items, page: page, totalPages: totalPages });
                        }
                    }
                }

                this.viewLoading = false; 
            }));
    }


    @action
    private removeItem = (itemId: any) => {
        this.items.forEach(t => {
            t.items = t.items.filter(t => t[this.api.itemProperties.key] != itemId);
        });
    }


    @computed
    get itemProperties() {
        return this.api.itemProperties;
    }

    @action
    public dismissViewItemPanel = () => {
        this.viewItemPanelVisible = false;
    }

    @action
    public dismissFailedDelete = () => {
        this.itemsDeleteFailed = [];
    }

    @action
    public onDeleteItems = () => {
        this.cancelDelete();

        this.actionProgress = {
            title: this.locales.strings.deletingItems,
            percentComplete: 0
        };

        this.itemsDeleteFailed = [];

        let failedItems: any[] = [];

        this.deleteSubscription = this.deleteItems(this.selectedItems).pipe(map(u => {
            this.actionProgress!.percentComplete = u.index / this.selectedItems.length;
            this.actionProgress!.description = u.title;

            if (u.deleted) {
                this.removeItem(u.id);
            }
            else {
                failedItems.push(u.id);
            }

        }), finalize(() => {
            this.actionProgress = null;
            this.itemsDeleteFailed = failedItems;
            this.detailsListStore.selection.setItems(this.detailsListStore.listItems);

            // TODO Select items where delete failed

            //this.itemsDeleteFailed.forEach(t => {
            //    this.detailsListStore.selection.setKeySelected(t, true, false);
            //});
        })).subscribe();
    }

    @action
    private deleteItems = (items: any[]) => {
        return from(items)
            .pipe(concatMap(y => this.api.onDeleteItem!(y[this.api.itemProperties.key]), (a, b, index) => {
                return {
                    id: a[this.api.itemProperties.key],
                    title: a[this.api.itemProperties.title],
                    deleted: b,
                    index: index
                };
            }));
    }

    @action
    private cancelDelete = () => {
        if (this.deleteSubscription) {
            this.deleteSubscription.unsubscribe();
        }

        this.actionProgress = null;
    }

    @action
    private cancelView = () => {
        if (this.viewSubscription) {
            this.viewSubscription.unsubscribe();
        }

        this.viewLoading = false;
    }


    @action
    public cancelAllActions = () => {
        this.cancelDelete();
        this.cancelView();
    }

    private buildQuery(page: number) {
        return {
            viewKey: this.commandBarStore.currentView!.key,
            page: page,
            filters: []
        }
    }

    public init = () => {
        this.fetchView(this.buildQuery(1));
    }
}