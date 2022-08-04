<template>
  <div class="group-post-detail-page">
      <div class="container-xl group-post-detail-page__container">
        <template v-if="data.groupPost">
          <PostComponent :modelValue="data.groupPost" :isJoinGroup="data.isJoined" :isSendRequest="data.isSendRequest"/>
        </template>        
        <template v-else-if="(!data.dialogLogin && !data.isGroupActive)">
          <AppEmptyComponent
            title="Nhóm không hoạt động"
            subtitle="Hiện tại nhóm này không hoạt động, nên không xem được bài đăng trong nhóm"
          >
            <img src="@/assets/images/placeholder_group.svg" />
          </AppEmptyComponent>
        </template>
        <template v-else-if="(!data.dialogLogin && !data.isJoined)">
          <template v-if="(!data.dialogLogin && data.isSendRequest)">
            <AppEmptyComponent
              title="Bạn chưa có quyền xem bài viết được hiển thị trong nhóm này"
              subtitle="Yêu cầu tham gia của bạn đã được gửi thành công. Vui lòng đợi Admin duyệt."
              action="Hủy tham gia nhóm"
              @onAction="handleCancelJoinGroup(data.groupId)"
            >
              <img src="@/assets/images/placeholder_group.svg" />
            </AppEmptyComponent>
          </template> 
          <template v-else>
            <AppEmptyComponent
              title="Bạn chưa có quyền xem bài viết được hiển thị trong nhóm này"
              subtitle="Hãy tham gia nhóm ngay để xem bài viết trong nhóm"
              action="Tham gia nhóm"
              @onAction="handleJoinGroup(data.groupId)"
            >
              <img src="@/assets/images/placeholder_group.svg" />
            </AppEmptyComponent>
          </template>             
        </template>        
      </div>
  </div>
  <el-dialog v-model="data.dialogLogin" width="500px" custom-class="app-dialog">
    <template #title>
      <span class="app-dialog-title">Vui lòng đăng nhập</span>
    </template>
    <div class="app-dialog-content">
      <span>Bạn hãy đăng nhập để xem thông tin bài viết này</span>
      <div class="app-dialog-content__actions">
        <button @click="toggleDialogLogin(false)" class="app-btn app-btn-primary">OK</button>
      </div>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.group-post-detail-page {
  display: flex;
  flex-direction: column;
  &__container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    column-gap: 30px;
    padding-top: 40px;
    padding-bottom: 40px;
  }
}
</style>

<script lang="ts">
import { defineComponent, reactive, computed, onMounted } from 'vue';
import { useInit } from '@/services/shared/utils';
import { GroupMemberRequestStatusEnum, GroupPostModel, GroupStatusEnum, GroupTypeEnum } from '@/services/features/group/group.model';
import {
  cancleJoinGroup,
  checkJoinGroup,
  checkTypeGroupById,
  findGroupPostById, findGroupPostPublicById, joinGroup,
} from '@/services/features/group/group.service';
import PostComponent from '@/components/features/group/PostComponent.vue';

// Định nghĩa data type của component [data] bằng Typescript
class GroupPostDetailPageData {
  isLoading: boolean;
  isLoadingMore: boolean;
  groupId: string;
  postId: string;
  groupPost: GroupPostModel | null;
  dialogLogin: boolean;
  isJoined: boolean;
  isGroupActive: boolean;
  isSendRequest: boolean;
}

export default defineComponent({
  name: 'PostDetailPage',
  components: {
    PostComponent,
    // Icon
  },
  setup() {
    // Setup Default
    const { base, isLoggedIn } = useInit();
    // Component reactive data
    const data = reactive<GroupPostDetailPageData>({
      isLoading: false,
      isLoadingMore: false,
      groupId: base.route.params.groupId as string,
      postId: base.route.params.id as string,
      groupPost: null,
      dialogLogin: false,
      isJoined: false,
      isGroupActive: true,
      isSendRequest: false,
    });
    // Computed
    
    // Dialog thông báo đăng nhập
    const toggleDialogLogin = (isLogin: boolean) => {
      data.dialogLogin = isLogin;
      if (!isLogin) {
        base.router.push({ name: 'login', query: { redirect: base.route.path } });
      }
    };

    const handleJoinGroup = async (id: string) => {
      // Gửi yêu cầu tham gia nhóm
      if (isLoggedIn.value) {
        await joinGroup(id);
        data.isSendRequest = true;
      } else {
        toggleDialogLogin(true);
      }
    };
    
    const handleCancelJoinGroup = async (id: string) => {
      await cancleJoinGroup(id);
      data.isSendRequest = false;
    };
    const goToGroupDetailPage = (id: string) => base.router.push({ name: 'group-detail', params: { id } });
    const checkJoinAndGetInfoPost = async (isPublic: boolean, isViewPublic: boolean) => {
      let flagPublic = false;
      if (!isLoggedIn.value) { // Chưa đăng nhập
        if (isPublic && isViewPublic) {
          flagPublic = true;
        }
        if (!flagPublic) {
          goToGroupDetailPage(data.groupId);
        }
      } else { // Đã đăng nhập
        const groupMemberResponse = await checkJoinGroup(data.groupId);  
        if (groupMemberResponse.isSuccess) { 
          if (groupMemberResponse.result.groupStatus === GroupStatusEnum.DEACTIVE) { // nhóm này hiện tại không hoạt động
            data.isGroupActive = false;
          } else {
            if (groupMemberResponse.result.requestStatus === GroupMemberRequestStatusEnum.APPROVED) { // Đã vào nhóm
              data.isJoined = true;
              const groupPostResponse = await findGroupPostById(data.postId);
              data.groupPost = groupPostResponse.result;
            } else if (
              groupMemberResponse.result.requestStatus === GroupMemberRequestStatusEnum.WAITING &&
              groupMemberResponse.result.groupStatusMember === GroupStatusEnum.ACTIVE) { // Chờ duyệt vào nhóm
              data.isSendRequest = true;
            } else {
              // chưa tham gia nhóm, chuyển về màn chi tiết nhóm
              goToGroupDetailPage(data.groupId);
            }
          }
        }
      }
      if (flagPublic) {
        const groupPostPublicResponse = await findGroupPostPublicById(data.postId);
        data.groupPost = groupPostPublicResponse.result;
      }
    };
    // Life cycle event
    onMounted(async () => {
      data.isLoading = true;
      try {
        const groupResponse = await checkTypeGroupById(data.groupId);     
        if (groupResponse.isSuccess) {
          if (groupResponse.result.isPublic) { // nhóm công khai
            checkJoinAndGetInfoPost(true, groupResponse.result.isViewPublic);
          } else { // nhóm riêng tư
            if (!isLoggedIn.value) {
              goToGroupDetailPage(data.groupId);
            } else {
              checkJoinAndGetInfoPost(false, false);
            }
          }
        } else {
          goToGroupDetailPage(data.groupId);
        }
      } finally {
        data.isLoading = false;
      }
    });
    
    return {
      // Data
      data,
      // Computed
      isLoggedIn,
      // Function
      toggleDialogLogin,
      handleCancelJoinGroup,
      handleJoinGroup,
    };
  },
});
</script>