import { ApiRequestPaging } from './../models/api-request';
import { AppConstant } from '@/app.constant';
import Axios from 'axios';

export class CommunicationApiClient {
  static findAll = async (params: ApiRequestPaging) => {
    return await Axios.get(`${AppConstant.ROOT_URL_COMMUNICATION}/public/communication/callLog`, { params });
  };
  static getToken = async (params: any, headers: any) => {
    Axios.defaults.headers['client_id'] = headers.client_id;
    Axios.defaults.headers['client_secret'] = headers.client_secret;
    return await Axios.get(`${AppConstant.ROOT_URL_COMMUNICATION}/auth/communication/callToken`, { params });
  };
  static getTokenLead = async (params: any, headers: any) => {
    Axios.defaults.headers['client_id'] = headers.client_id;
    Axios.defaults.headers['client_secret'] = headers.client_secret;
    return await Axios.get(`${AppConstant.ROOT_URL_COMMUNICATION}/auth/communication/callTokenLead`, { params });
  };
  static routeCall = async (body: any, headers: any) => {
    Axios.defaults.headers['client_id'] = headers.client_id;
    Axios.defaults.headers['client_secret'] = headers.client_secret;
    return await Axios.post(`${AppConstant.ROOT_URL_COMMUNICATION}/auth/communication/routeCall`, body, { headers });
  };
  static saveHistory = async (body: any) => {
    return await Axios.post(`${AppConstant.ROOT_URL_COMMUNICATION}/public/communication/save-history`, body);
  };
}
