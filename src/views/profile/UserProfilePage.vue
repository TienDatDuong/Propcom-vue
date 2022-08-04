<template>
  <div class="user-profile-page">
    <AppBreadcrumbBarComponent />
    <div class="container-xl user-profile-page__container">
      <!-- Aside bên trái -->
      <div class="app-section-aside" v-if="!data.slugId">
        <div class="user-profile-page__container__profile" v-loading="data.isLoading">
          <div class="user-profile-page__container__profile__avatar-wrapper">
            <input ref="inputAvatar" hidden type="file" accept="image/*" @change="updateAvatar" />
            <UserAvatarComponent :currentUser="data.currentUser" :imgSrc="data.imgSrc" />
            <a
              href="javascript:;"
              @click="editAvatar"
              class="user-profile-page__container__profile__avatar-wrapper__btn-edit app-hover-effect"
            >
              <img src="@/assets/icons/colorful/icon_camera.svg" />
            </a>
          </div>
          <span class="user-profile-page__container__profile__title">
            {{ data.currentUser?.name }}
          </span>
          <span class="user-profile-page__container__profile__subtitle">
            {{ getUserSubtitle(data.currentUser) }}
          </span>
          <UserStatusComponent
            v-if="data.currentUser"
            :status="data.currentUser.status"
            class="user-profile-page__container__profile__status"
          />
        </div>

        <div class="user-profile-page__container__menu">
          <div
            @click="switchTab(UserProfilePageSection.PROFILE_INFO)"
            class="user-profile-page__container__menu__item"
            :class="data.activeTab === UserProfilePageSection.PROFILE_INFO && 'active'"
          >
            <div class="img-wrapper">
              <IconUser />
            </div>
            <span>Thông tin tài khoản</span>
          </div>
          <div
            @click="switchTab(UserProfilePageSection.CHANGE_PASSWORD)"
            class="user-profile-page__container__menu__item"
            :class="data.activeTab === UserProfilePageSection.CHANGE_PASSWORD && 'active'"
          >
            <div class="img-wrapper">
              <IconLock />
            </div>
            <span>Đổi mật khẩu</span>
          </div>
        </div>
      </div>

      <!-- Nội dung bên phải -->
      <div class="app-section-content">
        <!-- Tab Thông tin tài khoản -->
        <template v-if="data.activeTab === UserProfilePageSection.PROFILE_INFO">
          <UserProfileInfoComponent :user="data.currentUser" @changeTab="switchTab" />
        </template>

        <!-- Tab Cập nhật thông tin tài khoản -->
        <template v-else-if="data.activeTab === UserProfilePageSection.PROFILE_EDIT">
          <UserProfileEditComponent :user="data.currentUser" @onUpdateUser="onUpdateUser" />
        </template>

        <!-- Tab Đổi mật khẩu -->
        <template v-else-if="data.activeTab === UserProfilePageSection.CHANGE_PASSWORD">
          <UserProfileChangePasswordComponent @onChangePassword="onChangePassword" />
        </template>

        <!-- Tab Business Profile -->
        <template v-else-if="data.activeTab === UserProfilePageSection.PROFILE_BUSINESS">
          <UserBusinessProfileComponent :user="data.currentUser" @changeTab="switchTab" :slugId="data.slugId"/>
        </template>
      </div>
    </div>
  </div>

  <!-- Diablog -->
  <el-dialog v-model="data.isDialogCropAvatar" width="500px" custom-class="app-dialog user-avatar-dialog">
    <template #title>
      <span class="app-dialog-title">Chỉnh sửa ảnh</span>
    </template>
    <div class="app-dialog-content">
      <vue-cropper
        v-if="data.currentUser"
        ref="avatarCropperRef"
        alt="Source Image"
        :aspectRatio="1"
        :zoomOnWheel="false"
        class="user-avatar-dialog__cropper"
      >
      </vue-cropper>
      <div class="app-dialog-content__actions">
        <button @click="() => (data.isDialogCropAvatar = false)" class="app-btn">Huỷ</button>
        <button @click="handleCrop" class="app-btn app-btn-primary">Xác nhận</button>
      </div>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.user-profile-page {
  display: flex;
  flex-direction: column;

  &__container {
    padding-top: 40px;
    padding-bottom: 40px;
    display: flex;
    flex-direction: row;
    column-gap: 30px;

    &__profile {
      padding: 20px;
      min-height: 200px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #ffffff;
      border: $border;
      border-radius: $borderRadius;
      &__avatar-wrapper {
        position: relative;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        &__avatar {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
        &__btn-edit {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: $colorActive;
          display: flex;
          justify-content: center;
          align-items: center;
          fill: #ffffff;
        }
      }
      &__title {
        margin-top: 10px;
        color: #0f0f0f;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        text-transform: uppercase;
      }
      &__subtitle {
        color: $colorNeutral;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
      }
      &__status {
        margin-top: 5px;
      }
    }

    &__menu {
      padding: 15px;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      row-gap: 5px;
      background: #ffffff;
      border: $border;
      border-radius: $borderRadius;
      &__item {
        height: 50px;
        padding: 12px;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-items: center;
        column-gap: 15px;
        border-radius: $borderRadiusSmall;
        &:hover,
        &.active {
          background: #f2f2f2;
          .img-wrapper {
            fill: #0f0f0f;
          }
          span {
            color: #0f0f0f;
          }
        }
        .img-wrapper {
          width: 26px;
          height: 26px;
          display: flex;
          justify-content: center;
          align-items: center;
          fill: $colorNeutral;
        }
        span {
          font-style: normal;
          font-weight: normal;
          font-size: 15px;
          color: $colorNeutral;
        }
      }
    }
  }
}
.user-avatar-dialog {
  &__cropper {
    min-height: 150px;
  }
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, ref, onMounted, computed } from 'vue';
import { useInit } from '@/services/shared/utils';
import {
  findCurrentEmployee,
  updateCurrentEmployee,
  changePassword,
  uploadAvatar,
  findEmployeeBySlugId,
} from '@/services/features/employee/employee.service';
import { EmployeeModel } from '@/services/features/employee/employee.model';
// Component
import UserAvatarComponent from '@/components/features/user-profile/UserAvatarComponent.vue';
import UserStatusComponent from '@/components/features/user-profile/UserStatusComponent.vue';
import UserProfileInfoComponent from '@/components/features/user-profile/UserProfileInfoComponent.vue';
import UserProfileEditComponent from '@/components/features/user-profile/UserProfileEditComponent.vue';
import UserProfileChangePasswordComponent from '@/components/features/user-profile/UserProfileChangePasswordComponent.vue';
import UserBusinessProfileComponent from '@/components/features/user-profile/UserBusinessProfileComponent.vue';
import IconUser from '@/components/ui/icon/IconUser.vue';
import IconLock from '@/components/ui/icon/IconLock.vue';
import 'cropperjs/dist/cropper.css';

// Định nghĩa section của component bằng Typescript
enum UserProfilePageSection {
  PROFILE_INFO = 'info',
  PROFILE_EDIT = 'edit',
  PROFILE_BUSINESS = 'business',
  CHANGE_PASSWORD = 'change-password',
}

// Định nghĩa data type của component [data] bằng Typescript
class UserProfilePageData {
  isLoading: boolean;
  isDialogCropAvatar: boolean;
  activeTab: UserProfilePageSection | string;
  currentUser: EmployeeModel | null;
  imgSrc: string;
  slugId: string;
}

// Component chính
export default defineComponent({
  name: 'UserProfilePage',
  components: {
    UserAvatarComponent,
    UserStatusComponent,
    UserProfileInfoComponent,
    UserProfileEditComponent,
    UserProfileChangePasswordComponent,
    UserBusinessProfileComponent,
    IconUser,
    IconLock,
  },
  setup(props: any, { emit }: any) {
    // Setup Default
    const { base, isLoggedIn } = useInit();
    const inputAvatar = ref<HTMLElement>();
    const avatarCropperRef = ref<any | null>(null);
    const data: any = reactive<UserProfilePageData>({
      isLoading: false,
      isDialogCropAvatar: false,
      activeTab: UserProfilePageSection.PROFILE_INFO,
      currentUser: null,
      imgSrc: '',
      slugId: base.route.params.id as string,
    });
    // Computed
    data.isLoggedIn = isLoggedIn;
    // Function
    const getUserData = async () => {
      data.isLoading = true;
      try {
        const model: EmployeeModel = await findCurrentEmployee();
        data.currentUser = model;
      } finally {
        data.isLoading = false;
      }
    };

    const getUserDataSlugId = async (slugId: string) => {
      data.isLoading = true;
      try {
        const model: EmployeeModel = await findEmployeeBySlugId(slugId);
        data.currentUser = model;
      } finally {
        data.isLoading = false;
      }
    };

    // Chuyển tab
    const switchTab = (activeTab: UserProfilePageSection) => {
      data.activeTab = activeTab;
      // Add query param to url
      if (base.route.name) {
        base.router.replace({
          name: base.route.name.toString(),
          query: { activeTab: data.activeTab },
        });
      }
    };

    const onChangePassword = async (value: any) => {
      data.isLoading = true;
      try {
        if (value) {
          const response = await changePassword(value);
          if (response.isSuccess) {
            base.toast.success('Đổi password thành công!');
            switchTab(UserProfilePageSection.PROFILE_INFO);
          }
        } else {
          base.toast.error('Vui lòng kiểm tra lại thông tin');
        }
      } finally {
        data.isLoading = false;
      }
    };

    const onUpdateUser = async (value: any) => {
      data.isLoading = true;
      try {
        if (value) {
          const response = await updateCurrentEmployee(value);
          if (response.isSuccess) {
            base.toast.success('Chỉnh sửa thông tin user thành công.');
            switchTab(UserProfilePageSection.PROFILE_INFO);
            getUserData();
          }
        } else {
          base.toast.error('Vui lòng kiểm tra lại thông tin');
        }
      } finally {
        data.isLoading = false;
      }
    };

    const getUserSubtitle = (user: any) => {
      if (!user) {
        return '';
      }
      const listSubtitle = [];
      if (user.role) {
        listSubtitle.push(user.role.name);
      } else {
        listSubtitle.push('Tư vấn viên');
      }
      if (user.pos) {
        listSubtitle.push(user.pos.name);
      }
      return listSubtitle.join(' - ');
    };

    const onUpload = async (file: any) => {
      data.isLoading = true;
      try {
        if (data.currentUser.id) {
          const response = await uploadAvatar(data.currentUser.id, file);
          if (response.isSuccess) {
            data.currentUser.avatarUrl = response.result.absoluteUrl;
            data.currentUser.avatarThumbnailUrl = response.result.thumbnailUrl;
          }
        }
      } finally {
        data.isLoading = false;
      }
    };

    const editAvatar = () => {
      if (inputAvatar.value) {
        inputAvatar.value.click();
      }
    };

    const updateAvatar = async (e: any) => {
      try {
        const file = e.target.files[0];
        if (!file.type.includes('image/')) {
          base.toast.error('Vui lòng chọn hình ảnh');
          return;
        }
        if (typeof FileReader === 'function') {
          const reader = new FileReader();
          reader.onload = (event) => {
            avatarCropperRef.value.cropper.replace(event.target?.result);
          };
          reader.readAsDataURL(file);
        }
      } finally {
        data.isDialogCropAvatar = true;
      }
    };

    const handleCrop = () => {
      try {
        if (avatarCropperRef.value) {
          avatarCropperRef.value.initCrop();
          data.imgSrc = avatarCropperRef.value.getCroppedCanvas().toDataURL('image/png');
          avatarCropperRef.value.getCroppedCanvas().toBlob((blob: any) => {
            const formData = new FormData();
            formData.append('files', blob, 'avatar.png');
            onUpload(formData);
          });
        }
      } finally {
        data.isDialogCropAvatar = false;
      }
    };

    onMounted(async () => {
      // Load query param from url
      if (base.route.query && base.route.query.activeTab && typeof base.route.query.activeTab === 'string') {
        data.activeTab = base.route.query.activeTab;
      } else {
        switchTab(UserProfilePageSection.PROFILE_INFO);
      }
      data.isLoading = true;
      try {
        if (data.slugId) {
          switchTab(UserProfilePageSection.PROFILE_BUSINESS);
          getUserDataSlugId(data.slugId);
        } else {
          getUserData();
        }
      } finally {
        data.isLoading = false;
      }
    });
    return {
      // Enum
      UserProfilePageSection,
      // HTML element ref
      inputAvatar,
      avatarCropperRef,
      // Component reactive data
      data,
      // Methods
      switchTab,
      onChangePassword,
      onUpdateUser,
      getUserSubtitle,
      editAvatar,
      updateAvatar,
      handleCrop,
    };
  },
});
</script>
