import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { SearchService } from '../../services/search.service';
import { EtdService } from '../../tabs/etd/etd.service';
import { ApplicationEnum } from 'src/app/models/setting-enum';
@Component({
  selector: 'app-etd-work-ticket',
  templateUrl: './etd-work-ticket.component.html',
  styleUrls: ['./etd-work-ticket.component.scss']
})
export class EtdWorkTicketComponent implements OnInit {
  workTicketId: string;
  jobId:any;
  etddata: any;
  tempData: any;
  workTicketDetails: any = "";
  etdTicketdata: any = "";
  accountVal: unknown;
  data: any;
  b: boolean = false;
  workTicketForm!: FormGroup;
  accountId = new UntypedFormGroup({
    accountNumber: new UntypedFormControl(),
    locationId: new UntypedFormControl()
  })
  constructor(private searchService: SearchService,
    private etdservice: EtdService,
    private accountServ: AccountService,
    private fb: FormBuilder) {
    this.workTicketForm = this.fb.group({
      CustomerSla: ["", [Validators.required, Validators.min(0)]],
      FieldOffs: ["", [Validators.required, Validators.min(0)]],
      select: ["", [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.etdDropData();
    const accountNumber = this.searchService.getAccountNumber();
    this.accountServ.ticketId.subscribe((value) => {
      this.workTicketId = value;
    });
    this.getCardData(accountNumber);
    this.s();
  }
s(){
  this.accountServ.TicketDetail.subscribe((res) => {
    this.workTicketDetails=res;
    console.log(this.workTicketDetails);
    this.jobId=this.workTicketDetails[1][0].info.Job;
    console.log(this.jobId); 
  });
}


  ngAfterViewInit() {
    this.searchService.sharedValue$.subscribe((val) => {
      this.accountVal = val;
      if (this.accountVal) {
        this.getCardData(this.accountVal);
      } else {
        this.getCardData('');
      }
    });
  }

  etdDropData() {
    const dataFileName = `assets/data/etd-table.json`;
    this.accountServ.getverifydata(dataFileName).subscribe(
      (resp) => {
        this.etddata = resp
      },
      (err) => console.error(err),
      () => {
        // console.log(this.etddata);
      }
    );
  }

  returnZero = () => 0;

  getCardData(accountNumber) {
    if (!accountNumber || accountNumber === '') accountNumber = 'empty';
    let cardName = 'etd-account';
    this.etdservice.getdatafromAPI(accountNumber, cardName, Number(ApplicationEnum.AgentOs)).subscribe({
      next: (resp) => {
        this.data = resp.content;
        this.tempData = this.data;
        for (let i = 0; i < this.tempData.content?.length; i++) {
          if (this.tempData.content[i]?.Ticket === this.workTicketId) {
            this.etdTicketdata = this.tempData.content[i];
          }
        }
      }
    })
  }
}
