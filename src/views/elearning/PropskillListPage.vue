<template>
  <div class="proskill-home">
    <PropskillHeaderComponent
      :searchText="data?.routeQueryParams?.q"
      @onSearch="onSearch"
      :breadcrumbName="data.routerName"
    />
    <div class="propskill-container">
      <el-row>
        <!-- stydy -->
        <el-col
          v-if="
            (data.isLoading && data.activeTab === PropSkillTabEnum.COURSE_ONLINE) ||
            (data.isLoading && data.activeTab === PropSkillTabEnum.COURSE_OFFLINE)
          "
          :span="17"
        >
          <div class="propskill-list-container-skeleton">
            <div class="mid-box-skeleton">
              <div class="mid-box-left-skeleton">
                <div class="tab-skeleton">
                  <div class="content-text-skeleton"></div>
                  <div class="content-text-skeleton"></div>
                  <div class="content-text-skeleton"></div>
                </div>
                <div class="box-card-skeleton"></div>
                <div class="carousel-container-skeleton">
                  <div class="group-carousel-header-skeleton"></div>
                  <div class="group-carousel-body-skeleton">
                    <div class="course-container-skeleton">
                      <div class="row row-cols-auto g-3">
                        <div
                          class="col-lg-6 col-md-6 col-sm-4 col-xl-4 col-xxl-4"
                          v-for="(item, index) in 9"
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
              <div class="mid-box-righ-skeleton">
                <div class="el-card-skeleton"></div>
              </div>
            </div>
          </div>
        </el-col>
        <!-- diễn giả -->
        <el-col v-else-if="data.isLoading && data.activeTab === PropSkillTabEnum.SPEAKER" :span="17">
          <div class="propskill-list-container-skeleton">
            <div class="mid-box-skeleton">
              <div class="mid-box-left-skeleton">
                <div class="tab-skeleton">
                  <div class="content-text-skeleton"></div>
                  <div class="content-text-skeleton"></div>
                  <div class="content-text-skeleton"></div>
                </div>
                <div class="carousel-container-skeleton">
                  <div class="group-carousel-header-skeleton"></div>
                  <div class="group-carousel-body-skeleton">
                    <div class="course-container-skeleton">
                      <div class="row row-cols-auto g-3">
                        <div
                          class="col-lg-6 col-md-6 col-sm-4"
                          v-for="(item, index) in 6"
                          :key="index"
                          :virtualIndex="index"
                        >
                          <div class="course-skeleton_Speakers"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="el-row-skeleton"></div>
              </div>
              <div class="mid-box-righ-skeleton">
                <div class="el-card-skeleton"></div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col v-else class="list" :span="17">
          <PropskillChangeTabComponent :activeTab="data.activeTab" @onActiveTabChange="switchTab" />
          <PropskillFilterComponent
            :typeGet="data.typeGet"
            :activeTab="data.activeTab"
            @onActiveTypeChange="switchType"
            @toggledialogCategory="toggledialogCategory"
            v-if="data.activeTab !== PropSkillTabEnum.SPEAKER"
          />
          <div class="category-list">
            <div v-for="category in data.listCategory" :key="category" class="mx-1 filter-tag">
              <a @click="handleClose(category)"><img src="@/assets/images/x-icon.png" class="x-icon" /></a>
              <span class="category-name">{{ category.name }}</span>
            </div>
          </div>

          <div class="list-page">
            <div>
              <div v-if="data.activeTab === PropSkillTabEnum.COURSE_ONLINE">
                <div class="row row-cols-auto g-3" v-if="data.courseOnline?.length">
                  <div
                    class="col-lg-6 col-md-6 col-sm-4 col-xl-4 col-xxl-4"
                    v-for="(item, index) in data.courseOnline"
                    :key="index"
                    :virtualIndex="index"
                  >
                    <PropskillCourseInfoComponent
                      v-if="data.typeGet === PropskillDataGet.ALL"
                      :modelValue="item"
                      :isShowProgress="false"
                      :isShowPrice="true"
                    />
                    <PropskillCourseInfoComponent
                      v-else
                      :modelValue="item"
                      :isShowProgress="true"
                      :isShowPrice="false"
                      :isShowStatus="false"
                    />
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
                    <PropskillCourseInfoComponent :modelValue="item" />
                  </div>
                </div>
                <template v-else>
                  <AppEmptyComponent class="empty" title="Khóa học offline không có dữ liệu">
                    <img src="@/assets/images/status-empty.png" />
                  </AppEmptyComponent>
                </template>
              </div>

              <div class="speaker-box" v-if="data.activeTab === PropSkillTabEnum.SPEAKER">
                <div class="row row-cols-auto g-3" v-if="data.instructor?.length">
                  <div
                    class="col-lg-12 col-md-12 col-sm-6 col-xl-6 col-xxl-6"
                    v-for="(item, index) in data.instructor"
                    :key="index"
                    :virtualIndex="index"
                  >
                    <PropskillSpeakerInfoComponent @showPopupIntructor="showPopupIntructor" :modelValue="item" />
                  </div>
                </div>
                <template v-else>
                  <AppEmptyComponent class="empty" title="Diễn giả không có dữ liệu">
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
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
  <el-dialog v-model="data.dialogCategory" width="833px" custom-class="app-dialog" top="5vh">
    <template #title>
      <span class="app-dialog-title">Chọn khoá học theo thư mục </span>
    </template>
    <div class="dialog-box-content">
      <div style="text-align: center; margin-top: 20px">
        <span>Hãy chọn thư mục chủ đề bạn đang quan tâm! </span>
      </div>
      <div class="list-checkbox">
        <div class="app-dialog-content">
          <label
            v-for="item in data.categoryCourse.items"
            :key="item.id"
            class="label-checkbox"
            :class="{ checked: item.checked }"
            :for="item.id"
          >
            <span class="checkbox-list-span"> {{ item.name }} </span>
            <input
              type="checkbox"
              v-model="item.checked"
              class="check-day checkbox-list-input"
              :id="item.id"
              :value="item.name"
              @change="checkCategory($event)"
            />
            <label class="checkbox-label" :for="item.id"></label>
          </label>
        </div>
      </div>

      <div class="app-dialog-content__actions">
        <button @click="searchDialog()" type="submit" class="app-btn app-btn-primary">OK</button>
      </div>
    </div>
  </el-dialog>
  <PropskillUserLearnComponent ref="childUserLearn" />
