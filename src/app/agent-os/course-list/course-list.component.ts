import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgentOsFlowsService } from '../services/agent-os-flows.service';
import { CourseListService } from '../services/course-list.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  currentFlow = '';
  flowInfo: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flowService: AgentOsFlowsService,
    private sharedService: SharedService,
    private courseListService: CourseListService
  ) {
    this.route.queryParams.subscribe((_) => {
      const navExtras = this.router.getCurrentNavigation();
      if (navExtras?.extras?.state) {
        this.currentFlow = navExtras.extras.state['flow'] || 'ordering';

        this.flowInfo = this.flowService.getFlowInfo(this.currentFlow);
      }
    });
  }

  ngOnInit(): void {
    if (this.currentFlow) {
      this.setCurrentflow();
    } else {
      this.getCurrentflow();
    }
  }

  setCurrentflow() {
    this.courseListService.saveData(this.currentFlow);
  }

  getCurrentflow() {
    const label = this.courseListService.getData();
    console.log(label);
    this.currentFlow = label ? label : '';
    this.flowInfo = this.flowService.getFlowInfo(this.currentFlow);
  }

  openFlow(option: string) {
    this.sharedService.sendData({
      type: 'open-flow',
      flow: this.currentFlow,
      option: option
    });
  }
}
