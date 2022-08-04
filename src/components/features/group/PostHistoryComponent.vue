<template>
  <div class="post-history-component">
    <AppCarouselComponent
      v-if="data.carousel.visible"
      :items="data.carousel.items"
      :selected="data.carousel.selected"
      @clickOutside="onCloseCarousel"
      class="app-carousel-fullsize"
    />

    <template v-if="data.dataSource">
      <!-- Header Bài viết -->
      <div class="post-history-component__header unselectable">
        <div class="post-history-component__header__info-container">
          <div class="post-history-component__header__info-container__avatar" @click="handleDialogUserVisible(true)">
            <UserAvatarComponent :currentUser="data.dataSource.user" />
          </div>
          <div class="d-flex flex-column">
            <div class="post-history-component__header__info-container__title-container">
              <a
                href="javascript:;"
                class="post-history-component__header__info-container__title"
                @click="handleDialogUserVisible(true)"
              >
                {{ data.dataSource.user?.name }}
              </a>
              <img src="@/assets/icons/simple/icon_vector.svg" />
              <a
                href="javascript:;"
                class="post-history-component__header__info-container__title"
                @click="goToGroupDetailPage(dataSource.group.id)"
              >
                {{ data.dataSource.group?.name }}
              </a>
            </div>
            <div class="post-history-component__header__info-container__subtitle">
              {{ formatDate(data.dataSource.createdDate) }}
            </div>
          </div>
        </div>
      </div>
      <!-- Nội dung bài viết -->
      <div class="post-history-component__content">
        <span v-html="linkifyHtml(data.dataSource.description)"> </span>
      </div>
      <!-- File đính kèm -->
      <div v-if="data.files && data.files.length" class="post-history-component__file">
        <template v-for="(file, index) in data.files" :key="index">
          <div class="post-history-component__file__item">
            <div class="post-history-component__file__item__icon">
              <img src="@/assets/icons/colorful/icon_file_doc.svg" />
            </div>
            <div class="post-history-component__file__item__info">
              <span class="post-history-component__file__item__file-name">{{ file.fileName }}</span>
              <!-- <span class="post-history-component__file__item__file-size"></span> -->
            </div>
            <div
              class="post-history-component__file__item__download app-hover-effect"
              @click="downloadFile(file.url, file.fileName)"
            >
              <img src="@/assets/icons/colorful/icon_download.svg" />
            </div>
          </div>
        </template>
      </div>
      <!-- Ảnh/Video -->
      <div v-if="data.medias && data.medias.length" class="post-history-component__media">
        <template v-if="data.medias.length === 1">
          <!-- Layout 1 item -->
          <div class="post-history-component__media__container container-1">
            <PostMediaComponent
              @click="onClickPostMedia(data.medias, 0)"
              :dataSource="data.medias[0]"
              class="app-hover-effect"
            />
          </div>
        </template>
        <template v-else-if="data.medias.length === 2">
          <!-- Layout 2 item -->
          <div class="post-history-component__media__container container-2">
            <PostMediaComponent
              @click="onClickPostMedia(data.medias, 0)"
              :dataSource="data.medias[0]"
              class="app-hover-effect"
            />
            <PostMediaComponent
              @click="onClickPostMedia(data.medias, 1)"
              :dataSource="data.medias[1]"
              class="app-hover-effect"
            />
          </div>
        </template>
        <template v-else-if="data.medias.length === 3">
          <!-- Layout 3 item -->
          <div class="post-history-component__media__container container-3">
            <div class="container-3__section-left">
              <PostMediaComponent
                @click="onClickPostMedia(data.medias, 0)"
                :dataSource="data.medias[0]"
                class="app-hover-effect"
              />
            </div>
            <div class="container-3__section-right">
              <PostMediaComponent
                @click="onClickPostMedia(data.medias, 1)"
                :dataSource="data.medias[1]"
                class="app-hover-effect"
              />
              <PostMediaComponent
                @click="onClickPostMedia(data.medias, 2)"
                :dataSource="data.medias[2]"
                class="app-hover-effect"
              />
            </div>
          </div>
        </template>
        <template v-else>
          <!-- Layout 4 item trở lên -->
          <div class="post-history-component__media__container container-4">
            <div class="container-4__section-left">
              <PostMediaComponent
                @click="onClickPostMedia(data.medias, 0)"
                :dataSource="data.medias[0]"
                class="app-hover-effect"
              />
            </div>
            <div class="container-4__section-right">
              <PostMediaComponent
                @click="onClickPostMedia(data.medias, 1)"
                :dataSource="data.medias[1]"
                class="app-hover-effect"
              />
              <PostMediaComponent
                @click="onClickPostMedia(data.medias, 2)"
                :dataSource="data.medias[2]"
                class="app-hover-effect"
              />
              <template v-if="data.medias.length === 4">
                <PostMediaComponent
                  @click="onClickPostMedia(data.medias, 4)"
                  :dataSource="data.medias[3]"
                  class="app-hover-effect"
                />
              </template>
              <template v-else>
                <div class="container-4__section-right__item-more app-hover-effect">
                  <PostMediaComponent @click="onClickPostMedia(data.medias, 3)" :dataSource="data.medias[3]" />
                  <div class="container-4__section-right__item-more__overlay">{{ data.medias.length - 4 }}+</div>
                </div>
              </template>
            </div>
          </div>
        </template>
      </div>
    </template>
  </div>
  <UserDetailDialog v-model="data.dialogUserDetail.model" v-model:visible="data.dialogUserDetail.visible" />
