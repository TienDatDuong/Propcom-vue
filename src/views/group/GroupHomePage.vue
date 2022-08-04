<template>
  <div class="group-home">
    <GroupHeaderComponent @onSearch="onSearch" />
    <GroupCarouselComponent v-if="isLoggedIn" @isHasData="($event) => (data.groupCarousel.isHasData = $event)" />
    <div class="container-xl group-home__container">
      <!-- Tin tức nổi bật bên trái -->
      <div class="app-section-content" ref="scrollComponent" v-loading="data.isLoading">
        <!-- Có data -->
        <div v-if="data?.CourseSuggest.items?.length && isLoggedIn">
          <PropskillCourseCarouselComponent
            :isLoading="data?.CourseSuggest.isLoading"
            :modelValue="data?.CourseSuggest.items"
            :CourseGroup="data?.CourseGroup"
            :isHideDescription="true"
          />
        </div>
        <template v-if="data.totalItems && data.totalItems.length">
          <div v-for="item in data.totalItems" :key="item.id">
            <PostComponent :modelValue="item" :isJoinGroup="isLoggedIn ? true : false" />
          </div>
          <div v-if="data.isLoadingMore" class="app-loading">
            <AppIconLoading />
          </div>
        </template>
        <!-- Empty -->
        <template v-else>
          <template
            v-if="
              !(
                (data.groupManage && data.groupManage.items && data.groupManage.items.length) ||
                data.groupCarousel.isHasData
              )
            "
          >
            <AppEmptyComponent
              title="Bạn chưa tham gia nhóm nào"
              subtitle="Khám phá ngay để kết nối với cộng đồng nhanh nhất"
              action="khám phá ngay"
              @onAction="goToGroupDiscoverPage"
            >
              <img src="@/assets/images/placeholder_group.svg" />
            </AppEmptyComponent>
          </template>
          <template v-else-if="!(data.totalItems && data.totalItems.length)">
            <AppEmptyComponent
              title="Chưa có bài đăng nào để hiển thị"
              subtitle="Khám phá ngay để kết nối với cộng đồng nhanh nhất"
              action="khám phá ngay"
              @onAction="goToGroupDiscoverPage"
            />
          </template>
        </template>
      </div>
      <!-- Aside bên phải -->
      <div class="app-section-aside">
        <template v-if="data.investorSuggest">
          <InvestorSuggestAsideComponent
            :investorSuggest="data.investorSuggest.items"
            :isLoading="data.investorSuggest.isLoading"
          />
        </template>
        <template v-if="data.groupManage && data.groupManage.items && data.groupManage.items.length">
          <GroupManageAsideComponent :groupManager="data.groupManage.items" :isLoading="data.groupManage.isLoading" />
        </template>
        <template v-if="data.groupSuggest">
          <GroupSuggestAsideComponent
            :groupSuggest="data.groupSuggest.items"
            :isLoading="data.groupSuggest.isLoading"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.group-home {
  &__container {
    padding-top: 40px;
    padding-bottom: 40px;
    display: flex;
    flex-direction: row;
    column-gap: 30px;
  }
  &__list {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }
  .app-pagination {
    margin-top: 20px !important;
  }
}
::v-deep .el-card.is-never-shadow.course-container:hover {
  border: 1px solid #dd0000;
  filter: none;
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, computed, ref, onMounted, onUnmounted, watch } from 'vue';
import { useInit } from '@/services/shared/utils';
import GroupHeaderComponent from '@/components/features/group/GroupHeaderComponent.vue';
import GroupCarouselComponent from '@/components/features/group/GroupCarouselComponent.vue';
import PostComponent from '@/components/features/group/PostComponent.vue';
import GroupManageAsideComponent from '@/components/features/group/GroupManageAsideComponent.vue';
import GroupSuggestAsideComponent from '@/components/features/group/GroupSuggestAsideComponent.vue';
import InvestorSuggestAsideComponent from '@/components/features/investor/InvestorSuggestAsideComponent.vue';

import {
  findGroupPostByCurrentEmployee,
  findGroupManageByCurrentEmployee,
  groupSearch,
  findGroupSuggestByCurrentEmployee,
  findGroupSuggestByCurrentEmployeeNotLogin,
  findGroupPostPublic,
} from '@/services/features/group/group.service';
import { findInvestorSuggest } from '@/services/features/investor/investor.service';
import { GroupModel, GroupPostModel } from '@/services/features/group/group.model';
import { ApiResponsePaging } from '@/models/api-response';
import { InvestorModel } from '@/services/features/investor/investor.model';
import { ApiRequestPaging } from '@/models/api-request';
import { CourseModel } from '@/services/features/elearning/elearning.model';
import { CourseTypeEnum } from '@/services/shared/enum';
import { findCourse } from '@/services/features/elearning/elearning.service';

// Định nghĩa data type của component [data] bằng Typescript
class GroupHomePageData {
  isLoading: boolean;
  isLoadingMore: boolean;
  queryParams: ApiRequestPaging;
  paging: ApiResponsePaging<GroupPostModel> | null;
  totalItems: GroupPostModel[] | null;
  CourseGroup: string;
  CourseSuggest: {
    isLoading: boolean;
    queryParams: ApiRequestPaging;
    items: CourseModel[] | null;
  };
  groupManage: {
    isLoading: boolean;
    queryParams: ApiRequestPaging;
    items: GroupModel[] | null;
  };
  groupSuggest: {
    isLoading: boolean;
    queryParams: ApiRequestPaging;
    items: GroupModel[] | null;
  };
  investorSuggest: {
    isLoading: boolean;
    queryParams: ApiRequestPaging;
    items: InvestorModel[] | null;
  };
  groupCarousel: {
    isHasData: boolean;
  };
}

