<template>
  <div class="home-layout">
    <HomeLayoutHeader></HomeLayoutHeader>
    <slot></slot>
    <HomeLayoutFooter></HomeLayoutFooter>
    <button v-show="data.btnScrollTopVisible" @click="scrollToTop" class="home-layout__btn-top">
      <img src="@/assets/icons/colorful/icon_up.svg" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.home-layout {
  min-height: calc(100% - 80px);
  &__btn-top {
    position: fixed; /* Fixed/sticky position */
    bottom: 50px; /* Place the button at the bottom of the page */
    right: 50px; /* Place the button 30px from the right */
    z-index: 99; /* Make sure it does not overlap */
    width: 40px;
    height: 40px;
    cursor: pointer; /* Add a mouse pointer on hover */
    border: none; /* Remove borders */
    outline: none; /* Remove outline */
    background-color: $colorPrimary; /* Set a background color */
    opacity: 0.6;
    border-radius: $borderRadius; /* Rounded corners */
  }
}
</style>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive } from 'vue';
import HomeLayoutHeader from '@/components/layout/HomeLayoutHeader.vue';
import HomeLayoutFooter from '@/components/layout/HomeLayoutFooter.vue';

export default defineComponent({
  name: 'HomeLayout',
  components: {
    HomeLayoutHeader,
    HomeLayoutFooter,
  },
  setup() {
    const data = reactive({
      btnScrollTopVisible: false,
    });
    const scrollToTop = () => {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    };
    const handleScroll = (e: any) => {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        data.btnScrollTopVisible = true;
      } else {
        data.btnScrollTopVisible = false;
      }
    };
    // Life circle
    onMounted(async () => {
      window.addEventListener('scroll', handleScroll);
    });
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });
    return { data, scrollToTop };
  },
});
</script>
