export class DeviceManagementResponse {
  content: Content;
  icons: Icons;
  eventHistoryTable: EventHistoryTable[];
  eventHistoryColumns: string[];
}

export class Content {
  Video: Video;
  Internet: Internet;
  Voice: Voice;
}

export class Internet {
  ["S Hsi Plus"]: string;
  ["S Hsi Modem"]: string;
  ["S Hsibase"]: string;
}

export class Video {
  ["S Digi Tier1"]: string;
  ["S HBO"]: string;
  ["S Showtime"]: string;
  Sslvrtiertrk: string;
  ["S Digi Tier2"]: string;
  ["S Starzencor"]: string;
  ["S Starz"]: string;
  ["S TMC"]: string;
  ["S Gldtiertrk"]: string;
  ["Interact Srv"]: string;
  ["S Secconnect"]: string;
  Sdvrreceiver: string;
  ["S Basic"]: string;
  ["S Expand"]: string;
  ["S Brdcstsvc"]: string;
  ["S Cinemax"]: string;
  ["S Vod"]: string;
  ["S Dvrsvcsngl"]: string;
}

export class Voice {
  ["S Telphnline"]: string;
  ["S Telephone"]: string;
  Stelunldintr: string;
  Steunldinta: string;
  ["S Tel 18Feat"]: string;
  Stelmtalease: string;
  Stelnoblkint: string;
  Steldirlstng: string;
}

export class EventHistoryTable {
  LOB: string;
  Type: string;
  ["Service Status"]: string;
  ["Device Status"]: string;
  ["Signal/Details"]: string;
  Model: string;
  MAC: string;
  ["Serial No"]: string;
  Description: string;
  visible: string;
  Actions: string;
}

export class Icons {
  Video: VideoClass;
  Internet: VideoClass;
  Voice: VideoClass;
}

export class VideoClass {
  path: string;
}


export class DeviceManagementRoot {
  accountId: string;
  content: string;
  identifier: string;
}
