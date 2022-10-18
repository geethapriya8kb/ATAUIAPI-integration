import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CourseListService } from '../../services/course-list.service';
import { SearchService } from '../../services/search.service';
import { SharedService } from '../../services/shared.service';
import { StorageService } from '../../services/storage.service';
@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss']
})
export class SearchDialogComponent implements OnInit {
  searchAccountForm = new UntypedFormGroup({
    accountNumber: new UntypedFormControl(),
    locationId: new UntypedFormControl()
  })
  activeSection = "account";
  showData: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<SearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private searchService: SearchService,
    private sharedService: SharedService,
    private storeService: StorageService,
    private courseListService: CourseListService,
  ) {
  }

  ngOnInit(): void {
    this.patchAccountNumber();
    const label = this.courseListService.getHeader();
    if (label === 'Create New Connect Order') {
      this.activeSection = "location"
    } else {
      this.activeSection = "account"
    }

  }

  patchAccountNumber() {
    const accountNumber = this.searchService.getAccountNumber();
    if (accountNumber != 'empty') {
      let contact = {
        accountNumber: accountNumber,
        locationId: " ",
      }
      this.searchAccountForm.patchValue(contact);
    }
  }

  findAccount() {
    if (this.searchAccountForm.value.accountNumber) {
      this.searchService.sharedValue$.next(this.searchAccountForm.value.accountNumber);  
      this.searchService.setAccountNumber(this.searchAccountForm.value.accountNumber);
    } else {
      this.searchService.sharedValue$.next(this.searchAccountForm.value.locationId);   
      this.searchService.setAccountNumber(this.searchAccountForm.value.locationId);
    }
    this.sharedService.sendData({
      type: 'init-search'
    });
    this.dialogRef.close("account value sent");
  }

  resetForm() {
    this.searchAccountForm.reset();
  }

  close() {
    this.dialogRef.close("Thanks for using me!");
  }
}
