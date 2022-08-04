<template>
  <div class="proskill-home">
    <PropskillHeaderComponent
      :searchText="data?.routeQueryParams?.q"
      @onSearch="onSearch"
      :breadcrumbName="data.breadcrumb[2].text"
    />
    <div class="propskill-container">
      <el-row>
        <el-col v-if="data.isLoading" :span="17">
          <div class="mid-box-left-skeleton">
            <div class="box-card-skeleton"></div>

            <div class="carousel-container-skeleton">
              <div class="group-carousel-header-skeleton"></div>
              <div class="group-carousel-body-skeleton">
                <div class="course-container-skeleton">
                  <div class="row row-cols-auto g-3">
                    <div
                      class="col-lg-6 col-md-6 col-sm-4 col-xl-4 col-xxl-4"
                      v-for="(item, index) in 6"
                      :key="index"
                      :virtualIndex="index"
                    >
                      <div class="course-skeleton"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="el-row-skeleton"></div>
          </div>
        </el-col>
        <el-col v-else class="list" :span="17">
          <el-card class="box-card" shadow="never">
            <div class="group-tag">
              <div
                class="filter-tag"
                :class="{ active: data.activeTab === PropSkillTabEnum.COURSE_ONLINE }"
                @click="switchTab(PropSkillTabEnum.COURSE_ONLINE)"
              >
                <span>Khóa học online</span>
                <span class="active-icon-course-online"></span>
              </div>
              <div
                class="filter-tag"
                :class="{ active: data.activeTab === PropSkillTabEnum.COURSE_OFFLINE }"
                @click="switchTab(PropSkillTabEnum.COURSE_OFFLINE)"
              >
                <span>Khóa học offline</span>
                <span class="active-icon-course-offline"></span>
              </div>
            </div>
          </el-card>
          <div class="group-content">
            <div>
              <div v-if="data.activeTab === PropSkillTabEnum.COURSE_ONLINE">
                <div class="row row-cols-auto g-3" v-if="data.courseOnline?.length">
                  <div
                    class="col-lg-6 col-md-6 col-sm-4 col-xl-4 col-xxl-4"
                    v-for="(item, index) in data.courseOnline"
                    :key="index"
                    :virtualIndex="index"
                  >
                    <PropskillCourseInfoComponent :modelValue="item" :isShowPrice="true" />
                  </div>
                </div>
                <template v-else>
                  <AppEmptyComponent class="empty" title="Khóa học online không có dữ liệu">
                    <img src="@/assets/images/status-empty.png" />
                  </AppEmptyComponent>
                </template>
              </div>
              <div v-if="data.activeTab === PropSkillTabEnum.COURSE_OFFLINE">
                <div class="row row-cols-auto g-3" v-if="data.courseOffline?.length">
                  <div
                    class="col-lg-6 col-md-6 col-sm-4 col-xl-4 col-xxl-4"
                    v-for="(item, index) in data.courseOffline"
                    :key="index"
                    :virtualIndex="index"
                  >
                    <PropskillCourseInfoComponent :modelValue="item" :isShowPrice="true" />
                  </div>
                </div>
                <template v-else>
                  <AppEmptyComponent class="empty" title="Khóa học offline không có dữ liệu">
                    <img src="@/assets/images/status-empty.png" />
                  </AppEmptyComponent>
                </template>
              </div>
            </div>
            <el-row>
              <div class="app-pagination" v-if="data.paging && data.paging?.totalPages > 1 && data.paging.total">
                <el-pagination
                  layout="prev, pager, next"
                  :current-page="+data.queryParams.page"
                  :page-size="+data.queryParams.pageSize"
                  :total="data.paging.total"
                  @currentChange="handlePaginationPageChange"
                >
                </el-pagination>
              </div>
            </el-row>
          </div>
        </el-col>
        <el-col :span="7">
          <div v-if="data.currentHistory" class="profile">
            <PropskillCourseProfileComponent
              :isLoading="data.currentHistory.isLoading"
              :modelValue="data.currentHistory?.data"
            />
            <PropskillBannerLessonComponent
              class="banner"
              :modelValue="data.lessonNotPass.items"
              :isLoading="data.lessonNotPass.isLoading"
            />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.active-icon-course-online {
  background-image: url('~@/assets/images/wifi-line-icon.png');
  width: 13px;
  height: 14px;
  background-size: 13px 14px;
  background-repeat: no-repeat;
  background-position: center;
}
.active .active-icon-course-online {
  background-image: url('~@/assets/images/wifi-line-active-con.png');
  width: 13px;
  height: 14px;
  background-size: 13px 14px;
  background-repeat: no-repeat;
  background-position: center;
}
.active-icon-course-offline {
  background-image: url('~@/assets/images/outline-icon.png');
  width: 13px;
  height: 14px;
  background-size: 13px 14px;
  background-repeat: no-repeat;
  background-position: center;
}
.active .active-icon-course-offline {
  background-image: url('~@/assets/images/outline-active-icon.png');
  width: 13px;
  height: 14px;
  background-size: 13px 14px;
  background-repeat: no-repeat;
  background-position: center;
}
.group-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 520px;
  margin-bottom: 23px;
}
.proskill-home {
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 45px;
}
.propskill-container {
  width: 1200px;
  margin: 0 auto;
  min-height: 720px;
}
.list {
  padding-right: 17px;
  //margin-bottom: 30px;
}
.profile {
  width: 334px;
  margin-left: 16px;
}
.checkbox-list-span {
  float: left;
}
.checkbox-list-input {
  float: right;
}

