# MedportalSessionalDateDropdown Custom Field

This is a simple dropdown custom field component for Sitefinity CMS Admin App with three static test options.

## Files Created

- `medportal-xhr-dropdown-write.component.ts` - Write mode component
- `medportal-xhr-dropdown-write.component.html` - Write mode template
- `medportal-xhr-dropdown-readonly.component.ts` - Read-only mode component  
- `medportal-xhr-dropdown-readonly.component.html` - Read-only mode template
- `medportal-xhr-dropdown.settings.ts` - Settings configuration

## Configuration

The component is registered to replace the "CurriculumBlock" field for news items in the custom fields provider. It provides three static options:

1. Test Option 1 (value: "option1")
2. Test Option 2 (value: "option2") 
3. Test Option 3 (value: "option3")

## Usage

When editing news items in the Sitefinity Admin App, the CurriculumBlock field will be rendered as a dropdown with the three test options instead of the default text input.

## Files Modified

- `custom-fields-provider.ts` - Added registration for the new dropdown component
- `index.ts` - Added the new components to the module declarations
