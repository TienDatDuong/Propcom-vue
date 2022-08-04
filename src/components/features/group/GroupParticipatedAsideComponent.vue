<template>
  <!-- Loading skeleton items -->
  <div v-if="data.isLoading" class="group-participated-aside">
    <span class="group-participated-aside__title">Nhóm đã tham gia</span>
    <div class="group-participated-aside__card">
      <template v-for="index in 9" :key="index">
        <GroupListItemAsideSkeleton />
      </template>
    </div>
    <button class="app-btn app-btn-large" @click="goToGroupParticipatedPage">Khám phá</button>
  </div>
  <!-- Real items -->
  <div v-if="!data.isLoading" class="group-participated-aside">
    <span class="group-participated-aside__title">Nhóm đã tham gia</span>
    <!-- Items -->
    <template v-if="data.items && data.items.length">
      <div class="group-participated-aside__card">
        <div
          v-for="(item, index) in data.items"
          :key="index"
          class="group-participated-aside__card__item app-hover-effect"
          @click="goToGroupDetailPage(item.id)"
        >
          <template v-if="item.coverImage">
            <div
              class="group-participated-aside__card__item__image"
              :style="
                item.coverImage && {
                  'background-image': 'url(' + encapsulateUrl(item.coverImage) + ')',
                }
              "
            ></div>
          </template>
          <template v-else>
            <img src="@/assets/images/default_image.svg" class="group-participated-aside__card__item__image" />
          </template>
          <div class="group-participated-aside__card__item__info">
            <span class="group-participated-aside__card__item__info__title">{{ item.name }}</span>
            <div class="group-participated-aside__card__item__info__report-container">
              <div class="group-participated-aside__card__item__info__report">
                <img src="@/assets/icons/colorful/group_icon_group.svg" />
                <span>{{ item.totalMembers }}</span>
              </div>
              <div class="group-participated-aside__card__item__info__report">
                <img src="@/assets/icons/colorful/group_icon_post.svg" />
                <span>{{ item.totalPosts }}</span>
              </div>
              <div class="group-participated-aside__card__item__info__report">
                <img src="@/assets/icons/colorful/group_icon_comment.svg" />
                <span>{{ item.totalComments }}</span>
              </div>
            </div>
            <span class="group-participated-aside__card__item__info__subtitle">{{
              `Hoạt động lần cuối ${getTimeSince(item.modifiedDate)} trước`
            }}</span>
          </div>
        </div>
      </div>
    </template>
    <!-- Empty -->
    <template v-else>
      <AppEmptyComponent title="Chưa tham gia nhóm">
        <img src="@/assets/images/placeholder_group.svg" />
      </AppEmptyComponent>
    </template>
    <button v-if="data.items && data.items.length" class="app-btn app-btn-large" @click="goToGroupParticipatedPage">Xem thêm</button>
  </div>
</template>

<style lang="scss" scoped>
.group-participated-aside {
  width: 100%;
  & > *:not(:last-child) {
    margin-bottom: 10px;
  }
  &__title {
    margin-bottom: 12px;
    display: block;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    color: $colorNeutral;
  }
  &__card {
    padding: 20px;
    background-color: #ffffff;
    border: $border;
    border-radius: $borderRadius;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    &__item {
      cursor: pointer;
      display: flex;
      flex-direction: row;
      border-radius: $borderRadius;
      background: white;
      & > *:not(:last-child) {
        margin-right: 16px;
      }
      &__image {
        width: 100px;
        height: 100px;
        border-radius: $borderRadius;
        background: linear-gradient(181.77deg, #dd0000 1.5%, #840000 146.62%);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      }
      &__info {
        flex: 1;
        display: flex;
        flex-direction: column;
        & > *:not(:last-child) {
          margin-bottom: 5px;
        }
        &__title {
          font-style: normal;
          font-weight: bold;
          font-size: 13px;
          line-height: 150%;
          text-transform: uppercase;
          color: #0f0f0f;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        &__subtitle {
          font-style: normal;
          font-weight: normal;
          font-size: 12px;
          color: $colorNeutral;
        }
        &__report-container {
          display: flex;
          flex-direction: row;
          column-gap: 8px;
        }
        &__report {
          padding: 2px 6px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          background: $colorSecondary;
          color: $colorPrimary;
          border-radius: 10px;
          font-style: normal;
          font-weight: normal;
          font-size: 12px;
          line-height: 14px;
          svg,
          img {
            margin-right: 4px;
          }
        }
        &__link {
          font-size: 13px;
          color: #c1c1c1;
        }
      }
    }
  }
  .app-btn {
    width: 100%;
  }
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, watch } from 'vue';
import { useInit, formatDate, encapsulateUrl } from '@/services/shared/utils';
import { getTimeSince } from '@/services/features/group/group.service';
import { GroupModel } from '@/services/features/group/group.model';
import GroupListItemAsideSkeleton from '@/components/skeleton/group/GroupListItemAsideSkeleton.vue';

// Định nghĩa data type của component [data] bằng Typescript
class GroupParticipatedAsideComponentData {
  isLoading: boolean;
  items: GroupModel[] | null;
}

// Định nghĩa data type của component [props] bằng Typescript
class GroupParticipatedAsideComponentProps {
  isLoading: boolean;
  groupParticipated: any[] | null;
}

export default defineComponent({
  name: 'GroupParticipatedAsideComponent',
  components: { GroupListItemAsideSkeleton },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    groupParticipated: {
      type: Array,
      default: null,
    },
  },
  setup(props: GroupParticipatedAsideComponentProps) {
    // Setup Default
    const { base } = useInit();
    const data = reactive<GroupParticipatedAsideComponentData>({
      isLoading: props.isLoading,
      items: props.groupParticipated,
    });
    watch(
      () => props.isLoading,
      () => (data.isLoading = props.isLoading)
    );
    watch(
      () => props.groupParticipated,
      () => (data.items = props.groupParticipated)
    );
    // Functions
    const goToGroupDetailPage = (id: string) => base.router.push({ name: 'group-detail', params: { id } });
    const goToGroupParticipatedPage = () => base.router.push({ name: 'group-participated' });
    return {
      formatDate,
      encapsulateUrl,
      // Component reactive data
      data,
      // Functions
      getTimeSince,
      goToGroupDetailPage,
      goToGroupParticipatedPage,
    };
  },
});
</script>
