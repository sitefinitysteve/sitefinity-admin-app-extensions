import { Injectable, ClassProvider } from "@angular/core";

import { FIELDS_PROVIDER_TOKEN, FieldData, FieldsProvider, SettingsBase, FieldTypes } from "@progress/sitefinity-adminapp-sdk/app/api/v1";
import { FieldRegistration } from "@progress/sitefinity-adminapp-sdk/app/api/v1";
import { RegistrationPair } from "./registration-pair";

import { MedportalSessionalDateDropdownWriteComponent } from "./sessionaldate-dropdown/medportal-sessionaldate-dropdown-write.component";
import { MedportalSessionalDateDropdownReadonlyComponent } from "./sessionaldate-dropdown/medportal-sessionaldate-dropdown-readonly.component";
import { MedportalSessionalDateDropdownSettings } from "./sessionaldate-dropdown/medportal-sessionaldate-dropdown.settings";

/**
 * The fields provider provides the overridden fields back to the AdminApp.
 */
@Injectable()
export class CustomFieldsProvider implements FieldsProvider {
    private customFieldsMappings: RegistrationPair[];

    constructor() {
        console.log('Medportal CustomFieldsProvider extension loading...');
        this.customFieldsMappings = [];

        this.registerCustomComponents();
    }

    /**
     * This method gets called before each field is instantiated, allowing custom fields to be plugged in for any type.
     * @param fieldRegistryKey The metadata needed to determine which field to display.
     */
    overrideField(fieldRegistryKey: FieldData): FieldRegistration {
        // Log field data as single line JSON

        const registration: FieldRegistration = this.findRegistration(fieldRegistryKey);
        if (registration) {
            console.log('✅ Found custom registration for field:', fieldRegistryKey.fieldName, JSON.stringify(fieldRegistryKey));
        } else {
            console.log('FIELD_DATA:', JSON.stringify(fieldRegistryKey));
        }

        return registration;
    }

    /**
     * This method finds an implementation of the field to be overridden.
     * @param fieldRegistryKey The metadata needed to determine which field to display.
     */
    private findRegistration(fieldRegistryKey: FieldData): FieldRegistration {
        for (const pair of this.customFieldsMappings) {
            if (fieldRegistryKey.fieldName === pair.key.fieldName &&
                fieldRegistryKey.fieldType === pair.key.fieldType &&
                fieldRegistryKey.typeName === pair.key.typeName) {
                    return pair.registration;
            }

            if (pair.key.fieldName === null &&
                pair.key.typeName === null &&
                fieldRegistryKey.fieldType === pair.key.fieldType) {
                return pair.registration;
            }
        }

        return null;
    }

    /**
     * Initializes the custom field(component) registrations.
     */
    private registerCustomComponents(): void {

        // Registration of MedportalSessionalDateDropdown custom field
        // const MedportalSessionalDateDropdownKey: FieldData = {
        //     fieldName: "CurriculumBlock",
        //     fieldType: FieldTypes.shortTextDefault,
        //     typeName: "newsitems"
        // };
        //{"fieldType":"sf-short-text","fieldName":"CurriculumBlock","typeName":"taskitems"}
        const MedportalSessionalDateDropdownKey: FieldData = {
            fieldName: "CurriculumBlock",
            fieldType: "sf-short-text",
            typeName: "taskitems"
        };

        const MedportalSessionalDateDropdownRegistration: FieldRegistration = {
            writeComponent: MedportalSessionalDateDropdownWriteComponent,
            readComponent: MedportalSessionalDateDropdownReadonlyComponent,
            settingsType: MedportalSessionalDateDropdownSettings
        };

        const MedportalSessionalDateDropdownRegistrationPair: RegistrationPair = {
             key: MedportalSessionalDateDropdownKey,
             registration: MedportalSessionalDateDropdownRegistration
        };

        this.customFieldsMappings.push(MedportalSessionalDateDropdownRegistrationPair);
        console.log('MedportalSessionalDateDropdown field registered for CurriculumBlock');
    }
}

/**
 * Export a 'multi' class provider so that multiple instances of the same provider can coexist.
 * This allows for more than one provider to be registered within one or more bundles.
 */
export const CUSTOM_FIELDS_PROVIDER: ClassProvider = {
    provide: FIELDS_PROVIDER_TOKEN,
    useClass: CustomFieldsProvider,
    multi: true
};
