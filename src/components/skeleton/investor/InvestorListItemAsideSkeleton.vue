<template>
  <div class="investor-list-item-aside-skeleton">
    <div class="investor-list-item-aside-skeleton__image app-skeletor"></div>
    <div class="investor-list-item-aside-skeleton__info">
      <div class="investor-list-item-aside-skeleton__info__title app-skeletor"></div>
      <div class="investor-list-item-aside-skeleton__info__report-container">
        <div class="investor-list-item-aside-skeleton__info__report app-skeletor"></div>
        <div class="investor-list-item-aside-skeleton__info__report app-skeletor"></div>
        <div class="investor-list-item-aside-skeleton__info__report app-skeletor"></div>
      </div>
      <div class="investor-list-item-aside-skeleton__info__report-container">
        <div class="investor-list-item-aside-skeleton__info__report__info">
          <div class="investor-list-item-aside-skeleton__info__report__info-content app-skeletor"></div>
          <div class="investor-list-item-aside-skeleton__info__report__info-content app-skeletor"></div>
        </div>
        <div class="investor-list-item-aside-skeleton__info__report__info">
          <div class="investor-list-item-aside-skeleton__info__report__info-content app-skeletor"></div>
          <div class="investor-list-item-aside-skeleton__info__report__info-content app-skeletor"></div>
        </div>
      </div>
      <div class="investor-list-item-aside-skeleton__info__footer">
        <div class="investor-list-item-aside-skeleton__info__footer__project">
          <div class="investor-list-item-aside-skeleton__info__footer__project-avatar app-skeletor"></div>
          <div class="investor-list-item-aside-skeleton__info__footer__project-content">
            <div class="investor-list-item-aside-skeleton__info__footer__project-title app-skeletor"></div>
            <div class="investor-list-item-aside-skeleton__info__footer__project-title app-skeletor"></div>
          </div>
        </div>
        <div class="investor-list-item-aside-skeleton__info__footer__btn app-skeletor"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.investor-list-item-aside-skeleton {
  // width: 100%;
  height: 200px;
  border: $border;
  border-radius: $borderRadius;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  padding: 10px;
  &__image {
    width: 160px;
    height: 100%;
    border-radius: 10px;
  }
  &__info {
    flex: 1;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    & > *:not(:last-child) {
      margin-bottom: 10px;
    }
    &__title {
      height: 15px;
    }
    &__subtitle {
      height: 12px;
    }
    &__report-container {
      display: flex;
      flex-direction: row;
      & > *:not(:last-child) {
        margin-right: 30px;
      }
    }
    &__report {
      width: 20%;
      height: 16px;
      border-radius: 10px;
      &__info {
        width: 40%;
        &-content {
          margin-bottom: 5px;
          border-radius: 10px;
          width: 100%;
          height: 16px;
        }
      }
    }
    &__footer {
      flex: 1;
      display: flex;
      align-items: flex-end;
      border-top: 0.5px dashed $textColorLight;
      &__project {
        flex: 1;
        display: flex;
        column-gap: 10px;
        align-items: center;
        &-avatar {
          width: 40px;
          height: 40px;
          border-radius: 100%;
        }
        &-content {
          height: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          row-gap: 5px;
        }
        &-title {
          height: 10px;
          width: 100px;
          border-radius: 10px;
        }
      }
      &__btn {
        height: 40px;
        width: 200px;
        border-radius: 10px;
      }
    }
  }
  & > *:not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>

<script lang="ts">
// Composition API
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'InvestorListItemAsideSkeleton',
});
</script>
