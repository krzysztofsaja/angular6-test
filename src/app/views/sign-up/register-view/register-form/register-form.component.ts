import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { AbstractControl } from '@angular/forms/src/model';
import { AppState } from '@app/core';
import { Store } from '@ngrx/store';
import { ActionAddSignUp } from '@app/views/sign-up/sign-up.actions';

@Component({
  selector: 'user-registration-form',
  templateUrl: 'register-form.component.html',
  styleUrls: ['register-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterFormComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.registrationForm = this.formGroup;
  }

  get formGroup() {
    const latinValidator = Validators.pattern(new RegExp('^[a-zA-Z]+$'));
    return this.formBuilder.group({
      firstName: new FormControl('', [Validators.required, latinValidator]),
      lastName: new FormControl('', [latinValidator]),
      email: new FormControl('', [Validators.required, Validators.email]),
      idNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(new RegExp('^\\d{4}\\/\\d{4}\\/\\d{2}$'))
      ]),
      city: new FormControl('')
    });
  }

  get firstName(): AbstractControl {
    return this.registrationForm.get('firstName');
  }

  get lastName(): AbstractControl {
    return this.registrationForm.get('lastName');
  }

  get email(): AbstractControl {
    return this.registrationForm.get('email');
  }

  get idNumber(): AbstractControl {
    return this.registrationForm.get('idNumber');
  }

  get city(): AbstractControl {
    return this.registrationForm.get('city');
  }

  onSubmit(event) {
    this.store.dispatch(new ActionAddSignUp(this.registrationForm.value));
    this.registrationForm.reset();
    // This is needed because there is an angular bug: See https://github.com/angular/material2/issues/4190
    Object.keys(this.registrationForm.controls).forEach(key => {
      this.registrationForm.controls[key].setErrors(null);
    });
  }
}
