<template>
  <div class="group-detail-post-component">
    <PostCreatorComponent
      v-if="dataSource.isMember || dataSource.isAdmin"
      :group="dataSource"
      @success="onRegisterSuccess"
    />

    <template v-if="data.isLoading">
      <div class="app-loading">
        <AppIconLoading />
      </div>
    </template>
    <template v-else>
      <template v-if="data.totalPinnedItems && data.totalPinnedItems.length">
        <div class="group-detail-post-component__section">
          <div class="group-detail-post-component__section__header">
            <span class="app-label-section">Bài viết đã ghim</span>
          </div>
          <div class="group-detail-post-component__section__body">
            <template v-for="item in data.totalPinnedItems" :key="item.id">
              <PostComponent
                :modelValue="item"
                :isJoinGroup="dataSource.isMember || dataSource.isAdmin"
                :isSendRequest="data.isSendRequest"
              />
            </template>
          </div>
        </div>
      </template>
      <!-- Khoá học bạn có thể biết -->
      <div v-if="data?.CourseSuggest.items?.length">
        <PropskillCourseCarouselComponent
          :isLoading="data?.CourseSuggest.isLoading"
          :modelValue="data?.CourseSuggest.items"
          :CourseGroup="data?.CourseGroup"
          :isHideDescription="true"
        />
      </div>
      <!--Khoá học bạn có thể biết  -->
      <!-- Có data -->
      <template v-if="data.totalItems && data.totalItems.length">
        <div class="group-detail-post-component__section">
          <div class="group-detail-post-component__section__header">
            <span class="app-label-section">Bài viết khác</span>
          </div>
          <div class="group-detail-post-component__section__body" ref="scrollComponent">
            <template v-for="item in data.totalItems" :key="item.id">
              <PostComponent
                :modelValue="item"
                :isJoinGroup="dataSource.isMember || dataSource.isAdmin"
                :isSendRequest="data.isSendRequest"
                @isSendRequestJoinGroup="toggleSendRequest"
              />
            </template>
          </div>
          <div v-if="data.isLoadingMore" class="app-loading">
            <AppIconLoading />
          </div>
        </div>
      </template>
      <!-- Empty -->
      <template v-else>
        <AppEmptyComponent title="Chưa có bài đăng nào để hiển thị" />
      </template>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.group-detail-post-component {
  width: 100%;
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
      display: flex;
      flex-direction: column;
      align-items: stretch;
      row-gap: 20px;
    }
  }
}
</style>

<script lang="ts">
// Composition API
import { computed, defineComponent, onMounted, onUnmounted, reactive, ref } from 'vue';
import { GroupModel, GroupPostModel, GroupTypeEnum } from '@/services/features/group/group.model';
import { formatDate, useInit } from '@/services/shared/utils';
import {
  findGroupPostByGroup,
  findGroupPostByGroupPublic,
  findGroupPostById,
} from '@/services/features/group/group.service';
import { getStatus } from '@/services/features/employee/employee.service';
import { ApiRequestPaging } from '@/models/api-request';
import { ApiResponsePaging } from '@/models/api-response';
import PostComponent from '@/components/features/group/PostComponent.vue';
import PostCreatorComponent from '@/components/features/group/PostCreatorComponent.vue';
import { findIndex, isEmpty } from 'lodash';
import { CourseModel } from '@/services/features/elearning/elearning.model';
import { CourseTypeEnum } from '@/services/shared/enum';
import { findCourse } from '@/services/features/elearning/elearning.service';
// Định nghĩa data type của component [props] bằng Typescript
class GroupDetailPostComponentProps {
  dataSource?: any;
  isSendRequest: boolean;
}

// Định nghĩa data type của component [data] bằng Typescript
class GroupDetailPostComponentData {
  isLoading: boolean;
  isLoadingMore: boolean;
  isSendRequest: boolean;
  queryParams: ApiRequestPaging;
  paging: ApiResponsePaging<GroupPostModel> | null;
  totalItems: GroupPostModel[] | null;
  totalPinnedItems: GroupPostModel[] | null;
  CourseSuggest: {
    isLoading: boolean;
    queryParams: ApiRequestPaging;
    items: CourseModel[] | null;
  };
  CourseGroup: string;
}

