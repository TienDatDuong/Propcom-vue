import { ApiResponse } from '@/models/api-response';

import { EmployeeModel, EmployeeStatusEnum } from './employee.model';
import { EmployeeApiClient } from '@/api/employee.api';
import { UploaderApiClient } from '@/api/uploader.api';
import { StsApiClient } from '@/api/sts.api';

/**
 * Lấy thông tin user hiện tại
 * @returns
 */
export const findCurrentEmployee = async (): Promise<EmployeeModel> => {
  const res = await EmployeeApiClient.findCurrentEmployee();
  return new EmployeeModel(res.data);
};

/**
 * Cập nhật thông tin user hiện tại
 * @param params
 * @returns
 */
export const updateCurrentEmployee = async (params: any): Promise<ApiResponse<any>> => {
  const res = await EmployeeApiClient.saveCurrentEmployee(params);
  return new ApiResponse({
    isSuccess: true,
    result: res.data
  });
};

/**
 * Tạo User
 * @param params
 * @returns
 */
export const registerAccount = async (model: {
  referralCode: string;
  name: string;
  phone: string;
  email: string;
  password: string;
}): Promise<ApiResponse<any>> => {
  const res = await StsApiClient.register(model);
  return new ApiResponse(res.data);
};

/**
 * Xử lý file ảnh + upload user avatar
 * @param id
 * @param file
 * @returns
 */
export const updateEmployeeAvatar = async (id: string, file: File): Promise<ApiResponse<any>> => {
  const res = await UploaderApiClient.uploadUserAvatar(id, file);
  return new ApiResponse({
    isSuccess: true,
    result: res.data
  });
};

/**
 * Đổi mật khẩu
 * @param model
 */
export const changePassword = async (model: { oldPassword: string; password: string }) => {
  const res = await StsApiClient.changePassword(model.oldPassword, model.password);
  return new ApiResponse({
    isSuccess: true,
    result: res.data
  });
};

/**
 * Quên mật khẩu
 * @param model
 * @returns
 */
export const getForgotPasswordTokenFromUsername = async (model: { username: any }) => {
  const res = await StsApiClient.forgotPassword(model.username);
  return new ApiResponse({
    isSuccess: true,
    result: res.data
  });
};

/**
 * Reset mật khẩu
 * @param model
 * @returns
 */
export const resetPassword = async (model: { token: string; otp: string; password: string }) => {
  const res = await StsApiClient.resetPassword(model.token, model.otp, model.password);
  return new ApiResponse(res.data);
};

/**
 * Xác nhận OTP
 * @param model
 * @returns
 */
export const verifyCodeOTP = async (headerToken: string, otpNumber: string) => {
  const res = await StsApiClient.verifyCodeOTP(headerToken, otpNumber);
  return new ApiResponse(res.data);
};

/**
 * Tạo mới OTP
 * @param model
 * @returns
 */
export const createOTP = async (model: {
  phone: string;
  isChangePhone: boolean;
  userId: string;
  linkAccount: boolean;
}) => {
  const res = await StsApiClient.createOTP(model);
  return new ApiResponse(res.data);
};

/**
 * Xác nhận OTP reset password
 * @param model
 * @returns
 */
export const verifyCodeOTPToResetPwd = async (headerToken: string, otpNumber: string) => {
  const res = await StsApiClient.verifyCodeOTPToResetPwd(headerToken, otpNumber);
  return new ApiResponse(res.data);
};

/**
 * Lấy text theo EmployeeStatusEnum enum
 * @param date
 * @returns
 */
export const getStatus = (status?: EmployeeStatusEnum) => {
  if (!status) {
    return '';
  }
  switch (status) {
    case EmployeeStatusEnum.INIT:
      return 'Chưa xác thực';
    case EmployeeStatusEnum.WAITING:
      return 'Chờ xác thực';
    case EmployeeStatusEnum.REJECTED:
      return 'Bị từ chối';
    case EmployeeStatusEnum.IDENTIFIED:
      return 'Đã xác thực';
    case EmployeeStatusEnum.SIGNED_CONTRACT:
      return 'Đã ký hợp đồng';
    default:
      return '';
  }
};

/**
 * Quên mật khẩu, khôi phục pwd từ sđt
 * @param model
 * @returns
 */
export const getForgotPasswordTokenFromPhone = async (model: { username: any }) => {
  const res = await StsApiClient.getForgotPasswordTokenFromPhone(model.username);
  return new ApiResponse(res.data);
};

/**
 * Upload avatar user
 * @param model
 * @returns
 */
export const uploadAvatar = async (userId: string, file: any) => {
  const res = await UploaderApiClient.uploadUserAvatar(userId, file);
  return new ApiResponse({
    isSuccess: true,
    result: res.data
  });
};

/**
 * Lấy thông tin user theo slugId
 * @param model
 * @returns
 */
export const findEmployeeBySlugId = async (slugId: string): Promise<EmployeeModel> => {
  const res = await EmployeeApiClient.findEmployeeBySlugId(slugId);
  return new EmployeeModel(res.data);
};