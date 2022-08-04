<template>
  <div class="post-creator-component">
    <div class="post-creator-component__status" v-if="data.status !== 'before'">
      <label @click="data.status = 'done'" class="post-creator-component__status__text"> Đã đăng bài viết </label>
      <div class="post-creator-component__status__meter">
        <span
          :class="{
            'meter-before': data.status === 'before',
            'meter-waiting': data.status === 'waiting',
            'meter-inprocess': data.status === 'inprocess',
            'meter-done': data.status === 'done',
          }"
        ></span>
      </div>
    </div>
    <div class="post-creator-component__creator">
      <div v-if="hasUser" class="post-creator-component__creator__writer">
        <PostCommentWriterComponent @click="onShowPostMedia" :isShowSend="false" default="Đăng bài viết..." />
      </div>
      <div class="post-creator-component__creator__attach">
        <div class="post-creator-component__creator__attach__element">
          <div @click="onShowPostMedia">
            <img src="@/assets/icons/colorful/post_icon_picture.svg" />
            <label>Ảnh</label>
          </div>
        </div>
        <div class="post-creator-component__creator__attach__element">
          <div @click="onShowPostMedia">
            <img src="@/assets/icons/colorful/post_icon_video.svg" />
            <label>Video</label>
          </div>
        </div>
        <div class="post-creator-component__creator__attach__element">
          <div @click="onShowPostMedia">
            <img src="@/assets/icons/colorful/post_icon_link.svg" />
            <label>Tài liệu</label>
          </div>
        </div>
        <div class="post-creator-component__creator__attach__element">
          <div @click="onShowPostPoll">
            <img src="@/assets/icons/colorful/post_icon_survey.svg" />
            <label>Khảo sát</label>
          </div>
        </div>
      </div>
    </div>

    <PostCreatorDialog
      :visible="data.visible"
      :group="group"
      :isPoll="data.isPoll"
      @close="onCloseDialog"
      @register="handleRegister"
    />
  </div>
</template>

<style lang="scss" scoped>
.post-creator-component {
  &__status {
    display: flex;
    flex-direction: column;
    padding: 15px 26px 22px;
    background: #ffffff;
    border: $border;
    border-radius: 10px;

    &__text {
      font-size: 13px;
      margin-bottom: 5px;
    }

    &__meter {
      width: 100%;
      height: 5px;
      position: relative;
      background: #f2f2f2;
      border-radius: 25px;
      opacity: 0.5;

      & > span {
        display: block;
        height: 100%;
        background-color: #dd0000;
        position: relative;
        overflow: hidden;
        border-radius: 3px;
        transition: width 1s;

        &.meter-before {
          width: 0%;
        }
        &.meter-waiting {
          width: 25%;
        }
        &.meter-inprocess {
          width: 75%;
        }
        &.meter-done {
          width: 100%;
        }
      }
    }
  }

  &__creator {
    cursor: pointer;
    background: #ffffff;
    border: $border;
    border-radius: 10px;
    margin: 15px 0px;

    :deep(.group-comment-writer-component) {
      cursor: pointer;

      input {
        color: #a7a7a7;
        pointer-events: none;
      }
    }

    &__writer {
      margin: 15px 20px;
    }

    &__attach {
      display: flex;
      flex-wrap: wrap;
      padding: 15px 10%;
      border-top: 1px solid #f2f2f2;

      &__element {
        flex: 1;
        display: flex;
        justify-content: center;
        min-width: 100px;

        & > div {
          display: flex;
          cursor: pointer;
          padding: 5px;
          border-radius: 5px;
          img {
            margin-right: 10px;
            cursor: pointer;
          }
          label {
            min-width: 75px;
            cursor: pointer;
          }

          &:hover {
            background: #f2f2f2;
          }
          &:active {
            transform: translateY(2px);
          }
        }
      }
    }
  }
}
</style>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue';
import { useInit } from '@/services/shared/utils';
import PostCommentWriterComponent from '@/components/features/group/PostCommentWriterComponent.vue';
import PostCreatorDialog from '@/components/features/group/PostCreatorDialog.vue';
import { CreateGroupPostModel, PostMediaTypeEnum } from '@/services/features/group/group.model';
import { createGrouppost, uploadFile } from '@/services/features/group/group.service';

class PostCreatorComponentProps {
  group: any;
}

class PostCreatorComponentData {
  status: 'before' | 'waiting' | 'inprocess' | 'done';
  visible: boolean;
  isPoll: boolean;
}

export default defineComponent({
  name: 'PostCreatorComponent',
  props: {
    group: {
      type: Object,
      default: null,
    },
  },
  components: {
    PostCommentWriterComponent,
    PostCreatorDialog,
  },
  setup(props: PostCreatorComponentProps, { emit }: any) {
    const { base, currentUser } = useInit();
    const data = reactive<PostCreatorComponentData>({
      status: 'before',
      visible: false,
      isPoll: false,
    });

    const hasUser = currentUser;
    const onCloseDialog = () => {
      data.visible = false;
      data.isPoll = false;
    };

    const uploadMultiFiles = async (files: File[]) => {
      const medias: any[] | PromiseLike<any[]> = [];
      return await Promise.all(
        files.map(async (file) => {
          const response = await uploadFile(file, { createThumbnail: true });
          if (response && response.result) {
            let type = PostMediaTypeEnum.FILE;
            if (response.result.imageInfo) {
              type = PostMediaTypeEnum.IMAGE;
              medias.push({
                type,
                thumbnail: response.result.thumbnail,
                url: response.result.absoluteUrl,
              });
              return medias;
            }
            if (response.result.fileType) {
              type = response.result.fileType.toUpperCase();
              medias.push({
                type: 'THUMBNAIL',
                thumbnail: null,
                url: response.result.thumbnail,
              });
              medias.push({
                type,
                thumbnail: response.result.thumbnail,
                url: response.result.url,
              });
              return medias;
            }
            medias.push({
              type,
              thumbnail: response.result.thumbnail,
              url: response.result.absoluteUrl,
            });
            return medias;
          }
        })
      );
    };

    const handleRegister = async (model: CreateGroupPostModel) => {
      try {
        data.visible = false;
        data.status = 'waiting';
        const files = model.medias.map((item) => item.file);
        let uploadedFiles = await uploadMultiFiles(files);
        uploadedFiles = uploadedFiles[0] as any;
        data.status = 'inprocess';
        model.medias = uploadedFiles ?? [];
        data.status = 'done';
        const response = await createGrouppost(model);
        if (response && response.data) {
          const isApproved = response.data.isApproved;
          base.toast.success(isApproved ? 'Đăng bài viết thành công' : 'Bài viết đang chờ duyệt');
          emit('success', {
            isApproved: isApproved,
            id: response.data.id,
          });
        }
      } finally {
        data.status = 'before';
      }
    };

    const onShowPostMedia = () => {
      data.visible = true;
      data.isPoll = false;
    };

    const onShowPostPoll = () => {
      data.visible = true;
      data.isPoll = true;
    };

    return {
      data,
      hasUser,
      onCloseDialog,
      handleRegister,
      onShowPostMedia,
      onShowPostPoll,
    };
  },
});
</script>
