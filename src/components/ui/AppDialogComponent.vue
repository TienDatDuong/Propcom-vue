<template>
  <!-- Dialog -->
  <Dialog as="div" :initialFocus="completeButtonRef" :open="isShow" @close="onClose" class="app-dialog">
    <div class="app-dialog-box">
      <DialogTitle class="app-dialog__header">
        <span class="app-dialog__title">{{ title }}</span>
      </DialogTitle>
      <DialogDescription>
        <span class="app-dialog__content">{{ content }}</span>
      </DialogDescription>
      <button ref="completeButtonRef">OK</button>
    </div>
  </Dialog>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Dialog, DialogOverlay, DialogTitle, DialogDescription } from '@headlessui/vue';

// Định nghĩa data type của component [props] bằng Typescript
class AppDialogComponentProps {
  isShow: boolean;
  title: string;
  content: string;
}

export default defineComponent({
  name: 'AppDialogComponent',
  components: {
    Dialog,
    DialogTitle,
    DialogDescription,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
      required: true,
    },
    title: {
      type: String,
      default: '',
      required: true,
    },
    content: {
      type: String,
      default: '',
      required: true,
    },
  },
  setup(props: AppDialogComponentProps, { emit }: any) {
    const completeButtonRef = ref(null);
    const onClickPrimary = () => emit('onClickPrimary');
    const onClickSecondary = () => emit('onClickSecondary');
    const onClose = () => emit('onClose');
    return { completeButtonRef, onClickPrimary, onClickSecondary, onClose };
  },
});
</script>
