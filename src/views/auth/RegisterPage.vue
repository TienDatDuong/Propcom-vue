<template>
  <div class="register-page">
    <template v-if="!data.isVerifyOTP">
      <Form
        validate-on-submit
        :validation-schema="formValidation"
        :initial-values="formData"
        @submit="onRegister"
        class="register-page__form"
      >
        <div class="register-page__form__header">
          <span class="register-page__form__header__title">Đăng ký</span>
          <span class="register-page__form__header__sub-title">Chào mừng bạn đến với cộng đồng Propcom</span>
        </div>
        <Field name="referralCode" v-slot="{ field, handleChange, handleBlur }">
          <div class="app-input">
            <label for="grid-password" class="app-input__form__label">Mã giới thiệu (Nếu có)</label>
            <el-input
              :modelValue="field.value"
              @input="handleChange"
              @blur="handleBlur"
              size="small"
              placeholder="Nhập mã giới thiệu"
              class="input-form"
            >
              <template #append>
                <div class="underline"></div>
              </template>
            </el-input>
          </div>
        </Field>
        <Field name="name" v-slot="{ field, handleChange, handleBlur, errorMessage }">
          <div class="app-input">
            <label for="grid-password" class="app-input__form__label"
              >Họ và tên<span class="app-input__form__label-required">*</span></label
            >
            <el-input
              :modelValue="field.value"
              @input="handleChange"
              @blur="handleBlur"
              size="small"
              placeholder="Nhập họ và tên"
              class="input-form"
            >
              <template #append>
                <div class="underline" v-bind:class="{ invalid: errorMessage }"></div>
              </template>
            </el-input>
            <div v-if="errorMessage" class="input-error">
              <img src="@/assets/icons/colorful/icon_error.svg" alt="form-error" />
              <span class="form-error">{{ errorMessage }}</span>
            </div>
          </div>
        </Field>
        <Field name="phone" v-slot="{ field, handleChange, handleBlur, errorMessage }">
          <div class="app-input">
            <label for="grid-password" class="app-input__form__label"
              >Số điện thoại<span class="app-input__form__label-required">*</span></label
            >
            <el-input
              :modelValue="field.value"
              @input="handleChange"
              @blur="handleBlur"
              size="small"
              placeholder="Nhập số điện thoại"
              class="input-form"
            >
              <template #append>
                <div class="underline" v-bind:class="{ invalid: errorMessage }"></div>
              </template>
            </el-input>
            <div v-if="errorMessage" class="input-error">
              <img src="@/assets/icons/colorful/icon_error.svg" alt="form-error" />
              <span class="form-error">{{ errorMessage }}</span>
            </div>
          </div>
        </Field>
        <Field name="email" v-slot="{ field, handleChange, handleBlur, errorMessage }">
          <div class="app-input">
            <label for="grid-password" class="app-input__form__label"
              >Địa chỉ Email<span class="app-input__form__label-required">*</span></label
            >
            <el-input
              :modelValue="field.value"
              @input="handleChange"
              @blur="handleBlur"
              size="small"
              placeholder="Nhập email"
              class="input-form"
            >
              <template #append>
                <div class="underline" v-bind:class="{ invalid: errorMessage }"></div>
              </template>
            </el-input>
            <div v-if="errorMessage" class="input-error">
              <img src="@/assets/icons/colorful/icon_error.svg" alt="form-error" />
              <span class="form-error">{{ errorMessage }}</span>
            </div>
          </div>
        </Field>
        <Field name="password" v-slot="{ field, handleChange, handleBlur, errorMessage }">
          <div class="app-input">
            <label for="grid-password" class="app-input__form__label"
              >Mật khẩu<span class="app-input__form__label-required">*</span></label
            >
            <el-input
              :modelValue="field.value"
              @input="handleChange"
              @blur="handleBlur"
              type="password"
              size="small"
              placeholder="Nhập mật khẩu"
              show-password
              class="input-form"
            >
              <template #append>
                <div class="underline" v-bind:class="{ invalid: errorMessage }"></div>
              </template>
            </el-input>
            <div v-if="errorMessage" class="input-error">
              <img src="@/assets/icons/colorful/icon_error.svg" alt="form-error" />
              <span class="form-error">{{ errorMessage }}</span>
            </div>
          </div>
        </Field>
        <div class="register-page__text-alert">
          <span>*Bấm vào nút “Đăng ký tài khoản" là bạn đã đồng ý với điều khoản của chúng tôi</span>
        </div>
        <button v-loading="data.isLoading" class="app-btn app-btn-primary app-btn-large" type="submit">
          Đăng ký tài khoản
        </button>
        <div class="register-page__text">
          <span>Đã có tài khoản?</span>
          <a @click="goToLoginPage">Đăng nhập</a>
        </div>
      </Form>
    </template>
    <template v-else>
      <Form
        validate-on-submit
        :validation-schema="formOTPValidation"
        :initial-values="formOTPData"
        @submit="onVerifyOTP"
        class="register-page__form"
      >
        <div class="register-page__form__header">
          <span class="register-page__form__header__title">Xác thực tài khoản</span>
          <span class="register-page__form__header__sub-title"
            >Vui lòng nhập mã xác thực OTP dược gửi về số điện thoại <span>{{ markPhone(data.phoneOTP) }}</span></span
          >
        </div>
        <Field name="otp" v-slot="{ field, handleChange, handleBlur, errorMessage }">
          <div class="app-input">
            <label for="grid-password" class="app-input__form__label"
              >Mã OTP<span class="app-input__form__label-required">*</span></label
            >
            <el-input
              :modelValue="field.value"
              @input="handleChange"
              @blur="handleBlur"
              size="small"
              placeholder="Nhập mã OTP"
              class="input-form"
            >
              <template #append>
                <div class="underline" v-bind:class="{ invalid: errorMessage }"></div>
              </template>
            </el-input>
            <div v-if="errorMessage" class="input-error">
              <img src="@/assets/icons/colorful/icon_error.svg" alt="form-error" />
              <span class="form-error">{{ errorMessage }}</span>
            </div>
          </div>
        </Field>
        <div v-if="data.timeCountDown" class="register-page__text-alert otp_text-alert">
          <span>Mã OTP sẽ hết hiệu lực trong </span>
          <span class="text-color-primary">{{ data.timeCountDown }}s</span>
        </div>
        <div v-else class="register-page__text-alert otp_text-alert">
          <span>Mã OTP đã hết hiệu lực</span>
          <a @click="onCreateOTP">gửi lại</a>
        </div>
        <button v-loading="data.isLoading" class="app-btn app-btn-primary app-btn-large" type="submit">Xác nhận</button>
        <div class="register-page__text">
          <span>Chưa nhận được mã?</span>
          <a @click="onCreateOTP">Gửi lại</a>
        </div>
      </Form>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.register-page {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  &__text {
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    & > a {
      font-size: 14px;
      line-height: 21px;
      letter-spacing: 0px;
      color: #ad0000;
      text-decoration: underline;
      cursor: pointer;
      &:hover {
        color: #ad0000;
        text-decoration: underline;
      }
    }
    & > span {
      font-size: 14px;
      line-height: 150%;
      color: $colorNeutral;
      margin: 0px 4px;
    }
    &-alert {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 -20px;
      margin-top: 5px;
      & > span {
        font-style: italic;
        color: #a7a7a7;
        font-size: 12px;
        line-height: 135%;
      }
    }
  }
  & .app-btn-large {
    margin-top: -14px;
  }
  & .text-color-primary {
    color: $colorPrimary;
    margin-left: 2px;
  }
  & .otp_text-alert {
    & > span {
      font-style: normal;
      font-size: 13px;
    }
    & > a {
      margin-left: 4px;
      font-size: 14px;
      line-height: 21px;
      letter-spacing: 0px;
      color: #ad0000;
      text-decoration: underline;
      cursor: pointer;
      &:hover {
        color: #ad0000;
        text-decoration: underline;
      }
    }
  }

  &__form {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    row-gap: 20px;
    margin-top: 140px;
    &__header {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      row-gap: 5px;
      margin-bottom: 15px;
      &__title {
        color: #0f0f0f;
        font-weight: 700;
        font-size: 30px;
        line-height: 35px;
        text-align: center;
      }
      &__sub-title {
        color: $colorNeutral;
        font-size: 15px;
        text-align: center;
      }
    }
  }
}
</style>

