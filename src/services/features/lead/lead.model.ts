import { DateTime } from 'luxon';

export enum ExploitEnum {
  POTENTIAL = 'potential',
  ASSIGN = 'assign',
  REASSIGN = 'reassign',
  PROCESSING = 'processing',
  CANCEL = 'cancel',
  DONE = 'done',
}

export enum TypeInputEnum {
  DROPDOWN = 'dropdown',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  TEXT = 'text',
  TEXTARE = 'textare',
  NUMBER = 'number',
  SLIDER = 'slider',
}

export const BuySellEnum = [
  { key: 'BUY', value: 'Mua' },
  { key: 'SELL', value: 'Bán' },
];

export const optionReturnEnum = [
  { key: 'khach_hang_khong_co_nhu_cau', value: 'Khách hàng không có nhu cầu' },
  { key: 'khong_lien_lac_duoc', value: 'Không liên lạc được' },
  { key: 'khong_co_san_pham_phu_hop', value: 'Không có sản phẩm phù hợp' },
  { key: 'ly_do_khac', value: 'Lý do khác' },
];

export class LeadModel {
  address: string;
  assignDuration: number;
  assignedDate: Date;
  callingMethodCarrier: any[];
  clientId: string;
  code: string;
  createdDate: Date;
  customerTarget: any;
  demand: any;
  description: string;
  email: string;
  expireTime: Date;
  exploitStatus: ExploitEnum;
  id: string;
  importedBy: any;
  isCallingViaCarrier: boolean;
  isCallingViaSim: boolean;
  isHot: boolean;
  isPotential: boolean;
  isUsingPhoneId: boolean;
  modifiedBy: string;
  name: string;
  note: string;
  numberMobileMethodCarriers: any[];
  phone: string;
  phoneId: string;
  pos: any;
  project: any;
  rejectReason: string;
  repoConfigCode: string;
  repoId: string;
  sex: string;
  source: string;
  surveys: any[];
  takeCare: any;
  timezoneClient: string;
  updatedDate: Date;
  visiblePhone: any;
  _id: string;

  constructor(init?: Partial<LeadModel>) {
    Object.assign(this, init);
  }
}
