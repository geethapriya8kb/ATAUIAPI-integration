import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardDataService } from 'src/app/agent-os/services/card-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
export interface Owner{
  id: string;
  name: string;
  dateOfBirth: Date;
  address: string;
}
@Component({
  selector: 'app-ppv',
  templateUrl: './ppv.component.html',
  styleUrls: ['./ppv.component.scss']
})

export class PpvComponent implements OnInit, AfterViewInit {
  public displayedColumns = ['name', 'dateOfBirth', 'address', 'details', 'update', 'delete'
];
  public dataSource = new MatTableDataSource<Owner>();
  @ViewChild(MatSort) sort: MatSort;
  constructor(private cardDataService:CardDataService, public dialogRef: MatDialogRef<PpvComponent>,
    @Inject(MAT_DIALOG_DATA) public popUpData: any,) { }

  ngOnInit() {
    this.getAllOwners();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  public getAllOwners = () => {
    this.cardDataService.getCardData('api/owner')
    .subscribe(res => {
      this.dataSource.data = res as Owner[];
    })
  }
  public redirectToDetails = (id: string) => {
    
  }
  public redirectToUpdate = (id: string) => {
    
  }
  public redirectToDelete = (id: string) => {
    
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
