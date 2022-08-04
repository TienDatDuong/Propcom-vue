<template>
  <div class="group-suggest-page">
    <PropskillHeaderComponent
      :searchText="data?.routeQueryParams?.q"
      @onSearch="handleSearch"
      :breadcrumbName="'Tìm kiếm'"
    />
    <div class="bg-container">
      <el-row>
        <el-col v-if="data.course.isLoading" :span="17">
          <div class="propskill-list-container-skeleton">
            <div class="mid-box-skeleton">
              <div class="mid-box-left-skeleton">
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
              </div>
              <div class="mid-box-righ-skeleton">
                <div class="el-card-skeleton"></div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="17" v-else>
          <div v-if="data?.course?.items.length">
            <div class="row row-cols-auto g-3">
              <div class="col-4" v-for="(item, index) in data.course.items" :key="index" :virtualIndex="index">
                <PropskillCourseInfoComponent
                  :modelValue="item"
                  :isShowProgress="false"
                  :isShowPrice="true"
                  :isShowOpening="false"
                />
              </div>
            </div>
          </div>
          <div class="empty-box" v-else>
            <AppEmptyComponent class="empty" title="Danh sách trống" subtitle="Không tìm thấy kết quả nào phù hợp">
              <img src="@/assets/images/status-empty.png" />
            </AppEmptyComponent>
          </div>
          <el-row>
            <div
              class="app-pagination"
              v-if="data.course.paging && data.course.paging?.totalPages > 1 && data.course.paging.total"
            >
              <el-pagination
                layout="prev, pager, next"
                :current-page="+data.course.queryParams.page"
                :page-size="+data.course.queryParams.pageSize"
                :total="data.course.paging.total"
                @currentChange="handlePaginationPageChangeCourse"
              >
              </el-pagination>
            </div>
          </el-row>
        </el-col>
        <el-col :span="7">
          <div v-if="data.currentHistory" class="profile">
            <PropskillCourseProfileComponent
              :modelValue="data.currentHistory?.data"
              :isLoading="data.currentHistory?.isLoading"
            />
            <PropskillBannerLessonComponent
              :modelValue="data.lessonNotPass.items"
              :isLoading="data.lessonNotPass.isLoading"
              class="banner"
            />
            <!-- <PropskillCourseSuggestionComponent /> -->
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
  <PropskillUserLearnComponent ref="childUserLearn" />
</template>

<style lang="scss" scoped>
.bg-container {
  width: 1200px;
  margin: 45px auto 50px auto;
  min-height: 750px;
}

.empty img {
  width: 301px;
  height: 164px;
}
.group-suggest-page {
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
.title {
  display: block;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  color: $colorNeutral;
  padding: 20px 0 10px 0;
  margin-top: 15px;
}
.profile {
  width: 334px;

  margin-left: 16px;
  //padding: 28px 13px 0 15px;
}
.banner {
  margin-top: 20px;
  margin-bottom: 30px;
}

//skeleton
.content-text-skeleton {
  width: 267px;
  height: 89px;
  border-radius: 10px;
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
  height: 270px;
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
import { useInit } from '@/services/shared/utils';
import {} from '@/services/features/elearning/elearning.service';
import PropskillHeaderComponent from '@/components/features/elearning/PropskillHeaderComponent.vue';
import PropskillUserLearnComponent from '@/components/features/elearning/PropskillUserLearnComponent.vue';
import PropskillSpeakerCarouselComponent from '@/components/features/elearning/PropskillSpeakerCarouselComponent.vue';

import { ApiRequestPaging } from '@/models/api-request';
import {
  CourseModel,
  InstructorModel,
  HistoryStudyModel,
  UserLessonModel,
} from '@/services/features/elearning/elearning.model';
import {
  findCourse,
  findInstructor,
  getHistorySutdy,
  findLessonNotPassExam,
} from '@/services/features/elearning/elearning.service';
import { StudyTypeEnum, TypePopupEnum } from '@/services/shared/enum';

class PropskillSearchResultPageData {
  isLoading: boolean;
  routeQueryParams: any;
  course: {
    isLoading: boolean;
    queryParams: ApiRequestPaging;
    items: CourseModel[] | null;
    paging: {
      totalPages: number | undefined;
      total: number | undefined;
    };
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
}

export default defineComponent({
  name: 'PropskillSearchResultPage',
  components: { PropskillHeaderComponent, PropskillUserLearnComponent },
  setup() {
    // Setup Default
    const { base, isLoggedIn } = useInit();

    const data = reactive<PropskillSearchResultPageData>({
      isLoading: false,
      routeQueryParams: {
        q: '',
      },
      course: {
        isLoading: false,
        queryParams: {
          page: 1,
          pageSize: 9,
        },
        items: [],
        paging: {
          totalPages: 0,
          total: 0,
        },
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
    });

    const onSearch = async (txtSearch: string) => {
      base.router.push({ name: 'propskill-search', query: { q: txtSearch } });
    };

    const loadCourse = async () => {
      // Get course offline
      data.course.isLoading = true;
      try {
        const responseCourse = await findCourse({
          ...data.course.queryParams,
          q: data.routeQueryParams.q,
        });
        data.course.items = responseCourse?.rows || null;
        data.course.paging.totalPages = responseCourse?.totalPages;
        data.course.paging.total = responseCourse?.total;
      } finally {
        setTimeout(() => {
          data.course.isLoading = false;
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
    const handlePaginationPageChangeCourse = async (page: number) => {
      data.course.queryParams.page = page;
      window.scrollTo(0, 0);
      await loadCourse();
    };

    const initSearch = async () => {
      await loadCourse();
    };

    const initPage = async () => {
      await Promise.all([loadCourse(), loadHistoryStudy(), loadLesonNotPass()]);
    };

    const handleSearch = async (searchText: string) => {
      data.routeQueryParams.q = searchText;
      base.router.push({ name: 'propskill-search', query: { q: searchText } });
      await initSearch();
    };

    // Life cycle event
    onMounted(async () => {
      // Load query param from url
      data.routeQueryParams = Object.assign(data.routeQueryParams, base.route.query);
      await initPage();
    });

    const childUserLearn = ref<any | null>();

    const showPopupIntructor = (dataEmit: any) => {
      if (dataEmit.type === TypePopupEnum.USER_LEARN) {
        childUserLearn.value?.showDialogUserLearn(dataEmit.id);
      } else {
        childUserLearn.value?.showDetailUser(dataEmit.user);
      }
    };

    return {
      isLoggedIn,
      data,
      onSearch,
      handleSearch,
      handlePaginationPageChangeCourse,
      showPopupIntructor,
      childUserLearn,
    };
  },
});
</script>
