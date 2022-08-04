<template>
  <div class="proskill-home">
    <PropskillHeaderComponent @onSearch="onSearch" />
    <div class="propskill-home-container" v-loading="data.isLoading">
      <el-row>
        <PropskillBannerComponent :isLoading="data.banner.isLoading" :modelValue="data?.banner.data" />
      </el-row>
      <el-row>
        <PropskillCategoryCarouselComponent
          :isLoading="data?.categoryCourse.isLoading"
          :modelValue="data?.categoryCourse.items"
        />
      </el-row>
      <el-row class="mid-box">
        <el-col :span="17">
          <template
            v-if="
              data.courseOnline.items.length ||
              data.courseOffline.items.length ||
              data.instructor.length ||
              data.courseOnline.isLoading ||
              data.courseOffline.isLoading ||
              data.instructor.isLoading
            "
          >
            <el-row>
              <PropskillCourseCarouselComponent
                :isLoading="data?.courseOnline.isLoading"
                :modelValue="data?.courseOnline.items"
                :isOnline="true"
              />
            </el-row>
            <el-row>
              <PropskillCourseCarouselComponent
                :isLoading="data?.courseOnline.isLoading"
                :modelValue="data?.courseOffline.items"
                :isOnline="false"
              />
            </el-row>
            <el-row>
              <PropskillSpeakerCarouselComponent
                @showPopupIntructor="showPopupIntructor"
                :isLoading="data.instructor.isLoading"
                :modelValue="data.instructor.items"
              />
            </el-row>
          </template>
          <template v-else>
            <AppEmptyComponent class="empty" title="Không có dữ liệu">
              <img src="@/assets/images/status-empty.png" />
            </AppEmptyComponent>
          </template>
        </el-col>
        <el-col :span="7">
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
::v-deep .el-dialog__body {
  padding: 0 7px 30px 0;
}
::v-deep .el-card.is-never-shadow.course-container:hover {
  border: 1px solid #dd0000;
  filter: none !important;
}
::v-deep .el-card.is-never-shadow.speaker-container:hover {
  border: 1px solid #dd0000;
  box-shadow: none;
}
.propskill-home-container {
  margin: 0 auto;
  width: 1200px;
}
.mid-box {
  padding-top: 5px;
  padding-bottom: 50px;
}
.profile {
  width: 336px;
  margin-left: 10px;
}
.banner {
  width: 334px;
  margin-top: 20px;
  margin-bottom: 30px;
}
.empty {
  background: #ffffff;
  border: 1px solid #f2f2f2;
  margin: 0 auto;
  width: 833px;
  margin-bottom: 20px;
}
.empty img {
  width: 301px;
  height: 164px;
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, computed, ref, onMounted, onUnmounted, watch, Ref, inject } from 'vue';
import { useInit } from '@/services/shared/utils';
import PropskillHeaderComponent from '@/components/features/elearning/PropskillHeaderComponent.vue';
import PropskillCourseCarouselComponent from '@/components/features/elearning/PropskillCourseCarouselComponent.vue';
import PropskillCourseProfileComponent from '@/components/features/elearning/PropskillCourseProfileComponent.vue';
import PropskillCategoryCarouselComponent from '@/components/features/elearning/PropskillCategoryCarouselComponent.vue';
import PropskillSpeakerCarouselComponent from '@/components/features/elearning/PropskillSpeakerCarouselComponent.vue';
import PropskillBannerComponent from '@/components/features/elearning/PropskillBannerComponent.vue';
import PropskillUserLearnComponent from '@/components/features/elearning/PropskillUserLearnComponent.vue';
import {} from '@/services/features/elearning/elearning.service';
import { ApiRequestPaging } from '@/models/api-request';
import {
  CourseModel,
  InstructorModel,
  CategoryModel,
  HistoryStudyModel,
  UserLessonModel,
  BannerPropskillModel,
} from '@/services/features/elearning/elearning.model';
import {
  findCourse,
  findInstructor,
  findCategory,
  getHistorySutdy,
  findLessonNotPassExam,
  getBannerPropskill,
} from '@/services/features/elearning/elearning.service';
import { BannerPositionEnum, StudyTypeEnum, TypePopupEnum } from '@/services/shared/enum';

// Định nghĩa data type của component [data] bằng Typescript
class PropskillpHomePageData {
  isLoading: boolean;
  courseOnline: {
    isLoading: boolean;
    queryParams: ApiRequestPaging;
    items: CourseModel[] | null;
  };
  courseOffline: {
    isLoading: boolean;
    queryParams: ApiRequestPaging;
    items: CourseModel[] | null;
  };
  instructor: {
    isLoading: boolean;
    queryParams: ApiRequestPaging;
    items: InstructorModel[] | null;
  };
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
  banner: {
    isLoading: boolean;
    data: BannerPropskillModel[] | null;
  };
}

