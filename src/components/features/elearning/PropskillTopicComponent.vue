<template>
  <div v-if="data.isLoading">
    <div class="propskill-home-container-skeleton">
      <div class="mid-box-left-skeleton">
        <div class="el-card__body-skeleton_refer">
          <div class="header-title-skeleton">
            <div class="header-title-text-skeleton"></div>
          </div>
          <div class="progress-title-skeleton"></div>
          <div class="progress-title-skeleton"></div>
        </div>
        <div class="btn-skeleton"></div>
      </div>
    </div>
  </div>
  <div v-else class="topic-component">
    <el-card class="box-content-card" shadow="never">
      <template #header>
        <div class="header">
          <span class="header-title">{{ data.modelValue?.name }}</span>
          <span class="time">
            <img class="time-icon" src="@/assets/images/time-topic-icon.png" /><span class="minute"
              >{{ data.modelValue?.time }} phút</span
            >
          </span>
        </div>
      </template>
      <div
        class="video"
        v-if="
          data.modelValue.videoType === PostMediaTypeEnum.VIDEO_FILE ||
          data.modelValue.videoType === PostMediaTypeEnum.VIDEO
        "
      >
        <PropskillVideoComponent :dataSource="data.modelValue" class="app-hover-effect" />
      </div>
      <div class="video" v-if="data.modelValue.videoType === PostMediaTypeEnum.YOUTUBE">
        <PropskillVideoComponent :dataSource="data.modelValue" class="app-hover-effect" />
      </div>
      <div class="container-content" v-html="data.modelValue?.description"></div>
    </el-card>
    <el-card class="box-document-card" shadow="never" v-if="data.modelValue?.attachments?.length > 0">
      <template #header>
        <span class="header-title">Tài liệu tham khảo</span>
      </template>
      <div class="document-container">
        <div
          class="document-item"
          v-for="(item, index) in data.modelValue?.attachments"
          :key="index"
          :virtualIndex="index"
        >
          <el-row class="row-document" @click="viewDocument(item.absoluteUrl)">
            <el-col :span="2">
              <div class="document-icon-contain">
                <img :src="getIconAttachment(item.name)" class="document-icon" />
              </div>
            </el-col>
            <el-col :span="22">
              <div class="document-info">
                <div class="document-title">
                  <span>{{ item.name }}</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-card>
    <div class="success-topic" v-if="data.modelValue?.isPassed">
      <span>Hoàn thành</span>
      <img src="@/assets/icons/colorful/done-icon.png" alt="form-error" />
    </div>
    <div class="btn-join action-topic" v-if="data.modelValue?.hasPractice">
      <button @click="doHomeWork" v-if="!data.modelValue?.isPassed">Làm bài tập</button>
      <button @click="doHomeWork" class="review-again" v-if="data.modelValue?.isPassed">Ôn tập lại</button>
      <button @click="nextTopic" v-if="data.modelValue?.isPassed && (!data.passAllTopic || !data.lastTopic)">
        Chủ đề tiếp theo
      </button>
      <button @click="nextLesson" v-if="data.passAllTopic && !data.hasExam && data.lastTopic">Bài học tiếp theo</button>
      <button @click="doExam" v-if="data.passAllTopic && data.hasExam && data.lastTopic">Làm bài thi</button>
    </div>
    <div class="btn-join action-topic" v-else>
      <button v-if="!data.modelValue?.isPassed" @click="doneTopic">Đánh dấu đã học</button>
      <button @click="nextTopic" v-if="data.modelValue?.isPassed && (!data.passAllTopic || !data.lastTopic)">
        Chủ đề tiếp theo
      </button>
      <button @click="nextLesson" v-if="data.passAllTopic && !data.hasExam && data.lastTopic">Bài học tiếp theo</button>
      <button @click="doExam" v-if="data.passAllTopic && data.hasExam && data.lastTopic">Làm bài thi</button>
    </div>
  </div>
  <el-dialog v-model="data.dialogDownload" width="833px" custom-class="app-dialog">
    <template #title>
      <span class="app-dialog-title">Tải APP để làm bài {{ data.type === TypeDialog.HOMEWORK ? 'tập' : 'thi' }}</span>
    </template>
    <div class="app-dialog-content">
      <div class="direction-app">
        <img
          class="img-fluid"
          alt="img"
          src="https://propcom.vn/wp-content/uploads/2021/12/Image-Pasted-at-2021-12-14-11-58.jpg"
        />
        <div class="link-group">
          <a
            target="_blank"
            href="https://apps.apple.com/vn/app/propcom-c%E1%BB%99ng-%C4%91%E1%BB%93ng-m%C3%B4i-gi%E1%BB%9Bi/id1551955496?l=vi"
          >
            <img src="@/assets/images/appstore-icon.png" alt="img" class="img-app" />
          </a>
          <a class="chplay-link" target="_blank" href="https://play.google.com/store/apps/details?id=vn.propcom.app">
            <img src="@/assets/images/chplay-icon.png" alt="img" class="img-app" />
          </a>
        </div>
      </div>
      <div>
        Hiện chúng tôi chưa cập nhật tính năng làm bài {{ data.type === TypeDialog.HOMEWORK ? 'tập' : 'thi' }} trên web.
      </div>
      <div>Vui lòng tải app ngay để làm bài {{ data.type === TypeDialog.HOMEWORK ? 'tập' : 'thi' }}.</div>
    </div>
    <div class="app-dialog-content__actions">
      <button type="submit" class="app-btn app-btn-primary" @click="closeDialog">OK</button>
    </div>
  </el-dialog>
  <el-dialog @close="closeDialogSuccess" v-model="data.dialogSuccessCourse" width="833px" custom-class="app-dialog">
    <template #title>
      <span class="app-dialog-title">Hoàn thành khóa học</span>
    </template>
    <div class="app-dialog-content">
      <div class="direction-app">
        <img class="img-success-course" alt="img" src="@/assets/images/success-course.png" />
      </div>
      <div>Chúc mừng bạn đã hoàn thành khóa học.</div>
    </div>
    <div class="app-dialog-content__actions">
      <button type="submit" class="app-btn app-btn-primary" @click="closeDialogSuccess">OK</button>
    </div>
  </el-dialog>
  <PropskillViewDocumentComponent @onCloseDialog="onCloseDialog" :dialogView="data.dialogView" :url="data.url" />
