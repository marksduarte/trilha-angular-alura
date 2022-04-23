import { AbstractControl } from '@angular/forms';

export function minusculoValidator(control: AbstractControl) {
  const value = control.value as string;
  return value !== value.toLowerCase() ? { minusculo: true } : null;
}
