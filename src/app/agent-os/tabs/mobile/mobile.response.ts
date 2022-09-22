export class MobileResponse
{
      mobileBilling:Array<string>; 
      customer :Array<string>;
      mobileAccount : Array<string>;
      mobileDeviceTable : Array<string> 
      orderStatusColumns :Array<string> 
      mobileOrderTable: Array<string>
      mobileOrderColumns: Array<string>
      mobileHistory: Array<string>
      mobileHistoryColumns: Array<string>
      mobileStatement:string
      learnMore:string
      viewMore:string
      content:string
      custType:string
      ['Services & Devices*']: string
}

export class MobileRoot{
    accountId:string;
    content:string;
    identifier:string;
}