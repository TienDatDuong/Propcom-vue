<template>
  <el-dialog @close="closedialogUserStudy" v-model="data.dialogUserStudy" width="833px" custom-class="app-dialog">
    <template #title>
      <span class="app-dialog-title">Danh sách người học </span>
    </template>
    <div style="text-align: center; margin-top: 20px">
      <div class="search-user">
        <div class="icon-search"><img src="~@/assets/images/search.svg" /></div>
        <div class="input-search">
          <input v-model="data.userLearns.searchText" placeholder="Tìm kiếm" type="text" @change="onChange" />
        </div>
      </div>
    </div>
    <div class="list-checkbox" ref="scrollComponent" v-loading="data.userLearns.isLoading">
      <div class="app-dialog-content" v-if="data.userLearns.items?.length || data.userLearns.isLoading">
        <div class="person" v-for="(item, index) in data.userLearns.items" :key="index" :virtualIndex="index">
          <div class="info-person">
            <div class="others-rank" @click="showDetailUser(item)">
              <img v-if="item?.avatarUrl?.length" class="img-others" :src="item?.avatarUrl" alt="image" />
              <img v-else class="img-others" src="~@/assets/images/avatar-default-propskill.png" />
            </div>
            <div class="header-name">
              <div class="username">{{ item.name }}</div>
              <div class="user-time-join">Ngày tham gia: {{ formatDate(item.createdDate, 'dd/MM/yyyy') }}</div>
              <div class="user-status">{{ EmployeeStatusTransEnum[item.status] }}</div>
            </div>
          </div>
        </div>
      </div>
      <template v-else>
        <AppEmptyComponent class="empty" title="Không có dữ liệu">
          <img src="@/assets/images/status-empty.png" />
        </AppEmptyComponent>
      </template>
    </div>
  </el-dialog>
  <UserDetailDialog
    v-model="data.dataSource"
    @update:visible="onVisible"
    v-model:visible="data.dialogUserDetailVisible"
  />
</template>