</template>

<style lang="scss" scoped>
.post-history-component {
  width: 100%;
  padding: 25px 0px;
  background-color: #ffffff;
  border-bottom: $border;
  & > *:not(:last-child) {
    margin-bottom: 10px;
  }
  &__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    &__info-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      &__avatar {
        cursor: pointer;
        margin-right: 10px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      &__title-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        & > *:not(:last-child) {
          margin-right: 10px;
        }
        svg {
          fill: #5a5a5a;
        }
      }
      &__title {
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        text-transform: uppercase;
        color: #0f0f0f;
        text-decoration: none;
      }
      &__subtitle {
        font-style: normal;
        font-weight: normal;
        font-size: 13px;
        color: #a7a7a7;
      }
    }
    &__actions {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      background: #ffffff;
    }
  }
  &__content {
    font-size: 14px;
    line-height: 1.5;
    color: #0f0f0f;
    word-break: break-word;
  }
  &__file {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    &__item {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      column-gap: 15px;
      &__icon {
        width: 60px;
        height: 60px;
        border: $border;
        border-radius: $borderRadius;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      &__download {
        margin-right: 10px;
        width: 30px;
        height: 30px;
        cursor: pointer;
        border-radius: 50%;
        background-color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      &__info {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      &__file-name {
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        color: #0f0f0f;
      }
      &__file-size {
        font-style: normal;
        font-weight: 300;
        font-size: 12px;
        color: $colorNeutral;
      }
    }
  }
  &__media {
    position: relative;
    width: 100%;
    padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
    &__container {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }
  .container-1 {
    flex: 1;
  }
  .container-2 {
    flex: 1;
    display: flex;
    flex-direction: row;
    column-gap: 5px;
  }
  .container-3 {
    flex: 1;
    display: flex;
    flex-direction: row;
    column-gap: 5px;
    &__section-left {
      flex: 2;
    }
    &__section-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      row-gap: 5px;
    }
  }
  .container-4 {
    flex: 1;
    display: flex;
    flex-direction: row;
    column-gap: 6px;
    &__section-left {
      flex: 3;
    }
    &__section-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      row-gap: 6px;
      &__item-more {
        cursor: pointer;
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: $borderRadius;
        overflow: hidden;
        &__overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
          font-size: 28px;
          color: #ffffff;
        }
      }
    }
  }
  .post-media-component {
    cursor: pointer;
  }
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, watch } from 'vue';
import { cloneDeep } from 'lodash';
import linkifyHtml from 'linkify-html';
import PostMediaComponent from '@/components/features/group/PostMediaComponent.vue';
import AppCarouselComponent from '@/components/features/group/AppCarouselComponent.vue';
import UserDetailDialog from '@/components/features/user-profile/UserDetailDialog.vue';
import UserAvatarComponent from '@/components/features/user-profile/UserAvatarComponent.vue';

