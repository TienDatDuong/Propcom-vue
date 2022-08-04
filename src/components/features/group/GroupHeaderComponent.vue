<template>
  <div class="group-header-component">
    <template v-if="data.isHomePage">
      <div class="group-header-component__title-container">
        <span class="group-header-component__title-container__title"
          >Chào mừng bạn tham gia cộng đồng Propcom</span
        >
        <span class="group-header-component__title-container__subtitle"
          >Propcom - Nền tảng công nghệ dành cho cộng đồng đam mê bất động sản, công nghệ và tài chính</span
        >
      </div>
    </template>
    <template v-else>
      <div class="group-header-component__breadcrumb">
        <template v-for="(item, index) in breadcrumb" :key="index">
          <router-link :to="{ name: item.routeName }">{{
            item.text
          }}</router-link>
          <span v-if="index !== breadcrumb.length - 1"> / </span>
        </template>
      </div>
    </template>
    <div class="group-header-component__filter">
      <div class="group-header-component__filter__input">
        <input v-model="data.searchText" placeholder="Tìm kiếm..." @keyup.enter="onSearch"/>
      </div>
      <a
        href="javascript:;"
        class="group-header-component__filter__search-button app-hover-effect"
        @click="onSearch"
      >
        <img src="@/assets/icons/colorful/icon_search.svg" />
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.group-header-component {
  // position: sticky;
  // top: $appHeaderHeight;
  // z-index: $appZindexSticky;
  width: 100%;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("~@/assets/bg_filter.png");
  background-position: center;
  background-size: auto 150px, contain;
  box-shadow: $boxShadow;
  &__title-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    &__title {
      font-style: normal;
      font-weight: normal;
      font-size: 22px;
      text-align: center;
      color: #ffffff;
    }
    &__subtitle {
      font-style: normal;
      font-weight: normal;
      font-size: 13px;
      text-align: center;
      color: #ffd6d3;
    }
  }

  &__breadcrumb,
  &__breadcrumb > a {
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    color: #ffd6d3;
    text-decoration: none;
  }

  &__filter {
    margin-top: 20px;
    width: 100%;
    max-width: 800px;
    height: 40px;
    display: flex;
    flex-direction: row;
    border-radius: 60px;
    background-color: #ffffff;
    overflow: hidden;
    box-shadow: $boxShadow;

    &__input {
      flex: 1;
      input {
        width: 100%;
        height: 100%;
        padding: 0 35px;
        border: none;
        outline: none;
        &::placeholder {
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          color: #c1c1c1;
        }
      }
    }

    &__search-button {
      cursor: pointer;
      width: 90px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $colorActive;
    }
  }
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, onMounted, watch } from 'vue';

import { useInit } from '@/services/shared/utils';
import { debounce } from 'lodash';

// Định nghĩa data type của component [props] bằng Typescript
class GroupListItemComponentProps {
  searchText?: string;
}

// Định nghĩa data type của component [data] bằng Typescript
class GroupHeaderComponentData {
  isLoading: boolean;
  isHomePage: boolean;
  searchText: string;
  breadcrumb: any[];
}

export default defineComponent({
  name: 'GroupHeaderComponent',
  props: {
    searchText: {
      type: String,
      default: null,
    },
  },
  emits: ['onSearch'],
  setup(props: GroupListItemComponentProps, { emit }: any) {
    // Setup Default
    const { base } = useInit();
    const data = reactive<GroupHeaderComponentData>({
      isLoading: false,
      isHomePage: false,
      searchText: props.searchText || '',
      breadcrumb: [],
    });
    watch(
      () => props.searchText,
      (newValue, oldValue) => {
        data.searchText = newValue || '';
      }
    );
    // Functions
    const onSearch = debounce(() => {
      emit('onSearch', data.searchText);
    }, 300);

    // Life circle
    onMounted(() => {
      data.isHomePage = base.route.name === 'group';
    });
    return {
      // Base
      breadcrumb: base.route.meta?.breadcrumb || [],
      // Component reactive data
      data,
      // Functions
      onSearch,
    };
  },
});
</script>