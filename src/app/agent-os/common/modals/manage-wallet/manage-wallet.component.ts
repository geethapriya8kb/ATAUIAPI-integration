import { Component, Inject, OnInit } from '@angular/core';
import { CardDataService } from '../../../services/card-data.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { MobileViewMoreComponent } from '../mobile-view-more/mobile-view-more.component';
import { SuccessManageWalletComponent } from '../success-manage-wallet/success-manage-wallet.component';
import { SearchService } from 'src/app/agent-os/services/search.service';
import { StorageService } from 'src/app/agent-os/services/storage.service';

@Component({
  selector: 'app-manage-wallet',
  templateUrl: './manage-wallet.component.html',
  styleUrls: ['./manage-wallet.component.scss']
})
export class ManageWalletComponent implements OnInit {
  data: any;
  custName:string;
  form = new FormGroup({});
  eftForm = new FormGroup({});
  radioSelected = 'credit';
  constructor(private cardDataService: CardDataService,
    public dialogRef: MatDialogRef<ManageWalletComponent>,
    @Inject(MAT_DIALOG_DATA) public popUpData: any, public dialog: MatDialog,
    public searchService: SearchService,
    private storeServ: StorageService) { }

  ngOnInit(): void {
    this.getFormData()
    this.custName = this.storeServ.accountDetails.content.Account['Customer Name'].value

  }
  getFormData() {
    const dataFileName = `assets/data/forms/manage-wallet.json`;
    this.cardDataService.getCardData(dataFileName)
      .subscribe((formFields) => {
        for (let formField of formFields.rows) {
          for (let field of formField.columns) {
            this.form.addControl(
              field.controlName,
              new FormControl('')
            );
          }
        }
        for (let formField of formFields.eftRows) {
          for (let field of formField.column) {
            this.eftForm.addControl(
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

  openDialog(): void {
    this.dialogRef.close();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { label: this.data.eftRows, accounttype: this.form.value };
    dialogConfig.width = '60%';
    dialogConfig.height = '75%';
    let dialogRef = this.dialog.open(SuccessManageWalletComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((value) => {
      console.log(`Dialog sent: ${value}`);
    });

  }


  close() {
    this.dialogRef.close("Thanks for using me!");
  }
}
