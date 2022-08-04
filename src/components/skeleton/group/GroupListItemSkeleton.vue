<template>
  <div class="group-list-item-skeleton">
    <div class="group-list-item-skeleton__image app-skeletor"></div>
    <div class="group-list-item-skeleton__info">
      <div class="group-list-item-skeleton__info__title app-skeletor"></div>
      <div class="group-list-item-skeleton__info__subtitle app-skeletor"></div>
      <div class="group-list-item-skeleton__info__report-container">
        <div class="group-list-item-skeleton__info__report app-skeletor"></div>
        <div class="group-list-item-skeleton__info__report app-skeletor"></div>
        <div class="group-list-item-skeleton__info__report app-skeletor"></div>
      </div>
    </div>
    <div class="group-list-item-skeleton__action">
      <div class="group-list-item-skeleton__action__btn app-skeletor"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.group-list-item-skeleton {
  height: 110px;
  border: $border;
  border-radius: $borderRadius;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  &__image {
    width: 160px;
    height: 100%;
    border-radius: 0;
  }
  &__info {
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    & > *:not(:last-child) {
      margin-bottom: 5px;
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
        margin-right: 8px;
      }
    }
    &__report {
      width: 50px;
      height: 16px;
      border-radius: 10px;
    }
  }
  &__action {
    width: 300px;
    height: 100%;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 1px dashed #c1c1c1;
    &__btn {
      width: 100%;
      height: 36px;
      border-radius: $borderRadiusSmall;
    }
  }
}
</style>

<script lang="ts">
// Composition API
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GroupListItemSkeleton',
});
</script>