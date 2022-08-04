<template>
  <div class="group-detail-report-component">
    <div class="group-detail-report-component__section">
      <div class="group-detail-report-component__section__header">
        <span class="app-label-section">Tổng quan bài viết</span>
      </div>
      <div class="group-detail-report-component__section__body">
        <div class="group-detail-report-component__section__body__item-report">
          <span class="group-detail-report-component__section__body__item-report__label">Tổng</span>
          <span class="group-detail-report-component__section__body__item-report__value">{{
            data?.report?.post?.totalPosts
          }}</span>
        </div>
        <div class="group-detail-report-component__section__body__item-report">
          <span class="group-detail-report-component__section__body__item-report__label">Chờ duyệt</span>
          <span class="group-detail-report-component__section__body__item-report__value">{{
            data?.report?.post?.totalPendingPosts
          }}</span>
        </div>
        <div class="group-detail-report-component__section__body__item-report">
          <span class="group-detail-report-component__section__body__item-report__label">Đã duyệt</span>
          <span class="group-detail-report-component__section__body__item-report__value">{{
            data?.report?.post?.totalApprovedPosts
          }}</span>
        </div>
        <div class="group-detail-report-component__section__body__item-report">
          <span class="group-detail-report-component__section__body__item-report__label">Từ chối</span>
          <span class="group-detail-report-component__section__body__item-report__value">{{
            data?.report?.post?.totalRejectedPosts
          }}</span>
        </div>
        <div class="group-detail-report-component__section__body__item-report">
          <span class="group-detail-report-component__section__body__item-report__label">Đã xoá</span>
          <span class="group-detail-report-component__section__body__item-report__value">{{
            data?.report?.post?.totalDeletedPosts
          }}</span>
        </div>
        <div class="group-detail-report-component__section__body__item-report">
          <span class="group-detail-report-component__section__body__item-report__label">Đã gỡ</span>
          <span class="group-detail-report-component__section__body__item-report__value">{{
            data?.report?.post?.totalRemovedPosts
          }}</span>
        </div>
        <div class="group-detail-report-component__section__body__item-report">
          <span class="group-detail-report-component__section__body__item-report__label">Bài ghim</span>
          <span class="group-detail-report-component__section__body__item-report__value">{{
            data?.report?.post?.totalPinnedPosts
          }}</span>
        </div>
        <div class="group-detail-report-component__section__body__item-report">
          <span class="group-detail-report-component__section__body__item-report__label">Có hoạt động trong vòng 7 ngày qua</span>
          <span class="group-detail-report-component__section__body__item-report__value">{{
            data?.report?.post?.totalReactionPosts
          }}</span>
        </div>
      </div>
    </div>


    <div class="group-detail-report-component__section">
      <div class="group-detail-report-component__section__header">
        <span class="app-label-section">Tổng quan thành viên</span>
      </div>
      <div class="group-detail-report-component__section__body">
        <div class="group-detail-report-component__section__body__item-report">
          <span class="group-detail-report-component__section__body__item-report__label">Tổng</span>
          <span class="group-detail-report-component__section__body__item-report__value">{{
            data?.report?.member?.totalMembers
          }}</span>
        </div>
        <div class="group-detail-report-component__section__body__item-report">
          <span class="group-detail-report-component__section__body__item-report__label">Đã duyệt</span>
          <span class="group-detail-report-component__section__body__item-report__value">{{
            data?.report?.member?.totalApprovedMembers
          }}</span>
        </div>
        <div class="group-detail-report-component__section__body__item-report">
          <span class="group-detail-report-component__section__body__item-report__label">Đã thêm</span>
          <span class="group-detail-report-component__section__body__item-report__value">{{
            data?.report?.member?.totalAddedMembers
          }}</span>
        </div>
        <div class="group-detail-report-component__section__body__item-report">
          <span class="group-detail-report-component__section__body__item-report__label">Đã mời ra khỏi nhóm</span>
          <span class="group-detail-report-component__section__body__item-report__value">{{
            data?.report?.member?.totalRemovedMembers
          }}</span>
        </div>
        <div class="group-detail-report-component__section__body__item-report">
          <span class="group-detail-report-component__section__body__item-report__label">Tự ra khỏi nhóm</span>
          <span class="group-detail-report-component__section__body__item-report__value">{{
            data?.report?.member?.totalLeftMembers
          }}</span>
        </div>
        <div class="group-detail-report-component__section__body__item-report">
          <span class="group-detail-report-component__section__body__item-report__label">Có hoạt động trong vòng 7 ngày qua</span>
          <span class="group-detail-report-component__section__body__item-report__value">{{
            data?.report?.member?.totalReactionMembers
          }}</span>
        </div>
      </div>
    </div>

    <div class="group-detail-report-component__section">
      <div class="group-detail-report-component__section__header">
        <span class="app-label-section">Top bài viết</span>
      </div>
      <div class="group-detail-report-component__section__body">
        <el-table :data="data?.report?.post?.posts" class="app-table" empty-text="Không có dữ liệu">
          <el-table-column label="Bài viết">
            <template #default="scope">
              <div class="group-detail-report-component__section__body__item-post">
                <div class="group-detail-report-component__section__body__item-post__header">
                  <UserAvatarComponent
                    :currentUser="scope.row.user"
                    class="group-detail-report-component__section__body__item-post__header__avatar"
                  />
                  <span class="group-detail-report-component__section__body__item-post__header__name">{{
                    scope.row.user?.name
                  }}</span>
                  <div class="app-dot-seperator"></div>
                  <span class="group-detail-report-component__section__body__item-post__header__date"
                    >Đăng ngày {{ formatDate(scope.row.approvedDate) }}</span
                  >
                </div>
                <span class="group-detail-report-component__section__body__item-post__content">{{
                  scope.row.description
                }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column sortable prop="totalComments" label="Bình luận" width="120" />
          <el-table-column sortable prop="totalLikes" label="Yêu thích" width="120" />
          <el-table-column sortable prop="totalShares" label="Chia sẻ" width="120" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.group-detail-report-component {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  row-gap: 20px;
  &__section {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    &__header {
      display: flex;
      flex-direction: row;
      align-items: center;
      column-gap: 5px;
      margin-bottom: 10px;
    }
    &__body {
      padding: 15px 25px;
      background: #ffffff;
      border: $border;
      border-radius: $borderRadius;
      &__item-report {
        padding: 20px 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        &:not(:last-child) {
          border-bottom: $border;
        }
        &__label {
          font-style: normal;
          font-weight: normal;
          font-size: 15px;
          color: $colorNeutral;
        }
        &__value {
          font-style: normal;
          font-weight: bold;
          font-size: 15px;
          color: $colorNeutral;
        }
      }
      &__item-post {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        row-gap: 5px;
        &__header {
          display: flex;
          flex-direction: row;
          align-items: center;
          column-gap: 5px;
          &__avatar {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            overflow: hidden;
          }
          &__name {
            font-style: normal;
            font-weight: bold;
            font-size: 14px;
            color: #242427;
          }
          &__date {
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            color: #a7a7a7;
          }
        }
        &__content {
          font-style: normal;
          font-weight: normal;
          font-size: 13px;
          color: #49494f;
          max-height: 50px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, onMounted, reactive } from 'vue';
import { GroupModel } from '@/services/features/group/group.model';
import { formatDate, useInit } from '@/services/shared/utils';
import { findGroupReportById } from '@/services/features/group/group.service';
import UserAvatarComponent from '@/components/features/user-profile/UserAvatarComponent.vue';

// Định nghĩa data type của component [props] bằng Typescript
class GroupDetailReportComponentProps {
  dataSource?: GroupModel;
}

// Định nghĩa data type của component [data] bằng Typescript
class GroupDetailReportComponentData {
  isLoading: boolean;
  report: any;
  params: any;
}

export default defineComponent({
  name: 'GroupDetailReportComponent',
  components: { UserAvatarComponent },
  props: {
    dataSource: {
      type: GroupModel,
      required: false,
    },
  },
  setup(props: GroupDetailReportComponentProps, { emit }: any) {
    const { base } = useInit();
    const data = reactive<GroupDetailReportComponentData>({
      isLoading: false,
      report: null,
      params: {
        sort: '-totalComments'
      }
    });

    const loadReport = async (id: string) => {
      data.isLoading = true;
      try {
        // Lấy chi tiết nhóm
        // data.params.sort = "-totalLikes";
        const response = await findGroupReportById(id, data.params);
        data.report = response.result;
      } finally {
        data.isLoading = false;
      }
    };

    // Life cycle event
    onMounted(async () => {
      if (props.dataSource) {
        await loadReport(props.dataSource.id);
      }
    });

    return {
      // Component reactive data
      data,
      // Function
      formatDate,
    };
  },
});
</script>
