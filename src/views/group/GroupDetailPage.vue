<template>
  <div class="group-detail-page">
    <template v-if="data.group">
      <GroupDetailHeaderComponent :modelValue="data.group" />
    </template>
    <template>
      <GroupDetailHeaderSkeleton />
    </template>
    <div class="container-xl group-detail-page__container">
      <!-- Bài viết bên trái -->
      <div class="app-section-content">
        <template v-if="data.group">
          <!-- Đã tham gia nhóm -->
          <template v-if="isViewGroup">
            <!-- Tab bar -->
            <div class="group-detail-page__tab-bar unselectable" v-if="data.group.isMember || data.group.isAdmin">
              <div class="group-detail-page__tab-bar__section-user">
                <div
                  class="group-detail-page__tab-bar__tab"
                  :class="data.activeTab === GroupDetailPageSection.POST && 'active'"
                  @click="switchTab(GroupDetailPageSection.POST)"
                >
                  <span>Bài viết</span>
                  <IconPost />
                </div>
                <div
                  v-if="data.group.isMember"
                  class="group-detail-page__tab-bar__tab"
                  :class="data.activeTab === GroupDetailPageSection.MEMBER && 'active'"
                  @click="switchTab(GroupDetailPageSection.MEMBER)"
                >
                  <span>Thành viên</span>
                  <IconMember />
                </div>
                <div
                  class="group-detail-page__tab-bar__tab"
                  :class="data.activeTab === GroupDetailPageSection.MY_POST && 'active'"
                  @click="switchTab(GroupDetailPageSection.MY_POST)"
                >
                  <span>Bài viết của tôi</span>
                  <IconPost />
                </div>
              </div>
              <div v-if="data.group.isAdmin" class="group-detail-page__tab-bar__section-admin">
                <div
                  class="group-detail-page__tab-bar__tab"
                  :class="data.activeTab === GroupDetailPageSection.REPORT && 'active'"
                  @click="switchTab(GroupDetailPageSection.REPORT)"
                >
                  <span>Báo cáo</span>
                  <IconReport />
                </div>
                <div
                  class="group-detail-page__tab-bar__tab"
                  :class="data.activeTab === GroupDetailPageSection.MANAGE_POST && 'active'"
                  @click="switchTab(GroupDetailPageSection.MANAGE_POST)"
                >
                  <span>Quản lý bài viết</span>
                  <IconSetting />
                </div>
                <div
                  class="group-detail-page__tab-bar__tab"
                  :class="data.activeTab === GroupDetailPageSection.MANAGE_MEMBER && 'active'"
                  @click="switchTab(GroupDetailPageSection.MANAGE_MEMBER)"
                >
                  <span>Quản lý thành viên</span>
                  <IconMember />
                </div>
              </div>
            </div>

            <!-- Tab Bài viêt -->
            <template v-if="data.activeTab === GroupDetailPageSection.POST">
              <GroupDetailPostComponent
                :dataSource="data.group"
                :isSendRequest="data.group.isSendRequest"
                @isSendRequestJoinGroup="toggleSendRequest"
              />
            </template>

            <!-- Tab Thành viên -->
            <template v-else-if="data.activeTab === GroupDetailPageSection.MEMBER">
              <GroupDetailMemberComponent :dataSource="data.group" />
            </template>

            <!-- Tab Bài viết của tôi -->
            <template v-else-if="data.activeTab === GroupDetailPageSection.MY_POST">
              <GroupDetailMyPostComponent :dataSource="data.group" />
            </template>

            <!-- Tab Báo cáo -->
            <template v-else-if="data.activeTab === GroupDetailPageSection.REPORT">
              <GroupDetailReportComponent :dataSource="data.group" />
            </template>

            <!-- Tab Báo cáo -->
            <template v-else-if="data.activeTab === GroupDetailPageSection.MANAGE_POST">
              <GroupDetailManagePostComponent :dataSource="data.group" />
            </template>

            <!-- Tab Quản lý thành viên -->
            <template v-else-if="data.activeTab === GroupDetailPageSection.MANAGE_MEMBER">
              <GroupDetailManageMemberComponent :dataSource="data.group" />
            </template>
          </template>

          <!-- Chưa tham gia nhóm -->
          <template v-else>
            <AppEmptyComponent
              v-if="data.group.isSendRequest"
              title="Bạn chưa có quyền xem bài viết được hiển thị trong nhóm này"
              subtitle="Yêu cầu tham gia của bạn đã được gửi thành công. Vui lòng đợi Admin duyệt."
              action="Hủy tham gia nhóm"
              @onAction="handleCancelJoinGroup(data.groupId)"
            >
              <img src="@/assets/images/placeholder_group.svg" />
            </AppEmptyComponent>
            <AppEmptyComponent
              v-else
              title="Bạn chưa có quyền xem bài viết được hiển thị trong nhóm này"
              subtitle="Hãy tham gia nhóm ngay để xem bài viết trong nhóm"
              action="Tham gia nhóm"
              @onAction="handleJoinGroup(data.groupId)"
            >
              <img src="@/assets/images/placeholder_group.svg" />
            </AppEmptyComponent>
          </template>
        </template>

        <template v-else>
          <!-- GroupPostSkeleton -->
        </template>
      </div>
      <!-- Aside bên phải -->
      <div class="app-section-aside">
        <template v-if="data.group">
          <GroupDetailAsideComponent v-model="data.group" />
        </template>
        <template v-else>
          <GroupDetailAsideSkeleton />
        </template>
        <GroupActionAsideComponent v-model="data.group" @isLogin="toggleDialogLogin" />
        <GroupParticipatedAsideComponent
          v-if="isLoggedIn && data.groupParticipated.items && data.groupParticipated.items.length"
          :groupParticipated="data.groupParticipated.items"
          :isLoading="data.groupParticipated.isLoading"
        />
        <GroupSuggestAsideComponent :groupSuggest="data.groupSuggest.items" :isLoading="data.groupSuggest.isLoading" />
      </div>
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
.group-detail-page {
  display: flex;
  flex-direction: column;
  &__container {
    display: flex;
    flex-direction: row;
    column-gap: 30px;
    padding-top: 40px;
    padding-bottom: 40px;
  }
  &__tab-bar {
    padding: 10px 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border: $border;
    box-sizing: border-box;
    border-radius: $borderRadius;
    background: #ffffff;
    &__section-user {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      column-gap: 10px;
    }
    &__section-admin {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      column-gap: 10px;
    }
    &__tab {
      cursor: pointer;
      padding: 5px 12px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      column-gap: 5px;
      background: #fafafa;
      border-radius: 100px;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      color: #a7a7a7;
      fill: #a7a7a7;
      &:hover,
      &.active {
        color: $colorActive;
        fill: $colorActive;
        background: $colorSecondary;
      }
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, reactive, computed, onMounted } from 'vue';
import { useInit } from '@/services/shared/utils';
import { GroupModel, GroupTypeEnum } from '@/services/features/group/group.model';
import {
  cancleJoinGroup,
  findGroupById,
  findGroupPostByGroup,
  findGroupByIdNotLogin,
  findGroupSuggestByCurrentEmployee,
  findGroupSuggestByCurrentEmployeeNotLogin,
  findGroupByCurrentEmployee,
  joinGroup,
  checkJoinGroup,
} from '@/services/features/group/group.service';
import { ApiRequestPaging } from '@/models/api-request';
import GroupDetailHeaderComponent from '@/components/features/group/GroupDetailHeaderComponent.vue';
import GroupDetailAsideComponent from '@/components/features/group/GroupDetailAsideComponent.vue';
import GroupSuggestAsideComponent from '@/components/features/group/GroupSuggestAsideComponent.vue';
import GroupActionAsideComponent from '@/components/features/group/GroupActionAsideComponent.vue';
import GroupParticipatedAsideComponent from '@/components/features/group/GroupParticipatedAsideComponent.vue';
import GroupDetailPostComponent from '@/components/features/group/GroupDetailPostComponent.vue';
import GroupDetailReportComponent from '@/components/features/group/GroupDetailReportComponent.vue';
import GroupDetailMemberComponent from '@/components/features/group/GroupDetailMemberComponent.vue';
import GroupDetailManageMemberComponent from '@/components/features/group/GroupDetailManageMemberComponent.vue';
import GroupDetailManagePostComponent from '@/components/features/group/GroupDetailManagePostComponent.vue';
import GroupDetailMyPostComponent from '@/components/features/group/GroupDetailMyPostComponent.vue';
// Skeleton
import GroupDetailHeaderSkeleton from '@/components/skeleton/group/GroupDetailHeaderSkeleton.vue';
import GroupDetailAsideSkeleton from '@/components/skeleton/group/GroupDetailAsideSkeleton.vue';
// Icon
import IconMember from '@/components/ui/icon/IconMember.vue';
import IconPost from '@/components/ui/icon/IconPost.vue';
import IconReport from '@/components/ui/icon/IconReport.vue';
import IconSetting from '@/components/ui/icon/IconSetting.vue';

// Định nghĩa section của component bằng Typescript
enum GroupDetailPageSection {
  POST = 'post', // Bài viết
  MEMBER = 'member', // Thành viên
  MY_POST = 'my-post', // Bài viết của tôi
  REPORT = 'report', // Báo cáo
  MANAGE_POST = 'manage-post', // Quản lý bài viết
  MANAGE_MEMBER = 'manage-member', // Quản lý thành viên
}

// Định nghĩa data type của component [data] bằng Typescript
class GroupDetailPageData {
  isLoading: boolean;
  isLoadingMore: boolean;
  activeTab: GroupDetailPageSection | string;
  groupId: string;
  group: GroupModel | null;
  dialogJoinVisible: boolean;
  dialogLogin: boolean;
  groupSuggest: {
    isLoading: boolean;
    queryParams: ApiRequestPaging;
    items: GroupModel[] | null;
  };
  groupParticipated: {
    isLoading: boolean;
    queryParams: ApiRequestPaging;
    items: GroupModel[] | null;
  };
}

export default defineComponent({
  name: 'GroupDetailPage',
  components: {
    GroupDetailHeaderComponent,
    GroupDetailAsideComponent,
    GroupSuggestAsideComponent,
    GroupActionAsideComponent,
    GroupParticipatedAsideComponent,
    GroupDetailPostComponent,
    GroupDetailReportComponent,
    GroupDetailMemberComponent,
    GroupDetailManageMemberComponent,
    GroupDetailManagePostComponent,
    GroupDetailMyPostComponent,
    // Skeleton
    GroupDetailHeaderSkeleton,
    GroupDetailAsideSkeleton,
    // Icon
    IconMember,
    IconPost,
    IconReport,
    IconSetting,
  },
  setup() {
    // Setup Default
    const { base, isLoggedIn } = useInit();
    // Component reactive data
    const data = reactive<GroupDetailPageData>({
      isLoading: false,
      isLoadingMore: false,
      activeTab: GroupDetailPageSection.POST,
      groupId: base.route.params.id as string,
      group: null,
      dialogJoinVisible: false,
      dialogLogin: false,
      groupSuggest: {
        isLoading: false,
        queryParams: {
          page: 1,
          pageSize: 5,
        },
        items: [],
      },
      groupParticipated: {
        isLoading: false,
        queryParams: {
          page: 1,
          pageSize: 10,
        },
        items: [],
      },
    });
    // Computed

    const isViewGroup = computed(
      () =>
        data.group &&
        ((isLoggedIn.value
          ? data.group.type === GroupTypeEnum.PUBLIC // nếu đã đăng nhập thì chỉ cần check nhóm
          : data.group.type === GroupTypeEnum.PUBLIC &&
            (data.group.isViewPublic || data.group.isMember || data.group.isAdmin)) || // nếu chưa đăng nhập thì phải check thêm điều kiện này
          (data.group.type === GroupTypeEnum.PRIVATE && (data.group.isMember || data.group.isAdmin)))
    );
    // Function
    // Chuyển tab
    const switchTab = (activeTab: GroupDetailPageSection) => {
      data.activeTab = activeTab;
      // Add query param to url
      if (base.route.name) {
        base.router.replace({
          name: base.route.name.toString(),
          params: { id: data.groupId },
          query: { activeTab: data.activeTab },
        });
      }
    };
    // Ẩn/hiện dialog từ chối duyệt thành viên
    const toggleDialogJoin = (isVisible: boolean) => (data.dialogJoinVisible = isVisible);
    // Dialog thông báo đăng nhập
    const toggleDialogLogin = (isLogin: boolean) => {
      data.dialogLogin = isLogin;
      if (!isLogin) {
        base.router.push({ name: 'login', query: { redirect: base.route.path } });
      }
    };
    const toggleSendRequest = (isSendRequest: boolean) => {
      if (data.group) {
        data.group.isSendRequest = isSendRequest;
      }
    };

    // Gửi yêu cầu tham gia nhóm
    const handleJoinGroup = async (id: string) => {
      if (isLoggedIn.value) {
        await joinGroup(id);
        // Update lại UI
        if (data.group) {
          data.group.isSendRequest = true;
        }
        toggleDialogJoin(true);
      } else {
        toggleDialogLogin(true);
      }
    };
    const handleCancelJoinGroup = async (id: string) => {
      await cancleJoinGroup(id);
      // Update lại UI
      if (data.group) {
        data.group.isSendRequest = false;
      }
    };
    // Life cycle event
    onMounted(async () => {
      // Load query param from url
      if (base.route.query && base.route.query.activeTab && typeof base.route.query.activeTab === 'string') {
        data.activeTab = base.route.query.activeTab;
      } else {
        switchTab(GroupDetailPageSection.POST);
      }
      // Lấy chi tiết nhóm
      data.isLoading = true;
      try {
        if (isLoggedIn.value) {
          const groupResponse = await findGroupById(data.groupId);
          data.group = groupResponse.result;
        } else {
          const groupResponse = await findGroupByIdNotLogin(data.groupId);
          data.group = groupResponse?.result || null;
        }
      } finally {
        data.isLoading = false;
      }
      // Get Data Group Suggest
      data.groupSuggest.isLoading = true;
      try {
        if (isLoggedIn.value) {
          const responseGroupSuggest = await findGroupSuggestByCurrentEmployee(data.groupSuggest.queryParams);
          data.groupSuggest.items = responseGroupSuggest?.rows || null;
        } else {
          const responseGroupSuggest = await findGroupSuggestByCurrentEmployeeNotLogin(data.groupSuggest.queryParams);
          data.groupSuggest.items = responseGroupSuggest?.rows || null;
        }
      } finally {
        data.groupSuggest.isLoading = false;
      }
      // Get Data Group Participated
      data.groupParticipated.isLoading = true;
      try {
        if (isLoggedIn.value) {
          const queryParams = { ...data.groupParticipated.queryParams, idGroupDetail: data.groupId };
          const responseGroupParticipated = await findGroupByCurrentEmployee(queryParams);
          data.groupParticipated.items = responseGroupParticipated?.rows || null;
        }
      } finally {
        data.groupParticipated.isLoading = false;
      }
    });
    return {
      // Enum
      GroupDetailPageSection,
      GroupTypeEnum,
      // Data
      data,
      // Computed
      isLoggedIn,
      isViewGroup,
      // Function
      switchTab,
      toggleDialogJoin,
      toggleDialogLogin,
      handleJoinGroup,
      handleCancelJoinGroup,
      toggleSendRequest,
    };
  },
});
</script>
