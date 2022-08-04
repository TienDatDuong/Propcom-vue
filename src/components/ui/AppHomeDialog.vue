<template>
  <el-dialog :model-value="data.visible" width="90%" custom-class="app-home-dialog" :show-close="false">
    <div class="app-home-dialog-content">
      <div class="app-home-dialog-content__img">
        <PlaceholderApp />
      </div>
      <div class="app-home-dialog-content__subtitle">
        <span>Tải app để trải nghiệm ứng dụng Propcom trên điện thoại dễ dàng hơn</span>
      </div>
      <div class="app-home-dialog-content__action">
        <button class="app-btn app-btn-primary" @click="goToApp">Tải app ngay</button>
      </div>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.app-home-dialog {
  &-content {
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    &__subtitle {
      width: 80%;
      text-align: center;
      word-break: break-word;
    }
    &__action {
      margin-top: 30px;
      & .app-btn.app-btn-primary {
        padding: 8px 60px;
      }
    }
    &__img {
      & img {
        width: 100%;
      }
    }
  }
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, watch } from 'vue';
import { useInit } from '@/services/shared/utils';
import PlaceholderApp from '@/components/ui/icon/PlaceholderApp.vue';

// Định nghĩa data type của component [props] bằng Typescript
class HomeAppDialogProps {
  visible: boolean;
}

export default defineComponent({
  name: 'AppHomeDialog',
  components: {
    PlaceholderApp,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  emits: ['update:visible', 'goToApp'],
  setup(props: HomeAppDialogProps, { emit }: any) {
    // Setup Default
    const { base } = useInit();
    const data = reactive({
      visible: props.visible,
    });

    watch(
      () => props.visible,
      (newValue, oldValue) => (data.visible = newValue)
    );

    const goToApp = () => {
      emit('goToApp');
    };

    return {
      // Component reactive data
      data,
      // Functions
      goToApp,
    };
  },
});
</script>
