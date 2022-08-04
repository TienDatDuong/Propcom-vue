<template>
  <el-dialog
    :model-value="visible"
    width="700px"
    custom-class="app-dialog post-comment-setting-dialog"
    @closed="onClosedDialog"
  >
    <template #title>
      <div class="app-dialog-title">Cài đặt bình luận</div>
    </template>
    <div class="app-dialog-content">
      <!-- Khóa bình luận -->
      <div class="post-comment-setting-dialog__item">
        <div class="post-comment-setting-dialog__item__header">
          <label class="app-form-input-radio-wrapper">
            <input
              hidden
              type="radio"
              :checked="data.allowComment === TypeAllowCommentEnum.OFF"
              v-model="data.allowComment"
              :value="TypeAllowCommentEnum.OFF"
              :name="TypeAllowCommentEnum.OFF"
              @click="setValue(TypeAllowCommentEnum.OFF)"
            />
            <span class="checkmark"></span>
          </label>
          <span class="post-comment-setting-dialog__item__header__label"> Khóa bình luận </span>
        </div>
        <div class="post-comment-setting-dialog__item__body">
          Không cho phép thêm bình luận mới. Người dùng khác vẫn có thể xem được những bình luận cũ.
        </div>
      </div>
      <!-- Ẩn bình luận -->
      <div class="post-comment-setting-dialog__item">
        <div class="post-comment-setting-dialog__item__header">
          <label class="app-form-input-radio-wrapper">
            <input
              hidden
              type="radio"
              :checked="data.allowComment === TypeAllowCommentEnum.HIDDEN"
              v-model="data.allowComment"
              :value="TypeAllowCommentEnum.HIDDEN"
              :name="TypeAllowCommentEnum.HIDDEN"
              @click="setValue(TypeAllowCommentEnum.HIDDEN)"
            />
            <span class="checkmark"></span>
          </label>
          <span class="post-comment-setting-dialog__item__header__label"> Ẩn bình luận </span>
        </div>
        <div class="post-comment-setting-dialog__item__body">
          Không cho phép thêm bình luận mới. Người dùng không thể xem được những bình luận cũ.
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.post-comment-setting-dialog {
  .app-dialog-content {
    padding-top: 30px;
    padding-left: 30px;
    padding-right: 30px;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 5px;

    &__header {
      display: flex;
      flex-direction: row;
      align-items: center;
      column-gap: 5px;
      &__label {
        flex: 1;
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        color: #000000;
      }
    }
    &__body {
      margin-left: 30px;
      padding: 5px 10px;
      border-left: 1px dashed #a7a7a7;
      font-style: normal;
      font-weight: normal;
      font-size: 15px;
      text-align: left;
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from 'vue';
import { useInit } from '@/services/shared/utils';
import { OnOffCommentGroupPostModel, TypeAllowCommentEnum } from '@/services/features/group/group.model';
import { findGroupPostById, onOffCommentPost } from '@/services/features/group/group.service';
class PostCommentSettingDialogProps {
  visible: boolean;
  id: string;
}

class PostCommentSettingDialogData {
  allowComment: TypeAllowCommentEnum;
}

export default defineComponent({
  name: 'PostCommentSettingDialog',
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: null,
    },
  },
  emits: ['close'],
  setup(props: PostCommentSettingDialogProps, { emit }: any) {
    const { base } = useInit();
    const data = reactive<PostCommentSettingDialogData>({
      allowComment: TypeAllowCommentEnum.ON,
    });

    watch(
      () => data.allowComment,
      async () => {
        const model: OnOffCommentGroupPostModel = new OnOffCommentGroupPostModel({
          id: props.id,
          allowComment: data.allowComment,
        });
        await onOffCommentPost(model);
      }
    );

    onMounted(async () => {
      const response = await findGroupPostById(props.id);
      if (response && response.result) {
        data.allowComment = response.result.allowComment as TypeAllowCommentEnum;
      }
    });

    const onClosedDialog = () => {
      emit('close', data.allowComment);
    };

    const setValue = (type: TypeAllowCommentEnum) => {
      if (type === TypeAllowCommentEnum.HIDDEN && data.allowComment === TypeAllowCommentEnum.HIDDEN) {
        data.allowComment = TypeAllowCommentEnum.ON;
      }

      if (type === TypeAllowCommentEnum.OFF && data.allowComment === TypeAllowCommentEnum.OFF) {
        data.allowComment = TypeAllowCommentEnum.ON;
      }
    };

    return {
      TypeAllowCommentEnum,
      data,
      onClosedDialog,
      setValue,
    };
  },
});
</script>
