<template>
  <div class="group-detail-manage-member-component">
    <TabGroup
      :defaultIndex="data.tabDefault"
      @change="changedTab"
      as="div"
      class="group-detail-manage-member-component__tabgroup"
    >
      <TabList as="template">
        <div class="app-tab">
          <Tab v-slot="{ selected }" as="template">
            <div class="app-tab-btn" :class="selected && 'active'">Lời mời mới</div>
          </Tab>
          <Tab v-slot="{ selected }" as="template">
            <div class="app-tab-btn" :class="selected && 'active'">Đã bị từ chối</div>
          </Tab>
          <Tab v-slot="{ selected }" as="template">
            <div class="app-tab-btn" :class="selected && 'active'">Thành viên</div>
          </Tab>
        </div>
      </TabList>
      <TabPanels>
        <TabPanel>
          <div class="group-detail-manage-member-component__section">
            <div class="group-detail-manage-member-component__section__body">
              <div class="group-detail-manage-member-component__section__body__seach-container">
                <div class="group-detail-manage-member-component__section__body__seach-container__input">
                  <input
                    placeholder="Tìm thành viên..."
                    v-model="data.waiting.queryParams.q"
                    @keyup.enter="loadWaitingMember(dataSource.id)"
                  />
                  <div
                    class="
                      group-detail-manage-member-component__section__body__seach-container__input__subfix
                      app-hover-effect
                    "
                    @click="loadWaitingMember(dataSource.id)"
                  >
                    <img src="@/assets/icons/simple/icon_search.svg" />
                  </div>
                </div>
              </div>
              <template v-if="data.waiting.isLoading">
                <div class="app-loading">
                  <AppIconLoading />
                </div>
              </template>
              <template v-else>
                <template v-for="(item, index) in data.waiting?.totalItems" :key="index">
                  <GroupMemberListItemComponent :groupId="dataSource.id" :dataSource="item" :isAdmin="true" />
                </template>
              </template>
              <div class="group-detail-manage-member-component__section__body__actions">
                <template v-if="data.waiting.isLoadingMore">
                  <div class="app-loading">
                    <AppIconLoading />
                  </div>
                </template>
                <template v-else>
                  <button
                    v-if="data.waiting?.totalItems?.length < data.waiting?.paging?.total"
                    @click="loadMoreWaitingMember(dataSource.id)"
                    class="app-btn"
                  >
                    xem thêm
                  </button>
                </template>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div class="group-detail-manage-member-component__section">
            <div class="group-detail-manage-member-component__section__body">
              <div class="group-detail-manage-member-component__section__body__seach-container">
                <div class="group-detail-manage-member-component__section__body__seach-container__input">
                  <input
                    placeholder="Tìm thành viên..."
                    v-model="data.rejected.queryParams.q"
                    @keyup.enter="loadRejectedMember(dataSource.id)"
                  />
                  <div
                    class="
                      group-detail-manage-member-component__section__body__seach-container__input__subfix
                      app-hover-effect
                    "
                    @click="loadRejectedMember(dataSource.id)"
                  >
                    <img src="@/assets/icons/simple/icon_search.svg" />
                  </div>
                </div>
              </div>
              <template v-if="data.rejected.isLoading">
                <div class="app-loading">
                  <AppIconLoading />
                </div>
              </template>
              <template v-else>
                <template v-for="(item, index) in data.rejected?.totalItems" :key="index">
                  <GroupMemberListItemComponent :groupId="dataSource.id" :dataSource="item" :isAdmin="true" />
                </template>
              </template>
              <div class="group-detail-manage-member-component__section__body__actions">
                <template v-if="data.rejected.isLoadingMore">
                  <div class="app-loading">
                    <AppIconLoading />
                  </div>
                </template>
                <template v-else>
                  <button
                    v-if="data.rejected?.totalItems?.length < data.rejected?.paging?.total"
                    @click="loadMoreRejectedMember(dataSource.id)"
                    class="app-btn"
                  >
                    xem thêm
                  </button>
                </template>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <!-- Danh sách thành viên -->
          <template v-if="!data.isAddMember">
            <div class="group-detail-manage-member-component__section">
              <div class="group-detail-manage-member-component__section__header">
                <span class="group-detail-manage-member-component__section__header__title">Thành viên</span>
                <div class="app-dot-seperator"></div>
                <span v-if="data.all.paging" class="group-detail-manage-member-component__section__header__subtitle"
                  >{{ data.all.paging?.total }} TVV</span
                >
              </div>
              <div class="group-detail-manage-member-component__section__body">
                <div class="group-detail-manage-member-component__section__body__seach-container">
                  <div class="group-detail-manage-member-component__section__body__seach-container__input">
                    <input
                      placeholder="Tìm thành viên..."
                      v-model="data.all.queryParams.q"
                      @keyup.enter="loadMember(dataSource.id)"
                    />
                    <div
                      class="
                        group-detail-manage-member-component__section__body__seach-container__input__subfix
                        app-hover-effect
                      "
                      @click="loadMember(dataSource.id)"
                    >
                      <img src="@/assets/icons/simple/icon_search.svg" />
                    </div>
                  </div>
                </div>
                <template v-if="data.all.isLoading">
                  <div class="app-loading">
                    <AppIconLoading />
                  </div>
                </template>
                <template v-else>
                  <template v-for="(item, index) in data.all?.totalItems" :key="index">
                    <GroupMemberListItemComponent :groupId="dataSource.id" :dataSource="item" :isAdmin="true" />
                  </template>
                </template>
                <div class="group-detail-manage-member-component__section__body__actions">
                  <template v-if="data.all.isLoadingMore">
                    <div class="app-loading">
                      <AppIconLoading />
                    </div>
                  </template>
                  <template v-else>
                    <button
                      v-if="data.all?.totalItems?.length < data.all?.paging?.total"
                      @click="loadMoreMember(dataSource.id)"
                      class="app-btn app-btn-large"
                    >
                      xem thêm
                    </button>
                  </template>
                  <button @click="goToAddMember(dataSource.id)" class="app-btn app-btn-primary app-btn-large">
                    Mời TVV
                  </button>
                </div>
              </div>
            </div>
          </template>
          <!-- Thêm thành viên -->
          <template v-else>
            <div class="group-detail-manage-member-component__section">
              <div class="group-detail-manage-member-component__section__header">
                <span class="group-detail-manage-member-component__section__header__title">Thành viên</span>
                <div class="app-dot-seperator"></div>
                <span
                  v-if="data.addMember.paging"
                  class="group-detail-manage-member-component__section__header__subtitle"
                  >{{ data.addMember.paging?.total }} TVV</span
                >
              </div>
              <div class="group-detail-manage-member-component__section__body">
                <div class="group-detail-manage-member-component__section__body__seach-container">
                  <div class="group-detail-manage-member-component__section__body__seach-container__input">
                    <input
                      placeholder="Tìm thành viên..."
                      v-model="data.addMember.queryParams.q"
                      @keyup.enter="loadMemberToAddMember(dataSource.id)"
                    />
                    <div
                      class="
                        group-detail-manage-member-component__section__body__seach-container__input__subfix
                        app-hover-effect
                      "
                      @click="loadMemberToAddMember(dataSource.id)"
                    >
                      <img src="@/assets/icons/simple/icon_search.svg" />
                    </div>
                  </div>
                  <span class="group-detail-manage-member-component__section__body__title">Gợi ý cho bạn</span>
                </div>
                <template v-if="data.addMember.isLoading">
                  <div class="app-loading">
                    <AppIconLoading />
                  </div>
                </template>
                <template v-else>
                  <template v-for="(item, index) in data.addMember?.totalItems" :key="index">
                    <GroupMemberListItemComponent
                      :groupId="dataSource.id"
                      :dataSource="item"
                      :isAdmin="true"
                      :isAddMember="true"
                    />
                  </template>
                </template>
                <div class="group-detail-manage-member-component__section__body__actions">
                  <template v-if="data.addMember.isLoadingMore">
                    <div class="app-loading">
                      <AppIconLoading />
                    </div>
                  </template>
                  <template v-else>
                    <button
                      v-if="data.addMember?.totalItems?.length < data.addMember?.paging?.total"
                      @click="loadMoreMemberToAddMember(dataSource.id)"
                      class="app-btn app-btn-large"
                    >
                      xem thêm
                    </button>
                  </template>
                </div>
              </div>
            </div>
          </template>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<style lang="scss" scoped>
