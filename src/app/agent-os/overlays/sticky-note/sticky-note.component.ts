import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgentOsFlowsService } from '../../services/agent-os-flows.service';
import { CourseListService } from '../../services/course-list.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-sticky-note',
  templateUrl: './sticky-note.component.html',
  styleUrls: ['./sticky-note.component.scss'],
})
export class StickyNoteComponent implements OnInit {
  currentCourse = '';
  flowList: any = null;
  accountNumbers: any[];

  @Output() closeSticky = new EventEmitter<void>();

  constructor(
    private snackbar: MatSnackBar,
    private courseListService: CourseListService,
    private flowService: AgentOsFlowsService,
    private storeService: StorageService
  ) {}

  ngOnInit(): void {
    const label = this.courseListService.getData();
    this.currentCourse = label ? label : '';
    this.flowList = this.flowService.getFlowInfo(this.currentCourse);
    let courseType = this.courseListService.getHeader();
    if (this.currentCourse === 'call-reason') {
      for (let i = 0; i < this.flowList.groups.length; i++) {
        this.flowList.groups[i]?.options.forEach((element) => {
          if (element.name === courseType) {
            this.accountNumbers = element.accountList;
          }
        });
      }
    } else {
      let index = this.flowList.groups[0].options.indexOf(
        this.flowList.groups[0].options.find(
          (item: { name: string }) => item.name === courseType
        )
      );
      this.accountNumbers = this.flowList.groups[0].options[index].accountList;
    }
    this.storeService.courseListAccounts = this.accountNumbers;
  }

  copyData(accountNumber: string) {
    navigator.clipboard.writeText(accountNumber);

    this.snackbar.open('Copied', '', { duration: 1500 });
  }

  close(): void {
    this.closeSticky.emit();
  }
}
