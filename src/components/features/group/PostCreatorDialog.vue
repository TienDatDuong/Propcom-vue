<template>
  <el-dialog
    :append-to-body="true"
    :model-value="data.visible"
    :center="true"
    custom-class="post-creator-dialog"
    @closed="onClosedDialog"
  >
    <template #title>
      <div class="post-creator-dialog__title">
        <slot name="title-post" v-if="!data.isPoll"> Tạo bài viết </slot>
        <slot name="title-poll" v-if="data.isPoll"> Tạo bài khảo sát </slot>
      </div>
    </template>
    <!-- Tên user > Tên group -->
    <PostUserInGroupComponent
      class="post-creator-dialog__user-in-group"
      :group="group"
      @goToGroup="data.visible = false"
    />
    <!-- Viết description bài post -->
    <div class="post-creator-dialog__textarea" v-if="!data.isPoll">
      <el-input
        v-model="data.description"
        :autosize="{
          minRows: 3,
        }"
        type="textarea"
        placeholder="Xin chào!&#10;Bạn đang nghĩ gì?"
        resize="none"
      />
    </div>
    <div class="post-creator-dialog__textarea" v-if="data.isPoll">
      <el-input
        v-model="data.description"
        :autosize="{
          minRows: 1,
        }"
        type="textarea"
        placeholder="Giới thiệu về cuộc khảo sát"
        resize="none"
      />
    </div>

    <!-- Media layout -->
    <div
      class="post-creator-dialog__layout medias-layout"
      :class="{
        'post-creator-dialog__medias': !isEmpty(data.medias),
        'post-creator-dialog__document': !isEmpty(data.documents),
        xxl: mq.xxl,
        'xxl-minus': !mq.xxl,
      }"
      v-if="!data.isPoll"
    >
      <PostCreatorMediaLayout
        :documents="data.documents"
        :medias="data.medias"
        @closeMedia="onCloseIcon"
        @closeDocument="onCloseDocument"
      />
    </div>

    <!-- Poll layout -->
    <div class="post-creator-dialog__layout poll-layout" v-if="data.isPoll">
      <PostCreatorPollLayout :postStatus="postStatus" :poll="data.poll" @poll="onChangePoll" />
    </div>

    <template #footer>
      <div class="post-creator-dialog__footer__attach">
        <div
          class="post-creator-dialog__footer__attach__element"
          :class="{
            'element-disabled': data.isPoll,
          }"
        >
          <el-upload
            action=""
            multiple
            :show-file-list="false"
            :auto-upload="false"
            :on-change="handleOnChange"
            :disabled="imageNo >= 20"
            accept="image/*"
          >
            <div
              class="post-creator-dialog__footer__attach__element__upload"
              @click="clickUpload(PostMediaTypeEnum.IMAGE)"
            >
              <div v-if="data.isPoll">
                <img src="@/assets/icons/simple/post_icon_picture.svg" />
              </div>
              <div v-if="!data.isPoll">
                <img src="@/assets/icons/colorful/post_icon_picture.svg" />
                <div class="icon-number" v-if="imageNo">
                  {{ imageNo }}
                </div>
              </div>
              <label>Ảnh</label>
            </div>
          </el-upload>
        </div>
        <div
          class="post-creator-dialog__footer__attach__element"
          :class="{
            'element-disabled': data.isPoll,
          }"
        >
          <el-upload
            action=""
            :show-file-list="false"
            :auto-upload="false"
            :on-change="handleOnChange"
            :disabled="videoNo >= 1"
            accept="video/*"
          >
            <div
              class="post-creator-dialog__footer__attach__element__upload"
              @click="clickUpload(PostMediaTypeEnum.VIDEO)"
            >
              <div v-if="data.isPoll">
                <img src="@/assets/icons/simple/post_icon_video.svg" />
              </div>
              <div v-if="!data.isPoll">
                <img src="@/assets/icons/colorful/post_icon_video.svg" />
                <div class="icon-number" v-if="videoNo">
                  {{ videoNo }}
                </div>
              </div>
              <label>Video</label>
            </div>
          </el-upload>
        </div>
        <div
          class="post-creator-dialog__footer__attach__element"
          :class="{
            'element-disabled': data.isPoll,
          }"
        >
          <el-upload
            action=""
            multiple
            :show-file-list="false"
            :auto-upload="false"
            :on-change="handleOnChange"
            :disabled="fileNo >= 3"
            accept=".xlsx,.xlsm,.pptx,.pdf,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          >
            <div
              class="post-creator-dialog__footer__attach__element__upload"
              @click="clickUpload(PostMediaTypeEnum.FILE)"
            >
              <div v-if="data.isPoll">
                <img src="@/assets/icons/simple/post_icon_link.svg" />
              </div>
              <div v-if="!data.isPoll">
                <img src="@/assets/icons/colorful/post_icon_link.svg" />
                <div class="icon-number" v-if="fileNo">
                  {{ fileNo }}
                </div>
              </div>
              <label>Tài liệu</label>
            </div>
          </el-upload>
        </div>
        <div class="post-creator-dialog__footer__attach__element">
          <div
            class="post-creator-dialog__footer__attach__element__upload"
            :class="{
              'element-disabled': hasMedia,
            }"
            @click="onClickPoll"
          >
            <img v-if="!hasMedia" src="@/assets/icons/colorful/post_icon_survey.svg" />
            <img v-if="hasMedia" src="@/assets/icons/simple/post_icon_survey.svg" />
            <label>Khảo sát</label>
          </div>
        </div>
      </div>
      <div class="post-creator-dialog__footer__submit">
        <button
          @click="onRegister"
          class="post-creator-dialog__footer__submit__active"
          :class="{
            'element-disabled': disabledRegister,
          }"
        >
          Đăng
        </button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.post-creator-dialog {
  $transform: translateY(2px);
  max-width: 900px;
  width: 80%;
  .element-disabled {
    pointer-events: none;
  }
  &__layout {
    max-height: 45vh;
    overflow-y: auto;

    &.poll-layout {
      min-height: 35vh;
    }
  }
  &__user-in-group {
    margin: 0 25px;
  }
  &__textarea {
    margin: 0 25px;
  }

  &__medias {
    &.xxl-minus {
      padding-top: 35% !important;
    }
    &.xxl {
      padding-top: 45% !important;
    }
  }
  &__document {
    padding-top: 5%;
  }
  .medias-layout {
    position: relative;
    margin: 0 25px;
  }
  &__title {
    font-size: 20px;
    font-weight: bolder;
  }
  &__footer {
    &__attach {
      display: flex;
      flex-wrap: wrap;
      padding: 0 10% 10px;
      text-align: left;
      &__element {
        flex: 1;
        display: flex;
        justify-content: center;
        min-width: 100px;
        &__upload {
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
            text-align: left;
          }
          &:hover {
            background: #f2f2f2;
          }
          &:active {
            transform: $transform;
          }
          .icon-number {
            position: absolute;
            color: #ffffff;
            background: #1890f7;
            border-radius: 50%;
            font-size: 10px;
            width: 16px;
            height: 16px;
            border: 1px solid #ffffff;
            top: -3px;
            right: 3px;
          }
          & > div {
            display: flex;
            position: relative;
          }
        }
      }
    }
    &__submit {
      display: flex;
      justify-content: center;
      button {
        padding: 5px;
        width: 40%;
        min-width: 100px;
        border-radius: 5px;
      }
      &__disable {
        background: #f2f2f2;
        border: $border;
        color: #c1c1c1;
      }
      &__active {
        background: #dd0000;
        border: 1px solid #dd0000;
        color: #ffffff;
        &:active {
          transform: $transform;
        }
        &.element-disabled {
          background: #f2f2f2;
          border: $border;
          color: #c1c1c1;
        }
      }
    }
  }
}
</style>

