export class AppConstant {
  static APP_NAME = process.env.VUE_APP_TITLE;
  static PREVIEW_IMAGE_URL = `${process.env.VUE_APP_ROOT}/preview.png`;
  static SERVICE_PREFIX = 'spx';
  static SERVICE_WS_CHANNEL = '/exchange/spx.Exchange.spx-adsg';
  static TOAST_LIMIT_NUMBER = 1; // Number of toast shown up
  static PROVIDER_STOMP_CLIENT = 'stompClient';
  static ROOT_URL = `${process.env.VUE_APP_API_ROOT}/spx`;
  static WS_URL = process.env.VUE_APP_WS_URL;
  static WS_LOGIN = process.env.VUE_APP_WS_LOGIN;
  static WS_PASSCODE = process.env.VUE_APP_WS_PASSCODE;
  static URL_APP_STORE = process.env.VUE_APP_URL_APP_STORE;
  static URL_PLAY_STORE = process.env.VUE_APP_URL_PLAY_STORE;
  static URL_STRINGEE = 'https://dx-v2.stringee.com';

  static ROUTE_NAME = {
    INVESTOR_DETAIL: 'investor-detail',
  };

  static REALTIME_EVENT = {
    POST_COMMENT_CREATED: 'groupCommentCreated',
    POST_COMMENT_UPDATED: 'groupCommentUpdated',
    POST_COMMENT_DELETED: 'groupCommentDeleted',
    POLL_UPDATED: 'updatePoll',
    LEAD_HOT_ASSIGN: 'lead_LeadHotAssigned',
  };

  static SOCIAL = {
    SOCIAL_FACEBOOK: 'Facebook',
    SOCIAL_LINKEDIN: 'LinkedIn',
    SOCIAL_VIBER: 'Viber',
    SOCIAL_ZALO: 'Zalo',
    SOCIAL_INSTAGRAM: 'Instagram',
    SOCIAL_TIKTOK: 'Tiktok',
    SOCIAL_WEBSITE: 'Website',
  };

  static ROOT_URL_EMPLOYEE_DOMAIN = `${AppConstant.ROOT_URL}-employee/api/domain/v1`;
  static ROOT_URL_EMPLOYEE_QUERY = `${AppConstant.ROOT_URL}-employee/api/query/v1`;

  static ROOT_URL_LEAD_DOMAIN = `${AppConstant.ROOT_URL}-lead/api/domain/v1`;
  static ROOT_URL_LEAD_QUERY = `${AppConstant.ROOT_URL}-lead/api/query/v1`;
  // static ROOT_URL_LEAD_DOMAIN = 'http://localhost:3052/api/domain/v1';
  // static ROOT_URL_LEAD_QUERY = 'http://localhost:3052/api/query/v1';

  static ROOT_URL_NEWS_DOMAIN = `${AppConstant.ROOT_URL}-news/api/domain/v1`;
  static ROOT_URL_NEWS_QUERY = `${AppConstant.ROOT_URL}-news/api/query/v1`;

  static ROOT_URL_SOCIAL_DOMAIN = `${AppConstant.ROOT_URL}-social/api/domain/v1`;
  static ROOT_URL_SOCIAL_QUERY = `${AppConstant.ROOT_URL}-social/api/query/v1`;

  static ROOT_URL_STS_DOMAIN = `${AppConstant.ROOT_URL}-sts/api/domain/v1`;
  static ROOT_URL_STS_QUERY = `${AppConstant.ROOT_URL}-sts/api/query/v1`;

  static ROOT_URL_UPLOADER = `${AppConstant.ROOT_URL}-uploader/api/v1`;

  static ROOT_URL_CARE = `${AppConstant.ROOT_URL}-care/api/v1`;
  static ROOT_URL_CARE_QUERY = `${AppConstant.ROOT_URL}-care/api/query/v1`;

  static ROOT_URL_PROPERTY_DOMAIN = `${AppConstant.ROOT_URL}-property/api/domain/v1`;
  static ROOT_URL_PROPERTY_QUERY = `${AppConstant.ROOT_URL}-property/api/query/v1`;

  static ROOT_URL_COMMUNICATION_DOMAIN = `${AppConstant.ROOT_URL}-communication/api/domain/v1`;
  static ROOT_URL_COMMUNICATION_QUERY = `${AppConstant.ROOT_URL}-communication/api/query/v1`;
  static ROOT_URL_COMMUNICATION = `${AppConstant.ROOT_URL}-communication/api/v1`;

  static ROOT_URL_ELEARNING = `${AppConstant.ROOT_URL}-elearning/api/v1`;
}
