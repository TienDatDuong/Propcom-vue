<template>
  <div class="lead-home">
    <LeadHeaderComponent :activeTab="data.activeTab" @onActiveTabChange="switchTab" />
    <div class="container-xl">
      <div class="lead-home__container">
        <div class="app-section-content" ref="scrollComponent" v-loading="data.isLoading">
          <template v-if="data.totalItems && data.totalItems.length && data.masterData">
            <div class="row row-cols-auto gx-10 gy-2">
              <div
                class="col-lg-6 col-md-12 col-sm-8 col-xl-6 col-xxl-4"
                v-for="item in data.totalItems"
                :key="item.id"
              >
                <LeadDetailComponent :activeTab="data.activeTab" :modelValue="item" :masterData="data.masterData" />
              </div>
            </div>
            <div v-if="data.isLoadingMore" class="app-loading">
              <AppIconLoading />
            </div>
          </template>
          <template v-else>
            <AppEmptyComponent
              class="empty"
              title="Tệp khách hàng tiềm năng trống"
              subtitle="Hãy khảo sát thêm để tìm được khách hàng tiềm năng của mình"
            >
              <img src="@/assets/images/empty-customer-data.png" />
            </AppEmptyComponent>
          </template>
        </div>
      </div>
      <el-row>
        <template v-if="data.paging && data.paging.totalPages > 1 && data.paging.total">
          <div class="app-pagination">
            <el-pagination
              layout="prev, pager, next"
              :current-page="+data.queryParams.page"
              :page-size="+data.queryParams.pageSize"
              :total="data.paging.total"
              @currentChange="handlePaginationPageChange"
            >
            </el-pagination>
          </div>
        </template>
      </el-row>
    </div>
  </div>
  <el-dialog v-model="data.dialogLeadHotVisible" width="800px" custom-class="app-dialog">
    <template #title>
      <span class="app-dialog-title">Bạn có lead hot cần xử lý!</span>
    </template>
    <div class="app-dialog-content">
      <div class="bg-lead-hot">
        <div class="pulse">
          <img src="@/assets/images/hourglass.png" />
          <div class="text-lead-hot">
            {{ timer.hours.value < 10 ? `0${timer.hours.value}` : timer.hours }}:{{
              timer.minutes.value < 10 ? `0${timer.minutes.value}` : timer.minutes
            }}:{{ timer.seconds.value < 10 ? `0${timer.seconds.value}` : timer.seconds }}
          </div>
        </div>
      </div>
      <div class="warning">
        <img src="@/assets/images/icon_warning.png" />
        <div class="text-warning">Bạn có lead hot cần xử lý. Tiếp nhận để xử lý ngay</div>
      </div>
      <div class="group-button">
        <el-button class="button done-button" @click="goToLeadDetail(data.idLeadHot)" type="primary" text bg
          >Tiếp nhận ngay</el-button
        >
      </div>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.lead-home {
  padding-bottom: 30px;
  &__container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
    width: 100%;
    height: 100%;
    min-height: 460px;
    padding: 0 8px;
  }
  .app-section-content {
    display: flex;
    width: 100%;
    height: auto;
  }

  &__list {
    display: flex;
    row-gap: 20px;
  }

  .app-pagination {
    margin-top: 20px;
  }
  .item-grid {
    width: 100%;
  }

  .title {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 130%;
    color: #5a5a5a;
    text-align: start;
  }

  .empty {
    background: #fafafa !important;
  }
}
.group-button {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.button {
  width: 85%;
  height: 40%;
  border-radius: 5px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 110%;
  gap: 10px;
  width: 200px;
}
.return-button {
  background: #f2f2f2;
  color: #0f0f0f;
  border-color: #f2f2f2;
}

.done-button {
  background: #dd0000;
  color: #ffffff;
  border-color: #dd0000;
}
.draft-button {
  background: #ffeeed;
  color: #dd0000;
  border-color: #ffeeed;
}
.bg-lead-hot {
  background: url('~@/assets/images/gb_handle_lead_hot.png');
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.app-dialog-content {
  align-items: center;
  margin-top: 20px;
}
.text-lead-hot {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  color: #ffffff;
  margin-top: 10px;
}
.warning {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  gap: 5px;
  width: 380px;
  height: 43px;
  background: #ffeeed;
  border-radius: 5px;
  margin-top: 35px;
}
.text-warning {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  color: #dd0000 !important;
}

.pulse {
  height: 110px;
  width: 110px;
  background-color: #fb4d4d;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  animation: play 2s ease infinite;
  animation-delay: 0.3s;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
  backface-visibility: hidden;
  position: relative;
  margin: 0 auto;
}
img {
  width: 369px;
}
@keyframes play {
  0% {
    transform: scale(1);
  }
  15% {
    box-shadow: 0 0 0 5px #ffd6d3;
  }
  25% {
    box-shadow: 0 0 0 10px #ffd6d3, 0 0 0 20px #ffeeed;
  }
  25% {
    box-shadow: 0 0 0 15px #ffd6d3, 0 0 0 30px #ffeeed;
  }
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, computed, ref, onMounted, onUnmounted, watch, Ref, inject } from 'vue';
import { useInit, convertGetMasterData, formatDate } from '@/services/shared/utils';

import { findLeadAssign, updateExploitStatus } from '@/services/features/lead/lead.service';
import LeadHeaderComponent from '../../components/features/lead/LeadHeaderComponent.vue';
import LeadDetailComponent from '../../components/features/lead/LeadDetailComponent.vue';
import { ApiRequestPaging } from '@/models/api-request';
import { ApiResponsePaging } from '@/models/api-response';
import { ExploitEnum, LeadModel } from '@/services/features/lead/lead.model';
import { Client, FrameImpl, StompSubscription } from '@stomp/stompjs';
import { AppConstant } from '@/app.constant';
import { useTimer } from 'vue-timer-hook';
import { getMasterData } from '@/services/features/master-data/master-data.service';

// Định nghĩa data type của component [data] bằng Typescript
class LeadHomePageData {
  isLoading: boolean;
  isLoadingMore: boolean;
  activeTab: ExploitEnum | string;
  queryParams: ApiRequestPaging;
  paging: ApiResponsePaging<any> | null;
  totalItems: LeadModel[] | null;
  leadHot: LeadModel | null;
  dialogLeadHotVisible: boolean;
  idLeadHot: string | null;
  masterData: any;
}

export default defineComponent({
  name: 'GroupHomePage',
  components: {
    LeadHeaderComponent,
    LeadDetailComponent,
  },
  setup() {
    // Setup Default
    const { base, isLoggedIn, userId } = useInit();
    const stompClient: Ref<Client | null> | undefined = inject(AppConstant.PROVIDER_STOMP_CLIENT);
    let stompClientSubscription: StompSubscription | null = null;
    // Template ref
    const scrollComponent = ref(null);
    // Component reactive data
    const data = reactive<LeadHomePageData>({
      isLoading: false,
      isLoadingMore: false,
      activeTab: '',
      queryParams: {
        page: 1,
        pageSize: 12,
        isPotential: true,
      },
      paging: null,
      totalItems: null,
      leadHot: null,
      dialogLeadHotVisible: false,
      idLeadHot: null,
      masterData: null,
    });

    // Functions
    const loadMore = async () => {
      if (isLoggedIn.value) {
        const response = await findLeadAssign(data.queryParams);
        data.paging = response;
        data.totalItems = response && response.rows ? response.rows : null;
      }
    };
    const time = new Date();
    time.setMinutes(time.getMinutes() + (data.leadHot?.assignDuration ?? 1));
    const timeToNumber = time.getTime();
    const timer = useTimer(timeToNumber, false);
    const goToLeadDetail = async (id: string) => {
      if (
        data.leadHot &&
        (data.leadHot.exploitStatus === ExploitEnum.ASSIGN || data.leadHot.exploitStatus === ExploitEnum.REASSIGN)
      ) {
        await updateExploitStatus({ id: id, exploitStatus: ExploitEnum.PROCESSING });
      }
      base.router.push({ name: 'lead-detail', params: { id } });
    };

    // const initPage = async () => {
    //   // Get Data Group
    //   data.isLoading = true;
    //   try {
    //     if (isLoggedIn.value) {
    //       const response = await findLeadAssigned(data.queryParams);
    //       data.paging = response;
    //       data.totalItems = response?.rows || null;
    //     }
    //   } finally {
    //     data.isLoading = false;
    //   }
    // };

    const handlePaginationPageChange = async (page: number) => {
      if (data.queryParams) {
        data.queryParams.page = page;
      }
      data.isLoading = true;
      try {
        await loadMore();
      } finally {
        data.isLoading = false;
      }
    };

    const switchTab = async (activeTab: string) => {
      data.activeTab = activeTab;
      // Add query param to url
      if (base.route.name) {
        base.router.push({
          name: base.route.name.toString(),
          query: { exploitStatus: data.activeTab },
        });
        data.queryParams.page = 1;
      }
      switch (activeTab) {
        case ExploitEnum.POTENTIAL:
          data.queryParams.exploitStatus = null;
          data.queryParams.isPotential = true;
          break;
        case ExploitEnum.ASSIGN:
          data.queryParams.exploitStatus = `${ExploitEnum.ASSIGN}.${ExploitEnum.REASSIGN}`;
          delete data.queryParams.isPotential;
          break;
        case ExploitEnum.PROCESSING:
          data.queryParams.exploitStatus = ExploitEnum.PROCESSING;
          delete data.queryParams.isPotential;
          break;
        case ExploitEnum.DONE:
          data.queryParams.exploitStatus = ExploitEnum.DONE;
          delete data.queryParams.isPotential;
          break;
        case ExploitEnum.CANCEL:
          data.queryParams.exploitStatus = ExploitEnum.CANCEL;
          delete data.queryParams.isPotential;
          break;
      }
      data.isLoading = true;
      try {
        await loadMore();
      } finally {
        data.isLoading = false;
      }
    };

    // Subscribe Realtime: channel bài đăng
    const subscribeRealtime = async (handler: (message: any) => void) => {
      if (userId && stompClient && stompClient.value) {
        stompClientSubscription = stompClient.value.subscribe(
          `${AppConstant.SERVICE_WS_CHANNEL}.user-${userId}`,
          handler
        );
      }
    };

    // Unsubscribe Realtime: channel bài đăng
    const unsubscribeRealtime = () => {
      try {
        if (stompClientSubscription) {
          stompClientSubscription.unsubscribe();
        }
      } catch (err) {
        // Nuốt lỗi WebSocket is already in CLOSING or CLOSED state.
      }
    };

    // Watch
    watch(data, (newValue, oldValue) => {
      if (!data.idLeadHot && !data.leadHot) {
        subscribeRealtime(async (message: FrameImpl) => {
          const messageData = JSON.parse(message.body);
          switch (messageData.eventName) {
            // Lọc tất cả event update bình luận
            case AppConstant.REALTIME_EVENT.LEAD_HOT_ASSIGN: {
              // Load lại chi tiết bài đăng, cập nhật poll
              data.idLeadHot = messageData.data[0].id;
              data.leadHot = messageData.data[0];
              data.dialogLeadHotVisible = true;
              const time = new Date();
              time.setMinutes(time.getMinutes() + (data.leadHot?.assignDuration ?? 1));
              const timeToNumber = time.getTime();
              timer.restart(timeToNumber);
              setTimeout(() => {
                data.dialogLeadHotVisible = false;
              }, (data.leadHot?.assignDuration ?? 1) * 60 * 1000);
              timer.start();
              break;
            }
          }
        });
      }
    });

    // Life cycle event
    onMounted(async () => {
      const resMasterData = await getMasterData();
      data.masterData = resMasterData;
      if (base.route.query && base.route.query.exploitStatus && typeof base.route.query.exploitStatus === 'string') {
        data.activeTab = base.route.query.exploitStatus;
        switchTab(data.activeTab);
      } else {
        switchTab(ExploitEnum.POTENTIAL);
      }
      loadMore();
    });
    onUnmounted(() => {
      // window.removeEventListener('scroll', handleScroll);
      unsubscribeRealtime();
    });
    return {
      // Template ref
      scrollComponent,
      // Component reactive data
      data,
      timer,
      ExploitEnum,
      userId,
      // Computed
      isLoggedIn,
      // Functions
      formatDate,
      convertGetMasterData,
      handlePaginationPageChange,
      goToLeadDetail,
      switchTab,
      loadMore,
    };
  },
});
</script>
