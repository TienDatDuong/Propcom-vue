<template>
  <div class="app__breadcrumb-bar-component">
    <div class="app__breadcrumb-bar-component__breadcrumb">
      <template v-for="(item, index) in breadcrumb" :key="index">
        <router-link :to="{ name: item.routeName, params: item.params }"> {{ item.text }} </router-link>
        <span v-if="index !== breadcrumb.length - 1"> / </span>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app__breadcrumb-bar-component {
  width: 100%;
  min-height: 47px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: $colorPrimary;
  background-position: center;
  background-size: auto 70px, contain;
  &__breadcrumb,
  &__breadcrumb > a {
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    color: #ffd6d3;
    text-decoration: none;
  }
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { useInit } from '@/services/shared/utils';

export default defineComponent({
  name: 'AppBreadcrumbBarComponent',
  setup(props: any, { emit }: any) {
    const { base } = useInit();
    return {
      // Base
      breadcrumb:
        base.route.meta?.breadcrumb && Array.isArray(base.route.meta?.breadcrumb) ? base.route.meta?.breadcrumb : [], // Dữ liệu để hiển thị breadcrumb (thanh điều hướng)
    };
  },
});
</script>
