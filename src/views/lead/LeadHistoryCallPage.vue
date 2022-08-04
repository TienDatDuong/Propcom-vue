<template>
  <el-config-provider :locale="locale">
    <div class="lead-history-call">
      <AppBreadcrumbBarComponent />
      <el-card class="lead-history-call__box-card box-card">
        <template #header>
          <div class="lead-history-call__header-card header-card">Danh sách lịch sử cuộc gọi</div>
        </template>
        <AppFilterComponent :isText="true" @onSearch="onSearch" />
        <div class="app-content">
          <HistoryCallComponent :callLog="data.callLog.paging?.rows" :isLoading="data.callLog.isLoading" />
        </div>
        <div class="demo-pagination-block app-pagination-customize">
          <el-pagination
            v-model:currentPage="data.callLog.queryParams.page"
            v-model:page-size="data.callLog.queryParams.pageSize"
            :page-sizes="[20, 50, 100, 500]"
            layout="prev, pager, next, sizes, jumper"
            :total="data.callLog.paging?.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-card>
    </div>
  </el-config-provider>
</template>

<style lang="scss" scoped>
.lead-history-call {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &__header-card {
    background: white !important;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 130%;
    color: #5a5a5a;
    text-align: center;
  }
  &__box-card {
    margin: 40px 0;
    border-radius: 10px !important;
    width: 95%;
  }
}
</style>

<script lang="ts">
// Composition API
import { ApiResponsePaging } from '@/models/api-response';
import { CallBelongType, CallHistoryModel } from '@/services/features/communicaiton/communication.model';
import { getHistoryCall } from '@/services/features/communicaiton/communication.service';
import { ExploitEnum } from '@/services/features/lead/lead.model';
import { useInit } from '@/services/shared/utils';
import lang from 'element-plus/es/locale/lang/vi';
import { defineComponent, onMounted, reactive, watch } from 'vue';
import { LocationQuery } from 'vue-router';
import HistoryCallComponent from '../../components/features/lead/HistoryCallComponent.vue';

// Định nghĩa data type của component [data] bằng Typescript
class LeadHistoryCallPageData {
  callLog: {
    isLoading: boolean;
    queryParams: LocationQuery | any;
    paging: ApiResponsePaging<CallHistoryModel> | null;
  };
}

export default defineComponent({
  name: 'LeadHistoryCallPage',
  components: {
    HistoryCallComponent,
  },
  setup() {
    // Setup Default
    const { base, isLoggedIn, userId } = useInit();
    // Component reactive data
    const data = reactive<LeadHistoryCallPageData>({
      callLog: {
        isLoading: false,
        queryParams: {
          page: 1,
          pageSize: 20,
          typeBelong: CallBelongType.LEAD,
          q: '',
          startDate: '',
          endDate: '',
          id: userId,
        },
        paging: null,
      },
    });
    const getCallLog = async () => {
      // Get Data Group
      data.callLog.isLoading = true;
      try {
        if (isLoggedIn.value) {
          const response = await getHistoryCall(data.callLog.queryParams);
          data.callLog.paging = response;
          setTimeout(() => {
            const doc = document.getElementsByClassName('el-pagination__jump');
            if (doc && doc.length) {
              doc[0].childNodes[0].textContent = 'Đi tới trang';
            }
          }, 200);
        }
      } finally {
        data.callLog.isLoading = false;
      }
    };
    const handleSizeChange = (val: number) => {
      data.callLog.queryParams.pageSize = val;
      getCallLog();
    };
    const handleCurrentChange = (val: number) => {
      data.callLog.queryParams.page = val;
      getCallLog();
    };
    const onSearch = (dataSearch: any) => {
      data.callLog.queryParams.q = dataSearch.text;
      data.callLog.queryParams.typeBelong = CallBelongType.LEAD;
      data.callLog.queryParams.endDate = dataSearch.endDate ? new Date(dataSearch.endDate).getTime() : '';
      data.callLog.queryParams.startDate = dataSearch.startDate ? new Date(dataSearch.startDate).getTime() : '';
      getCallLog();
    };
    // Watch
    watch(isLoggedIn, (newValue, oldValue) => getCallLog());

    // Life cycle event
    onMounted(async () => {
      await getCallLog();
    });

    return {
      // Component reactive data
      data,
      locale: lang,
      ExploitEnum,
      // Computed
      isLoggedIn,
      // Functions
      handleSizeChange,
      handleCurrentChange,
      onSearch,
    };
  },
});
</script>
