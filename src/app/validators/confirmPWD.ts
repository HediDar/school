import { FormGroup } from '@angular/forms';

// les param sont les noms des formControlName des input

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    // control et matching control sont  =>input pointers
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ myCustomError: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
