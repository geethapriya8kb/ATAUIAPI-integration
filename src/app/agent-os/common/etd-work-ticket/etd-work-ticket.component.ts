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
  etddata: any;
  tempData: any;
  workTicketDetails: any;
  etdTicketdata: any = "";
  accountVal: unknown;
  data: any;
  b: boolean = false;
  jobId: any;
  customerSla: any;
  fieldOpps: any;
  contactOne: any;
  noTruckCheck: any;
  oocCheck: any;
  ooc: any;
  startHour: any;
  startTime: any;
  endHour: any;
  endTime: any;
  slaDate: Date;
  slaUpdated: any;
  fieldOpUpdated: any;
  updateStatus:any;
  oocValue: any;
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
      customerSla: ["", [Validators.required, Validators.min(0)]],
      fieldOpps: ["", [Validators.required, Validators.min(0)]],
      contactOne: ["", [Validators.required]],
      noTruckCheck: [""],
      oocCheck: [""],
      ooc: [""],
      startHour: [""],
      startTime: [""],
      endHour: [""],
      endTime: [""],
      slaDate: [""]
    })
  }

  ngOnInit(): void {
    this.etdDropData();
    const accountNumber = this.searchService.getAccountNumber();
    this.accountServ.ticketId.subscribe((value) => {
      this.workTicketId = value;
    });
    this.getCardData(accountNumber);
    this.showData();
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

  showData() {
    this.accountServ.ticketDetail.subscribe((res) => {
      this.workTicketDetails = "";
      this.workTicketDetails = res;
      this.jobId = "";
      this.jobId = this.workTicketDetails[1].column[0]?.info.Job;
      console.log(this.jobId);
      this.slaDate = this.workTicketDetails[0].column[0].info['SLA Call Time'];
      console.log(this.slaDate);
      this.slaUpdated = "";
      this.slaUpdated = this.workTicketDetails[1].column[1]?.info['comment'];
      console.log(this.slaUpdated);
      this.fieldOpUpdated = this.workTicketDetails[2].column[1]?.info['comment'];
      console.log(this.fieldOpUpdated);
      this.oocValue = "";
      this.oocValue = this.workTicketDetails[1].column[2]?.info['OOC Reason'];
      console.log(this.oocValue);
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

  etd() {
    this.accountServ.slaComment = this.workTicketForm.value.customerSla;
    this.accountServ.fieldOpp = this.workTicketForm.value.fieldOpps;
    this.accountServ.truckCheck = this.workTicketForm.value.noTruckCheck;
    this.accountServ.oocCheck = this.workTicketForm.value.oocCheck;
    this.accountServ.ooc = this.workTicketForm.value.ooc;
    this.accountServ.slaCheck = this.workTicketForm.value.slaCheck;
    this.accountServ.sHour = this.workTicketForm.value.startHour;
    this.accountServ.sTime = this.workTicketForm.value.startTime;
    this.accountServ.eHour = this.workTicketForm.value.endHour;
    this.accountServ.eTime = this.workTicketForm.value.endTime;
    this.accountServ.slaDate = this.workTicketForm.value.slaDate;
    this.accountServ.updateFlag=true;
  }

  closeTicket() {
    this.accountServ.etdworkTicket = this.workTicketId;
    for (let i = 0; i < this.tempData.content?.length; i++) {
      if (this.tempData.content[i]?.Ticket === this.workTicketId) {
        this.tempData.content[i].Status = "CLOSED";
        this.updateStatus = this.tempData.content[i]?.Status;
        console.log(this.updateStatus);
        this.accountServ.statusUpdate = this.updateStatus;
      }
    }
  }
}
