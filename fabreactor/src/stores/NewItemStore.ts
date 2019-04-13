import FabreactorListStore from "./ListStore";
import { computed, observable, action } from "mobx";
import { FabreactorFieldGroup, FabreactorButton, FabreactorField } from "../types";
import { ButtonType } from "office-ui-fabric-react/lib/Button";
import FabreactorFormValidator from "./FormValidator";
import { from, of, Subscription } from "rxjs";
import { map, catchError } from "rxjs/operators";

const BACK_BUTTON_KEY: string = "back";
const NEXT_BUTTON_KEY: string = "next";
const FINISH_BUTTON_KEY: string = "finish";

export default class FabreactorNewItemStore {

    root: FabreactorListStore;
    formValidator: FabreactorFormValidator;

    newItemSubscription: Subscription;
    addItemSubscription: Subscription;

    @observable
    public item: any;

    @observable
    public isSaving: boolean;

    @observable
    public isOpen: boolean;

    @observable
    public errorMessage: string | null;

    @observable
    public wizardStep: number = 0;

    @observable
    public groups: FabreactorFieldGroup[] = [];

    constructor(private rootStore: FabreactorListStore) {
        this.root = this.rootStore;

        this.formValidator = new FabreactorFormValidator(this.root.locales);

    }

    @computed
    get fields() {
        if (this.groups && this.groups.length > 0) {
            return this.groups[this.wizardStep].fields!.filter(a => !a.readOnly);
        }

        return [];
    }

    @computed
    get footerButtons(): FabreactorButton[] {
        if (this.isLoading || this.isSaving) {
            return [];
        }

        let items = [];

        if (this.wizardStep > 0) {
            items.push({ text: this.root.locales.strings.previous, key: BACK_BUTTON_KEY, type: ButtonType.default });
        }

        if (this.groups.length - 1 > this.wizardStep) {
            items.push({ text: this.root.locales.strings.next, key: NEXT_BUTTON_KEY, type: ButtonType.default });
        }

        items.push({ text: this.root.locales.strings.finish, key: FINISH_BUTTON_KEY, type: ButtonType.primary });

        return items;
    }

    @computed
    get locales() {
        return this.root.locales;
    }

    @computed
    get errorMessages() {
        return this.formValidator.errorMessages;
    }

    @computed
    get isLoading() {
        return this.item == null || this.groups == null;
    }


    @computed
    get title() {
        return this.root.locales.strings.newItem;
    }

    @action
    public dismissError = () => {
        this.errorMessage = null;
    }

    @action
    public open = () => {
        this.isOpen = true;

        this.newItemSubscription = from(this.root.onNewItem()).pipe(map(y => {
            this.groups = y.groups;
            this.item = y.item;
        })).subscribe();
    }

    @action
    public onFieldChange = (field: FabreactorField, value: any) => {
        this.item[field.key] = value;
    }


    @action
    private resetForm = () => {
        this.item = null;
        this.wizardStep = 0;
        this.isSaving = false;
        this.errorMessage = null;
        this.formValidator.errorMessages.clear();
    }

    @action
    public onDismiss = () => {
        this.cancelAll();
        this.resetForm();
        this.isOpen = false;
    }

    @action
    public onFooterButtonClick = (key: string) => {
        switch (key) {
            case BACK_BUTTON_KEY:
                this.wizardStep--;
                break;
            case NEXT_BUTTON_KEY:
                if (this.formValidator.validateForm(this.fields, this.item)) {
                    this.wizardStep++;
                }

                break;
            case FINISH_BUTTON_KEY:
                if (this.formValidator.validateForm(this.fields, this.item)) {
                    this.isSaving = true;

                    this.addItemSubscription = from(this.root.onAddItem(this.item))
                        .pipe(map(y => {
                            this.resetForm();
                            this.isOpen = false;

                        }), catchError((error: Error, c) => {
                            this.isSaving = false;
                            this.errorMessage = error.message;
                            return of(error);
                        })).subscribe();
                }

                break;
        }
    }

    private cancelAll = () => {
        if (this.newItemSubscription) {
            this.newItemSubscription.unsubscribe();
        }

        if (this.addItemSubscription) {
            this.addItemSubscription.unsubscribe();
        }

    }

    public onFieldValidate = (field: FabreactorField, value: any) => {
        return this.formValidator.validateField(field, value);
    }
}