.label-checkbox {
  margin-right: 0.87rem;
  padding: 10px 10px;
  text-align: center;
  display: inline-block;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 19.5px;
  font: Roboto;
  height: auto;
  margin-bottom: 15px;
  border-radius: 5px;
  cursor: pointer;
}

.check-day {
  visibility: hidden;
  position: absolute;
  right: 0;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.checked {
  background: #ffeeed;
  color: #fff;
}

.checkbox-list-span {
  color: #5a5a5a;
  font-weight: 700;
  padding-top: 5px;
  width: 80%;
  text-align: left;
}

.checked .checkbox-list-span {
  color: #fb4d4d;
}

.checkbox-label {
  border: 1px solid #c1c1c1;
  border-radius: 5px;
  width: 20px;
  height: 20px;
  float: right;
  margin-top: 5px;
}

.label-checkbox.checked .checkbox-label {
  background: #fb4d4d;
  border: 1px solid #fb4d4d;
}

.label-checkbox.checked .checkbox-label::before {
  content: '✔';
  color: #ffffff;
  font-size: 13px;
}

.list-checkbox {
  max-height: 300px;
  overflow: auto;
}

.app-pagination {
  margin: 20px 0 0px 0;
  //margin-top: 20px;
  /* align-self: flex-end; */
}

.empty {
  background: #ffffff;
  border: 1px solid #f2f2f2;
  margin: 0 auto;
  width: 833px;
}
.empty img {
  width: 301px;
  height: 164px;
}
.box-card {
  height: 59px;
  border-radius: 10px;
  margin-bottom: 20px;
}
::v-deep .el-card__body {
  padding: 0;
}
.group-tag {
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin: 13px 0 0 20px;
}
.filter-tag {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 7px 12px;
  gap: 10px;
  background: #fafafa;
  border-radius: 100px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 130%;
  color: #a7a7a7;
  cursor: pointer;
}

.filter-tag.active {
  background: #ffeeed;
  color: #fb4d4d !important;
}

.topic-page-header {
  // position: sticky;
  // top: $appHeaderHeight;
  // z-index: $appZindexSticky;
  width: 100%;
  min-height: 47px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url('~@/assets/bg_filter.png');
  background-position: center;
  background-size: auto 70px, contain;
  box-shadow: $boxShadow;

  &__breadcrumb,
  &__breadcrumb > a {
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    color: #ffd6d3;
    text-decoration: none;
  }
}
//skeleton
.group-carousel-header-skeleton,
.course-skeleton,
.swiper-pagination-skeleton,
.speaker-container-skeleton,
.el-card-body-skeleton,
.lesson-banner-skeleton,
.box-card-skeleton,
.swiper-wrapper-skeleton {
  color: transparent;
  appearance: none;
  -webkit-appearance: none;
  background-color: #eee;
  border-color: #eee;
}
.mid-box-left-skeleton {
  height: 100%;
  width: 833px;
}
.box-card-skeleton {
  height: 59px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.group-carousel-body-skeleton {
  display: flex;
  flex-direction: column;
}
.course-skeleton {
  height: 230px;
  width: 265px;
  padding: 19px;
  display: inline-block;
  margin-right: 11px;
  border-radius: 10px;
}
.el-row-skeleton {
  height: 65px;
  margin-bottom: 60px;
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, onMounted } from 'vue';
import { useInit, encapsulateUrl } from '@/services/shared/utils';
import { ApiRequestPaging } from '@/models/api-request';
import PropskillHeaderComponent from '@/components/features/elearning/PropskillHeaderComponent.vue';
import PropskillCourseProfileComponent from '@/components/features/elearning/PropskillCourseProfileComponent.vue';
import {
  CourseModel,
  HistoryStudyModel,
  UserLessonModel,
  CategoryModel,
} from '@/services/features/elearning/elearning.model';
import {
  findCourse,
  getHistorySutdy,
  findLessonNotPassExam,
  getCategoryById,
} from '@/services/features/elearning/elearning.service';
import { PropSkillTabEnum, StudyTypeEnum } from '@/services/shared/enum';

// Định nghĩa data type của component [data] bằng Typescript
class PropskillpHomePageData {
  isLoading: boolean;
  activeTab: PropSkillTabEnum | string;
  categoryId: string;
  breadcrumb: any;
  routeQueryParams: any;
  queryParams: ApiRequestPaging;
  paging: {
    totalPages: number | undefined;
    total: number | undefined;
  };
  courseOnline: CourseModel[] | null;
  courseOffline: CourseModel[] | null;
  dataAllPage: CourseModel[];
  currentHistory: {
    isLoading: boolean;
    data: HistoryStudyModel | null;
  };
  lessonNotPass: {
    isLoading: boolean;
    queryParams: ApiRequestPaging;
    items: UserLessonModel[] | null;
  };
  categoryCourse: any;
}

enum CheckCategoryEnum {
  ALL = 'all-category',
}

export default defineComponent({
  name: 'PropskillCourseFavoritePage',
  components: {
    PropskillCourseProfileComponent,
    PropskillHeaderComponent,
  },
  setup() {
    // Setup Default
    const { base, isLoggedIn } = useInit();

    const data = reactive<PropskillpHomePageData>({
      isLoading: false,
      activeTab: PropSkillTabEnum.COURSE_ONLINE,
      categoryId: base.route.params.id as string,
      breadcrumb:
        base.route.meta?.breadcrumb && Array.isArray(base.route.meta?.breadcrumb) ? base.route.meta?.breadcrumb : [],
      routeQueryParams: {
        q: '',
      },
      queryParams: {
        page: 1,
        pageSize: 9,
      },
      paging: {
        totalPages: 0,
        total: 0,
      },
      courseOnline: [],
      courseOffline: [],
      dataAllPage: [],
      currentHistory: {
        isLoading: false,
        data: null,
      },
      lessonNotPass: {
        isLoading: false,
        queryParams: {
          page: 1,
          pageSize: 1,
        },
        items: [],
      },
      categoryCourse: null,
    });

    const getDataList = async () => {
      if (data.activeTab === PropSkillTabEnum.COURSE_ONLINE || data.activeTab === PropSkillTabEnum.COURSE_OFFLINE) {
        const paramCourse: any = {
          ...data.queryParams,
          q: data.routeQueryParams.q,
          category: data.categoryId,
          typeStudy: data.activeTab === PropSkillTabEnum.COURSE_ONLINE ? StudyTypeEnum.ONLINE : StudyTypeEnum.OFFLINE,
        };
        // Get course Online
        data.isLoading = true;
        try {
          const responseCourseOnline = await findCourse(paramCourse);
          if (data.activeTab === PropSkillTabEnum.COURSE_ONLINE) {
            data.courseOnline = responseCourseOnline?.rows || null;
          } else {
            data.courseOffline = responseCourseOnline?.rows || null;
          }
          data.paging.totalPages = responseCourseOnline?.totalPages;
          data.paging.total = responseCourseOnline?.total;
        } finally {
          setTimeout(() => {
            data.isLoading = false;
          }, 300);
        }
      }
    };
    const onSearch = async (txtSearch: string) => {
      data.routeQueryParams.q = txtSearch;
      base.router.push({
        name: 'propskill-detail-category',
        query: { q: txtSearch, activeTab: base.route.query.activeTab },
      });
      getDataList();
    };
    const getCategory = async () => {
      data.isLoading = true;
      try {
        const responseCategory = await getCategoryById(data.categoryId);
        data.categoryCourse = responseCategory?.result || null;
        data.breadcrumb[2] = {
          text: data.categoryCourse?.nameLocale[0].name,
          routeName: 'propskill-detail-category',
          params: { id: data.categoryId },
        };
      } finally {
        setTimeout(() => {
          data.isLoading = false;
        }, 300);
      }
    };
    const loadHistoryStudy = async () => {
      // Get history study
      data.currentHistory.isLoading = true;
      try {
        const responseCurrentHistory = await getHistorySutdy();
        data.currentHistory.data = responseCurrentHistory?.result || null;
      } finally {
        setTimeout(() => {
          data.currentHistory.isLoading = false;
        }, 300);
      }
    };

    const loadLesonNotPass = async () => {
      // Get lesson not pass
      data.lessonNotPass.isLoading = true;
      try {
        const responseLessonNotPass = await findLessonNotPassExam(data.lessonNotPass.queryParams);
        data.lessonNotPass.items = responseLessonNotPass?.rows || null;
      } finally {
        setTimeout(() => {
          data.lessonNotPass.isLoading = false;
        }, 300);
      }
    };

    const initPage = async () => {
      await Promise.all([loadHistoryStudy(), loadLesonNotPass(), getCategory()]);
    };

    // Chuyển tab
    const switchTab = (activeTab: PropSkillTabEnum) => {
      if (data.activeTab === activeTab) {
        return;
      }
      data.queryParams.page = 1;
      data.courseOnline = [];
      data.courseOffline = [];
      data.activeTab = activeTab;
      getDataList();
      if (base.route.name) {
        base.router.replace({
          name: base.route.name.toString(),
          query: { activeTab: data.activeTab },
        });
      }
    };

    // Life cycle event
    onMounted(async () => {
      if (base.route.query && base.route.query.activeTab && typeof base.route.query.activeTab === 'string') {
        data.activeTab = base.route.query.activeTab;
      }
      if (base.route.query && base.route.query.q && typeof base.route.query.q === 'string') {
        data.routeQueryParams.q = base.route.query.q;
      }
      initPage();
      getDataList();
    });

    const handlePaginationPageChange = async (page: number) => {
      data.queryParams.page = page;
      getDataList();
    };
    return {
      PropSkillTabEnum,
      isLoggedIn,
      data,
      onSearch,
      switchTab,
      handlePaginationPageChange,
    };
  },
});
</script>
