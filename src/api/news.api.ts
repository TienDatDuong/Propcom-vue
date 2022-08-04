import { AppConstant } from '@/app.constant';
import { ApiRequestPaging } from '@/models/api-request';
import Axios, { AxiosResponse } from 'axios';

export class NewsApiClient {

  static findAll = async (params: ApiRequestPaging) => {
    return await Axios.get(`${AppConstant.ROOT_URL_NEWS_QUERY}/mobile-public/news`, { params });
  };

  static findOne = async (id: string) => {
    return await Axios.get(`${AppConstant.ROOT_URL_NEWS_QUERY}/mobile-public/news/${id}`);
  };

  static getSlug = async (id: string) => {
    return await Axios.get(`${AppConstant.ROOT_URL_NEWS_QUERY}/pub/news/slug/${id}`);
  };
}