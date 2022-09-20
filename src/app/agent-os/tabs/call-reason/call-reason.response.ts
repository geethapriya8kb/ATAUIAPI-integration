export class CallReasonRoot {
  accountId: string;
  content: string;
  identifier: string;
}

export class CallReasonResponse {
  content: Content;
  paymentHistoryTable: PaymentHistoryTable[];
  PaymentHistoryColumns: string[];
  statementHistory: StatementHistory[];
  expansionPanelStatement: ExpansionPanelStatement;
  billingHistoryData: BillingHistoryDatum[];
  billingHistoryColumns: string[];
  eventsHistory: EventsHistory[];
  eventHistoryColumns: string[];
  tvChannel: TvChannel;
  packageCodes: PackageCodes;
  channelInfo: ChannelInfo;
  noService: WelcomeNoService;
  iconNoService: IconNoService;
  popup: Popup;
  textarea: Textarea;
  troubleshootData: TroubleshootData;
  selfInstallContent: SelfInstallContent[];
  selfInstallOrder: { [key: string]: SelfInstallOrder };
  selfInstallAgree: SelfInstallAgree[];
  headerTitle: HeaderTitle;
  unscheduleAppointmentData: UnscheduleAppointmentData;
}

export class BillingHistoryDatum {
  ["Statement Date"]: string;
  ["Remaining Balance"]: string;
  ["Recurring Charges"]: string;
  ["One-Time Charges"]: string;
  ["Taxes, Fees & Charges"]: string;
  ["Amount Due"]: string;
}

export class ChannelInfo {
  ["Channel Info"]: ChannelInfoClass;
}

export class ChannelInfoClass {
  ["Entitlements and Lineup"]: string;
  ["Audit Info"]: string;
}

export class Content {
  ["Billing Overview"]: BillingOverview;
}

export class BillingOverview {
  ["Current Billing Cycle"]: string;
  ["Current Amount Due"]: CurrentAmountDue[];
  ["Current Due Date"]: string;
}

export class CurrentAmountDue {
  ["$175.33"]: string;
}

export class EventsHistory {
  Event: string;
  Date: string;
}

export class ExpansionPanelStatement {
  ["May 5 Bill"]: May5Bill;
}

export class May5Bill {
  ["Previous Balance"]: PreviousBalance[];
  ["Remaining Balance"]: PreviousBalance[];
  ["Spectrum TV™"]: SpectrumTV[];
  ["Spectrum Internet™"]: SpectrumInternet[];
  ["Other Charges"]: OtherCharge[];
  ["Taxes, Fees and Charges"]: TaxesFeesAndCharge[];
  ["Total Due"]: PreviousBalance[];
}

export class OtherCharge {
  value?: string;
  val?: OtherChargeVal[];
}

export class OtherChargeVal {
  ["Broadcast TV Surcharge"]: string;
}

export class PreviousBalance {
  value?: string;
}

export class SpectrumInternet {
  value?: string;
  val?: SpectrumInternetVal[];
}

export class SpectrumInternetVal {
  ["Spectrum Internet"]?: string;
  ["Spectrum WiFi Service"]?: string;
}

export class SpectrumTV {
  value?: string;
  val?: SpectrumTVVal[];
}

export class SpectrumTVVal {
  ["Spectrum TV Select Basic TV & Expanded Basic TV Services"]?: string;
  ["Spectrum Receiver"]?: string;
}

export class TaxesFeesAndCharge {
  value?: string;
  val?: TaxesFeesAndChargeVal[];
}

export class TaxesFeesAndChargeVal {
  ["FCC Admin Fee"]?: string;
  ["State and Local Sales Tax"]?: string;
  ["Franchise Fee"]?: string;
}

export class HeaderTitle {
  Payments: Payments;
  ["Missing Channels"]: MissingChannels;
  ["Cannot Connect"]: HeaderTitleCannotConnect;
  ["No Service"]: NoService;
  ["Self-Install"]: SelfInstall;
}

export class HeaderTitleCannotConnect {
  ["aos-modem"]: string;
}

export class MissingChannels {
  ["aos-missing-tv"]: string;
}

export class NoService {
  ["aos-no-service"]: string;
}

export class Payments {
  ["aos-note"]: string;
}

export class SelfInstall {
  ["aos-self-install"]: string;
}

export class IconNoService {
  ["Subscribed Services"]: SubscribedServices;
}

export class SubscribedServices {
  icon1: string;
  icon2: string;
  icon3: string;
}

export class WelcomeNoService {
  ["Account Overview"]: AccountOverview;
}

export class AccountOverview {
  ["Non-Pay Disconnect"]: string;
  Outages: string;
  ["Recent Work Orders"]: string;
  ["Recent ETD Tickets"]: string;
}

export class PackageCodes {
  ["TV Package Codes"]: TVPackageCodes;
}

export class TVPackageCodes {
  ["Price Greater than $0"]: PriceGreaterThan0[];
  ["Price equal to $0"]: PriceEqualTo0[];
}

export class PriceGreaterThan0 {
  ["Dvr Receiver (4)"]?: string;
  ["Interact Srv (4)"]?: string;
  ["DVR SVC 2-4"]?: string;
}

export class PriceEqualTo0 {
  Basic?: string;
  ["L Vod"]?: string;
  ["Exp Basic"]?: string;
  ["Spec Guide"]?: string;
  ["Brdcst TV Sc"]?: string;
  ["ODN Guide"]?: string;
}

export class PaymentHistoryTable {
  position: number;
  BillingCycle: string;
  DueDate: string;
  DatePosted: string;
  AmountDue: string;
  PaymentStatus: string;
}

export class Popup {
  ["Event History"]: EventHistory;
}

export class EventHistory {
  ["Truoble Ticket Id"]: string;
  ["Event Id"]: string;
  ["Event Verification Status"]: string;
  ["Event Start Time"]: string;
}

export class SelfInstallAgree {
  selfInstallAgreements: string[];
}

export class SelfInstallContent {
  order: string;
  address: string;
  Tracking: string;
  Device: string;
  SerialNumber: string;
  ExpectedDelivery: string;
  ordered: string;
  transit: string;
  delivered: string;
}

export class SelfInstallOrder {
  ["Creation Date"]: string;
  ["Modified On"]: string;
  Status: string;
}

export class StatementHistory {
  bill: string;
  amount: string;
  timeframe: string;
  duedate: string;
}

export class Textarea {
  text: Text;
}

export class Text {
  label: string;
  label1: string;
  label2: string;
  label3: string;
}

export class TroubleshootData {
  ["Missing Channels"]: NoServiceClass;
  ["Cannot Connect"]: TroubleshootDataCannotConnect;
  ["No Service"]: NoServiceClass;
}

export class TroubleshootDataCannotConnect {
  ["Internet > Connectivity"]: string;
}

export class NoServiceClass {
  ["Video > Picture"]: string;
}

export class TvChannel {
  ["TV Overview"]: TVOverview;
}

export class TVOverview {
  ["Number of Receivers"]: string;
  ["Recent Work Orders"]: string;
}

export class UnscheduleAppointmentData {
  ["Appointment Date Time"]: string;
  ["Job Number"]: string;
  Reason: string;
  ["Contact Phone Number"]: string;
  ["Technician Notes"]: string;
  ["Dispatch Notes"]: string;
}
