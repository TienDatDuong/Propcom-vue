import { ApiRequestPaging } from '@/models/api-request';
import { ApiResponsePaging } from '@/models/api-response';
import { NewsModel } from './news.model';
import { NewsApiClient } from '@/api/news.api';

/**
 * Lấy danh sách tin tức
 * @returns
 */
export const findAllNews = async (params: ApiRequestPaging):
  Promise<ApiResponsePaging<NewsModel> | null> => {
  const res = await NewsApiClient.findAll(params);
  if (!res || !res.data) {
    return null;
  }
  const rows = res.data.rows.map((item: any) => new NewsModel(item));
  return new ApiResponsePaging<NewsModel>({
    rows: rows,
    page: res.data.page,
    pageSize: res.data.pageSize,
    total: res.data.total,
    totalPages: res.data.totalPages,
  });
};

/**
 * Lấy chi tiết tin tức
 * @returns
 */
export const findOneNews = async (id: string):
  Promise<NewsModel | null> => {
  const res = await NewsApiClient.findOne(id);
  if (!res || !res.data) {
    return null;
  }
  return new NewsModel(res.data);
};

/**
 * Lấy chi tiết tin tức
 * @returns
 */
export const getSlug = async (id: string) => {
  const res = await NewsApiClient.getSlug(id);
  if (!res || !res.data) {
    return null;
  }
  return res.data;
};