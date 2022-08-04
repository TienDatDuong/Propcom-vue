<template>
  <div class="app-call-button">
    <a class="app-call-button__icon" :class="{ disabled: !stringeeToken }" @click="onGoPhone(data.currentUser.phone)">
      <img src="~@/assets/images/Call.png" />
    </a>
    <el-dialog v-model="data.dialog.isShow" :title="data.dialog.title" width="30%">
      <span>{{ data.dialog.content }}</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button class="default" @click="data.dialog.isShow = false">Cancel</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.app-call-button {
  &__icon {
    cursor: pointer;
    &.disabled {
      pointer-events: none;
      opacity: 0.6;
    }
  }
  &__modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    &-loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive, watch } from 'vue';
import { useInit } from '@/services/shared/utils';
import { ExploitEnum, LeadModel } from '@/services/features/lead/lead.model';
import { VoiceCallService } from '@/services/features/stringee/stringee.service';
import { ElLoading } from 'element-plus';
import { updateExploitStatus } from '@/services/features/lead/lead.service';

// Định nghĩa data type của component [props] bằng Typescript
class CallComponentProps {
  modelValue: LeadModel;
}
class CallComponentData {
  currentUser: LeadModel | null;
  notification: any;
  dialog: any | null;
}
export default defineComponent({
  name: 'CallComponent',
  props: {
    modelValue: {
      type: LeadModel,
      default: null,
      required: true,
    },
  },
  setup(props: CallComponentProps, { emit: any }) {
    const { base, isLoggedIn, stringeeToken } = useInit();
    const data = reactive<CallComponentData>({
      currentUser: props.modelValue,
      notification: {},
      dialog: {
        isShow: false,
        title: '',
        content: '',
      },
    });

    const onGoPhone = async () => {
      const requestCallRoute = {
        toNumber:
          data.currentUser?.isUsingPhoneId && data.currentUser?.phoneId
            ? data.currentUser?.phoneId
            : data.currentUser?.phone,
        name:
          data.currentUser?.isUsingPhoneId && data.currentUser?.phoneId
            ? data.currentUser?.phoneId
            : data.currentUser?.phone,
        isPhoneId: data.currentUser?.isUsingPhoneId ? true : false,
        isMobileCarrier: data.currentUser?.isCallingViaCarrier,
        mobileCarriers: data.currentUser?.callingMethodCarrier,
        numberMobileMethodCarriers: data.currentUser?.numberMobileMethodCarriers,
        idLead: data.currentUser?.id,
        exploitStatus: data.currentUser?.exploitStatus,
        lead: data.currentUser,
      };
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      try {
        await VoiceCallService.prototype.callOutWithRouteCall(requestCallRoute);

        // Cập nhật trạng thái lead khi bắt đầu gọi điện, để thực hiện khảo sát
        if (
          data.currentUser &&
          (data.currentUser.exploitStatus === ExploitEnum.ASSIGN ||
            data.currentUser.exploitStatus === ExploitEnum.REASSIGN)
        ) {
          await updateExploitStatus({ id: data.currentUser.id, exploitStatus: ExploitEnum.PROCESSING });
        }
        data.notification = await (
          await VoiceCallService.prototype.getNotification()
        ).subscribe((noti: any) => {
          if (!noti.isSuccess) {
            data.dialog.isShow = true;
            data.dialog.title = noti?.error;
            data.dialog.content = noti?.message;
          }
        });
      } finally {
        loading.close();
      }
    };

    onUnmounted(() => {
      data.notification.unsubscribe;
    });

    return {
      isLoggedIn,
      stringeeToken,
      data,
      onGoPhone,
    };
  },
});
</script>