<style lang="scss" scoped>
.list-checkbox {
  height: calc(80vh - 175px);
  overflow: auto;
}
.list-checkbox::-webkit-scrollbar {
  width: 2px;
}
.person {
  display: flex;
  justify-content: space-between;
  margin: 0px 10px 0px;
  align-items: center;
  padding: 5px;
}
.info-person {
  display: flex;
  align-items: center;
  gap: 14px;
}
.info-person .header-name {
  text-align: left;
}
.others-rank {
  cursor: pointer;
}
.img-person {
  width: 42.78px;
  border-radius: 100%;
}
.img-others {
  margin: 9px 1px 5px 2px;
  width: 40px;
  height: 40px;
  border-radius: 100%;
}
.username {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 130%;
  text-transform: uppercase;
  color: #0f0f0f;
}
.user-time-join {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 130%;
  color: #5a5a5a;
}
.user-status {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 130%;
  color: #d6d6d6;
}
.search-user {
  height: 40px;
  display: flex;
  flex-direction: row;
  border-radius: 60px;
  background-color: #ffffff;
  overflow: hidden;
  box-shadow: 0px 10px 30px rgb(0 0 0 / 5%);
  margin: 18px 0px 0px 10px;
  background: #f2f2f2;
  padding: 5px;
  margin-bottom: 15px;
}
.icon-search {
  cursor: pointer;
  width: 40px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.input-search {
  width: 100%;
}
.input-search input {
  width: 100%;
  height: 100%;
  padding: 0 35px 0 5px;
  border: none;
  outline: none;
  background: #f2f2f2;
}

.app-dialog-content {
  padding-top: 10px;
}

.app-empty {
  min-height: unset;
  border: unset;
}

.empty {
  background: #ffffff;
  margin: 0 auto;
  height: calc(80vh - 195px) !important;
  margin-bottom: 20px;
}
.empty img {
  width: 301px;
  height: 164px;
}
</style>

<script lang="ts">
// Composition API
import { EmployeeStatusTransEnum, TypeDocEnum } from '@/services/shared/enum';
import { defineComponent, onMounted, reactive, ref, watch } from 'vue';
import videojs from 'video.js';
import { Constant } from '@/services/shared/constant';
import { ApiRequestPaging } from '@/models/api-request';
import { listUserLearn } from '@/services/features/elearning/elearning.service';
import { debounce } from 'lodash';
import { formatDate } from '@/services/shared/utils';

// Định nghĩa data type của component [data] bằng Typescript
class PropskillUserLearnComponentData {
  userLearnId: any;
  dialogUserStudy: boolean;
  isLoading: boolean;
  userLearns: {
    isLoading: boolean;
    queryParams: ApiRequestPaging;
    noHasItem: boolean;
    searchText: string;
    items: any[];
  };
  dialogUserDetailVisible: boolean;
  dataSource: any;
}
class PropskillUserLearnComponentProps {
  userLearnId: any;
  dialogUserStudy: boolean;
}
export default defineComponent({
  name: 'PropskillUserLearnComponent',
  components: {},
  props: {
    userLearnId: {
      type: Object,
      default: null,
    },
    dialogUserStudy: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['onCloseDialogUserstudy'],
  setup(props: PropskillUserLearnComponentProps, { emit }: any) {
    const defaultUserLearns = {
      isLoading: false,
      queryParams: {
        page: 1,
        pageSize: 10000,
      },
      noHasItem: false,
      searchText: '',
      items: [],
    };
    const data = reactive<PropskillUserLearnComponentData>({
      userLearnId: { ...props.userLearnId },
      dialogUserStudy: props.dialogUserStudy,
      isLoading: false,
      userLearns: {
        ...defaultUserLearns,
      },
      dataSource: null,
      dialogUserDetailVisible: false,
    });
    const scrollComponent = ref<any | null>();

    const getDataUserLearn = async () => {
      data.userLearns.isLoading = true;
      try {
        if (data.userLearns.noHasItem || !data.userLearnId) {
          return;
        }
        const queryParams = {
          ...data.userLearns.queryParams,
        };
        if (data.userLearns.searchText) {
          queryParams.q = data.userLearns.searchText;
        }
        const responeUserLearn = await listUserLearn(data.userLearnId, queryParams);
        data.userLearns.items = data.userLearns.items.concat(responeUserLearn?.rows || []);
        if (!responeUserLearn?.rows || responeUserLearn?.rows.length < data.userLearns.queryParams.pageSize) {
          data.userLearns.noHasItem = true;
        }
      } finally {
        data.userLearns.isLoading = false;
      }
    };

    const handleScroll = (e: any) => {
      const element: any = scrollComponent.value;
      if (element.clientHeight > 0 && element.scrollHeight - element.scrollTop === element.clientHeight) {
        data.userLearns.queryParams.page++;
        getDataUserLearn();
      }
    };

    watch(
      () => [props.userLearnId, props.dialogUserStudy],
      (newValue) => {
        if (newValue[0] && newValue[0] !== data.userLearnId) {
          data.userLearnId = newValue[0];
          getDataUserLearn();
        }
        data.dialogUserStudy = newValue[1];
      }
    );

    watch(
      () => scrollComponent.value,
      (newValue) => {
        if (newValue) {
          scrollComponent.value?.addEventListener('scroll', handleScroll);
        }
      }
    );

    const showDialogUserLearn = async (id: string) => {
      data.dialogUserStudy = true;
      data.userLearnId = id;
      data.userLearns = {
        isLoading: false,
        queryParams: {
          page: 1,
          pageSize: 10,
        },
        noHasItem: false,
        searchText: '',
        items: [],
      };
      getDataUserLearn();
    };

    const closedialogUserStudy = () => {
      data.dialogUserStudy = false;
      data.userLearnId = null;
      data.userLearns = {
        isLoading: false,
        queryParams: {
          page: 1,
          pageSize: 10,
        },
        noHasItem: false,
        searchText: '',
        items: [],
      };
    };

    const onChange = debounce(() => {
      data.userLearns.queryParams.page = 1;
      data.userLearns.noHasItem = false;
      data.userLearns.items = [];
      getDataUserLearn();
    }, 300);

    const showDetailUser = (dataUser: any) => {
      data.dataSource = dataUser;
      data.dialogUserDetailVisible = true;
    };

    const onVisible = () => {
      if (data.dialogUserStudy) {
        document.body.classList.add('el-popup-parent--hidden');
      }
    };

    return {
      data,
      closedialogUserStudy,
      TypeDocEnum,
      EmployeeStatusTransEnum,
      onChange,
      formatDate,
      showDialogUserLearn,
      showDetailUser,
      onVisible,
      scrollComponent,
    };
  },
});
</script>
