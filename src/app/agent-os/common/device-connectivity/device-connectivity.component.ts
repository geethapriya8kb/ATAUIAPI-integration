import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { CardDataService } from '../../services/card-data.service';
import { DeviceConnectivity } from '../../interfaces/DeviceConnectivity';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SearchService } from '../../services/search.service';

export class Group {
  level = 0;
  expanded = false;
  totalCounts = 0;
}
export class Provision {
  Model: string = '';
  Type: string = '';
  ServiceStatus: string = '';
  DeviceStatus: string = '';
  DeviceSignal: string = '';
  MAC: string = '';
  SerialNo: string = '';
  Description: string = '';
  Actions: string = '';
}

export interface Group {
  group: string;
}

@Component({
  selector: 'app-device-connectivity',
  templateUrl: './device-connectivity.component.html',
  styleUrls: ['./device-connectivity.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class DeviceConnectivityComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  columnsToDisplay = [];
  expandedElement!: DeviceConnectivity | null;
  tableDatatest: any = [];
  data: any = {};

  public dataSourceProvision = new MatTableDataSource<any | Group>([]);
  columns: any[];
  displayedColumnsProvision: string[];
  groupByColumns: string[] = [];
  allData!: any[];
  _allGroup!: any[];
  expandedCar: any[] = [];
  expandedSubCar: Provision[] = [];
  @ViewChild(MatSort)
  sort!: MatSort;
  accountVal;
  constructor(
    private cardDataService: CardDataService,
    private matIconRegistry: MatIconRegistry,
    private searchService: SearchService,
    private domSanitizer: DomSanitizer) {


    this.columns = [
      { field: 'Model' },
      { field: 'Type' },
      { field: 'ServiceStatus' },
      { field: 'DeviceStatus' },
      { field: 'DeviceSignal' },
      { field: 'MAC' },
      { field: 'SerialNo' },
      { field: 'Description' },
      { field: 'Actions' },
    ];
    this.displayedColumnsProvision = this.columns.map((column) => column.field);
    this.groupByColumns = ['Type'];

    const icons = {
      'aos-copy-blue': 'assets/images/agent-os/copy-blue.svg',
      'aos-tv-gray': 'assets/images/agent-os/tv-gray.svg',
      'aos-globe-gray': 'assets/images/agent-os/globe-gray.svg',
      'aos-signal-strngth-gray': 'assets/images/agent-os/signal-strngth-gray.svg',
      'aos-telephone-gray': 'assets/images/agent-os/telephone-gray.svg',
      'aos-globe': 'assets/images/agent-os/globe.svg',
      'aos-telephone': 'assets/images/agent-os/telephone.svg',
      'aos-tv': 'assets/images/agent-os/tv-with-antenna.svg',
    };

    for (const iconName of Object.keys(icons)) {
      const iconPath = icons[iconName];

      this.matIconRegistry
        .addSvgIcon(iconName, this.domSanitizer.bypassSecurityTrustResourceUrl(iconPath));
    }
  }

  ngOnInit(): void {
    const accountNumber = this.searchService.getAccountNumber();
    this.getValuetoTable(accountNumber);
    this.getProvisioningGroupData(accountNumber);
  }

  ngAfterViewInit() {
    this.searchService.sharedValue$.subscribe((val) => {
      this.accountVal = val;
      if (this.accountVal) {
        this.getValuetoTable(this.accountVal);
        this.getProvisioningGroupData(this.accountVal);   
      } else {
        this.getValuetoTable('');
        this.getProvisioningGroupData('');  
      }
    });
  }

  getProvisioningGroupData(accountNumber){
    this.cardDataService.getProvisioningData(accountNumber).subscribe(
      (data: any) => {
        data.data.forEach((item, index) => {
          item.id = index + 1;
        });
        this.allData = data.data;
        this.dataSourceProvision.data = this.getGroups(
          this.allData,
          this.groupByColumns
        );
      },
      (err: any) => console.log(err)
    );
  }

  getValuetoTable(accountNumber) {
      if (!accountNumber || accountNumber === '') accountNumber = 'empty';
      const path = `${accountNumber}/device-connectivity`;
   // const dataFileName = `assets/data/device-connectivity.json`;
    this.cardDataService.getCardDatafromService(path).subscribe(
      (resp) => {
        this.data = resp;
      },
      (err) => console.error(err),
      () => {
        this.tableDatatest = this.data.deviceConnectivityTable;
        
        this.dataSource.data = this.tableDatatest;
        this.columnsToDisplay = this.data.deviceConnectivityColumns;
      }
    );
  }
  
  groupHeaderClick(row) {
    if (row.expanded) {
      row.expanded = false;
      this.dataSourceProvision.data = this.getGroups(
        this.allData,
        this.groupByColumns
      );
    } else {
      row.expanded = true;
      this.expandedCar = row;

      console.log(this._allGroup);
      console.log(this.allData);
      console.log(this.groupByColumns);
      console.log(row);
      this.dataSourceProvision.data = this.addGroupsNew(
        this._allGroup,
        this.allData,
        this.groupByColumns,
        row
      );
    }
  }

  getGroups(data: any[], groupByColumns: string[]): any[] {
    const rootGroup = new Group();
    rootGroup.expanded = false;
    return this.getGroupList(data, 0, groupByColumns, rootGroup);
  }

  getGroupList(
    data: any[],
    level: number = 0,
    groupByColumns: string[],
    parent: Group
  ): any[] {
    if (level >= groupByColumns.length) {
      return data;
    }
    let groups = this.uniqueBy(
      data.map((row) => {
        const result = new Group();
        result.level = level + 1;
        for (let i = 0; i <= level; i++) {
          result[groupByColumns[i]] = row[groupByColumns[i]];
        }
        return result;
      }),
      JSON.stringify
    );

    const currentColumn = groupByColumns[level];
    let subGroups = [];
    groups.forEach((group) => {
      const rowsInGroup = data.filter(
        (row) => group[currentColumn] === row[currentColumn]
      );
      group.totalCounts = rowsInGroup.length;
      this.expandedSubCar = [];
    });
    groups = groups.sort((a: Provision, b: Provision) => {
      const isAsc = 'asc';
      return this.compare(a.Type, b.Type, isAsc);
    });
    this._allGroup = groups;
    return groups;
  }

  addGroupsNew(
    allGroup: any[],
    data: any[],
    groupByColumns: string[],
    dataRow: any
  ): any[] {
    const rootGroup = new Group();
    rootGroup.expanded = true;
    return this.getSublevelNew(
      allGroup,
      data,
      0,
      groupByColumns,
      rootGroup,
      dataRow
    );
  }

  getSublevelNew(
    allGroup: any[],
    data: any[],
    level: number,
    groupByColumns: string[],
    parent: Group,
    dataRow: any
  ): any[] {
    if (level >= groupByColumns.length) {
      return data;
    }
    const currentColumn = groupByColumns[level];
    //let subGroups = [];
    let subGroups: any[] = [];
    allGroup.forEach((group) => {
      const rowsInGroup = data.filter(
        (row) => group[currentColumn] === row[currentColumn]
      );
      group.totalCounts = rowsInGroup.length;

      if (group.Type == dataRow.Type.toString()) {
        group.expanded = dataRow.expanded;
        const subGroup = this.getSublevelNew(
          allGroup,
          rowsInGroup,
          level + 1,
          groupByColumns,
          group,
          dataRow.Type.toString()
        );
        this.expandedSubCar = subGroup;
        subGroup.unshift(group);
        console.log(subGroup);
        //	subGroups = subGroups.concat(subGroup);
        subGroups = subGroups.concat(subGroup);
      } else {
        subGroups = subGroups.concat(group);
      }
    });
    return subGroups;
  }

  uniqueBy(a, key) {
    const seen = {};
    return a.filter((item) => {
      const k = key(item);
      return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    });
  }

  isGroup(index, item): boolean {
    return item.level;
  }

  onSortData(sort: MatSort) {
    let data = this.allData;
    const index = data.findIndex((x) => x['level'] == 1);
    if (sort.active && sort.direction !== '') {
      if (index > -1) {
        data.splice(index, 1);
      }

      data = data.sort((a: Provision, b: Provision) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'Type':
            return this.compare(a.Type, b.Type, isAsc);
          case 'Model':
            return this.compare(a.Model, b.Model, isAsc);
          case 'ServiceStatus':
            return this.compare(a.ServiceStatus, b.ServiceStatus, isAsc);
          case 'DeviceStatus':
            return this.compare(a.DeviceStatus, b.DeviceStatus, isAsc);
          case 'MAC':
            return this.compare(a.MAC, b.MAC, isAsc);

          case 'SerialNo':
            return this.compare(a.SerialNo, b.SerialNo, isAsc);
          case 'Description':
            return this.compare(a.Description, b.Description, isAsc);
          case 'Actions':
            return this.compare(a.Actions, b.Actions, isAsc);
          default:
            return 0;
        }
      });
    }
    this.dataSourceProvision.data = this.addGroupsNew(
      this._allGroup,
      data,
      this.groupByColumns,
      this.expandedCar
    );
  }

  private compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}

