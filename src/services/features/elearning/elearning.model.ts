import { parseToMoney } from '@/services/shared/utils';

export class CourseModel {
  id: string;
  createdDate: Date;
  createdBy: string;
  modifiedDate: Date;
  modifiedBy: string;
  // Custom fields
  isHot: boolean;
  isActive: boolean;
  type: string;
  startDate: Date;
  endDate: Date;
  description: string;
  name: string;
  icon: string;
  iconWeb: string;
  status: string;
  progress: number;
  point: number;
  category: any;
  categories: any[];
  instructors: any;
  typeFree: string;
  typeStudy: string;
  timeOpening: string;
  addressOpening: string;
  certificateFiles: any[];
  descriptionCertificate: string;
  target: any;
  payCash: string;
  amountCash: number;
  payPoint: string;
  amountPoint: number;
  isFavorite: boolean;
  statusPayment: string;
  coverImage: string;
  mailContent: string;
  notificationContent: string;
  countRegister: number;
  histories: any[];
  isPayBoth: boolean;
  lessons: any[];
  detailIntroduction: any;
  introVideo: any;
  constructor(init?: Partial<CourseModel>) {
    Object.assign(this, init);
  }
}

export class LessonModel {
  id: string;
  createdDate: Date;
  createdBy: string;
  modifiedDate: Date;
  modifiedBy: string;
  // Custom fields
  // Khai báo các field của riêng từng chức năng
  name: string; // tên bài học
  icon: string; // icon
  course: any; // khóa học
  level: number; // cấp độ
  isActive: boolean; // trạng thái
  defaultActive: boolean; // trạng thái mặc định
  progress: number; // tiến trình học
  isPassed: boolean; // đã hoàn thành
  groups: any;
  events: any;
  description: string;

  constructor(init?: Partial<CourseModel>) {
    Object.assign(this, init);
  }
}

export class TopicModel {
  id: string;
  createdDate: Date;
  createdBy: string;
  modifiedDate: Date;
  modifiedBy: string;
  // Custom fields
  name: string;
  level: number;
  isActive: boolean;
  time: number;
  hasPractice: boolean;
  questions: any;
  description: string;
  lessonId: string;
  videoUrl: string;
  videoType: string;
  attachments: any;
  isPassed: boolean;

  constructor(init?: Partial<CourseModel>) {
    Object.assign(this, init);
  }
}

export class QuestionModel {
  id: string;
  createdDate: Date;
  createdBy: string;
  modifiedDate: Date;
  modifiedBy: string;
  // Custom fields
  title: string;
  isActive: boolean;
  type: string;
  point: number;
  answers: any[];
  image: string;
  description: string;

  constructor(init?: Partial<CourseModel>) {
    Object.assign(this, init);
  }
}

export class InstructorModel {
  id: string;
  createdDate: Date;
  createdBy: string;
  modifiedDate: Date;
  modifiedBy: string;
  active: string;
  // Custom fields
  userInfo: any;
  coursesParticipated: any[];
  countLearners: any;
  isFavorite: boolean;

  constructor(init?: Partial<CourseModel>) {
    Object.assign(this, init);
  }
}

export class HistoryStudyModel {
  id: string;
  countLessonCompleted: number;
  countLessonInProgress: number;
  rank: number;
  point: any;
  title: string;
  iconImage: string;
  countFavoriteLesson: number;
  countFavoriteInstructor: number;
  countDownload: number;
  countRate: number;

  constructor(init?: Partial<CourseModel>) {
    Object.assign(this, init, { point: init?.point ? parseToMoney(init?.point) : init?.point });
  }
}

export class RegisterCourseModel {
  courseId: string;
  name: string;
  phone: string;
  email: string;
  note: string;

  constructor(init?: Partial<CourseModel>) {
    Object.assign(this, init);
  }
}

export class PaymentCourseModel {
  courseId: string;
  typePayment: string;

  constructor(init?: Partial<CourseModel>) {
    Object.assign(this, init);
  }
}

export class CategoryModel {
  id: string;
  createdDate: Date;
  createdBy: string;
  modifiedDate: Date;
  modifiedBy: string;
  isActive: boolean;
  // Custom fields
  nameLocale: any[];
  isUsed: boolean;
  courseList: any;
  iconImgUrl: string;
  checked: boolean;
  name: string;

  constructor(init?: Partial<CategoryModel>) {
    Object.assign(this, init);
  }
}

export class UserLessonModel {
  id: string;
  createdDate: Date;
  createdBy: string;
  modifiedDate: Date;
  modifiedBy: string;
  // Custom fields
  lesson: any;
  user: any;
  status: string;
  statusPayment: string;
  notes: any;
  rank: number;
  point: number;
  statusLearn: string;
  countPass: number;
  countLesson: number;
  countLessonQuestion: number;
  countPassQuestion: number;
  title: string;

  constructor(init?: Partial<CourseModel>) {
    Object.assign(this, init);
  }
}

export class HistoryUpdateStatusModel {
  id: string;
  createdBy: any;
  createdDate: Date;
  statusNew: string;
  statusPayment: string;
  type: string; // 1: Thay đổi trạng thái tư vấn || 2: Trạng thái thanh toán
  note: string;
  url: string;

  constructor(init?: Partial<CourseModel>) {
    Object.assign(this, init);
  }
}

export class BannerPropskillModel {
  id: string;
  name: string;
  campaignType: string;
  screen: string;
  banner: string;
  coverImgUrl: string;
  popupImgUrl: string;
  showPopup: string;
  groupId: string;
  groupChatId: string;
  data: any;

  constructor(init?: Partial<CourseModel>) {
    Object.assign(this, init);
  }
}