.group-detail-manage-member-component {
  width: 100%;
  &__tabgroup {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    row-gap: 10px;
  }
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
      &__title {
        font-style: normal;
        font-weight: bold;
        font-size: 15px;
        color: $colorNeutral;
      }
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
      &__title {
        text-align: center;
        font-style: normal;
        font-weight: bold;
        font-size: 15px;
        display: flex;
        justify-content: center;
        margin-top: 20px;
        color: $colorNeutral;
      }
    }
  }
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, onMounted, reactive } from 'vue';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
import { GroupMemberModel, GroupModel } from '@/services/features/group/group.model';
import { formatDate, useInit } from '@/services/shared/utils';
import {
  findAllGroupMember,
  findAllRejectedGroupMember,
  findAllWaitingGroupMember,
  findAllNotInGroupMember,
} from '@/services/features/group/group.service';
import { getStatus } from '@/services/features/employee/employee.service';
import { ApiRequestPaging } from '@/models/api-request';
import { ApiResponsePaging } from '@/models/api-response';
import GroupMemberListItemComponent from '@/components/features/group/GroupMemberListItemComponent.vue';

// Định nghĩa data type của component [props] bằng Typescript
class GroupDetailManageMemberComponentProps {
  dataSource?: GroupModel;
}

// Định nghĩa data type của component [data] bằng Typescript
class GroupDetailManageMemberComponentData {
  isLoading: boolean;
  tabDefault: number;
  all: {
    isLoading: boolean;
    queryParams: ApiRequestPaging;
    paging: ApiResponsePaging<GroupMemberModel> | null;
    totalItems: GroupMemberModel[] | null;
    isLoadingMore: boolean;
  };
  waiting: {
    isLoading: boolean;
    queryParams: ApiRequestPaging;
    paging: ApiResponsePaging<GroupMemberModel> | null;
    totalItems: GroupMemberModel[] | null;
    isLoadingMore: boolean;
  };
  rejected: {
    isLoading: boolean;
    queryParams: ApiRequestPaging;
    paging: ApiResponsePaging<GroupMemberModel> | null;
    totalItems: GroupMemberModel[] | null;
    isLoadingMore: boolean;
  };
  isAddMember: boolean;
  addMember: {
    isLoading: boolean;
    queryParams: ApiRequestPaging;
    paging: ApiResponsePaging<GroupMemberModel> | null;
    totalItems: GroupMemberModel[] | null;
    isLoadingMore: boolean;
  };
}

