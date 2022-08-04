<template>
  <div class="app-empty">
    <slot>
      <img src="@/assets/images/placeholder_noti.svg" />
    </slot>
    <span class="app-empty__title"> {{ title }} </span>
    <span class="app-empty__subtitle"> {{ subtitle }} </span>
    <button class="app-btn app-btn-primary app-btn-medium" v-if="action" @click="onClick">
      {{ action }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.app-empty {
  min-height: 480px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border: $border;
  border-radius: $borderRadius;
  &__title {
    margin-top: 20px;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    color: $colorNeutral;
  }
  &__subtitle {
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    color: $colorNeutral;
  }
}
img {
  width: 369px;
  height: 222px;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';

// Định nghĩa data type của component [props] bằng Typescript
class AppEmptyComponentProps {
  title: string;
  subtitle?: string;
  action?: string;
}

export default defineComponent({
  name: 'AppEmptyComponent',
  props: {
    title: {
      type: String,
      default: '',
      required: true,
    },
    subtitle: {
      type: String,
      default: null,
      required: false,
    },
    action: {
      type: String,
      default: null,
      required: false,
    },
  },
  setup(props: AppEmptyComponentProps, { emit }: any) {
    const onClick = () => emit('onAction');
    return {
      onClick,
    };
  },
});
</script>
