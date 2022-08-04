import { AppConstant } from '@/app.constant';
import { ApiRequestPaging } from '@/models/api-request';
import Axios, { AxiosResponse } from 'axios';

export class LeadApiClient {
  static findLeadCount = async () => {
    return await Axios.get(`${AppConstant.ROOT_URL_LEAD_QUERY}/lead/lead-count`);
  };

  static findLeadAssign = async (params: ApiRequestPaging) => {
    return await Axios.get(`${AppConstant.ROOT_URL_LEAD_QUERY}/lead/lead-assigned`, { params });
  };

  static updateInfoLead = async (model: any) => {
    return await Axios.put(`${AppConstant.ROOT_URL_LEAD_DOMAIN}/lead/update-info`, model);
  };
  static updateExploitStatusLead = async (model: any) => {
    return await Axios.put(`${AppConstant.ROOT_URL_LEAD_DOMAIN}/lead/exploit-status`, model);
  };

  static updateExploitStatus = async (model: any) => {
    return await Axios.put(`${AppConstant.ROOT_URL_LEAD_DOMAIN}/lead/exploit-status`, model);
  };

  static findLeadById = async (id: string) => {
    return await Axios.get(`${AppConstant.ROOT_URL_LEAD_QUERY}/lead/${id}`);
  };

  static importReasonLeadFromExcel = async (files: any) => {
    return await Axios.post(`${AppConstant.ROOT_URL_LEAD_DOMAIN}/lead/import-reason-from-excel`, files);
  };
}
