<template>
  <div class="investor-detail-aside-component">
    <div class="investor-detail-aside-component__header">
      <span class="investor-detail-aside-component__header__title">thông tin</span>
    </div>
    <div class="investor-detail-aside-component__body">
      <template v-if="data.dataSource && data.dataSource.phone">
        <div class="investor-detail-aside-component__body__item">
          <div class="investor-detail-aside-component__body__item__boder-icon">
            <img src="@/assets/feature/investor/phone-icon.svg" />
          </div>
          <span class="investor-detail-aside-component__body__item__content"> {{ data.dataSource?.phone }} </span>
        </div>
      </template>
      <template v-if="data.dataSource && data.dataSource.email">
        <div class="investor-detail-aside-component__body__item">
          <div class="investor-detail-aside-component__body__item__boder-icon">
            <img src="@/assets/feature/investor/mail-icon.svg" />
          </div>
          <span class="investor-detail-aside-component__body__item__content"> {{ data.dataSource?.email }} </span>
        </div>
      </template>
      <template v-if="data.dataSource && data.dataSource.facebook">
        <div class="investor-detail-aside-component__body__item">
          <div class="investor-detail-aside-component__body__item__boder-icon">
            <img src="@/assets/feature/investor/facebook-icon.svg" />
          </div>
          <a
            :href="data.dataSource.facebook"
            target="_blank"
            class="investor-detail-aside-component__body__item__link"
            >{{ data.dataSource?.facebook }}</a
          >
        </div>
      </template>
      <template v-if="data.dataSource && data.dataSource.website">
        <div class="investor-detail-aside-component__body__item">
          <div class="investor-detail-aside-component__body__item__boder-icon">
            <img src="@/assets/feature/investor/website-icon.svg" />
          </div>
          <a
            :href="data.dataSource.website"
            target="_blank"
            class="investor-detail-aside-component__body__item__link"
            >{{ data.dataSource?.website }}</a
          >
        </div>
      </template>
      <template v-if="data.dataSource && data.dataSource.address">
        <div class="investor-detail-aside-component__body__item">
          <div class="investor-detail-aside-component__body__item__boder-icon">
            <img src="@/assets/feature/investor/location-icon.svg" />
          </div>
          <span class="investor-detail-aside-component__body__item__content">{{ data.dataSource?.address }}</span>
        </div>
      </template>
      <template v-if="data.dataSource && data.dataSource.description">
        <div class="investor-detail-aside-component__body__item">
          <div class="investor-detail-aside-component__body__item__boder-icon">
            <img src="@/assets/feature/investor/warning-icon.svg" />
          </div>
          <span class="investor-detail-aside-component__body__item__content">{{ data.dataSource?.description }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.investor-detail-aside-component {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-radius: $borderRadius;
  border: $border;
  overflow: hidden;
  &__header {
    height: 40px;
    background: #dd0000;
    display: flex;
    justify-content: center;
    align-items: center;
    &__title {
      font-style: normal;
      font-weight: bold;
      font-size: 13px;
      text-align: center;
      text-transform: uppercase;
      color: #ffffff;
    }
  }
  &__body {
    padding: 15px 20px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    word-break: break-word;
    &__item {
      display: flex;
      flex-direction: row;
      column-gap: 12px;
      align-items: flex-start;
      justify-content: flex-start;
      &__boder-icon {
        position: relative;
        width: 20px;
        height: 20px;
        background-color: $colorPrimary;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 10px;
          height: 10px;
        }
      }
      &__content {
        flex: 1;
        font-size: 13px;
        color: $textColor;
        text-align: justify;
      }
      &__link {
        flex: 1;
        font-size: 13px;
        color: $textColor;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        color: $colorPrimary;
      }
    }
  }
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, watch } from 'vue';
import { useInit } from '@/services/shared/utils';
import { InvestorModel } from '@/services/features/investor/investor.model';

// Định nghĩa data type của component [props] bằng Typescript
class InvestorHeaderComponentProps {
  investor: InvestorModel | null | undefined;
}

// Định nghĩa data type của component [data] bằng Typescript
class InvestorDetailAsideComponentData {
  isLoading: boolean;
  dataSource?: InvestorModel;
}

export default defineComponent({
  name: 'InvestorDetailAsideComponent',
  props: {
    investor: {
      type: Object as () => any | null | undefined,
      default: null,
    },
  },
  setup(props: InvestorHeaderComponentProps, { emit }: any) {
    const { base } = useInit();
    const data = reactive<InvestorDetailAsideComponentData>({
      isLoading: false,
      dataSource: props.investor || new InvestorModel(),
    });
    watch(
      () => props.investor,
      (newValue, oldValue) => {
        data.dataSource = newValue || new InvestorModel();
      }
    );
    // Function

    return {
      // Component reactive data
      data,
    };
  },
});
</script>
