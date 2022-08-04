<template>
  <!-- Loading skeleton items -->
  <div v-show="data.isLoading && data.isFirstLoad" class="group-carousel-skeleton">
    <div class="container-xl">
      <span class="group-carousel-skeleton__title">Nhóm của tôi</span>
      <div class="group-carousel-skeleton__swiper-container">
        <template v-for="index in 4" :key="index">
          <div class="group-carousel-skeleton__swiper-container__item app-skeletor"></div>
        </template>
      </div>
    </div>
  </div>
  <!-- Real items -->
  <div v-show="(!data.isLoading && data.isHasData) || !data.isFirstLoad" class="group-carousel">
    <div class="container-xl">
      <div class="group-carousel__header">
        <span class="group-carousel__header__title">Nhóm của tôi</span>
        <a
          v-if="data.items && data.items.length > 4"
          href="javascript:;"
          class="group-carousel__header__link"
          @click="goToGroupParticipatedPage"
        >
          <span class="group-carousel__header__link__text">Xem tất cả</span>
          <img src="@/assets/icons/colorful/icon_vector.svg" />
        </a>
      </div>
      <div class="group-carousel__swiper-container">
        <div v-show="data.items && data.items.length > 4" class="swiper-button swiper-button-prev app-hover-effect">
          <img src="@/assets/icons/simple/icon_left_arrow.svg" />
        </div>
        <swiper
          :slides-per-view="4"
          :space-between="15"
          :loop="false"
          :navigation="{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }"
          :autoplay="{ delay: 5000 }"
          @reachEnd="onSwiperReachEnd"
        >
          <template v-if="data.items">
            <swiper-slide v-for="(item, index) in data.items" :key="index" :virtualIndex="index">
              <div
                class="group-carousel__swiper-container__item app-hover-effect unselectable"
                :style="
                  item.coverImage && {
                    'background-image': 'url(' + encapsulateUrl(item.coverImage) + ')',
                  }
                "
                @click="goToGroupDetailPage(item.id)"
              >
                <img v-if="!item.coverImage" src="@/assets/images/default_image.svg" />
                <div class="group-carousel__swiper-container__item__overlay">
                  <span class="group-carousel__swiper-container__item__title">{{ item.name }}</span>
                  <span v-if="item.modifiedDate" class="group-carousel__swiper-container__item__subtitle">{{
                    `Hoạt động lần cuối ${getTimeSince(item.modifiedDate)} trước`
                  }}</span>
                </div>
              </div>
            </swiper-slide>
          </template>
        </swiper>
        <div v-show="data.items && data.items.length > 4" class="swiper-button swiper-button-next app-hover-effect">
          <img src="@/assets/icons/simple/icon_right_arrow.svg" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.group-carousel-skeleton {
  width: 100%;
  padding: 20px 0 50px 0;
  background-color: #ffffff;
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
  background-color: #ffffff;
  &__header {
    margin-bottom: 12px;
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
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive } from 'vue';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
SwiperCore.use([Navigation, Autoplay]);

import { useInit, encapsulateUrl } from '@/services/shared/utils';
import { findGroupByCurrentEmployee, getTimeSince } from '@/services/features/group/group.service';
import { ApiRequestPaging } from '@/models/api-request';
import { GroupModel } from '@/services/features/group/group.model';

// Định nghĩa data type của component [data] bằng Typescript
class GroupCarouselComponentData {
  isFirstLoad: boolean;
  isLoading: boolean;
  queryParams: ApiRequestPaging | null;
  items: GroupModel[] | null;
  isHasData: boolean;
}

export default defineComponent({
  name: 'GroupCarouselComponent',
  emits: ['isHasData'],
  setup(props: any, { emit }: any) {
    // Setup Default
    const { base } = useInit();
    const data = reactive<GroupCarouselComponentData>({
      isFirstLoad: true,
      isLoading: false,
      queryParams: null,
      items: null,
      isHasData: true,
    });
    // Functions
    const onSwiperReachEnd = async () => {
      if (data.queryParams) {
        data.isFirstLoad = false;
        data.queryParams.page++;
      } else {
        data.queryParams = {
          page: 1,
          pageSize: 10,
        };
      }
      data.isLoading = true;
      try {
        const response = await findGroupByCurrentEmployee(data.queryParams);
        if (response && response.rows.length) {
          data.isHasData = true;
          emit('isHasData', data.isHasData);
          data.items = data.items ? data.items.concat(response.rows) : response.rows;
        } else {
          data.isHasData = false;
        }
      } finally {
        data.isLoading = false;
      }
    };
    const goToGroupDetailPage = (id: string) => base.router.push({ name: 'group-detail', params: { id } });
    const goToGroupParticipatedPage = () => base.router.push({ name: 'group-participated' });

    return {
      encapsulateUrl,
      // Component reactive data
      data,
      // Functions
      getTimeSince,
      onSwiperReachEnd,
      goToGroupDetailPage,
      goToGroupParticipatedPage,
    };
  },
});
</script>
