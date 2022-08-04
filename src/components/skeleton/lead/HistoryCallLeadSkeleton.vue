<template>
  <div class="history-call-lead-list-item-aside-skeleton">
    <div class="history-call-lead-list-item-aside-skeleton__info app-skeletor"></div>
    <div class="history-call-lead-list-item-aside-skeleton__info app-skeletor"></div>
    <div class="history-call-lead-list-item-aside-skeleton__info app-skeletor"></div>
    <div class="history-call-lead-list-item-aside-skeleton__info app-skeletor"></div>
    <div class="history-call-lead-list-item-aside-skeleton__info app-skeletor"></div>
    <div class="history-call-lead-list-item-aside-skeleton__info app-skeletor"></div>
    <div class="history-call-lead-list-item-aside-skeleton__info app-skeletor"></div>
    <div class="history-call-lead-list-item-aside-skeleton__info app-skeletor"></div>
    <div class="history-call-lead-list-item-aside-skeleton__info app-skeletor"></div>
    <div class="history-call-lead-list-item-aside-skeleton__info app-skeletor"></div>
    <div class="history-call-lead-list-item-aside-skeleton__info app-skeletor"></div>
  </div>
</template>

<style lang="scss" scoped>
.history-call-lead-list-item-aside-skeleton {
  height: 640px;
  border: $border;
  border-radius: $borderRadius;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 10px;
  row-gap: 10px;
  &__info {
    width: 100%;
    height: 50px;
    border-radius: 10px;
  }
}
</style>

<script lang="ts">
// Composition API
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HistoryCallLeadSkeleton',
});
</script>
