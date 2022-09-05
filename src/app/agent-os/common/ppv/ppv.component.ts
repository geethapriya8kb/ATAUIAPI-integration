import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardDataService } from 'src/app/agent-os/services/card-data.service';
@Component({
  selector: 'app-ppv',
  templateUrl: './ppv.component.html',
  styleUrls: ['./ppv.component.scss']
})
export class PpvComponent implements OnInit {
  constructor(private cardDataService:CardDataService, public dialogRef: MatDialogRef<PpvComponent>,
    @Inject(MAT_DIALOG_DATA) public popUpData: any) { }

  ngOnInit(): void {
  }

}
