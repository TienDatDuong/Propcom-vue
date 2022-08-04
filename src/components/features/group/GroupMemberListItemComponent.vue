<template>
  <TransitionRoot
    :show="data.isShowing"
    enter="transition-opacity duration-100"
    enter-from="opacity-0"
    enter-to="opacity-100"
    leave="transition-opacity duration-100"
    leave-from="opacity-100"
    leave-to="opacity-0"
  >
    <div class="group-member-list-item-component" v-if="data.dataSource">
      <UserAvatarComponent
        :currentUser="data.dataSource"
        class="group-member-list-item-component__avatar"
        @click="handleDialogUserVisible(true)"
      />
      <div class="group-member-list-item-component__info">
        <div class="group-member-list-item-component__info__header">
          <a
            href="javascript:;"
            class="group-member-list-item-component__info__name"
            @click="handleDialogUserVisible(true)"
          >
            {{ data.dataSource.name }}
          </a>
          <template v-if="data.dataSource.requestedDate">
            <div class="app-dot-seperator"></div>
            <span class="group-member-list-item-component__info__requested-date">
              {{ getTimeSince(data.dataSource.requestedDate) }}
            </span>
          </template>
        </div>
        <span v-if="data.dataSource.joinedDate" class="group-member-list-item-component__info__joined-date"
          >Tham gia từ {{ formatDate(data.dataSource.joinedDate) }}
        </span>
        <span class="group-member-list-item-component__info__status">{{ getStatus(data.dataSource.status) }} </span>
        <span v-if="data.dataSource.rejectBy" class="group-member-list-item-component__info__reject-by"
          >Từ chối bởi {{ data.dataSource.rejectBy.name }}
        </span>
      </div>
      <!-- Actions -->
      <template v-if="data.dataSource.requestStatus === GroupMemberRequestStatusEnum.WAITING">
        <!-- Đang chờ duyệt -->
        <button
          v-if="isAdmin"
          @click="handleAcceptJoin(groupId, data.dataSource.userId)"
          class="app-btn app-btn-primary"
        >
          chấp nhận
        </button>
        <button v-if="isAdmin" @click="toggleDialogReject(true)" class="app-btn">từ chối</button>
      </template>
      <template v-else-if="data.dataSource.requestStatus === GroupMemberRequestStatusEnum.REJECT">
        <!-- Đã bị từ chối -->
        <button
          v-if="isAdmin"
          @click="handleReacceptJoin(groupId, data.dataSource.userId)"
          class="app-btn app-btn-secondary"
        >
          chấp nhận lại
        </button>
      </template>
      <template v-else>
        <!-- Thành viên -->
        <div v-if="data.dataSource.isAdmin" class="group-member-list-item-component__banner-admin">
          <img src="@/assets/icons/colorful/icon_member.svg" />
          <span>Admin</span>
        </div>
        <button
          v-if="isAdmin && !data.dataSource.isAdmin && data.dataSource.userId !== currentUser.id && !isAddMember"
          @click="handleSubmitRemove"
          class="app-btn"
        >
          Mời ra khỏi nhóm
        </button>
        <button
          v-if="
            isAdmin &&
            !data.dataSource.isAdmin &&
            data.dataSource.userId !== currentUser.id &&
            isAddMember &&
            ![GroupMemberRequestStatusEnum.APPROVED, GroupMemberRequestStatusEnum.REJECT].includes(
              data.dataSource.groupStatus
            )
          "
          @click="handleAddMember(groupId, data.dataSource.id)"
          class="app-btn app-btn-primary"
        >
          Thêm
        </button>
        <button
          v-if="
            isAdmin &&
            !data.dataSource.isAdmin &&
            data.dataSource.userId !== currentUser.id &&
            isAddMember &&
            data.dataSource.groupStatus === GroupMemberRequestStatusEnum.APPROVED
          "
          @click="handleAddMember(groupId, data.dataSource.id)"
          class="app-btn"
          disabled
        >
          Thêm
        </button>
        <button
          v-if="
            isAdmin &&
            !data.dataSource.isAdmin &&
            data.dataSource.userId !== currentUser.id &&
            isAddMember &&
            data.dataSource.groupStatus === GroupMemberRequestStatusEnum.REJECT
          "
          @click="handleReacceptJoin(groupId, data.dataSource.id)"
          class="app-btn app-btn-secondary"
        >
          chấp nhận lại
        </button>
      </template>
    </div>
  </TransitionRoot>

  <el-dialog v-model="data.dialogRejectVisible" width="500px" custom-class="app-dialog">
    <template #title>
      <span class="app-dialog-title">Xác nhận từ chối</span>
    </template>
    <div class="app-dialog-content">
      <Form
        validate-on-submit
        :validation-schema="formValidation"
        :initial-values="formData"
        @submit="handleSubmitReject"
      >
        <Field name="reason" v-slot="{ field, handleChange, handleBlur, errorMessage }">
          <div class="app-input">
            <label class="app-input__form__label"
              >Lý do từ chối<span class="app-input__form__label-required">*</span>
            </label>
            <el-input
              :modelValue="field.value"
              @input="handleChange"
              @blur="handleBlur"
              size="small"
              placeholder="Nhập lý do từ chối"
              class="input-form"
            >
              <template #append>
                <div class="underline" v-bind:class="{ invalid: errorMessage }"></div>
              </template>
            </el-input>
            <div v-if="errorMessage" class="input-error">
              <img src="@/assets/icons/colorful/icon_error.svg" alt="form-error" />
              <span class="form-error">{{ errorMessage }}</span>
            </div>
          </div>
        </Field>
        <div class="app-dialog-content__actions">
          <button @click="toggleDialogReject(false)" type="button" class="app-btn">hủy</button>
          <button type="submit" class="app-btn app-btn-primary">Xác nhận</button>
        </div>
      </Form>
    </div>
  </el-dialog>

  <UserDetailDialog v-model="data.dataSource" v-model:visible="data.dialogUserDetailVisible" />
