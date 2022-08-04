export enum SocialType {
  SOCIAL_FACEBOOK = 'Facebook',
  SOCIAL_VIBER = 'Viber',
  SOCIAL_ZALO = 'Zalo',
  SOCIAL_INSTAGRAM = 'Instagram',
  SOCIAL_TIKTOK = 'Tiktok',
  SOCIAL_WEBSITE = 'Website',
}

export enum EmployeeStatusEnum {
  INIT = 'INIT',  // Chưa xác thực
  WAITING = 'WAITING',  // Chờ xác thực
  REJECTED = 'REJECTED',  // Từ chối
  IDENTIFIED = 'IDENTIFIED',  // Đã xác thực
  SIGNED_CONTRACT = 'SIGNED_CONTRACT',  // Đã ký hợp đồng
}

export class SocialUrlModel {
  name: string | SocialType;
  url: string;

  constructor(init?: Partial<SocialUrlModel>) {
    Object.assign(this, init);
  }
}

export class EmployeeProjectModel {
  id: string;
  name: string;

  constructor(init?: Partial<EmployeeProjectModel>) {
    Object.assign(this, init);
  }
}

export class EmployeeModel {
  id: string;
  status: EmployeeStatusEnum;
  name: string;
  dob: string;
  gender: string;
  avatarUrl: string;
  avatarThumbnailUrl: string;
  identityCode: string;
  identityDate: string;
  identityAddress: string;
  email: string;
  phone: string;
  socialUrls: SocialUrlModel[];
  description: string;
  project: string;
  quote: string;
  promotionCode: string;
  businessProfile: { introducer: string; quote: string; projectPaticipated: EmployeeProjectModel[] };
  isEditInfo: boolean;
  tiktok: string;

  constructor(init?: Partial<EmployeeModel>) {
    Object.assign(this, init);
  }
}