<script lang="ts">
import { computed, defineComponent, reactive, watch } from 'vue';
import { useInit } from '@/services/shared/utils';
import PostUserInGroupComponent from '@/components/features/group/PostUserInGroupComponent.vue';
import PostCreatorMediaLayout from '@/components/features/group/PostCreatorMediaLayout.vue';
import PostCreatorPollLayout from '@/components/features/group/PostCreatorPollLayout.vue';
import { CreateGroupPostModel, PostMediaTypeEnum } from '@/services/features/group/group.model';
import { isEmpty, find, cloneDeep } from 'lodash';

class PostCreatorDialogProps {
  visible: boolean;
  group: any;
  isPoll: boolean;
  poll?: any[];
  description?: string;
  medias?: any[];
  documents?: any[];
  postStatus?: string;
}

class PostCreatorDialogData {
  visible: boolean;
  poll: any[];
  description: string;
  medias: any[];
  documents: any[];
  isPoll: boolean;
}

export default defineComponent({
  name: 'PostCreatorDialog',
  components: {
    PostUserInGroupComponent,
    PostCreatorMediaLayout,
    PostCreatorPollLayout,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    group: {
      type: Object,
      require: true,
    },
    isPoll: {
      type: Boolean,
      default: false,
    },
    poll: {
      type: Array,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    medias: {
      type: Array,
      default: null,
    },
    documents: {
      type: Array,
      default: null,
    },
    postStatus: {
      type: String,
      default: null,
    },
  },
  emits: ['register'],
  setup(props: PostCreatorDialogProps, { emit }: any) {
    const { base } = useInit();
    const data = reactive<PostCreatorDialogData>({
      visible: props.visible,
      poll: cloneDeep(props.poll || []),
      description: props.description || '',
      medias: cloneDeep(props.medias) || [],
      documents: cloneDeep(props.documents) || [],
      isPoll: props.isPoll,
    });

    watch(
      () => props.visible,
      () => (data.visible = props.visible)
    );

    watch(
      () => props.isPoll,
      () => (data.isPoll = props.isPoll)
    );

    const imageNo = computed(() => {
      return data.medias.filter((item) => item.type.toUpperCase() === PostMediaTypeEnum.IMAGE).length;
    });

    const videoNo = computed(() => {
      return data.medias.filter((item) => item.type.toUpperCase() === PostMediaTypeEnum.VIDEO).length;
    });

    const fileNo = computed(() => {
      return data.documents.length;
    });

    const hasMedia = computed(() => {
      return imageNo.value > 0 || videoNo.value > 0 || fileNo.value > 0;
    });

    const disabledRegister = computed(() => {
      if (isEmpty(data.description)) {
        return true;
      }
      if (data.isPoll) {
        if (isEmpty(data.poll)) {
          return true;
        }
        const errorPoll = find(data.poll, (poll) => isEmpty(poll.name) || isEmpty(poll.answers));
        if (errorPoll) {
          return true;
        }
      }
      return false;
    });

    const onCloseIcon = (index: number) => {
      data.medias.splice(index, 1);
    };

    const handleOnChange = (file: any, _: any) => {
      const videoSize = 20 * 1000 * 1024; //bytes
      const imageSize = 2 * 1000 * 1024;
      const docSize = 5 * 1000 * 1024;
      const blob: File = file.raw;
      const type = blob.type;
      const getType = () => {
        if (type.match('image/*')) {
          return PostMediaTypeEnum.IMAGE;
        }
        if (type.match('video/*')) {
          return PostMediaTypeEnum.VIDEO;
        }
        return PostMediaTypeEnum.FILE;
      };

      if (getType() === PostMediaTypeEnum.IMAGE && (imageSize <= blob.size || imageNo.value >= 20)) {
        base.toast.error('Tối đa được chọn 20 ảnh, dung lượng mỗi ảnh tối đa là 2Mb');
        return;
      }
      if (getType() === PostMediaTypeEnum.VIDEO && (videoSize <= blob.size || videoNo.value >= 1)) {
        base.toast.error('Tối đa được chọn 1 video, dung lượng video tối đa là 20Mb');
        return;
      }
      if (getType() === PostMediaTypeEnum.FILE && (docSize <= blob.size || fileNo.value >= 3)) {
        base.toast.error('Tối đa được chọn 3 file, dung lượng file tối đa là 5Mb');
        return;
      }

      if (getType() === PostMediaTypeEnum.FILE) {
        data.documents.push({
          name: file.name,
          file: file.raw,
        });
        return;
      }

      data.medias.push({
        type: getType(),
        thumbnail: URL.createObjectURL(blob),
        url: URL.createObjectURL(blob),
        file: file.raw,
      });
    };

    const onClosedDialog = () => {
      data.description = '';
      data.medias = [];
      data.documents = [];
      data.poll = [];
      data.isPoll = false;
    };

    const clickUpload = (type: PostMediaTypeEnum) => {
      if (type === PostMediaTypeEnum.IMAGE && imageNo.value >= 20) {
        base.toast.error('Tối đa được chọn 20 ảnh');
      }
      if (type === PostMediaTypeEnum.VIDEO && videoNo.value >= 1) {
        base.toast.error('Tối đa được chọn 1 video');
      }
      if (type === PostMediaTypeEnum.FILE && fileNo.value >= 3) {
        base.toast.error('Tối đa được chọn 3 file');
      }
    };

    const onCloseDocument = (index: number) => {
      data.documents.splice(index, 1);
    };

    const onRegister = () => {
      if (data.isPoll) {
        if (isEmpty(data.poll)) {
          base.toast.error('Vui lòng nhập đầy đủ câu hỏi và ít nhất 1 lựa chọn tương ứng');
          return;
        }

        const errorPoll = find(data.poll, (poll) => isEmpty(poll.name) || isEmpty(poll.answers));
        if (errorPoll) {
          base.toast.error('Vui lòng nhập đầy đủ câu hỏi và ít nhất 1 lựa chọn tương ứng');
          return;
        }
      }

      const model: CreateGroupPostModel = new CreateGroupPostModel({
        description: data.description,
        medias: data.documents.concat(data.medias),
        groupId: props.group.id,
        poll: data.poll,
      });
      emit('register', model);
    };

    const onClickPoll = () => {
      data.isPoll = !data.isPoll;
      data.poll = [];
      data.description = '';
    };

    const onChangePoll = (poll: any) => {
      data.poll = poll;
    };

    return {
      PostMediaTypeEnum,
      mq: base.mq,
      data,
      imageNo,
      videoNo,
      fileNo,
      hasMedia,
      disabledRegister,
      onCloseIcon,
      handleOnChange,
      onClosedDialog,
      clickUpload,
      isEmpty,
      onCloseDocument,
      onRegister,
      onClickPoll,
      onChangePoll,
    };
  },
});
</script>
