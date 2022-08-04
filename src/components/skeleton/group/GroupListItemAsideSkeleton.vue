<template>
  <div class="group-list-item-aside-skeleton">
    <div class="group-list-item-aside-skeleton__image app-skeletor"></div>
    <div class="group-list-item-aside-skeleton__info">
      <div class="group-list-item-aside-skeleton__info__title app-skeletor"></div>
      <div class="group-list-item-aside-skeleton__info__report-container">
        <div class="group-list-item-aside-skeleton__info__report app-skeletor"></div>
        <div class="group-list-item-aside-skeleton__info__report app-skeletor"></div>
        <div class="group-list-item-aside-skeleton__info__report app-skeletor"></div>
      </div>
      <div class="group-list-item-aside-skeleton__info__subtitle app-skeletor"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.group-list-item-aside-skeleton {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  border-radius: $borderRadius;
  overflow: hidden;
  & > *:not(:last-child) {
    margin-right: 16px;
  }
  &__image {
    width: 100px;
    height: 100px;
    border-radius: $borderRadius;
    background-color: #efefef;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  &__info {
    flex: 1;
    display: flex;
    flex-direction: column;
    & > *:not(:last-child) {
      margin-bottom: 5px;
    }
    &__title {
      height: 16px;
    }
    &__subtitle {
      height: 12px;
    }
    &__report-container {
      display: flex;
      flex-direction: row;
      column-gap: 8px;
    }
    &__report {
      min-width: 50px;
      height: 16px;
      border-radius: 10px;
    }
    &__link {
      height: 13px;
    }
  }
}
</style>

<script lang="ts">
// Composition API
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GroupListItemAsideSkeleton',
});
</script>