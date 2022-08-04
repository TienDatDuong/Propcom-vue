<template>
  <!-- Real items -->
  <div v-if="isLoading">
    <div class="skeleton-group-carousel">
      <div class="group-carousel-header-skeleton"></div>
      <div class="swiper-wrapper-skeleton"></div>
    </div>
  </div>

  <div v-else class="group-carousel-container">
    <div class="group-carousel" v-if="modelValue && modelValue?.length">
      <div class="">
        <div class="group-carousel__header">
          <span class="group-carousel__header__title">Khoá học theo thư mục</span>
          <a href="javascript:;" class="group-carousel__header__link" @click="goToListCategoryPage">
            <span class="group-carousel__header__link__text">Xem tất cả</span>
            <img src="@/assets/icons/colorful/icon_vector.svg" />
          </a>
        </div>
        <div class="group-carousel__swiper-container">
          <div v-show="modelValue && modelValue.length > 6" class="swiper-button swiper-button-prev app-hover-effect">
            <img src="@/assets/icons/simple/icon_left_arrow.svg" />
          </div>
          <swiper
            :slides-per-view="6"
            :space-between="10"
            :class="modelValue.length <= 6 ? 'swiper-no-swiping' : ''"
            :loop="false"
            :navigation="{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }"
          >
            <template v-if="modelValue">
              <swiper-slide v-for="(item, index) in modelValue" :key="index" :virtualIndex="index">
                <PropskillCategoryComponent :modelValue="item" :lengthName="20" />
              </swiper-slide>
            </template>
          </swiper>
          <div v-show="modelValue && modelValue.length > 6" class="swiper-button swiper-button-next app-hover-effect">
            <img src="@/assets/icons/simple/icon_right_arrow.svg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.group-carousel-skeleton {
  width: 100%;
  padding: 20px 0 50px 0;
  &__title {
    margin-bottom: 12px;
    display: block;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    color: $colorNeutral;
  }
  &__swiper-container {
    width: 100%;
    height: 180px;
    position: relative;
    display: flex;
    flex-direction: row;
    & > *:not(:last-child) {
      margin-right: 15px;
    }
    &__item {
      flex: 1;
      border-radius: $borderRadius;
      background-size: cover;
    }
  }
}
.group-carousel {
  width: 100%;
  padding: 20px 0 50px 0;
  &__header {
    margin-bottom: 17px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    &__title {
      display: block;
      font-style: normal;
      font-weight: bold;
      font-size: 20px;
      color: $colorNeutral;
    }
    &__link {
      display: flex;
      flex-direction: row;
      align-items: center;
      column-gap: 5px;
      text-decoration: none;
      &__text {
        font-weight: 500;
        font-size: 14px;
        line-height: 150%;
        color: $colorActive;
      }
    }
  }
  &__swiper-container {
    width: 100%;
    height: 180px;
    position: relative;
    .swiper-button {
      cursor: pointer;
      width: 40px;
      height: 40px;
      border: $border;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      fill: #5a5a5a;
      &:hover {
        background-color: #f2f2f2;
      }
      &.swiper-button-disabled {
        visibility: hidden;
      }
    }
    .swiper-button-prev {
      position: absolute;
      top: calc(50% - 20px);
      left: -50px;
    }
    .swiper-button-next {
      position: absolute;
      top: calc(50% - 20px);
      right: -50px;
    }
    &__item {
      position: relative;
      cursor: pointer;
      width: 100%;
      height: 180px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: $borderRadius;
      background: linear-gradient(181.77deg, #dd0000 1.5%, #840000 146.62%);
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      overflow: hidden;
      & img {
        height: 100%;
      }
      &__overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(179.67deg, rgba(0, 0, 0, 0.1) 37.57%, rgba(0, 0, 0, 0.4) 92.62%);
        padding: 15px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      }
      &__title {
        font-style: normal;
        font-weight: bold;
        font-size: 17px;
        line-height: 130%;
        color: #ffffff;
        text-transform: uppercase;
        // text-shadow: 1px 1px 2px #0f0f0f;
      }
      &__subtitle {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 150%;
        color: #ffffff;
        // text-shadow: 1px 1px 2px #0f0f0f;
      }
    }
  }
}
.skeleton-group-carousel {
  height: 297px;
  width: 1200px;
  padding: 30px 0 50px 0px;
}
.group-carousel-header-skeleton {
  height: 30px;
  margin-bottom: 17px;
  display: flex;
  flex-direction: column;
}
.swiper-wrapper-skeleton {
  height: 200px;
}

.group-carousel-header-skeleton,
.swiper-wrapper-skeleton {
  color: transparent;
  appearance: none;
  -webkit-appearance: none;
  background-color: #eee;
  border-color: #eee;
}
.group-carousel-container {
  width: 100%;
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, computed, ref, onMounted, onUnmounted, watch } from 'vue';
import { useInit } from '@/services/shared/utils';
import {} from '@/services/features/elearning/elearning.service';
import { findInvestorSuggest } from '@/services/features/investor/investor.service';
import { ApiRequestPaging } from '@/models/api-request';
import { CategoryModel } from '@/services/features/elearning/elearning.model';
import { ApiResponsePaging } from '@/models/api-response';
import { contentHide } from '@/services/shared/utils';
import PropskillCategoryComponent from './PropskillCategoryComponent.vue';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
SwiperCore.use([Navigation, Autoplay]);
class PropskillCategoryCarouselComponentProps {
  modelValue: CategoryModel[];
  isLoading: boolean;
}
// Định nghĩa data type của component [data] bằng Typescript
class PropskillCategoryCarouselComponentData {
  modelValue: CategoryModel[];
  isLoading: boolean;
}

export default defineComponent({
  name: 'PropskillCategoryCarouselComponent',
  components: { PropskillCategoryComponent },
  props: {
    modelValue: {
      type: Array as () => Array<CategoryModel>,
      default: null,
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: null,
    },
  },

  setup(props: PropskillCategoryCarouselComponentProps) {
    const { base } = useInit();
    const data = reactive<PropskillCategoryCarouselComponentData>({
      modelValue: { ...props.modelValue },
      isLoading: props.isLoading,
    });
    watch(
      () => props.isLoading,
      (newValue, oldValue) => {
        data.isLoading = newValue;
      }
    );
    const goToListCategoryPage = async () => {
      base.router.push({ name: 'propskill-category' });
    };
    return {
      contentHide,
      goToListCategoryPage,
    };
  },
});
</script>
