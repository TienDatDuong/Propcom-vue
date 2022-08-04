<template>
  <div class="app-aside-advertisement app-hover-effect"></div>
</template>

<style lang="scss" scoped>
.app-aside-advertisement {
  cursor: pointer;
  width: 100%;
  // height: 100%;
  max-height: 600px;
  // padding-top: 200%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
  // padding-top: 72%; /* 216px / 300px Aspect Ratio (divide 216 by 300 = 0.72) */
  padding-top: 200%; /* 600px / 300px Aspect Ratio (divide 600 by 300 = 2.00) */
  border-radius: $borderRadius;
  background: url("~@/assets/images/app-banner.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppAsideAdvertisement',
  emits: ['onAction'],
  setup(props: any, { emit }: any) {
    const onClick = () => emit('onAction');
    return {
      onClick,
    };
  },
});
</script>