import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormField } from 'src/app/agent-os/interfaces/form-field';
import { CardDataService } from 'src/app/agent-os/services/card-data.service';
import { StorageService } from 'src/app/agent-os/services/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent implements OnInit {
  data: any;
  form = new FormGroup({});
  snackBarRef: any;
  constructor(private cardDataService:CardDataService, public dialogRef: MatDialogRef<EditAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public popUpData: any,public storeService:StorageService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getFormData();
   
  }
  getFormData() {
    const editAcc=this.storeService.editAccount    
    if(editAcc){       
        for(const field of editAcc.input){
          this.form.addControl(field.controlName,new FormControl(field.value))
         } 
         this.data=editAcc         
              
    }else{
    const dataFileName = `assets/data/forms/edit-account.json`;
    this.cardDataService.getCardData(dataFileName).subscribe(
      (resp) => {
       for(const field of resp.input){
        this.form.addControl(field.controlName,new FormControl(field.value))
       }   
       this.data=resp;
      this.storeService.editAccount=this.data      
      },
      (err) => console.error(err),
      () => {
        
      }
    );
    }
  }
  public openSnackbar(): void {
    this.snackBar.open('Security Code Updated Successfully!!!.', 'x', {
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
  submit(){ 
    this.storeService.editAccount.input[0].value= this.form.controls['code'].value;   
    this.dialogRef.close('Updated Successfully');
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
