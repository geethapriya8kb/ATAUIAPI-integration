import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardDataService } from 'src/app/agent-os/services/card-data.service';

@Component({
  selector: 'app-mobile-view-more',
  templateUrl: './mobile-view-more.component.html',
  styleUrls: ['./mobile-view-more.component.scss']
})
export class MobileViewMoreComponent implements OnInit {
  data: any;
showFlag=false;
  mobileData: any;
  constructor(public dialogRef: MatDialogRef<MobileViewMoreComponent>,
    @Inject(MAT_DIALOG_DATA) public matData: any, private cardDataService:CardDataService) { }
    ngOnInit(): void {     
     this.mobileData=this.matData.name   
     
    }
  
  close() {
    this.dialogRef.close("Thanks for using me!");
  }
  returnZero() {
    return 0;
  }
  showVal(ev,flag){    
    flag=!flag   
    ev.stopPropagation();
   
  }
}
