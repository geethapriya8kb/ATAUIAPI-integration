import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardDataService } from '../../services/card-data.service';
@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EventDetailsComponent>,
    private tsService: CardDataService,
    @Inject(MAT_DIALOG_DATA) public eventdata: any
  ) {}
  data: any = {};

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    const dataFileName = `assets/data/forms/event-details.json`;
    this.tsService.getCardData(dataFileName).subscribe(
      (resp) => {
        this.data = resp;
      },
      (err) => console.error(err),
      () => {
        
      }
    );
  }
  close() {
    this.dialogRef.close('Thanks for using me!');
  }
  returnZero = () => 0;
}
