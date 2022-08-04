<template>
  <div class="propskill-header-component">
    <template v-if="data.isHomePage">
      <div class="app__breadcrumb-bar-component">
        <div class="app__breadcrumb-bar-component__breadcrumb">
          <template v-for="(item, index) in breadcrumb" :key="index">
            <router-link :to="{ name: item.routeName }"> {{ item.text }} </router-link>
            <span v-if="index !== breadcrumb.length - 1"> / </span>
          </template>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="app__breadcrumb-bar-component">
        <div class="propskill-header-component__breadcrumb">
          <template v-for="(item, index) in breadcrumb" :key="index">
            <router-link :to="{ name: item.routeName }">{{ item.text }}</router-link>
            <span v-if="index !== breadcrumb.length - 1"> / </span>
          </template>
        </div>
      </div>
    </template>
    <div class="propskill-header-component__filter">
      <div class="propskill-header-component__filter__input">
        <input v-model.trim="data.searchText" placeholder="Tìm kiếm..." @keyup.enter="onSearch" />
      </div>
      <a
        href="javascript:;"
        class="propskill-header-component__filter__search-button app-hover-effect"
        @click="onSearch"
      >
        <img src="@/assets/icons/colorful/icon_search.svg" />
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.propskill-header-component {
  width: 100%;
  min-height: 156px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background: url('~@/assets/bg_filter.png');
  background-position: center;
  background-size: auto 156px, contain;
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
    width: 100%;
    max-width: 878px;
    height: 50px;
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
.app__breadcrumb-bar-component {
  width: 100%;
  min-height: 72px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
// Composition API
import { defineComponent, reactive, onMounted, watch } from 'vue';

import { useInit } from '@/services/shared/utils';
import { debounce } from 'lodash';

// Định nghĩa data type của component [props] bằng Typescript
class PropskillListItemComponentProps {
  searchText?: string;
  breadcrumbName: string;
}

// Định nghĩa data type của component [data] bằng Typescript
class PropskillHeaderComponentData {
  isLoading: boolean;
  isHomePage: boolean;
  searchText: string;
  breadcrumb: any[];
  breadcrumbName: string;
}

export default defineComponent({
  name: 'PropskillHeaderComponent',
  props: {
    searchText: {
      type: String,
      default: null,
    },
    breadcrumbName: {
      type: String,
      default: null,
    },
  },
  emits: ['onSearch'],
  setup(props: PropskillListItemComponentProps, { emit }: any) {
    // Setup Default
    const { base } = useInit();
    const data = reactive<PropskillHeaderComponentData>({
      isLoading: false,
      isHomePage: false,
      searchText: props.searchText || '',
      breadcrumb:
        base.route.meta?.breadcrumb && Array.isArray(base.route.meta?.breadcrumb) ? base.route.meta?.breadcrumb : [],
      breadcrumbName: props.breadcrumbName || '',
    });
    watch(
      () => [props.searchText, props.breadcrumbName],
      (newValue, oldValue) => {
        data.searchText = newValue[0] || '';
        data.breadcrumb[2].text = newValue[1] || '';
        data.breadcrumbName = newValue[1] || '';
      }
    );
    // Functions
    const onSearch = debounce(() => {
      emit('onSearch', data.searchText);
    }, 300);

    // Life circle
    onMounted(() => {
      data.isHomePage = base.route.name === 'propskill';
    });
    return {
      // Base
      breadcrumb: data.breadcrumbName.length ? data.breadcrumb : base.route.meta?.breadcrumb || [],
      // Component reactive data
      data,
      // Functions
      onSearch,
    };
  },
});
</script>