</template>

<style lang="scss" scoped>
.video {
  margin: 0 auto 20px auto;
  width: 778px;
  height: 500px;
  //padding: 20px;
}
.document-container {
  display: grid;
  gap: 10px;
}
.document-icon-contain {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 63px;
  height: 63px;
  background: #ffffff;
  border: 1px solid #ececec;
  border-radius: 10px;
}
.document-item {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.document-icon {
  width: 22px;
  height: 29px;
}
.document-info {
  padding-left: 15px;
  height: 100%;
  display: flex;
  align-items: center;
}
.row-document {
  width: 100%;
  cursor: pointer;
}
.document-title {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  word-wrap: break-word;
}
.document-title a {
  text-decoration: none;
  color: #0f0f0f;
  word-wrap: break-word;
}
.document-cap {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  color: #5a5a5a;
}
.topic-component {
  display: grid;
  gap: 20px;
  width: 833px;
}
.box-content-card,
.box-document-card {
  width: 100%;
  border-radius: 10px;
}
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

::v-deep .container-content img {
  max-width: 778px;
  display: block;
  margin: 0 auto;
  border-radius: 10px;
}

.header-title {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 130%;
  color: #5a5a5a;
  width: 85%;
}
.time {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  gap: 8px;
  background: #fafafa;
  border-radius: 100px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18.2px;
  color: #a7a7a7;
  margin-right: 13px;
  height: 30px;
}
.content-container {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: #0f0f0f;
}
.btn-join {
  display: flex;
  justify-content: center;
}
.btn-join button {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 110%;
  text-align: center;
  text-transform: uppercase;
  padding: 16px 60px 14px;
  gap: 10px;
  width: 334px;
  height: 44px;
  border: none;
  background: #dd0000;
  border-radius: 5px;
  color: white;
  margin-bottom: 61px;
  &:hover {
    background: #ad0000;
  }
}
.img-fluid {
  width: 114.82px;
  height: 114.82px;
  padding-bottom: 11px;
}
.img-success-course {
  width: 272.61px;
  height: 216.13px;
  padding-bottom: 11px;
}
.img-app {
  width: 113.9px;
  height: 33px;
}
.chplay-link {
  padding-left: 11px;
}
.link-group {
  padding-bottom: 20px;
}
.action-topic button {
  margin: 0 10px;
}
.success-topic {
  color: #04c35c !important;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 110%;
  text-align: center;
  text-transform: uppercase;
  padding: 0px 60px 0px;
  gap: 10px;
}

.success-topic img {
  width: 13.29px;
  height: 9.96px;
  margin-top: 1.02px;
}

.finish-topic {
  background: #f2f2f2 !important;
  color: #0f0f0f !important;
}
.minute {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  color: #a7a7a7;
}
.time-icon {
  width: 13px;
  height: 12px;
}
.review-again {
  background: #f2f2f2 !important;
  color: #0f0f0f !important;
  &:hover {
    background: #dedede !important;
  }
}
.card__body-skeleton {
  border-radius: 10px;
  height: 444px;
  margin-bottom: 15px;
  margin-right: 19px;
  border: 2px solid #eee;
  padding: 20px;
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
  padding: 0px 0px 50px 0px;
  display: flex;
  justify-content: space-between;
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
.el-card__body-skeleton_refer {
  width: 814px;
  height: 338px;
  border-radius: 10px;
  margin-bottom: 30px;
  border: 2px solid #eee;
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
  margin: 20px auto;
  border-radius: 10px;
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
import { defineComponent, onMounted, reactive, watch, ref } from 'vue';
import { useInit } from '@/services/shared/utils';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { Constant } from '@/services/shared/constant';
import { MediaTypeEnum } from '@/services/shared/enum';
import { finishTopic, finishLesson, getNextLesson } from '@/services/features/elearning/elearning.service';
import { PostMediaTypeEnum } from '@/services/features/group/group.model';
import PropskillVideoComponent from '@/components/features/elearning/PropskillVideoComponent.vue';
import PropskillViewDocumentComponent from '@/components/features/elearning/PropskillViewDocumentComponent.vue';
import { boolean } from 'yup/lib/locale';
SwiperCore.use([Navigation, Autoplay]);
// Định nghĩa data type của component [data] bằng Typescript

enum TypeDialog {
  EXAM = 'EXAM',
  HOMEWORK = 'HOMEWORK',
}
class PropskillTopicComponentData {
  isLoading: boolean;
  modelValue: any;
  dialogDownload: boolean;
  dialogSuccessCourse: boolean;
  needDoExam: boolean;
  hasExam: boolean;
  passAllTopic: boolean;
  lastTopic: boolean;
  type: TypeDialog;
  lesson: any;
  dialogView: boolean;
  url: string;
}

// Định nghĩa data type của component [props] bằng Typescript
class PropskillTopicComponentProps {
  modelValue: any;
  needDoExam: boolean;
  hasExam: boolean;
  passAllTopic: boolean;
  lastTopic: boolean;
  lesson: any;
  isLoading: boolean;
}

export default defineComponent({
  name: 'PropskillTopicComponent',
  components: { PropskillVideoComponent, PropskillViewDocumentComponent },
  props: {
    isLoading: {
      type: Boolean,
      default: null,
    },
    modelValue: {
      type: Object,
      default: null,
    },
    needDoExam: {
      type: Boolean,
      default: null,
    },
    hasExam: {
      type: Boolean,
      default: null,
    },
    passAllTopic: {
      type: Boolean,
      default: null,
    },
    lastTopic: {
      type: Boolean,
      default: null,
    },
    lesson: {
      type: Object,
      default: null,
    },
  },
  emits: ['nextTopic', 'finishTopic'],
  setup(props: PropskillTopicComponentProps, { emit }: any) {
    // Setup Default
    const { base, userId } = useInit();
    // Component reactive data
    const data = reactive<PropskillTopicComponentData>({
      isLoading: props.isLoading, // boolean
      modelValue: { ...props.modelValue },
      dialogDownload: false,
      dialogSuccessCourse: false,
      type: TypeDialog.EXAM,
      needDoExam: props.needDoExam,
      hasExam: props.hasExam,
      passAllTopic: props.passAllTopic,
      lastTopic: props.lastTopic,
      lesson: props.lesson,
      dialogView: false,
      url: '',
    });
    const getIconAttachment = (icon: string) => {
      const arrs = icon.split('.');
      const str = arrs[arrs.length - 1];
      let iconUrl = Constant.DOCUMENT.find((doc) => doc.key === 'FILE_DOC')?.icon;
      for (let i = 0; i < Constant.DOCUMENT.length; i++) {
        if (Constant.DOCUMENT[i].type?.includes(str)) {
          iconUrl = Constant.DOCUMENT[i].icon;
          break;
        }
      }
      return iconUrl;
    };
    watch(
      () => [
        props.modelValue,
        props.needDoExam,
        props.passAllTopic,
        props.lesson,
        props.lastTopic,
        props.hasExam,
        props.isLoading,
      ],
      (newValue, oldValue) => {
        data.modelValue = newValue[0];
        data.needDoExam = newValue[1];
        data.passAllTopic = newValue[2];
        data.lesson = newValue[3];
        data.lastTopic = newValue[4];
        data.hasExam = newValue[5];
        data.isLoading = newValue[6];
      }
    );

    const doneTopic = async () => {
      await finishTopic({
        topicId: data.modelValue.id,
        lessonId: data.modelValue.lessonId,
        time: 1,
      });
      emit('finishTopic', data.modelValue.id);
    };

    const nextTopic = async () => {
      emit('nextTopic', data.modelValue.id);
    };
    const nextLesson = async () => {
      data.isLoading = true;
      try {
        const responeNextLesson = await getNextLesson(data.lesson?.course?.id, { level: data.lesson.level });
        if (
          responeNextLesson?.result &&
          responeNextLesson?.result?.id &&
          responeNextLesson?.result?.id != data.lesson.id
        ) {
          base.router.push({
            name: 'propskill-progess-topic',
            params: { id: responeNextLesson?.result?.id },
          });
        } else if (responeNextLesson?.result && responeNextLesson?.result?.id) {
          base.router.push({
            name: 'propskill-progess-lesson',
            params: { id: data.lesson?.course?.id },
          });
        } else {
          data.dialogSuccessCourse = true;
        }
      } finally {
        setTimeout(() => {
          data.isLoading = false;
        }, 500);
      }
    };
    const doExam = () => {
      base.router.push({
        name: 'propskill-do-exam',
        params: { id: data.lesson?.id },
      });
    };
    const doHomeWork = () => {
      base.router.push({
        name: 'propskill-do-home-work',
        params: { id: data.lesson?.id },
        query: { topicId: data.modelValue?.id },
      });
    };
    const closeDialog = () => {
      data.dialogDownload = false;
    };
    const closeDialogSuccess = () => {
      data.dialogSuccessCourse = false;
      base.router.push({
        name: 'propskill-detail-course',
        params: { id: data.lesson?.course?.id },
      });
    };

    const onCloseDialog = () => {
      data.dialogView = false;
      data.url = '';
    };
    const viewDocument = (url: string) => {
      data.dialogView = true;
      data.url = url;
    };
    return {
      // Component reactive data
      data,
      Constant,
      MediaTypeEnum,
      PostMediaTypeEnum,
      getIconAttachment,
      doneTopic,
      nextTopic,
      closeDialog,
      TypeDialog,
      nextLesson,
      closeDialogSuccess,
      doExam,
      doHomeWork,
      onCloseDialog,
      viewDocument,
    };
  },
});
</script>
