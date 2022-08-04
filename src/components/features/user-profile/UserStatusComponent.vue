<template>
  <div class="user-status-component" :class="data.currentUserStatus ? data.currentUserStatus.class : ''">
    <template v-if="status === 'SIGNED_CONTRACT'">
      <img class="user-status-component__icon" src="@/assets/icons/status_icon_signed_contract.png" />
    </template>
    <template v-else-if="status === 'IDENTIFIED'">
      <img class="user-status-component__icon" src="@/assets/icons/status_icon_check.png" />
    </template>
    <template v-else-if="status === 'WAITING'">
      <img class="user-status-component__icon" src="@/assets/icons/status_icon_waiting.png" />
    </template>
    <template v-else>
      <img class="user-status-component__icon" src="@/assets/icons/status_icon_uncheck.png" />
    </template>
    <span class="user-status-component__text">{{ data.currentUserStatus?.text }}</span>
  </div>
</template>

<style lang="scss" scoped>
.user-status-component {
  padding: 2px 6px;
  border-radius: 10px;
  background: #a7a7a7;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 5px;
  &--waiting {
    background: #eda30c;
  }
  &--identified {
    background: #00860a;
  }
  &--signed-contract {
    background: #1890f7;
  }

  &__icon {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  &__text {
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    color: #ffffff;
  }
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, onMounted, reactive, watch } from 'vue';
import { useInit } from '@/services/shared/utils';

// Định nghĩa data type của component [props] bằng Typescript
class UserStatusComponentProps {
  status: string;
}

// Định nghĩa data type của component [data] bằng Typescript
class UserStatusComponentData {
  currentUserStatus: any | null;
}

export default defineComponent({
  name: 'UserStatusComponent',
  props: {
    status: {
      type: String,
      default: null,
      required: true,
    },
  },
  setup(props: UserStatusComponentProps, { emit }: any) {
    // Setup Default
    const { base } = useInit();
    const data = reactive<UserStatusComponentData>({
      currentUserStatus: null,
    });

    const getStatusData = (status: string) => {
      switch (status) {
        case 'INIT':
          data.currentUserStatus = {
            text: 'Chưa xác thực',
            class: '',
          };
          break;
        case 'WAITING':
          data.currentUserStatus = {
            text: 'Chờ xác thực',
            class: 'user-status-component--waiting',
          };
          break;
        case 'IDENTIFIED':
          data.currentUserStatus = {
            text: 'Đã xác thực',
            class: 'user-status-component--identified',
          };
          break;
        case 'REJECTED':
          data.currentUserStatus = {
            text: 'Bị từ chối',
            class: '',
          };
          break;
        case 'SIGNED_CONTRACT':
          data.currentUserStatus = {
            text: 'Đã ký hợp đồng',
            class: 'user-status-component--signed-contract',
          };
          break;
        default:
          data.currentUserStatus = {
            text: '',
            class: '',
          };
          break;
      }
    };

    watch(
      () => props.status,
      (newValue, oldValue) => getStatusData(newValue)
    );
    onMounted(() => getStatusData(props.status));
    return {
      // Component reactive data
      data,
    };
  },
});
</script>
