import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardDataService } from 'src/app/agent-os/services/card-data.service';
import { SearchService } from 'src/app/agent-os/services/search.service';
import { StorageService } from 'src/app/agent-os/services/storage.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {
  data: any;
  form = new FormGroup({});
  accountNumber: string;
  constructor(private cardDataService:CardDataService,
     public dialogRef: MatDialogRef<EditCustomerComponent>,
     private searchService: SearchService,
     private storeService: StorageService,
    @Inject(MAT_DIALOG_DATA) public popUpData: any) { }

  ngOnInit(): void {
    this.getFormData()
  }
  getFormData() {
    this.accountNumber = this.searchService.getAccountNumber();
    const customer = this.storeService.customer;
    if(customer){
      for(const field of customer){
        for(const fields of field.columns){
          this.form.addControl(
            fields.controlName,
            new FormControl(fields.value)
          );
        }
      }  
      this.data=customer;       
    }
 else{
    const dataFileName = `assets/data/forms/edit-customer.json`;
    this.cardDataService.getCardData(dataFileName).subscribe(
      (resp) => {
        for(const field of resp.contactRows){
          for(const fields of field.columns){
            this.form.addControl(
              fields.controlName,
              new FormControl(fields.value)
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
  }
  returnZero() {
    return 0;
  }
  submit(){
    console.log(this.form.value);   
    const accountDetails = this.storeService.accountDetails;
    accountDetails.content.Account['Authorized Users'].value=this.form.controls['authUser'].value
   // this.storeService.customer = this.data;
  
  
    console.log(accountDetails.content.Account['Authorized Users'].value);
    console.log(accountDetails.content.Account['Authorized Users']);
    console.log(accountDetails.content.Account);
  }
  close() {
    this.dialogRef.close("Thanks for using me!");
  }

}
