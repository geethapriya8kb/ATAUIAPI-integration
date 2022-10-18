
import { Component, OnInit } from '@angular/core';
import { CardDataService } from '../../services/card-data.service';
import { Content, ToolsResponse } from './tools.response';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss'],
})
export class ToolsComponent implements OnInit {
  data: ToolsResponse;
  filterData: Array<Content>;
  flag: boolean;
  constructor(private toolsService: CardDataService) { }

  ngOnInit(): void {
    this.gettool();
  }

  
    gettool() {
    const dataFileName = `assets/data/tools-image.json`;
    this.toolsService.getCardData(dataFileName).subscribe(
      (resp) => { this.data = resp; },
      (err) => console.error(err),
      () => {
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    if (filterValue.length > 0) {
      this.filterData = [];
      console.log("true");
      this.flag = true
      console.log(this.data.content);
      for (let i = 0; i < this.data.content.length; i++) {
        const sam = this.data.content[i];
        if ((String(sam?.label).includes(filterValue))) {
          console.log(this.data.content[i]);
          this.filterData.push(this.data.content[i]);
        };
      }
    }
    else if (filterValue.length == 0) {
      this.filterData = [];
      this.flag=false;
    }
  }
}
