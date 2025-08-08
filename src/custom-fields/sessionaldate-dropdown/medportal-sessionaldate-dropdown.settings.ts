import { SettingsBase } from "@progress/sitefinity-adminapp-sdk/app/api/v1";

/**
 * A settings object to configure the MedportalSessionalDateDropdown field behavior.
 */
export class MedportalSessionalDateDropdownSettings extends SettingsBase {
    init(metadata: any) {
        super.init(metadata);
        
        // Set any default configurations for the dropdown field
        // Additional settings can be added here as needed
    }
}
