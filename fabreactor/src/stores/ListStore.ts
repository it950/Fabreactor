import { observable, action, computed, toJS } from "mobx";
import { FabreactorResultPage, FabreactorView, FabreactorQuery, FabriactActionProgress } from "../types";
import FabreactorCommandBarStore from "./CommandBarStore";
import FabreactorDetailsListStore from "./DetailsListStore";
import locales from "../locales";
import { IFabreactorListProps } from "../index";
import { from, Subscription } from "rxjs";
import { concatMap, map, finalize } from "rxjs/operators";
import FabreactorViewItemStore from "./ViewItemStore";
import FabreactorNewItemStore from "./NewItemStore";

export default class FabreactorListStore {

    public commandBarStore: FabreactorCommandBarStore;
    public detailsListStore: FabreactorDetailsListStore;
    public viewItemStore: FabreactorViewItemStore;
    public newItemStore: FabreactorNewItemStore;

    public locales: locales;

    private deleteSubscription: Subscription;
    private viewSubscription: Subscription;
    private searchSubscription: Subscription;

    @observable
    public items: FabreactorResultPage[] = [];

    @observable
    public views: FabreactorView[];

    @observable
    public selectedItems: any[] = [];

    @observable
    public viewLoading: boolean;

    @observable
    public viewItemPanelVisible: boolean;

    @observable
    public actionProgress: FabriactActionProgress | null;

    @observable
    private itemsDeleteFailed: any[] = [];

    constructor(protected api: IFabreactorListProps) {
        this.views = api.views;

        this.locales = new locales(this.api.language);
        
        this.commandBarStore = new FabreactorCommandBarStore(this);
        this.detailsListStore = new FabreactorDetailsListStore(this);
        this.viewItemStore = new FabreactorViewItemStore(this);
        this.newItemStore = new FabreactorNewItemStore(this);
    }

    @computed
    get failedDeleteItemCount() {
        return this.itemsDeleteFailed.length;
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
    get currentViewFields() {
        return this.commandBarStore.currentViewFields;
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
        return this.api.onNewItem != null && this.api.onAddItem != null;
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

    @computed
    get itemProperties() {
        return this.api.itemProperties;
    }

    @action
    public onSelectionChanged = () => {
        const selection = this.detailsListStore.getSelection();

        this.viewItemPanelVisible = selection.length == 1 && selection.length >= this.selectedItems.length;
        this.selectedItems = selection;
    }


    @action
    public onNextPage = () => {
        this.fetchView(this.buildQuery(this.nextPage));
    }

    @action
    public onShowNewWizard = () => {
        this.newItemStore.open();
    }

    @action
    public onNewItem = () => {
        return this.api.onNewItem!();
    }

    @action
    public onSearch = (query: string) => {
        this.fetchSearch(query, 1);
    }


    @action
    public onAddItem = (item: any) => {
        return from(this.api.onAddItem!(toJS(item))).pipe(map(y => {
            this.addItem(y);

            return y;
        })).toPromise();
    }

    @action
    public onViewClicked = (viewKey: string) => {
        this.fetchView(this.buildQuery(1));
    }


    @action
    private mapResultPage = (viewId: string, result: FabreactorResultPage) => {
        if (this.commandBarStore.currentViewKey == viewId || viewId == this.commandBarStore.searchKey) {
            if (result.page == 1) {
                this.items = [{ items: result.items, page: result.page, totalPages: result.totalPages }];
            }
            else {
                if (this.nextPage == result.page) {
                    this.items.push({ items: result.items, page: result.page, totalPages: result.totalPages });
                }
            }
        }
    }


    @action
    private addItem = (item: any) => {
        if (this.items.length > 0) {
            const items = this.items[0].items;
            items.splice(0, 0, item);
        }
        else {
            this.items = [{ items: [ item ], page: 1, totalPages: 1 }]
        }
    }

    @action
    private removeItem = (itemId: any) => {
        this.items.forEach(t => {
            t.items = t.items.filter(t => t[this.api.itemProperties.key] != itemId);
        });
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
    private onGetSearch = (query: string, page: number) => {
        if (page == 1) {
            this.viewLoading = true;
        }

        return from(this.api.onSearch!(query, page)).pipe(
            map(y => this.mapResultPage(this.commandBarStore.searchKey, y)),
            finalize(() => {
                this.viewLoading = false;
            }));
    }

    @action
    private onGetView = (query: FabreactorQuery) => {
        if (query.page == 1) {
            this.viewLoading = true;
        }

        return from(this.api.onGetView(query)).pipe(
            map(y => this.mapResultPage(query.viewKey, y)),
            finalize(() => {
                this.viewLoading = false;
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

        if (this.searchSubscription) {
            this.searchSubscription.unsubscribe();
        }

        this.viewLoading = false;
    }

    @action
    public cancelAllActions = () => {
        this.cancelDelete();
        this.cancelView();
    }


    public fetchSearch = (query: string, page: number) => {
        this.cancelView();
        this.cancelDelete();

        this.searchSubscription = this.onGetSearch(query, page).subscribe();
    }

    public fetchView = (query: FabreactorQuery) => {
        this.cancelView();
        this.cancelDelete();

        this.viewSubscription = this.onGetView(query).subscribe();
    }

    private buildQuery = (page: number) => {
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