<template>
  <div v-if="isLoading">
    <div class="mid-box-left-skeleton">
      <div class="card-body-skeleton">
        <div class="title-skeleton"></div>
        <div class="course-skeleton"></div>
        <div class="course-skeleton"></div>
        <div class="course-skeleton"></div>
        <div class="course-skeleton"></div>
        <div class="course-skeleton"></div>
        <div class="course-skeleton"></div>
        <div class="course-skeleton"></div>
      </div>
      <div class="btn-skeleton"></div>
    </div>
  </div>
  <div class="lesson-component" v-if="!isLoading && modelValue.length">
    <el-card class="box-lesson" shadow="never">
      <el-row>
        <el-col :span="18"
          ><div class="title">
            {{ data.lessonActive?.name }}
          </div></el-col
        >
        <el-col :span="6">
          <div class="success-topic" v-if="data.lessonActive?.isPassed">
            Hoàn thành bài học
            <img src="@/assets/icons/colorful/done-icon.png" alt="form-error" />
          </div>
        </el-col>
      </el-row>

      <div class="description" v-if="data.lessonActive?.description.length">
        <p>{{ data.lessonActive?.description }}</p>
      </div>
      <div class="list">
        <template v-for="(item, index) in modelValue" :key="index" :virtualIndex="index">
          <div
            class="list-item"
            :class="{ disabled: item.disabled }"
            @click="goToTopicActive(item.disabled ? null : item.id)"
          >
            <img class="topic-icon" :src="loadIconTopic(item)" />
            <span class="topic-content">
              <span class="title-topic">
                <span class="topic-head">Chủ đề {{ index + 1 }}:</span>
                <span class="topic-name">{{ item.name }}</span>
              </span>
              <div class="topic-time">{{ item.time }} phút</div>
            </span>
          </div>
        </template>
      </div>
    </el-card>
    <div class="btn-join">
      <button @click="goToTopic()" v-if="!data.doExam && !data.lessonActive?.isPassed">Vào học</button>
      <button @click="goTodoExam()" v-if="data.doExam && !data.lessonActive?.isPassed">Làm bài thi</button>
      <button @click="nextLesson()" v-if="data.lessonActive?.isPassed">Bài học tiếp theo</button>
    </div>
  </div>
  <template v-if="!isLoading && !modelValue.length">
    <AppEmptyComponent class="empty" title="Bài học đang được cập nhật">
      <img src="@/assets/images/status-empty.png" />
    </AppEmptyComponent>
  </template>
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
</template>

<style lang="scss" scoped>
.lesson-component {
  display: grid;
  gap: 20px;
}
.box-lesson {
  border-radius: 10px;
}
.title,
.description {
  font-family: 'Roboto';
  font-style: normal;
  color: #0f0f0f;
  padding-bottom: 20px;
  white-space: pre-line;
}
.title {
  font-weight: 700;
  font-size: 28px;
  line-height: 110%;
  padding-top: 20px;
}
.description {
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
}
.lesson-tag {
  cursor: pointer;
}
::v-deep .el-card__header {
  background: #dd0000;
  border-radius: 10px 10px 0px 0px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 110%;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;
}
.box-card {
  width: 334px;
  height: 295px;
  border-radius: 10px;
}
.lesson-icon {
  width: 24px;
  height: 24px;
}
.topic-icon {
  width: 25px;
  height: 25px;
  margin-top: 3px;
}
.title-side {
  padding-left: 16px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 130%;
  color: #0f0f0f;
}
.card-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 20px 10px 10px;
  gap: 13px;
  border-radius: 5px;
}
.topic {
  display: flex;
}
.topic-link {
  text-decoration: none;
}
.topic-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.topic-head {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 130%;
  color: #0f0f0f;
}
.topic-name {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  color: #5a5a5a;
  padding-left: 5px;
}
.topic-time {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 130%;
  color: #a7a7a7;
  display: flex;
  align-items: center;
  width: 10%;
}
.title-topic {
  width: 90%;
}
.list {
  display: grid;
  gap: 12px;
}
.list-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px;
  padding-right: 0;
  gap: 8px;
  width: 100%;
  min-height: 55px;
  background: #fafafa;
  border-radius: 10px;
  cursor: pointer;
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
.empty {
  background: #ffffff;
  border: 1px solid #f2f2f2;
  margin: 0 auto;
  width: 850px;
}
.empty img {
  width: 301px;
  height: 164px;
}
.list-item.disabled {
  opacity: 0.3;
  cursor: auto;
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
  padding-top: 20px;
  padding-bottom: 20px;
  gap: 10px;
}
.success-topic img {
  width: 13.29px;
  height: 9.96px;
  margin-top: 1.02px;
}
.img-success-course {
  width: 272.61px;
  height: 216.13px;
  padding-bottom: 11px;
}

