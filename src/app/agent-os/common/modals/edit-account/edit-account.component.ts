import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormField } from 'src/app/agent-os/interfaces/form-field';
import { CardDataService } from 'src/app/agent-os/services/card-data.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent implements OnInit {
  data: any;
  // formFields: FormField[] = [];
  form = new FormGroup({});
  constructor(private cardDataService:CardDataService, public dialogRef: MatDialogRef<EditAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public popUpData: any) { }

  ngOnInit(): void {
    this. getFormData();
    // this.httpClient
    // .get<FormField[]>('/assets/data/forms/form.json')
    // .subscribe((formFields) => {
    //   for (const formField of formFields) {
    //     this.form.addControl(
    //       formField.fieldName,
    //       new UntypedFormControl('', this.getValidator(formField))
    //     );
    //   }
    //   this.formFields = formFields;
    // });
    
    
  }
  getFormData() {
    const dataFileName = `assets/data/forms/edit-account.json`;
    this.cardDataService.getCardData(dataFileName).subscribe(
      (resp) => {
       for(const field of resp.input){
        this.form.addControl(field.controlName,new FormControl())
       }   
       this.data=resp;
      },
      (err) => console.error(err),
      () => {
        
      }
    );
  }
  submit(){
    console.log(this.form.value);
    
  }
  // private getValidator(formField: FormField): any {
  //   switch (formField.validator) {
  //     case 'email':
  //       return Validators.email;
  //     case 'required':
  //       return Validators.required;
  //     default:
  //       return null;
  //   }
  // }
 
  returnZero() {
    return 0;
  }
  close() {
    this.dialogRef.close("Thanks for using me!");
  }

}
