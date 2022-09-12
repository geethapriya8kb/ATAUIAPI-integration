export class TsIssuesRoot{
    accountId:string;
    content:string;
    identifier:string;
}

export class TsIssuesResponse {
    video:    Video[];
    internet: Internet[];
}

export class Internet {
    content: InternetContent;
}

export class InternetContent {
    ["Converged Connectivity - Troubleshooting"]:      ConvergedConnectivityTroubleshooting;
    ["Converged Internet Features - Troubleshooting"]: ConvergedInternetFeaturesTroubleshooting;
}

export class ConvergedConnectivityTroubleshooting {
    subitems: ConvergedConnectivityTroubleshootingSubitems;
}

export class ConvergedConnectivityTroubleshootingSubitems {
    ["Issue Selection:DTB000000013765"]: IssueSelectionDTB000000013765;
}

export class IssueSelectionDTB000000013765 {
    ["Work Step(s):"]:string;
    ["Discover what issue the customer is having."]: string;
    ["What type of issue are you troubleshooting?"]: string;
    radio: Radio[];
}

export class Radio {
    name: string;
}

export class ConvergedInternetFeaturesTroubleshooting {
    subitems: ConvergedInternetFeaturesTroubleshootingSubitems;
}

export class ConvergedInternetFeaturesTroubleshootingSubitems {
    ["Billing Check:DTB000000013765"]: BillingCheckDTB000000013765;
}

export class BillingCheckDTB000000013765 {
    ["Verify that the customer's account status is in good standing"]: string;
    ["Check to see if there is an outage in the customer's area."]:string;
    ["Check Gateway, or the outage board to see if the customer is currently in an outage."]: string;
    radio:Radio[];
}

export class Video {
    content: VideoContent;
}

export class VideoContent {
    ["Audio Issues Troubleshooting"]:AudioIssuesTroubleshooting;
    ["DVR Functionality Troubleshooting"]: DVRFunctionalityTroubleshooting;
}

export class AudioIssuesTroubleshooting {
    subitems: AudioIssuesTroubleshootingSubitems;
}

export class AudioIssuesTroubleshootingSubitems {
    ["Outage Check-pass:DTB000000013765"]:OutageCheckPassDTB000000013765;
    ["Non Pay Disconnect Check-pass:DTB000000020282"]:NonPayDisconnectCheckPassDTB000000020282;
["Excessive Commercial Volume Check:DTB000000020287"]: ExcessiveCommercialVolumeCheckDTB000000020287;
}

export class ExcessiveCommercialVolumeCheckDTB000000020287 {
    ["Is the customer reporting an issue with the volume of commercials?"]: string;
    radio: Radio[];
}

export class NonPayDisconnectCheckPassDTB000000020282 {
    ["Verify that the customer's account status is in good standing. "]:    string;
    ["Check Gateway/Biller to see if the customer is in Non-Pay Status."]:  string;
    ["Is the customer in Non-Pay Status?"]: string;
    ["Current Value: Days Delinquent = 0, Last Payment Date = 2022-08-17"]: string;
    button:Button[];
}

export class Button {
    name:   string;
    action: string;
}

export class OutageCheckPassDTB000000013765 {
    ["Check to see if there is an outage in the customer's area."]: string;
    ["Check Gateway, or the outage board to see if the customer is currently in an outage"]: string;
    ["Is the customer currently in an outage?"]: string;
    ["Current Value: Outage Automation Result: Total Outages (All LOBs) = 0"]:string;
    button: Button[];
}

export class DVRFunctionalityTroubleshooting {
    subitems: DVRFunctionalityTroubleshootingSubitems;
}

export class DVRFunctionalityTroubleshootingSubitems {
    ["Outage Check-Pass:DTB000000013765"]:   OutageCheckPassDTB000000013765Class;
    ["Non Pay Disconnect Check-pass:DTB000000013765"]:NonPayDisconnectCheckPassDTB000000013765;
["Is customer currently in seasonal suspension - Pass:DTB000000013765"]: IsCustomerCurrentlyInSeasonalSuspensionPassDTB000000013765;
    ["Is customer subscribed to DVR Service:DTB000000013765"]: IsCustomerSubscribedToDVRServiceDTB000000013765;
}

export class IsCustomerCurrentlyInSeasonalSuspensionPassDTB000000013765 {
    ["Services can be limited due to seasonal suspension."]: string;
    ["Check to see if the customer is in seasonal status."]: string;
    ["Work Step(s):"]: string;
    ["Check Gateway/Biller to ensure the customer is not in seasonal status."]: string;
}

export class IsCustomerSubscribedToDVRServiceDTB000000013765 {
    ["Verify the customer is subscribed to DVR service."]:  string;
    ["Note: Two codes are required for DVR service: The Spectrum Receiver fee code and the DVR service fee code. "]: string;
    ["Is the customer subscribed to DVR service?"]:   string;
}

export class NonPayDisconnectCheckPassDTB000000013765 {
    ["Verify that the customer's account status is in good standing. "]:   string;
    ["Check Gateway/Biller to see if the customer is in Non-Pay Status."]: string;
}

export class OutageCheckPassDTB000000013765Class {
    ["Check to see if there is an outage in the customer's area."]: string;
    ["Check Gateway, or the outage board to see if the customer is currently in an outage."]: string;
    button:  Button[];
}
