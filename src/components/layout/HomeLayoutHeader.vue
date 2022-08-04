<template>
  <div class="home-layout-header unselectable">
    <div class="home-layout-header__container container-xl">
      <router-link :to="{ name: 'home' }" custom v-slot="{ href, navigate }">
        <div :href="href" @click="navigate" class="home-layout-header__section-left">
          <div class="home-layout-header__logo">
            <AppLogo />
          </div>
          <!-- <div class="px-1 d-flex flex-column">
            <span class="home-layout-header__title">PROPCOM</span>
            <span class="home-layout-header__sub-title"
              >Kết nối môi giới bền vững</span
            >
          </div> -->
        </div>
      </router-link>
      <div class="home-layout-header__section-middle">
        <!-- <a class="home-layout-header__menu-item">
          <div class="header-logo header-logo-propcom"></div>
          <div class="header-logo-line"></div>
        </a> -->
        <a href="https://propcom.vn" class="home-layout-header__menu-item">
          <div class="header-logo header-logo-home"></div>
          <div class="header-logo-line"></div>
        </a>
        <router-link :to="{ name: 'group' }" class="home-layout-header__menu-item">
          <div class="header-logo header-logo-group"></div>
          <div class="header-logo-line"></div>
        </router-link>
        <router-link v-if="data.isLoggedIn" :to="{ name: 'lead' }" class="home-layout-header__menu-item">
          <div class="header-logo header-logo-lead"></div>
          <div class="header-logo-line"></div>
        </router-link>
        <router-link v-if="data.isLoggedIn" :to="{ name: 'propskill' }" class="home-layout-header__menu-item">
          <div class="header-logo header-logo-propskill"></div>
          <div class="header-logo-line"></div>
        </router-link>

        <!-- <a class="home-layout-header__menu-item">
          <div class="header-logo header-logo-event"></div>
          <div class="header-logo-line"></div>
        </a>
        <a class="home-layout-header__menu-item">
          <div class="header-logo header-logo-news"></div>
          <div class="header-logo-line"></div>
        </a> -->
      </div>
      <div class="home-layout-header__section-right">
        <template v-if="data.isLoggedIn">
          <Popover>
            <PopoverButton as="div" class="home-layout-header__item-user">
              <UserAvatarComponent :currentUser="data.currentUser" />
            </PopoverButton>
            <!-- Dropdown -->
            <PopoverPanel as="div" v-slot="{ close }" class="home-layout-header__dropdown"
              ><div v-if="data.currentUser" class="home-layout-header__dropdown__user">
                <UserAvatarComponent
                  :currentUser="data.currentUser"
                  class="home-layout-header__dropdown__user__avatar"
                />
                <div class="d-flex flex-column">
                  <span class="home-layout-header__dropdown__user__title">{{ data.currentUser.name }}</span>
                  <a
                    href="javascript:;"
                    class="home-layout-header__dropdown__user__sub-title"
                    @click="
                      close();
                      goToProfilePage();
                    "
                    >Xem thông tin cá nhân</a
                  >
                </div>
              </div>
              <div
                class="home-layout-header__dropdown__item"
                @click="
                  close();
                  logout();
                "
              >
                <div class="home-layout-header__dropdown__item__img-wapper">
                  <img src="@/assets/icons/colorful/icon_logout.svg" />
                </div>
                <span>Đăng xuất</span>
              </div>
            </PopoverPanel>
          </Popover>
        </template>
        <template v-else>
          <el-button size="small" class="secondary" @click="goToLoginPage">Đăng nhập</el-button>
          <el-button size="small" class="primary" @click="goToRegisterPage">Đăng ký</el-button></template
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-layout-header {
  position: sticky;
  top: 0;
  z-index: $appZindexHeader;
  height: $appHeaderHeight;
  background: #ffffff;
  box-shadow: $boxShadow;

  &__container {
    height: 100%;
    display: flex;
    flex-direction: row;
  }

  &__section-left {
    cursor: pointer;
    width: 250px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  &__section-middle {
    flex: 1 1 auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  &__section-right {
    width: 250px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    position: relative;
  }

  &__logo {
    height: 40px;
    img {
      height: 100%;
    }
  }

  &__title {
    color: #0f0f0f;
    font-size: 28px;
    font-weight: 700;
    line-height: 1.1;
  }

  &__sub-title {
    font-size: 12px;
  }

  &__menu-item {
    cursor: pointer;
    margin: 0 20px;
    width: 60px;
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    fill: #a7a7a7;
    .header-logo {
      width: 40px;
      height: 40px;
    }
    .header-logo-line {
      width: 100%;
      height: 4px;
      background-color: transparent;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
    }
    .header-logo-propcom {
      background: url('~@/assets/images/header_propcom.png') no-repeat center;
    }
    .header-logo-home {
      background: url('~@/assets/images/header_home.png') no-repeat center;
    }
    .header-logo-group {
      background: url('~@/assets/images/header_group.png') no-repeat center;
    }
    .header-logo-event {
      background: url('~@/assets/images/header_event.png') no-repeat center;
    }
    .header-logo-news {
      background: url('~@/assets/images/header_news.png') no-repeat center;
    }
    .header-logo-lead {
      background: url('~@/assets/images/header_lead.png') no-repeat center;
    }
    .header-logo-propskill {
      background: url('~@/assets/images/header_propskill.png') no-repeat center;
    }
    &:hover,
    &.active {
      .header-logo-line {
        background-color: $colorPrimary;
      }
      .header-logo-propcom {
        background-image: url('~@/assets/images/header_propcom_hover.png');
      }
      .header-logo-home {
        background-image: url('~@/assets/images/header_home_hover.png');
      }
      .header-logo-group {
        background-image: url('~@/assets/images/header_group_hover.png');
      }
      .header-logo-propskill {
        background-image: url('~@/assets/images/header_propskill_hover.png');
      }
      // .header-logo-event {
      //   background-image: url("~@/assets/images/header_event_hover.png");
      // }
      // .header-logo-news {
      //   background-image: url("~@/assets/images/header_news_hover.png");
      // }
    }
  }

  ::v-deep &__item-user {
    margin-left: 5px;
    cursor: pointer;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: $border;
    background: #ffffff;
    transition: 0.3s;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }

  ::v-deep &__item-header {
    margin-left: 5px;
    cursor: pointer;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: $border;
    background: #ffffff;
    transition: 0.3s;
    overflow: hidden;
    &:hover,
    &:focus {
      background: #ffd6d3;
    }
  }

  &__name {
    color: #ffffff;
    font-size: 14px;
    margin: 0 10px;
  }

  ::v-deep &__dropdown {
    position: absolute;
    margin-top: 5px;
    right: 0px;
    min-width: 240px;
    max-width: 340px;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    border-radius: $borderRadius;
    box-shadow: $boxShadow;
    border: $border;

    &__user {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 10px 0;
      &__avatar {
        margin-right: 10px;
        width: 40px;
        height: 40px;
      }
      &__title {
        color: #0f0f0f;
        font-size: 14px;
        font-weight: 500;
        line-height: 1.2;
      }
      &__sub-title {
        color: #a7a7a7;
        font-size: 12px;
      }
    }

    &__item {
      cursor: pointer;
      padding: 10px 5px;
      display: flex;
      flex-direction: row;
      align-items: center;
      &:hover,
      &:focus & {
        color: $colorPrimary;
      }
      &:hover &__img-wapper,
      &:focus &__img-wapper {
        fill: $colorPrimary;
      }
      &:not(:last-child) {
        border-bottom: $border;
      }
      &__img-wapper {
        width: 20px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-right: 15px;
        fill: $colorNeutral;
      }
      span {
        font-size: 14px;
      }
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, reactive, onMounted, computed } from 'vue';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import { useInit } from '@/services/shared/utils';
import { ACTIONS_AUTH } from '@/store/modules/auth';
import AppLogo from '@/components/ui/icon/AppLogo.vue';
import UserAvatarComponent from '@/components/features/user-profile/UserAvatarComponent.vue';

export default defineComponent({
  name: 'HomeLayoutHeader',
  components: {
    AppLogo,
    Popover,
    PopoverButton,
    PopoverPanel,
    UserAvatarComponent,
  },
  setup(props: any, { emit }: any) {
    // Setup Default
    const { base, isLoggedIn } = useInit();
    const data: any = reactive({
      isLoading: false,
      isLoggedIn: null,
      currentUser: null,
    });
    // Computed
    data.isLoggedIn = isLoggedIn;
    // Function
    onMounted(async () => {
      if (data.isLoggedIn) {
        const response = await base.store.dispatch(`${ACTIONS_AUTH.ROOT}/${ACTIONS_AUTH.GET_USER_DETAIL}`);
        data.currentUser = response;
      }
    });

    const goToLoginPage = () => {
      base.router.push({ name: 'login' });
    };

    const goToRegisterPage = () => {
      base.router.push({ name: 'signup' });
    };

    const goToProfilePage = () => {
      base.router.push({ name: 'profile' });
    };

    const goToHomePage = () => {
      base.router.push({ name: 'home' });
    };

    const logout = async () => {
      await base.store.dispatch(`${ACTIONS_AUTH.ROOT}/${ACTIONS_AUTH.LOGOUT}`);
      // Điều hướng về màn hình home nếu đang ở trang yêu cầu đăng nhập
      if (base.router.currentRoute.value && base.router.currentRoute.value.meta) {
        base.router.push({ name: 'home' });
      }
    };

    return {
      // Component reactive data
      data,
      // Function
      goToLoginPage,
      goToProfilePage,
      goToHomePage,
      goToRegisterPage,
      logout,
    };
  },
});
</script>
