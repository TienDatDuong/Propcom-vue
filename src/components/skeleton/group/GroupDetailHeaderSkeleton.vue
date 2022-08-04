<template>
  <div class="group-detail-header-skeleton app-skeletor">
    <div class="container-xl group-detail-header-skeleton__container">
      <div class="group-detail-header-skeleton__breadcrumb app-skeletor"></div>

      <div class="group-detail-header-skeleton__name-group">
        <div class="group-detail-header-skeleton__name-group__section-left">
          <span
            class="
              group-detail-header-skeleton__name-group__section-left__title
              app-skeletor
            "
          ></span>
          <div
            class="
              group-detail-header-skeleton__name-group__section-left__active-time
            "
          >
            <div
              class="
                group-detail-header-skeleton__name-group__section-left__active-time__img-wapper
              "
            >
              <img src="@/assets/icons/colorful/icon_clock_white.svg" />
            </div>
            <span
              class="
                group-detail-header-skeleton__name-group__section-left__active-time__text
                app-skeletor
              "
            ></span>
          </div>
        </div>
        <div
          class="group-detail-header-skeleton__name-group__section-right"
        ></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.group-detail-header-skeleton {
  width: 100%;
  height: 220px;
  display: flex;
  min-height: 100%;
  &__container {
    height: 100%;
    padding-top: 25px;
    padding-bottom: 25px;
    display: flex;
    flex-direction: column;
  }
  &__breadcrumb {
    width: 200px;
    height: 13px;
  }
  &__name-group {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    &__section-left {
      display: flex;
      flex-direction: column;
      &__title {
        width: 400px;
        height: 28px;
      }
      &__active-time {
        display: flex;
        flex-direction: row;
        align-items: center;
        &__img-wapper {
          margin-right: 10px;
        }
        &__text {
          width: 200px;
          height: 14px;
        }
      }
    }
    &__section-right {
      align-items: center;
    }
  }
}
</style>

<script lang="ts">
// Composition API
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GroupDetailHeaderSkeleton',
});
</script>