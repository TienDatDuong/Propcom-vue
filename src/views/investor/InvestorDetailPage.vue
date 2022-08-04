<template>
  <div class="investor-detail-page">
    <!-- <DialogDownloadComponent /> -->
    <InvestorHeaderComponent :investor="data.investor" :activeTab="data.activeTab" @onActiveTabChange="switchTab" />
    <div class="container-xl investor-detail-page__container">
      <!-- Content bên trái -->
      <div class="app-section-content" v-loading="data.listProject.isLoading">
        <!-- Loading skeleton items -->
        <div v-if="data.listProject.isLoading" class="investor-detail-page__list">
          <template v-for="index in +data.listProject.queryParams.pageSize" :key="index">
            <InvestorListItemAsideSkeleton />
          </template>
        </div>
        <!-- Real items -->
        <div v-if="!data.listProject.isLoading" class="investor-detail-page__list">
          <template v-if="data.listProject.paging && data.listProject.paging.total">
            <template v-for="item in data.listProject.totalItems" :key="item.id">
              <ProjectListItemComponent :project="item" @onOpenDialog="handleOpenDialog" />
            </template>
          </template>
          <!-- Empty -->
          <template v-else>
            <AppEmptyComponent title="Đang cập nhật thông tin dự án" />
          </template>
        </div>
        <!-- Pagination -->
        <template v-if="data.listProject.paging && data.listProject.paging.total">
          <div class="app-pagination">
            <el-pagination
              layout="prev, pager, next"
              :current-page="+data.listProject.queryParams.page"
              :page-size="+data.listProject.queryParams.pageSize"
              :total="data.listProject.paging.total"
              @currentChange="handlePaginationPageChange"
            >
            </el-pagination>
          </div>
        </template>
      </div>
      <!-- Aside bên phải -->
      <div class="app-section-aside">
        <template v-if="data.investor">
          <InvestorDetailAsideComponent :investor="data.investor" />
        </template>
        <template v-else>
          <InvestorDetailAsideSkeleton />
        </template>
      </div>
    </div>
  </div>
  <ProjectOrderDialog v-model:visible="data.dialogDownloadVisible" />
</template>

<style lang="scss" scoped>
.investor-detail-page {
  display: flex;
  flex-direction: column;
  padding-bottom: 60px;
  &__container {
    display: flex;
    flex-direction: row;
    column-gap: 30px;
    padding-top: 40px;
    padding-bottom: 40px;
    &__content {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      row-gap: 20px;
    }
  }
  &__list {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }
}
</style>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive } from 'vue';
import { useInit } from '@/services/shared/utils';
import InvestorHeaderComponent from '../../components/features/investor/InvestorHeaderComponent.vue';
import ProjectListItemComponent from '../../components/features/investor/ProjectListItemComponent.vue';
import InvestorDetailAsideComponent from '../../components/features/investor/InvestorDetailAsideComponent.vue';
import InvestorDetailAsideSkeleton from '../../components/skeleton/investor/InvestorDetailAsideSkeleton.vue';
import InvestorListItemAsideSkeleton from '../../components/skeleton/investor/InvestorListItemAsideSkeleton.vue';
import ProjectOrderDialog from '../../components/features/investor/ProjectOrderDialog.vue';
import { InvestorModel } from '@/services/features/investor/investor.model';
import { findInvestorById } from '@/services/features/investor/investor.service';
import { ProjectModel, ProjectTypeEnum } from '@/services/features/property/property.model';
import {
  findListProjectByInvestor,
  findListProjectByInvestorForEmployee,
} from '@/services/features/property/property.service';
import { ApiResponsePaging } from '@/models/api-response';
import { LocationQuery } from 'vue-router';

enum InvestorDetailPageSection { // Dựa theo enum ProjectTypeEnum
  ALL = 'all', // Tất cả dự án
  CAN_HO = 'can-ho', // Căn hộ
  DAT_NEN = 'dat-nen', // Đất nền
  RESORT = 'resort', // Khu nghỉ dưỡng/Khu Phức hợp
  BIET_THU = 'biet-thu', // Biệt thự
  SHOPHOUSE = 'shophouse', // Shophouse/nhà ở thương mại
}

// Định nghĩa data type của component [data] bằng Typescript
class InvestorDetailPageData {
  isLoading: boolean;
  activeTab: InvestorDetailPageSection | string;
  investorId: string;
  investor?: InvestorModel | null;
  listProject: {
    isLoading: boolean;
    queryParams: LocationQuery | any;
    paging: ApiResponsePaging<ProjectModel> | null;
    totalItems: ProjectModel[] | null;
  };
  dialogDownloadVisible: boolean;
}

