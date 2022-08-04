<template>
  <div class="group-detail-aside-skeleton">
    <div class="group-detail-aside-skeleton__header">
      <span class="group-detail-aside-skeleton__header__title"
        >thông tin nhóm</span
      >
    </div>
    <div class="group-detail-aside-skeleton__body">
      <template v-for="index in 10" :key="index">
        <div
          class="group-detail-aside-skeleton__body__description app-skeletor"
        ></div>
      </template>
      <hr />
      <div class="group-detail-aside-skeleton__body__summary">
        <div class="group-detail-aside-skeleton__body__summary__item">
          <span
            class="
              group-detail-aside-skeleton__body__summary__item__value
              app-skeletor
            "
          ></span>
          <span class="group-detail-aside-skeleton__body__summary__item__label"
            >Thành viên</span
          >
        </div>
        <div class="group-detail-aside-skeleton__body__summary__item">
          <span
            class="
              group-detail-aside-skeleton__body__summary__item__value
              app-skeletor
            "
          ></span>
          <span class="group-detail-aside-skeleton__body__summary__item__label"
            >Bình luận</span
          >
        </div>
        <div class="group-detail-aside-skeleton__body__summary__item">
          <span
            class="
              group-detail-aside-skeleton__body__summary__item__value
              app-skeletor
            "
          ></span>
          <span class="group-detail-aside-skeleton__body__summary__item__label"
            >Bài viết</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.group-detail-aside-skeleton {
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
    &__description {
      width: 100%;
      height: 14px;
      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
    &__summary {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      &__item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        &__label {
          font-style: normal;
          font-weight: normal;
          font-size: 13px;
          color: #c1c1c1;
        }
        &__value {
          width: 80px;
          height: 15px;
        }
      }
    }
  }
}
</style>

<script lang="ts">
// Composition API
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GroupDetailAsideSkeleton',
});
</script>