<template>
  <el-dialog
    :model-value="visible"
    width="700px"
    custom-class="app-dialog project-order-dialog"
    @closed="onClosedDialog"
  >
    <template #title>
      <div class="app-dialog-title">Đăng ký giao dịch</div>
    </template>
    <div class="app-dialog-content">
      <img class="project-order-dialog__placeholder" src="@/assets/images/placeholder_download.svg" />
      <div>
        <p class="project-order-dialog__title">Bạn muốn đăng ký giao dịch sản phẩm?</p>
        <p class="project-order-dialog__subtitle">Vui lòng tải app để trải nghiệm tính năng của Propcom</p>
      </div>
      <div class="project-order-dialog__actions">
        <img src="@/assets/images/qr-code-download.png" alt="QR Code" class="project-order-dialog__actions__qrcode" />
        <a
          href="https://apps.apple.com/vn/app/propcom-c%E1%BB%99ng-%C4%91%E1%BB%93ng-m%C3%B4i-gi%E1%BB%9Bi/id1551955496?l=vi"
          target="_blank"
        >
          <img src="@/assets/images/appstore-download.png" alt="Appstore" />
        </a>
        <a href="https://play.google.com/store/apps/details?id=vn.propcom.app&hl=en&gl=US" target="_blank">
          <img src="@/assets/images/chplay-download.png" alt="CH Play" />
        </a>
      </div>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.project-order-dialog {
  .app-dialog-content {
    padding-top: 30px;
    padding-left: 30px;
    padding-right: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 20px;
  }
  &__placeholder {
    width: 200px;
  }
  &__title {
    margin: 0;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    color: $colorNeutral;
  }
  &__subtitle {
    margin: 0;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    color: $colorNeutral;
  }
  &__actions {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    column-gap: 12px;
    &__qrcode {
      width: 120px;
      height: 120px;
      margin-right: 20px;
    }
  }
}
</style>

<script lang="ts">
import { useInit } from '@/services/shared/utils';
import { defineComponent } from 'vue';

class ProjectOrderDialogProps {
  visible: boolean;
}

export default defineComponent({
  name: 'ProjectOrderDialog',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:visible'],
  setup(props: ProjectOrderDialogProps, { emit }: any) {
    const { base } = useInit();

    const onClosedDialog = () => {
      emit('update:visible', false);
    };

    return {
      onClosedDialog,
    };
  },
});
</script>