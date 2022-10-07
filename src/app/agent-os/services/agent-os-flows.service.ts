import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AgentOsFlowsService {
  constructor() {}

  flows = [
    {
      name: 'call-reason',
      display: 'Call Reason',
      groups: [
        {
          name: 'Ordering',
          options: [],
        },
        {
          name: 'Billing',
          options: [
            {
              name: 'Payments',
              icons: [['fas fa-3x fa-file-invoice-dollar']],
              color: 'fa-icon-call-reason',
              route: 'payments',
              accountList: [
                {
                  type: 'Standard Payment-',
                  account: '8429763145879641',
                },
                {
                  type: 'Payment Due Recently-',
                  account: '8314713395279300',
                },
                {
                  type: 'Payment Past Due-',
                  account: '8314713395279315',
                },
                {
                  type: 'Service Interrupted-',
                  account: '8314713395279210',
                },
              ],
            },
          ],
        },
        {
          name: 'Repair',
          options: [
            {
              name: 'Self-Install',
              icons: [['fas fa-3x fa-plug']],
              color: 'fa-icon-call-reason',
              route: 'self-install',
              accountList: [
                {
                  type: 'Call Reason: Self-Install',
                  account: '8347100015617690',
                },
              ],
            },
            {
              name: 'Cannot Connect',
              icons: [['fas fa-handshake-slash fa-3x']],
              color: 'fa-icon-call-reason',
              route: 'cannot-connect',
              accountList: [
                {
                  type: 'Call Reason: Cannot Connect',
                  account: '8245100030092203',
                },
              ],
            },
            {
              name: 'Missing Channels',
              icons: [['fas fa-3x fa-film']],
              color: 'fa-icon-call-reason',
              route: 'missing-channels',
              accountList: [
                {
                  type: 'Missing Channels',
                  account: '8245100030050010',
                },
              ],
            },
            {
              name: 'No Service',
              icons: [['fas fa-3x fa-power-off']],
              color: 'fa-icon-call-reason',
              route: 'no-service',
              accountList: [
                {
                  type: 'No Service',
                  account: '8245100030051212',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'ordering',
      display: 'Ordering',
      groups: [
        {
          name: 'Repair',
          options: [
            {
              name: 'Create New Connect Order',
              icons: [['fas fa-3x fa-user-plus']],
              color: 'fa-icon-ordering',
              route: 'new-connect',
              accountList: [
                {
                  type: 'CSG Residential-',
                  account: '63141555110000',
                },
                {
                  type: 'CSG Residential (FTTP)-',
                  account: '63141666140000',
                },
              ],
            },
            {
              name: 'Reschedule Or Cancel Order',
              icons: [['fas fa-3x fa-user-clock']],
              color: 'fa-icon-ordering',
              route: 'reschedule-cancel',
              accountList: [
                {
                   type: 'CSG Residential-',
                  account: '8429763145879632',
                },
                {
                  type: 'CSG Residential (FTTP)-',
                  account: '8245123922263374',
                },
              ],
            },
            {
              name: 'Change Of Service',
              icons: [['fas fa-3x fa-user-cog']],
              color: 'fa-icon-ordering',
              route: 'cos',
              accountList: [
                {
                  type: 'CSG-',
                  account: '8429763145879631',
                },
                {
                  type: 'CSG (FTTP)-',
                  account: '8429874256980742',
                },
                {
                  type: 'Single Play TV Select-',
                  account: '8345780010000013',
                },
                {
                  type: 'Single Play HSD',
                  account: '8087300020000012',
                },
              ],
            },
            {
              name: 'Change Of Service(Retention)',
              icons: [['fas fa-3x fa-user-cog']],
              color: 'fa-icon-ordering',
              route: 'cos-retention',
              accountList: [               
                {
                  type: 'Single Play HSD',
                  account: '844820018050002',
                },
                {
                  type: 'Double Play',
                  account: '834578048050001',
                },
                {
                  type: 'Triple Play',
                  account: '8203110010828312',
                }
              ]
            },
            {
              name: 'Modify Pending Order',
              icons: [['fas fa-3x fa-user-edit']],
              color: 'fa-icon-ordering',
              route: 'edit-order',
              accountList: [
                {
                  type: 'CSG Residential-',
                  account: '8429763145879633',
                },
                {
                  type: 'CSG Residential (FTTP)-',
                  account: '8381190010466235',
                },
                {
                  type: 'Internet Only-',
                  account: '8448410820011340',
                }
              ]
            },
            {
              name: 'Move/Transfer',
              icons: [['fas fa-3x fa-map-marked-alt']],
              color: 'fa-icon-ordering',
              route: 'move-transfer',
              accountList: [
                {
                  type: '',
                  account: '8245100020098880',
                },
              ]
            },
            {
              name: 'Restart',
              icons: [['fas fa-3x fa-redo']],
              color: 'fa-icon-ordering',
              route: 'restart',
              accountList: [
                {
                  type: 'CSG Residential-',
                  account: '8347100015617643',
                },
                {
                  type: 'CSG Residential (FTTP)-',
                  account: '8347200026728754',
                },
              ]
            },
            {
              name: 'Restart (Unreturned Equiment)',
              icons: [['fas fa-3x fa-redo']],
              color: 'fa-icon-ordering',
              route: 'restart-equip',
              accountList: [
                {
                  type: 'Unreturned Equipment',
                  account: '8260130590215055',
                },
              ]
            },
            {
              name: 'Disconnect',
              icons: [['fas fa-3x fa-user-slash']],
              color: 'fa-icon-ordering',
              route: 'disconnect',
              accountList: [
                {
                  type: 'CSG Residential-',
                  account: '8429764054960542',
                },
                {
                  type: 'CSG Residential (FTTP)-',
                  account: '8429764065071653',
                },
              ]
            },
            {
              name: 'Seasonal Suspend',
              icons: [['fas fa-3x fa-calendar-day']],
              color: 'fa-icon-ordering',
              route: 'suspend',
              accountList: [
                {
                  type: '',
                  account: '8429855963148393',
                },
              ]
            },
            {
              name: 'Bulk Tenant(Tenant Responsible Equipment)',
              icons: [['fas fa-3x fa-building']],
              color: 'fa-icon-ordering',
              route: 'bulk',
              accountList: [
                {
                  type: 'Bulk Supported (Location Id)-',
                  account: '65079686500014',
                },
                {
                  type: 'Bulk Unsupported (Location Id)-',
                  account: '65079687800015',
                },
                {
                  type: 'Bulk Modify Pending Order-',
                  account: '8750763145879632',
                },
                {
                  type: 'Bulk Reschedule Pending Order-',
                  account: '8750763145980633',
                },
                {
                  type: 'Bulk Cancel Pending Order-',
                  account: '8750763145980744',
                },
                {
                  type: 'Bulk Disconnect Account-',
                  account: '8750763145991855',
                },
                {
                  type: 'Bulk Change of Service Account-',
                  account: '8429874256989897',
                },
                {
                  type: 'Bulk COS-Downgrade-',
                  account: '815010230050003',
                },
                {
                  type: 'Bulk COS-Upgrade-',
                  account: '8429874256989827',
                },
              ]
            },
          ],
        },
      ],
    },
    {
      name: 'billing',
      display: 'Billing',
      groups: [
        {
          name: 'Repair',
          options: [
            {
              name: 'Take a Payment / Autopay',
              icons: [['fas fa-3x fa-hand-holding-usd']],
              color: 'fa-icon-billing',
              route: 'take-payment',
              accountList: [
                {
                  type: 'Account in Good Standing:',
                  account: '8429763145879640',
                },
                {
                  type: 'Delinquent Account:',
                  account: '8314713395279010',
                },
              ],
            },
            {
              name: 'General Billing',
              icons: [['fas fa-3x fa-calculator']],
              color: 'fa-icon-billing',
              route: 'general-billing',
              accountList: [
                {
                  account: '8429763145879650',
                },
              ],
            },
            {
              name: 'Credit Calculator',
              icons: [['fas fa-3x fa-credit-card']],
              color: 'fa-icon-billing',
              route: 'credit-calc',
              accountList: [
                {
                  type: 'Credit Calculator:',
                  account: '8429763145879660',
                },
                {
                  type: 'Credit Calculator- Courtesy:',
                  account: '8150180011144440',
                },
              ],
            },
            {
              name: 'Call Reason',
              icons: [['fas fa-3x fa-phone-volume']],
              color: 'fa-icon-billing',
              route: '',             
              
            },
          ],
        },
      ],
    },
    {
      name: 'repair',
      display: 'Repair',
      groups: [
        {
          name: 'Repair',
          options: [
            {
              name: 'Cannot Connect',
              icons: [['fas fa-3x fa-handshake-slash']],
              color: 'fa-icon-call-reason',
              route: 'cannot-connect',
              accountList: [
                {
                  account: '8245100030092203',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'legacy-repair',
      display: 'Legacy Repair',
      groups: [
        {
          name: 'Repair',
          options: [
            {
              name: 'Missing Channels',
              icons: [['fas fa-3x fa-film']],
              color: 'fa-icon-call-reason',
              route: 'missing-channels',
              accountList: [
                {
                  type: 'ICOMS-',
                  account: '210052777',
                },
                {
                  type: 'CSG-',
                  account: '8347100011133330',
                },
                {
                  type: 'CSG (Spectrum Guide)- SCI-',
                  account: '8347100011144440',
                },
                {
                  type: 'ICOMS-',
                  account: '210052777',
                },
              ],
            },
            {
              name: 'Self Installation',
              icons: [['fas fa-3x fa-wand-magic-sparkles']],
              color: 'fa-icon-call-reason',
              route: 'self-installation',
              accountList: [
                {
                  type: 'ICOMS',
                  account: '210052777',
                },
                {
                  type: 'CSG',
                  account: '8347100011133330',
                },
              ],
            },
            {
              name: 'Remote Control Issues',
              icons: [['fas fa-3x fa-gamepad']],
              color: 'fa-icon-call-reason',
              route: 'remote-control-issues',
              accountList: [
                {
                  type: 'ICOMS',
                  account: '210052777',
                },
                {
                  type: 'CSG',
                  account: '8347100011133330',
                },
              ],
            },
            {
              name: 'Equipment Issues',
              icons: [['fas fa-3x fa-tv']],
              color: 'fa-icon-call-reason',
              route: 'equipment-issues',
              accountList: [
                {
                  type: 'CSG',
                  account: '8347100011166660',
                },
              
              ],
            },
            {
              name: 'Internet Issues',
              icons: [['fas fa-3x fa-wifi']],
              color: 'fa-icon-call-reason',
              route: 'internet-issues',
              accountList: [
                {
                  type: 'CSG',
                  account: '8347100011133330',
                },
              ],
            },
            {
              name: 'Guide Issues',
              icons: [['fas fa-3x fa-ban']],
              color: 'fa-icon-call-reason',
              route: 'guide-issues',
              accountList: [
                {
                  type: 'CSG',
                  account: '8150180011144440',
                },
              ],
            },
            {
              name: 'Cable Box Error',
              icons: [['fas fa-3x fa-exclamation-circle']],
              color: 'fa-icon-call-reason',
              route: 'cable-box-error',
              accountList: [
                {
                  type: 'CSG',
                  account: '8150180011144440',
                },
              ],
            },
            {
              name: 'Features',
              icons: [['fas fa-3x fa-play-circle']],
              color: 'fa-icon-call-reason',
              route: 'features',
              accountList: [
                {
                  type: 'CSG',
                  account: '8150180011144440',
                },
              ],
            },
            {
              name: 'DVR Functionality',
              icons: [['fas fa-3x fa-video']],
              color: 'fa-icon-call-reason',
              route: 'dvr-functionality',
              accountList: [
                {
                  type: 'CSG',
                  account: '8347100011144440',
                },
              ],
            },
            {
              name: 'Picture Quality',
              icons: [['fas fa-3x fa-image']],
              color: 'fa-icon-call-reason',
              route: 'picture-quality',
              accountList: [
                {
                  type: 'CSG',
                  account: '8347100011177770',
                },
              ],
            },
            {
              name: 'Audio Issues',
              icons: [['fas fa-3x fa-volume-up']],
              color: 'fa-icon-call-reason',
              route: 'audio-issues',
              accountList: [
                {
                  type: 'CSG',
                  account: '8150180011144440',
                },
              ],
            },
            {
              name: 'All LOB Out',
              icons: [['fas fa-3x fa-power-off']],
              color: 'fa-icon-call-reason',
              route: 'all-lob-out',
              accountList: [
                {
                  type: 'CSG',
                  account: '8150180011144440',
                },
              ],
            },
            {
              name: 'Work Management / Reschedule',
              icons: [['fas fa-3x fa-tasks']],
              color: 'fa-icon-call-reason',
              route: 'work-management',
              accountList: [
                {
                  type: 'CSG',
                  account: '8347100011155550',
                },
              ],
            },
            {
              name: 'SMB - No Dial Tone/Cannot Receive/Make Calls',
              icons: [['fas fa-3x fa-phone-slash']],
              color: 'fa-icon-call-reason',
              route: 'SMB-nodialtone',
              accountList: [
                {
                  type: 'Single Line:',
                  account: '357648901',
                },
                {
                  type: 'Multi Line',
                  account: '8260161584576999',
                }               
              ],
            },
            {
              name: 'Call Reason',
              icons: [['fas fa-3x fa-phone-volume']],
              color: 'fa-icon-call-reason',
              route: 'call-reason',
            },
            {
              name: 'Escalate to Dispatch (ETD)',
              icons: [['fas fa-3x fa-angles-up']],
              color: 'fa-icon-call-reason',
              route: 'etd',
            },
          ],
        },
      ],
    },
    {
      name: 'mobile',
      display: 'Mobile',
      groups: [
        {
          name: 'Repair',
          options: [
            {
              name: 'Mobile',
              icons: [['fas fa-3x fa-mobile-screen']],
              color: 'fa-icon-call-reason',
              route: 'mobile',
              accountList: [
                {
                  type: 'Eligible for Mobile Service:',
                  account: '8347100011155550',
                },
                {
                  type: 'Ineligible for Mobile Service:',
                  account: '8347100011133330',
                },
                {
                  type: 'Existing Mobile Service:',
                  account: '8347100011144440',
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  public getFlowInfo(flow: string): any {
    return this.flows.find((f) => f.name === flow);
  }
}
