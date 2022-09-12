import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-verify-authentiacte',
  templateUrl: './verify-authentiacte.component.html',
  styleUrls: ['./verify-authentiacte.component.scss']
})
export class VerifyAuthentiacteComponent implements OnInit {
  data: any = {};
  constructor(private accountserv:AccountService) { }

  ngOnInit(): void {
    this.verifydata()
  }

  verifydata(){
    const dataFileName = `assets/data/verify-authenticate.json`;
    this.accountserv.getverifydata(dataFileName).subscribe(
      (resp) => {
        this.data= resp
      },
      (err) => console.error(err),
      () => {
        console.log(this.data);
      }
    );
  }
  returnZero() {
    return 0;
  }
  }

