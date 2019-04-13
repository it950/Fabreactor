import { FabreactorField } from "../types";
import locales from "../locales";
import { observable } from "mobx";

export default class FabreactorFormValidator {

    @observable
    errorMessages: Map<string, string> = new Map();

    constructor(protected locales: locales) {
    }


    public validateForm = (fields: FabreactorField[], item: any) => {
        this.errorMessages.clear();

        fields.forEach(field => {
            const result = this.validateField(field, item[field.key]);

            if (result != "") {
                this.errorMessages.set(field.key, result);
            } 
        });

        return this.errorMessages.size == 0;
    }

    public validateField = (field: FabreactorField, value: any) => {
        if (field.required && (!value || value.length == 0)) {
            return this.locales.strings.formatString(this.locales.strings.requiredField, field.name);
        }

        return "";
    }
}