//skeleton
.btn-skeleton {
  height: 44px;
  width: 334px;
  margin: 0 auto;
}
.mid-box-left-skeleton {
  height: 100%;
  width: 833px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.card-body-skeleton {
  border-radius: 10px;
  height: 644px;
  margin-bottom: 15px;
  margin-right: 19px;
  border: 2px solid #eee;
  padding: 20px;
}
.title-skeleton {
  margin: 20px 0;
  height: 70px;
  width: 30%;
  color: transparent;
  appearance: none;
  -webkit-appearance: none;
  background-color: #eee;
  border-color: #eee;
}
.course-skeleton {
  height: 58px;
  width: 100%;
  padding: 15px 0 15px 15px;
  display: inline-block;
  margin-right: 11px;
  border-radius: 10px;
}
</style>

<script lang="ts">
import { defineComponent, onMounted, reactive, watch, ref } from 'vue';
import { useInit } from '@/services/shared/utils';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { Constant } from '@/services/shared/constant';
import { LessonModel, TopicModel } from '@/services/features/elearning/elearning.model';
import { MediaTypeEnum } from '@/services/shared/enum';
import { getNextLesson } from '@/services/features/elearning/elearning.service';
SwiperCore.use([Navigation, Autoplay]);
// Định nghĩa data type của component [data] bằng Typescript
class PropskillLessonComponentData {
  isLoading: boolean;
  modelValue: TopicModel[];
  lessonActive: LessonModel;
  doExam: boolean;
  dialogSuccessCourse: boolean;
}

// Định nghĩa data type của component [props] bằng Typescript
class PropskillLessonComponentProps {
  modelValue: any;
  lessonActive: LessonModel;
  doExam: boolean;
  isLoading: boolean;
}

export default defineComponent({
  name: 'PropskillLessonComponent',
  props: {
    modelValue: {
      type: Array,
      default: null,
    },
    lessonActive: {
      type: LessonModel,
      default: null,
    },
    doExam: {
      default: null,
      type: Boolean,
    },
    isLoading: {
      default: null,
      type: Boolean,
    },
  },
  setup(props: PropskillLessonComponentProps) {
    // Setup Default
    const { base, userId } = useInit();
    // Component reactive data
    const data = reactive<PropskillLessonComponentData>({
      isLoading: props.isLoading, // boolean
      modelValue: props.modelValue,
      lessonActive: props.lessonActive,
      doExam: props.doExam,
      dialogSuccessCourse: false,
    });

    watch(
      () => [props.modelValue, props.lessonActive, props.doExam, props.isLoading],
      (newValue, oldValue) => {
        data.modelValue = newValue[0];
        data.lessonActive = newValue[1];
        data.doExam = newValue[2];
        data.isLoading = newValue[3];
      }
    );

    const loadIconTopic = (item: any) => {
      let icon: any;
      if (item.isPassed === true) {
        icon = Constant.SIDE_TAB[1].complete;
      } else {
        icon = item.videoUrl && item.videoUrl != null ? Constant.SIDE_TAB[1].video : Constant.SIDE_TAB[1].text;
      }
      return icon;
    };

    const goToTopic = async () => {
      base.router.push({ name: 'propskill-progess-topic', params: { id: data.lessonActive.id } });
    };
    const goToTopicActive = async (topicId: string) => {
      if (!topicId) {
        return;
      }
      base.router.push({ name: 'propskill-progess-topic', params: { id: data.lessonActive.id }, query: { topicId } });
    };
    const goTodoExam = () => {
      base.router.push({
        name: 'propskill-do-exam',
        params: { id: data.lessonActive.id },
      });
    };
    const nextLesson = async () => {
      data.isLoading = true;
      try {
        const responeNextLesson = await getNextLesson(data.lessonActive?.course?.id, {
          level: data.lessonActive.level,
        });
        if (
          responeNextLesson?.result &&
          responeNextLesson?.result?.id &&
          responeNextLesson?.result?.id != data.lessonActive.id
        ) {
          base.router.push({
            name: 'propskill-progess-topic',
            params: { id: responeNextLesson?.result?.id },
          });
        } else if (responeNextLesson?.result && responeNextLesson?.result?.id) {
          base.router.push({
            name: 'propskill-progess-lesson',
            params: { id: data.lessonActive?.course?.id },
          });
        } else {
          data.dialogSuccessCourse = true;
        }
      } finally {
        data.isLoading = false;
      }
    };
    const closeDialogSuccess = () => {
      data.dialogSuccessCourse = false;
      base.router.push({
        name: 'propskill-detail-course',
        params: { id: data.lessonActive?.course?.id },
      });
    };
    return {
      // Component reactive data
      data,
      Constant,
      MediaTypeEnum,
      loadIconTopic,
      goToTopic,
      goTodoExam,
      goToTopicActive,
      nextLesson,
      closeDialogSuccess,
    };
  },
});
</script>
