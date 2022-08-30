import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { FormField } from '../../interfaces/form-field';

@Component({
  selector: 'app-dynamicform',
  templateUrl: './dynamicform.component.html',
  styleUrls: ['./dynamicform.component.scss'],
})
export class DynamicformComponent implements OnInit {
  formFields: FormField[] = [];
  form = new UntypedFormGroup({});

  constructor(
    private httpClient: HttpClient,
    private cdref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.httpClient
      .get<FormField[]>('/assets/data/forms/form.json')
      .subscribe((formFields) => {
        for (const formField of formFields) {
          this.form.addControl(
            formField.fieldName,
            new UntypedFormControl('', this.getValidator(formField))
          );
        }
        this.formFields = formFields;
      });
  }
  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  onSubmit(): void {
    if (this.form.valid) {
      let value = this.form.value;
      console.log(value);
    }
  }

  private getValidator(formField: FormField): any {
    switch (formField.validator) {
      case 'email':
        return Validators.email;
      case 'required':
        return Validators.required;
      default:
        return null;
    }
  }
}
