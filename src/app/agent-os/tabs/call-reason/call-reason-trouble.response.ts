export class CallReasonTroubleResponse {
  content: Content;
}

export class Content {
  Video: Video;
  Internet: Internet;
  Phone: Phone;
  Billing: Billing;
  Mobile: Billing;
}

export class Billing {
  ["Support Trees"]: string[];
}

export interface Internet {
  ["Community Solution"]: string[];
  Connectivity: string[];
  ["Customer Self Install Trees"]: string[];
  ["Internet Services"]: string[];
  ["Support Tress"]: string[];
}

export interface Phone {
  ["Community Solution"]: string[];
  ["Customer Self Install Trees"]: string[];
  PAC: string[];
  ["Pilot Trees"]: string[];
  ["Support Tress"]: string[];
}

export interface Video {
  Audio: string[];
  ["Community Solution"]: string[];
  ["Customer Education"]: string[];
  ["Customer Self Install Trees"]: string[];
  Equipment: string[];
  Feature: string[];
}
