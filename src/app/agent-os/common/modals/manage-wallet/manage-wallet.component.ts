import { Component, Inject, OnInit } from '@angular/core';
import { CardDataService } from '../../../services/card-data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-manage-wallet',
  templateUrl: './manage-wallet.component.html',
  styleUrls: ['./manage-wallet.component.scss']
})
export class ManageWalletComponent implements OnInit {
  data: any;
  form = new FormGroup({});

  constructor( private cardDataService:CardDataService, public dialogRef: MatDialogRef<ManageWalletComponent>,
    @Inject(MAT_DIALOG_DATA) public popUpData: any) { }

  ngOnInit(): void {
    this.getFormData()
  }
  getFormData() {
    const dataFileName = `assets/data/forms/manage-wallet.json`;
    this.cardDataService.getCardData(dataFileName)
      .subscribe((formFields) => {
        for (let formField of formFields.rows) {
          for(let field of formField.columns ){
          this.form.addControl(
            field.controlName,
            new FormControl('')
          );
          }
        }
        this.data = formFields;           
      },
      (err) => console.error(err),
      () => {        
      });
   
  }
  returnZero() {
    return 0;
  }
  submit(){
    console.log(this.form.value);    
  }
  close() {
    this.dialogRef.close("Thanks for using me!");
  }
}
