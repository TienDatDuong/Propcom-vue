<template>
  <div class="topic-page">
    <div class="topic-page-header">
      <div class="topic-page-header__breadcrumb" v-if="data.breadcrumb?.length > 0">
        <template v-for="(item, index) in data.breadcrumb" :key="index">
          <router-link :to="{ name: item.routeName, params: item.params }">{{ item.text }}</router-link>
          <span v-if="index !== data.breadcrumb.length - 1"> / </span>
        </template>
      </div>
    </div>
    <div v-if="data.isLoading" class="container-skeleton">
      <div class="propskill-home-container-skeleton">
        <div class="mid-box-skeleton">
          <div class="mid-box-righ-skeleton">
            <div class="el-card__body-skeleton">
              <div class="progress-title-skeleton"></div>
              <div class="progress-title-skeleton"></div>
              <div class="progress-title-skeleton"></div>
            </div>
          </div>

          <div class="mid-box-left-skeleton">
            <div class="card__body-skeleton">
              <div class="header-title-skeleton">
                <div class="header-title-text-skeleton"></div>
                <div class="header-title-text-skeleton"></div>
              </div>
              <div class="course-skeleton"></div>
              <div class="course-skeleton"></div>
              <div class="course-skeleton"></div>
              <div class="course-skeleton"></div>
              <div class="course-skeleton"></div>
            </div>
            <div class="btn-skeleton"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="topic-container">
      <el-row v-if="data.topics.length">
        <el-col :span="7">
          <PropskillSideTopicTabComponent
            :isLoading="data.isLoading"
            @onActiveSideTopicTabChange="switchTopicTab"
            :activeTab="data.activeTab"
            :modelValue="data.topics"
          />
        </el-col>

        <el-col :span="17" class="content">
          <PropskillTopicComponent
            :isLoading="data.isLoading"
            :passAllTopic="data.passAllTopic"
            :needDoExam="data.needDoExam"
            :hasExam="data.hasExam"
            :modelValue="data.topicActive"
            :lesson="data.lesson"
            :lastTopic="data.lastTopic"
            @nextTopic="nextTopic"
            @finishTopic="finishTopic"
          />
        </el-col>
      </el-row>
      <template v-else>
        <AppEmptyComponent class="empty" title="Bài học đang được cập nhật">
          <img src="@/assets/images/status-empty.png" />
        </AppEmptyComponent>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.topic-container {
  padding-top: 45px;
  padding-bottom: 60px;
  margin: 0 auto;
  width: 1200px;
}
.content {
  min-height: 585px;
  padding-left: 50px;
}
.app-dialog-content {
  align-items: center;
}

