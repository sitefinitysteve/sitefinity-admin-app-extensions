import { Component } from "@angular/core";
import { FieldBase } from "@progress/sitefinity-adminapp-sdk/app/api/v1";

/**
 * The component used to display the MedportalSessionalDateDropdown field in read only mode.
 */
@Component({
    templateUrl: "./medportal-sessionaldate-dropdown-readonly.component.html",
    standalone: false
})
export class MedportalSessionalDateDropdownReadonlyComponent extends FieldBase {
    
    // Static dropdown options for lookup
    dropdownOptions = [
        { value: "option1", text: "Test Option 1" },
        { value: "option2", text: "Test Option 2" },
        { value: "option3", text: "Test Option 3" }
    ];

    getDisplayText(): string {
        const option = this.dropdownOptions.find(o => o.value === (this as any).value);
        return option ? option.text : (this as any).value || '';
    }
}
