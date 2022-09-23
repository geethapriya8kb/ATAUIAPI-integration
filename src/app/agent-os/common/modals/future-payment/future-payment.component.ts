import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardDataService } from 'src/app/agent-os/services/card-data.service';

@Component({
  selector: 'app-future-payment',
  templateUrl: './future-payment.component.html',
  styleUrls: ['./future-payment.component.scss']
})
export class FuturePaymentComponent implements OnInit {
  data: any;

  constructor(private cardDataService:CardDataService, public dialogRef: MatDialogRef<FuturePaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public popUpData: any) { }

  ngOnInit(): void {
    this. getFormData();
  }
  getFormData() {
    const dataFileName = `assets/data/forms/edit-account.json`;
    this.cardDataService.getCardData(dataFileName).subscribe(
      (resp) => {
        this.data = resp;
                
      },
      (err) => console.error(err),
      () => {
        
      }
    );
  }
  close() {
    this.dialogRef.close("Thanks for using me!");
  }
  returnZero() {
    return 0;
  }
}
