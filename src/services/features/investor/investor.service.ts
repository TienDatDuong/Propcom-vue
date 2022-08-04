import { ApiRequestPaging } from '@/models/api-request';
import { ApiResponse, ApiResponsePaging } from '@/models/api-response';
import { InvestorModel } from './investor.model';
import { PropertyApiClient } from '@/api/property.api';

/**
 * Lấy danh sách kênh gian hàng đề xuất không cần login TK
 * @returns
 */
export const findInvestorSuggest = async (params: ApiRequestPaging):
  Promise<ApiResponsePaging<InvestorModel> | null> => {
  const res = await PropertyApiClient.findInvestorSuggest(params);
  if (!res || !res.data) {
    return null;
  }
  const rows = res.data.rows.map((item: any) => new InvestorModel(item));
  return new ApiResponsePaging<InvestorModel>({
    rows: rows,
    page: res.data.page,
    pageSize: res.data.pageSize,
    total: res.data.total,
    totalPages: res.data.totalPages,
  });
};

/**
* Lấy chi tiết kênh gian hàng cần login
* @returns
*/
export const findInvestorById = async (id: string):
  Promise<ApiResponse<InvestorModel | null>> => {
  const res = await PropertyApiClient.findInvestorById(id);
  if (!res || !res.data) {
    return new ApiResponse({
      isSuccess: false,
      result: null
    });
  }
  return new ApiResponse({
    isSuccess: true,
    result: new InvestorModel(res.data)
  });
};