import { useInit, formatDate, encapsulateUrl, downloadFile } from '@/services/shared/utils';
import { getTimeSince } from '@/services/features/group/group.service';
import { GroupPostModel, PostMediaTypeEnum } from '@/services/features/group/group.model';

// Định nghĩa data type của component [props] bằng Typescript
class PostHistoryComponentProps {
  modelValue: GroupPostModel;
}

// Định nghĩa data type của component [data] bằng Typescript
class PostHistoryComponentData {
  isLoading: boolean;
  dataSource: GroupPostModel | null;
  medias: any[] | null;
  files: any[] | null;
  carousel: any;
  dialogUserDetail: any;
}

// Định nghĩa enum thứ tự hiển thị media bằng Typescript
enum PostMediaDisplayOrder {
  First = 0,
  Second = 1,
  Third = 2,
  Fourth = 3,
  More = 4,
}

export default defineComponent({
  name: 'PostHistoryComponent',
  components: {
    PostMediaComponent,
    AppCarouselComponent,
    UserDetailDialog,
    UserAvatarComponent
  },
  props: {
    modelValue: {
      type: GroupPostModel,
      default: null,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props: PostHistoryComponentProps, { emit }: any) {
    // Setup Default
    const { base } = useInit();
    const data = reactive<PostHistoryComponentData>({
      isLoading: false,
      dataSource: { ...props.modelValue }, // Lưu vào biến thuộc component để xử lý nội bộ
      medias: null,
      files: null,
      carousel: {
        visible: false,
        items: [],
        selected: 0,
      },
      dialogUserDetail: {
        visible: false,
        model: props.modelValue ? props.modelValue.user : null,
      },
    });
    watch(
      () => props.modelValue,
      (newValue, oldValue) => {
        data.dataSource = newValue || null;
      }
    );

    // Tách file image/video ra từ mảng [medias]
    if (data.dataSource && data.dataSource.medias) {
      let newMedias = cloneDeep(data.dataSource.medias);
      newMedias = newMedias.filter((item) => item.type !== PostMediaTypeEnum.FILE);
      // Gom 2 item type THUMBNAIL và VIDEO lại làm 1
      const mediaVideoIndex = newMedias.findIndex((item) => item.type === PostMediaTypeEnum.VIDEO);
      if (mediaVideoIndex > -1) {
        const mediaThumbnail = newMedias.find((item) => item.type === PostMediaTypeEnum.THUMBNAIL);
        newMedias[mediaVideoIndex].thumbnail = mediaThumbnail ? mediaThumbnail.url : null;
        newMedias = newMedias.filter((item) => item.type !== PostMediaTypeEnum.THUMBNAIL);
      }
      data.medias = newMedias;
    }

    // Tách file tài liệu ra từ mảng [medias]
    if (data.dataSource && data.dataSource.medias) {
      let newFiles = cloneDeep(data.dataSource.medias);
      newFiles = newFiles
        .filter((item) => item.type === PostMediaTypeEnum.FILE)
        .map((item) => {
          if (item.url) {
            const paths = item.url.split('/');
            item.fileName = paths[paths.length - 1];
          }
          return item;
        });
      data.files = newFiles;
    }

    // Functions
    const goToGroupDetailPage = (id: string) => base.router.push({ name: 'group-detail', params: { id } });

    // Hiển thị Carousel ảnh
    const onClickPostMedia = (medias: any[], index: number) => {
      data.carousel.visible = true;
      data.carousel.items = medias;

      if (index === PostMediaDisplayOrder.More) {
        data.carousel.selected = PostMediaDisplayOrder.First;
      }

      if (index < PostMediaDisplayOrder.More) {
        data.carousel.selected = index;
      }
    };

    // Đóng carousel
    const onCloseCarousel = () => {
      data.carousel.visible = false;
    };

    // Ẩn/hiện dialog user
    const handleDialogUserVisible = (isVisible: boolean) => {
      data.dialogUserDetail.visible = isVisible;
    };

    return {
      linkifyHtml,
      formatDate,
      encapsulateUrl,
      // Component reactive data
      data,
      // Functions
      getTimeSince,
      goToGroupDetailPage,
      downloadFile,
      onClickPostMedia,
      onCloseCarousel,
      handleDialogUserVisible,
    };
  },
});
</script>