export default defineComponent({
  name: 'PropskillHomePage',
  components: {
    PropskillHeaderComponent,
    PropskillCourseCarouselComponent,
    PropskillCourseProfileComponent,
    PropskillCategoryCarouselComponent,
    PropskillSpeakerCarouselComponent,
    PropskillBannerComponent,
    PropskillUserLearnComponent,
  },
  setup() {
    // Setup Default
    const { base, isLoggedIn } = useInit();

    const data = reactive<PropskillpHomePageData>({
      isLoading: false,
      courseOnline: {
        isLoading: false,
        queryParams: {
          page: 1,
          pageSize: 7,
          typeStudy: StudyTypeEnum.ONLINE,
        },
        items: [],
      },
      courseOffline: {
        isLoading: false,
        queryParams: {
          page: 1,
          pageSize: 7,
          typeStudy: StudyTypeEnum.OFFLINE,
        },
        items: [],
      },
      instructor: {
        isLoading: false,
        queryParams: {
          page: 1,
          pageSize: 6,
        },
        items: [],
      },
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
      banner: {
        isLoading: false,
        data: [],
      },
    });

    const onSearch = async (txtSearch: string) => {
      base.router.push({ name: 'propskill-search', query: { q: txtSearch } });
    };

    const loadCourseOnline = async () => {
      // Get data online
      data.courseOnline.isLoading = true;
      try {
        const responseCourseOnline = await findCourse(data.courseOnline.queryParams);
        data.courseOnline.items = responseCourseOnline?.rows || null;
      } finally {
        data.courseOnline.isLoading = false;
      }
    };

    const loadCourseOffline = async () => {
      // Get course offline
      data.courseOffline.isLoading = true;
      try {
        const responseCourseOnline = await findCourse(data.courseOffline.queryParams);
        data.courseOffline.items = responseCourseOnline?.rows || null;
      } finally {
        data.courseOffline.isLoading = false;
      }
    };

    const loadInstructor = async () => {
      // Get instructor
      data.instructor.isLoading = true;
      try {
        const responseCourseOnline = await findInstructor(data.instructor.queryParams);
        data.instructor.items = responseCourseOnline?.rows || null;
      } finally {
        data.instructor.isLoading = false;
      }
    };

    const loadCategory = async () => {
      // Get category
      data.categoryCourse.isLoading = true;
      try {
        const responseCourseOnline = await findCategory(data.categoryCourse.queryParams);
        data.categoryCourse.items = responseCourseOnline?.rows || null;
      } finally {
        data.categoryCourse.isLoading = false;
      }
    };

    const loadHistoryStudy = async () => {
      // Get history study
      data.currentHistory.isLoading = true;
      try {
        const responseCurrentHistory = await getHistorySutdy();
        data.currentHistory.data = responseCurrentHistory?.result || null;
      } finally {
        data.currentHistory.isLoading = false;
      }
    };

    const loadLesonNotPass = async () => {
      // Get lesson not pass
      data.lessonNotPass.isLoading = true;
      try {
        const responseLessonNotPass = await findLessonNotPassExam(data.lessonNotPass.queryParams);
        data.lessonNotPass.items = responseLessonNotPass?.rows || null;
      } finally {
        data.lessonNotPass.isLoading = false;
      }
    };

    const loadBanner = async () => {
      // Get banner propskill
      data.banner.isLoading = true;
      try {
        const responseBanner = await getBannerPropskill();
        if (responseBanner.result.length > 0) {
          data.banner.data = responseBanner.result.filter(
            (item) => item.data.displayPosition === BannerPositionEnum.PROPSKILL
          );
        }
      } finally {
        data.banner.isLoading = false;
      }
    };

    const initPage = async () => {
      await Promise.all([
        loadCourseOnline(),
        loadCourseOffline(),
        loadInstructor(),
        loadCategory(),
        loadHistoryStudy(),
        loadLesonNotPass(),
        loadBanner(),
      ]);
    };

    const childUserLearn = ref<any | null>();

    const showPopupIntructor = (dataEmit: any) => {
      if (dataEmit.type === TypePopupEnum.USER_LEARN) {
        childUserLearn.value?.showDialogUserLearn(dataEmit.id);
      } else {
        childUserLearn.value?.showDetailUser(dataEmit.user);
      }
    };

    // Life cycle event
    onMounted(async () => {
      await initPage();
    });

    return {
      isLoggedIn,
      data,
      onSearch,
      showPopupIntructor,
      childUserLearn,
    };
  },
});
</script>