</template>

<style lang="scss" scoped>
.group-member-list-item-component {
  padding: 20px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 10px;
  border-bottom: $border;
  &__avatar {
    cursor: pointer;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  &__info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    &__header {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      column-gap: 5px;
    }
    &__name {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      color: #0f0f0f;
      text-decoration: none;
    }
    &__requested-date {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      color: #a7a7a7;
    }
    &__joined-date {
      font-style: normal;
      font-weight: normal;
      font-size: 13px;
      color: $colorNeutral;
    }
    &__status {
      font-style: normal;
      font-weight: normal;
      font-size: 13px;
      color: #d6d6d6;
    }
    &__reject-by {
      font-style: normal;
      font-weight: normal;
      font-size: 13px;
      color: $colorActive;
    }
  }
  &__banner-admin {
    min-width: 90px;
    padding: 7px 12px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    column-gap: 5px;
    background: $colorSecondary;
    border-radius: 100px;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    color: $colorActive;
  }
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, watch } from 'vue';
import { TransitionRoot } from '@headlessui/vue';
import { Form, Field } from 'vee-validate';
import * as yup from 'yup';
import { GroupMemberRequestStatusEnum, GroupMemberModel } from '@/services/features/group/group.model';
import { formatDate, useInit } from '@/services/shared/utils';
import {
  approveGroupMember,
  getTimeSince,
  rejectGroupMember,
  removeGroupMember,
  addGroupMember,
} from '@/services/features/group/group.service';
import { getStatus } from '@/services/features/employee/employee.service';
import UserDetailDialog from '@/components/features/user-profile/UserDetailDialog.vue';
import UserAvatarComponent from '@/components/features/user-profile/UserAvatarComponent.vue';

// Định nghĩa data type của component [props] bằng Typescript
class GroupMemberListItemComponentProps {
  groupId: string;
  dataSource?: GroupMemberModel;
  isAdmin?: boolean;
  isAddMember?: boolean;
}

// Định nghĩa data type của component [data] bằng Typescript
class GroupMemberListItemComponentData {
  isLoading: boolean;
  isShowing: boolean;
  dialogRejectVisible: boolean;
  dataSource: GroupMemberModel;
  dialogUserDetailVisible: boolean;
}

