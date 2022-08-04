import { ApiRequestPaging } from '@/models/api-request';
import { ApiResponsePaging } from '@/models/api-response';
import {
  ProjectModel,
  ProjectParticipatedModel,
  ProjectStatusEnum,
  ProjectTransactionTypeEnum,
  ProjectTypeEnum,
} from './property.model';
import { PropertyApiClient } from '@/api/property.api';

/**
 * Lấy danh sách dự án tham gia theo user
 * @returns
 */
export const findProjectParticipated = async (params: any) => {
  const res = await PropertyApiClient.findProjectParticipated(params);
  if (!res || !res.data) {
    return null;
  }
  const rows = res.data.rows.map((item: any) => new ProjectParticipatedModel(item));
  return rows;
};

export const findListProjectByInvestor = async (investorId: string, params: any) => {
  const res = await PropertyApiClient.findListProjectByInvestor(investorId, params);
  if (!res || !res.data) {
    return null;
  }
  res.data.rows = res.data.rows.map((item: any) => new ProjectModel(item));
  return res.data;
};
export const findListProject = async (params: any) => {
  const res = await PropertyApiClient.findListProject(params);
  if (!res || !res.data) {
    return null;
  }
  res.data.rows = res.data.rows.map((item: any) => new ProjectModel(item));
  return res.data;
};

export const findListProjectByInvestorForEmployee = async (investorId: string, params: any) => {
  const res = await PropertyApiClient.findListProjectByInvestorForEmployee(investorId, params);
  if (!res || !res.data) {
    return null;
  }
  res.data.rows = res.data.rows.map((item: any) => new ProjectModel(item));
  return res.data;
};

/**
 * Thông tin chi tiết dự án
 * @returns
 */
export const findProjectById = async (id: string): Promise<any> => {
  const res = await PropertyApiClient.findProjectById(id);
  return res.data;
};

export const getProjectType = (type: ProjectTypeEnum) => {
  let text = '';
  switch (type) {
    case ProjectTypeEnum.CAN_HO:
      text = 'Căn hộ';
      break;
    case ProjectTypeEnum.DAT_NEN:
      text = 'Đất nền';
      break;
    case ProjectTypeEnum.RESORT:
      text = 'Khu nghỉ dưỡng/Phức hợp';
      break;
    case ProjectTypeEnum.BIET_THU:
      text = 'Biệt thự';
      break;
    case ProjectTypeEnum.SHOPHOUSE:
      text = 'Shophouse';
      break;
    case ProjectTypeEnum.MALL:
      text = 'Khu đô thị thương mại giải trí';
      break;
    default:
      break;
  }
  return text;
};

export const getProjectStatus = (status: ProjectStatusEnum) => {
  let text = '';
  switch (status) {
    case ProjectStatusEnum.COMING_SALE:
      text = 'Sắp mở bán';
      break;
    case ProjectStatusEnum.ON_SALE:
      text = 'Đang mở bán';
      break;
    case ProjectStatusEnum.HANDED_OVER:
      text = 'Đã bàn giao';
      break;
    case ProjectStatusEnum.INFORMATION:
      text = 'Thông tin tham khảo';
      break;
    case ProjectStatusEnum.TRADING:
      text = 'Đang giao dịch';
      break;
    default:
      break;
  }
  return text;
};

export const getProjectTransactionType = (type: ProjectTransactionTypeEnum) => {
  let text = '';
  switch (type) {
    case ProjectTransactionTypeEnum.SALE:
      text = 'Bán';
      break;
    case ProjectTransactionTypeEnum.LEASE:
      text = 'Cho thuê';
      break;
    default:
      break;
  }
  return text;
};
