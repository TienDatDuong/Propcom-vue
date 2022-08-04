import { AppConstant } from '@/app.constant';
import { ApiRequestPaging } from '@/models/api-request';
import Axios, { AxiosResponse } from 'axios';

export class PropertyApiClient {
  static findProjectParticipated = async (params: ApiRequestPaging) => {
    return await Axios.get(`${AppConstant.ROOT_URL_PROPERTY_QUERY}/mobile/project/paticipated`, { params });
  };

  static findInvestorSuggest = async (params: ApiRequestPaging) => {
    return await Axios.get(`${AppConstant.ROOT_URL_PROPERTY_QUERY}/public/investor`, { params });
  };

  static findInvestorById = async (id: string) => {
    return await Axios.get(`${AppConstant.ROOT_URL_PROPERTY_QUERY}/public/investor/${id}`);
  };

  static findListProject = async (params: ApiRequestPaging) => {
    return await Axios.get(`${AppConstant.ROOT_URL_PROPERTY_QUERY}/public/project/`, { params });
  };

  static findProjectById = async (id: string) => {
    return await Axios.get(`${AppConstant.ROOT_URL_PROPERTY_QUERY}/mobile-public/project/${id}`);
  };

  static findListProjectByInvestor = async (investorId: string, params: ApiRequestPaging) => {
    return await Axios.get(`${AppConstant.ROOT_URL_PROPERTY_QUERY}/public/project/investor/${investorId}`, { params });
  };

  static findListProjectByInvestorForEmployee = async (investorId: string, params: ApiRequestPaging) => {
    return await Axios.get(`${AppConstant.ROOT_URL_PROPERTY_QUERY}/auth/project/investor/${investorId}`, { params });
  };
}
