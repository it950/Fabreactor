import { FabreactorField, FabreactorFieldType } from "../types";
import locales from "../locales";
import { observable, action } from "mobx";

export default class FabreactorFormValidator {

    @observable
    errorMessages: Map<string, string> = new Map();

    constructor(protected locales: locales) {
    }

    @action
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

    @action
    public validateField = (field: FabreactorField, value: any) => {
        if (field.required && (!value || value.length == 0)) {
            return this.locales.strings.formatString(this.locales.strings.requiredField, field.name);
        }

        switch (field.type) {
            case FabreactorFieldType.number:
                if (isNaN(value)) {
                    return this.locales.strings.formatString(this.locales.strings.numberNotValid, field.name);
                }

                break;
            case FabreactorFieldType.url:
                if (value && value.length > 0 && !this.validateUrl(value)) {
                    return this.locales.strings.formatString(this.locales.strings.urlNotValid, field.name);
                }
            case FabreactorFieldType.email:
                if (value && value.length > 0 && !this.validateEmail(value)) {
                    return this.locales.strings.formatString(this.locales.strings.emailNotValid, field.name);
                }

                break;
            case FabreactorFieldType.phone:
                if (value && value.length > 0 && !this.validatePhone(value)) {
                    return this.locales.strings.formatString(this.locales.strings.phoneNotValid, field.name);
                }

                break;
            default:
                break;
        }

        if (this.errorMessages.has(field.key)) {
            this.errorMessages.delete(field.key);
        }

        return "";
    }

    private validateUrl = (url: string) => {
        return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(url);
    }

    private validatePhone = (phone: string) => {
        return /(^\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{10}$)/.test(phone);
    //    return re.test(String(phone).toLowerCase());
    }

    private validateEmail = (email: string) => {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
       // return re.test(String(email).toLowerCase());
    }
}