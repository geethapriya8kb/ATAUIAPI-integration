import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-aging-amount',
  templateUrl: './aging-amount.component.html',
  styleUrls: ['./aging-amount.component.scss']
})
export class AgingAmountComponent implements OnInit {
  data: any;
  constructor(private accountserv:AccountService) { }

  ngOnInit(): void {
    this.agingdata();
  }

  agingdata(){
    const dataFileName = `assets/data/8245100030092203/aging.json`;
    this.accountserv.getverifydata(dataFileName).subscribe(
      (resp) => {
        this.data= resp;
      },
      (err) => console.error(err),
      () => {
        
      }
    );
  }
  returnZero() {
    return 0;
  }
}
