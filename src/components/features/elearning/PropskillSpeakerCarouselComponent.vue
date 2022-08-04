<template>
  <div v-if="isLoading">
    <div class="mid-box-left">
      <div class="group-carousel-skeleton">
        <div class="group-carousel__header-skeleton"></div>
        <div class="speaker-container-box-skeleton">
          <div class="speaker-container-skeleton"></div>
          <div class="speaker-container-skeleton"></div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="group-carousel" v-if="modelValue && modelValue.length">
      <div class="group-carousel__header">
        <span class="group-carousel__header__title">Danh sách diễn giả</span>
        <a v-if="isShowButtonViewAll" href="javascript:;" class="group-carousel__header__link" @click="goToListPage">
          <span class="group-carousel__header__link__text">Xem tất cả</span>
          <img src="@/assets/icons/colorful/icon_vector.svg" />
        </a>
      </div>
      <swiper
        :slides-per-view="2"
        :space-between="10"
        :loop="false"
        :class="modelValue.length <= 2 ? 'swiper-no-swiping' : ''"
        :pagination="{
          clickable: true,
          el: '.swiper-pagination',
        }"
      >
        <template v-if="modelValue">
          <swiper-slide v-for="(item, index) in modelValue" :key="index" :virtualIndex="index">
            <PropskillSpeakerInfoComponent @showPopupIntructor="showPopupIntructor" :modelValue="item" />
          </swiper-slide>
        </template>
        <div class="swiper-pagination" v-if="modelValue.length > 2"></div>
      </swiper>
    </div>
  </div>
  <!-- Real items -->
</template>

<style lang="scss" scoped>
.group-carousel {
  width: 833px !important;
}
.swiper-pagination {
  width: 833px;
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
  &__header {
    margin-bottom: 15px;
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
.group-carousel-skeleton {
  height: 297px;
  padding: 30px 0 50px 0px;
}
.group-carousel__header-skeleton {
  height: 30px;
  margin-bottom: 17px;
  display: flex;
  flex-direction: column;
}
.speaker-container-box-skeleton {
  display: flex;
  justify-content: space-between;
  width: 833px;
}
.speaker-container-skeleton {
  width: 409px;
  height: 200px;
  border-radius: 10px;
}

.group-carousel__header-skeleton,
.course-skeleton,
.speaker-container-skeleton,
.speaker-container-skeleton .el-card__body-skeleton,
.lesson-banner {
  color: transparent;
  appearance: none;
  -webkit-appearance: none;
  background-color: #eee;
  border-color: #eee;
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, computed, ref, onMounted, onUnmounted, watch } from 'vue';
import { useInit } from '@/services/shared/utils';
import {} from '@/services/features/elearning/elearning.service';
import { findInvestorSuggest } from '@/services/features/investor/investor.service';
import { ApiRequestPaging } from '@/models/api-request';
import { InstructorModel } from '@/services/features/elearning/elearning.model';
import { ApiResponsePaging } from '@/models/api-response';
import { contentHide } from '@/services/shared/utils';
import PropskillSpeakerInfoComponent from './PropskillSpeakerInfoComponent.vue';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { PropSkillTabEnum } from '@/services/shared/enum';
SwiperCore.use([Navigation, Autoplay, Pagination]);
// Định nghĩa data type của component [data] bằng Typescript
class PropskillSpeakerCarouselComponentProps {
  modelValue: InstructorModel[];
  isLoading: boolean;
  isShowButtonViewAll: boolean;
}
// Định nghĩa data type của component [data] bằng Typescript
class PropskillSpeakerCarouselComponentData {
  modelValue: InstructorModel[];
  isLoading: boolean;
  isShowButtonViewAll: boolean;
}

export default defineComponent({
  name: 'PropskillSpeakerCarouselComponent',
  components: { PropskillSpeakerInfoComponent },
  props: {
    modelValue: {
      type: Array as () => Array<InstructorModel>,
      default: null,
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: null,
    },
    isShowButtonViewAll: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['showPopupIntructor'],
  setup(props: PropskillSpeakerCarouselComponentProps, { emit }: any) {
    const { base } = useInit();
    const data = reactive<PropskillSpeakerCarouselComponentData>({
      modelValue: { ...props.modelValue },
      isLoading: props.isLoading,
      isShowButtonViewAll: props.isShowButtonViewAll,
    });
    watch(
      () => props.isLoading,
      (newValue, oldValue) => {
        data.isLoading = newValue;
      }
    );

    const goToListPage = async () => {
      base.router.push({
        name: 'propskill-list',
        query: { activeTab: PropSkillTabEnum.SPEAKER },
      });
    };
    const showPopupIntructor = (dataEmit: any) => {
      emit('showPopupIntructor', dataEmit);
    };
    return {
      contentHide,
      goToListPage,
      showPopupIntructor,
    };
  },
});
</script>
