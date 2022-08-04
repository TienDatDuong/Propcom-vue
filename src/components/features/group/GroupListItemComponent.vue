<template>
  <div class="group-list-item-component">
    <template v-if="data.dataSource.coverImage">
      <div
        class="group-list-item-component__image"
        :style="
          data.dataSource.coverImage && {
            'background-image': 'url(' + encapsulateUrl(data.dataSource.coverImage) + ')',
          }
        "
      ></div>
    </template>
    <template v-else>
      <img src="@/assets/images/default_image.svg" class="group-list-item-component__image-default" />
    </template>
    <div class="group-list-item-component__info">
      <a class="group-list-item-component__info__title" @click="goToGroupDetailPage(data.dataSource.id)">{{
        data.dataSource.name
      }}</a>
      <span class="group-list-item-component__info__subtitle">{{
        `Hoạt động lần cuối ${getTimeSince(data.dataSource.modifiedDate)} trước`
      }}</span>
      <div class="group-list-item-component__info__report-container">
        <div class="group-list-item-component__info__report">
          <img src="@/assets/icons/colorful/group_icon_group.svg" />
          <span>{{ data.dataSource.totalMembers }}</span>
        </div>
        <div class="group-list-item-component__info__report">
          <img src="@/assets/icons/colorful/group_icon_post.svg" />
          <span>{{ data.dataSource.totalPosts }}</span>
        </div>
        <div class="group-list-item-component__info__report">
          <img src="@/assets/icons/colorful/group_icon_comment.svg" />
          <span>{{ data.dataSource.totalComments }}</span>
        </div>
      </div>
    </div>
    <div class="group-list-item-component__action">
      <template v-if="isJoined">
        <!-- Actions của admin đã join nhóm -->
        <template v-if="data.dataSource.isAdmin">
          <div class="w-100 d-flex flex-column">
            <button class="app-btn" @click="goToGroupReport(data.dataSource.id)">Báo cáo</button>
            <div class="d-flex flex-row" style="margin-top: 10px">
              <button class="app-btn" @click="goToGroupApprovePost(data.dataSource.id)">
                Duyệt bài {{ data.dataSource.totalPendingPosts ? `(${data.dataSource.totalPendingPosts})` : "" }}
              </button>
              <button style="margin-left: 10px" class="app-btn" @click="goToGroupApproveMember(data.dataSource.id)">
                Duyệt TVV {{ data.dataSource.totalPendingMembers ? `(${data.dataSource.totalPendingMembers})` : "" }}
              </button>
            </div>
          </div>
        </template>
        <!-- Actions của user đã join nhóm -->
        <template v-else>
          <button disabled class="app-btn">Đã tham gia nhóm</button>
        </template>
      </template>
      <template v-else>
        <!-- Actions của user/admin chưa join nhóm -->
        <template v-if="data.dataSource.isSendRequest">
          <!-- Actions của user/admin đã gửi yêu cầu tham gia -->
          <button :disabled="data.isLoading" class="app-btn" @click="handleCancelJoinGroup(data.dataSource.id)">
            Hủy tham gia nhóm
          </button>
        </template>

        <template v-else>
          <!-- Actions của user/admin chưa gửi yêu cầu tham gia -->
          <button
            :disabled="data.isLoading"
            class="app-btn app-btn-primary app-btn-medium"
            @click="handleJoinGroup(data.dataSource.id)"
          >
            Tham gia nhóm
          </button>
        </template>
      </template>
    </div>
  </div>

  <el-dialog v-model="data.dialogJoinVisible" width="500px" custom-class="app-dialog">
    <template #title>
      <span class="app-dialog-title">Đã gửi yêu cầu tham gia</span>
    </template>
    <div class="app-dialog-content">
      <span>Yêu cầu tham gia của bạn đã được gửi thành công. Vui lòng đợi Admin duyệt.</span>
      <div class="app-dialog-content__actions">
        <button @click="toggleDialogJoin(false)" class="app-btn app-btn-primary">OK</button>
      </div>
    </div>
  </el-dialog>
  <el-dialog v-model="data.dialogLogin" width="500px" custom-class="app-dialog">
    <template #title>
      <span class="app-dialog-title">Vui lòng đăng nhập</span>
    </template>
    <div class="app-dialog-content">
      <span>Bạn hãy đăng nhập để thực hiện được tác vụ này</span>
      <div class="app-dialog-content__actions">
        <button @click="toggleDialogLogin(false)" class="app-btn app-btn-primary">OK</button>
      </div>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.group-list-item-component {
  width: 100%;
  height: 110px;
  background: #ffffff;
  border: $border;
  border-radius: $borderRadius;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  &__image,
  &__image-default {
    width: 160px;
    height: 100%;
    border-radius: 0;
    background-position: center;
    background-repeat: no-repeat;
  }
  &__image {
    background-size: cover;
  }
  &__image-default {
    background: linear-gradient(181.77deg, #dd0000 1.5%, #840000 146.62%);
  }
  &__info {
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    & > *:not(:last-child) {
      margin-bottom: 5px;
    }
    &__title {
      cursor: pointer;
      font-style: normal;
      font-weight: bold;
      font-size: 15px;
      line-height: 150%;
      text-transform: uppercase;
      color: #0f0f0f;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-decoration: none;
      &:hover {
        color: #5f5f5f;
      }
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
  }
  &__action {
    width: 300px;
    height: 100%;
    padding: 5px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 1px dashed #c1c1c1;
    button {
      width: 100%;
    }
  }
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, computed } from 'vue';

import { useInit, formatDate, encapsulateUrl } from '@/services/shared/utils';
import { cancleJoinGroup, getTimeSince, joinGroup } from '@/services/features/group/group.service';
import { GroupModel } from '@/services/features/group/group.model';

// Định nghĩa data type của component [props] bằng Typescript
class GroupListItemComponentProps {
  isLoading?: boolean;
  dataSource: GroupModel;
}

// Định nghĩa data type của component [data] bằng Typescript
class GroupListItemComponentData {
  isLoading: boolean;
  dataSource: GroupModel | null;
  dialogJoinVisible: boolean;
  dialogLogin: boolean;
}

export default defineComponent({
  name: 'GroupListItemComponent',
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    dataSource: {
      type: GroupModel,
      default: null,
      required: true,
    },
  },
  setup(props: GroupListItemComponentProps, { emit }: any) {
    // Setup Default
    const { base, isLoggedIn } = useInit();
    // Component reactive props
    const data = reactive<GroupListItemComponentData>({
      isLoading: false,
      dataSource: { ...props.dataSource }, // Lưu vào biến thuộc component để xử lý nội bộ
      dialogJoinVisible: false,
      dialogLogin: false,
    });
    // Computed
    const isJoined = computed(() => data.dataSource && (data.dataSource.isMember || data.dataSource.isAdmin));
    
    // Functions
    // Ẩn/hiện dialog từ chối duyệt thành viên
    const toggleDialogJoin = (isVisible: boolean) => (data.dialogJoinVisible = isVisible);
    // Dialog thông báo đăng nhập
    const toggleDialogLogin = (isLogin: boolean) => {
      data.dialogLogin = isLogin;
      if (!isLogin) {
        base.router.push({ name: 'login' });
      }
    };
    // Gửi yêu cầu tham gia nhóm
    const handleJoinGroup = async (id: string) => {
      data.isLoading = true;
      try {
        if (isLoggedIn.value) {
          await joinGroup(id);
          // Update lại UI
          if (data.dataSource) {
            data.dataSource.isSendRequest = true;
          }
          toggleDialogJoin(true);
        } else {
          toggleDialogLogin(true);
        }
      } finally {
        data.isLoading = false;
      }
    };
    // Gửi yêu cầu hủy tham gia nhóm
    const handleCancelJoinGroup = async (id: string) => {
      data.isLoading = true;
      try {
        await cancleJoinGroup(id);
        // Update lại UI
        if (data.dataSource) {
          data.dataSource.isSendRequest = false;
        }
      } finally {
        data.isLoading = false;
      }
    };
    const goToGroupDetailPage = (id: string) => base.router.push({ name: 'group-detail', params: { id } });
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
      isJoined,
      isLoggedIn,
      getTimeSince,
      toggleDialogJoin,
      toggleDialogLogin,
      handleJoinGroup,
      handleCancelJoinGroup,
      goToGroupDetailPage,
      goToGroupReport,
      goToGroupApprovePost,
      goToGroupApproveMember,
    };
  },
});
</script>