</template>

<style lang="scss" scoped>
::v-deep .row.row-cols-auto.g-3 {
  min-height: 450px;
}
::v-deep .el-dialog__body {
  padding: 0 7px 30px 0;
}
::v-deep .el-card.is-never-shadow.course-container:hover {
  border: none;
  filter: drop-shadow(0px 10px 30px rgba(221, 0, 0, 0.2));
}
.dialog-box-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.list-page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
::v-deep .el-row {
  height: 100%;
}
.proskill-home {
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 45px;
  margin-bottom: 61px;
}
.propskill-container {
  width: 1200px;
  margin: 0 auto;
  min-height: 600px;
}
.list {
  padding-right: 17px;
  //padding-bottom: 23px;
}
.category-list {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
.filter-tag {
  background: #ffffff;

  border: 1px solid #f2f2f2;
  border-radius: 100px;
  padding: 2px 10px;
  margin-right: 8px;
  margin-bottom: 10px;
}
.category-name {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 130%;

  color: #5a5a5a;
}
.x-icon {
  width: 15px;
  height: 15px;
  margin-right: 5px;
  cursor: pointer;
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
  margin: 0 10px 15px 20px;
  padding: 20.5px 22px 20.5px 20px;
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
  background: #fafafa;
  border-radius: 10px;
}
.app-dialog-title {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  color: #0f0f0f;
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
  background: #fafafa;
  border: 2px solid #c1c1c1;
  border-radius: 5px;
  width: 20px;
  height: 20px;
  float: right;
  margin-top: 5px;
  cursor: pointer;
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
  overflow: auto;
  height: 55vh;
}

.app-pagination {
  margin-top: 20px;
}
.app-dialog-content__actions {
  margin-top: 20px;
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
.col-lg-12.col-md-12.col-sm-6.col-xl-6.col-xxl-6 {
  margin-top: 20px;
}
.speaker-box {
  min-height: 450px;
}

//skeleton loader
.tab-skeleton {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 88px;
  margin-bottom: 15px;
}
.content-text-skeleton {
  width: 267px;
  height: 89px;
  border-radius: 10px;
}
.course-container-skeleton {
  padding-top: 20px;
}
.box-card-skeleton {
  height: 59px;
  border-radius: 10px;
  margin-bottom: 20px;
}
.propskill-list-container-skeleton {
  margin: 0 auto;
  width: 1200px;
}
.group-carousel-header-skeleton,
.course-skeleton,
.course-skeleton_Speakers,
.swiper-pagination-skeleton,
.speaker-container-skeleton,
.el-card-body-skeleton,
.lesson-banner-skeleton,
.el-row-skeleton,
.box-card-skeleton,
.content-text-skeleton,
.swiper-wrapper-skeleton {
  color: transparent;
  appearance: none;
  -webkit-appearance: none;
  background-color: #eee;
  border-color: #eee;
}
.mid-box-skeleton {
  display: flex;
  justify-content: space-between;
}
.mid-box-left-skeleton {
  height: 100%;
  width: 833px;
}
.carousel-container-skeleton {
  display: flex;
}
.course-skeleton {
  height: 230px;
  width: 265px;
  display: inline-block;
  margin-right: 11px;
  border-radius: 10px;
  margin-bottom: 10px;
}
.course-skeleton_Speakers {
  height: 200px;
  width: 409px;
  display: inline-block;
  border-radius: 10px;
  padding: 0 8px;
}
.swiper-pagination-skeleton {
  height: 29px;
  width: 818px;
  margin-top: 5px;
}
.group-carousel-body-skeleton {
  display: flex;
  flex-direction: column;
}
.speaker-container-box-skeleton {
  display: flex;
  justify-content: space-between;
  width: 833px;
  flex-wrap: wrap;
}
.speaker-container-skeleton {
  width: 409px;
  border-radius: 10px;
}
.mid-box-right-skeleton {
  height: 100%;
  width: 350px;
  height: 100%;
}
.el-card-body-skeleton {
  width: 334px;
  height: 428px;
  border-radius: 10px;
  margin-bottom: 30px;
}
.el-row-skeleton {
  height: 65px;
  margin-top: 45px;
  border-radius: 10px;
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, onMounted, ref } from 'vue';
import { useInit, encapsulateUrl } from '@/services/shared/utils';
import { ApiRequestPaging } from '@/models/api-request';
import PropskillCourseProfileComponent from '@/components/features/elearning/PropskillCourseProfileComponent.vue';
// import PropskillChangeTabComponent from '@/components/features/elearning/PropskillChangeTabComponent.vue';
import PropskillHeaderComponent from '@/components/features/elearning/PropskillHeaderComponent.vue';
import PropskillFilterComponent from '@/components/features/elearning/PropskillFilterComponent.vue';
import PropskillUserLearnComponent from '@/components/features/elearning/PropskillUserLearnComponent.vue';
import {
  CourseModel,
  InstructorModel,
  CategoryModel,
  HistoryStudyModel,
  UserLessonModel,
} from '@/services/features/elearning/elearning.model';
import {
  findCourse,
  findInstructor,
  findCategory,
  getHistorySutdy,
  findLessonNotPassExam,
} from '@/services/features/elearning/elearning.service';
import {
  PropSkillTabEnum,
  PropskillDataGet,
  StudyTypeEnum,
  PropSkillRouterTabEnum,
  CourseTypeEnum,
  TypePopupEnum,
} from '@/services/shared/enum';
import { isArray } from 'lodash';

// Định nghĩa data type của component [data] bằng Typescript
class PropskillpHomePageData {
  isLoading: boolean;
  activeTab: PropSkillTabEnum | string;
  typeGet: PropskillDataGet | string;
  routeQueryParams: any;
  queryParams: ApiRequestPaging;
  paging: {
    totalPages: number | undefined;
    total: number | undefined;
  };
  courseOnline: CourseModel[] | null;
  courseOffline: CourseModel[] | null;
  dataAllPage: CourseModel[];
  instructor: InstructorModel[] | null;
  categoryCourse: {
    isLoading: boolean;
    queryParams: ApiRequestPaging;
    items: CategoryModel[] | null;
  };
  currentHistory: {
    isLoading: boolean;
    data: HistoryStudyModel | null;
  };
  lessonNotPass: {
    isLoading: boolean;
    queryParams: ApiRequestPaging;
    items: UserLessonModel[] | null;
  };
  dialogCategory: boolean;
  listCategory: any[];
  routerName: string;
}

enum CheckCategoryEnum {
  ALL = 'all-category',
}

export default defineComponent({
  name: 'PropskillViewTabPage',
  components: {
    PropskillHeaderComponent,
    PropskillCourseProfileComponent,
    // PropskillChangeTabComponent,
    PropskillFilterComponent,
    PropskillUserLearnComponent,
  },
  setup() {
    // Setup Default
    const { base, isLoggedIn } = useInit();
    const data = reactive<PropskillpHomePageData>({
      isLoading: false,
      activeTab: PropSkillTabEnum.COURSE_ONLINE,
      typeGet: PropskillDataGet.ALL,
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
      instructor: [],
      categoryCourse: {
        isLoading: false,
        queryParams: {
          page: 1,
          pageSize: 10,
          isHasCourse: true,
        },
        items: [],
      },
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
      dialogCategory: false,
      listCategory: [],
      routerName: '',
    });

    const getDataList = async () => {
      if (data.activeTab === PropSkillTabEnum.COURSE_ONLINE || data.activeTab === PropSkillTabEnum.COURSE_OFFLINE) {
        const paramCourse: any = {
          ...data.queryParams,
          typeStudy: data.activeTab === PropSkillTabEnum.COURSE_ONLINE ? StudyTypeEnum.ONLINE : StudyTypeEnum.OFFLINE,
        };
        if (data.listCategory.length) {
          paramCourse.category = data.listCategory.map((item) => item.id).join(';');
        }
        if (data.typeGet !== PropskillDataGet.ALL) {
          delete paramCourse.page;
          delete paramCourse.pageSize;
          paramCourse.status = data.typeGet;
        }
        // Get course Online
        data.isLoading = true;
        try {
          const responseCourseOnline = await findCourse({ ...paramCourse, q: data.routeQueryParams.q });
          if (data.typeGet !== PropskillDataGet.ALL) {
            data.dataAllPage = isArray(responseCourseOnline) ? responseCourseOnline : responseCourseOnline?.rows || [];
            data.paging.totalPages = Math.ceil(data.dataAllPage.length / data.queryParams.pageSize);
            data.paging.total = data.dataAllPage.length;
            if (data.activeTab === PropSkillTabEnum.COURSE_ONLINE) {
              data.courseOnline = data.dataAllPage.slice(
                (data.queryParams.page - 1) * data.queryParams.pageSize,
                data.queryParams.page * data.queryParams.pageSize
              );
            } else {
              data.courseOffline = data.dataAllPage.slice(
                (data.queryParams.page - 1) * data.queryParams.pageSize,
                data.queryParams.page * data.queryParams.pageSize
              );
            }
          } else {
            if (data.activeTab === PropSkillTabEnum.COURSE_ONLINE) {
              data.courseOnline = responseCourseOnline?.rows || null;
            } else {
              data.courseOffline = responseCourseOnline?.rows || null;
            }
            data.paging.totalPages = responseCourseOnline?.totalPages;
            data.paging.total = responseCourseOnline?.total;
          }
        } finally {
          setTimeout(() => {
            data.isLoading = false;
          }, 200);
        }
      } else {
        // Get instructor
        data.isLoading = true;
        try {
          const responseCourseOnline = await findInstructor({ ...data.queryParams, q: data.routeQueryParams.q });
          data.instructor = responseCourseOnline?.rows || null;
          data.paging.totalPages = responseCourseOnline?.totalPages;
          data.paging.total = responseCourseOnline?.total;
        } finally {
          setTimeout(() => {
            data.isLoading = false;
          }, 200);
        }
      }
    };
    const onSearch = async (txtSearch: string) => {
      data.routeQueryParams.q = txtSearch;
      base.router.push({
        name: 'propskill-list',
        query: { q: txtSearch, activeTab: base.route.query.activeTab, typeGet: base.route.query.typeGet },
      });
      getDataList();
    };

    const loadCategory = async () => {
      // Get category
      data.categoryCourse.isLoading = true;
      try {
        const responseCourseOnline = await findCategory(data.categoryCourse.queryParams);
        data.categoryCourse.items = responseCourseOnline?.rows || [];
        data.categoryCourse.items.map((doc) => {
          doc.checked = false;
          doc.name = doc.nameLocale && doc.nameLocale.length > 0 ? doc.nameLocale[0].name : '';
        });
        data.categoryCourse.items = [
          new CategoryModel({
            id: CheckCategoryEnum.ALL,
            checked: false,
            name: 'Tất cả thư mục',
          }),
        ].concat(data.categoryCourse.items);
      } finally {
        setTimeout(() => {
          data.categoryCourse.isLoading = false;
        }, 200);
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
        }, 200);
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
        }, 200);
      }
    };

    const initPage = async () => {
      await Promise.all([loadCategory(), loadHistoryStudy(), loadLesonNotPass()]);
    };

    // Chuyển tab
    const switchTab = (activeTab: PropSkillTabEnum) => {
      if (data.activeTab === activeTab) {
        return;
      }

      data.routerName =
        activeTab === PropSkillTabEnum.SPEAKER ? PropSkillRouterTabEnum.SPEAKER : PropSkillRouterTabEnum.COURSE;
      data.courseOffline = [];
      data.instructor = [];
      data.activeTab = activeTab;
      data.typeGet = PropskillDataGet.ALL;
      data.categoryCourse?.items?.map((doc) => (doc.checked = false));
      data.listCategory = [];
      data.queryParams = {
        page: 1,
        pageSize: activeTab === PropSkillTabEnum.SPEAKER ? 6 : 9,
      };
      base.router.push({ name: 'propskill-list', query: { activeTab, typeGet: PropskillDataGet.ALL } });
      getDataList();
    };

    // Chuyển tab
    const switchType = (typeGet: PropskillDataGet) => {
      if (data.typeGet === typeGet) {
        return;
      }
      data.typeGet = typeGet;
      data.queryParams = {
        page: 1,
        pageSize: 9,
      };
      base.router.push({ name: 'propskill-list', query: { activeTab: data.activeTab, typeGet } });
      getDataList();
    };

    // Life cycle event
    onMounted(async () => {
      if (base.route.query.activeTab && typeof base.route.query.activeTab === 'string') {
        data.activeTab = base.route.query.activeTab;
      }
      if (base.route.query.typeGet && typeof base.route.query.typeGet === 'string') {
        data.typeGet = base.route.query.typeGet;
      }
      if (base.route.query.q && typeof base.route.query.q === 'string') {
        data.routeQueryParams.q = base.route.query.q;
      }
      data.queryParams = {
        page: 1,
        pageSize: data.activeTab === PropSkillTabEnum.SPEAKER ? 6 : 9,
      };
      data.routerName =
        data.activeTab === PropSkillTabEnum.SPEAKER ? PropSkillRouterTabEnum.SPEAKER : PropSkillRouterTabEnum.COURSE;
      initPage();
      getDataList();
    });

    // Ẩn/hiện dialog edit
    const toggledialogCategory = (isVisible: boolean) => {
      data.dialogCategory = isVisible;
    };

    const searchDialog = () => {
      data.listCategory = [];
      data?.categoryCourse?.items?.map((doc) => {
        if (doc.checked && doc.id !== CheckCategoryEnum.ALL) {
          data.listCategory.push({ id: doc.id, name: doc.name });
        }
      });
      data.dialogCategory = false;
      getDataList();
    };

    const handlePaginationPageChange = async (page: number) => {
      data.queryParams.page = page;
      if (data.typeGet !== PropskillDataGet.ALL) {
        if (data.activeTab === PropSkillTabEnum.COURSE_ONLINE) {
          data.courseOnline = data.dataAllPage.slice(
            (data.queryParams.page - 1) * data.queryParams.pageSize,
            data.queryParams.page * data.queryParams.pageSize
          );
        } else {
          data.courseOffline = data.dataAllPage.slice(
            (data.queryParams.page - 1) * data.queryParams.pageSize,
            data.queryParams.page * data.queryParams.pageSize
          );
        }
      } else {
        getDataList();
      }
      window.scrollTo(0, 0);
    };

    const checkCategory = (event: any) => {
      if (event.target.id === CheckCategoryEnum.ALL) {
        if (event.target.checked) {
          data.categoryCourse.items?.map((doc) => {
            doc.checked = true;
          });
        } else {
          data.categoryCourse.items?.map((doc) => {
            doc.checked = false;
          });
        }
      } else {
        if (!event.target.checked) {
          data.categoryCourse.items?.map((doc) => {
            if (doc.id === CheckCategoryEnum.ALL) {
              doc.checked = false;
            }
          });
        } else {
          let checkAllCategory = true;
          data.categoryCourse.items?.map((doc) => {
            if (doc.id !== CheckCategoryEnum.ALL && doc.checked === false) {
              checkAllCategory = false;
            }
          });
          if (checkAllCategory) {
            data.categoryCourse.items?.map((doc) => {
              doc.checked = true;
            });
          }
        }
      }
    };

    const handleClose = (tag: any) => {
      data.categoryCourse.items?.map((doc) => {
        if (doc.id === tag.id || doc.id === CheckCategoryEnum.ALL) {
          doc.checked = false;
        }
      });
      data.listCategory.splice(data.listCategory.indexOf(tag), 1);
      getDataList();
    };

    const childUserLearn = ref<any | null>();

    const showPopupIntructor = (dataEmit: any) => {
      if (dataEmit.type === TypePopupEnum.USER_LEARN) {
        childUserLearn.value?.showDialogUserLearn(dataEmit.id);
      } else {
        childUserLearn.value?.showDetailUser(dataEmit.user);
      }
    };

    return {
      PropSkillTabEnum,
      PropskillDataGet,
      isLoggedIn,
      data,
      onSearch,
      switchTab,
      switchType,
      toggledialogCategory,
      searchDialog,
      handlePaginationPageChange,
      checkCategory,
      handleClose,
      showPopupIntructor,
      childUserLearn,
    };
  },
});
</script>
