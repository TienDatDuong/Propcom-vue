<template>
  <div class="home">
    <HomeFilterComponent />
    <NewsHighlightsComponent />
    <GroupCarouselComponent v-if="isLoggedIn" />
  </div>
</template>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  background: #ffffff;
}
</style>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';
import { useInit } from '@/services/shared/utils';
import HomeFilterComponent from '@/components/features/home/HomeFilterComponent.vue';
import NewsHighlightsComponent from '@/components/features/news/NewsHighlightsComponent.vue';
import GroupCarouselComponent from '@/components/features/group/GroupCarouselComponent.vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    HomeFilterComponent,
    NewsHighlightsComponent,
    GroupCarouselComponent,
  },
  setup() {
    // Setup Default
    const { base, isLoggedIn } = useInit();
    const data = reactive({});
    // Computed

    // Function
    return {
      // Data
      data,
      // Computed
      isLoggedIn,
      // Function
    };
  },
});
</script>
