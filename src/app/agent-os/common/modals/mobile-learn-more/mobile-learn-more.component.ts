import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardDataService } from 'src/app/agent-os/services/card-data.service';

@Component({
  selector: 'app-mobile-learn-more',
  templateUrl: './mobile-learn-more.component.html',
  styleUrls: ['./mobile-learn-more.component.scss']
})
export class MobileLearnMoreComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MobileLearnMoreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private cardDataService:CardDataService) { }

  ngOnInit(): void {
    this.getData();
  }
 
  getData() {
    const dataFileName = `assets/data/8245100030092203/mobile-existingcust.json`;
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
