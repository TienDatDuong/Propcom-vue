<template>
  <div class="list-category-page">
    <PropskillHeaderComponent
      :searchText="data?.routeQueryParams?.q"
      @onSearch="onSearch"
      :breadcrumbName="data.routerName"
    />
    <div v-if="data.categoryCourse.isLoading">
      <header>
        <div class="info-detail-skeleton">
          <div class="list-category-head-skeleton">
            <div class="list-category-head-text-skeleton"></div>
            <div class="list-category-head-text-skeleton"></div>
          </div>
        </div>
      </header>
      <div class="propskill-home-container-skeleton">
        <div class="mid-box-skeleton">
          <div class="mid-box-left-skeleton">
            <div class="carousel-container-skeleton">
              <div class="group-carousel-header-skeleton"></div>
              <div class="group-carousel-body-skeleton">
                <div class="course-container-skeleton">
                  <div class="row row-cols-auto g-3">
                    <div class="col-3" v-for="index in 9" :key="index" :virtualIndex="index">
                      <div class="course-skeleton"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="body-content">
      <el-row>
        <div class="list-category-head">
          <div class="flex-box">
            <span class="title">Danh mục khoá học</span>
            <span v-if="data.categoryCourse.items.length >= 1">
              <span class="count"
                >Hiển thị
                <span class="number">
                  {{ data.categoryCourse.items.length }}
                </span>
                danh mục</span
              >
            </span>
          </div>
        </div>
      </el-row>
      <div v-if="data.categoryCourse.items.length >= 1" class="bg-container">
        <div class="row">
          <div
            class="col-lg-3 col-md-3 col-sm-3 col-xl-3 col-xxl-3 category"
            v-for="(item, index) in data.categoryCourse.items"
            :key="index"
            :virtualIndex="index"
          >
            <PropskillCategoryComponent :modelValue="item" :lengthName="70" />
          </div>
        </div>
      </div>

      <div class="empty-box" v-else>
        <AppEmptyComponent class="empty" title="Danh sách trống" subtitle="Không tìm thấy kết quả nào phù hợp">
          <img src="@/assets/images/status-empty.png" />
        </AppEmptyComponent>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.body-content {
  min-height: 500px;
}
.list-category-page {
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
.list-category-head {
  width: 100%;
  height: 92px;
  background: #ffffff;
  display: flex;
  align-items: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.06);
}
.flex-box {
  width: 1200px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
}

.bg-container {
  padding-top: 25px;
  padding-bottom: 60px;
  background: #fafafa;
  width: 1200px;
  min-height: 850px;
  margin: 0 auto;
}
.title,
.count {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 110%;
  color: #5a5a5a;
}
.title {
  font-weight: 700;
  font-size: 24px;
  line-height: 110%;
  color: #0f0f0f;
}
.number {
  font-weight: 700;
}
.flex-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.category {
  width: 288px;
  padding: 0;
  margin-right: 15px;
  margin-top: 10px;
}
::v-deep .category-info {
  width: 288px;
  height: 323px;
}
::v-deep .image-box {
  width: 288px;
  height: 231px;
}
::v-deep .image {
  width: auto;
  height: 231px;
}
::v-deep .category-description {
  height: 100%;
  gap: 5px;
}
::v-deep .el-card__body {
  width: 288px;
  height: 313px;
}
::v-deep .category-content {
  padding-top: 13px;
  text-align: center;
  height: 82px;
}
::v-deep .category-title {
  font-weight: 500;
  font-size: 13px;
  line-height: 120%;
  color: #0f0f0f;
  max-width: 98%;
  overflow: hidden !important;
  text-overflow: ellipsis;
  text-align: center;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  white-space: normal;
  -webkit-line-clamp: 2;
}

// skeleton
.propskill-home-container-skeleton {
  margin: 0 auto;
  width: 1200px;
  min-height: 850px;
}
.info-detail-skeleton {
  width: 100%;
  height: 92px;
  background: #ffffff;
  display: flex;
  align-items: center;
  box-shadow: 0px 4px 10px rgb(0 0 0 / 6%);
  margin-bottom: 48px;
}
.list-category-head-skeleton {
  height: 24px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0px 138px;
}
.list-category-head-text-skeleton {
  height: 100%;
  width: 212px;
}
.group-carousel-header-skeleton,
.course-skeleton,
.lesson-banner-skeleton,
.content-text-skeleton,
.list-category-head-text-skeleton {
  color: transparent;
  appearance: none;
  -webkit-appearance: none;
  background-color: #eee;
  border-color: #eee;
}
.group-carousel-skeleton {
  height: 297px;
  padding: 30px 0 50px 0px;
}
.group-carousel-header-skeleton {
  height: 30px;
  margin-bottom: 17px;
  display: flex;
  flex-direction: column;
}

.mid-box-skeleton {
  padding: 5px 0px 50px 0px;
  display: flex;
  justify-content: space-between;
}
.mid-box-left-skeleton {
  height: 100%;
  width: 100%;
}

.carousel-container-skeleton {
  padding-bottom: 20px;
  display: flex;
}
.course-skeleton {
  height: 313px;
  width: 288px;
  display: inline-block;
  margin-right: 11px;
  border-radius: 10px;
}
.empty-box {
  height: auto;
}

.empty img {
  width: 301px;
  height: 164px;
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, onMounted } from 'vue';
import { useInit, encapsulateUrl } from '@/services/shared/utils';
import { findCategory } from '@/services/features/elearning/elearning.service';
import PropskillHeaderComponent from '@/components/features/elearning/PropskillHeaderComponent.vue';
import PropskillCategoryComponent from '@/components/features/elearning/PropskillCategoryComponent.vue';
import { ApiRequestPaging } from '@/models/api-request';
import { CategoryModel } from '@/services/features/elearning/elearning.model';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';

class PropskillListCategoryPageData {
  isLoading: boolean;
  routeQueryParams: any;
  routerName: string;
  categoryCourse: {
    isLoading: boolean;
    queryParams: ApiRequestPaging;
    items: CategoryModel[] | null;
  };
}
export default defineComponent({
  name: 'PropskillListCategoryPage',
  components: { PropskillHeaderComponent, PropskillCategoryComponent },
  setup() {
    const { base, isLoggedIn } = useInit();

    const data = reactive<PropskillListCategoryPageData>({
      isLoading: false,
      routeQueryParams: {
        q: '',
      },
      categoryCourse: {
        isLoading: false,
        queryParams: {
          page: 1,
          pageSize: 12,
          isHasCourse: true,
        },
        items: [],
      },
      routerName: 'Danh sách danh mục',
    });

    const initPage = async () => {
      // Get category
      data.categoryCourse.isLoading = true;
      try {
        const responseCourseOnline = await findCategory({
          ...data.categoryCourse.queryParams,
          q: data.routeQueryParams.q,
        });
        data.categoryCourse.items = responseCourseOnline?.rows || null;
      } finally {
        setTimeout(() => {
          data.categoryCourse.isLoading = false;
        }, 300);
      }
    };
    const onSearch = async (txtSearch: string) => {
      data.routeQueryParams.q = txtSearch;
      base.router.push({ name: 'propskill-category', query: { q: txtSearch } });
      initPage();
    };
    // Life cycle event
    onMounted(async () => {
      if (base.route.query.q && typeof base.route.query.q === 'string') {
        data.routeQueryParams.q = base.route.query.q;
      }
      await initPage();
    });
    return {
      isLoggedIn,
      data,
      onSearch,
    };
  },
});
</script>
