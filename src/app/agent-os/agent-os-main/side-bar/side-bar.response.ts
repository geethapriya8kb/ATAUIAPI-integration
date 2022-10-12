export class HelpfulData
{
      content:Info; 
}

export class Info {
    ['General Information']:string;
    ['Self Installation']:string;
    ['Spectrum Internet']:string;
    ['Spectrum TV']:string;
    ['Spectrum Voice']:string;
    ['Home Security']:string;
}

export class CoPilotUpdateData{
    content:coPilotInfo;
}

export class coPilotInfo{
    ['11/20/2021']:string;
    ['02/04/2021']:string;
    ['12/23/2021 – 12/26/2021']:string;
    ['11/21/2021']:string;
    ['11/17/2021']:string;
    ['11/14/2021']:string;
}

export class ActionData{
    content:Array<string>;
}

export class actionInfo{
    icon:string;
    scr:string;
    status:string;
    time:string;
}
export class LinkData{
    content:LinkInfo;
}

export class LinkInfo{
    ['Links to CoPilot']:string;
}
export class ArticleData{
    content:ArticleInfo;
}

export class ArticleInfo{
    ['Recommended Articles']:string;
}