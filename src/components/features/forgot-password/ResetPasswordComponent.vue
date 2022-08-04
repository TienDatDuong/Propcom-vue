<template>
  <div class="reset-password-component">
    <Form
      validate-on-submit
      :validation-schema="formValidation"
      :initial-values="formData"
      @submit="onSubmitPassword"
      class="reset-password-component__form"
    >
      <div class="reset-password-component__form__header">
        <span class="reset-password-component__form__header__title">Tạo mật khẩu mới</span>
        <span class="reset-password-component__form__header__sub-title">Chào mừng bạn đến với cộng đồng Propcom</span>
      </div>
      <Field name="password" v-slot="{ field, handleChange, handleBlur, errorMessage }">
        <div class="app-input">
          <label for="grid-password" class="app-input__form__label"
            >Mật khẩu mới<span class="app-input__form__label-required">*</span></label
          >
          <el-input
            :modelValue="field.value"
            @input="handleChange"
            @blur="handleBlur"
            size="small"
            type="password"
            show-password
            placeholder="Nhập mật khẩu mới"
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
      <Field name="confirmPassword" v-slot="{ field, handleChange, handleBlur, errorMessage }">
        <div class="app-input">
          <label for="grid-password" class="app-input__form__label"
            >Xác nhận mật khẩu<span class="app-input__form__label-required">*</span></label
          >
          <el-input
            :modelValue="field.value"
            @input="handleChange"
            @blur="handleBlur"
            size="small"
            type="password"
            show-password
            placeholder="Nhập lại mật khẩu mới"
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
        Xác nhận
      </button>
    </Form>
  </div>
</template>

<style lang="scss" scoped>
.reset-password-component {
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
}
</style>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useInit } from '@/services/shared/utils';
import { Form, Field } from 'vee-validate'; // https://vee-validate.logaretm.com/v4/guide/composition-api/validation
import * as yup from 'yup';

export default defineComponent({
  name: 'ResetPasswordComponent',
  components: {
    Form,
    Field
  },
  emits: ['onSubmitData'],
  setup(props: any, { emit }: any) {
    // Setup Default
    const { base } = useInit();

    // Component reactive data
    const data = reactive({
      isLoading: false
    });
    // Setup Form
    const formData = {
      password: '',
      confirmPassword: ''
    };
    const formValidation = yup.object({
      password: yup
        .string()
        .label('Mật khẩu mới')
        .required('Vui lòng điền mật khẩu mới')
        .min(8, 'Độ dài tối thiểu 8 ký tự'),
      confirmPassword: yup
        .string()
        .label('Xác nhận mật khẩu mới')
        .required('Vui lòng điền xác nhận mật khẩu mới')
        .oneOf([yup.ref('password')], 'Mật khẩu mới không khớp')
    });

    const onSubmitPassword = (values: any) => {
      emit('onSubmitData', values);
    };
    return {
      // Data
      data,
      // Form + Fields
      formValidation,
      formData,
      // Function
      onSubmitPassword
    };
  }
});
</script>
