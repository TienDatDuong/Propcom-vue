import { LeadApiClient } from '@/api/lead.api';
import { ApiResponse, ApiResponsePaging } from '@/models/api-response';
import { LeadModel } from './lead.model';

/**
 * Đếm những trạng thái của khai thác lead
 * @returns
 */
export const findLeadCount = async (): Promise<any> => {
  const res = await LeadApiClient.findLeadCount();
  return res;
};

/**
 * Thông tin chi tiết lead
 * @returns
 */
export const findLeadById = async (id: string): Promise<any> => {
  const res = await LeadApiClient.findLeadById(id);
  return new ApiResponse({
    isSuccess: true,
    result: res.data,
  });
};

/**
 * Danh sách chi tiết trạng thái khai thác
 * @returns
 */
export const findLeadAssign = async (params: any): Promise<any> => {
  const res = await LeadApiClient.findLeadAssign(params);
  if (!res || !res.data) {
    return null;
  }
  const rows = res.data.rows.map((item: any) => new LeadModel(item));
  return new ApiResponsePaging<LeadModel>({
    rows: rows,
    total: res.data.total,
    totalPages: res.data.totalPages,
  });
};

/**
 * Cập nhật khai thác lead
 * @returns
 */
export const updateInfo = async (model: any): Promise<any> => {
  const res = await LeadApiClient.updateInfoLead(model);
  return new ApiResponse({
    isSuccess: true,
    result: res.data,
  });
};
/**
 * Cập nhật trạng thái khai thác lead
 * @returns
 */
export const updateExploitStatus = async (model: any): Promise<any> => {
  return await LeadApiClient.updateExploitStatusLead(model);
};
/**
 * Cập nhật trạng thái khai thác lead
 * @returns
 */
export const importReasonLeadFromExcel = async (files: any): Promise<any> => {
  return await LeadApiClient.importReasonLeadFromExcel(files);
};
