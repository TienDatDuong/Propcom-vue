import { parseEmail } from './../../shared/utils';
import { CallHistoryModel } from './communication.model';
import { ApiResponsePaging } from './../../../models/api-response';
import { CommunicationApiClient } from './../../../api/communication.api';

/**
 * Danh sách lịch sử cuộc gọi
 * @returns
 */
export const getHistoryCall = async (params: any): Promise<any> => {
  const res = await CommunicationApiClient.findAll(params);
  if (!res || !res.data) {
    return null;
  }
  const data = res.data.rows.map((item: any) => new CallHistoryModel(item));
  const rows = data.map((item: any, index: number) => {
    const event = new CallHistoryModel(item);
    event.stt = index + 1 + (params ? params.pageSize * (params.page - 1) : 0);
    return event;
  });
  return new ApiResponsePaging<CallHistoryModel>({
    rows: rows,
    total: res.data.total,
    totalPages: res.data.totalPages,
    page: res.data.page,
    pageSize: res.data.pageSize,
  });
};

/**
 * Lấy token thường
 * @returns
 */
export const getToken = async (user: any): Promise<any> => {
  const headersClient = {
    client_id: process.env.VUE_APP_STRINGEE_CLIENT_ID,
    client_secret: process.env.VUE_APP_STRINGEE_CLIENT_SECRET,
  };
  const stringeeToken = localStorage.getItem('stringee_token');
  const expStringeeToken = localStorage.getItem('stringee_token_exp');
  const now = Math.floor(Date.now() / 1000) - 60;
  const exp = now + 3600;
  const params = {
    email: user.email,
    name: user.name,
    phone: user.phone,
  };
  if (stringeeToken && expStringeeToken && now <= +expStringeeToken && localStorage.getItem('stringee_id')) {
    return stringeeToken;
  }
  if (!user.id) {
    return null;
  }
  const res: any = await CommunicationApiClient.getToken(params, headersClient);
  if (res) {
    localStorage.setItem('user_email', user.email);
    localStorage.setItem('user_name', user.name);
    localStorage.setItem('user_phone', user.phone);
    localStorage.setItem('stringee_token', res.data.callToken);
    localStorage.setItem('stringee_token_exp', exp + '');
    localStorage.setItem('stringee_id', parseEmail(localStorage.getItem('user_email') + ''));
    return res.data.callToken;
  }
  return null;
};

/**
 * Lấy token thường
 * @returns
 */
export const routeCall = async (params: any): Promise<any> => {
  const { fromUserId, toNumber, isPhoneId, isMobileCarrier, mobileCarriers, numberMobileMethodCarriers } = params;
  const headersClient = {
    client_id: process.env.VUE_APP_STRINGEE_CLIENT_ID,
    client_secret: process.env.VUE_APP_STRINGEE_CLIENT_SECRET,
  };
  const body = {
    allowCallOut: true,
    fromUserId,
    toNumber,
    isPhoneId,
    isMobileCarrier,
    mobileCarriers,
    numberMobileMethodCarriers,
  };
  const res: any = await CommunicationApiClient.routeCall(body, headersClient);
  return res;
};
/**
 * Lấy token thường
 * @returns
 */
export const saveHistory = async (body: any): Promise<any> => {
  const res: any = await CommunicationApiClient.saveHistory(body);
  return res;
};
