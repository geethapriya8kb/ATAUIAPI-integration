import {
  AfterViewInit,
  Component,
  DoCheck,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { StorageService } from '../../services/storage.service';
@Component({
  selector: 'app-customer-location',
  templateUrl: './customer-location.component.html',
  styleUrls: ['./customer-location.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class CustomerLocationComponent implements OnInit {
  activeIndex = 0;
  info: any;

  constructor(public storeService: StorageService) {}

  ngOnInit(): void {
    this.storeService.location.subscribe((val: any) => {
      this.info = val;
      console.log(this.info);
    });
  }
}
