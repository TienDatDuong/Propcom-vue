<template>
  <el-dialog b-on @close="closeDialogView" v-model="data.dialogView" width="833px" custom-class="app-dialog">
    <template #title>
      <div class="app-dialog-title">Xem tài liệu</div>
    </template>
    <div v-if="data.isLoading">
      <div class="container_skeleton"></div>
    </div>
    <div v-else class="app-dialog-content">
      <div class="direction-app post-media-component" v-loading="data.isLoading">
        <template v-if="data.url.length && data.type === TypeDocEnum.MEDIA">
          <div class="show-video" ref="videoPlayer"></div>
        </template>
        <template v-if="data.url.length && data.type === TypeDocEnum.IMAGE">
          <img :src="data.url" />
        </template>
        <template v-if="data.url.length && (data.type === TypeDocEnum.FILE_DOC || data.type === TypeDocEnum.FILE_XLSX)">
          <iframe
            @load="iframeLoadHelper"
            id="iframe-doc"
            :src="'https://docs.google.com/gview?url=' + data.url + '&embedded=true'"
          ></iframe>
        </template>
        <template v-if="data.url.length && data.type === TypeDocEnum.FILE_PDF">
          <iframe
            id="iframe-doc"
            @load="iframeLoadHelper"
            :src="'https://drive.google.com/viewerng/viewer?embedded=true&url=' + data.url + '&scrollbar=0'"
          ></iframe>
        </template>
        <template v-if="!data.url.length"></template>
      </div>
    </div>
    <div class="app-dialog-content__actions">
      <span class="app-dialog-footer">(Nếu không load được tài liệu vui lòng tắt popup và mở lại)</span>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.post-media-component {
  position: relative;
  width: 100%;
  height: calc(80vh - 175px);
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
::v-deep .vjs-control-bar {
  background: #0f0f0f;
  opacity: 0.8;
  width: 97%;
  margin: 0 auto;
  border-radius: 10px;
  position: absolute;
  height: 3em;
  background-color: #2b333f;
  background-color: rgba(43, 51, 63, 0.7);
  margin-bottom: 15px;
}
::v-deep .vjs-button > .vjs-icon-placeholder:before {
  position: static;
}
::v-deep .ytp-chrome-top,
.ytp-show-cards-title {
  margin-left: -100%;
}
.show-video {
  height: 100%;
}
.post-media-component img {
  height: 100%;
}
.post-media-component iframe {
  height: 100%;
  width: 100%;
}
.app-dialog-footer {
  font-style: italic;
}
.container_skeleton {
  margin-top: 20px;
  width: 793px;
  height: 500px;
  color: transparent;
  appearance: none;
  -webkit-appearance: none;
  background-color: #eee;
  border-color: #eee;
  border-radius: 10px;
}
</style>

<script lang="ts">
// Composition API
import { TypeDocEnum } from '@/services/shared/enum';
import { defineComponent, reactive, ref, watch } from 'vue';
import videojs from 'video.js';
import { Constant } from '@/services/shared/constant';

// Định nghĩa data type của component [data] bằng Typescript
class PropskillViewDocumentComponentData {
  modelValue: any;
  url: string;
  type: TypeDocEnum | string | null;
  player: any | null;
  dialogView: boolean;
  showVideo: boolean;
  isLoading: boolean;
  loadIframe: boolean;
}
class PropskillViewDocumentComponentProps {
  modelValue: any;
  url: string;
  dialogView: boolean;
}
export default defineComponent({
  name: 'PropskillViewDocumentComponent',
  components: {},
  props: {
    modelValue: {
      type: Object,
      default: null,
    },
    url: {
      type: String,
      default: '',
    },
    dialogView: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['onCloseDialog'],
  setup(props: PropskillViewDocumentComponentProps, { emit }: any) {
    const data = reactive<PropskillViewDocumentComponentData>({
      modelValue: { ...props.modelValue },
      url: props.url,
      dialogView: props.dialogView,
      type: null,
      player: null,
      showVideo: false,
      isLoading: false,
      loadIframe: false,
    });
    const videoPlayer = ref<any | null>(null);
    const loadVideoPlayer = () => {
      videoPlayer.value.innerHTML = `<video
            id="videoPlayer"
            class="video-js vjs-theme-forest"
            preload="auto"
            playsinline
            autoplay
            muted
            loop
          ></video>`;
      data.player = videojs(
        '#videoPlayer',
        {
          fill: true,
          controls: true,
          preload: 'auto',
        },
        () => {
          data.player.src({
            type: 'video/mp4',
            src: data.url,
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
    };

    const checkIframe = () => {
      const ele = document.getElementById('iframe-doc');
      setTimeout(() => {
        if (!data.loadIframe) {
          ele?.setAttribute('src', ele?.getAttribute('src') || '');
          checkIframe();
        }
      }, 5000);
    };

    watch(
      () => [props.url, props.modelValue, props.dialogView],
      (newValue) => {
        data.dialogView = !!newValue[2];
        data.modelValue = !!newValue[1];
        if (newValue[0] && newValue[0] != data.url) {
          data.isLoading = true;
          data.url = newValue[0];
          data.type = null;
          const arrs = data.url.split('.');
          const typeDoc = arrs[arrs.length - 1];
          for (let i = 0; i < Constant.DOCUMENT.length; i++) {
            if (Constant.DOCUMENT[i].type?.includes(typeDoc)) {
              data.type = Constant.DOCUMENT[i].key;
              break;
            }
          }
          if (!data.type) {
            data.type = TypeDocEnum.FILE_DOC;
          }
          if (data.type === TypeDocEnum.MEDIA) {
            setTimeout(() => {
              loadVideoPlayer();
              data.isLoading = false;
            }, 100);
          } else if (data.type === TypeDocEnum.IMAGE) {
            setTimeout(() => {
              data.isLoading = false;
            }, 100);
          } else {
           setTimeout(() => {
              data.isLoading = false;
            }, 1000);
            checkIframe();
          }
        }
      }
    );

    const closeDialogView = () => {
      data.dialogView = false;
      data.url = '';
      data.type = null;
      data.loadIframe = false;
      if (data.player) {
        data.player.dispose();
        data.player = null;
      }
      emit('onCloseDialog', false);
    };
    const iframeLoadHelper = (e: any) => {
      data.loadIframe = true;
      data.isLoading = false;
    };
    return {
      data,
      closeDialogView,
      videoPlayer,
      TypeDocEnum,
      iframeLoadHelper,
    };
  },
});
</script>
