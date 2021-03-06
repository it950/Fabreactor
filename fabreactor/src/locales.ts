﻿import LocalizedStrings from 'react-localization';

export default class locales {

    public strings: any;

    constructor(language: string | null = null) {

        this.strings = new LocalizedStrings({
            en: {
                previous: "Back",
                next: "Next",
                new: "New",
                edit: "Edit",
                save: "Save",
                search: "Search",
                back: "Back",
                more: "more...",
                delete: "Delete",
                add: "Add",
                apply: "Apply",
                export: "Export",
                exporting: "Exporting...",
                filterBy: "Filter by",
                itemCreated: "Item created",
                askRedirect: "Would you like to view the item now?",
                clearFilters: "Clear filters",
                deletingItems: "Deleting items...",
                deleteFailed: "Failed to delete {0} item(s).",
                clearAll: "Clear all",
                loading: "Loading...",
                modifiedByLabel: "Modified {0} by {1}",
                createdByLabel: "Created {0} by {1}",
                sortOnTextAscending: "A to Z",
                sortOnTextDescending: "Z to A",
                sortOnDateAscending: "Older to newer",
                sortOnDateDescending: "Newer to older",
                sortOnNumberAscending: "Small to large",
                sortOnNumberDescending: "Large to small",
                loadingView: "Loading {0}...",
                cancel: "Cancel",
                empty: "(Empty)",
                yes: "Yes",
                no: "No",
                confirmDeleteTitle: "Delete {0} item(s)",
                confirmDeleteText: "{0} item(s) will be deleted. Are you sure?",
                newItem: "New item",
                searchPlaceholder: "Search...",
                urlNotValid: "{0} is not a valid url",
                emailNotValid: "{0} is not a valid email address",
                phoneNotValid: "{0} is not a valid phone number",
                numberNotValid: "{0} is not a valid number",
                loginNotValid: "{0} is not valid",
                requiredField: "{0} is required",
                finish: "Finish"
            },
            nl: {
                newItem: "Nieuw item",
                new: "Nieuw",
                edit: "Wijzigen",
                more: "meer...",
                apply: "Toepassen",
                empty: "(Leeg)",
                add: "Toevoegen",
                deletingItems: "Items verwijderen...",
                back: "Terug",
                itemCreated: "Item gemaakt",
                askRedirect: "Wil je het item nu bekijken?",
                filterBy: "Filteren op",
                clearFilters: "Filters wissen",
                deleteFailed: "{0} item(s) kunnen niet worden verwijderd.",
                clearAll: "Alles wissen",
                export: "Export",
                exporting: "Exporteren...",
                sortOnTextAscending: "A tot Z",
                sortOnTextDescending: "Z tot A",
                sortOnDateAscending: "Oud naar nieuw",
                sortOnDateDescending: "Nieuw naar oud",
                sortOnNumberAscending: "Klein naar groot",
                sortOnNumberDescending: "Groot naar klein",
                search: "Zoeken",
                save: "Opslaan",
                delete: "Verwijderen",
                modifiedByLabel: "{0} gewijzigd door {1}",
                createdByLabel: "{0} gemaakt door {1}",
                cancel: "Annuleren",
                loading: "Laden...",
                loadingView: "{0} laden...",
                confirmDeleteTitle: "Verwijder {0} item(s)",
                confirmDeleteText: "{0} item(s) worden verwijderd. Weet je het zeker?",
                yes: "Ja",
                no: "Nee",
                searchPlaceholder: "Zoeken...",
                urlNotValid: "{0} is geen geldige link",
                emailNotValid: "{0} is geen geldig email adres",
                phoneNotValid: "{0} is geen geldig telefoonnummer",
                numberNotValid: "{0} is geen geldig nummer",
                loginNotValid: "{0} is ongeldig",
                requiredField: "{0} is verplicht",
                previous: "Vorige",
                next: "Volgende",
                finish: "Opslaan"
            }
        });

        if (language == "nl-NL") {
            this.strings.setLanguage("nl");
        }
        else {
            this.strings.setLanguage("en");

        }
    }

}
