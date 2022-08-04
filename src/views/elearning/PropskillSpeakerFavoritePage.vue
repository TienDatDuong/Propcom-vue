<template>
  <div class="group-suggest-page">
    <AppBreadcrumbBarComponent />
    <div class="bg-container">
      <el-row>
        <el-col v-if="data.instructor.isLoading" :span="17">
          <div class="mid-box-left-skeleton">
            <div class="speaker-container-box-skeleton">
              <div class="speaker-container-skeleton"></div>
              <div class="speaker-container-skeleton"></div>
              <div class="speaker-container-skeleton"></div>
              <div class="speaker-container-skeleton"></div>
            </div>
          </div>
        </el-col>
        <el-col v-else :span="17">
          <div class="empty-box">
            <template v-if="!data?.instructor.items.length && !data.instructor.isLoading">
              <AppEmptyComponent class="empty" title="Danh sách trống" subtitle="Không tìm thấy kết quả nào phù hợp">
                <img src="@/assets/images/status-empty.png" />
              </AppEmptyComponent>
            </template>
          </div>
          <div class="row row-cols-auto g-3">
            <div
              v-loading="data.instructor.isLoading"
              class="col-lg-12 col-md-12 col-sm-6 col-xl-6 col-xxl-6"
              v-for="(item, index) in data.instructor.items"
              :key="index"
              :virtualIndex="index"
            >
              <PropskillSpeakerInfoComponent @showPopupIntructor="showPopupIntructor" :modelValue="item" />
            </div>
          </div>
          <el-row>
            <template
              v-if="data.instructor.paging && data.instructor.paging.totalPages > 1 && data.instructor.paging.total"
            >
              <div class="app-pagination">
                <el-pagination
                  layout="prev, pager, next"
                  :current-page="+data.instructor.queryParams.page"
                  :page-size="+data.instructor.queryParams.pageSize"
                  :total="data.instructor.paging.total"
                  @currentChange="handlePaginationPageChangeInstructor"
                >
                </el-pagination>
              </div>
            </template>
          </el-row>
        </el-col>
        <el-col :sm="14" :md="7" :lg="7" :xl="7">
          <div v-if="data.currentHistory" class="profile">
            <PropskillCourseProfileComponent
              :isLoading="data.currentHistory.isLoading"
              :modelValue="data.currentHistory?.data"
            />
            <PropskillBannerLessonComponent
              :modelValue="data.lessonNotPass.items"
              :isLoading="data.lessonNotPass.isLoading"
              class="banner"
            />
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
  margin: 0 auto 50px auto;
  min-height: 820px;
}
.empty-box {
  padding-top: 45px;
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
  margin-top: 45px;

  margin-left: 16px;
  //padding: 28px 13px 0 15px;
}
.banner {
  margin-top: 20px;
  margin-bottom: 30px;
}
.group-carousel__header-skeleton,
.course-skeleton,
.swiper-pagination-skeleton,
.speaker-container-skeleton,
.el-card__body-skeleton,
.swiper-wrapper-skeleton {
  color: transparent;
  appearance: none;
  -webkit-appearance: none;
  background-color: #eee;
  border-color: #eee;
}
.mid-box-left-skeleton {
  min-height: 500px;
  margin-top: 45px;
}
.group-carousel-skeleton {
  height: 297px;
  padding: 0px 0 50px 0px;
}
.speaker-container-box-skeleton {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 840px;
  gap: 20px;
}
.speaker-container-skeleton {
  width: 409px;
  height: 200px;
  border-radius: 10px;
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, onMounted, ref } from 'vue';
import { useInit } from '@/services/shared/utils';
import {} from '@/services/features/elearning/elearning.service';
import PropskillUserLearnComponent from '@/components/features/elearning/PropskillUserLearnComponent.vue';

import { ApiRequestPaging } from '@/models/api-request';
import { InstructorModel, HistoryStudyModel, UserLessonModel } from '@/services/features/elearning/elearning.model';
import {
  findInstructor,
  getHistorySutdy,
  findLessonNotPassExam,
} from '@/services/features/elearning/elearning.service';
import { TypePopupEnum } from '@/services/shared/enum';

class PropskillSearchResultPageData {
  isLoading: boolean;
  instructor: {
    isLoading: boolean;
    queryParams: ApiRequestPaging;
    items: InstructorModel[] | null;
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
  name: 'PropskillSpeakerFavoritePage',
  components: { PropskillUserLearnComponent },
  setup() {
    // Setup Default
    const { base, isLoggedIn } = useInit();

    const data = reactive<PropskillSearchResultPageData>({
      isLoading: false,
      instructor: {
        isLoading: false,
        queryParams: {
          page: 1,
          pageSize: 6,
          onlyFavorite: true,
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

    const loadInstructor = async () => {
      // Get instructor
      data.instructor.isLoading = true;
      try {
        const responseInstructor = await findInstructor(data.instructor.queryParams);
        data.instructor.items = responseInstructor?.rows || null;
        data.instructor.paging.totalPages = responseInstructor?.totalPages;
        data.instructor.paging.total = responseInstructor?.total;
      } finally {
        setTimeout(() => {
          data.instructor.isLoading = false;
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

    const handlePaginationPageChangeInstructor = async (page: number) => {
      data.instructor.queryParams.page = page;
      await loadInstructor();
    };

    const initPage = async () => {
      await Promise.all([loadInstructor(), loadHistoryStudy(), loadLesonNotPass()]);
    };

    // Life cycle event
    onMounted(async () => {
      // Load query param from url
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
      handlePaginationPageChangeInstructor,
      showPopupIntructor,
      childUserLearn,
    };
  },
});
</script>
