import { StsApiClient } from '@/api/sts.api';

/**
 * Đếm những trạng thái của khai thác lead
 * @returns
 */
export const getMasterData = async (): Promise<any> => {
  const res = await StsApiClient.getMasterData();
  return res;
};
