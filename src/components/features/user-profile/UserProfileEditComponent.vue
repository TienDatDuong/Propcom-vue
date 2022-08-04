<template v-loading="data.isLoading">
  <div class="user-profile-edit-component">
    <div class="user-profile-edit-component__card">
      <div class="user-profile-edit-component__card__header">
        <span class="user-profile-edit-component__card__header__title"> Thông tin cá nhân </span>
      </div>
      <div class="user-profile-edit-component__card__body">
        <Field name="name" v-slot="{ field, handleChange, handleBlur, errorMessage }">
          <div class="app-input">
            <label class="app-input__form__label"
              >Họ và tên<span class="app-input__form__label-required">*</span>
            </label>
            <el-input
              :disabled="!data.isAccountVerified"
              :modelValue="field.value"
              @input="handleChange"
              @blur="handleBlur"
              size="small"
              placeholder="Nhập họ và tên"
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

        <div class="user-profile-edit-component__card__body__input-group">
          <div class="app-input">
            <label class="app-input__form__label">
              Ngày sinh<span class="app-input__form__label-required">*</span>
            </label>
            <v-date-picker v-model="fieldDob" :locale="data.locale" :popover="{ visibility: 'focus' }">
              <template v-slot="{ inputValue, inputEvents }">
                <div class="el-input">
                  <input
                    placeholder="Nhập ngày sinh"
                    class="el-input__inner"
                    :value="inputValue"
                    v-on="inputEvents"
                    :disabled="!data.isAccountVerified"
                  />
                  <div class="el-input-group__append">
                    <div class="underline" :class="{ invalid: fieldDobError }"></div>
                  </div>
                </div>
              </template>
            </v-date-picker>
            <div v-if="fieldDobError" class="input-error">
              <img src="@/assets/icons/colorful/icon_error.svg" alt="form-error" />
              <span class="form-error">{{ fieldDobError }}</span>
            </div>
          </div>
        </div>

        <Field name="gender" v-slot="{ field, handleChange, handleBlur, errorMessage }">
          <div class="app-input">
            <label class="user-profile-edit-component__card__body__input-group__label">
              Giới tính<span class="app-form-text-error">*</span>
            </label>
            <div class="user-profile-edit-component__card__body__input-group__radio-group">
              <label class="app-form-input-radio-wrapper">
                <input
                  :disabled="!data.isAccountVerified"
                  hidden
                  type="radio"
                  v-model="field.value"
                  value="male"
                  name="gender"
                  @input="handleChange"
                  @blur="handleBlur"
                />
                <span class="checkmark"></span>
              </label>
              <span class="user-profile-edit-component__card__body__input-group__value">Nam</span>
              <label class="app-form-input-radio-wrapper">
                <input
                  :disabled="!data.isAccountVerified"
                  hidden
                  type="radio"
                  v-model="field.value"
                  value="female"
                  name="gender"
                  @input="handleChange"
                  @blur="handleBlur"
                />
                <span class="checkmark"></span>
              </label>
              <span class="user-profile-edit-component__card__body__input-group__value">Nữ</span>
            </div>
            <div v-if="errorMessage" class="input-error">
              <img src="@/assets/icons/colorful/icon_error.svg" alt="form-error" />
              <span class="form-error">{{ errorMessage }}</span>
            </div>
          </div>
        </Field>

        <Field name="identityCode" v-slot="{ field, handleChange, handleBlur, errorMessage }">
          <div class="app-input">
            <label class="app-input__form__label"
              >Số CMND/CCCD<span class="app-input__form__label-required">*</span>
            </label>
            <el-input
              :disabled="!data.isAccountVerified"
              :modelValue="field.value"
              @input="handleChange"
              @blur="handleBlur"
              size="small"
              placeholder="Nhập số CMND/CCCD"
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

        <div class="user-profile-edit-component__card__body__input-group">
          <div class="app-input">
            <label class="app-input__form__label">
              Ngày cấp<span class="app-input__form__label-required">*</span>
            </label>
            <v-date-picker v-model="fieldIdentityDate" :locale="data.locale" :popover="{ visibility: 'focus' }">
              <template v-slot="{ inputValue, inputEvents }">
                <div class="el-input">
                  <input
                    placeholder="Nhập ngày cấp"
                    class="el-input__inner"
                    :value="inputValue"
                    v-on="inputEvents"
                    :disabled="!data.isAccountVerified"
                  />
                  <div class="el-input-group__append">
                    <div class="underline" :class="{ invalid: fieldIdentityDateError }"></div>
                  </div>
                </div>
              </template>
            </v-date-picker>
            <div v-if="fieldIdentityDateError" class="input-error">
              <img src="@/assets/icons/colorful/icon_error.svg" alt="form-error" />
              <span class="form-error">{{ fieldIdentityDateError }}</span>
            </div>
          </div>
        </div>

        <Field name="identityAddress" v-slot="{ field, handleChange, handleBlur, errorMessage }">
          <div class="app-input">
            <label class="app-input__form__label">Nơi cấp<span class="app-input__form__label-required">*</span> </label>
            <el-input
              :disabled="!data.isAccountVerified"
              :modelValue="field.value"
              @input="handleChange"
              @blur="handleBlur"
              size="small"
              placeholder="Nhập nơi cấp"
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

    <div class="user-profile-edit-component__card">
      <div class="user-profile-edit-component__card__header">
        <span class="user-profile-edit-component__card__header__title"> Liên hệ </span>
      </div>
      <div class="user-profile-edit-component__card__body">
        <Field name="email" v-slot="{ field, handleChange, handleBlur, errorMessage }">
          <div class="app-input">
            <label class="app-input__form__label"
              >Địa chỉ email<span class="app-input__form__label-required">*</span>
            </label>
            <el-input
              :modelValue="field.value"
              @input="handleChange"
              @blur="handleBlur"
              size="small"
              placeholder="Nhập địa chỉ email"
              class="input-form"
              disabled
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

        <Field name="phone" v-slot="{ field, handleChange, handleBlur, errorMessage }">
          <div class="app-input">
            <label class="app-input__form__label"
              >Số điện thoại<span class="app-input__form__label-required">*</span>
            </label>
            <el-input
              :modelValue="field.value"
              @input="handleChange"
              @blur="handleBlur"
              size="small"
              placeholder="Nhập số điện thoại"
              class="input-form"
              disabled
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

        <Field name="website" v-slot="{ field, handleChange, handleBlur, errorMessage }">
          <div class="app-input">
            <label class="app-input__form__label">Website</label>
            <el-input
              :modelValue="field.value"
              @input="handleChange"
              @blur="handleBlur"
              size="small"
              placeholder="Nhập địa chỉ website"
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

        <Field name="facebook" v-slot="{ field, handleChange, handleBlur, errorMessage }">
          <div class="app-input">
            <label class="app-input__form__label">Facebook </label>
            <el-input
              :modelValue="field.value"
              @input="handleChange"
              @blur="handleBlur"
              size="small"
              placeholder="Nhập địa chỉ facebook"
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

        <Field name="instagram" v-slot="{ field, handleChange, handleBlur, errorMessage }">
          <div class="app-input">
            <label class="app-input__form__label">Instagram </label>
            <el-input
              :modelValue="field.value"
              @input="handleChange"
              @blur="handleBlur"
              size="small"
              placeholder="Nhập địa chỉ instagram"
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

        <Field name="viber" v-slot="{ field, handleChange, handleBlur, errorMessage }">
          <div class="app-input">
            <label class="app-input__form__label">Viber </label>
            <el-input
              :modelValue="field.value"
              @input="handleChange"
              @blur="handleBlur"
              size="small"
              placeholder="Nhập địa chỉ viber"
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

        <Field name="zalo" v-slot="{ field, handleChange, handleBlur, errorMessage }">
          <div class="app-input">
            <label class="app-input__form__label">Zalo </label>
            <el-input
              :modelValue="field.value"
              @input="handleChange"
              @blur="handleBlur"
              size="small"
              placeholder="Nhập địa chỉ zalo"
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

        <Field name="tiktok" v-slot="{ field, handleChange, handleBlur, errorMessage }">
          <div class="app-input">
            <label class="app-input__form__label">Tiktok </label>
            <el-input
              :modelValue="field.value"
              @input="handleChange"
              @blur="handleBlur"
              size="small"
              placeholder="Nhập địa chỉ tiktok"
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

    <div class="user-profile-edit-component__card">
      <div class="user-profile-edit-component__card__header">
        <span class="user-profile-edit-component__card__header__title"> Giới thiệu bản thân </span>
      </div>
      <div class="user-profile-edit-component__card__body">
        <Field name="businessProfileIntroducer" v-slot="{ field, handleChange, handleBlur, errorMessage }">
          <div class="app-input">
            <label class="app-input__form__label">Giới thiệu bản thân </label>
            <el-input
              :modelValue="field.value"
              @input="handleChange"
              @blur="handleBlur"
              size="small"
              placeholder="Nhập giới thiệu bản thân"
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

        <Field name="businessProfileQuote" v-slot="{ field, handleChange, handleBlur, errorMessage }">
          <div class="app-input">
            <label class="app-input__form__label">Trích dẫn ưa thích của bạn </label>
            <el-input
              :modelValue="field.value"
              @input="handleChange"
              @blur="handleBlur"
              size="small"
              placeholder="Nhập trích dẫn ưa thích của bạn"
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

    <div class="user-profile-edit-component__card">
      <div class="user-profile-edit-component__card__header">
        <span class="user-profile-edit-component__card__header__title">Dự án đã tham gia</span>
      </div>
      <div class="user-profile-edit-component__card__body">
        <div class="app-input app-select">
          <label class="app-input__form__label">Các dự án đã tham gia</label>
          <el-select
            v-model="data.projectSelected"
            filterable
            placeholder="Vui lòng chọn dự án tham gia"
            @change="handleOptionSelected"
            remote
            :remote-method="onSearchProject"
          >
            <template #prefix>
              <div class="underline"></div>
            </template>
            <el-option
              v-for="item in data.listProjectParticipated"
              :key="item.id"
              :label="item.name"
              :value="item"
            ></el-option>
          </el-select>
        </div>
        <div class="user-profile-edit-component__card__body__project-list">
          <div
            v-for="(project, index) in data.listProjectParticipatedSelected"
            :key="index"
            class="user-profile-edit-component__card__body__project-list__item"
          >
            <div class="user-profile-edit-component__card__body__project-list__item__content">
              <span>{{ project.name }}</span>
              <div class="app-hover-effect unselectable" icon @click="handleOptionSelected(project, true)">
                <img src="@/assets/icons/simple/icon_close_docx.svg" />
              </div>
            </div>
            <hr/>
          </div>
        </div>
      </div>
    </div>
    <div class="user-profile-edit-component__actions">
      <button class="app-btn app-btn-primary app-btn-xl" @click="saveEmployee">
        <span>Lưu thay đổi</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-profile-edit-component {
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
        &__radio-group {
          margin-top: 10px;
          display: flex;
          flex-direction: row;
          align-items: center;
          & .app-form-input-radio-wrapper:not(:first-child) {
            margin-left: 30px;
          }
        }
      }
      &__project-list {
        &__item {
          &__content {
            display: flex;
            justify-content: space-between;
            & > span {
              font-weight: 700;
              font-size: 14px;
            }
            & .unselectable {
              cursor: pointer;
            }
          }
          & .el-divider {
            margin: 14px 0;
          }
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
import { defineComponent, reactive, onMounted, ref, watch } from 'vue';
import { useInit } from '@/services/shared/utils';
import { useForm, useField, Field } from 'vee-validate'; // https://vee-validate.logaretm.com/v4/guide/composition-api/validation
import { findProjectParticipated } from '@/services/features/property/property.service';
import * as yup from 'yup';
import { EmployeeStatusEnum, EmployeeModel } from '@/services/features/employee/employee.model';
import { DateTime } from 'luxon';
import { AppConstant } from '@/app.constant';
import { debounce } from 'lodash';

// Định nghĩa data type của component bằng Typescript
enum UserProfileComponentType {
  UserProfileInfoComponent = 'UserProfileInfoComponent',
  UserProfileEditComponent = 'UserProfileEditComponent',
  UserProfileChangePasswordComponent = 'UserProfileChangePasswordComponent',
  UserProfileBusinessProfileComponent = 'UserProfileBusinessProfileComponent'
}

// Định nghĩa data type của component [props] bằng Typescript
class UserProfileEditComponentProps {
  user: EmployeeModel;
}

// Định nghĩa data type của component [data] bằng Typescript
class UserProfileEditComponentData {
  isLoading: boolean;
  isAccountVerified: boolean;
  locale: any;
  projectSelected: any;
  listProjectParticipatedSelected: any;
  listProjectParticipated: any;
}

// Component chính
export default defineComponent({
  name: 'UserProfileEditComponent',
  components: {
    Field
  },
  props: {
    user: {
      type: EmployeeModel,
      default: null
    }
  },
  emits: ['onUpdateUser'],
  setup(props: UserProfileEditComponentProps, { emit }: any) {
    // Setup Default
    const { base } = useInit();
    const data: any = reactive<UserProfileEditComponentData>({
      isLoading: false,
      isAccountVerified: false,
      locale: base.locale,
      projectSelected: ref(''),
      listProjectParticipatedSelected: props.user.businessProfile?.projectPaticipated || [],
      listProjectParticipated: []
    });

    const socialFacebook = props.user.socialUrls.find(item => item.name === AppConstant.SOCIAL.SOCIAL_FACEBOOK);
    const socialViber = props.user.socialUrls.find(item => item.name === AppConstant.SOCIAL.SOCIAL_VIBER);
    const socialZalo = props.user.socialUrls.find(item => item.name === AppConstant.SOCIAL.SOCIAL_ZALO);
    const socialInstagram = props.user.socialUrls.find(item => item.name === AppConstant.SOCIAL.SOCIAL_INSTAGRAM);
    const socialTiktok = props.user.socialUrls.find(item => item.name === AppConstant.SOCIAL.SOCIAL_TIKTOK);
    const socialWebsite = props.user.socialUrls.find(item => item.name === AppConstant.SOCIAL.SOCIAL_WEBSITE);

    const formValidationSchema = yup.object({
      // Thông tin cá nhân
      name: yup
        .string()
        .label('Họ và tên')
        .required('Vui lòng nhập đầy đủ họ và tên'),
      dob: yup
        .date()
        .label('Ngày sinh')
        .required('Vui lòng nhập ngày sinh')
        .nullable()
        .transform(v => (v instanceof Date && !isNaN(v.getTime()) ? v : null)),
      gender: yup
        .string()
        .label('Giới tính')
        .required('Vui lòng chọn giới tính')
        .nullable(),
      identityCode: yup
        .string()
        .label('Số CMND/CCCD')
        .required('Vui lòng nhập số CMND/CCCD'),
      identityDate: yup
        .date()
        .label('Ngày cấp')
        .required('Vui lòng nhập ngày cấp')
        .nullable()
        .transform(v => (v instanceof Date && !isNaN(v.getTime()) ? v : null)),
      identityAddress: yup
        .string()
        .label('Nơi cấp')
        .required('Vui lòng nhập nơi cấp'),
      // Liên hệ
      email: yup
        .string()
        .label('email')
        .required('Vui lòng nhập email'),
      phone: yup
        .string()
        .label('Số điện thoại')
        .required('Vui lòng nhập số điện thoại'),
      website: yup
        .string()
        .label('website')
        .nullable()
        .max(100, 'Không quá 100 từ'),
      facebook: yup
        .string()
        .label('facebook')
        .nullable()
        .max(100, 'Không quá 100 từ'),
      instagram: yup
        .string()
        .label('instagram')
        .nullable()
        .max(100, 'Không quá 100 từ'),
      viber: yup
        .string()
        .label('viber')
        .nullable()
        .max(100, 'Không quá 100 từ'),
      zalo: yup
        .string()
        .label('zalo')
        .nullable()
        .max(100, 'Không quá 100 từ'),
      tiktok: yup
        .string()
        .label('tiktok')
        .nullable()
        .max(100, 'Không quá 100 từ'),
      // Giới thiệu bản thân
      businessProfileIntroducer: yup
        .string()
        .label('Giới thiệu bản thân')
        .nullable()
        .max(200, 'Không quá 200 từ'),
      businessProfileQuote: yup
        .string()
        .label('Trích dẫn ưa thích của bạn')
        .nullable()
        .max(100, 'Không quá 100 từ')
    });
    const form = useForm({
      validationSchema: formValidationSchema,
      initialValues: {
        name: props.user.name || '',
        dob: props.user.dob ? DateTime.fromISO(props.user.dob).toJSDate() : null,
        gender: props.user.gender || null,
        identityCode: props.user.identityCode || '',
        identityDate: props.user.identityDate ? DateTime.fromISO(props.user.identityDate).toJSDate() : null,
        identityAddress: props.user.identityAddress || '',
        email: props.user.email || '',
        phone: props.user.phone || '',
        website: socialWebsite ? socialWebsite.url : '',
        facebook: socialFacebook ? socialFacebook.url : '',
        instagram: socialInstagram ? socialInstagram.url : '',
        viber: socialViber ? socialViber.url : '',
        zalo: socialZalo ? socialZalo.url : '',
        tiktok: socialTiktok ? socialTiktok.url : '',
        businessProfileIntroducer: props.user.businessProfile ? props.user.businessProfile.introducer : '',
        businessProfileQuote: props.user.businessProfile ? props.user.businessProfile.quote : ''
      }
    });

    const { value: fieldDob, errorMessage: fieldDobError } = useField('dob');
    const { value: fieldIdentityDate, errorMessage: fieldIdentityDateError } = useField('identityDate');

    // Function
    const getDataProject = async (textSearch?: string) => {
      data.isLoading = true;
      const q = textSearch ? textSearch : '';
      try {
        const response = await findProjectParticipated({ q });
        data.listProjectParticipated = response;
      } finally {
        data.isLoading = false;
      }
    };

    const onSearchProject = debounce((value: any) => {
      getDataProject(value);
    }, 500);

    const handleOptionSelected = async (value: any, isRemove = false) => {
      data.isLoading = true;
      try {
        if (isRemove) {
          data.listProjectParticipatedSelected.splice(
            data.listProjectParticipatedSelected.findIndex((owner: any) => owner.id === value.id),
            1
          );
        } else if (data.listProjectParticipatedSelected.findIndex((owner: any) => owner.id === value.id) < 0) {
          data.listProjectParticipatedSelected.push(data.projectSelected);
        }
        data.projectSelected = '';
      } finally {
        data.isLoading = false;
      }
    };

    const saveEmployee = form.handleSubmit(async (values: any) => {
      data.isLoading = true;
      try {
        const model = {
          name: values.name,
          dob: values.dob,
          gender: values.gender,
          identityAddress: values.identityAddress,
          identityCode: values.identityCode,
          identityDate: values.identityDate,
          email: values.email,
          phone: values.phone,
          businessProfile: {
            introducer: values.businessProfileIntroducer,
            projectPaticipated: [...data.listProjectParticipatedSelected],
            quote: values.businessProfileQuote
          },
          socialUrls: [
            { name: 'Zalo', url: values.zalo ? values.zalo : null },
            { name: 'Facebook', url: values.facebook ? values.facebook : null },
            { name: 'Tiktok', url: values.tiktok ? values.tiktok : null },
            { name: 'Viber', url: values.viber ? values.viber : null },
            { name: 'Website', url: values.website ? values.website : null },
            { name: 'Instagram', url: values.instagram ? values.instagram : null }
          ]
        };
        emit('onUpdateUser', model);
      } finally {
        data.isLoading = false;
      }
    });

    // Watch
    watch(
      () => props.user,
      () => {
        data.isAccountVerified =
          props.user.status === EmployeeStatusEnum.INIT || props.user.status === EmployeeStatusEnum.WAITING;
      }
    );

    // Life cylce
    onMounted(() => {
      getDataProject();
      data.isAccountVerified =
        props.user.status === EmployeeStatusEnum.INIT || props.user.status === EmployeeStatusEnum.WAITING;
      if (!props.user) {
        return;
      }
    });

    return {
      // Enum
      UserProfileComponentType,
      EmployeeStatusEnum,
      // Component props
      props,
      // Component reactive data
      data,
      // Form
      fieldDob,
      fieldDobError,
      fieldIdentityDate,
      fieldIdentityDateError,
      // Methods
      saveEmployee,
      onSearchProject,
      getDataProject,
      handleOptionSelected
    };
  }
});
</script>
