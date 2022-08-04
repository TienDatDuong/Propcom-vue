<template>
  <div class="lesson-page">
    <div class="topic-page-header">
      <div class="topic-page-header__breadcrumb" v-if="data.breadcrumb?.length > 0">
        <template v-for="(item, index) in data.breadcrumb" :key="index">
          <router-link :to="{ name: item.routeName, params: item.params }">{{ item.text }}</router-link>
          <span v-if="index !== data.breadcrumb.length - 1"> / </span>
        </template>
      </div>
    </div>
    <div class="lesson-container">
      <el-row v-if="data.lessons?.length || data.isLoading">
        <el-col :span="7">
          <PropskillSideLessonTabComponent
            :modelValue="data.lessons"
            :course="data.course"
            :isLoading="data.isLoading"
            :activeTab="data.activeTab"
            @onActiveSideLessonTabChange="switchLessonTab"
          />
          <div class="group-suggest">
            <GroupSuggestAsideComponent
              :groupSuggest="data.groupSuggest.items"
              :isLoading="data.groupSuggest.isLoading"
              :isPropskill="true"
            />
          </div>
        </el-col>
        <el-col :span="17" class="content">
          <PropskillLessonComponent
            :doExam="data.doExam"
            :modelValue="data.topics"
            :lessonActive="data.lessonActive"
            :isLoading="data.isLoading"
          />
        </el-col>
      </el-row>
      <template v-if="!data.isLoading && !data.lessons?.length">
        <AppEmptyComponent class="empty" title="Khóa học đang được cập nhật">
          <img src="@/assets/images/status-empty.png" />
        </AppEmptyComponent>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lesson-container {
  padding-top: 45px;
  padding-bottom: 60px;
  width: 1200px;
  margin: 0 auto;
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
.content {
  min-height: 585px;
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
.group-suggest {
  margin-top: 20px;
  width: 334px;
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, onMounted } from 'vue';
import { useInit, encapsulateUrl } from '@/services/shared/utils';
import {
  getDetailCourse,
  getListLesson,
  getListQuestion,
  getListTopic,
} from '@/services/features/elearning/elearning.service';
import PropskillSideLessonTabComponent from '@/components/features/elearning/PropskillSideLessonTabComponent.vue';
import PropskillLessonComponent from '@/components/features/elearning/PropskillLessonComponent.vue';
import GroupSuggestAsideComponent from '@/components/features/group/GroupSuggestAsideComponent.vue';
import { CourseModel } from '@/services/features/elearning/elearning.model';
import { FreeTypeEnum, ProgressCourseEnum, StatusPaymentEnum } from '@/services/shared/enum';
import {
  findGroupSuggestByCurrentEmployee,
  findGroupSuggestByCurrentEmployeeNotLogin,
} from '@/services/features/group/group.service';
import { ApiRequestPaging } from '@/models/api-request';
import { GroupModel } from '@/services/features/group/group.model';

class PropskillDetailCoursePageData {
  isLoading: boolean;
  courseId: string;
  course: CourseModel | null;
  lessons: any[] | null;
  topics: any[];
  lessonActive: any;
  activeTab: any;
  breadcrumb: any;
  doExam: boolean;
  groupSuggest: {
    isLoading: boolean;
    queryParams: ApiRequestPaging;
    items: GroupModel[] | null;
  };
}

export default defineComponent({
  name: 'PropskillProgessLessonPage',
  components: {
    PropskillSideLessonTabComponent,
    PropskillLessonComponent,
    GroupSuggestAsideComponent,
  },
  setup() {
    // Setup Default
    const { base, isLoggedIn } = useInit();
    const data = reactive<PropskillDetailCoursePageData>({
      isLoading: true,
      courseId: base.route.params.id as string,
      course: null,
      lessons: [],
      topics: [],
      lessonActive: null,
      activeTab: null,
      breadcrumb:
        base.route.meta?.breadcrumb && Array.isArray(base.route.meta?.breadcrumb) ? base.route.meta?.breadcrumb : [],
      doExam: false,
      groupSuggest: {
        isLoading: false,
        queryParams: {
          page: 1,
          pageSize: 2,
        },
        items: [],
      },
    });

    const loadListTopic = async () => {
      // Get course Online
      data.isLoading = true;
      try {
        const responseTopic = await getListTopic(data.activeTab);
        data.topics = responseTopic?.result.topics || null;
        let checkAllPass = true;
        data.doExam = false;
        for (let i = 0; i < data.topics.length; i++) {
          if (!data.topics[i].isPassed) {
            for (let j = i + 1; j < data.topics.length; j++) {
              data.topics[j].disabled = true;
            }
            break;
          }
        }
        data.topics.map((doc) => {
          if (!doc.isPassed) {
            checkAllPass = false;
          }
        });
        if (checkAllPass) {
          const responeQuestion = await getListQuestion(data.activeTab);
          if (responeQuestion?.result && responeQuestion?.result.length > 0) {
            data.doExam = true;
          }
        }
      } finally {
        setTimeout(() => {
          data.isLoading = false;
        }, 300);
      }
    };

    const loadDetailCourse = async () => {
      // Get course Online
      data.isLoading = true;
      try {
        const responseCourse = await getDetailCourse(data.courseId);
        data.course = responseCourse?.result || null;
        if (
          responseCourse?.result?.typeFree !== FreeTypeEnum.FREE &&
          responseCourse?.result?.statusPayment !== StatusPaymentEnum.PAID
        ) {
          base.router.push({
            name: 'propskill-detail-course',
            params: { id: data.courseId },
            query: { needPayment: 'payment' },
          });
        }
      } finally {
        setTimeout(() => {
          data.isLoading = false;
        }, 300);
      }
    };
    const loadGroupSuggest = async () => {
      data.groupSuggest.isLoading = true;
      try {
        if (isLoggedIn.value) {
          const responseGroupSuggest = await findGroupSuggestByCurrentEmployee(data.groupSuggest.queryParams);
          data.groupSuggest.items = responseGroupSuggest?.rows || null;
        } else {
          const responseGroupSuggest = await findGroupSuggestByCurrentEmployeeNotLogin(data.groupSuggest.queryParams);
          data.groupSuggest.items = responseGroupSuggest?.rows || null;
        }
      } finally {
        setTimeout(() => {
          data.groupSuggest.isLoading = false;
        }, 300);
      }
    };

    const loadLessons = async () => {
      // Get course Online
      data.isLoading = true;
      try {
        const responseCourse = await getListLesson(data.courseId);
        data.lessons = responseCourse?.result && Array.isArray(responseCourse?.result) ? responseCourse?.result : [];
        if (data.lessons.length > 0) {
          data.breadcrumb[2] = {
            text: data.lessons[0].course?.name,
            routeName: 'propskill-detail-course',
            params: { id: data.courseId },
          };
          let setLessonActive = false;
          for (let i = 0; i < data.lessons.length; i++) {
            if (!data.lessons[i].isPassed) {
              if (!setLessonActive) {
                data.lessonActive = data.lessons[i];
                setLessonActive = true;
              }
              for (let j = i + 1; j < data.lessons.length; j++) {
                if (!data.lessons[j].defaultActive && !data.lessons[i].isPassed) {
                  data.lessons[j].disabled = true;
                }
              }
            } else {
              if (data.lessons[i + 1]) {
                data.lessons[i + 1].disabled = false;
              }
            }
            if (!setLessonActive && i === data.lessons.length - 1) {
              data.lessonActive = data.lessons[i];
            }
          }
          data.activeTab = data.lessonActive.id;
          await loadListTopic();
        }
      } finally {
        setTimeout(() => {
          data.isLoading = false;
        }, 300);
      }
    };

    const initPage = async () => {
      await Promise.all([loadDetailCourse(), loadLessons(), loadGroupSuggest()]);
    };

    // Chuyển tab
    const switchLessonTab = (activeTab: string) => {
      if (data.activeTab === activeTab) {
        return;
      }
      data.activeTab = activeTab;
      data.lessonActive = data.lessons?.find((doc) => doc.id === data.activeTab);
      loadListTopic();
    };

    // Life cycle event
    onMounted(async () => {
      await initPage();
    });
    return { data, ProgressCourseEnum, switchLessonTab };
  },
});
</script>
