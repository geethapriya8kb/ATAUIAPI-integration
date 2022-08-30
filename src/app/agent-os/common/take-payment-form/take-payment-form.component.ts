import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-take-payment-form',
  templateUrl: './take-payment-form.component.html',
  styleUrls: ['./take-payment-form.component.scss']
})
export class TakePaymentFormComponent implements OnInit {
  isLinear = false;
  firstFormGroup!: UntypedFormGroup;
  secondFormGroup!: UntypedFormGroup;

  constructor(private _formBuilder: UntypedFormBuilder, public dialogRef: MatDialogRef<TakePaymentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
  close() {
    this.dialogRef.close("Thanks for using me!");
  }

}
