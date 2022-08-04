import { AppConstant } from '@/app.constant';
import Axios, { AxiosResponse } from 'axios';

export class EmployeeApiClient {
  static findCurrentEmployee = async () => {
    return await Axios.get(`${AppConstant.ROOT_URL_EMPLOYEE_QUERY}/auth/employee/current`);
  };

  static saveCurrentEmployee = async (model: any) => {
    return await Axios.put(`${AppConstant.ROOT_URL_EMPLOYEE_QUERY}/auth/employee/current`, model);
  };

  static findEmployeeById = async (id: string) => {
    return await Axios.get(`${AppConstant.ROOT_URL_EMPLOYEE_QUERY}/public/employee/${id}`);
  };

  static findEmployeeBySlugId = async (slugId: string) => {
    return await Axios.get(`${AppConstant.ROOT_URL_EMPLOYEE_QUERY}/public/employee/slug/${slugId}`);
  }
}