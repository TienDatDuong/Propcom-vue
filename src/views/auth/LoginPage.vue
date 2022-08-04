<template>
  <div class="login-page">
    <Form
      validate-on-submit
      :validation-schema="formValidation"
      :initial-values="formData"
      @submit="onLogin"
      class="login-page__form"
    >
      <div class="login-page__form__header">
        <span class="login-page__form__header__title">Đăng nhập</span>
        <span class="login-page__form__header__sub-title">Chào mừng bạn đến với cộng đồng Propcom</span>
      </div>
      <Field name="username" v-slot="{ field, handleChange, handleBlur, errorMessage }">
        <div class="app-input">
          <label for="grid-password" class="app-input__form__label"
            >Email hoặc số điện thoại<span class="app-input__form__label-required">*</span></label
          >
          <el-input
            :modelValue="field.value"
            @input="handleChange"
            @blur="handleBlur"
            size="small"
            placeholder="Nhập email và số điện thoại"
            class="input-form"
          >
            <template #append>
              <div class="underline" :class="{ invalid: errorMessage }"></div>
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
              <div class="underline" :class="{ invalid: errorMessage }"></div>
            </template>
          </el-input>
          <div v-if="errorMessage" class="input-error">
            <img src="@/assets/icons/colorful/icon_error.svg" alt="form-error" />
            <span class="form-error">{{ errorMessage }}</span>
          </div>
        </div>
      </Field>
      <div class="login-page__text">
        <a @click="goToForgotPasswordPage">Quên mật khẩu</a>
      </div>
      <button v-loading="data.isLoading" class="app-btn app-btn-primary app-btn-large" type="submit">Đăng nhập</button>
      <div class="login-page__text">
        <span>Chưa có tài khoản?</span>
        <a @click="goToRegisterPage">Đăng ký</a>
      </div>
    </Form>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
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
        cursor: pointer;
      }
    }
    & > span {
      font-size: 14px;
      line-height: 150%;
      color: $colorNeutral;
      margin: 0px 4px;
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
import { Form, Field } from 'vee-validate'; // https://vee-validate.logaretm.com/v4/guide/composition-api/validation
import { ACTIONS_AUTH } from '@/store/modules/auth';
import * as yup from 'yup';

export default {
  name: 'LoginPage',
  components: {
    Form,
    Field,
  },
  setup() {
    // Setup Default
    const { base } = useInit();
    const phoneAndEmailRegExp = /^(?:\d{10,11}|^(([^<>()[\]\\.,;:@']+(\.[^<>()[\]\\.,;:@']+)*)|('.+'))@\w+(\.\w+)+)$/;
    const data = reactive({
      isLoading: false,
    });
    // Setup Form
    const formData = {
      username: '',
      password: '',
    };

    const formValidation = yup.object().shape({
      username: yup
        .string()
        .label('Tên đăng nhập')
        .matches(phoneAndEmailRegExp, 'Sai định dạng email hoặc số điện thoại')
        .required('Vui lòng nhập email hoặc số điện thoại!'),
      password: yup
        .string()
        .label('Mật khẩu')
        .min(8, 'Mật khẩu tối thiểu 8 ký tự!')
        .required('Vui lòng nhập mật khẩu!'),
    });
    // Function
    const onLogin = async (values: any) => {
      data.isLoading = true;
      try {
        await base.store.dispatch(`${ACTIONS_AUTH.ROOT}/${ACTIONS_AUTH.LOGIN}`, values);
        const redirect = base.route.query.redirect?.toString() || '';
        if (redirect) {
          base.router.push(redirect);
        } else {
          base.router.push({ name: 'home' });
        }
      } finally {
        data.isLoading = false;
      }
    };
    const goToRegisterPage = () => {
      base.router.push({ name: 'signup' });
    };
    const goToForgotPasswordPage = () => {
      base.router.push({ name: 'forgot-password' });
    };
    return {
      // Component reactive data
      data,
      // Form
      formValidation,
      formData,
      // Function
      onLogin,
      goToRegisterPage,
      goToForgotPasswordPage,
    };
  },
};
</script>
