import { Component, OnInit } from '@angular/core';
import { CardDataService } from '../../services/card-data.service';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss'],
})
export class ToolsComponent implements OnInit {
  data: any = {};
  constructor(private toolsService: CardDataService) {}

  ngOnInit(): void {
    this.gettool();
  }
  gettool() {
    const dataFileName = `assets/data/tools-image.json`;
    this.toolsService.getCardData(dataFileName).subscribe(
      (resp) => {
        this.data = resp;
      },
      (err) => console.error(err),
      () => {
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    
  }
}