export default defineComponent({
  name: 'InvestorDetailPage',
  components: {
    InvestorHeaderComponent,
    ProjectListItemComponent,
    InvestorDetailAsideComponent,
    InvestorDetailAsideSkeleton,
    ProjectOrderDialog,
    InvestorListItemAsideSkeleton,
  },
  setup() {
    // Setup Default
    const { base, isLoggedIn } = useInit();
    // Component reactive data
    const data = reactive<InvestorDetailPageData>({
      dialogDownloadVisible: false,
      isLoading: false,
      activeTab: '',
      investorId: base.route.params.id as string,
      investor: null,
      listProject: {
        isLoading: false,
        queryParams: {
          page: '1',
          pageSize: '5',
          q: '',
          type: null, // Loại dự án
        },
        paging: null,
        totalItems: null,
      },
    });

    // Function
    const loadData = async (id: string) => {
      // Lấy Bài viết khác
      if (isLoggedIn.value) {
        const response = await findListProjectByInvestorForEmployee(id, data.listProject.queryParams);
        data.listProject.paging = response;
        data.listProject.totalItems = response?.rows || null;
        if (base.route.name) {
          base.router.push({
            name: base.route.name.toString(),
            query: { page: data.listProject.queryParams.page, activeTab: base.route.query.activeTab },
          });
        }
      } else {
        const response = await findListProjectByInvestor(id, data.listProject.queryParams);
        data.listProject.paging = response;
        data.listProject.totalItems = response?.rows || null;
        if (base.route.name) {
          base.router.push({
            name: base.route.name.toString(),
            query: { page: data.listProject.queryParams.page, activeTab: base.route.query.activeTab },
          });
        }
      }
    };

    const handleOpenDialog = () => (data.dialogDownloadVisible = true);

    const handlePaginationPageChange = async (page: number) => {
      if (data.listProject.queryParams) {
        data.listProject.queryParams.page = page.toString();
      } else {
        data.listProject.queryParams = { page: page.toString() };
      }
      data.listProject.isLoading = true;
      try {
        await loadData(data.investorId);
      } finally {
        data.listProject.isLoading = false;
      }
    };

    const switchTab = async (activeTab: string) => {
      data.activeTab = activeTab;
      // Add query param to url
      if (base.route.name) {
        base.router.push({
          name: base.route.name.toString(),
          params: { id: data.investorId },
          query: { activeTab: data.activeTab },
        });
      }
      // Reset list project
      data.listProject = {
        isLoading: false,
        queryParams: {
          page: '1',
          pageSize: '5',
          q: '',
          type: null,
        },
        paging: null,
        totalItems: null,
      };
      switch (activeTab) {
        case InvestorDetailPageSection.ALL:
          data.listProject.queryParams.type = null;
          break;
        case InvestorDetailPageSection.CAN_HO:
          data.listProject.queryParams.type = ProjectTypeEnum.CAN_HO;
          break;
        case InvestorDetailPageSection.DAT_NEN:
          data.listProject.queryParams.type = ProjectTypeEnum.DAT_NEN;
          break;
        case InvestorDetailPageSection.RESORT:
          data.listProject.queryParams.type = ProjectTypeEnum.RESORT;
          break;
        case InvestorDetailPageSection.BIET_THU:
          data.listProject.queryParams.type = ProjectTypeEnum.BIET_THU;
          break;
        case InvestorDetailPageSection.SHOPHOUSE:
          data.listProject.queryParams.type = ProjectTypeEnum.SHOPHOUSE;
          break;
      }
      data.listProject.isLoading = true;
      try {
        await loadData(data.investorId);
      } finally {
        data.listProject.isLoading = false;
      }
    };

    // Life cycle event
    onMounted(async () => {
      if (base.route.query && base.route.query.activeTab && typeof base.route.query.activeTab === 'string') {
        data.activeTab = base.route.query.activeTab;
      } else {
        switchTab(InvestorDetailPageSection.ALL);
      }
      // Get Data Group
      data.isLoading = true;
      try {
        const response = await findInvestorById(data.investorId);
        data.investor = response?.result || null;
      } finally {
        data.isLoading = false;
      }

      // Get Data List project
      data.listProject.isLoading = true;
      try {
        if (base.route.query.page) {
          data.listProject.queryParams.page = base.route.query.page;
        }
        if (base.route.query.activeTab) {
          switch (base.route.query.activeTab) {
            case InvestorDetailPageSection.ALL:
              data.listProject.queryParams.type = null;
              break;
            case InvestorDetailPageSection.CAN_HO:
              data.listProject.queryParams.type = ProjectTypeEnum.CAN_HO;
              break;
            case InvestorDetailPageSection.DAT_NEN:
              data.listProject.queryParams.type = ProjectTypeEnum.DAT_NEN;
              break;
            case InvestorDetailPageSection.RESORT:
              data.listProject.queryParams.type = ProjectTypeEnum.RESORT;
              break;
            case InvestorDetailPageSection.BIET_THU:
              data.listProject.queryParams.type = ProjectTypeEnum.BIET_THU;
              break;
            case InvestorDetailPageSection.SHOPHOUSE:
              data.listProject.queryParams.type = ProjectTypeEnum.SHOPHOUSE;
              break;
          }
        }
        await loadData(data.investorId);
      } finally {
        data.listProject.isLoading = false;
      }
    });

    return {
      data,
      handleOpenDialog,
      switchTab,
      handlePaginationPageChange,
    };
  },
});
</script>
