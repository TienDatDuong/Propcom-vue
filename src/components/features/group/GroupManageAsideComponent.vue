<template>
  <!-- Loading skeleton items -->
  <div v-if="data.isLoading" class="group-manage-aside">
    <span class="group-manage-aside__title">Quản lý của tôi</span>
    <div class="group-manage-aside__card">
      <template v-for="index in 4" :key="index">
        <GroupListItemAsideSkeleton />
      </template>
    </div>
    <button class="app-btn app-btn-large" @click="goToGroupManagePage">Khám phá</button>
  </div>
  <!-- Real items -->
  <div v-if="!data.isLoading" class="group-manage-aside">
    <span class="group-manage-aside__title">Quản lý của tôi</span
    ><!-- Items -->
    <template v-if="data.items && data.items.length">
      <div class="group-manage-aside__card">
        <div v-for="(item, index) in data.items" :key="index" class="group-manage-aside__card__item-container">
          <div
            class="group-manage-aside__card__item-container__item app-hover-effect"
            @click="goToGroupDetailPage(item.id)"
          >
            <template v-if="item.coverImage">
              <div
                class="group-manage-aside__card__item-container__item__image"
                :style="
                  item.coverImage && {
                    'background-image': 'url(' + encapsulateUrl(item.coverImage) + ')',
                  }
                "
              ></div>
            </template>
            <template v-else>
              <img
                src="@/assets/images/default_image.svg"
                class="group-manage-aside__card__item-container__item__image"
              />
            </template>

            <div class="group-manage-aside__card__item-container__item__info">
              <span class="group-manage-aside__card__item-container__item__info__title">{{ item.name }}</span>
              <div class="group-manage-aside__card__item-container__item__info__report-container">
                <div class="group-manage-aside__card__item-container__item__info__report">
                  <img src="@/assets/icons/colorful/group_icon_group.svg" />
                  <span>{{ item.totalMembers }}</span>
                </div>
                <div class="group-manage-aside__card__item-container__item__info__report">
                  <img src="@/assets/icons/colorful/group_icon_post.svg" />
                  <span>{{ item.totalPosts }}</span>
                </div>
                <div class="group-manage-aside__card__item-container__item__info__report">
                  <img src="@/assets/icons/colorful/group_icon_comment.svg" />
                  <span>{{ item.totalComments }}</span>
                </div>
              </div>
              <span class="group-manage-aside__card__item-container__item__info__subtitle">{{
                `Hoạt động lần cuối ${getTimeSince(item.modifiedDate)} trước`
              }}</span>
            </div>
          </div>
          <div class="group-manage-aside__card__item-container__item-actions">
            <button
              class="group-manage-aside__card__item-container__item-actions__btn app-hover-effect"
              @click="goToGroupReport(item.id)"
            >
              Báo cáo
            </button>
            <button
              class="group-manage-aside__card__item-container__item-actions__btn app-hover-effect"
              @click="goToGroupApprovePost(item.id)"
            >
              Duyệt bài {{ "(" + item.totalPendingPosts + ")" }}
            </button>
            <button
              class="group-manage-aside__card__item-container__item-actions__btn app-hover-effect"
              @click="goToGroupApproveMember(item.id)"
            >
              Duyệt TVV {{ "(" + item.totalPendingMembers + ")" }}
            </button>
          </div>
        </div>
      </div>
    </template>
    <!-- Empty -->
    <template v-else>
      <AppEmptyComponent title="Không có dữ liệu">
        <img src="@/assets/images/placeholder_group.svg" />
      </AppEmptyComponent>
    </template>
    <button class="app-btn app-btn-large" @click="goToGroupManagePage">Khám phá</button>
  </div>
</template>

<style lang="scss" scoped>
.group-manage-aside {
  width: 100%;
  margin-bottom: 20px;
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
    &__item-container {
      display: flex;
      flex-direction: column;
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
            & > *:not(:last-child) {
              margin-right: 8px;
            }
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
      &__item-actions {
        margin-top: 6px;
        display: flex;
        flex-direction: row;
        & > *:not(:last-child) {
          margin-right: 6px;
        }
        &__btn {
          border: none;
          outline: none;
          padding: 8px 12px;
          background: #f2f2f2;
          border-radius: $borderRadiusSmall;
          font-size: 13px;
          line-height: 130%;
          color: #000000;
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
import { cloneDeep } from 'lodash';

// Định nghĩa data type của component [data] bằng Typescript
class GroupManageAsideComponentData {
  isLoading: boolean;
  items: GroupModel[] | null;
}

// Định nghĩa data type của component [props] bằng Typescript
class GroupManageAsideComponentProps {
  isLoading: boolean;
  groupManager: any[] | null;
}

export default defineComponent({
  name: 'GroupManageAsideComponent',
  components: { GroupListItemAsideSkeleton },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    groupManager: {
      type: Array,
      default: null,
    },
  },
  setup(props: GroupManageAsideComponentProps) {
    // Setup Default
    const { base } = useInit();
    const data = reactive<GroupManageAsideComponentData>({
      isLoading: props.isLoading,
      items: props.groupManager,
    });
    watch(
      () => props.isLoading,
      () => data.isLoading = props.isLoading
    );
    watch(
      () => props.groupManager,
      () => data.items = props.groupManager
    );
    // Functions
    const goToGroupDetailPage = (id: string) => base.router.push({ name: 'group-detail', params: { id } });
    const goToGroupManagePage = () => base.router.push({ name: 'group-manage' });
    const goToGroupReport = async (id: string) => {
      base.router.push({
        name: 'group-detail',
        params: { id },
        query: { activeTab: 'report' },
      });
    };
    const goToGroupApprovePost = async (id: string) => {
      base.router.push({
        name: 'group-detail',
        params: { id },
        query: { activeTab: 'manage-post' },
      });
    };
    const goToGroupApproveMember = async (id: string) => {
      base.router.push({
        name: 'group-detail',
        params: { id },
        query: { activeTab: 'manage-member' },
      });
    };

    return {
      formatDate,
      encapsulateUrl,
      // Component reactive data
      data,
      // Functions
      getTimeSince,
      goToGroupDetailPage,
      goToGroupManagePage,
      goToGroupReport,
      goToGroupApprovePost,
      goToGroupApproveMember,
    };
  },
});
</script>