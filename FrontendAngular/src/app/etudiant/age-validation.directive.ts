import { Directive, Input, forwardRef, Output, EventEmitter} from '@angular/core';
import { NG_ASYNC_VALIDATORS, AbstractControl, ValidationErrors, AsyncValidator, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Directive({
  selector: '[appAgeValidation][ngModel],[appAgeValidation][formControlName],[appAgeValidation][formControl]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => AgeValidationDirective),
      multi: true
    }
  ]
})
export class AgeValidationDirective implements AsyncValidator {
  @Input() appAgeValidation: number = 18;
  @Output() ageValidationStatus = new EventEmitter<boolean>();


  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.validateAge()(control);
  }

  private validateAge(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const value = control.value;
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();

       //pour le output property ces 2 lignes
       const isValid = !isNaN(birthDate.getTime()) && age >= this.appAgeValidation;
       this.ageValidationStatus.emit(isValid); // Émet 

      if (isNaN(birthDate.getTime()) || age < this.appAgeValidation) {
        return of({ appAgeValidation: true }); // Validation échoue
      } else {
        return of(null); // Validation réussie
      }
    };
  }
}
