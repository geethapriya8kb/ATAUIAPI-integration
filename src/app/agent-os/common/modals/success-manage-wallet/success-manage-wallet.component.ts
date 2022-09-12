import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-success-manage-wallet',
  templateUrl: './success-manage-wallet.component.html',
  styleUrls: ['./success-manage-wallet.component.scss']
})
export class SuccessManageWalletComponent implements OnInit {
  data: any; 
  formData: any;

  constructor(public dialogRef: MatDialogRef<SuccessManageWalletComponent>,
    @Inject(MAT_DIALOG_DATA) public matData:any) { }

  ngOnInit(): void {
    console.log(this.matData);   
    this.data=this.matData.accounttype
  }
  close(){
    this.dialogRef.close()
  }

}
