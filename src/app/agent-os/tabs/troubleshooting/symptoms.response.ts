export class Symptoms {
    content: Content;
}

export class SymptomsRoot{
    accountId:string;
    content:Symptoms;
    identifier:string;
}
export class Content {
    Internet: Internet;
    Voice: Voice;
    Video: Video;
}

export class Internet {
    subitems: InternetSubitems;
}

export class InternetSubitems {
    Connectivity: Connectivity;
    ["Customer Self Install Trees"]: PurpleCustomerSelfInstallTrees;
    ["Internet Services"]: InternetServices;
    ["Pilot Trees"]: PurplePilotTrees;
    ["SCS Managed Wifi"]: SCSManagedWifi;
    ["Wifi Password Request or Chg"]: WifiPasswordRequestOrChg;
}

export class Connectivity {
    ["Cannot Connect Troubleshooting"]: string;
    Intermittency: string;
    ["Slow Internet Speeds"]: string;
}

export class PurpleCustomerSelfInstallTrees {
    ["Self Install "]: string;
    ["NextGen Self Install "]: string;
}

export class InternetServices {
    ["DVR Troubleshooting"]: string;
    ["Charter Security Suite"]: string;
    ["My Spectrum Mobile App"]: string;
    ["Spectrum TV App"]: string;
    ["Spectrum.net / Email Troubleshooting"]: string;
    ["TV On The Go / Mobile Apps"]: string;
}

export class PurplePilotTrees {
    ["Automation Test Tree"]: string;
    ["Converged Connectivity"]: string;
    ["Converged Internet Features"]: string;
    ["DOJ Internet"]: string;
    ["Security Suite / McFee"]: string;
    ["Spectrum Home Security"]: string;
    ["Slow Internet Speeds SCP"]: string;
    ["Spectrum NET Troubleshooting"]: string;
}

export class SCSManagedWifi {
    ["Internet Connetivity"]: string;
}

export class WifiPasswordRequestOrChg {
    ["Wifi Password Request/Change"]: string;
}

export class Video {
    subitems: VideoSubitems;
}

export class VideoSubitems {
    Audio: Audio;
    ["Customer Self Install Trees"]: FluffyCustomerSelfInstallTrees;
    Equipment: Equipment;
    Feature: Feature;
    Picture: Picture;
    ["Pilot Trees"]: FluffyPilotTrees;
}

export class Audio {
    ["Audio Issue"]: string;
}

export class FluffyCustomerSelfInstallTrees {
    ["Self Install "]: string;
}

export class Equipment {
    ["CableCard Issue "]: string;
    ["DVR Functionality"]: string;
    ["Equipment Issues "]: string;
    ["Remote Control Problem"]: string;
}

export class Feature {
    CIDTV: string;
    ["Guide Issue/ Guide Errors "]: string;
    ["Guide Settings"]: string;
    ["Equipment Issues "]: string;
    ["VOD/PPV Issues"]: string;
}

export class Picture {
    ["ALL LOB Out "]: string;
    ["Cable Box Error Codes"]: string;
    ["Missing Channels/Channel Unavail/No Signal/Black Screen "]: string;
    ["Picture Quality"]: string;
}

export class FluffyPilotTrees {
    ["Converged Remote Control Issues"]: string;
    ["DOJ - LCHTR - Limited Mode/Spectrum Tv Unavailable Error"]: string;
    ["DOJ - LCHTR - Retrieving Channel Information (RCI) Activate Your Service Error"]: string;
    ["DOJ DAV All Biller DYWTU All Channels Agents"]: string;
    ["DOJ DAV All Biller DYWTU Gold Keys Agents"]: string;
    ["DOJ DAV All Biller DYWTU SCAgents"]: string;
    ["DOJ DAV LCHTR CSG Limited Mode"]: string;
}

export class Voice {
    subitems: VoiceSubitems;
}

export class VoiceSubitems {
    ["Cannot Make or Recieve calls"]: CannotMakeOrRecieveCalls;
    ["Customer Self Install Trees"]: FluffyCustomerSelfInstallTrees;
    ["Degraded Service"]: DegradedService;
    ["Dial Tone Issues"]: DialToneIssues;
    ["Features and Voicemail"]: FeaturesAndVoicemail;
    ["Pilot Tress- Test Team Only!"]: PilotTressTestTeamOnly;
}

export class CannotMakeOrRecieveCalls {
    ["Cannot Make International Phone Calls"]: string;
    ["Cannot Make Local or Long Distance Phone Calls"]: string;
    ["Cannot Receive Any Phone Calls"]: string;
    ["Cannot Receive Collect Phone Calls"]: string;
}

export class DegradedService {
    ["Cannot Hear Caller On the Phone"]: string;
    ["Crosstalk on the Phone"]: string;
    ["Echo on the Phone"]: string;
    ["One-Way Audio on the Phone"]: string;
    ["Phone is Dropping Calls"]: string;
    ["Slow Dial Tone on the Phone"]: string;
    ["Static or Interference on the Phone"]: string;
}

export class DialToneIssues {
    ["Intermittent Dial Tone "]: string;
    ["No Dial Tone "]: string;
}

export class FeaturesAndVoicemail {
    ["Phone Features"]: string;
}

export class PilotTressTestTeamOnly {
    ["Automation Test Tree "]: string;
    ["Mobile - Audio Issues"]: string;
    ["Mobile - RMA Team"]: string;
    ["Mobile - RMA Tier 1"]: string;
    ["Telephone Toll Free Troubleshooting - TWC/BHN"]: string;
}
