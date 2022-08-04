<template>
  <el-dialog
    :append-to-body="true"
    :model-value="data.visible"
    @closed="handleDialogClosed"
    width="350px"
    custom-class="app-dialog-no-padding user-detail-dialog"
  >
    <div class="user-detail-dialog__container">
      <div class="user-detail-dialog__container__section-top">
        <UserAvatarComponent
          :currentUser="data.dataSource"
          class="user-detail-dialog__container__section-top__avatar"
        />
        <span class="user-detail-dialog__container__section-top__title">{{ data.dataSource?.name }}</span>
        <UserStatusComponent v-if="data.dataSource" :status="data.dataSource.status" />
      </div>
      <div class="user-detail-dialog__container__section-bottom">
        <div class="user-detail-dialog__container__section-bottom__row">
          <span class="user-detail-dialog__container__section-bottom__row__label">Số điện thoại:</span>
          <span class="user-detail-dialog__container__section-bottom__row__value">{{ data.isHasViewContact? data.dataSource?.phone : markPhone(data.dataSource?.phone) }}</span>
        </div>
        <div class="user-detail-dialog__container__section-bottom__row">
          <span class="user-detail-dialog__container__section-bottom__row__label">Email:</span>
          <span class="user-detail-dialog__container__section-bottom__row__value">{{ data.isHasViewContact? data.dataSource?.email : markEmail(data.dataSource?.email) }}</span>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.user-detail-dialog {
  &__container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    &__section-top {
      padding: 15px;
      background: linear-gradient(180deg, #dd0000 0%, #840000 100%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      row-gap: 5px;
      &__avatar {
        width: 54px;
        height: 54px;
        border-radius: 50%;
        border: 2px solid #de5e56;
      }
      &__title {
        font-style: normal;
        font-weight: bold;
        font-size: 13px;
        text-align: center;
        text-transform: uppercase;
        color: #ffffff;
      }
    }
    &__section-bottom {
      padding: 15px 50px;
      background-color: #ffffff;
      display: flex;
      flex-direction: column;
      row-gap: 5px;
      &__row {
        display: flex;
        flex-direction: row;
        align-items: center;
        &__label {
          width: 100px;
          font-style: normal;
          font-weight: normal;
          font-size: 13px;
          color: $colorNeutral;
        }
        &__value {
          font-style: normal;
          font-weight: 500;
          font-size: 13px;
          color: #0f0f0f;
        }
      }
    }
  }
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, onMounted, reactive, watch } from 'vue';
import { useInit } from '@/services/shared/utils';
import UserAvatarComponent from '@/components/features/user-profile/UserAvatarComponent.vue';
import UserStatusComponent from '@/components/features/user-profile/UserStatusComponent.vue';
import { checkHasAuthority } from '@/services/shared/utils';
import { markPhone } from '@/services/shared/utils';
import { markEmail } from '@/services/shared/utils';

// Định nghĩa data type của component [props] bằng Typescript
class UserDetailDialogProps {
  modelValue: any;
  visible: boolean;
}

// Định nghĩa data type của component [data] bằng Typescript
class UserDetailDialogData {
  isLoading: boolean;
  dataSource: any | null;
  visible: boolean;
  isHasViewContact: boolean;
}

export default defineComponent({
  name: 'UserDetailDialog',
  components: { UserAvatarComponent, UserStatusComponent },
  props: {
    modelValue: {
      type: Object,
      default: null,
      required: true,
    },
    visible: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  emits: ['update:modelValue', 'update:visible'],
  setup(props: UserDetailDialogProps, { emit }: any) {
    // Setup Default
    const { base, userPermission } = useInit();
    const data = reactive<UserDetailDialogData>({
      isLoading: false,
      dataSource: { ...props.modelValue }, // Lưu vào biến thuộc component để xử lý nội bộ
      visible: props.visible,
      isHasViewContact: false,
    });
    watch(
      () => props.modelValue,
      (newValue, oldValue) => (data.dataSource = newValue || null)
    );
    watch(
      () => props.visible,
      (newValue, oldValue) => (data.visible = newValue)
    );

    const handleDialogClosed = () => {
      data.visible = false;
      emit('update:visible', data.visible);
    };

    // Life cylce
    onMounted(() => {
      const result = checkHasAuthority(['property.ticket.view-full-contact'], userPermission);
      if (result) {
        data.isHasViewContact = true;
      }
    });

    return {
      // Component reactive data
      data,
      // Life cycle
      onMounted,
      // Functions
      handleDialogClosed,
      checkHasAuthority,
      markPhone,
      markEmail
    };
  },
});
</script>
