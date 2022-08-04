<template>
  <div v-if="isLoading" class="skeleton">
    <div class="propskill-banner-skeleton">
      <div class="banner-img-skeleton"></div>
      <div class="banner-img-skeleton"></div>
    </div>
    <div class="slide-dot-skeleton"></div>
  </div>
  <div class="group-carousel" v-else>
    <div v-if="modelValue && modelValue?.length">
      <div class="" v-if="modelValue && modelValue?.length > 1">
        <swiper
          :slides-per-view="2"
          :space-between="15"
          :class="modelValue.length == 2 ? 'swiper-no-swiping' : ''"
          :loop="false"
          :pagination="{
            clickable: true,
            el: '.swiper-pagination',
          }"
        >
          <template v-if="modelValue.length > 0">
            <swiper-slide v-for="(item, index) in modelValue" :key="index">
              <img v-if="item?.banner" class="banner-image" :src="item.banner" />
              <img v-else class="banner-image" src="~@/assets/images/banner-default.png" />
            </swiper-slide>
          </template>
          <div v-if="modelValue.length > 2" class="swiper-pagination"></div>
        </swiper>
      </div>
      <div class="banner-single" v-else>
        <img class="banner-single-image" v-if="modelValue[0].banner" :src="modelValue[0].banner" />
        <img class="banner-single-image" v-else src="~@/assets/images/banner-default.png" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.skeleton {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  padding: 45px 0 10px 0;
}
.propskill-banner-skeleton {
  display: flex;
  flex-direction: row;
  gap: 15px;
  width: 100%;
}
.banner-img-skeleton,
.slide-dot-skeleton {
  border-radius: 10px;
  appearance: none;
  -webkit-appearance: none;
  background-color: #eee;
  border-color: #eee;
  width: 50%;
  height: 210px;
}
.slide-dot-skeleton {
  width: 100%;
  height: 20px;
}
.swiper-pagination {
  height: 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
::v-deep .swiper-pagination-bullet {
  transform: scale(0.33);
  position: relative;
  width: var(--swiper-pagination-bullet-width, var(--swiper-pagination-bullet-size, 24px));
  height: var(--swiper-pagination-bullet-height, var(--swiper-pagination-bullet-size, 24px));
  display: inline-block;
  border-radius: 50%;
  background: #f2f2f2;
  border: none;
  margin: 5px -5px 0px -5px;
  padding: 0;
  box-shadow: none;
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
}
::v-deep .swiper-pagination-bullet-active {
  background: #fb4d4d;
}
.banner-image {
  width: 100%;
  height: 210px;
}
.banner-single {
  width: 100%;
  height: 197px;
  display: flex;
  justify-content: center;
}
.banner-single-image {
  width: 49.33%;
  height: 197px;
}
.group-carousel {
  width: 100%;
  padding: 45px 0 10px 0;
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, computed, ref, onMounted, onUnmounted, watch } from 'vue';
import { useInit } from '@/services/shared/utils';
import {} from '@/services/features/elearning/elearning.service';
import { findInvestorSuggest } from '@/services/features/investor/investor.service';
import { ApiRequestPaging } from '@/models/api-request';
import { BannerPropskillModel } from '@/services/features/elearning/elearning.model';
import { ApiResponsePaging } from '@/models/api-response';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
SwiperCore.use([Navigation, Autoplay]);
// Định nghĩa data type của component [data] bằng Typescript
class PropskillBannerComponentProps {
  modelValue: BannerPropskillModel[];
  isLoading: boolean;
}
// Định nghĩa data type của component [data] bằng Typescript
class PropskillBannerComponentData {
  modelValue: BannerPropskillModel[];
  isLoading: boolean;
}
export default defineComponent({
  name: 'PropskillBannerComponent',
  components: {},
  props: {
    modelValue: {
      type: Array as () => Array<BannerPropskillModel>,
      default: null,
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: null,
    },
  },
  setup(props: PropskillBannerComponentProps) {
    const { base } = useInit();
    const data = reactive<PropskillBannerComponentData>({
      modelValue: { ...props.modelValue },
      isLoading: props.isLoading,
    });
    watch(
      () => props.isLoading,
      (newValue, oldValue) => {
        data.isLoading = newValue;
      }
    );

    return {};
  },
});
</script>
