export class EventAlertsData {
    content: Array<Content>;
    accountNo: string;
}


export class Content {
    icon:  string;
    Event: string;
    desc:  string;
    color: string;
    icon1: string;
}

export class AlertRoot{
    accountId:string;
    content:string;
    identifier:string;
}
