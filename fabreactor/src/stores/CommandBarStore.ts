import { computed, observable, action } from "mobx";
import { ICommandBarItemProps } from "office-ui-fabric-react/lib/CommandBar";
import { IContextualMenuProps } from "office-ui-fabric-react/lib/ContextualMenu";
import FabreactorListStore from "./ListStore";

export default class FabreactorCommandBarStore {

    private root: FabreactorListStore;

    constructor(private rootStore: FabreactorListStore) {
        this.root = this.rootStore;

        this.currentViewKey = this.root.defaultViewKey;
    }

    @observable
    public searchQuery: string | null;

    @observable
    public currentViewKey: string | null;

    @observable
    public confirmDelete: boolean;

    @computed
    get locales() {
        return this.root.locales;
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
                key: "search",
            });
        }

        if (this.root.hasNewItem) {
            items.push({
                key: "new",
                iconProps: { iconName: "Add" },
                onClick: this.root.onNewItem,
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

        const menu: ICommandBarItemProps[] = [
            {
                key: 'currentView',
                name: this.currentView!.name,
                subMenuProps: subMenu
            }

        ];

        return menu;
    }

    @action
    public onViewClicked = (key: string) => {
        this.currentViewKey = key;
        this.root.onViewClicked(key);
    }

    @action
    public onSearch = (query: string) => {
        this.searchQuery = query;

       // of(onViewChange(this.props.views[0].key)).subscribe();
    }

    @action
    public onSearchCleared = () => {
        this.searchQuery = null;

      //  of(onViewChange(this.props.views[0].key)).subscribe();
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