<script lang="ts">
import { reactive } from 'vue';
import { useInit } from '@/services/shared/utils';
import { markPhone } from '@/services/shared/utils';
import { Form, Field } from 'vee-validate'; // https://vee-validate.logaretm.com/v4/guide/composition-api/validation
import { ACTIONS_AUTH } from '@/store/modules/auth';
import { registerAccount } from '@/services/features/employee/employee.service';
import { verifyCodeOTP } from '@/services/features/employee/employee.service';
import { createOTP } from '@/services/features/employee/employee.service';
import * as yup from 'yup';

export default {
  name: 'RegisterPage',
  components: {
    Form,
    Field,
  },
  setup() {
    // Setup Default
    const { base } = useInit();
    const phoneRegExp = /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8,9})$/;
    const emailRegExp = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;
    const data = reactive({
      isLoading: false,
      isVerifyOTP: false,
      otpToken: '',
      userIdCreated: '',
      phoneOTP: '',
      timeCountDown: 119,
      userLogin: {
        username: '',
        password: '',
      },
    });
    // Setup Form
    const formData = {
      referralCode: '',
      name: '',
      phone: '',
      email: '',
      password: '',
    };
    let timeInterval: any = null;
    const formValidation = yup.object().shape({
      name: yup.string().label('Họ và tên').required('Vui lòng nhập họ và tên!'),
      phone: yup
        .string()
        .label('Số điện thoại')
        .min(10, 'Số điện thoại quá ngắn 0-11 số')
        .max(11, 'Số điện thoại quá dài 0-11 số')
        .matches(phoneRegExp, 'Số điện thoại không phù hợp')
        .required('Vui lòng nhập số điện thoạ!'),
      email: yup
        .string()
        .label('Email')
        .email('Email không đúng định dạng')
        .matches(emailRegExp, 'Email không đúng định dạng')
        .required('Vui lòng nhập email!'),
      password: yup
        .string()
        .label('Mật khẩu')
        .min(8, 'Mật khẩu tối thiểu 8 ký tự!')
        .required('Vui lòng nhập mật khẩu!'),
    });
    const formOTPData = {
      otp: '',
    };
    const formOTPValidation = yup.object().shape({
      otp: yup.string().label('OTP').required('Vui lòng nhập mã OTP!'),
    });
    //  Function
    const timerToogle = () => {
      timeInterval = setInterval(() => {
        if (data.timeCountDown === 0) {
          clearInterval(timeInterval);
        } else {
          data.timeCountDown -= 1;
        }
      }, 1000);
    };
    const onRegister = async (values: any) => {
      data.isLoading = true;
      try {
        const response: any = await registerAccount(values);
        if (response.success) {
          data.otpToken = response.token.access_token;
          data.userIdCreated = response.token.id;
          data.phoneOTP = response.token.phone;
          data.userLogin = {
            username: values.email,
            password: values.password,
          };
          data.isVerifyOTP = true;
          // Cowndown OTP
          timerToogle();
        }
      } finally {
        data.isLoading = false;
      }
    };
    const onVerifyOTP = async (values: any) => {
      data.isLoading = true;
      try {
        if (data.timeCountDown) {
          const response: any = await verifyCodeOTP(data.otpToken, values.otp);
          if (response.success) {
            await base.store.dispatch(`${ACTIONS_AUTH.ROOT}/${ACTIONS_AUTH.LOGIN}`, data.userLogin);
            clearInterval(timeInterval);
            base.toast.success('Đăng ký thành công.');
            base.router.push({ name: 'home' });
          } else {
            base.toast.error('Có lỗi trong quá trình xác thực OTP.');
          }
        } else {
          base.toast.error('Mã OTP hết hạn. Vui lòng tạo lại mã OTP mới');
        }
      } finally {
        data.isLoading = false;
      }
    };
    const onCreateOTP = async () => {
      data.isLoading = true;
      const body = {
        phone: data.phoneOTP,
        isChangePhone: false,
        userId: data.userIdCreated,
        linkAccount: false,
      };
      try {
        await createOTP(body);
        clearInterval(timeInterval);
        data.timeCountDown = 119;
        timerToogle();
      } finally {
        data.isLoading = false;
      }
    };
    const goToLoginPage = () => {
      base.router.push({ name: 'login' });
    };
    return {
      // Component reactive data
      data,
      // Form
      formValidation,
      formData,
      formOTPData,
      formOTPValidation,
      // Function
      onRegister,
      goToLoginPage,
      onVerifyOTP,
      onCreateOTP,
      markPhone,
    };
  },
};
</script>
