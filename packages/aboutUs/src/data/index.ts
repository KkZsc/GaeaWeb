export interface IITem {
  name: string;
  key: string;
  param: {};
}

export const protocolList: IITem[] = [
  {
    name: '相关许可证',
    key: 'basic_govpic_597000',
    param: {},
  },
  {
    name: '服务协议',
    key: 'basic_protocol_user_571000',
    param: {},
  },
  {
    name: '收集个人信息清单',
    key: 'basic_protocol_collectInfo_790000',
    param: {},
  },
  {
    name: '共享个人信息清单',
    key: 'basic_protocol_shareInfo_790000',
    param: {},
  },
  {
    name: '隐私政策',
    key: 'basic_protocol_privacy_571000',
    param: {pageType: 'Set'},
  },
  {
    name: '隐私政策摘要',
    key: 'basic_protocol_summaryOfPrivacy_790000',
    param: {},
  },
  {
    name: '儿童隐私政策',
    key: 'basic_protocol_kids_571000',
    param: {},
  },
];
