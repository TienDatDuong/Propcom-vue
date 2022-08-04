<template>
  <div v-if="data.dataSource" class="post-media-component" @click="onClick()">
    <template v-if="data.dataSource.type.toUpperCase() === PostMediaTypeEnum.IMAGE">
      <template v-if="isThumbnail">
        <div
          class="post-media-component__background"
          :style="
            data.dataSource.thumbnail && {
              'background-image': 'url(' + encapsulateUrl(data.dataSource.thumbnail) + ')',
            }
          "
        ></div>
      </template>
      <template v-else>
        <div
          class="post-media-component__background"
          :style="
            data.dataSource.url && {
              'background-image': 'url(' + encapsulateUrl(data.dataSource.url) + ')',
            }
          "
        ></div>
      </template>
    </template>
    <template
      v-else-if="
        data.dataSource?.type.toUpperCase() === PostMediaTypeEnum.VIDEO ||
        data.dataSource?.type.toUpperCase() === PostMediaTypeEnum.VIDEO_FILE
      "
    >
      <video ref="videoPlayer" class="video-js vjs-theme-forest"></video>
    </template>
    <template v-else-if="data.dataSource.type.toUpperCase() === PostMediaTypeEnum.YOUTUBE">
      <div
        class="post-media-component__background youtube"
        v-observe-visibility="youtubeVisibilityChanged"
        v-loading="!data.isVisibleYoutubeVideo"
      >
        <YouTube v-if="data.isVisibleYoutubeVideo" :src="data.dataSource.url" width="100%" height="100%" />
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.post-media-component {
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
    background-color: #ffffff;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    &.youtube > div {
      width: 100%;
      height: 100%;
    }
  }

  .overlay {
    position: fixed; /* Sit on top of the page content */
    display: none; /* Hidden by default */
    width: 100%; /* Full width (cover the whole page) */
    height: 100%; /* Full height (cover the whole page) */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
    z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
    cursor: pointer; /* Add a pointer on hover */
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
class PostMediaComponentProps {
  dataSource?: any;
  isThumbnail: boolean;
}

// Định nghĩa data type của component [data] bằng Typescript
class PostMediaComponentData {
  isLoading: boolean;
  dataSource: any | null;
  player: any | null;
  isVisibleYoutubeVideo: boolean; // https://github.com/NomNes/vue3-youtube/issues/1
}

export default defineComponent({
  name: 'PostMediaComponent',
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
  setup(props: PostMediaComponentProps, { emit }: any) {
    // Setup Default
    const { base } = useInit();
    const videoPlayer = ref<HTMLElement | null>(null);
    const data = reactive<PostMediaComponentData>({
      isLoading: false,
      dataSource: props.dataSource ? { ...props.dataSource } : null, // Lưu vào biến thuộc component để xử lý nội bộ
      player: null,
      isVisibleYoutubeVideo: false,
    });

    watch(
      () => props.dataSource,
      () => (data.dataSource = props.dataSource),
      {
        deep: true,
      }
    );

    const loadVideoPlayer = () => {
      if (videoPlayer.value) {
        data.player = videojs(
          videoPlayer.value,
          {
            fill: true, // https://docs.videojs.com/tutorial-layout.html
            controls: true,
            preload: 'auto',
          },
          () => {
            data.player.src({
              type: 'video/mp4',
              src: data.dataSource.url,
            });
          }
        );
        let reloadTime = 0;
        data.player.on('error', () => {
          if (reloadTime >= 3) {
            return;
          }
          reloadTime++;
          data.player.addClass('vjs-waiting');
          data.player.error(null);
          setTimeout(() => {
            data.player.load();
          }, 3000);
        });
      }
    };

    const youtubeVisibilityChanged = (visibility: boolean) => {
      if (visibility) {
        data.isVisibleYoutubeVideo = true;
      }
    };

    onMounted(() => loadVideoPlayer());
    onUpdated(() => loadVideoPlayer());

    onUnmounted(() => {
      if (data.player) {
        data.player.dispose();
      }
    });
    const onClick = (e: PointerEvent) => {
      emit('click', e);
    };

    // Functions
    return {
      PostMediaTypeEnum,
      // Component reactive data
      videoPlayer,
      data,
      // Functions
      formatDate,
      encapsulateUrl,
      onClick,
      youtubeVisibilityChanged,
    };
  },
});
</script>
