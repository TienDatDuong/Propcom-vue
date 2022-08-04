<template>
  <div class="group-participated-page">
    <GroupHeaderComponent @onSearch="handleSeach" />
    <div class="container-xl group-participated-page__container">
      <!-- Danh sách bên trái -->
      <div class="app-section-content">
        <!-- Loading skeleton items -->
        <div v-if="data.isLoading" class="group-participated-page__list">
          <template v-for="index in 10" :key="index">
            <GroupListItemSkeleton />
          </template>
        </div>
        <!-- Real items -->
        <div v-if="!data.isLoading" class="group-participated-page__list">
          <template v-if="data.paging && data.paging.total">
            <template v-for="item in data.paging.rows" :key="item.id">
              <GroupListItemComponent :dataSource="item" />
            </template>
          </template>
          <!-- Empty -->
          <template v-else>
            <AppEmptyComponent title="Chưa tham gia nhóm">
              <img src="@/assets/images/placeholder_group.svg" />
            </AppEmptyComponent>
          </template>
        </div>
        <!-- Pagination -->
        <template v-if="data.paging && data.paging.total">
          <div class="app-pagination">
            <el-pagination
              layout="prev, pager, next"
              :current-page="data.paging.page"
              :page-size="data.paging.pageSize"
              :total="data.paging.total"
              @sizeChange="handlePaginationPageSizeChange"
              @currentChange="handlePaginationPageChange"
            >
            </el-pagination>
          </div>
        </template>
      </div>
      <!-- Aside bên phải -->
      <div class="app-section-aside">
        <!-- <AppAsideAdvertisement /> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.group-participated-page {
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
import { LocationQuery } from 'vue-router';
import { useInit, encapsulateUrl } from '@/services/shared/utils';
import GroupHeaderComponent from '@/components/features/group/GroupHeaderComponent.vue';
import GroupListItemComponent from '@/components/features/group/GroupListItemComponent.vue';
import GroupListItemSkeleton from '@/components/skeleton/group/GroupListItemSkeleton.vue';

import { findGroupByCurrentEmployee, getTimeSince } from '@/services/features/group/group.service';
import { ApiResponsePaging } from '@/models/api-response';
import { GroupModel } from '@/services/features/group/group.model';

// Định nghĩa data type của component [data] bằng Typescript
class GroupParticipatedPageData {
  isLoading: boolean;
  routeQueryParams: any;
  paging: ApiResponsePaging<GroupModel> | null;
}

export default defineComponent({
  name: 'GroupParticipatedPage',
  components: {
    GroupHeaderComponent,
    GroupListItemComponent,
    GroupListItemSkeleton,
  },
  setup() {
    // Setup Default
    const { base } = useInit();
    // Component reactive data
    const data = reactive<GroupParticipatedPageData>({
      isLoading: false,
      routeQueryParams: {
        page: '1',
        pageSize: '10',
      },
      paging: null,
    });
    // Functions
    const loadData = async (queryParams: any) => {
      data.isLoading = true;
      if (data.paging) {
        data.paging.rows = [];
      }
      try {
        data.paging = await findGroupByCurrentEmployee(queryParams);
        // Add query param to url
        if (base.route.name) {
          base.router.replace({ name: base.route.name.toString(), query: queryParams });
        }
      } finally {
        data.isLoading = false;
      }
    };
    const handlePaginationPageChange = async (page: any) => {
      if (data.routeQueryParams) {
        data.routeQueryParams.page = page.toString();
      } else {
        data.routeQueryParams = { page: page.toString() };
      }
      await loadData(data.routeQueryParams);
    };
    const handlePaginationPageSizeChange = async (pageSize: any) => {
      if (data.routeQueryParams) {
        data.routeQueryParams.pageSize = pageSize.toString();
      } else {
        data.routeQueryParams = { pageSize: pageSize.toString() };
      }
      await loadData(data.routeQueryParams);
    };
    const handleSeach = async (searchText: string) => {
      if (data.routeQueryParams) {
        data.routeQueryParams.q = searchText;
      } else {
        data.routeQueryParams = { q: searchText };
      }
      await loadData(data.routeQueryParams);
    };
    // Life cycle event
    onMounted(async () => {
      // Load query param from url
      data.routeQueryParams = Object.assign(data.routeQueryParams, base.route.query);
      await loadData(data.routeQueryParams);
    });
    return {
      // Component reactive data
      data,
      // Functions
      encapsulateUrl,
      getTimeSince,
      handlePaginationPageChange,
      handlePaginationPageSizeChange,
      handleSeach,
    };
  },
});
</script>