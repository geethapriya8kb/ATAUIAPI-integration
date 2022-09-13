export class HistoryResponse {
    eventHistoryTable:   Array<HistoryTable>;
    eventHistoryColumns: string[];
  hitHistoryColumn: string[];
  hithistory: any[];
}

export class HistoryTable {

}

export class HistoryRoot{
    accountId:string;
    content:string;
    identifier:string;
}