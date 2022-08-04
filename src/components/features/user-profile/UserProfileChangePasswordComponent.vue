<template v-loading="data.isLoading">
  <Form
    validate-on-submit
    :validation-schema="formValidation"
    :initial-values="formData"
    @submit="onChangePassword"
    @invalid-submit="onInvalidSubmit"
    class="group-detail-aside-component__dialog-form"
  >
    <div class="user-profile-change-password-component">
      <div class="user-profile-change-password-component__card">
        <div class="user-profile-change-password-component__card__header">
          <span class="user-profile-change-password-component__card__header__title"> Đổi mật khẩu </span>
        </div>
        <div class="user-profile-change-password-component__card__body">
          <Field name="oldPassword" v-slot="{ field, handleChange, handleBlur, errorMessage }">
            <div class="app-input">
              <label class="app-input__form__label"
                >Mật khẩu cũ<span class="app-input__form__label-required">*</span>
              </label>
              <el-input
                :modelValue="field.value"
                @input="handleChange"
                @blur="handleBlur"
                size="small"
                type="password"
                show-password
                placeholder="Nhập mật khẩu cũ"
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
              <label class="app-input__form__label"
                >Mật khẩu mới<span class="app-input__form__label-required">*</span>
              </label>
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
                  <div class="underline" :class="{ invalid: errorMessage }"></div>
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
              <label class="app-input__form__label"
                >Nhập lại mật khẩu<span class="app-input__form__label-required">*</span>
              </label>
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
                  <div class="underline" :class="{ invalid: errorMessage }"></div>
                </template>
              </el-input>
              <div v-if="errorMessage" class="input-error">
                <img src="@/assets/icons/colorful/icon_error.svg" alt="form-error" />
                <span class="form-error">{{ errorMessage }}</span>
              </div>
            </div>
          </Field>
        </div>
      </div>

      <div class="user-profile-change-password-component__actions">
        <button class="app-btn app-btn-primary app-btn-xl" type="submit">
          <span>Xác nhận</span>
        </button>
      </div>
    </div>
  </Form>
</template>

<style lang="scss" scoped>
.user-profile-change-password-component {
  display: flex;
  flex-direction: column;

  & > *:not(:last-child) {
    margin-bottom: 20px;
  }

  &__card {
    width: 100%;
    display: flex;
    flex-direction: column;
    font-size: 14px;

    &__header {
      padding: 20px 30px;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      color: $colorNeutral;
      border: $border;
      border-bottom: 0;
      border-top-left-radius: $borderRadius;
      border-top-right-radius: $borderRadius;
      background-color: #ffffff;
      &__title {
        flex: 1;
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        line-height: 1;
        color: $colorNeutral;
      }
    }
    &__body {
      padding: 20px 30px;
      width: 100%;
      display: flex;
      flex-direction: column;
      border: $border;
      border-bottom-left-radius: $borderRadius;
      border-bottom-right-radius: $borderRadius;
      background-color: #ffffff;
      word-wrap: break-word;
      & > *:not(:last-child) {
        margin-bottom: 25px;
      }
      &__input-group {
        width: 100%;
        display: flex;
        flex-direction: column;
        &__label {
          font-size: 13px;
          color: $colorNeutral;
        }
        &__value {
          font-size: 14px;
          font-weight: bold;
          color: #0f0f0f;
        }
      }
    }
  }

  &__actions {
    display: flex;
    flex-direction: row;
    justify-content: center;
    button:not(:last-child) {
      margin-right: 15px;
    }
    .app-btn.app-btn-primary {
      width: 350px;
    }
  }
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive } from 'vue';
import { useInit } from '@/services/shared/utils';
import { Form, Field } from 'vee-validate'; // https://vee-validate.logaretm.com/v4/guide/composition-api/validation
import * as yup from 'yup';
import { EmployeeStatusEnum } from '@/services/features/employee/employee.model';

// Định nghĩa data type của component bằng Typescript
enum UserProfileComponentType {
  UserProfileInfoComponent = 'UserProfileInfoComponent',
  UserProfileEditComponent = 'UserProfileEditComponent',
  UserProfileChangePasswordComponent = 'UserProfileChangePasswordComponent',
  UserProfileBusinessProfileComponent = 'UserProfileBusinessProfileComponent',
}

// Định nghĩa data type của component [data] bằng Typescript
class UserProfileChangePasswordComponentData {
  isLoading: boolean;
}

// Component chính
export default defineComponent({
  name: 'UserProfileChangePasswordComponent',
  components: {
    Form,
    Field,
  },
  setup(props: any, { emit }: any) {
    // Setup Default
    const { base } = useInit();
    const data: any = reactive<UserProfileChangePasswordComponentData>({
      isLoading: false,
    });

    const formData = {
      oldPassword: '',
      password: '',
      confirmPassword: '',
    };

    const formValidation = yup.object({
      oldPassword: yup
        .string()
        .label('Password')
        .required('Vui lòng điền mật khẩu cũ')
        .min(8, 'Độ dài tối thiểu 8 ký tự'),
      password: yup
        .string()
        .label('New Password')
        .required('Vui lòng điền mật khẩu mới')
        .min(8, 'Độ dài tối thiểu 8 ký tự'),
      confirmPassword: yup
        .string()
        .label('Confirm Password')
        .required('Vui lòng xác nhận mật khẩu mới')
        .oneOf([yup.ref('password')], 'Mật khẩu mới không khớp'),
    });

    // Function
    const onInvalidSubmit = () => {
      emit('onChangePassword', false);
    };

    const onChangePassword = (values: any) => {
      emit('onChangePassword', { oldPassword: values.oldPassword, password: values.password });
    };

    return {
      // Enum
      UserProfileComponentType,
      EmployeeStatusEnum,
      // Component reactive data
      data,
      // Form + Fields
      formValidation,
      formData,
      // Methods
      onChangePassword,
      onInvalidSubmit,
    };
  },
});
</script>
