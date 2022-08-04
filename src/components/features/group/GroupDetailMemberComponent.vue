<template>
  <div class="group-detail-member-component">
    <div class="group-detail-member-component__section">
      <div class="group-detail-member-component__section__header">
        <span class="app-label-section">Thành viên</span>
        <div class="app-dot-seperator"></div>
        <span v-if="data.paging" class="group-detail-member-component__section__header__subtitle"
          >{{ data.paging?.total }} TVV</span
        >
      </div>
      <div class="group-detail-member-component__section__body">
        <div class="group-detail-member-component__section__body__seach-container">
          <div class="group-detail-member-component__section__body__seach-container__input">
            <input placeholder="Tìm thành viên..." v-model="data.queryParams.q" />
            <div
              class="group-detail-member-component__section__body__seach-container__input__subfix app-hover-effect"
              @click="loadMember(dataSource.id)"
            >
              <img src="@/assets/icons/simple/icon_search.svg" />
            </div>
          </div>
        </div>
        <template v-if="data.isLoading">
          <div class="app-loading">
            <AppIconLoading />
          </div>
        </template>
        <template v-else>
          <template v-for="(item, index) in data?.totalItems" :key="index">
            <GroupMemberListItemComponent :groupId="dataSource.id" :dataSource="item" />
          </template>
        </template>
        <div class="group-detail-member-component__section__body__actions">
          <template v-if="data.isLoadingMore">
            <div class="app-loading">
              <AppIconLoading />
            </div>
          </template>
          <template v-else>
            <button
              v-if="data?.totalItems?.length < data?.paging?.total"
              @click="loadMoreMember(dataSource.id)"
              class="app-btn"
            >
              xem thêm
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.group-detail-member-component {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  row-gap: 10px;
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
      &__subtitle {
        font-style: normal;
        font-weight: normal;
        font-size: 15px;
        color: $colorNeutral;
      }
    }
    &__body {
      padding: 15px 25px;
      background: #ffffff;
      border: $border;
      border-radius: $borderRadius;
      &__seach-container {
        padding: 20px 0;
        border-bottom: $border;
        &__input {
          position: relative;
          input {
            padding: 12px 40px 12px 20px;
            width: 100%;
            height: 42px;
            background: #fafafa;
            border-radius: 100px;
            border: none;
            outline: none;
            font-style: normal;
            font-weight: normal;
            font-size: 15px;
            &::placeholder {
              color: #a7a7a7;
            }
          }
          &__subfix {
            position: absolute;
            top: calc(42px / 2 - 15px);
            right: 6px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #fafafa;
          }
        }
      }
      &__actions {
        padding: 20px 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        column-gap: 20px;
        & > .app-btn {
          width: 40%;
          max-width: 300px;
        }
      }
    }
  }
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, onMounted, reactive } from 'vue';
import { GroupMemberModel, GroupModel } from '@/services/features/group/group.model';
import { formatDate, useInit } from '@/services/shared/utils';
import { findAllGroupMember } from '@/services/features/group/group.service';
import { getStatus } from '@/services/features/employee/employee.service';
import { ApiRequestPaging } from '@/models/api-request';
import { ApiResponsePaging } from '@/models/api-response';
import GroupMemberListItemComponent from '@/components/features/group/GroupMemberListItemComponent.vue';

// Định nghĩa data type của component [props] bằng Typescript
class GroupDetailMemberComponentProps {
  dataSource?: GroupModel;
}

// Định nghĩa data type của component [data] bằng Typescript
class GroupDetailMemberComponentData {
  isLoading: boolean;
  isLoadingMore: boolean;
  queryParams: ApiRequestPaging;
  paging: ApiResponsePaging<GroupMemberModel> | null;
  totalItems: GroupMemberModel[] | null;
}

export default defineComponent({
  name: 'GroupDetailMemberComponent',
  components: { GroupMemberListItemComponent },
  props: {
    dataSource: {
      type: GroupModel,
      required: false,
    },
  },
  setup(props: GroupDetailMemberComponentProps, { emit }: any) {
    const { base } = useInit();
    const data = reactive<GroupDetailMemberComponentData>({
      isLoading: false,
      isLoadingMore: false,
      queryParams: {
        page: 1,
        pageSize: 10,
        q: '',
      },
      paging: null,
      totalItems: null,
    });

    // Function
    const loadMember = async (id: string) => {
      data.isLoading = true;
      try {
        data.queryParams.page = 1;
        // Lấy chi tiết nhóm
        const response = await findAllGroupMember(id, data.queryParams);
        data.paging = response;
        data.totalItems = response?.rows || null;
      } finally {
        data.isLoading = false;
      }
    };
    const loadMoreMember = async (id: string) => {
      if (
        !data.isLoadingMore &&
        data.totalItems &&
        data.paging &&
        data.paging.total &&
        data.paging.total > data.totalItems.length
      ) {
        data.isLoadingMore = true;
        try {
          data.queryParams.page++;
          const response = await findAllGroupMember(id, data.queryParams);
          data.paging = response;
          if (data.totalItems) {
            data.totalItems = response && response.rows ? data.totalItems.concat(response.rows) : null;
          } else {
            data.totalItems = response && response.rows ? response.rows : null;
          }
        } catch (err) {
          data.queryParams.page--;  // Revert queryParams
        } finally {
          data.isLoadingMore = false;
        }
      }
    };

    // Life cycle event
    onMounted(async () => {
      if (props.dataSource) {
        await loadMember(props.dataSource.id);
      }
    });

    return {
      // Component reactive data
      data,
      // Function
      formatDate,
      getStatus,
      loadMember,
      loadMoreMember,
    };
  },
});
</script>
