<template>
  <div class="post-poll-component">
    <template v-if="data.dataSource">
      <span class="post-poll-component__text">{{ data.dataSource.name }}</span>
      <template v-if="data.dataSource.answers && data.dataSource.answers.length">
        <!-- Chọn một option -->
        <template v-if="!data.dataSource.isMultipleSelection">
          <div class="post-poll-component__section">
            <div v-for="item in data.dataSource.answers" :key="item.id" class="post-poll-component__section__item">
              <div class="d-flex">
                <div class="post-poll-component__section__item__checker">
                  <label class="app-form-input-radio-wrapper">
                    <input
                      hidden
                      type="radio"
                      v-model="data.ratioData"
                      :value="item.id"
                      :name="item.id"
                      @click="submitPollOptionHandle(item.id)"
                    />
                    <span class="checkmark"></span>
                  </label>
                </div>
                <div
                  :class="data.ratioData === item.id && 'active'"
                  class="post-poll-component__section__item__checker-info"
                  @click="submitPollOptionHandle(item.id)"
                >
                  <span class="post-poll-component__section__item__checker-info__value">{{ item?.name }}</span>
                  <span class="post-poll-component__section__item__checker-info__origin">
                    Được {{ item.createdBy?.name }} thêm vào
                  </span>
                </div>
                <button
                  v-if="
                    (data.post.isAdmin && data.dataSource.answers.length > 1) ||
                    (currentUser &&
                      data.post.user.id === currentUser.id &&
                      item.isDefault === false &&
                      data.dataSource.answers.length > 1) ||
                    (currentUser &&
                      item.createdBy &&
                      item.createdBy.id === currentUser.id &&
                      item.isDefault === false &&
                      data.dataSource.answers.length > 1)
                  "
                  @click="dialogConfirm(true, { answerId: item.id })"
                  class="post-poll-component__section__btn-remove app-hover-effect"
                >
                  <img src="@/assets/icons/simple/icon_close_docx.svg" />
                </button>
              </div>
              <div
                @click="
                  viewListPollVisible(true, {
                    postId: data.post.id,
                    questionId: data.dataSource.id,
                    answerId: item.id,
                  })
                "
                class="post-poll-component__section__item__respondents"
              >
                <div
                  v-if="item.respondents && item.respondents.length"
                  class="post-poll-component__section__item__respondents__avatar-container"
                >
                  <template v-for="subItem in item.respondents" :key="subItem.id">
                    <UserAvatarComponent
                      :currentUser="subItem"
                      class="post-poll-component__section__item__respondents__avatar-container__avatar"
                    />
                  </template>
                </div>
                <span class="post-poll-component__section__item__respondents__text">
                  {{ item.totalVoted }} lượt bình chọn
                </span>
              </div>
            </div>
          </div>
        </template>
        <!-- Chọn nhiều option -->
        <template v-else>
          <div class="post-poll-component__section">
            <div v-for="item in data.dataSource.answers" :key="item.id" class="post-poll-component__section__item">
              <div class="d-flex">
                <div class="post-poll-component__section__item__checker">
                  <label class="app-form-input-checkbox-wrapper">
                    <input
                      hidden
                      type="checkbox"
                      v-model="data.checkboxData[item.id]"
                      :value="item.id"
                      :name="item.id"
                      @click="submitPollOptionHandle(item.id)"
                    />
                    <span class="checkmark"></span>
                  </label>
                </div>
                <div
                  :class="isChecked(item.id) && 'active'"
                  class="post-poll-component__section__item__checker-info"
                  @click="submitPollOptionHandle(item.id)"
                >
                  <span class="post-poll-component__section__item__checker-info__value">{{ item?.name }}</span>
                  <span class="post-poll-component__section__item__checker-info__origin">
                    Được {{ item.createdBy?.name }} thêm vào
                  </span>
                </div>
                <button
                  v-if="
                    (data.post.isAdmin && data.dataSource.answers.length > 1) ||
                    (currentUser &&
                      data.post.user.id === currentUser.id &&
                      item.isDefault === false &&
                      data.dataSource.answers.length > 1) ||
                    (currentUser &&
                      item.createdBy &&
                      item.createdBy.id === currentUser.id &&
                      item.isDefault === false &&
                      data.dataSource.answers.length > 1)
                  "
                  @click="dialogConfirm(true, { answerId: item.id })"
                  class="post-poll-component__section__btn-remove app-hover-effect"
                >
                  <img src="@/assets/icons/simple/icon_close_docx.svg" />
                </button>
              </div>

              <div
                @click="
                  viewListPollVisible(true, {
                    postId: data.post.id,
                    questionId: data.dataSource.id,
                    answerId: item.id,
                  })
                "
                class="post-poll-component__section__item__respondents"
              >
                <div
                  v-if="item.respondents && item.respondents.length"
                  class="post-poll-component__section__item__respondents__avatar-container"
                >
                  <template v-for="subItem in item.respondents" :key="subItem.id">
                    <UserAvatarComponent
                      :currentUser="subItem"
                      class="post-poll-component__section__item__respondents__avatar-container__avatar"
                    />
                  </template>
                </div>
                <span class="post-poll-component__section__item__respondents__text">
                  {{ item.totalVoted }} lượt bình chọn
                </span>
              </div>
            </div>
          </div>
        </template>
        <!-- Thêm option -->
        <div v-if="data.dataSource.isAddOption">
          <Form
            validate-on-submit
            :validation-schema="formValidation"
            :initial-values="formData"
            @submit="handleSubmitAddPollOption"
          >
            <div class="post-poll-component__dialog-form">
              <button type="submit" class="post-poll-component__dialog-form__add-btn app-hover-effect">
                <img src="@/assets/icons/simple/icon_plus.svg" />
              </button>
              <Field
                name="answer"
                v-slot="{ field, handleChange, handleBlur }"
                as="div"
                class="post-poll-component__dialog-form__input"
              >
                <input
                  v-model="field.value"
                  @input="handleChange"
                  @blur="handleBlur"
                  placeholder="Thêm lựa chọn thăm dò ý kiến"
                />
              </Field>
            </div>
          </Form>
        </div>
      </template>
    </template>
  </div>
  <el-dialog v-model="data.listPollVisible" width="600px" custom-class="app-dialog post-poll-dialog">
    <template #title>
      <span class="app-dialog-title">Danh sách bình chọn</span>
    </template>
    <template v-if="data.listRespondent.totalItems && data.listRespondent.totalItems.length">
      <div class="post-poll-dialog__container" ref="scrollRespondentComponent">
        <template v-for="item in data.listRespondent.totalItems" :key="item.id">
          <GroupMemberListItemComponent :dataSource="item" />
        </template>
      </div>
      <div v-if="data.listRespondent.isLoadingMore" class="app-loading">
        <AppIconLoading />
      </div>
    </template>
    <template v-else>
      <AppEmptyComponent title="Người bình chọn" />
    </template>
    <div class="app-dialog-content__actions">
      <button @click="viewListPollVisible(false)" class="app-btn">Đóng</button>
    </div>
  </el-dialog>
  <el-dialog v-model="data.confirmRemovePollVisible" width="500px" custom-class="app-dialog">
    <template #title>
      <span class="app-dialog-title">Gỡ tùy chọn</span>
    </template>
    <div class="app-dialog-content">
      <span>Bạn có chắc bạn muốn xóa tùy chọn này khỏi cuộc thăm dò ý kiến không?</span>
      <div class="app-dialog-content__actions">
        <button @click="dialogConfirm(false, null)" class="app-btn">Huỷ</button>
        <button
          @click="
            handleSubmitRemovePoll({
              postId: data.post.id,
              questionId: data.dataSource.id,
              answerId: data.answerId,
            })
          "
          class="app-btn app-btn-primary"
        >
          Gỡ
        </button>
      </div>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.post-poll-component {
  position: relative;
  padding: 20px;
  width: 100%;
  height: 100%;
  border-bottom: $border;
  border-radius: $borderRadius;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  row-gap: 15px;
  &__text {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: #0f0f0f;
  }
  &__section {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    row-gap: 10px;
    &__btn-remove {
      margin-left: 5px;
      border: none;
      border-radius: $borderRadiusSmall;
      background: #ffffff;
      img {
        width: 15px;
        height: 15px;
      }
    }
    &__item {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      row-gap: 5px;
      &__checker {
        width: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        .el-radio .el-radio__label {
          display: none;
        }
      }
      &__checker-info {
        flex: 1;
        cursor: pointer;
        padding: 8px 15px;
        display: flex;
        flex-direction: column;
        background: #ffffff;
        border: $border;
        border-radius: $borderRadiusSmall;
        &.active {
          background: #ffeeed;
          border: 1px solid #ffd6d3;
        }
        &__value {
          font-style: normal;
          font-weight: normal;
          font-size: 13px;
          color: #0f0f0f;
        }
        &__origin {
          font-style: normal;
          font-weight: normal;
          font-size: 12px;
          color: #a7a7a7;
        }
      }
      &__respondents {
        cursor: pointer;
        margin-left: 40px;
        display: flex;
        flex-direction: row;
        align-items: center;
        column-gap: 5px;
        &__avatar-container {
          display: flex;
          flex-direction: row;
          &__avatar {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            display: flex;
            &:not(:first-child) {
              margin-left: -5px;
            }
          }
        }
        &__text {
          font-style: normal;
          font-weight: normal;
          font-size: 12px;
          color: #a7a7a7;
        }
      }
    }
  }
  &__dialog-form {
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 5px;
    &__add-btn {
      width: 25px;
      height: 20px;
      border-radius: $borderRadiusSmall;
      border: none;
      outline: none;
      background: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &__input {
      flex: 1;
      height: 34px;
      & input {
        padding: 8px 15px;
        width: 100%;
        height: 100%;
        border: $border;
        border-radius: $borderRadiusSmall;
        font-style: normal;
        font-weight: normal;
        font-size: 13px;
        color: #0f0f0f;
        outline: none;
        &:focus {
          border: 1px solid $colorActive;
        }
      }
    }
  }
}
.post-poll-dialog {
  &__container {
    overflow: auto;
    height: 60vh;
    padding: 0 10px;
  }
  .app-empty {
    border: none;
  }
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, onMounted, onUnmounted, reactive, watch, ref } from 'vue';
import { Form, Field } from 'vee-validate';
import * as yup from 'yup';

import { useInit } from '@/services/shared/utils';
import { GroupMemberModel, GroupPostModel, PostPollModel } from '@/services/features/group/group.model';
import GroupMemberListItemComponent from '@/components/features/group/GroupMemberListItemComponent.vue';
import {
  addPollOptionByUser,
  addPollOption,
  submitPollOption,
  findRespondentByAnswerId,
  removeOptionPoll,
} from '@/services/features/group/group.service';
import { ApiRequestPaging } from '@/models/api-request';
import { ApiResponsePaging } from '@/models/api-response';
import UserAvatarComponent from '@/components/features/user-profile/UserAvatarComponent.vue';

// Định nghĩa data type của component [props] bằng Typescript
class PostPollComponentProps {
  modelValue: any;
  post: any;
}

// Định nghĩa data type của component [data] bằng Typescript
class PostPollComponentData {
  isLoading: boolean;
  dataSource: PostPollModel | null;
  post: GroupPostModel;
  ratioData: string | null;
  checkboxData: any;
  listPollVisible: boolean;
  confirmRemovePollVisible: boolean;
  listRespondent: {
    isLoading: boolean;
    isLoadingMore: boolean;
    queryParams: ApiRequestPaging;
    paging: ApiResponsePaging<GroupMemberModel> | null;
    totalItems: GroupMemberModel[] | null;
  };
  answerId: string | null;
}

export default defineComponent({
  name: 'PostPollComponent',
  components: {
    Form,
    Field,
    UserAvatarComponent,
    GroupMemberListItemComponent,
  },
  props: {
    modelValue: {
      type: Object,
      default: null,
      required: true,
    },
    post: {
      type: Object,
      default: null,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props: PostPollComponentProps, { emit }: any) {
    // Setup Default
    const { base, currentUser } = useInit();
    const idRatio = props.modelValue.answers ? props.modelValue.answers.find((x: any) => x.isVoted === true) : null;
    const data = reactive<PostPollComponentData>({
      isLoading: false,
      dataSource: { ...props.modelValue }, // Lưu vào biến thuộc component để xử lý nội bộ
      post: { ...props.post },
      ratioData: idRatio ? idRatio.id : null,
      checkboxData: {},
      listPollVisible: false,
      confirmRemovePollVisible: false,
      listRespondent: {
        isLoading: false,
        isLoadingMore: false,
        queryParams: {
          page: 1,
          pageSize: 10,
          q: '',
        },
        paging: null,
        totalItems: null,
      },
      answerId: null,
    });
    watch(
      () => props.modelValue,
      (newValue, oldValue) => {
        data.dataSource = newValue || null;
        const idRatio = newValue.answers ? newValue.answers.find((x: any) => x.isVoted === true) : null;
        data.ratioData = idRatio ? idRatio.id : null;
        for (const answer of newValue.answers) {
          data.checkboxData[answer.id] = answer.isVoted;
        }
      },
      {
        deep: true,
      }
    );

    // Template ref
    const scrollRespondentComponent = ref(null);

    const isChecked = (id: string) => {
      return data.checkboxData ? data.checkboxData[id] : false;
    };

    const handleSubmitAddPollOption = async (values: { answer: string }, actions: { resetForm: () => void }) => {
      let result: any;
      if (data.dataSource && data.dataSource.id && currentUser.value && data.post.createdBy === currentUser.value.id) {
        const model = {
          id: data.post.id,
          questionId: data.dataSource.id,
          answer: values.answer,
        };
        result = await addPollOption(model);
        base.toast.success('Thêm thành công');
      }
      if (data.dataSource && data.dataSource.id && currentUser.value && data.post.createdBy !== currentUser.value.id) {
        const model: any = {
          id: data.post.id,
          userId: currentUser.value.id,
          questionId: data.dataSource.id,
          answer: values.answer,
        };
        result = await addPollOptionByUser(model);
        base.toast.success('Thêm thành công');
      }
      if (result.result.id && data.dataSource && !data.dataSource.isMultipleSelection) {
        if (result.result.id !== data.ratioData) {
          data.ratioData = result.result.id;
        } else {
          data.ratioData = null;
        }
      }
      actions.resetForm();
    };

    const submitPollOptionHandle = async (id: string) => {
      if (data.dataSource && data.dataSource.id) {
        // Update UI client
        if (data.dataSource.isMultipleSelection) {
          data.checkboxData[id] = !data.checkboxData[id];
        } else {
          if (id !== data.ratioData) {
            data.ratioData = id;
          } else {
            data.ratioData = null;
          }
        }
        // Submit option
        const model: any = {
          id: data.post.id,
          userId: currentUser.value.id,
          questionId: data.dataSource.id,
          answerId: id,
        };
        await submitPollOption(model);
      }
    };

    // Setup Form
    const formData = {
      answer: '',
    };
    const formValidation = yup.object().shape({
      answer: yup.string().label('Lý do').required('Vui lòng nhập thêm ý kiến!'),
    });

    const loadRespondent = async (param: any) => {
      data.isLoading = true;
      try {
        data.listRespondent.queryParams.page = 1;
        data.listRespondent.queryParams.questionId = param.questionId;
        data.listRespondent.queryParams.answerId = param.answerId;
        // Lấy chi tiết nhóm
        const response = await findRespondentByAnswerId(param.postId, data.listRespondent.queryParams);
        data.listRespondent.paging = response;
        data.listRespondent.totalItems = response?.rows || null;
      } finally {
        data.listRespondent.isLoading = false;
      }
    };

    const viewListPollVisible = (isVisible: boolean, param?: any) => {
      data.listPollVisible = isVisible;
      if (param) {
        data.answerId = param.answerId;
        loadRespondent(param);
      }
    };
    const dialogConfirm = (isVisible: boolean, param?: any) => {
      data.confirmRemovePollVisible = isVisible;
      if (param) {
        data.answerId = param.answerId;
      }
    };

    // Submit dialog bài viết
    const handleSubmitRemovePoll = async (param: any) => {
      dialogConfirm(false, null);
      await removeOptionPoll(param);
      base.toast.success('Xóa thành công');
    };

    const loadMoreRespondent = async (param: any) => {
      if (
        !data.listRespondent.isLoadingMore &&
        data.listRespondent.totalItems &&
        data.listRespondent.paging &&
        data.listRespondent.paging.total &&
        data.listRespondent.paging.total > data.listRespondent.totalItems.length
      ) {
        data.listRespondent.isLoadingMore = true;
        data.listRespondent.queryParams.questionId = param.questionId;
        data.listRespondent.queryParams.answerId = data.answerId;
        try {
          data.listRespondent.queryParams.page++;
          const response = await findRespondentByAnswerId(param.postId, data.listRespondent.queryParams);
          data.listRespondent.paging = response;
          if (data.listRespondent.totalItems) {
            data.listRespondent.totalItems =
              response && response.rows ? data.listRespondent.totalItems.concat(response.rows) : null;
          } else {
            data.listRespondent.totalItems = response && response.rows ? response.rows : null;
          }
        } catch (err) {
          data.listRespondent.queryParams.page--;  // Revert queryParams
        } finally {
          data.listRespondent.isLoadingMore = false;
        }
      }
    };

    const handleScroll = (e: any) => {
      const element: any = scrollRespondentComponent.value;
      if (
        props.modelValue &&
        props.post &&
        element &&
        element.getBoundingClientRect().bottom - element.offsetTop < window.innerHeight
      ) {
        loadMoreRespondent({ questionId: props.modelValue.id, postId: props.post.id });
      }
    };

    // Life circle
    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
      for (const answer of props.modelValue.answers) {
        data.checkboxData[answer.id] = answer.isVoted;
      }
    });
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      scrollRespondentComponent,
      // Component reactive data
      currentUser,
      data,
      formData,
      formValidation,
      dialogConfirm,
      handleSubmitRemovePoll,
      viewListPollVisible,
      handleSubmitAddPollOption,
      submitPollOptionHandle,
      // Functions
      isChecked,
    };
  },
});
</script>
