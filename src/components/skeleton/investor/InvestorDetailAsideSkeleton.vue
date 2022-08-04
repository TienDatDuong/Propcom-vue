<template>
  <div class="investor-detail-aside-skeleton">
    <div class="investor-detail-aside-skeleton__header">
      <span class="investor-detail-aside-skeleton__header__title">thông tin</span>
    </div>
    <div class="investor-detail-aside-skeleton__body">
      <template v-for="index in 6" :key="index">
        <div class="investor-detail-aside-skeleton__body__item">
          <div class="investor-detail-aside-skeleton__body__item__boder-icon app-skeletor"></div>
          <div class="investor-detail-aside-skeleton__body__item__content app-skeletor"></div>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.investor-detail-aside-skeleton {
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
    &__item {
      display: flex;
      flex-direction: row;
      column-gap: 12px;
      align-items: flex-start;
      justify-content: flex-start;
      &__boder-icon {
        width: 20px;
        height: 20px;
        border-radius: 50%;
      }
      &__content {
        margin-top: 4px;
        flex: 1;
        width: 100%;
        height: 13px;
      }
      &__link {
        margin-top: 4px;
        flex: 1;
        width: 100%;
        height: 13px;
      }
    }
  }
}
</style>

<script lang="ts">
// Composition API
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'InvestorDetailAsideSkeleton',
});
</script>