export default defineComponent({
  name: 'GroupDetailManageMemberComponent',
  components: {
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    GroupMemberListItemComponent,
  },
  props: {
    dataSource: {
      type: GroupModel,
      required: false,
    },
  },
  setup(props: GroupDetailManageMemberComponentProps, { emit }: any) {
    const { base } = useInit();
    const data = reactive<GroupDetailManageMemberComponentData>({
      isLoading: false,
      tabDefault: 0,
      all: {
        isLoading: false,
        isLoadingMore: false,
        queryParams: {
          page: 1,
          pageSize: 10,
          q: '',
        },
        paging: null,
        totalItems: null,
      },
      waiting: {
        isLoading: false,
        isLoadingMore: false,
        queryParams: {
          page: 1,
          pageSize: 10,
          q: '',
        },
        paging: null,
        totalItems: null,
      },
      rejected: {
        isLoading: false,
        isLoadingMore: false,
        queryParams: {
          page: 1,
          pageSize: 10,
          q: '',
        },
        paging: null,
        totalItems: null,
      },
      isAddMember: false,
      addMember: {
        isLoading: false,
        isLoadingMore: false,
        queryParams: {
          page: 1,
          pageSize: 10,
          q: '',
        },
        paging: null,
        totalItems: null,
      },
    });

    // Function
    const loadMember = async (id: string) => {
      data.all.isLoading = true;
      try {
        data.all.queryParams.page = 1;
        // Lấy chi tiết nhóm
        const response = await findAllGroupMember(id, data.all.queryParams);
        data.all.paging = response;
        data.all.totalItems = response?.rows || null;
      } finally {
        data.all.isLoading = false;
      }
    };
    const loadMoreMember = async (id: string) => {
      if (
        !data.all.isLoadingMore &&
        data.all.totalItems &&
        data.all.paging &&
        data.all.paging.total &&
        data.all.paging.total > data.all.totalItems.length
      ) {
        data.all.isLoadingMore = true;
        try {
          data.all.queryParams.page++;
          const response = await findAllGroupMember(id, data.all.queryParams);
          data.all.paging = response;
          if (data.all.totalItems) {
            data.all.totalItems = response && response.rows ? data.all.totalItems.concat(response.rows) : null;
          } else {
            data.all.totalItems = response && response.rows ? response.rows : null;
          }
        } catch (err) {
          data.all.queryParams.page--;  // Revert queryParams
        } finally {
          data.all.isLoadingMore = false;
        }
      }
    };

    const loadWaitingMember = async (id: string) => {
      data.waiting.isLoading = true;
      try {
        data.waiting.queryParams.page = 1;
        // Lấy chi tiết nhóm
        const response = await findAllWaitingGroupMember(id, data.waiting.queryParams);
        data.waiting.paging = response;
        data.waiting.totalItems = response?.rows || null;
      } finally {
        data.waiting.isLoading = false;
      }
    };
    const loadMoreWaitingMember = async (id: string) => {
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
          const response = await findAllWaitingGroupMember(id, data.waiting.queryParams);
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

    const loadRejectedMember = async (id: string) => {
      data.rejected.isLoading = true;
      try {
        data.rejected.queryParams.page = 1;
        // Lấy chi tiết nhóm
        const response = await findAllRejectedGroupMember(id, data.rejected.queryParams);
        data.rejected.paging = response;
        data.rejected.totalItems = response?.rows || null;
      } finally {
        data.rejected.isLoading = false;
      }
    };
    const loadMoreRejectedMember = async (id: string) => {
      if (
        !data.rejected.isLoadingMore &&
        data.rejected.totalItems &&
        data.rejected.paging &&
        data.rejected.paging.total &&
        data.rejected.paging.total > data.rejected.totalItems.length
      ) {
        data.rejected.isLoadingMore = true;
        try {
          data.rejected.queryParams.page++;
          const response = await findAllRejectedGroupMember(id, data.rejected.queryParams);
          data.rejected.paging = response;
          if (data.rejected.totalItems) {
            data.rejected.totalItems =
              response && response.rows ? data.rejected.totalItems.concat(response.rows) : null;
          } else {
            data.rejected.totalItems = response && response.rows ? response.rows : null;
          }
        } catch (err) {
          data.rejected.queryParams.page--;  // Revert queryParams
        } finally {
          data.rejected.isLoadingMore = false;
        }
      }
    };

    const loadMemberToAddMember = async (id: string) => {
      data.addMember.isLoading = true;
      try {
        data.addMember.queryParams.page = 1;
        // Lấy chi tiết nhóm
        const response = await findAllNotInGroupMember(id, data.addMember.queryParams);
        data.addMember.paging = response;
        data.addMember.totalItems = response?.rows || null;
      } finally {
        data.addMember.isLoading = false;
      }
    };
    const loadMoreMemberToAddMember = async (id: string) => {
      if (
        !data.addMember.isLoadingMore &&
        data.addMember.totalItems &&
        data.addMember.paging &&
        data.addMember.paging.total &&
        data.addMember.paging.total > data.addMember.totalItems.length
      ) {
        data.addMember.isLoadingMore = true;
        try {
          data.addMember.queryParams.page++;
          const response = await findAllNotInGroupMember(id, data.addMember.queryParams);
          data.addMember.paging = response;
          if (data.addMember.totalItems) {
            data.addMember.totalItems =
              response && response.rows ? data.addMember.totalItems.concat(response.rows) : null;
          } else {
            data.addMember.totalItems = response && response.rows ? response.rows : null;
          }
        } catch (err) {
          data.addMember.queryParams.page--;  // Revert queryParams
        } finally {
          data.addMember.isLoadingMore = false;
        }
      }
    };

    const changedTab = (tab: number | Event) => {
      /**
       * Vì lý do nào đó mà listener @change của TabGroup lại bắt được event keyup.enter của input bên trong, dẫn đến data.isAddMember = false, reload component không mong muốn (chỉ bị trên production build)
       * Có lẽ là do thư viện headlessui vẫn còn lỗi, chờ update lên bản mới hơn rồi check lại bug này
       * Tạm thời sẽ check là nếu param truyền vào không phải dạng number thì sẽ skip không xử lý event này
       */
      if (tab instanceof Event) {
        return;
      }
      if (data.tabDefault !== tab) {
        data.isAddMember = false;
      }
      data.tabDefault = tab;
      if (props.dataSource) {
        switch (tab) {
          case 0:
            loadWaitingMember(props.dataSource.id);
            break;
          case 1:
            loadRejectedMember(props.dataSource.id);
            break;
          case 2:
            loadMember(props.dataSource.id);
            break;
        }
      }
    };

    const goToAddMember = async (id: string) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      data.isAddMember = !data.isAddMember;
      loadMemberToAddMember(id);
    };

    // Life cycle event
    onMounted(async () => {
      changedTab(0);
    });

    return {
      // Component reactive data
      data,
      // Function
      formatDate,
      getStatus,
      loadMember,
      loadMoreMember,
      loadWaitingMember,
      loadMoreWaitingMember,
      loadRejectedMember,
      loadMoreRejectedMember,
      loadMemberToAddMember,
      loadMoreMemberToAddMember,
      changedTab,
      goToAddMember,
    };
  },
});
</script>
