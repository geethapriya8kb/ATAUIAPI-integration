import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardDataService } from 'src/app/agent-os/services/card-data.service';

@Component({
  selector: 'app-contact-preference',
  templateUrl: './contact-preference.component.html',
  styleUrls: ['./contact-preference.component.scss']
})
export class ContactPreferenceComponent implements OnInit {
  data: any;

  constructor(private cardDataService:CardDataService, public dialogRef: MatDialogRef<ContactPreferenceComponent>,
    @Inject(MAT_DIALOG_DATA) public popUpData: any) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    const dataFileName = `assets/data/forms/contact-preference.json`;
    this.cardDataService.getCardData(dataFileName).subscribe(
      (resp) => {      
       this.data=resp;      
       
      },
      (err) => console.error(err),
      () => {
        
      }
    );
  }
  close() {
    this.dialogRef.close("Thanks for using me!");
  }
  returnZero(){
    return 0;
  }

}