export default defineComponent({
  name: 'GroupMemberListItemComponent',
  components: {
    Form,
    Field,
    TransitionRoot,
    UserDetailDialog,
    UserAvatarComponent,
  },
  props: {
    groupId: {
      type: String,
      required: true,
    },
    dataSource: {
      type: GroupMemberModel,
      required: false,
    },
    isAdmin: {
      type: Boolean,
      required: false,
    },
    isAddMember: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['update:dataSource'],
  setup(props: GroupMemberListItemComponentProps, { emit }: any) {
    const { base, currentUser } = useInit();
    const data = reactive<GroupMemberListItemComponentData>({
      isLoading: false,
      isShowing: true,
      dialogRejectVisible: false,
      dataSource: props.dataSource ? { ...props.dataSource } : new GroupMemberModel(),
      dialogUserDetailVisible: false,
    });
    watch(
      () => props.dataSource,
      (newValue, oldValue) => {
        data.dataSource = new GroupMemberModel(newValue) || null;
      }
    );
    // Setup Form
    const formData = {
      reason: '',
    };
    const formValidation = yup.object().shape({
      reason: yup.string().label('Lý do từ chối').required('Vui lòng nhập lý do từ chối!'),
    });
    // Function
    // Ẩn/hiện dialog từ chối duyệt thành viên
    const toggleDialogReject = (isVisible: boolean) => (data.dialogRejectVisible = isVisible);
    // Duyệt thành viên
    const handleAcceptJoin = async (groupId: string, id: string) => {
      await approveGroupMember({ groupId, id });
      base.toast.success('Chấp nhận thành viên vào nhóm thành công');
      data.dataSource.requestStatus = GroupMemberRequestStatusEnum.APPROVED;
      emit('update:dataSource', new GroupMemberModel(data.dataSource));
      // Ẩn item đi
      data.isShowing = false;
    };
    // Duyệt lại thành viên đã từ chối
    const handleReacceptJoin = async (groupId: string, id: string) => {
      await approveGroupMember({ groupId, id });
      base.toast.success('Chấp nhận thành viên vào nhóm thành công');
      data.dataSource.requestStatus = GroupMemberRequestStatusEnum.APPROVED;
      emit('update:dataSource', new GroupMemberModel(data.dataSource));
      // Ẩn item đi
      data.isShowing = false;
    };
    // Từ chối duyệt thành viên
    const handleRejectJoin = async (values: { reason: string }, groupId: string, id: string) => {
      await rejectGroupMember({ groupId, id, reason: values.reason });
      base.toast.success('Từ chối duyệt thành viên thành công');
      data.dataSource.requestStatus = GroupMemberRequestStatusEnum.REJECT;
      emit('update:dataSource', new GroupMemberModel(data.dataSource));
      // Ẩn item đi
      data.isShowing = false;
    };
    // Xóa thành viên
    const handleRemoveMember = async (groupId: string, id: string) => {
      await removeGroupMember({ groupId, id });
      base.toast.success('Xóa thành viên thành công');
      // Ẩn item đi
      data.isShowing = false;
    };
    const handleSubmitReject = async (values: { reason: string }) => {
      toggleDialogReject(false);
      if (data.dataSource && data.dataSource.userId) {
        await handleRejectJoin(values, props.groupId, data.dataSource.userId);
      }
    };
    // Thêm thành viên
    const handleAddMember = async (groupId: string, id: string) => {
      await addGroupMember({ groupId, id });
      base.toast.success('Thêm thành viên thành công');
      // Ẩn item đi
      data.isShowing = false;
    };
    const handleSubmitRemove = async () => {
      if (data.dataSource && data.dataSource.userId) {
        await handleRemoveMember(props.groupId, data.dataSource.userId);
      }
    };
    // Ẩn/hiện dialog user
    const handleDialogUserVisible = (isVisible: boolean) => {
      data.dialogUserDetailVisible = isVisible;
    };

    return {
      GroupMemberRequestStatusEnum,
      // Component reactive data
      currentUser,
      data,
      // Form
      formValidation,
      formData,
      // Function
      formatDate,
      getTimeSince,
      getStatus,
      toggleDialogReject,
      handleAcceptJoin,
      handleReacceptJoin,
      handleSubmitReject,
      handleSubmitRemove,
      handleDialogUserVisible,
      handleAddMember,
    };
  },
});
</script>
