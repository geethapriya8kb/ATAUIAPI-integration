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
  dataSource = new MatTableDataSource<any>();
  columnsToDisplay = [];
  expandedElement!: PaymentHistory | null;
  tableDatatest: any;
  data: any = {};
  
  products!: StatementHistory[];
  rowData: boolean = true;
  accountVal: unknown;
  courseName: any;
  selfInstallFlag="order";
  accountNoFlag: any = {};
  tabName: any;
  troubleData: any;

  constructor(
    private device: CardDataService,
    private matDialog: MatDialog,
    private searchService: SearchService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private courseListService:CourseListService,
    private cardDataService:CardDataService ) {

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
      'aos-missing-tv':'assets/images/agent-os/missing-tv-channel.svg',
      'aos-modem':'assets/images/agent-os/modem.svg',
      'aos-no-service':'assets/images/agent-os/no-service.svg',
      'aos-self-install':'assets/images/agent-os/self-install.svg',
      'aos-truck':'assets/images/agent-os/truck.svg',
      'aos-unknown':'assets/images/agent-os/unknown-call.svg'
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
      this.courseName=label; 
      
      const tab=this.courseListService.getCourselist();
      this.tabName=tab;
      console.log(this.tabName);
      
      
    
    const accountNumber = this.searchService.getAccountNumber();
    this.getCallData(accountNumber);
    this. getTroubleData();
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
    const path = `${accountNumber}/call-reason`;
     if(accountNumber==='empty'){
      this.accountNoFlag=false
     }else{
      this.accountNoFlag=true
     }
    this.device.getCardDatafromService(path).subscribe({
      next: (resp: any) => {
        this.data = resp;
       
      },
      error: (err: any) => console.error(err),
      complete: () => {
        this.tableDatatest = this.data.paymentHistoryTable;
        console.log(this.tableDatatest);
        this.dataSource.data = this.tableDatatest;
        this.columnsToDisplay = this.data.PaymentHistoryColumns;
      }
    });

    this.device
      .getCardDatafromService(path)
      .subscribe({
        next: (resp) => {
          if (resp && resp.statementHistory) {
            this.products = resp.statementHistory;
          }
          console.log(this.products);
        }
      });
  }

  showRowData() {
    this.rowData = !this.rowData
  }
  getTroubleData() {
    const dataFileName = `assets/data/8245100030092203/callreason-troubleshoot.json`;
    this.cardDataService.getCardData(dataFileName).subscribe(
      (resp) => {
        this.troubleData = resp;
        console.log(this.troubleData);        
      },
      (err) => console.error(err),
      () => {
        
      }
    );
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
