export class AmountDue {
    value: string;
    type: string;
}

export class Date {
    value: string;
    type: string;
}

export class LastPaid {
    value: string;
    type: string;
}

export class MonthlyRate {
    value: string;
    type: string;
}

export class Billing {
    ['Amount Due']: AmountDue;
    Date: Date;
    ['Last Paid']: LastPaid;
    ['Monthly Rate']: MonthlyRate;
}

export class LastStatementBalance {
    value: string;
    type: string;
}

export class PendingPayment {
    value: string;
    type: string;
}

export class PPVLimit {
    value: string;
    type: string;
}

export class PPVUsage {
    value?: any;
    type: string;
}

export class AutopayDate {
    value: string;
    type: string;
}

export class LastStatement {
    ['Last Statement Balance']: LastStatementBalance;
    ['Pending Payment']: PendingPayment;
    ['PPV Limit']: PPVLimit;
    ['PPV Usage']: PPVUsage;
    ['Autopay Date']: AutopayDate;
}

export class Content {
    Billing: Billing;
    LastStatement : LastStatement;
}

export class Task {
    label: string;
    dialog: string;
    width: string;
}

export class DataCardContent {
    orientation: string;
    content: Content;
    tasks: Array<Task>;
}


export class  DataCardRoot{
    accountId:string;
    content:string;
    identifier:string;
}