.app-dialog-content img {
  width: 215px;
  height: 215px;
  margin-bottom: 15px;
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
//skelteton
.card__body-skeleton {
  border-radius: 10px;
  margin-bottom: 15px;
  margin-right: 19px;
  border: 2px solid#eee;
  padding: 20px 20px 200px 20px;
}
.header-title-skeleton {
  height: 67px;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #eee;
}
.header-title-text-skeleton {
  height: 30px;
  width: 30%;
}
.propskill-home-container-skeleton {
  margin: 0 auto;
  width: 1200px;
}
.propskill-banber-skeleton {
  display: flex;
  justify-content: space-around;
  height: 210px;
  padding: 45px 0px 10px 0px;
}
.banner-img-skeleton {
  width: 592.5px;
  height: 100%;
  border-radius: 10px;
}
.banner-img-skeleton,
.course-skeleton,
.swiper-pagination-skeleton,
.speaker-container-skeleton,
.lesson-banner-skeleton,
.content-text-skeleton,
.title-skeleton,
.el-card__body_lesson-skeleton,
.el-card__body__header-skeleton,
.progress-title-skeleton,
.btn-skeleton,
.header-title-text-skeleton,
.group-suggest-aside__card-skeleton,
.swiper-wrapper-skeleton {
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
.swiper-wrapper-skeleton {
  height: 200px;
}
.mid-box-skeleton {
  padding: 5px 0px 50px 0px;
  display: flex;
  justify-content: space-between;
  margin-top: 48px;
}
.mid-box-left-skeleton {
  height: 100%;
  width: 833px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.course-skeleton {
  height: 24px;
  width: 100%;
  padding: 15px 0 15px 15px;
  display: inline-block;
  margin-right: 11px;
}
.swiper-pagination-skeleton {
  height: 29px;
  width: 818px;
  margin-top: 5px;
}

.speaker-container-box-skeleton {
  display: flex;
  justify-content: space-between;
  width: 833px;
}
.speaker-container-skeleton {
  width: 409px;
  height: 200px;
  border-radius: 10px;
}
.mid-box-right-skeleton {
  height: 100%;
  width: 350px;
  height: 100%;
}
.el-card__body-skeleton {
  width: 334px;
  border-radius: 10px;
  margin-bottom: 30px;
  border: 2px solid #eee;
  min-height: 100px;
}
.el-card__body__header-skeleton {
  height: 51px;
  width: 100%;
}
.lesson-skeleton {
  padding: 20px;
}
.el-card__body_lesson-skeleton {
  width: 100%;
  height: 45px;
  margin-bottom: 20px;
}
.progress-title-skeleton {
  margin: 20px;
  height: 72px;
}
.btn-skeleton {
  height: 44px;
  width: 334px;
  margin: 0 auto;
}
.group-suggest-aside__card-skeleton {
  margin: 20px;
  height: 100px;
}
.lesson-banner-skeleton {
  width: 334px;
  height: 128.1px;
  padding: 20px 0 25px 20px;
  margin-bottom: 30px;
  border-radius: 10px;
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, onMounted } from 'vue';
import { useInit } from '@/services/shared/utils';
import {
  finishLesson,
  getDetailCourse,
  getDetailLesson,
  getListQuestion,
  getListTopic,
  getUserLesson,
} from '@/services/features/elearning/elearning.service';
import PropskillSideTopicTabComponent from '@/components/features/elearning/PropskillSideTopicTabComponent.vue';
import PropskillTopicComponent from '@/components/features/elearning/PropskillTopicComponent.vue';
import { FreeTypeEnum, ProgressCourseEnum, StatusPaymentEnum } from '@/services/shared/enum';
import { AppConstant } from '@/app.constant';
import { array, boolean } from 'yup/lib/locale';

class PropskillDetailCoursePageData {
  isLoading: boolean;
  lessonId: string;
  topics: any[];
  activeTab: any;
  topicActive: any;
  breadcrumb: any;
  needDoExam: boolean;
  hasExam: boolean;
  passAllTopic: boolean;
  lesson: any;
  lastTopic: boolean;
}

export default defineComponent({
  name: 'PropskillProgessLessonPage',
  components: { PropskillSideTopicTabComponent, PropskillTopicComponent },
  setup() {
    // Setup Default
    const { base } = useInit();
    const data = reactive<PropskillDetailCoursePageData>({
      isLoading: false,
      lessonId: base.route.params.id as string,
      topics: [],
      activeTab: null,
      topicActive: null,
      lastTopic: false,
      breadcrumb:
        base.route.meta?.breadcrumb && Array.isArray(base.route.meta?.breadcrumb) ? base.route.meta?.breadcrumb : [],
      needDoExam: false,
      hasExam: false,
      passAllTopic: false,
      lesson: null,
    });

    const checkPassAndExam = () => {
      let check = true;
      data.topics.map((doc) => {
        if (!doc.isPassed) {
          check = false;
        }
      });
      data.passAllTopic = check;
    };

    const disableTopic = () => {
      data.topics.map((doc) => (doc.disabled = false));
      for (let i = 0; i < data.topics.length; i++) {
        if (!data.topics[i].isPassed) {
          for (let j = i + 1; j < data.topics.length; j++) {
            data.topics[j].disabled = true;
          }
          break;
        }
      }
    };

    const checkLastTopic = () => {
      data.lastTopic = data.topics.findIndex((doc) => doc.id === data.topicActive.id) === data.topics.length - 1;
    };

    const loadListTopic = async (topicId = '') => {
      // Get course Online
      data.isLoading = true;
      try {
        const responseTopic = await getListTopic(data.lessonId);
        data.topics = responseTopic?.result.topics || [];
        disableTopic();
        if (data.topics.length > 0) {
          if (data.activeTab) {
            data.topics.map((doc) => {
              if (doc.id === data.activeTab && !doc.disabled) {
                data.topicActive = doc;
              }
            });
          }
          if (!data.topicActive || !data.activeTab) {
            for (let i = 0; i < data.topics.length; i++) {
              if (i < data.topics.length - 1) {
                if (!data.topics[i].isPassed) {
                  data.activeTab = data.topics[i].id;
                  data.topicActive = data.topics[i];
                  break;
                }
              } else {
                data.activeTab = data.topics[i].id;
                data.topicActive = data.topics[i];
              }
            }
          }
          checkLastTopic();
        }
      } finally {
        setTimeout(() => {
          data.isLoading = false;
        }, 300);
      }
    };
    const loadDetailLesson = async () => {
      // Get course Online
      data.isLoading = true;
      try {
        const responseLesson = await getDetailLesson(data.lessonId);
        if (Array.isArray(data.breadcrumb)) {
          const newBreadcrumb = [data.breadcrumb[0], data.breadcrumb[1]];
          newBreadcrumb.push({
            text: responseLesson?.result?.course?.name || 'Khóa học',
            routeName: 'propskill-detail-course',
            params: { id: responseLesson?.result?.course?.id },
          });
          newBreadcrumb.push({
            text: responseLesson?.result?.name,
            routeName: 'propskill-progess-lesson',
            params: { id: responseLesson?.result?.course?.id },
          });
          data.breadcrumb = [...newBreadcrumb];
        }
        data.lesson = responseLesson?.result;
      } finally {
        setTimeout(() => {
          data.isLoading = false;
        }, 300);
      }
    };

    const loadUserLesson = async () => {
      // Get course Online
      data.isLoading = true;
      try {
        const responseUserLesson = await getUserLesson(data.lessonId);
        if (data.needDoExam && responseUserLesson?.result?.lesson?.isPassed) {
          data.needDoExam = false;
        }
      } finally {
        setTimeout(() => {
          data.isLoading = false;
        }, 300);
      }
    };

    const loadQuestion = async () => {
      // Get course Online
      data.isLoading = true;
      try {
        const responeQuestion = await getListQuestion(data.lessonId);
        if (responeQuestion?.result && responeQuestion?.result.length > 0) {
          data.needDoExam = true;
          data.hasExam = true;
        }
      } finally {
        setTimeout(() => {
          data.isLoading = false;
        }, 300);
      }
    };

    const checkPaid = async () => {
      const responseCourse = await getDetailCourse(data.lesson?.course?.id);
      if (
        responseCourse?.result?.typeFree !== FreeTypeEnum.FREE &&
        responseCourse?.result?.statusPayment !== StatusPaymentEnum.PAID
      ) {
        base.router.push({
          name: 'propskill-detail-course',
          params: { id: data.lesson?.course?.id },
          query: { needPayment: 'payment' },
        });
      }
    };

    const initPage = async () => {
      data.isLoading = true;
      await Promise.all([loadListTopic(), loadDetailLesson(), loadQuestion()]);
      loadUserLesson();
      checkPassAndExam();
      checkPaid();
    };

    const switchTopicTab = (activeTab: string) => {
      if (data.activeTab === activeTab) {
        return;
      }
      data.activeTab = activeTab;
      data.topicActive = data.topics.find((doc) => doc.id === data.activeTab);
      checkLastTopic();
    };

    const goToApp = () => {
      if (navigator.userAgent.toLowerCase().indexOf('android') > -1 && AppConstant.URL_PLAY_STORE) {
        window.location.href = AppConstant.URL_PLAY_STORE;
      }
      if (navigator.userAgent.toLowerCase().indexOf('iphone') > -1 && AppConstant.URL_APP_STORE) {
        window.location.href = AppConstant.URL_APP_STORE;
      }
    };

    const nextTopic = async (topicId: string) => {
      const indexTopic = data.topics.findIndex((doc) => doc.id === topicId);
      const arrsNotPass: any[] = [];
      data.topics.map((doc, index) => {
        if (!doc.isPassed && doc.id !== topicId) {
          arrsNotPass.push(index);
        }
      });
      if (arrsNotPass.length > 0) {
        let indexNotPass = arrsNotPass.find((doc) => doc > indexTopic);
        if (!indexNotPass) {
          indexNotPass = arrsNotPass[0];
        }
        data.topicActive = data.topics[indexNotPass];
        data.activeTab = data.topicActive.id;
        checkLastTopic();
      } else {
        if (indexTopic < data.topics.length - 1) {
          data.topicActive = data.topics[indexTopic + 1];
          data.activeTab = data.topicActive.id;
        }
        data.passAllTopic = true;
      }
      checkLastTopic();
    };

    const finishTopic = async (topicId: string) => {
      data.topics.map((doc) => {
        if (doc.id === topicId) {
          doc.isPassed = true;
          data.topicActive = { ...doc };
        }
      });
      disableTopic();
      data.topics = [...data.topics];
      checkPassAndExam();
      if (data.passAllTopic) {
        await finishLesson({
          lessonId: data.lessonId,
          time: 1,
          correctQuestions: [],
        });
      }
      loadUserLesson();
    };
    // Life cycle event
    onMounted(async () => {
      if (base.route.query && base.route.query.topicId && typeof base.route.query.topicId === 'string') {
        data.activeTab = base.route.query.topicId;
      }
      await initPage();
    });
    return { data, ProgressCourseEnum, switchTopicTab, goToApp, nextTopic, finishTopic };
  },
});
</script>
