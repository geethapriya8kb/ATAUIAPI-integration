import { Component, OnInit } from '@angular/core';
import { CardDataService } from '../../services/card-data.service';

@Component({
  selector: 'app-add-resolution',
  templateUrl: './add-resolution.component.html',
  styleUrls: ['./add-resolution.component.scss'],
})
export class AddResolutionComponent implements OnInit {
  resolutionData: any = {};
  
  callTypeList: any[] = [];
  issueList: any[] = [];
  causesList: any[] = [];
  resolutionList: any[] = [];
  flag!: boolean;
  selectedCallType = '';
  selectedIssueType = '';
  selectedCauseType = '';
  selectedresolutionType = '';
  constructor(private cardDataService: CardDataService) {}

  ngOnInit(): void {
    this.getResolutiondata();
  }
  getResolutiondata() {
    const dataFileName = `assets/data/resolution-selection.json`;
    this.cardDataService.getCardData(dataFileName).subscribe(
      (resp: any) => {
        this.resolutionData = resp;
      },
      (err) => console.error(err),
      () => {
        this.resolutionData.CallType.forEach((calltype) => {
          console.log(calltype);
          this.callTypeList.push(calltype);
          this.flag = true;
        });
      }
    );
  }
  onSelectCalltype(item) {
    this.causesList = [];
    this.resolutionList = [];
    this.issueList = item.Issues;
  }
  onSelectIssue(issue) {
    this.resolutionList = [];
    this.causesList = issue.Causes;
  }
  onSelectCause(cause) {
    this.resolutionList = cause.Resolution;
  }
  onSelectResolution(resolutionItem) {
    console.log(resolutionItem);
  }
}
