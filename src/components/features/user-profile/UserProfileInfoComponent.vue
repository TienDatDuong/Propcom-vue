<template>
  <div class="user-profile-info-component">
    <div class="user-profile-info-component__card">
      <div class="user-profile-info-component__card__header">
        <span class="user-profile-info-component__card__header__title">Thông tin cá nhân</span>
        <a v-if="data.isAccountVerified" href="javascript:;" @click="goToEditComponent">
          <img src="@/assets/icons/colorful/icon_edit.svg" />
        </a>
      </div>
      <div class="user-profile-info-component__card__body">
        <div class="user-profile-info-component__card__body__body-column">
          <div class="user-profile-info-component__card__body__input-group">
            <img src="@/assets/icons/colorful/icon_vector.svg" />
            <span class="user-profile-info-component__card__body__input-group__label">Họ và tên</span>
            <label class="user-profile-info-component__card__body__input-group__value">{{ props.user?.name }}</label>
          </div>
          <div class="user-profile-info-component__card__body__input-group">
            <img src="@/assets/icons/colorful/icon_vector.svg" />
            <span class="user-profile-info-component__card__body__input-group__label"> Số CMND/CCCD</span>
            <label class="user-profile-info-component__card__body__input-group__value">{{
              props.user?.identityCode
            }}</label>
          </div>
        </div>
        <div class="user-profile-info-component__card__body__body-column">
          <div class="user-profile-info-component__card__body__input-group">
            <img src="@/assets/icons/colorful/icon_vector.svg" />
            <span class="user-profile-info-component__card__body__input-group__label" fxFlex="80px">Ngày cấp</span>
            <label class="user-profile-info-component__card__body__input-group__value">{{
              formatDate(props.user?.identityDate, "dd/MM/yyyy")
            }}</label>
          </div>
          <div class="user-profile-info-component__card__body__input-group">
            <img src="@/assets/icons/colorful/icon_vector.svg" />
            <span class="user-profile-info-component__card__body__input-group__label" fxFlex="80px">Nơi cấp</span>
            <label class="user-profile-info-component__card__body__input-group__value">{{
              props.user?.identityAddress
            }}</label>
          </div>
        </div>
      </div>
    </div>

    <div class="user-profile-info-component__card">
      <div class="user-profile-info-component__card__header">
        <span class="user-profile-info-component__card__header__title">Liên hệ</span>
        <a href="javascript:;" @click="goToEditComponent">
          <img src="@/assets/icons/colorful/icon_edit.svg" />
        </a>
      </div>
      <div class="user-profile-info-component__card__body">
        <div class="user-profile-info-component__card__body__body-column">
          <div class="user-profile-info-component__card__body__input-group">
            <img src="@/assets/icons/colorful/icon_vector.svg" />
            <span class="user-profile-info-component__card__body__input-group__label">Địa chỉ emaill</span>
            <label class="user-profile-info-component__card__body__input-group__value">{{ props.user?.email }}</label>
          </div>
          <div class="user-profile-info-component__card__body__input-group">
            <img src="@/assets/icons/colorful/icon_vector.svg" />
            <span class="user-profile-info-component__card__body__input-group__label"> Số điện thoại</span>
            <label class="user-profile-info-component__card__body__input-group__value">{{ props.user?.phone }}</label>
          </div>
          <div class="user-profile-info-component__card__body__input-group">
            <img src="@/assets/icons/colorful/icon_vector.svg" />
            <span class="user-profile-info-component__card__body__input-group__label">Facebook</span>
            <a target="_blank" :href="data.socialFacebook?.url">{{ data.socialFacebook?.url }}</a>
          </div>
          <div class="user-profile-info-component__card__body__input-group">
            <img src="@/assets/icons/colorful/icon_vector.svg" />
            <span class="user-profile-info-component__card__body__input-group__label"> Instagram</span>
            <a target="_blank" :href="data.socialInstagram?.url">{{ data.socialInstagram?.url }}</a>
          </div>
        </div>
        <div class="user-profile-info-component__card__body__body-column">
          <div class="user-profile-info-component__card__body__input-group">
            <img src="@/assets/icons/colorful/icon_vector.svg" />
            <span class="user-profile-info-component__card__body__input-group__label" fxFlex="80px">Viber</span>
            <a target="_blank" :href="data.socialViber?.url">{{ data.socialViber?.url }}</a>
          </div>
          <div class="user-profile-info-component__card__body__input-group">
            <img src="@/assets/icons/colorful/icon_vector.svg" />
            <span class="user-profile-info-component__card__body__input-group__label" fxFlex="80px">Zalo</span>
            <a target="_blank" :href="data.socialZalo?.url">{{ data.socialZalo?.url }}</a>
          </div>
          <div class="user-profile-info-component__card__body__input-group">
            <img src="@/assets/icons/colorful/icon_vector.svg" />
            <span class="user-profile-info-component__card__body__input-group__label" fxFlex="80px">Tiktok</span>
            <a target="_blank" :href="data.socialTiktok?.url">{{ data.socialTiktok?.url }}</a>
          </div>
        </div>
      </div>
    </div>

    <div class="user-profile-info-component__card">
      <div class="user-profile-info-component__card__header">
        <span class="user-profile-info-component__card__header__title">Giới thiệu bản thân</span>
        <a href="javascript:;" @click="goToEditComponent">
          <img src="@/assets/icons/colorful/icon_edit.svg" />
        </a>
      </div>
      <div class="user-profile-info-component__card__body">
        <div class="user-profile-info-component__card__body__body-column">
          <div class="user-profile-info-component__card__body__input-group">
            <img src="@/assets/icons/colorful/icon_vector.svg" />
            <span class="user-profile-info-component__card__body__input-group__label">Giới thiệu bản thân</span>
            <label class="user-profile-info-component__card__body__input-group__value">{{
              props.user?.businessProfile?.introducer
            }}</label>
          </div>
          <div class="user-profile-info-component__card__body__input-group">
            <img src="@/assets/icons/colorful/icon_vector.svg" />
            <span class="user-profile-info-component__card__body__input-group__label">Dự án đã tham gia</span>
            <label class="user-profile-info-component__card__body__input-group__value">
              {{ data.projectPaticipated }}
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="user-profile-info-component__card">
      <div class="user-profile-info-component__card__header">
        <span class="user-profile-info-component__card__header__title">Trích dẫn ưa thích</span>
        <a href="javascript:;" @click="goToEditComponent">
          <img src="@/assets/icons/colorful/icon_edit.svg" />
        </a>
      </div>
      <div class="user-profile-info-component__card__body">
        <div class="user-profile-info-component__card__body__body-column">
          <div class="user-profile-info-component__card__body__input-group">
            <img src="@/assets/icons/colorful/icon_vector.svg" />
            <span class="user-profile-info-component__card__body__input-group__label">Trích dẫn ưa thích</span>
            <label class="user-profile-info-component__card__body__input-group__value">{{
              props.user?.businessProfile?.quote
            }}</label>
          </div>
        </div>
      </div>
    </div>

    <div
      class="user-profile-info-component__actions"
      v-if="
        props.user?.status === EmployeeStatusEnum.IDENTIFIED ||
          props.user?.status === EmployeeStatusEnum.SIGNED_CONTRACT
      "
    >
      <button class="app-btn app-btn-primary app-btn-xl" @click="goToBusinessProfileComponent">
        <span>Xem hồ sơ bán hàng</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-profile-info-component {
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
      flex-direction: row;
      border: $border;
      border-bottom-left-radius: $borderRadius;
      border-bottom-right-radius: $borderRadius;
      background-color: #ffffff;
      word-wrap: break-word;
      &__body-column {
        flex: 1;
        display: flex;
        flex-direction: column;
        & > *:not(:last-child) {
          margin-bottom: 10px;
        }
      }
      &__input-group {
        display: flex;
        flex-direction: row;
        align-items: baseline;
        padding-left: 45px;
        & > *:not(:last-child) {
          margin-right: 8px;
        }
        svg {
          width: 10px;
          height: 10px;
        }
        & > a {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          text-decoration: none;
          word-wrap: normal;
          color: #333;
          font-weight: bold;
          transition: all 0.2s;
          &:hover {
            color: #086aca;
          }
        }
        &__label {
          width: 120px;
          font-size: 13px;
          color: $colorNeutral;
        }
        &__value {
          flex: 1;
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
import { defineComponent, reactive, onMounted, watch } from 'vue';
import { useInit, formatDate } from '@/services/shared/utils';
import {
  SocialType,
  EmployeeStatusEnum,
  SocialUrlModel,
  EmployeeModel
} from '@/services/features/employee/employee.model';

// Định nghĩa section của component bằng Typescript
enum UserProfilePageSection {
  PROFILE_INFO = 'info',
  PROFILE_EDIT = 'edit',
  PROFILE_BUSINESS = 'business',
  CHANGE_PASSWORD = 'change-password'
}

// Định nghĩa data type của component [props] bằng Typescript
class UserProfileInfoComponentProps {
  user: EmployeeModel;
}

// Định nghĩa data type của component [data] bằng Typescript
class UserProfileInfoComponentData {
  isLoading: boolean;
  isAccountVerified: boolean;
  socialFacebook: SocialUrlModel | null;
  socialViber: SocialUrlModel | null;
  socialZalo: SocialUrlModel | null;
  socialInstagram: SocialUrlModel | null;
  socialTiktok: SocialUrlModel | null;
  projectPaticipated: SocialUrlModel | null;
}

// Component chính
export default defineComponent({
  name: 'UserProfileInfoComponent',
  components: {
    // IconColorVectorSvg
  },
  props: {
    user: {
      type: EmployeeModel,
      default: null
    }
  },
  setup(props: UserProfileInfoComponentProps, { emit }: any) {
    // Setup Default
    const { base } = useInit();
    const data: any = reactive<UserProfileInfoComponentData>({
      isLoading: false,
      isAccountVerified: false,
      socialFacebook: null,
      socialViber: null,
      socialZalo: null,
      socialInstagram: null,
      socialTiktok: null,
      projectPaticipated: null
    });

    // Function
    const goToEditComponent = () => {
      emit('changeTab', UserProfilePageSection.PROFILE_EDIT);
    };

    const goToBusinessProfileComponent = () => {
      emit('changeTab', UserProfilePageSection.PROFILE_BUSINESS);
    };

    const getProjectPaticipated = () => {
      if (
        props.user.businessProfile &&
        props.user.businessProfile.projectPaticipated &&
        props.user.businessProfile.projectPaticipated.length
      ) {
        data.projectPaticipated = props.user.businessProfile.projectPaticipated
          .map((item: any) => item.name)
          .join(', ');
      }
    };

    const getSocialUrl = () => {
      if (props.user.socialUrls) {
        data.socialFacebook = props.user.socialUrls.find(
          (item: SocialUrlModel) => item.name === SocialType.SOCIAL_FACEBOOK
        );
        data.socialViber = props.user.socialUrls.find((item: SocialUrlModel) => item.name === SocialType.SOCIAL_VIBER);
        data.socialZalo = props.user.socialUrls.find((item: SocialUrlModel) => item.name === SocialType.SOCIAL_ZALO);
        data.socialInstagram = props.user.socialUrls.find(
          (item: SocialUrlModel) => item.name === SocialType.SOCIAL_INSTAGRAM
        );
        data.socialTiktok = props.user.socialUrls.find(
          (item: SocialUrlModel) => item.name === SocialType.SOCIAL_TIKTOK
        );
      }
    };

    // Watch
    watch(
      () => props.user,
      () => {
        getProjectPaticipated();
        getSocialUrl();
        data.isAccountVerified =
          props.user.status === EmployeeStatusEnum.INIT || props.user.status === EmployeeStatusEnum.WAITING;
      }
    );

    // Life cylce
    onMounted(() => {
      if (!props.user) {
        return;
      }
      data.isAccountVerified =
        props.user.status === EmployeeStatusEnum.INIT || props.user.status === EmployeeStatusEnum.WAITING;
      getSocialUrl();
      getProjectPaticipated();
    });
    return {
      // Enum
      UserProfilePageSection,
      EmployeeStatusEnum,
      // Component props
      props,
      // Component reactive data
      data,
      // Methods
      goToEditComponent,
      formatDate,
      goToBusinessProfileComponent,
    };
  }
});
</script>
