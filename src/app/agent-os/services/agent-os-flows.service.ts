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
                  type:'Standard Payment',
                  account: '8429763145879641',
                },
                {
                  type:'Service Interrupted',
                  account: '8314713395279210',
                },
                {
                  type:'Payment Due Recently',
                  account: '8314713395279300',
                },
                {
                  type:'Payment Past Due',
                  account: '8314713395279315',
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
                  type:'',
                  account: '8347100015617690',
                },]
            },
            {
              name: 'Cannot Connect',
              icons: [['fas fa-handshake-slash fa-3x']],
              color: 'fa-icon-call-reason',
              route: 'cannot-connect',
              accountList: [
                {
                  type:'',
                  account: '8245100030092200',
                },]
            },
            {
              name: 'Missing Channels',
              icons: [['fas fa-3x fa-film']],
              color: 'fa-icon-call-reason',
              route: 'missing-channels',
              accountList: [
                {
                  type:'',
                  account: '8245100030050010',
                },]
            },
            {
              name: 'No Service',
              icons: [['fas fa-3x fa-power-off']],
              color: 'fa-icon-call-reason',
              route: 'no-service',
              accountList: [
                {
                  type:'',
                  account: '8245100030051210',
                },]
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
            },
            {
              name: 'Reschedule Or Cancel Order',
              icons: [['fas fa-3x fa-user-clock']],
              color: 'fa-icon-ordering',
              route: 'reschedule-cancel',
              accountList: [
                {
                  account: '8245123922263374',
                },
                {
                  account: '8429763145879632',
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
                  account: '8429763145879630',
                },
                {
                  account: '8429874256980740',
                },
                {
                  account: '8345780010000010',
                },
                {
                  account: '8087300020000010',
                },
              ],
            },
            {
              name: 'Change Of Service(Retention)',
              icons: [['fas fa-3x fa-user-cog']],
              color: 'fa-icon-ordering',
              route: 'cos-retention',
            },
            {
              name: 'Modify Pending Order',
              icons: [['fas fa-3x fa-user-edit']],
              color: 'fa-icon-ordering',
              route: 'edit-order',
            },
            {
              name: 'Move/Transfer',
              icons: [['fas fa-3x fa-map-marked-alt']],
              color: 'fa-icon-ordering',
              route: 'move-transfer',
            },
            {
              name: 'Restart',
              icons: [['fas fa-3x fa-redo']],
              color: 'fa-icon-ordering',
              route: 'restart',
            },
            {
              name: 'Restart (Unreturned Equiment)',
              icons: [['fas fa-3x fa-redo']],
              color: 'fa-icon-ordering',
              route: 'restart-equip',
            },
            {
              name: 'Disconnect',
              icons: [['fas fa-3x fa-user-slash']],
              color: 'fa-icon-ordering',
              route: 'disconnect',
            },
            {
              name: 'Seasonal Suspend',
              icons: [['fas fa-3x fa-calendar-day']],
              color: 'fa-icon-ordering',
              route: 'suspend',
            },
            {
              name: 'Bulk Tenant(Tenant Responsible Equipment)',
              icons: [['fas fa-3x fa-building']],
              color: 'fa-icon-ordering',
              route: 'bulk',
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
                  account: '8314713395279010',
                },
                {
                  account: '8429763145879640',
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
                  account: '8429763145879660',
                },
                {
                  account: '8150180011144440',
                },
              ],
            },
            {
              name: 'Call Reason',
              icons: [['fas fa-3x fa-phone-volume']],
              color: 'fa-icon-billing',
              route: 'call-reason',

              accountList: [
                {
                  type:'One Click Credit',
                  account: '8345780121551174',
                },
                {
                  type:'First Bill:',
                  account: '8345780013860741',
                },
                {
                  type:'Bill Increase:',
                  account: '8245123940306051',
                },
                {
                  type:'Take Payment Failure:',
                  account: '8245100990063956',
                },
              ],
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
                  type:'CSG',
                  account: '8347100011144440',
                },
              ]
            },
            {
              name: 'Self Installation',
              icons: [['fas fa-3x fa-wand-magic-sparkles']],
              color: 'fa-icon-call-reason',
              route: 'self-installation',
              accountList: [
                {
                  type:'ICOMS',
                  account: '210052777',
                },
                {
                  type:'CSG',
                  account: '8347100011133330',
                },
              ]
            },
            {
              name: 'Remote Control Issues',
              icons: [['fas fa-3x fa-gamepad']],
              color: 'fa-icon-call-reason',
              route: 'remote-control-issues',
            },
            {
              name: 'Equipment Issues',
              icons: [['fas fa-3x fa-tv']],
              color: 'fa-icon-call-reason',
              route: 'equipment-issues',
            },
            {
              name: 'Internet Issues',
              icons: [['fas fa-3x fa-wifi']],
              color: 'fa-icon-call-reason',
              route: 'internet-issues',
            },
            {
              name: 'Guide Issues',
              icons: [['fas fa-3x fa-ban']],
              color: 'fa-icon-call-reason',
              route: 'guide-issues',
            },
            {
              name: 'Cable Box Error',
              icons: [['fas fa-3x fa-exclamation-circle']],
              color: 'fa-icon-call-reason',
              route: 'cable-box-error',
            },
            {
              name: 'Features',
              icons: [['fas fa-3x fa-play-circle']],
              color: 'fa-icon-call-reason',
              route: 'features',
            },
            {
              name: 'DVR Functionality',
              icons: [['fas fa-3x fa-video']],
              color: 'fa-icon-call-reason',
              route: 'dvr-functionality',
            },
            {
              name: 'Picture Quality',
              icons: [['fas fa-3x fa-image']],
              color: 'fa-icon-call-reason',
              route: 'picture-quality',
              accountList: [
                {
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
                  account: '8150180011144440',
                },
              ],
            },
            {
              name: 'Work Management / Reschedule',
              icons: [['fas fa-3x fa-tasks']],
              color: 'fa-icon-call-reason',
              route: 'work-management',
            },
            {
              name: 'SMB - No Dial Tone/Cannot Receive/Make Calls',
              icons: [['fas fa-3x fa-phone-slash']],
              color: 'fa-icon-call-reason',
              route: 'SMB-nodialtone',
              accountList: [
                {
                  type:'',
                  account: '8260161584576990',
                },
                {
                  type:'singleline:',
                  account: '357648901',
                },
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
                  account: '8347100011155550',
                },
                {
                  account: '8347100011133330',
                },
                {
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