export default defineComponent({
  name: 'GroupHomePage',
  components: {
    GroupHeaderComponent,
    GroupCarouselComponent,
    PostComponent,
    GroupManageAsideComponent,
    GroupSuggestAsideComponent,
    InvestorSuggestAsideComponent,
  },
  setup() {
    // Setup Default
    const { base, isLoggedIn } = useInit();
    // Template ref
    const scrollComponent = ref(null);
    // Component reactive data
    const data = reactive<GroupHomePageData>({
      isLoading: false,
      isLoadingMore: false,
      CourseSuggest: {
        isLoading: false,
        queryParams: {
          page: 1,
          pageSize: 10,
          typeCourse: CourseTypeEnum.GROUP,
        },
        items: [],
      },
      queryParams: {
        page: 1,
        pageSize: 10,
      },
      paging: null,
      totalItems: null,

      groupManage: {
        isLoading: false,
        queryParams: {
          page: 1,
          pageSize: 5,
        },
        items: [],
      },
      groupSuggest: {
        isLoading: false,
        queryParams: {
          page: 1,
          pageSize: 5,
        },
        items: [],
      },
      investorSuggest: {
        isLoading: false,
        queryParams: {
          page: 1,
          pageSize: 10,
        },
        items: [],
      },
      groupCarousel: {
        isHasData: false,
      },
      CourseGroup: 'CourseGroup',
    });
    // Functions
    const loadMore = async () => {
      if (
        !data.isLoadingMore &&
        data.totalItems &&
        data.paging &&
        data.paging.total &&
        data.paging.total > data.totalItems.length
      ) {
        data.isLoadingMore = true;
        try {
          if (isLoggedIn.value) {
            data.queryParams.page++;
            const response = await findGroupPostByCurrentEmployee(data.queryParams);
            data.paging = response;
            if (data.totalItems) {
              data.totalItems = response && response.rows ? data.totalItems.concat(response.rows) : null;
            } else {
              data.totalItems = response && response.rows ? response.rows : null;
            }
          } else {
            data.queryParams.page++;
            const response = await findGroupPostPublic(data.queryParams);
            data.paging = response;
            if (data.totalItems) {
              data.totalItems = response && response.rows ? data.totalItems.concat(response.rows) : null;
            } else {
              data.totalItems = response && response.rows ? response.rows : null;
            }
          }
        } catch (err) {
          data.queryParams.page--; // Revert queryParams
        } finally {
          data.isLoadingMore = false;
        }
      }
    };
    const LoadCourseSuggest = async () => {
      // Get data CourseSuggest
      data.CourseSuggest.isLoading = true;
      try {
        const responseCourseSuggest = await findCourse(data.CourseSuggest.queryParams);
        data.CourseSuggest.items = responseCourseSuggest?.rows || null;
      } finally {
        data.CourseSuggest.isLoading = false;
      }
    };
    const goToGroupDiscoverPage = () => {
      base.router.push({ name: 'group-discover' });
    };
    const handleScroll = (e: any) => {
      const element: any = scrollComponent.value;
      if (element && element.getBoundingClientRect().bottom < window.innerHeight) {
        loadMore();
      }
    };
    const onSearch = async (txtSearch: string) => {
      base.router.push({ name: 'group-search', query: { q: txtSearch } });
    };

    const initPage = async () => {
      // Get Data Group
      data.isLoading = true;
      try {
        if (isLoggedIn.value) {
          const response = await findGroupPostByCurrentEmployee(data.queryParams);
          data.paging = response;
          data.totalItems = response?.rows || null;
          LoadCourseSuggest();
        } else {
          const response = await findGroupPostPublic(data.queryParams);
          data.paging = response;
          data.totalItems = response?.rows || null;
        }
      } finally {
        data.isLoading = false;
      }

      // Get Data Group Manager
      data.groupManage.isLoading = true;
      try {
        if (isLoggedIn.value) {
          const responseGroupManager = await findGroupManageByCurrentEmployee(data.groupManage.queryParams);
          data.groupManage.items = responseGroupManager?.rows || null;
        } else {
          data.groupManage.items = null;
        }
      } finally {
        data.groupManage.isLoading = false;
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

      // Get Data Investor Suggest
      data.investorSuggest.isLoading = true;
      try {
        const responseInvestorSuggest = await findInvestorSuggest(data.investorSuggest.queryParams);
        data.investorSuggest.items = responseInvestorSuggest?.rows || null;
      } finally {
        data.investorSuggest.isLoading = false;
      }
    };

    // Watch
    watch(isLoggedIn, (newValue, oldValue) => initPage());

    // Life cycle event
    onMounted(async () => {
      window.addEventListener('scroll', handleScroll);
      await initPage();
    });
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });
    return {
      // Template ref
      scrollComponent,
      // Component reactive data
      data,
      // Computed
      isLoggedIn,
      // Functions
      loadMore,
      onSearch,
      goToGroupDiscoverPage,
    };
  },
});
</script>
