export class Constant {
  public static REG_NUMBER_CHARACTERISTICS = /[^a-zA-Z0-9._-]/g;
  public static PERCENT_PASS_LESSON = 0.6;
  public static STATUS_REGISTER = [
    {
      key: 'IN_CONTACT',
      title: 'Đang liên hệ',
      icon: require('@/assets/images/status-course/pending-icon.png'),
      color: '#FF7246',
      dot: '#FFDBD0',
    },
    {
      key: 'CONTACT',
      title: 'Chờ liên hệ',
      icon: require('@/assets/images/status-course/pending-icon.png'),
      color: '#FFC224',
      dot: '#FFF3D2',
    },
    {
      key: 'REGISTER',
      title: 'Đã đăng ký',
      icon: require('@/assets/images/status-course/done-icon.png'),
      color: '#1890F7',
      dot: '#D6ECFF',
    },
    {
      key: 'IN_PROGRESS',
      title: 'Đang học',
      icon: require('@/assets/images/status-course/study-icon.png'),
      color: '#2CD83D',
      dot: '#DAFFDE',
    },
    {
      key: 'RESERVE',
      title: 'Bảo lưu',
      icon: require('@/assets/images/status-course/done-icon.png'),
      color: '#FB4D4D',
      dot: '#FFCCCC',
    },
    {
      key: 'COMPLETED',
      title: 'Đã hoàn thành',
      icon: require('@/assets/images/status-course/done-icon.png'),
      color: '#04C35C',
      dot: '#C2FFDE',
    },
  ];
  public static LEVEL_PROPSKILL = [
    { key: 'NEWBIE', icon: require('@/assets/images/level/newbie-icon.png'), color: '#C1C1C1' },
    { key: 'STREET', icon: require('@/assets/images/level/street-icon.png'), color: '#3EA4FF' },
    { key: 'AMATEURS', icon: require('@/assets/images/level/amateurs-icon.png'), color: '#DC67F2' },
    { key: 'PROFESSIONAL', icon: require('@/assets/images/level/professional-icon.png'), color: '#F32727' },
    { key: 'AWESOME', icon: require('@/assets/images/level/awesome-icon.png'), color: '#EFD949' },
  ];
  public static CHANGE_TAB = [
    {
      key: 'COURSE_ONLINE',
      icon: require('@/assets/images/course-online-icon.png'),
      color: '#FB4D4D',
      title: 'Khóa học online',
      border: '#FFD6D3',
      bg: '#DD0000',
    },
    {
      key: 'COURSE_OFFLINE',
      icon: require('@/assets/images/course-offline-icon.png'),
      color: '#4792FC',
      title: 'Khóa học offline',
      border: '#B0DEFF',
      bg: '#4792FC',
    },
    {
      key: 'SPEAKER',
      icon: require('@/assets/images/speaker-icon.png'),
      color: '#FF9900',
      title: 'Diễn giả',
      border: '#FDE8B5',
      bg: '#FF9900',
    },
  ];
  public static STATUS_FILTER_ONLINE = [
    { key: 'ALL', title: 'Tất cả', icon: require('@/assets/images/filter/done-inactive-icon.png') },
    { key: 'IN_PROGRESS', title: 'Đang học', icon: require('@/assets/images/filter/all-inactive-icon.png') },
    { key: 'COMPLETED', title: 'Đã hoàn thành', icon: require('@/assets/images/filter/in-progress-inactive-icon.png') },
  ];
  public static STATUS_FILTER_OFFLINE = [
    { key: 'ALL', title: 'Tất cả', icon: require('@/assets/images/filter/done-inactive-icon.png') },
    { key: 'OFFLINE_REGISTER', title: 'Đã đăng ký', icon: require('@/assets/images/filter/all-inactive-icon.png') },
    { key: 'COMPLETED', title: 'Đã hoàn thành', icon: require('@/assets/images/filter/in-progress-inactive-icon.png') },
  ];
  public static RANK_BOARD = [
    {
      key: 'FIRST',
      title: 'Hạng một',
      icon: require('@/assets/images/rank/rank-number-one.png'),
      background: require('@/assets/images/rank/first-rank.png'),
    },
    {
      key: 'SECOND',
      title: 'Hạng hai',
      icon: require('@/assets/images/rank/rank-number-two.png'),
      background: require('@/assets/images/rank/second-rank.png'),
    },
    {
      key: 'THIRD',
      title: 'Hạng ba',
      icon: require('@/assets/images/rank/rank-number-three.png'),
      background: require('@/assets/images/rank/third-rank.png'),
    },
  ];
  public static SIDE_TAB = [
    { key: 'LESSON', title: 'Bài học', icon: require('@/assets/images/study-progress/lesson-icon.png') },
    {
      key: 'TOPIC',
      title: 'Chủ đề',
      complete: require('@/assets/images/study-progress/complete-topic-icon.png'),
      text: require('@/assets/images/study-progress/text-topic-icon.png'),
      video: require('@/assets/images/study-progress/video-topic-icon.png'),
    },
  ];
  public static DOCUMENT = [
    { key: 'FILE_PDF', title: 'file.pdf', icon: require('@/assets/images/document/pdf-icon.png'), type: ['pdf'] },
    {
      key: 'MEDIA',
      title: 'media.mp3',
      icon: require('@/assets/images/document/video-icon.png'),
      type: ['mp4', 'avi', 'flv'],
    },
    {
      key: 'IMAGE',
      title: 'image.jpg',
      icon: require('@/assets/images/document/image-icon.png'),
      type: ['jpg', 'png', 'jpeg', 'gif'],
    },
    {
      key: 'FILE_XLSX',
      title: 'file.xlsx',
      icon: require('@/assets/images/document/xlsx-icon.png'),
      type: ['xlsx', 'xls'],
    },
    { key: 'FILE_DOC', title: 'file.doc', icon: require('@/assets/images/document/doc-icon.png') },
  ];
  public static RANK_FILTER = [
    { key: 'COURSE', title: 'BXH khóa học' },
    { key: 'ALL', title: 'BXH Tổng khóa học' },
  ];
  public static DAY_FILTER = [
    { key: 'all', title: 'Tất cả' },
    { key: 'day', title: 'Hôm nay' },
    { key: 'month', title: 'Tháng này' },
  ];
  public static STATUS_LEVEL = [
    {
      key: 'LOW',
      title: 'Sơ cấp',
      background: '#FFEEED',
    },
    {
      key: 'MEDIUM',
      title: 'Trung cấp',
      background: '#FF7474',
    },
    {
      key: 'HIGH',
      title: 'Chuyên nghiệp',
      background: '#DD0000',
    },
  ];
}
