export class EventHistory {
    eventHistoryTable:   EventHistoryTable[];
    eventHistoryColumns: string[];
}

export class EventHistoryTable {
    ["Event Start Time"]:     string;
    ["Event ID"]:             string;
    ["Event Description"]:    string;
    Status:                 string;
    Condition:              string;
    ["Event Verified"]:       string;
    ["Ticket Resolved Time"]: string;
}


export class EventHistoryRoot{
    accountId:string;
    content:string;
    identifier:string;
}
