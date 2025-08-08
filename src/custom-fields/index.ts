import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

import { CUSTOM_FIELDS_PROVIDER } from "./provider";
import { MedportalSessionalDateDropdownWriteComponent } from "./sessionaldate-dropdown/medportal-sessionaldate-dropdown-write.component";
import { MedportalSessionalDateDropdownReadonlyComponent } from "./sessionaldate-dropdown/medportal-sessionaldate-dropdown-readonly.component";
import { FrameworkModule } from "@progress/sitefinity-adminapp-sdk/app/api/v1";
import { SfInputModule } from "@progress/sitefinity-component-framework";

/**
 * The custom fields module.
 */
@NgModule({
    declarations: [
        MedportalSessionalDateDropdownWriteComponent,
        MedportalSessionalDateDropdownReadonlyComponent
    ],
    providers: [
        CUSTOM_FIELDS_PROVIDER,
        provideHttpClient(withInterceptorsFromDi())
    ],
    // import the framework module as it holds the components that the AdminApp uses
    // for a list of components see
    imports: [CommonModule, FormsModule, SfInputModule, FrameworkModule]
})
export class MedportalCustomFieldsModule { }
