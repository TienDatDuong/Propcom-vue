<template>
  <div class="investor-header-component">
    <!-- https://www.w3schools.com/howto/howto_css_breadcrumbs.asp -->
    <AppBreadcrumbBarComponent />

    <div
      class="investor-header-component__top"
      :style="
        data.investor &&
        data.investor.banner && {
          'background-image': 'url(' + encapsulateUrl(data.investor.banner) + ')',
        }
      "
    >
      <img
        v-if="!data.investor.banner"
        src="@/assets/images/default_image.svg"
        class="investor-header-component__top__default-logo"
      />
      <div class="investor-header-component__top__overlay"></div>
      <div class="container-xl investor-header-component__top__container">
        <div class="investor-header-component__top__container__info">
          <div class="investor-header-component__top__container__info__avatar-container">
            <template v-if="data.investor && data.investor.logo">
              <div
                class="investor-header-component__top__container__info__avatar-container__image"
                :style="
                  data.investor.logo && {
                    'background-image': 'url(' + encapsulateUrl(data.investor.logo) + ')',
                  }
                "
              ></div>
            </template>
            <template v-else>
              <div class="investor-header-component__top__container__info__avatar-container__image-default">
                <img src="@/assets/images/default_image.svg" alt="Avatar" />
              </div>
            </template>
          </div>
          <span class="investor-header-component__top__container__info__title">{{ data.investor.name }}</span>
        </div>

        <div class="investor-header-component__top__container__actions">
          <!-- <button class="app-btn app-btn-secondary">TIN NHẮN</button>-->
          <!-- Bọc text button trong thẻ span thì sẽ căn với icon đẹp hơn (style global của class app-btn) -->
          <!--<button class="app-btn app-btn-primary">
            <span>THEO DÕI</span>
            <img src="@/assets/feature/investor/check-icon.svg" />
          </button> -->
        </div>
      </div>
    </div>

    <div class="container-xl investor-header-component__middle">
      <div class="investor-header-component__middle__list">
        <div class="investor-header-component__middle__list__item">
          <img
            class="investor-header-component__middle__list__item__icon"
            src="@/assets/feature/investor/home-icon.svg"
          />
          <span class="investor-header-component__middle__list__item__label">
            Tổng dự án:
            <span v-if="data.investor" class="investor-header-component__middle__list__item__value">
              {{ data.investor.projectTotal ? formatNumber(data.investor.projectTotal) : 'Đang cập nhật' }}
            </span>
          </span>
        </div>
        <div class="investor-header-component__middle__list__item">
          <img
            class="investor-header-component__middle__list__item__icon"
            src="@/assets/feature/investor/document-icon.svg"
          />
          <span class="investor-header-component__middle__list__item__label">
            Sản phẩm:
            <span v-if="data.investor" class="investor-header-component__middle__list__item__value">
              {{ data.investor.productTotal ? formatNumber(data.investor.productTotal) : 'Đang cập nhật' }}
            </span>
          </span>
        </div>
        <div class="investor-header-component__middle__list__item">
          <img
            class="investor-header-component__middle__list__item__icon"
            src="@/assets/feature/investor/calendar-icon.svg"
          />
          <span class="investor-header-component__middle__list__item__label">
            Tham gia:
            <span class="investor-header-component__middle__list__item__value">
              {{ getTimeSince(data.investor.participatedDate) }}
            </span>
          </span>
        </div>
      </div>
    </div>

    <div class="container-xl investor-header-component__bottom">
      <div
        class="investor-header-component__bottom__tab"
        :class="data.activeTab === InvestorDetailPageSection.ALL && 'investor-header-component__bottom__tab--active'"
        @click="switchTab(InvestorDetailPageSection.ALL)"
      >
        Tất cả dự án
      </div>
      <div
        class="investor-header-component__bottom__tab"
        :class="data.activeTab === InvestorDetailPageSection.CAN_HO && 'investor-header-component__bottom__tab--active'"
        @click="switchTab(InvestorDetailPageSection.CAN_HO)"
      >
        Căn hộ
      </div>
      <div
        class="investor-header-component__bottom__tab"
        :class="
          data.activeTab === InvestorDetailPageSection.DAT_NEN && 'investor-header-component__bottom__tab--active'
        "
        @click="switchTab(InvestorDetailPageSection.DAT_NEN)"
      >
        Đất nền
      </div>
      <div
        class="investor-header-component__bottom__tab"
        :class="data.activeTab === InvestorDetailPageSection.RESORT && 'investor-header-component__bottom__tab--active'"
        @click="switchTab(InvestorDetailPageSection.RESORT)"
      >
        Khu nghỉ dưỡng/Phức hợp
      </div>
      <div
        class="investor-header-component__bottom__tab"
        :class="
          data.activeTab === InvestorDetailPageSection.BIET_THU && 'investor-header-component__bottom__tab--active'
        "
        @click="switchTab(InvestorDetailPageSection.BIET_THU)"
      >
        Biệt thự
      </div>
      <div
        class="investor-header-component__bottom__tab"
        :class="
          data.activeTab === InvestorDetailPageSection.SHOPHOUSE && 'investor-header-component__bottom__tab--active'
        "
        @click="switchTab(InvestorDetailPageSection.SHOPHOUSE)"
      >
        Shophouse
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.investor-header-component {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  background-color: $colorWhite;
  box-shadow: $boxShadowInset;

  &__top {
    position: relative;
    height: 200px;
    background: linear-gradient(181.77deg, #dd0000 1.5%, #840000 146.62%);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;

    &__default-logo {
      position: absolute;
      top: calc(50% - 90px);
      left: calc(50% - 150px);
      width: 300px;
    }

    /* Overlay phủ hiệu ứng bóng mờ đen lên ảnh nền để tên gian hàng hiển thị rõ hơn */
    &__overlay {
      z-index: 1;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(179.67deg, rgba(0, 0, 0, 0.2) 37.57%, rgba(0, 0, 0, 0.4) 82.62%);
      padding: 15px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }

    &__container {
      z-index: 2;
      position: relative;
      height: 100%;
      padding: 15px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;

      // Cục chứa avatar + tên gian hàng bên trái
      &__info {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-end;
        &__avatar-container {
          position: absolute;
          top: -50px;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 2px solid #ffffff;
          overflow: hidden;
          &__image {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
          }
          &__image-default {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(181.77deg, #dd0000 1.5%, #840000 146.62%);
          }
        }
        &__title {
          margin-left: 170px; // đẩy tên gian hàng về bên phải avatar
          font-weight: bold;
          font-size: 28px;
          color: #ffffff;
          line-height: 1;
        }
      }

      // Cục chứa các button hành động bên phải banner
      &__actions {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        column-gap: 12px; // Khoảng cách giữa các item bên trong (2 button)
        .app-btn {
          min-width: 150px;
        }
      }
    }
  }

  &__middle {
    padding: 15px; // nên để padding - margin là số chẵn hoặc bội của 5
    min-height: 80px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    &__list {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      column-gap: 50px; // Khoảng cách giữa các item bên trong
      &__item {
        font-size: 13px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        column-gap: 8px; // Khoảng cách giữa các item bên trong
        &__icon {
          width: 12px;
        }
        &__label {
          color: $textColor;
        }
        &__value {
          color: $colorPrimary;
        }
      }
    }
  }

  &__bottom {
    height: 50px;
    border-top: $border;
    display: flex;
    flex-direction: row;
    column-gap: 40px;
    &__tab {
      cursor: pointer;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      color: #a7a7a7;
      &:hover {
        color: #dd0000;
      }
      &--active {
        color: #dd0000;
        border-bottom: 4px solid #dd0000;
      }
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from 'vue';
import { encapsulateUrl, formatNumber, useInit } from '@/services/shared/utils';
import { getTimeSince } from '@/services/features/group/group.service';
import { InvestorModel } from '@/services/features/investor/investor.model';

// Định nghĩa section của component bằng Typescript
enum InvestorDetailPageSection { // Dựa theo enum ProjectTypeEnum
  ALL = 'all', // Tất cả dự án
  CAN_HO = 'can-ho', // Căn hộ
  DAT_NEN = 'dat-nen', // Đất nền
  RESORT = 'resort', // Khu nghỉ dưỡng/Khu Phức hợp
  BIET_THU = 'biet-thu', // Biệt thự
  SHOPHOUSE = 'shophouse', // Shophouse/nhà ở thương mại
}

// Định nghĩa data type của component [data] bằng Typescript
class InvestorHeaderComponentData {
  isLoading: boolean;
  investor: InvestorModel;
  activeTab: InvestorDetailPageSection | string;
  investorId: string;
}

// Định nghĩa data type của component [props] bằng Typescript
class InvestorHeaderComponentProps {
  investor: InvestorModel | null | undefined;
  activeTab: InvestorDetailPageSection | string;
}

export default defineComponent({
  name: 'InvestorHeaderComponent',
  props: {
    investor: {
      type: Object as () => any | null | undefined,
      default: null,
    },
    activeTab: {
      type: String,
      default: '',
    },
  },
  emits: ['onActiveTabChange'],
  setup(props: InvestorHeaderComponentProps, { emit }: any) {
    // Setup Default
    const { base } = useInit();
    // Component reactive data
    const data = reactive<InvestorHeaderComponentData>({
      isLoading: false, // boolean
      investor: props.investor || new InvestorModel(),
      activeTab: props.activeTab,
      investorId: base.route.params.id as string,
    });
    watch(
      () => props.investor,
      (newValue, oldValue) => {
        data.investor = newValue || new InvestorModel();
      }
    );
    watch(
      () => props.activeTab,
      (newValue, oldValue) => {
        data.activeTab = newValue;
      }
    );
    // Chuyển tab
    const switchTab = (activeTab: InvestorDetailPageSection) => {
      data.activeTab = activeTab;
      emit('onActiveTabChange', activeTab);
    };
    return {
      // Component reactive data
      data,
      // Enum
      InvestorDetailPageSection,
      // Functions
      formatNumber,
      getTimeSince,
      encapsulateUrl,
      switchTab,
    };
  },
});
</script>
