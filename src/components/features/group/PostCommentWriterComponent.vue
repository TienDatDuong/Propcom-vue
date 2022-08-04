<template>
  <div class="group-comment-writer-component">
    <div class="group-comment-writer-component__comment">
      <div v-if="showAvatar" class="group-comment-writer-component__comment__avatar">
        <UserAvatarComponent :currentUser="data.currentUser" />
      </div>
      <div :class="{ 'input-add': isAdd }" class="group-comment-writer-component__comment__input">
        <input
          ref="writer"
          v-model="data.value"
          @keyup.enter="onSubmit"
          @keyup.esc="() => emit('esc')"
          @focusout="() => emit('esc')"
          @paste="onPaste"
          @drop="onDrop"
          placeholder="Viết Bình luận..."
        />
        <div v-if="showSend" class="group-comment-writer-component__comment__input__send-icon">
          <img @click="onSubmit" src="@/assets/icons/simple/icon_send.svg" />
        </div>
      </div>
      <template v-if="!isEmpty(data.medias)">
        <div class="group-comment-writer-component__comment__media">
          <div
            v-for="(media, index) in data.medias"
            :key="index"
            class="group-comment-writer-component__comment__media__container"
          >
            <PostMediaComponent :dataSource="media" :isThumbnail="true" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.group-comment-writer-component {
  &__comment {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;

    &__avatar {
      margin-right: 10px;
      width: 35px;
      height: 35px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    &__input {
      position: relative;
      flex: 1;
      padding-left: 16px;
      padding-right: 46px;
      background: #f2f2f2;
      border-radius: 10px;

      &.input-add {
        border-radius: 100px;
      }

      input {
        width: 100%;
        border: none;
        outline: none;
        padding: 0;
        background: transparent;
        height: 42px;
        color: #0f0f0f;
        &::placeholder {
          color: #a7a7a7;
        }
      }
      &__send-icon {
        position: absolute;
        top: calc(42px / 2 - 15px);
        right: 6px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        fill: #d6d6d6;
        &:hover {
          fill: $colorActive;
        }
      }
    }
    &__media {
      width: 100%;
      padding-top: 15%;
      position: relative;

      &__container {
        width: 20%;
        height: 100%;
        position: absolute;
        top: 5px;
        left: 45px;
      }
    }
  }
}
</style>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from 'vue';
import { useInit } from '@/services/shared/utils';
import { isEmpty } from 'lodash';
import { uploadFile } from '@/services/features/group/group.service';
import PostMediaComponent from '@/components/features/group/PostMediaComponent.vue';
import UserAvatarComponent from '@/components/features/user-profile/UserAvatarComponent.vue';

class PostCommentWriterComponentProps {
  isShowAvatar: boolean;
  isShowSend: boolean;
  type: string; // edit | add
  default: string;
  medias: any[];
}

class PostCommentWriterComponentData {
  currentUser: any;
  value: string;
  medias: any[];
  file: any;
}

export default defineComponent({
  name: 'PostCommentWriterComponent',
  components: {
    PostMediaComponent,
    UserAvatarComponent,
  },
  props: {
    isShowAvatar: {
      type: Boolean,
      default: true,
    },
    isShowSend: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: 'add',
    },
    default: {
      type: String,
      default: '',
    },
    medias: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['submit'],
  setup(props: PostCommentWriterComponentProps, { emit }: any) {
    const { base, currentUser } = useInit();
    const data = reactive<PostCommentWriterComponentData>({
      currentUser,
      value: props.default,
      medias: props.medias,
      file: null,
    });

    const writer = ref(null);

    const showAvatar = computed(() => props.isShowAvatar);
    const showSend = computed(() => props.isShowSend);
    const isAdd = computed(() => props.type.toLowerCase() === 'add');

    onMounted(() => {
      if (isAdd.value) {
        return;
      }
      (writer.value as any).focus();
    });

    const transferData = (items: DataTransferItemList) => {
      if (items.length < 1 || items[0].kind !== 'file') {
        return;
      }
      const blob = items[0].getAsFile();
      if (!blob || !blob.type.includes('image')) {
        return;
      }

      data.file = new File([blob], 'media.png', {
        type: 'image/png',
      });

      const reader = new FileReader();
      reader.onload = () => {
        data.medias = [
          {
            type: 'image',
            thumbnail: reader.result,
            url: reader.result,
          },
        ];
      };
      reader.readAsDataURL(blob);
    };

    const onPaste = (event: ClipboardEvent) => {
      if (!event.clipboardData) {
        return;
      }
      const items = event.clipboardData.items;
      transferData(items);
    };

    const onDrop = (event: DragEvent) => {
      if (!event.dataTransfer) {
        return;
      }
      const items = event.dataTransfer.items;
      transferData(items);
    };

    const onSubmit = async () => {
      if (isEmpty(data.value) && !data.file) {
        return;
      }

      if (data.file) {
        const response = await uploadFile(data.file, { createThumbnail: true });
        if (response && response.result) {
          data.medias = [
            {
              type: response.result.fileType,
              thumbnail: response.result.thumbnail,
              url: response.result.absoluteUrl,
            },
          ];
        }
      }
      emit('submit', { description: data.value, medias: data.medias });

      data.value = '';
      data.medias = [];
      data.file = null;
    };

    return {
      data,
      writer,
      showAvatar,
      showSend,
      isAdd,
      emit,
      onSubmit,
      onPaste,
      onDrop,
      isEmpty,
    };
  },
});
</script>
