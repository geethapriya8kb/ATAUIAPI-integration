import { Component, OnInit, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-customer-location',
  templateUrl: './customer-location.component.html',
  styleUrls: ['./customer-location.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class CustomerLocationComponent implements OnInit {

  activeIndex = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
