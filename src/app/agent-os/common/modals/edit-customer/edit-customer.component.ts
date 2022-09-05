import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardDataService } from 'src/app/agent-os/services/card-data.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {
  data: any;
  form = new FormGroup({});
  constructor(private cardDataService:CardDataService, public dialogRef: MatDialogRef<EditCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public popUpData: any) { }

  ngOnInit(): void {
    this.getFormData()
  }
  getFormData() {
    const dataFileName = `assets/data/forms/edit-customer.json`;
    this.cardDataService.getCardData(dataFileName).subscribe(
      (resp) => {
        for(const field of resp.addressRows){
          for(const fields of field.columns){
            this.form.addControl(
              fields.controlName,
              new FormControl('')
            );
          }
        } 
       
        this.data=resp;       
      },
      (err) => console.error(err),
      () => {
        
      }
    );
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