export default defineComponent({
  name: 'GroupDetailPostComponent',
  components: {
    PostComponent,
    PostCreatorComponent,
  },
  props: {
    dataSource: {
      type: Object,
    },
    isSendRequest: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['isSendRequestJoinGroup'],
  setup(props: GroupDetailPostComponentProps, { emit }: any) {
    const { base, isLoggedIn } = useInit();
    const data = reactive<GroupDetailPostComponentData>({
      isLoading: false,
      isLoadingMore: false,
      queryParams: {
        page: 1,
        pageSize: 10,
        q: '',
      },
      isSendRequest: props.isSendRequest,
      paging: null,
      totalItems: null,
      totalPinnedItems: null,
      CourseSuggest: {
        isLoading: false,
        queryParams: {
          page: 1,
          pageSize: 10,
          typeCourse: CourseTypeEnum.GROUP,
        },
        items: [],
      },
      CourseGroup: 'CourseGroup',
    });
    // Template ref
    const scrollComponent = ref(null);

    // Function
    const loadPinnedPost = async (id: string) => {
      // Lấy Bài viết đã ghim
      // TODO
    };
    const toggleSendRequest = (isSendRequest: boolean) => {
      data.isSendRequest = isSendRequest;
      emit('isSendRequestJoinGroup', isSendRequest);
    };

    const loadPost = async (id: string) => {
      data.queryParams.page = 1;
      let response: any = {};
      // Lấy Bài viết khác
      if (!isLoggedIn.value && props.dataSource.type === GroupTypeEnum.PUBLIC && props.dataSource.isViewPublic) {
        response = await findGroupPostByGroupPublic(id, data.queryParams);
      } else {
        response = await findGroupPostByGroup(id, data.queryParams);
      }
      data.paging = response;
      data.totalItems = response?.rows || null;
    };
    const loadMorePost = async (id: string) => {
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
          const response = await findGroupPostByGroup(id, data.queryParams);
          data.paging = response;
          if (data.totalItems) {
            data.totalItems = response && response.rows ? data.totalItems.concat(response.rows) : null;
          } else {
            data.totalItems = response && response.rows ? response.rows : null;
          }
        } catch (err) {
          data.queryParams.page--; // Revert queryParams
        } finally {
          data.isLoadingMore = false;
        }
      }
    };

    const handleScroll = (e: any) => {
      const element: any = scrollComponent.value;
      if (
        props.dataSource &&
        element &&
        element.getBoundingClientRect().bottom - element.offsetTop < window.innerHeight
      ) {
        loadMorePost(props.dataSource.id);
      }
    };

    const LoadCourseSuggest = async () => {
      // Get data CourseSuggest
      data.CourseSuggest.isLoading = true;
      try {
        const responseCourseSuggest = await findCourse(data.CourseSuggest.queryParams);
        data.CourseSuggest.items = responseCourseSuggest?.rows || null;
        console.log(' data.CourseSuggest.items ', data.CourseSuggest.items);
      } finally {
        data.CourseSuggest.isLoading = false;
      }
    };

    // Life cycle event
    onMounted(async () => {
      window.addEventListener('scroll', handleScroll);
      if (props.dataSource) {
        data.isLoading = true;
        try {
          await Promise.all([loadPost(props.dataSource.id), loadPinnedPost(props.dataSource.id)]);
          LoadCourseSuggest();
        } finally {
          data.isLoading = false;
        }
      }
    });
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    const onRegisterSuccess = async (params: { isApproved: boolean; id: string }) => {
      const isApproved = params.isApproved;
      const id = params.id;
      if (!isApproved) {
        return;
      }
      const response = await findGroupPostById(id);
      if (response && response.result) {
        const index = findIndex(data.totalItems, (item) => !item.isPinned);
        if (index < 0) {
          return;
        }
        if (!data.totalItems) {
          return;
        }
        data.totalItems.splice(index, 0, new GroupPostModel(response.result));
      }
    };

    return {
      scrollComponent,
      // Component reactive data
      data,
      // Function
      formatDate,
      getStatus,
      onRegisterSuccess,
      toggleSendRequest,
    };
  },
});
</script>
