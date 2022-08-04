export class InvestorModel {
  id: string;
  createdDate: string;
  createdBy: string;
  modifiedDate: string;
  modifiedBy: string;

  active: boolean;
  name: string;
  shortName: string;
  address: string;
  website: string;
  phone: string;
  description: string;

  participatedDate: string; // ngày tham gia
  type: string; // loại
  banner: string; // ảnh bìa
  logo: string; // logo gian hàng
  outstanding: boolean; // nổi bật
  bussinessRegistration: string; // đăng ký kinh doanh
  email: string;
  facebook: string;
  projectList: InvestorEmployeeProjectModel[];
  projectTotal: number;
  productTotal: number;

  constructor(init?: Partial<InvestorModel>) {
    const projectTotal = init && init.projectList ? init.projectList.length : null;
    Object.assign(this, { ...init, projectTotal });
  }
}

export class InvestorEmployeeProjectModel {
  id: string;
  name: string;

  constructor(init?: Partial<InvestorEmployeeProjectModel>) {
    Object.assign(this, init);
  }
}