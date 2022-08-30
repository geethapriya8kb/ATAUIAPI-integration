import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardDataService } from 'src/app/agent-os/services/card-data.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent implements OnInit {
  data: any;
  form=new FormGroup({
    securityCode: new FormControl(),
    
  })
  constructor(private cardDataService:CardDataService, public dialogRef: MatDialogRef<EditAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public popUpData: any) { }

  ngOnInit(): void {
    this.getFormData()
  }
  getFormData() {
    const dataFileName = `assets/data/forms/edit-account.json`;
    this.cardDataService.getCardData(dataFileName).subscribe(
      (resp) => {
        this.data = resp;
        console.log(this.data);        
      },
      (err) => console.error(err),
      () => {
        
      }
    );
  }
  formData(){
    console.log(this.form.value);
    
  }
  reset(){
    this.form.reset()
  }
  returnZero() {
    return 0;
  }
  close() {
    this.dialogRef.close("Thanks for using me!");
  }

}
