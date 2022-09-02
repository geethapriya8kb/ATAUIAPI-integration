export class EtdResponse
{
      content:Array<string>; 
      etdcol :Array<string>
      historytab : Array<string> 
      historycol : Array<string> 
      etd :Array<Array<ETD>> 
      myticketcol: Array<string>
      mytickettab:Mytickettab
}
export interface Mytickettab {
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
    content:string;
    identifier:string;
}