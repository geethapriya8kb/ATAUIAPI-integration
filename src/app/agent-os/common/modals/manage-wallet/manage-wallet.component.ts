import { Component, Inject, OnInit } from '@angular/core';
import { CardDataService } from '../../../services/card-data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-manage-wallet',
  templateUrl: './manage-wallet.component.html',
  styleUrls: ['./manage-wallet.component.scss']
})
export class ManageWalletComponent implements OnInit {
  data: any;


  constructor( private cardDataService:CardDataService, public dialogRef: MatDialogRef<ManageWalletComponent>,
    @Inject(MAT_DIALOG_DATA) public popUpData: any) { }

  ngOnInit(): void {
    this.getFormData()
  }
  getFormData() {
    const dataFileName = `assets/data/forms/manage-wallet.json`;
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
  returnZero() {
    return 0;
  }
  close() {
    this.dialogRef.close("Thanks for using me!");
  }
}
