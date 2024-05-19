import { AbstractControl, ValidatorFn } from '@angular/forms';

export default class Validation {
  static valideEndDate(startDate: string, endDate: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const startControl = controls.get(startDate)
      const endControl = controls.get(endDate)

      if (endControl?.errors && !endControl.errors['invalidEndDate']) {
        return null
      }

      const startValue = new Date(startControl?.value)
      const endValue = new Date(endControl?.value)

      if (endValue < startValue) {
        controls.get(endDate)?.setErrors({ invalidEndDate: true })
        return { invalidEndDate: true }
      } else {
        return null
      }
    }
  }
}
