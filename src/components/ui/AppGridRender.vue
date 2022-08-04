<template>
  <div class="app-grid-render">
    <button class="app-grid-render__btn app-btn app-btn-secondary" @click="goPhone()">
      <img src="@/assets/icons/colorful/icon_phone.svg" />
      <span>Gọi lại</span>
    </button>
  </div>
  <el-dialog v-model="data.dialog.isShow" :title="data.dialog.title" width="30%">
    <span>{{ data.dialog.content }}</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button class="default" @click="data.dialog.isShow = false">Cancel</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.app-grid-render {
  &__btn {
    padding: 0 25px;
  }
}
</style>

<script lang="ts">
import { findLeadById } from '@/services/features/lead/lead.service';
import { defineComponent, reactive } from 'vue';
import { ElLoading } from 'element-plus';
import { VoiceCallService } from '@/services/features/stringee/stringee.service';
import { useInit } from '@/services/shared/utils';

class AppGridData {
  notification: any;
  dialog: any | null;
}

export default defineComponent({
  name: 'AppGridRender',
  setup(props: any, { emit }: any) {
    const { stringeeToken } = useInit();
    const data = reactive<AppGridData>({
      notification: {},
      dialog: {
        isShow: false,
        title: '',
        content: '',
      },
    });
    const goPhone = async () => {
      const leadResponse = await findLeadById(props.params.data.to.agentInfo.id);
      const lead = leadResponse.result;
      const requestCallRoute = {
        toNumber: lead?.isUsingPhoneId && lead?.phoneId ? lead?.phoneId : lead?.phone,
        name: lead?.isUsingPhoneId && lead?.phoneId ? lead?.phoneId : lead?.phone,
        isPhoneId: lead?.isUsingPhoneId ? true : false,
        isMobileCarrier: lead?.isCallingViaCarrier,
        mobileCarriers: lead?.callingMethodCarrier,
        numberMobileMethodCarriers: lead?.numberMobileMethodCarriers,
        idLead: lead?.id,
        exploitStatus: lead?.exploitStatus,
        lead: lead,
      };
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      try {
        await VoiceCallService.prototype.callOutWithRouteCall(requestCallRoute);
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
      //   TODO
    };
    return {
      data,
      stringeeToken,
      goPhone,
    };
  },
});
</script>
