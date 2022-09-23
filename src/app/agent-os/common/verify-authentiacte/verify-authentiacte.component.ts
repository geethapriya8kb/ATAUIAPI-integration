import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-verify-authentiacte',
  templateUrl: './verify-authentiacte.component.html',
  styleUrls: ['./verify-authentiacte.component.scss']
})
export class VerifyAuthentiacteComponent implements OnInit {
  data: any = {};
  typeList:any[]=[];
  verifyList:any[]=[];
  selectedCallType = '';
  flag!: boolean;
  constructor(private accountserv:AccountService) { }

  ngOnInit(): void {
    this.verifydata()
  }

  verifydata(){
    const dataFileName = `assets/data/8245100030092203/verify-authenticate.json`;
    this.accountserv.getverifydata(dataFileName).subscribe(
      (resp) => {
        this.data= resp
      },
      (err) => console.error(err),
      () => {
        
        this.data.type.forEach((type) => {
          console.log(type);
          this.typeList.push(type);
          this.flag = true;
        });
      }
    );
  }

  onSelectType(item) {
    this.verifyList = item.details;
    this.verifyList = this.typeList.find((cntry: any) => cntry.VerifyType == item.target.value).details; 
  }

  onSelectVerify(verify){
    
  }
  returnZero() {
    return 0;
  }
  }

