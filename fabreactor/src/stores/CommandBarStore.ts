import { computed, observable, action } from "mobx";
import { ICommandBarItemProps } from "office-ui-fabric-react/lib/CommandBar";
import { IContextualMenuProps } from "office-ui-fabric-react/lib/ContextualMenu";
import FabreactorListStore from "./ListStore";

const SEARCH_KEY: string = "search";

export default class FabreactorCommandBarStore {

    private root: FabreactorListStore;

    @observable
    public searchQuery: string | null;

    @observable
    public currentViewKey: string | null;

    @observable
    public confirmDelete: boolean;

    constructor(private rootStore: FabreactorListStore) {
        this.root = this.rootStore;

        this.currentViewKey = this.root.defaultViewKey;
    }

    @computed
    get locales() {
        return this.root.locales;
    }

    @computed
    get searchKey() {
        return SEARCH_KEY;
    }

    @computed
    get selectedItemCount() {
        return this.root.selectedItems.length;
    }

    @computed
    get currentView() {
        return this.root.views.find(t => t.key == this.currentViewKey);
    }

    @computed
    get items(): ICommandBarItemProps[] {

        let items: ICommandBarItemProps[] = [];

        if (this.root.hasSearch) {
            items.push({
                key: SEARCH_KEY,
            });
        }

        if (this.root.hasNewItem) {
            items.push({
                key: "new",
                iconProps: { iconName: "Add" },
                onClick: this.root.onShowNewWizard,
                name: this.root.locales.strings.new,
            });
        }


        if (this.root.hasDelete && this.root.selectedItems.length > 0) {
            items.push({
                key: "delete",
                iconProps: { iconName: "Delete" },
                onClick: this.onDeleteClicked,
                name: this.root.locales.strings.delete,
            });
        }

        return items;
    }

    @computed
    get farItems(): ICommandBarItemProps[] {
        const subMenu: IContextualMenuProps = {
            items: this.root.views.map(t => {
                return {
                    key: t.key,
                    name: t.name,
                    onClick: () => {
                        this.onViewClicked(t.key);
                    }
                };
            })
        };

        const searchName = `${this.locales.strings.search}: ` + this.searchQuery;

        if (this.searchQuery != null) {
            subMenu.items.push({
                name: searchName,
                key: SEARCH_KEY,
            });
        }

        const menu: ICommandBarItemProps[] = [
            {
                key: 'currentView',
                name: this.searchQuery ? searchName : this.currentView!.name,
                subMenuProps: subMenu
            }

        ];

        return menu;
    }

    @computed
    get currentViewFields() {
        if (this.currentView) {
            return this.currentView.fields;
        }

        if (this.searchQuery) {
            return this.root.views.find(r => r.key == this.root.defaultViewKey)!.fields;
        }

        return [];
    }

    @action
    public onViewClicked = (key: string) => {
        if (this.currentViewKey != key && key != SEARCH_KEY) {
            this.searchQuery = null;
            this.currentViewKey = key;
            this.root.onViewClicked(key);
        }
    }

    @action
    public onSearch = (query: string) => {
        this.searchQuery = query;
        this.currentViewKey = this.searchKey;

        this.root.onSearch(this.searchQuery);
    }

    @action
    public onSearchCleared = () => {
        this.searchQuery = null;
        

        console.log(this.root.defaultViewKey);
        this.onViewClicked(this.root.defaultViewKey);
    }

    @action
    public onDeleteClicked = () => {
        this.confirmDelete = true;
    }

    @action
    public onDeleteDismissed = () => {
        this.confirmDelete = false;
    }

    @action
    public onDeleteConfirmed = () => {
        this.confirmDelete = false;

        this.root.onDeleteItems();
    }
}