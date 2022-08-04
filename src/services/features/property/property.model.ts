export class ProjectParticipatedModel {
  id: string;
  imageUrl: string;
  name: string;

  constructor(init?: Partial<ProjectParticipatedModel>) {
    Object.assign(this, init);
  }
}

export class ProjectModel {
  id: string;
  createdDate: Date;
  createdBy: string;
  modifiedDate: Date;
  modifiedBy: string;
  active: boolean;
  // Custom fields
  name: string; // Tên
  type: ProjectTypeEnum;  // Căn hộ/đất nền
  code: string;
  status: ProjectStatusEnum; // Trạng thái
  isHotPackage: boolean; // Dự án đang hot

  unitTotal: number; // [TVV] Sẵn có
  unitRegister: number; // [TVV] Đã ĐK

  unitWarehouse: number; // [QLSP] Kho
  unitOpen: number; // [QLSP] Đã mở
  unitAvailable: number; // [QLSP] Sẵn có
  unitWaitingForConfirm: number; // [QLSP] Chờ xác nhận

  unitTransactionLater: number; // [TVV + QLSP] Giao dịch sau
  unitComplete: number; // [TVV + QLSP] Hoàn tất

  bookingCount: number; // Lượt đk giữ chỗ
  isBooking: boolean; // Đã đk giữ chỗ hay chưa
  minComm: number; // Hoa hồng min
  maxComm: number; // Hoa hồng max
  minAdvance: number; // Phí kí quỹ tối thiểu
  openDate: Date; // Hạn bán start
  closeDate: Date; // Hạn bán end
  minBonus: number; // Thưởng tối thiểu
  maxBonus: number; // Thưởng tối đa
  investor: string; // Chủ đầu tư (tên)
  investorInfo: any; // Chủ đầu tư
  transactionType: ProjectTransactionTypeEnum; // Hình thức
  currentStatus: string; // Hiện trạng
  imageUrl: string; // Hình đại diện dự án
  images: {
    list: {
      name: string;
      url: string;
      isDisplay: boolean;
    }[]; // Hình ảnh slider
    videos: { url: string; text: string }[];
  }

  // Khảo sát
  surveys: any[];
  address: string;
  priceTo: number;
  priceFrom: number;
  documentUrl: string;
  floorMap: string;
  url3D: string;
  url360: string;
  // Contact
  hotline: string;
  // Esalekit
  esalekit: boolean;
  esalekitUrl: string;
  isEnableTotalCompleted: boolean;
  allowBooking: boolean;
  isFavorite: boolean;
  group: { id: string; name: string };

  constructor(init?: Partial<ProjectModel>) {
    Object.assign(this, init);
  }
}

export enum ProjectTypeEnum {
  CAN_HO = 'CAN_HO', // Căn hộ
  DAT_NEN = 'DAT_NEN', // Đất nền
  RESORT = 'RESORT', // Khu nghỉ dưỡng/Khu Phức hợp
  BIET_THU = 'BIET_THU', // Biệt thự
  SHOPHOUSE = 'SHOPHOUSE', // Shophouse/Nhà ở TM
  MALL = 'MALL', // Khu đô thị thương mại giải trí
}

export enum ProjectStatusEnum {
  COMING_SALE = 'COMING_SALE',
  ON_SALE = 'ON_SALE',
  HANDED_OVER = 'HANDED_OVER',
  INFORMATION = 'INFORMATION',
  TRADING = 'TRADING',
}

export enum ProjectTransactionTypeEnum {
  SALE = 'SALE', // Bán
  LEASE = 'LEASE', // Cho thuê
}