<template>
  <div class="forgot-password-otp-component">
    <Form
      validate-on-submit
      :validation-schema="formOTPValidation"
      :initial-values="formOTPData"
      @submit="onVerifyOTP"
      class="forgot-password-otp-component__form"
    >
      <div class="forgot-password-otp-component__form__header">
        <span class="forgot-password-otp-component__form__header__title">Xác thực tài khoản</span>
        <span class="forgot-password-otp-component__form__header__sub-title"
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
      <div v-if="data.otpTimer" class="forgot-password-otp-component__text-alert otp_text-alert">
        <span>Mã OTP sẽ hết hiệu lực trong </span>
        <span class="text-color-primary">{{ data.otpTimer }}s</span>
      </div>
      <div v-else class="forgot-password-otp-component__text-alert otp_text-alert">
        <span>Mã OTP đã hết hiệu lực</span>
        <a @click="onResendOTP">gửi lại</a>
      </div>
      <button v-loading="data.isLoading" class="app-btn app-btn-primary app-btn-large" type="submit">
        Xác nhận
      </button>
      <div class="forgot-password-otp-component__text">
        <span>Chưa nhận được mã?</span>
        <a @click="onResendOTP">Gửi lại</a>
      </div>
    </Form>
  </div>
</template>

<style lang="scss" scoped>
.forgot-password-otp-component {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
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
  & .text-color-primary {
    color: $colorPrimary;
    margin-left: 2px;
  }
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
      & > span {
        font-style: italic;
        color: #a7a7a7;
        font-size: 12px;
        line-height: 135%;
      }
    }
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
}
</style>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue';
import { useInit } from '@/services/shared/utils';
import { markPhone } from '@/services/shared/utils';
import { Form, Field } from 'vee-validate'; // https://vee-validate.logaretm.com/v4/guide/composition-api/validation
import * as yup from 'yup';

// Định nghĩa data type của component [data] bằng Typescript
class ForgotPasswordOtpComponentData {
  isLoading: boolean;
  phoneOTP: string;
  otpTimer: number;
  token: string;
}

export default defineComponent({
  name: 'ForgotPasswordOtpComponent',
  components: {
    Form,
    Field
  },
  props: {
    phoneNumber: {
      type: String,
      default: ''
    }
  },
  emits: ['onSubmitData'],
  setup(props: any, { emit }: any) {
    // Setup Default
    const { base } = useInit();
    let timeInterval: any = null;
    // Component reactive data
    const data = reactive<ForgotPasswordOtpComponentData>({
      isLoading: false,
      phoneOTP: props.phoneNumber,
      otpTimer: 119,
      token: ''
    });
    // Setup Form
    const formData = {
      otp: ''
    };
    const formValidation = yup.object().shape({
      otp: yup
        .string()
        .label('OTP')
        .required('Vui lòng nhập mã OTP!')
        .min(6, 'Mã OTP tối thiểu 6 ký tự!')
    });
    // Function
    const timerToogle = () => {
      timeInterval = setInterval(() => {
        if (data.otpTimer === 0) {
          clearInterval(timeInterval);
        } else {
          data.otpTimer -= 1;
        }
      }, 1000);
    };
    const onVerifyOTP = (values: any) => {
      emit('onSubmitData', values);
    };
    const onResendOTP = async () => {
      emit('onResendOTP', { username: data.phoneOTP });
      clearInterval(timeInterval);
      data.otpTimer = 119;
      timerToogle();
    };
    onMounted(async () => {
      timerToogle();
    });
    return {
      // Data
      data,
      // Form
      formValidation,
      formData,
      // Function
      markPhone,
      onVerifyOTP,
      onResendOTP
    };
  }
});
</script>
