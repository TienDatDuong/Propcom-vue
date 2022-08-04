<template>
  <!-- Loading skeleton items -->
  <div v-if="data.isLoading" class="investor-suggest-aside">
    <span class="investor-suggest-aside__title">Gợi ý gian hàng cho bạn</span>
    <div class="investor-suggest-aside__card">
      <template v-for="index in 4" :key="index">
        <InvestorListItemAsideSkeleton />
      </template>
    </div>
    <button class="app-btn app-btn-large" @click="goToInvestorSuggestPage">Khám phá</button>
  </div>
  <!-- Real items -->
  <div v-if="!data.isLoading" class="investor-suggest-aside">
    <span class="investor-suggest-aside__title">Gợi ý gian hàng cho bạn</span>
    <!-- Items -->
    <template v-if="data.items && data.items.length">
      <div class="investor-suggest-aside__card">
        <div v-for="(item, index) in data.items" :key="index" class="investor-suggest-aside__card__item">
          <template v-if="item.logo">
            <div
              class="investor-suggest-aside__card__item__image"
              :style="
                item.logo && {
                  'background-image': 'url(' + encapsulateUrl(item.logo) + ')',
                }
              "
            ></div>
          </template>
          <template v-else>
            <img src="@/assets/images/default_image.svg" class="investor-suggest-aside__card__item__image" />
          </template>
          <div class="investor-suggest-aside__card__item__info">
            <span class="investor-suggest-aside__card__item__info__title">{{ item.name }}</span>
            <div class="investor-suggest-aside__card__item__info__report-container">
              <div class="investor-suggest-aside__card__item__info__report">
                <span class="investor-suggest-aside__card__item__info__report__label">Tổng dự án:</span>
                <span class="investor-suggest-aside__card__item__info__report__value">{{
                  item.projectTotal ? formatNumber(item.projectTotal) : 'Đang cập nhật'
                }}</span>
              </div>
              <div class="investor-suggest-aside__card__item__info__report">
                <span class="investor-suggest-aside__card__item__info__report__label">Sản phẩm:</span>
                <span class="investor-suggest-aside__card__item__info__report__value">{{
                  item.productTotal ? formatNumber(item.productTotal) : 'Đang cập nhật'
                }}</span>
              </div>
            </div>
            <button class="app-btn" @click="goToInvestorDetailPage(item.id)">xem gian hàng</button>
          </div>
        </div>
      </div>
    </template>
    <!-- Empty -->
    <template v-else>
      <AppEmptyComponent title="Không có dữ liệu">
        <img src="@/assets/images/placeholder_group.svg" />
      </AppEmptyComponent>
    </template>
    <!-- <button class="app-btn app-btn-large" @click="goToInvestorSuggestPage">Khám phá</button> -->
  </div>
</template>

<style lang="scss" scoped>
.investor-suggest-aside {
  width: 100%;
  & > *:not(:last-child) {
    margin-bottom: 10px;
  }
  &__title {
    margin-bottom: 12px;
    display: block;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    color: $colorNeutral;
  }
  &__card {
    padding: 20px;
    background-color: #ffffff;
    border: $border;
    border-radius: $borderRadius;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    &__item {
      display: flex;
      flex-direction: row;
      border-radius: $borderRadius;
      background: white;
      & > *:not(:last-child) {
        margin-right: 16px;
      }
      &__image {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(181.77deg, #dd0000 1.5%, #840000 146.62%);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      }
      &__info {
        flex: 1;
        display: flex;
        flex-direction: column;
        row-gap: 5px;
        &__title {
          font-style: normal;
          font-weight: bold;
          font-size: 13px;
          line-height: 150%;
          text-transform: uppercase;
          color: #0f0f0f;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        &__report-container {
          display: flex;
          flex-wrap: wrap;
          flex-direction: row;
          column-gap: 10px;
        }
        &__report {
          display: flex;
          justify-content: flex-start;
          column-gap: 4px;
          align-items: center;
          border-radius: 10px;
          font-style: normal;
          font-weight: normal;
          font-size: 12px;
          line-height: 14px;
          white-space: nowrap;
          &__label {
            color: #5a5a5a;
          }
          &__value {
            color: #dd0000;
          }
        }
      }
    }
  }
  .app-btn {
    width: 100%;
  }
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, watch } from 'vue';
import { useInit, formatDate, encapsulateUrl, formatNumber } from '@/services/shared/utils';
import { InvestorModel } from '@/services/features/investor/investor.model';
import InvestorListItemAsideSkeleton from '@/components/skeleton/investor/InvestorListItemAsideSkeleton.vue';

// Định nghĩa data type của component [data] bằng Typescript
class InvestorSuggestAsideComponentData {
  isLoading: boolean;
  items: InvestorModel[] | null;
}

// Định nghĩa data type của component [props] bằng Typescript
class InvestorSuggestAsideComponentProps {
  isLoading: boolean;
  investorSuggest: any[] | null;
}

export default defineComponent({
  name: 'InvestorSuggestAsideComponent',
  components: { InvestorListItemAsideSkeleton },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    investorSuggest: {
      type: Array,
      default: null,
    },
  },
  setup(props: InvestorSuggestAsideComponentProps) {
    // Setup Default
    const { base } = useInit();
    const data = reactive<InvestorSuggestAsideComponentData>({
      isLoading: props.isLoading,
      items: props.investorSuggest,
    });
    watch(
      () => props.isLoading,
      () => (data.isLoading = props.isLoading)
    );
    watch(
      () => props.investorSuggest,
      () => (data.items = props.investorSuggest)
    );
    // Functions
    const goToInvestorDetailPage = (id: string) => base.router.push({ name: 'investor-detail', params: { id } });
    const goToInvestorSuggestPage = () => base.router.push({ name: 'investor-suggest' });
    return {
      formatDate,
      formatNumber,
      encapsulateUrl,
      // Component reactive data
      data,
      // Functions
      goToInvestorDetailPage,
      goToInvestorSuggestPage,
    };
  },
});
</script>