<template>
  <div class="forgot-pwd-page" v-loading="data.isLoading">
    <template v-if="data.isShowForgotPasswordComponent">
      <ForgotPasswordComponent @onSubmitData="onResetPwd" />
    </template>
    <template v-else-if="data.isShowForgotPasswordOtpComponent">
      <ForgotPasswordOtpComponent :phoneNumber="data.phoneOTP" @onSubmitData="onVerifyOTP" @onResendOTP="onResetPwd" />
    </template>
    <template v-else>
      <ResetPasswordComponent @onSubmitData="onSubmitPassword" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.forgot-pwd-page {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
</style>

<script lang="ts">
import { reactive } from 'vue';
import { useInit } from '@/services/shared/utils';
import ResetPasswordComponent from '@/components/features/forgot-password/ResetPasswordComponent.vue';
import ForgotPasswordComponent from '@/components/features/forgot-password/ForgotPasswordComponent.vue';
import ForgotPasswordOtpComponent from '@/components/features/forgot-password/ForgotPasswordOtpComponent.vue';
import { getForgotPasswordTokenFromPhone } from '@/services/features/employee/employee.service';
import { verifyCodeOTPToResetPwd } from '@/services/features/employee/employee.service';
import { resetPassword } from '@/services/features/employee/employee.service';

export default {
  name: 'RegisterPage',
  components: {
    ResetPasswordComponent,
    ForgotPasswordComponent,
    ForgotPasswordOtpComponent,
  },
  setup() {
    // Setup Default
    const { base } = useInit();
    const data = reactive({
      isLoading: false,
      isShowForgotPasswordComponent: true,
      isShowForgotPasswordOtpComponent: false,
      isShowResetPasswordComponent: false,
      token: '',
      phoneOTP: '',
      otpNumber: '',
      timeCountDown: 119,
    });
    //  Function
    const goToLoginPage = () => {
      base.router.push({ name: 'login' });
    };
    const onResetPwd = async (values: any) => {
      data.isLoading = true;
      try {
        const response: any = await getForgotPasswordTokenFromPhone(values);
        if (response.success) {
          data.token = response.token;
          data.phoneOTP = values.username;
          // Navigate
          data.isShowForgotPasswordComponent = false;
          data.isShowForgotPasswordOtpComponent = true;
        }
      } finally {
        data.isLoading = false;
      }
    };
    const onSubmitPassword = async (values: any) => {
      data.isLoading = true;
      const model = {
        password: values.password,
        otp: data.otpNumber,
        token: data.token,
      };
      try {
        const response: any = await resetPassword(model);
        if (response.success) {
          base.toast.success('Mật khẩu được thay đổi');
          // Navigate
          goToLoginPage();
        }
      } finally {
        data.isLoading = false;
      }
    };
    const onVerifyOTP = async (values: any) => {
      data.isLoading = true;
      data.otpNumber = values.otp;
      try {
        const response: any = await verifyCodeOTPToResetPwd(data.token, values.otp);
        if (response.success) {
          // Navigate
          data.isShowForgotPasswordComponent = false;
          data.isShowForgotPasswordOtpComponent = false;
          data.isShowResetPasswordComponent = true;
        } else {
          base.toast.error(response.msg);
        }
      } finally {
        data.isLoading = false;
      }
    };
    return {
      // Component reactive data
      data,
      // Function
      onResetPwd,
      onVerifyOTP,
      onSubmitPassword,
      goToLoginPage,
    };
  },
};
</script>
