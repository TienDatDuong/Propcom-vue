<template>
  <div class="group-detail-manage-post-component">
    <TabGroup
      :defaultIndex="data.tabDefault"
      @change="changedTab"
      as="div"
      class="group-detail-manage-post-component__tabgroup"
    >
      <TabList as="template">
        <div class="app-tab">
          <Tab v-slot="{ selected }" as="template">
            <div class="app-tab-btn" :class="selected && 'active'">Duyệt bài mới</div>
          </Tab>
          <Tab v-slot="{ selected }" as="template">
            <div class="app-tab-btn" :class="selected && 'active'">Đã duyệt</div>
          </Tab>
          <Tab v-slot="{ selected }" as="template">
            <div class="app-tab-btn" :class="selected && 'active'">Đã bị từ chối</div>
          </Tab>
        </div>
      </TabList>
      <TabPanels>
        <TabPanel>
          <template v-if="data.waiting.isLoading">
            <div class="app-loading">
              <AppIconLoading />
            </div>
          </template>
          <template v-else>
            <!-- Có data -->
            <template v-if="data.waiting.totalItems && data.waiting.totalItems.length">
              <div class="group-detail-manage-post-component__container" ref="scrollWaitingComponent">
                <div v-for="item in data.waiting.totalItems" :key="item.id">
                  <PostComponent :modelValue="item" :type="data.waiting.type" />
                </div>
              </div>
              <div v-if="data.waiting.isLoadingMore" class="app-loading">
                <AppIconLoading />
              </div>
            </template>
            <!-- Empty -->
            <template v-else>
              <AppEmptyComponent title="Chưa có bài đăng nào để hiển thị" />
            </template>
          </template>
        </TabPanel>
        <TabPanel>
          <template v-if="data.active.isLoading">
            <div class="app-loading">
              <AppIconLoading />
            </div>
          </template>
          <template v-else>
            <!-- Có data -->
            <template v-if="data.active.totalItems && data.active.totalItems.length">
              <div class="group-detail-manage-post-component__container" ref="scrollActiveComponent">
                <div v-for="item in data.active.totalItems" :key="item.id">
                  <PostComponent :modelValue="item" :type="data.active.type" />
                </div>
              </div>
              <div v-if="data.active.isLoadingMore" class="app-loading">
                <AppIconLoading />
              </div>
            </template>
            <!-- Empty -->
            <template v-else>
              <AppEmptyComponent title="Chưa có bài đăng nào để hiển thị" />
            </template>
          </template>
        </TabPanel>
        <TabPanel>
          <template v-if="data.inactive.isLoading">
            <div class="app-loading">
              <AppIconLoading />
            </div>
          </template>
          <template v-else>
            <!-- Có data -->
            <template v-if="data.inactive.totalItems && data.inactive.totalItems.length">
              <div class="group-detail-manage-post-component__container" ref="scrollInActiveComponent">
                <div v-for="item in data.inactive.totalItems" :key="item.id">
                  <PostComponent :modelValue="item" :type="data.inactive.type" />
                </div>
              </div>
              <div v-if="data.inactive.isLoadingMore" class="app-loading">
                <AppIconLoading />
              </div>
            </template>
            <!-- Empty -->
            <template v-else>
              <AppEmptyComponent title="Chưa có bài đăng nào để hiển thị" />
            </template>
          </template>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<style lang="scss" scoped>
.group-detail-manage-post-component {
  width: 100%;
  &__tabgroup {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    row-gap: 10px;
  }
  &__container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    row-gap: 10px;
  }
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, onMounted, onUnmounted, reactive, ref } from 'vue';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
import {
  GroupModel,
  GroupPostModel,
  GroupPostStatusEnum,
  GroupPostTypeEnum
} from '@/services/features/group/group.model';
import { formatDate, useInit } from '@/services/shared/utils';
import { findGroupPostByGroup } from '@/services/features/group/group.service';
import { getStatus } from '@/services/features/employee/employee.service';
import { ApiRequestPaging } from '@/models/api-request';
import { ApiResponsePaging } from '@/models/api-response';
import PostComponent from '@/components/features/group/PostComponent.vue';

// Định nghĩa data type của component [props] bằng Typescript
class GroupDetailManagePostComponentProps {
  dataSource?: GroupModel;
}

