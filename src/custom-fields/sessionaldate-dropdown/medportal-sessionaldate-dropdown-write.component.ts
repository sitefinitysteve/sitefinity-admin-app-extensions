import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FieldBase } from "@progress/sitefinity-adminapp-sdk/app/api/v1";

/**
 * The component used to display the SessionalDateDropdown field in write mode.
 */
@Component({
    selector: 'medportal-sessionaldate-dropdown-write',
    templateUrl: './medportal-sessionaldate-dropdown-write.component.html'
})
export class MedportalSessionalDateDropdownWriteComponent extends FieldBase implements OnInit {
    
    // Dynamic dropdown options populated from API
    options: { value: string, text: string }[] = [];
    isLoading = true;
    hasError = false;

    constructor(private http: HttpClient) {
        super();
    }

    ngOnInit() {
        try {
            const dataItem = (this as any)._settings.dataItem.data;
            const cohort = dataItem.Parent.Cohort;

            console.log('SessionalDateDropdown - DataItem:', dataItem);

            if (cohort) {
                this.loadOptions(cohort);
            } else {
                console.error('SessionalDateDropdown - No cohort found');
                this.isLoading = false;
            }
        } catch (error) {
            console.error('SessionalDateDropdown - Error accessing cohort:', error);
            this.isLoading = false;
        }
    }

    private loadOptions(cohort: string): void {
        const apiUrl = `/RestApi/sessional-dates/${cohort}/titles`;
        
        console.log('SessionalDateDropdown - Loading options from:', apiUrl);

        this.http.get<any>(apiUrl).subscribe({
            next: (response) => {
                console.log('SessionalDateDropdown - API Response:', response);
                
                // Process API response inline
                if (Array.isArray(response)) {
                    this.options = response.map((item, index) => {
                        const option = {
                            value: String(item.PeriodName || ''),
                            text: String(item.PeriodName || '')
                        };
                        return option;
                    });
                } else {
                    console.warn('SessionalDateDropdown - Expected array response, got:', response);
                    this.options = [];
                }

                console.log('SessionalDateDropdown - Final processed options:', this.options);
                this.isLoading = false;
            },
            error: (error) => {
                console.error('SessionalDateDropdown - API Error:', error);
                this.hasError = true;
                this.isLoading = false;
            }
        });
    }
}
