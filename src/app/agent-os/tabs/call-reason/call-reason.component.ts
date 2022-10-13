import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TakePaymentFormComponent } from '../../common/modals/take-payment-form/take-payment-form.component';
import { PaymentHistory } from '../../interfaces/paymentHistory';
import { StatementHistory } from '../../entities/dtos/statement-history';
import { CardDataService } from '../../services/card-data.service';
import { SearchService } from '../../services/search.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { CourseListService } from '../../services/course-list.service';
import { CallReasonService } from './call-reason.services';
import { CallReasonResponse, CallReasonRoot, PaymentHistoryTable } from './call-reason.response';
import { CallReasonTroubleResponse, CallReasonTroubleRoot } from './call-reason-trouble.response';
import { ApplicationEnum } from 'src/app/models/setting-enum';

@Component({
  selector: 'app-call-reason',
  templateUrl: './call-reason.component.html',
  styleUrls: ['./call-reason.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CallReasonComponent implements OnInit {

  responsiveOptions: any;
  dataSource = new MatTableDataSource<PaymentHistoryTable>();
  columnsToDisplay: Array<string>;
  expandedElement!: PaymentHistory | null;
  tableDatatest: Array<PaymentHistoryTable>;
  data: CallReasonResponse;

  products!: StatementHistory[];
  rowData: boolean = true;
  accountVal: unknown;
  courseName: string | null;
  selfInstallFlag = "order";
  accountNoFlag: boolean;
  tabName: string | null;
  troubleData: CallReasonTroubleResponse;
  accNum: string | null;

  constructor(
    private device: CardDataService,
    private matDialog: MatDialog,
    private searchService: SearchService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private courseListService: CourseListService,
    private cardDataService: CardDataService,
    private callReasonService: CallReasonService) {

    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];

    var svgIcons = {
      'aos-note': 'assets/images/agent-os/note.svg',
      'aos-missing-tv': 'assets/images/agent-os/missing-tv-channel.svg',
      'aos-modem': 'assets/images/agent-os/modem.svg',
      'aos-no-service': 'assets/images/agent-os/no-service.svg',
      'aos-self-install': 'assets/images/agent-os/self-install.svg',
      'aos-truck': 'assets/images/agent-os/truck.svg',
      'aos-unknown': 'assets/images/agent-os/unknown-call.svg',
      'aos-outage':'assets/images/agent-os/service-outage.svg'
    };

    for (const iconName of Object.keys(svgIcons)) {
      const iconPath = svgIcons[iconName];

      this.matIconRegistry
        .addSvgIcon(iconName, this.domSanitizer.bypassSecurityTrustResourceUrl(iconPath));
    }
  }

  ngOnInit(): void {
    const label = this.courseListService.getHeader();
    console.log(label);
    this.courseName = label;

    const tab = this.courseListService.getCourselist();
    this.tabName = tab;
    console.log(this.tabName);



    const accountNumber = this.searchService.getAccountNumber();
    this.getCallData(accountNumber);
    this.getTroubleData(accountNumber);
  }

  ngAfterViewInit() {
    this.searchService.sharedValue$.subscribe((val) => {
      this.accountVal = val;
      if (this.accountVal) {
        this.getCallData(this.accountVal);
      } else {
        this.getCallData('');
      }
    });
  }

  getCallData(accountNumber) {
    if (!accountNumber || accountNumber === '') accountNumber = 'empty';
    this.accNum = accountNumber
    let cardName = 'call-reason';
    if (accountNumber === 'empty') {
      this.accountNoFlag = false
    } else {
      this.accountNoFlag = true
    }

    this.callReasonService.getdatafromCallReasonAPI(accountNumber, cardName,Number(ApplicationEnum.AgentOs)).subscribe({      
      next: (resp: CallReasonRoot) => {
        console.log(resp);        
        this.data = resp.content;
        console.log(this.data);          

      },
      error: (err: any) => {
        console.error(err)
      },
      complete: () => {
        this.tableDatatest = this.data.paymentHistoryTable;
        console.log(this.tableDatatest);
        this.dataSource.data = this.tableDatatest;
        this.columnsToDisplay = this.data.PaymentHistoryColumns;
        if (this.data && this.data.statementHistory) {
          this.products = this.data.statementHistory;
        }
        console.log(this.products);
      }
    });

  }

  showRowData() {
    this.rowData = !this.rowData
  }

  getTroubleData(accountNumber) {
    if (accountNumber !== 'empty') {
      let cardName = "callreason-troubleshoot"
      this.callReasonService.getdatafromTroubleDataAPI(accountNumber, cardName,Number(ApplicationEnum.AgentOs)).subscribe({
        next: (resp: CallReasonTroubleRoot) => {
          this.troubleData = resp.content;
        },
        error: (err: any) => {
          console.error(err)
        },
        complete: () => { }
      });
    }
  }

  openDialog() {
    const dialogConfig = {
      data: { name: "some name" },
      width: '90%',
      height: '90%',
      panelClass: 'search-dialog'
    };

    let dialogRef = this.matDialog.open(TakePaymentFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`);
    });
  }

  returnZero = () => 0;

}
