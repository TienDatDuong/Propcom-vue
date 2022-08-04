<template>
  <div class="group-suggest-page">
    <PropskillHeaderComponent :searchText="data?.routeQueryParams?.q" @onSearch="handleSearch" />
  </div>
</template>

<style lang="scss" scoped>
.group-suggest-page {
  &__container {
    display: flex;
    flex-direction: row;
    column-gap: 30px;
    padding-top: 40px;
    padding-bottom: 40px;
  }
  &__list {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }
  .app-pagination {
    margin-top: 20px;
  }
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, onMounted } from 'vue';
import { useInit, encapsulateUrl } from '@/services/shared/utils';
import {} from '@/services/features/elearning/elearning.service';
import PropskillHeaderComponent from '@/components/features/elearning/PropskillHeaderComponent.vue';

export default defineComponent({
  name: 'PropskillHistoryStudyPage',
  components: { PropskillHeaderComponent },
  setup() {
    // Setup Default
    const { base } = useInit();
    return {};
  },
});
</script>