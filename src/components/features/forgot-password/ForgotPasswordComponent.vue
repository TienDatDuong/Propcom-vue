<template>
  <div class="forgot-password-component">
    <Form
      validate-on-submit
      :validation-schema="formValidation"
      :initial-values="formData"
      @submit="onForgotPassword"
      class="forgot-password-component__form"
    >
      <div class="forgot-password-component__form__header">
        <span class="forgot-password-component__form__header__title">Quên mật khẩu</span>
        <span class="forgot-password-component__form__header__sub-title">Chào mừng bạn đến với cộng đồng Propcom</span>
      </div>
      <div class="forgot-password-component__form__text-alert">
        <span>Vui lòng nhập số điện thoại đăng ký tài khoản</span>
      </div>
      <Field name="username" v-slot="{ field, handleChange, handleBlur, errorMessage }">
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
      <button v-loading="data.isLoading" class="app-btn app-btn-primary app-btn-large" type="submit">
        Gửi yêu cầu
      </button>
    </Form>
  </div>
</template>

<style lang="scss" scoped>
.forgot-password-component {
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
    &__text {
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
  }
  & .app-btn-large {
    margin-top: 25px;
  }
}
</style>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue';
import { useInit } from '@/services/shared/utils';
import { Form, Field } from 'vee-validate'; // https://vee-validate.logaretm.com/v4/guide/composition-api/validation
import * as yup from 'yup';

export default defineComponent({
  name: 'ForgotPasswordComponent',
  components: {
    Form,
    Field
  },
  emits: ['onSubmitData'],
  setup(props: any, { emit }: any) {
    // Setup Default
    const { base } = useInit();
    const phoneRegExp = /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8,9})$/;

    // Component reactive data
    const data = reactive({
      isLoading: false
    });
    // Setup Form
    const formData = {
      username: ''
    };
    const formValidation = yup.object().shape({
      username: yup
        .string()
        .label('Số điện thoại')
        .min(10, 'Số điện thoại quá ngắn 0-11 số')
        .max(11, 'Số điện thoại quá dài 0-11 số')
        .matches(phoneRegExp, 'Số điện thoại không phù hợp')
        .required('Vui lòng nhập số điện thoạ!')
    });

    const onForgotPassword = (values: any) => {
      emit('onSubmitData', values);
    };

    return {
      // Data
      data,
      // Form
      formValidation,
      formData,
      // Function
      onForgotPassword
    };
  }
});
</script>
