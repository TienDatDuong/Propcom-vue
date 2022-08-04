<template>
  <div class="home-filter">
    <span class="home-filter__title"
      >Chào mừng bạn tham gia cộng đồng Propcom</span
    >
    <span class="home-filter__sub-title"
      >+500 sản phẩm đang chờ bạn khám phá. Hãy tìm kiếm nhanh sản phẩm phù hợp
      với mình nhé!</span
    >
    <div class="home-filter__filter">
      <div class="home-filter__filter__dropdown"></div>
      <div class="home-filter__filter__input">
        <input v-model="data.searchText" placeholder="Tìm kiếm..." />
      </div>
      <a class="home-filter__filter__search-button app-hover-effect" @click="searchProject">
        <IconSearchSvg />
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-filter {
  height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("~@/assets/bg_filter.png");
  background-position: center;
  background-size: auto 220px, contain;

  &__title {
    color: #ffffff;
    font-size: 24px;
  }

  &__sub-title {
    color: #ffd6d3;
    font-size: 14px;
  }

  &__filter {
    margin-top: 20px;
    width: 100%;
    max-width: 900px;
    height: 50px;
    display: flex;
    flex-direction: row;
    border-radius: 60px;
    background-color: #ffffff;
    overflow: hidden;
    box-shadow: $boxShadow;

    &__dropdown {
      width: 180px;
      height: 100%;
      border-right: 1px solid #d6d6d6;
    }

    &__input {
      flex: 1;
      input {
        width: 100%;
        height: 100%;
        padding: 0 15px;
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
import { reactive, onMounted } from 'vue';
import { Form } from 'vee-validate';
import * as Yup from 'yup';
import { useInit } from '@/services/shared/utils';
import IconSearchSvg from '@/assets/icons/colorful/icon_search.svg';

export default {
  name: 'HomeFilterComponent',
  components: {
    IconSearchSvg,
  },
  // props: {
  //   model: {
  //     type: Object,
  //     default: null,
  //     required: true,
  //   },
  // },
  setup(props: any, { emit }: any) {
    // Setup Default
    const { base } = useInit();
    const data = reactive({
      isLoading: false,
      searchText: '',
    });

    const searchProject = async () => {
      if (!data.searchText) {
        return;
      }
      data.isLoading = true;
      try {
        // TODO search project
        // await searchSth(data.searchText);
      } finally {
        data.isLoading = false;
      }
    };
    return {
      data,
      // Function
      searchProject,
    };
  },
};
</script>