import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardDataService } from 'src/app/agent-os/services/card-data.service';
import { SearchService } from 'src/app/agent-os/services/search.service';
import { StorageService } from 'src/app/agent-os/services/storage.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss'],
})
export class EditCustomerComponent implements OnInit {
  data: any;
  form = new FormGroup({});
  accountNumber: string;
  temp: any;
  constructor(
    private cardDataService: CardDataService,
    public dialogRef: MatDialogRef<EditCustomerComponent>,
    private searchService: SearchService,
    private storeService: StorageService,
    @Inject(MAT_DIALOG_DATA) public popUpData: any
  ) {}

  ngOnInit(): void {
    this.getFormData();
  }
  getFormData() {
    this.accountNumber = this.searchService.getAccountNumber();
    const customer = this.storeService.customer;
    if (customer) {
      for (const field of customer.contactRows) {
        for (const fields of field.columns) {
          this.form.addControl(
            fields.controlName,
            new FormControl(fields.value)
          );
        }
      }
      this.data = customer;
    } else {
      const dataFileName = `assets/data/forms/edit-customer.json`;
      this.cardDataService.getCardData(dataFileName).subscribe(
        (resp) => {
          for (const field of resp.contactRows) {
            for (const fields of field.columns) {
              this.form.addControl(
                fields.controlName,
                new FormControl(fields.value)
              );
            }
          }
          this.data = resp;
          this.storeService.customer = this.data;
        },
        (err) => console.error(err),
        () => {}
      );
    }
  }
  returnZero() {
    return 0;
  }
  submit() {
    console.log(this.form.value);

    this.storeService.accountDetails.content.Account['Authorized Users'].value = this.form.controls['authUser'].value;
    this.storeService.customer.contactRows[0].columns[1].value =  this.form.controls['authUser'].value;

    this.storeService.customer.contactRows[0].columns[0].value =  this.form.controls['phone'].value;
    this.storeService.customer.contactRows[1].columns[0].value =  this.form.controls['phone2'].value;
    this.storeService.customer.contactRows[2].columns[0].value =  this.form.controls['email'].value;

    this.storeService.location.subscribe((val: any) => {
       console.log(val);
        val.contact.email.value = this.form.controls['email'].value;
        val.contact.phone.value2 = this.form.controls['phone2'].value;
        val.contact.phone.value1 = this.form.controls['phone'].value;
        val.content.second.Address.value =
                  this.form.controls['address1'].value +
          '  ' +  this.form.controls['address2'].value +
          '  ' +  this.form.controls['city'].value +
          '  ' +  this.form.controls['state'].value +
          '  ' +  this.form.controls['zip'].value;
          this.temp=val;
      }); 
     
    this.storeService.location.next(this.temp)

    this.storeService.customer.contactRows[3].columns[0].value = this.form.controls['address1'].value;
    this.storeService.customer.contactRows[4].columns[0].value = this.form.controls['address2'].value;
    this.storeService.customer.contactRows[5].columns[0].value = this.form.controls['city'].value;
    this.storeService.customer.contactRows[6].columns[0].value = this.form.controls['state'].value;
    this.storeService.customer.contactRows[7].columns[0].value = this.form.controls['zip'].value;

    this.dialogRef.close('Updated Successfully');
  }
  close() {
    this.dialogRef.close('close');
  }
}
