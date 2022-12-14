export class HitHistoryResponse {
    hithistory:       History[];
    provisionhistory: History[];
    hitHistoryColumn: string[];
}

export class History {
    "Date and Time": string;
    Category:        string;
    Details:         string;
    "Performed By":  string;
}

export class HitHistoryRoot{
    accountId:string;
    content:HitHistoryResponse;
    identifier:string;
}