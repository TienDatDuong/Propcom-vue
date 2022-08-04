<template>
  <div v-if="data.dataSource" class="post-preview-media-component">
    <template v-if="data.dataSource.type.toUpperCase() === PostMediaTypeEnum.IMAGE">
      <template v-if="isThumbnail">
        <div
          class="post-preview-media-component__background"
          :style="
            data.dataSource.thumbnail && {
              'background-image': 'url(' + encapsulateUrl(data.dataSource.thumbnail) + ')',
            }
          "
        ></div>
      </template>
      <template v-else>
        <div
          class="post-preview-media-component__background"
          :style="
            data.dataSource.url && {
              'background-image': 'url(' + encapsulateUrl(data.dataSource.url) + ')',
            }
          "
        ></div>
      </template>
    </template>
    <template v-else-if="data.dataSource.type.toUpperCase() === PostMediaTypeEnum.VIDEO">
      <div class="post-preview-media-component__video-player">
        <video ref="videoPlayer" class="video-js vjs-theme-forest"></video>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.post-preview-media-component {
  position: relative;
  width: 100%;
  height: 100%;
  border: $border;
  border-radius: $borderRadius;
  overflow: hidden;

  &__background {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #efefef;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__video-player {
    width: 100%;
    height: 100%;
  }
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, onMounted, onUnmounted, onUpdated, reactive, ref, watch } from 'vue';
import videojs from 'video.js';
import { useInit, formatDate, encapsulateUrl } from '@/services/shared/utils';
import { PostMediaTypeEnum } from '@/services/features/group/group.model';

// Định nghĩa data type của component [props] bằng Typescript
class PostPreviewMediaComponentProps {
  dataSource?: any;
  isThumbnail: boolean;
}

// Định nghĩa data type của component [data] bằng Typescript
class PostPreviewMediaComponentData {
  isLoading: boolean;
  dataSource: any | null;
  player: any;
}

export default defineComponent({
  name: 'PostPreviewMediaComponent',
  props: {
    dataSource: {
      type: Object,
      default: null,
    },
    isThumbnail: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['click'],
  setup(props: PostPreviewMediaComponentProps, { emit }: any) {
    // Setup Default
    const { base } = useInit();
    const videoPlayer = ref<HTMLElement | null>(null);
    const data = reactive<PostPreviewMediaComponentData>({
      isLoading: false,
      dataSource: props.dataSource ? { ...props.dataSource } : null,
      player: null,
    });

    watch(
      () => props.dataSource,
      () => data.dataSource = props.dataSource,
      {
        deep: true,
      }
    );

    const loadVideoPlayer = () => {
      if (videoPlayer.value) {
        data.player = videojs(videoPlayer.value, {
          fill: true,
          muted: true,
          loop: true,
          autoplay: true,
          controls: false,
        });
        data.player.src({
          type: 'video/mp4',
          src: data.dataSource.url
        });
      }

      if (data.player) {
        data.player.play();
      }
    };

    onMounted(() => {
      loadVideoPlayer();
    });

    onUpdated(() => {
      loadVideoPlayer();
    });

    // Functions
    return {
      PostMediaTypeEnum,
      // Component reactive data
      videoPlayer,
      data,
      // Functions
      formatDate,
      encapsulateUrl,
    };
  },
});
</script>