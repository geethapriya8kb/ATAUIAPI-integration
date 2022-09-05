import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Inject,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardDataService } from 'src/app/agent-os/services/card-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SearchService } from '../../services/search.service';
@Component({
  selector: 'app-ppv',
  templateUrl: './ppv.component.html',
  styleUrls: ['./ppv.component.scss'],
})
export class PpvComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<any>();
  columnsToDisplay = [];
  data: any = {};
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(
    private cardDataService: CardDataService,
    public dialogRef: MatDialogRef<PpvComponent>,
    @Inject(MAT_DIALOG_DATA) public popUpData: any,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    const accountNumber = this.searchService.getAccountNumber();
    this.getValuetoTable(accountNumber);
  }
  ngAfterViewInit(): void {
    this.searchService.sharedValue$.subscribe((val: any) => {
      const accountNumber = val ? String(val) : '';

      this.getValuetoTable(accountNumber);
    });
  }
  getValuetoTable(accountNumber) {
    if (!accountNumber || accountNumber === '') accountNumber = 'empty';
    const path = `${accountNumber}/ts-event-history`;
    this.cardDataService.getCardDatafromService(path).subscribe({
      next: (resp) => (this.data = resp),
      error: (err) => console.error(err),
      complete: () => {
        this.dataSource.data = this.data.eventHistoryTable;
        this.columnsToDisplay = this.data.eventHistoryColumns;
      },
    });
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };
}
