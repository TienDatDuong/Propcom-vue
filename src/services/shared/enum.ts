export enum StringeeSetting {
  CALL_NOT_ALLOWED_BY_YOUR_SERVER = 11, // Call Not Allowed By Your Server
  GET_USER_MEDIA_ERROR = 1000, // Don’t have permission access Camera /Mic or WebRTC not support
  FROM_NUMBER_OR_TO_NUMBER_INVALID_FORMAT = 10, // From Number Or To Number Invalid Format
  TO_NUMBER_INVALID = 14, // To Number Invalid
  ACCOUNT_LOCKED = 19, // Account Locked
  TEMPORARILY_UNAVAILABLE = 480, // Callee currently unavailable
  ENDED = 6, // Call end
  BUSY = 5, // Busy
  ANSWERED = 3, // ANSWERED
}

export enum CurrencyEnum {
  Thousand = 'Nghìn',
  Million = 'Triệu',
  Billion = 'Tỷ',
}

export enum CourseTypeEnum {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export enum BannerPositionEnum {
  PROPSKILL = 'PROPSKILL',
}

export enum QuestionTypeEnum {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  FILL_IN_BLANK = 'FILL_IN_BLANK',
}

export enum AnswersEnum {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
}

export enum AnswersIndexEnum {
  A = 0,
  B = 1,
  C = 2,
  D = 3,
}

export enum QuestionTypeNameEnum {
  MULTIPLE_CHOICE = 'Trắc nghiệm',
  FILL_IN_BLANK = 'Điền vào chỗ trống',
}

export enum RankTypeEnum {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  ALL = 'all',
}

export enum TitleImageEnum {
  AWESOME = 'AWESOME',
  PROFESSIONAL = 'PROFESSIONAL',
  AMATEURS = 'AMATEURS',
  STREET = 'STREET',
  NEWBIE = 'NEWBIE',
}

export enum StatusCourseEnum {
  COMPLETED = 'COMPLETED', // Hoàn thành khóa học
  IN_PROGRESS = 'IN_PROGRESS', // Đang học
  INIT = 'INIT', // Chưa học,
  LEARNED = 'LEARNED', // Chưa học,
}

export enum TypeVideoEnum {
  YOUTUBE = 'YOUTUBE',
  VIDEO = 'VIDEO',
  VIDEO_FILE = 'VIDEO_FILE',
  FILE = 'FILE',
}

export enum FreeTypeEnum {
  FREE = 'FREE', // Miễn phí
  NOT_FREE = 'NOT_FREE', // Trả phí
}

export enum StudyTypeEnum {
  OFFLINE = 'OFFLINE', // Sơ cấp
  ONLINE = 'ONLINE', // Trung cấp
}

export enum StudyTypeLevelEnum {
  LOW = 'LOW', // Sơ cấp
  MEDIUM = 'MEDIUM', // Trung cấp
  HIGH = 'HIGH', // Chuyên nghiệp
}

export enum CourseTypeEnum {
  GROUP = 'GROUP', // Nhóm
  EVENT = 'EVENT', // Sự kiện
}

export enum WalletTypeEnum {
  MAIN = 'MAIN',
  PROMOTION = 'PROMOTION',
  CASH = 'CASH',
  POINT = 'POINT',
}

export enum StatusRegisterEnum {
  INIT = 'INIT', // default
  NOT_ADVISED = 'NOT_ADVISED', // Chưa tư vấn
  ADVISED = 'ADVISED', // Đã tư vấn
  IN_CONTACT = 'IN_CONTACT', // Đang liên hệ
  CONTACT = 'CONTACT', // Chờ liên hệ
  REGISTER = 'REGISTER', // Đã đăng ký
  CANCEL_REGISTER = 'CANCEL_REGISTER', // Hủy đăng ký
  IN_PROGRESS = 'IN_PROGRESS', // Đang học
  RESERVE = 'RESERVE', // Bảo lưu
  COMPLETED = 'COMPLETED', // Đã hoàn thành
  OFFLINE_REGISTER = 'OFFLINE_REGISTER', // Khóa học đã đăng ký
}

export enum StatusPaymentEnum {
  UNPAID = 'UNPAID',
  PAID = 'PAID',
}

export enum HistoryChangeEnum {
  STATUS = 'STATUS', // Thay đổi trạng thái tư vấn
  PAYMENT = 'PAYMENT', // Thay đổi trạng thái thanh toán
}

export enum PropSkillTabEnum {
  COURSE_ONLINE = 'COURSE_ONLINE',
  COURSE_OFFLINE = 'COURSE_OFFLINE',
  SPEAKER = 'SPEAKER',
}

export enum PropskillDataGet {
  ALL = 'ALL', // Tất cả
  OFFLINE_REGISTER = 'OFFLINE_REGISTER', // Đã đăng ký
  IN_PROGRESS = 'IN_PROGRESS', // Đang học
  COMPLETED = 'COMPLETED', // Đã hoàn thành
}

export enum ProgressCourseEnum {
  LESSON = 'LESSON',
  TOPIC = 'TOPIC',
}

export enum MediaTypeEnum {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  YOUTUBE = 'YOUTUBE',
  FILE = 'FILE',
  VIDEO_FILE = 'VIDEO_FILE',
}

export enum TableRankEnum {
  COURSE = 'COURSE',
  ALL = 'ALL',
}

export enum PropSkillRouterTabEnum {
  COURSE = 'Danh sách khóa học',
  SPEAKER = 'Danh sách diễn giả',
}

export enum EmployeeStatusTransEnum {
  INIT = 'Chưa xác thực',
  WAITING = 'Chờ xác thực',
  IDENTIFIED = 'Đã xác thực',
  REJECTED = 'Từ chối',
  SIGNED_CONTRACT = 'Đã ký hợp đồng',
}

export enum TypeDocEnum {
  FILE_DOC = 'FILE_DOC',
  IMAGE = 'IMAGE',
  FILE_PDF = 'FILE_PDF',
  MEDIA = 'MEDIA',
  FILE_XLSX = 'FILE_XLSX',
}

export enum TypePopupEnum {
  USER = 'USER',
  USER_LEARN = 'USER_LEARN',
}
