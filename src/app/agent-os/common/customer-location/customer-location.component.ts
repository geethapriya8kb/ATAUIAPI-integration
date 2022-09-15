import { AfterViewInit, Component, DoCheck, OnInit, ViewEncapsulation } from '@angular/core';
import { StorageService } from '../../services/storage.service';
@Component({
  selector: 'app-customer-location',
  templateUrl: './customer-location.component.html',
  styleUrls: ['./customer-location.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class CustomerLocationComponent implements OnInit,DoCheck {

  activeIndex = 0;
  location:any = {};

  constructor(private storeService:StorageService) { }
  
  

  ngOnInit(): void {    
    this.location=this.storeService.location;
    console.log(this.location); 
  } 
  ngDoCheck(): void {
    this.location=this.storeService.location;
    console.log(this.location); 
  }
 
 
}
