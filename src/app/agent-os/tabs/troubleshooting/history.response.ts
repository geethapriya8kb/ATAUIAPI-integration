export class HistoryResponse {
    eventHistoryTable:   Array<HistoryTable>;
    eventHistoryColumns: string[];
}

export class HistoryTable {

}

export class HistoryRoot{
    accountId:string;
    content:string;
    identifier:string;
}