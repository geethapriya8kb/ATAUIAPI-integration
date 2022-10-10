export class EtdResponse
{
      content:Array<TicketInformation>; 
      etdcol :Array<string>;
      historytab : Array<string>;
      historycol : Array<string>;
      etd :Array<Array<ETD>> ;
      myticketcol: Array<string>;
      mytickettab:Mytickettab;
      CustType:Array<string>;
}

export class Mytickettab {
    Ticket: string;
    ['SLA Call Time']: string;
    Account: string;
    City: string;
    Node: string;
    Reason: string;
    Status: string;
    Owner: string;
    ['Cust Type']: string;
    "etd":ETD;
    
}

export class TicketInformation {
    Ticket: string;
    ['SLA Call Time']: string;
    Account: string;
    City: string;
    Node: string;
    Reason: string;
    Status: string;
    Owner: string;
    ['Cust Type']: string;
    "etd":ETD;
}

export class Info {
    Contact: string;
    ['Phone 1']: string;
    ['Phone 2']: string;
    Node: string;
    ['City/Status']: string;
    Region: string;
    Mgmt: string;
    ['SLA Call Time']: string;
}

export class Header {
    Acct: string;
}

export class ETD {
    info: Info;
    header: Header;
}

export class ETDRoot{
    accountId:string;
    content:any;
    identifier:string;
}