// Định nghĩa data type của component [data] bằng Typescript
class GroupDetailManagePostComponentData {
  isLoading: boolean;
  tabDefault: number;
  waiting: {
    isLoading: boolean;
    isLoadingMore: boolean;
    queryParams: ApiRequestPaging;
    paging: ApiResponsePaging<GroupPostModel> | null;
    totalItems: GroupPostModel[] | null;
    type: GroupPostTypeEnum;
  };
  active: {
    isLoading: boolean;
    isLoadingMore: boolean;
    queryParams: ApiRequestPaging;
    paging: ApiResponsePaging<GroupPostModel> | null;
    totalItems: GroupPostModel[] | null;
    type: GroupPostTypeEnum;
  };
  inactive: {
    isLoading: boolean;
    isLoadingMore: boolean;
    queryParams: ApiRequestPaging;
    paging: ApiResponsePaging<GroupPostModel> | null;
    totalItems: GroupPostModel[] | null;
    type: GroupPostTypeEnum;
  };
}

export default defineComponent({
  name: 'GroupDetailManagePostComponent',
  components: {
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    PostComponent
  },
  props: {
    dataSource: {
      type: GroupModel,
      required: false
    }
  },
  setup(props: GroupDetailManagePostComponentProps, { emit }: any) {
    const { base } = useInit();
    const data = reactive<GroupDetailManagePostComponentData>({
      isLoading: false,
      tabDefault: 0,
      waiting: {
        isLoading: false,
        isLoadingMore: false,
        queryParams: {
          page: 1,
          pageSize: 10,
          q: ''
        },
        paging: null,
        totalItems: null,
        type: GroupPostTypeEnum.MANAGE_POST_WAITING
      },
      active: {
        isLoading: false,
        isLoadingMore: false,
        queryParams: {
          page: 1,
          pageSize: 10,
          q: ''
        },
        paging: null,
        totalItems: null,
        type: GroupPostTypeEnum.MANAGE_POST_ACTIVE
      },
      inactive: {
        isLoading: false,
        isLoadingMore: false,
        queryParams: {
          page: 1,
          pageSize: 10,
          q: ''
        },
        paging: null,
        totalItems: null,
        type: GroupPostTypeEnum.MANAGE_POST_INACTIVE
      }
    });
    // Template ref
    const scrollWaitingComponent = ref(null);
    const scrollActiveComponent = ref(null);
    const scrollInActiveComponent = ref(null);

    // Function
    const loadWaitingPost = async (id: string) => {
      data.isLoading = true;
      try {
        data.waiting.queryParams.page = 1;
        data.waiting.queryParams.status = GroupPostStatusEnum.WAITING;
        // Lấy chi tiết nhóm
        const response = await findGroupPostByGroup(id, data.waiting.queryParams);
        data.waiting.paging = response;
        data.waiting.totalItems = response?.rows || null;
      } finally {
        data.waiting.isLoading = false;
      }
    };
    const loadWaitingMorePost = async (id: string) => {
      if (
        !data.waiting.isLoadingMore &&
        data.waiting.totalItems &&
        data.waiting.paging &&
        data.waiting.paging.total &&
        data.waiting.paging.total > data.waiting.totalItems.length
      ) {
        data.waiting.isLoadingMore = true;
        try {
          data.waiting.queryParams.page++;
          data.waiting.queryParams.status = GroupPostStatusEnum.WAITING;
          const response = await findGroupPostByGroup(id, data.waiting.queryParams);
          data.waiting.paging = response;
          if (data.waiting.totalItems) {
            data.waiting.totalItems = response && response.rows ? data.waiting.totalItems.concat(response.rows) : null;
          } else {
            data.waiting.totalItems = response && response.rows ? response.rows : null;
          }
        } catch (err) {
          data.waiting.queryParams.page--;  // Revert queryParams
        } finally {
          data.waiting.isLoadingMore = false;
        }
      }
    };
    // Function
    const loadInActivePost = async (id: string) => {
      data.isLoading = true;
      try {
        data.inactive.queryParams.page = 1;
        data.inactive.queryParams.status = GroupPostStatusEnum.INACTIVE;
        // Lấy chi tiết nhóm
        const response = await findGroupPostByGroup(id, data.inactive.queryParams);
        data.inactive.paging = response;
        data.inactive.totalItems = response?.rows || null;
      } finally {
        data.inactive.isLoading = false;
      }
    };
    const loadInActiveMorePost = async (id: string) => {
      if (
        !data.inactive.isLoadingMore &&
        data.inactive.totalItems &&
        data.inactive.paging &&
        data.inactive.paging.total &&
        data.inactive.paging.total > data.inactive.totalItems.length
      ) {
        data.inactive.isLoadingMore = true;
        try {
          data.inactive.queryParams.page++;
          data.inactive.queryParams.status = GroupPostStatusEnum.INACTIVE;
          const response = await findGroupPostByGroup(id, data.inactive.queryParams);
          data.inactive.paging = response;
          if (data.inactive.totalItems) {
            data.inactive.totalItems =
              response && response.rows ? data.inactive.totalItems.concat(response.rows) : null;
          } else {
            data.inactive.totalItems = response && response.rows ? response.rows : null;
          }
        } catch (err) {
          data.inactive.queryParams.page--;  // Revert queryParams
        } finally {
          data.inactive.isLoadingMore = false;
        }
      }
    };
    // Function
    const loadActivePost = async (id: string) => {
      data.isLoading = true;
      try {
        data.active.queryParams.page = 1;
        data.active.queryParams.status = GroupPostStatusEnum.ACTIVE;
        // Lấy chi tiết nhóm
        const response = await findGroupPostByGroup(id, data.active.queryParams);
        data.active.paging = response;
        data.active.totalItems = response?.rows || null;
      } finally {
        data.active.isLoading = false;
      }
    };
    const loadActiveMorePost = async (id: string) => {
      if (
        !data.active.isLoadingMore &&
        data.active.totalItems &&
        data.active.paging &&
        data.active.paging.total &&
        data.active.paging.total > data.active.totalItems.length
      ) {
        data.active.isLoadingMore = true;
        try {
          data.active.queryParams.page++;
          data.active.queryParams.status = GroupPostStatusEnum.ACTIVE;
          const response = await findGroupPostByGroup(id, data.active.queryParams);
          data.active.paging = response;
          if (data.active.totalItems) {
            data.active.totalItems = response && response.rows ? data.active.totalItems.concat(response.rows) : null;
          } else {
            data.active.totalItems = response && response.rows ? response.rows : null;
          }
        } catch (err) {
          data.active.queryParams.page--;  // Revert queryParams
        } finally {
          data.active.isLoadingMore = false;
        }
      }
    };

    const handleScroll = (e: any) => {
      switch (data.tabDefault) {
        case 0: {
          // Duyệt bài mới
          const element: any = scrollWaitingComponent.value;
          if (
            props.dataSource &&
            element &&
            element.getBoundingClientRect().bottom - element.offsetTop < window.innerHeight
          ) {
            loadWaitingMorePost(props.dataSource.id);
          }
          break;
        }
        case 1: {
          // Đã duyệt
          const element: any = scrollActiveComponent.value;
          if (
            props.dataSource &&
            element &&
            element.getBoundingClientRect().bottom - element.offsetTop < window.innerHeight
          ) {
            loadActiveMorePost(props.dataSource.id);
          }
          break;
        }
        case 2: {
          // Đã bị từ chối
          const element: any = scrollInActiveComponent.value;
          if (
            props.dataSource &&
            element &&
            element.getBoundingClientRect().bottom - element.offsetTop < window.innerHeight
          ) {
            loadInActiveMorePost(props.dataSource.id);
          }
          break;
        }
      }
    };

    const changedTab = (tab: number) => {
      data.tabDefault = tab;
      if (props.dataSource) {
        switch (tab) {
          case 0:
            loadWaitingPost(props.dataSource.id);
            break;
          case 1:
            loadActivePost(props.dataSource.id);
            break;
          case 2:
            loadInActivePost(props.dataSource.id);
            break;
        }
      }
    };

    // Life cycle event
    onMounted(async () => {
      window.addEventListener('scroll', handleScroll);
      changedTab(0);
    });
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      scrollWaitingComponent,
      scrollActiveComponent,
      scrollInActiveComponent,
      // Component reactive data
      data,
      // Function
      formatDate,
      getStatus,
      changedTab
    };
  }
});
</script>
