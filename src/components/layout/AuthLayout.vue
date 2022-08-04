<template>
  <div class="auth-layout">
    <div class="auth-layout__section-left">
      <div class="auth-layout__section-left__background"></div>
      <img src="@/assets/logo_white.svg" alt="logo-white" />
    </div>
    <div class="auth-layout__section-right">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth-layout {
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  &__section-left {
    flex: 1;
    background: linear-gradient(180deg, $colorPrimary 0%, #840000 100%);
    position: relative;
    &__background {
      background: transparent url('~@/assets/feature/auth/bg.png') center center no-repeat;
      width: 100%;
      height: 100%;
      mix-blend-mode: overlay;
      background-size: cover;
    }
    & > img {
      position: absolute;
      top: 135px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  &__section-right {
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'AuthLayout',
  setup() {
    const data = reactive({});
    // Life circle
    return { data };
  },
});
</script>
