import { AppConstant } from '@/app.constant';
import Axios, { AxiosResponse } from 'axios';

export class StsApiClient {
  static login = async (username: string, password: string) => {
    const request = {
      username,
      password: Buffer.from(password).toString('base64'),
      isEncodePassword: true,
    };
    return await Axios.post(`${AppConstant.ROOT_URL_STS_DOMAIN}/auth/login`, request);
  };

  static changePassword = async (oldPassword: string, password: string) => {
    const request = {
      oldPassword: Buffer.from(oldPassword).toString('base64'),
      password: Buffer.from(password).toString('base64'),
      isEncodePassword: true,
    };
    return await Axios.put(`${AppConstant.ROOT_URL_STS_DOMAIN}/user/changePwd`, request);
  };

  static forgotPassword = async (username: string) => {
    const request = {
      username,
    };
    return await Axios.post(`${AppConstant.ROOT_URL_STS_DOMAIN}/user/forgotPwdMobile/care`, request);
  };

  static resetPassword = async (token: string, otp: string, password: string) => {
    const request = {
      password: Buffer.from(password).toString('base64'),
      isEncodePassword: true,
      token,
      otp,
    };
    return await Axios.post(`${AppConstant.ROOT_URL_STS_DOMAIN}/user/updatePwd`, request);
  };

  static register = async (request: any) => {
    const requestBody = Object.assign(request, {
      password: Buffer.from(request.password).toString('base64'),
      isEncodePassword: true,
    });
    return await Axios.post(`${AppConstant.ROOT_URL_STS_DOMAIN}/auth/signupAuth`, requestBody);
  };

  static verifyCodeOTP = async (headerToken: string, otpNumber: string) => {
    const body = {
      otp: otpNumber,
    };
    const options = {
      headers: {
        token: headerToken,
      },
    };
    return await Axios.post(`${AppConstant.ROOT_URL_STS_DOMAIN}/user/verifyCodeAuth`, body, options);
  };

  static verifyCodeOTPToResetPwd = async (headerToken: string, otpNumber: string) => {
    const body = {
      otp: otpNumber,
    };
    const options = {
      headers: {
        token: headerToken,
      },
    };
    return await Axios.post(`${AppConstant.ROOT_URL_STS_DOMAIN}/user/verifyCode`, body, options);
  };

  static createOTP = async (body: any) => {
    return await Axios.post(`${AppConstant.ROOT_URL_STS_DOMAIN}/user-pub/createOtp`, body);
  };

  static findUserDetail = async (userId: string) => {
    return await Axios.get(`${AppConstant.ROOT_URL_STS_QUERY}/auth/user/${userId}`);
  };

  static findUser = async (userId: string) => {
    return await Axios.get(`${AppConstant.ROOT_URL_STS_QUERY}/user/${userId}`);
  };

  static getForgotPasswordTokenFromPhone = async (username: string) => {
    const request = {
      username,
    };
    return await Axios.post(`${AppConstant.ROOT_URL_STS_DOMAIN}/user/forgotPwdMobile`, request);
  };

  static getMasterData = async () => {
    return await Axios.get(`${AppConstant.ROOT_URL_STS_QUERY}/master`);
  };
}
