<template>
  <div class="post-media-layout">
    <div class="post-media-layout__document" v-if="!isEmpty(documents)">
      <div v-for="(document, index) in documents" :key="index" class="post-media-layout__document__item">
        <i class="el-icon-document"></i>
        {{ document.name }}
        <img
          class="document-close-icon"
          src="@/assets/icons/simple/icon_close_docx.svg"
          @click="closeDocument(index)"
        />
      </div>
    </div>
    <div class="post-media-layout__section" v-if="!isEmpty(medias)">
      <div
        class="post-media-layout__section-left"
        :class="{
          compare: data.medias.length === 2,
        }"
      >
        <PostPreviewMediaComponent v-if="data.medias[0]" :dataSource="data.medias[0]" />
        <img class="close-icon" src="@/assets/icons/simple/icon_dark_close.svg" @click="closeIcon(0)" />
      </div>
      <div v-if="data.medias && data.medias.length > 1" class="post-media-layout__section-right">
        <div class="section-right-media" v-if="data.medias[1]">
          <PostPreviewMediaComponent :dataSource="data.medias[1]" :isThumbnail="true" />
          <img class="close-icon" src="@/assets/icons/simple/icon_dark_close.svg" @click="closeIcon(1)" />
        </div>
        <div class="section-right-media" v-if="data.medias[2]">
          <PostPreviewMediaComponent :dataSource="data.medias[2]" :isThumbnail="true" />
          <img class="close-icon" src="@/assets/icons/simple/icon_dark_close.svg" @click="closeIcon(2)" />
        </div>
        <template v-if="data.medias.length === 4">
          <div class="section-right-media" v-if="data.medias[3]">
            <PostPreviewMediaComponent :dataSource="data.medias[3]" :isThumbnail="true" />
            <img class="close-icon" src="@/assets/icons/simple/icon_dark_close.svg" @click="closeIcon(3)" />
          </div>
        </template>
        <template v-if="data.medias.length > 4">
          <div class="section-right-media">
            <div class="post-media-layout__section-right__item-more">
              <PostPreviewMediaComponent :dataSource="data.medias[3]" :isThumbnail="true" />
              <div class="post-media-layout__section-right__item-more__overlay">{{ data.medias.length - 4 }}+</div>
            </div>
          </div>
        </template>
      </div>

      <!-- <div class="post-media-layout__add">
        <div>Thêm ảnh/Video</div>
        <img src="@/assets/icons/simple/icon_plus.svg" />
      </div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
$transform: translateY(2px);

.post-media-layout {
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: 6px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &__section {
    position: relative;
    display: flex;
    column-gap: 6px;
    width: 100%;
    height: 100%;
  }

  &__section-left {
    flex: 2;
    position: relative;
    &.compare {
      flex: 1;
    }

    :deep(.post-preview-media-component__background) {
      background-size: contain;
    }
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

    .section-right-media {
      width: 100%;
      height: 100%;
      position: relative;
    }
  }

  &__add {
    cursor: pointer;
    position: absolute;
    top: 10px;
    left: 10px;
    color: #ffffff;
    padding: 7px 12px;
    background: #0f0f0f;
    opacity: 0.7;
    border-radius: 100px;
    display: flex;
    column-gap: 5px;
    z-index: 1;
    & > div {
      height: 23px;
    }
    &:active {
      transform: $transform;
    }
    &:hover {
      opacity: 0.8;
    }
  }

  .close-icon {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
    z-index: 1;

    &:active {
      transform: $transform;
    }
  }

  &__document {
    display: flex;
    column-gap: 10px;
    &__item {
      border-radius: 5px;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 150px;
      padding: 5px 20px 5px 10px;
      color: #dd0000;
      background: #f2f2f2;
      position: relative;
      overflow: hidden;

      .document-close-icon {
        width: 15px;
        height: 15px;
        padding: 3px;
        background: #ffffff;
        border-radius: 50%;
        position: absolute;
        top: 3px;
        right: 3px;
        cursor: pointer;

        &:active {
          transform: $transform;
        }
      }

      & > i {
        color: #000000;
      }
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue';
import { useInit } from '@/services/shared/utils';
import { isEmpty } from 'lodash';
import PostPreviewMediaComponent from '@/components/features/group/PostPreviewMediaComponent.vue';

class PostCreatorMediaLayoutProps {
  medias: any[];
  documents: any[];
}
class PostCreatorMediaLayoutData {
  medias: any[];
  documents: any[];
}

export default defineComponent({
  name: 'PostCreatorMediaLayout',
  components: {
    PostPreviewMediaComponent,
  },
  props: {
    medias: {
      type: Array,
      default: null,
    },
    documents: {
      type: Array,
      default: null,
    },
  },
  emits: ['close', 'closeMedia', 'closeDocument'],
  setup(props: PostCreatorMediaLayoutProps, { emit }: any) {
    const { base } = useInit();
    const data = reactive<PostCreatorMediaLayoutData>({
      medias: props.medias,
      documents: props.documents,
    });

    watch(
      () => props.medias,
      () => (data.medias = props.medias),
      {
        deep: true,
      }
    );
    watch(
      () => props.documents,
      () => (data.documents = props.documents),
      {
        deep: true,
      }
    );

    const closeIcon = (index: number) => {
      emit('closeMedia', index);
    };

    const closeDocument = (index: number) => {
      emit('closeDocument', index);
    };

    return {
      data,
      isEmpty,
      closeIcon,
      closeDocument,
    };
  },
});
</script>
