<template>
  <div v-if="isLoading">
    <div class="propskill-detail-course-container-skeleton">
      <div class="mid-box-skeleton">
        <div class="mid-box-left-skeleton">
          <div class="section-lesson-skeleton"></div>
          <div class="btn-certificate-skeleton"></div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="course-detail">
    <div v-if="modelValueCourse?.typeStudy === StudyTypeEnum.OFFLINE" class="course-off">
      <div class="name-detail">Thông tin khoá học</div>
      <div class="course-info">
        <div class="course-content">
          <img src="@/assets/images/calendar-icon.png" />
          <div class="info-off">Khai giảng ngày {{ formatDate(modelValueCourse?.timeOpening) }}</div>
        </div>
        <div class="course-content">
          <img src="@/assets/images/placeholder-icon.png" />

          <div class="info-off">{{ modelValueCourse?.addressOpening }}</div>
        </div>
        <div class="course-content" v-if="modelValueCourse?.amountCash">
          <img src="@/assets/images/fee-icon.png" />

          <div class="info-off price-dollar">
            {{ convertNumberToWord(modelValueCourse?.amountCash) }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="section"
      v-if="
        modelValueCourse?.detailIntroduction ||
        (modelValueCourse?.introVideo && modelValueCourse?.introVideo?.videoType)
      "
    >
      <div class="name-detail">Giới thiệu về khoá học</div>
      <div
        v-if="modelValueCourse?.detailIntroduction"
        class="description-course"
        v-html="modelValueCourse?.detailIntroduction"
      ></div>
      <div
        class="video"
        v-if="
          (modelValueCourse?.introVideo && modelValueCourse?.introVideo?.videoType === PostMediaTypeEnum.VIDEO_FILE) ||
          modelValueCourse?.introVideo?.videoType === PostMediaTypeEnum.VIDEO
        "
      >
        <PropskillVideoComponent :dataSource="modelValueCourse?.introVideo" class="app-hover-effect" />
      </div>
      <div
        class="video"
        v-if="modelValueCourse?.introVideo && modelValueCourse?.introVideo?.videoType === PostMediaTypeEnum.YOUTUBE"
      >
        <PropskillVideoComponent :dataSource="modelValueCourse?.introVideo" class="app-hover-effect" />
      </div>
    </div>
    <div class="section section-lesson" v-if="modelValueCourse?.lessons.length">
      <div class="name-detail">Bạn sẽ học được gì</div>
      <div class="course-study" v-for="(item, index) in modelValueCourse.lessons" :key="index" :virtualIndex="index">
        <div class="icon-book"><img src="~@/assets/images/studying-profile-icon.png" /></div>
        <div>
          <div class="name-study">Bài học {{ index + 1 }}: {{ item.name }}</div>
          <div class="description-study">
            {{ item.description }}
          </div>
        </div>
      </div>
    </div>
    <div class="section" v-if="modelValueCourse?.target.length">
      <div class="name-detail">Kỹ năng bạn đạt được</div>
      <div class="skills">
        <div class="skill" v-for="(item, index) in modelValueCourse.target" :key="index" :virtualIndex="index">
          {{ item }}
        </div>
      </div>
    </div>
    <div class="section" v-if="modelValueCourse?.certificateFiles[0]?.absoluteUrl.length">
      <div class="name-detail">Nhận chứng chỉ</div>
      <el-row class="img-certificate">
        <el-col :span="8" :offset="8">
          <div text @click="centerDialogVisible = true">
            <img :src="modelValueCourse?.certificateFiles[0]?.absoluteUrl" alt="image" />
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div text v-if="modelValueCourse?.descriptionCertificate" class="des-certificate">
            {{ modelValueCourse?.descriptionCertificate }}
          </div>
        </el-col>
      </el-row>
    </div>
    <div v-if="modelValueCourse?.instructors">
      <el-row>
        <el-col :span="24">
          <swiper :slides-per-view="1" :space-between="0" :loop="false" :autoplay="{ delay: 5000 }">
            <swiper-slide
              class="section"
              v-for="(item, index) in modelValueCourse?.instructors"
              :key="index"
              :virtualIndex="index"
            >
              <div class="name-detail">Diễn giả</div>
              <div class="info-detail">
                <div class="img-people" @click="showDetailIntructor(item?.userInfo)">
                  <img v-if="item?.userInfo?.avatarUrl?.length" :src="item?.userInfo?.avatarUrl" alt="image" />
                  <img v-else src="~@/assets/images/avatar-default-propskill.png" />
                </div>
                <div class="info-name">
                  <div>
                    <div class="full-name">{{ item?.userInfo.name }}</div>
                    <div class="position">{{ item?.userInfo.role.name }}</div>
                  </div>
                  <div class="info-des">
                    <div class="info-number">
                      <div
                        class="number-detail"
                        @click="goToSpeakerDetail(item?.id)"
                        v-if="item?.coursesParticipated.length"
                      >
                        <img src="~@/assets/images/studying-profile-icon.png" class="book-icon" />
                        <span>
                          {{ item?.coursesParticipated.length }}
                          khóa học
                        </span>
                      </div>
                      <div class="number-detail" @click="showPopupUserLearn(item?.id)" v-if="item?.countLearners">
                        <img src="~@/assets/images/user-fill.png" class="user-icon" />{{ item?.countLearners }} người
                        học
                      </div>
                    </div>
                    <div>
                      <button class="btn-detail" @click="goToSpeakerDetail(item?.id)">CHI TIẾT</button>
                    </div>
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </el-col>
      </el-row>
    </div>
    <template
      v-if="
        !modelValueCourse?.instructors.length &&
        !modelValueCourse?.certificateFiles[0]?.absoluteUrl.length &&
        !modelValueCourse?.target.length &&
        !modelValueCourse?.lessons.length &&
        !modelValueCourse?.detailIntroduction &&
        !modelValueCourse?.introVideo?.videoType &&
        modelValueCourse?.typeStudy === StudyTypeEnum.ONLINE
      "
    >
      <AppEmptyComponent class="empty" title="Khóa học không có dữ liệu">
        <img src="@/assets/images/status-empty.png" />
      </AppEmptyComponent>
    </template>
    <div class="btn-certificate">
      <div v-if="modelValueCourse?.typeStudy === StudyTypeEnum.OFFLINE">
        <button v-if="modelValueCourse?.status === StatusRegisterEnum.INIT" @click="toggleDialogRegister">
          ĐĂNG KÝ NGAY
        </button>
        <button v-else class="btn-disabled" disabled>Đã đăng ký</button>
      </div>
      <div v-else>
        <button
          v-if="
            modelValueCourse?.typeFree !== FreeTypeEnum.FREE &&
            modelValueCourse?.statusPayment !== StatusPaymentEnum.PAID
          "
          @click="downloadAPP"
        >
          THANH TOÁN NGAY
        </button>
        <button v-else @click="goToStudyProgress">Tham gia khóa học</button>
      </div>
    </div>
  </div>
  <div class="container-dialog">
    <el-dialog v-model="centerDialogVisible">
      <img :src="modelValueCourse?.certificateFiles[0]?.absoluteUrl" alt="image" class="img-dialog" />
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
::v-deep .el-dialog__headerbtn {
  position: absolute;
  width: 24px !important;
  height: 24px !important;
  background: url('~@/assets/images/close-icon.png') no-repeat;
  background-size: 100% 100%;
  margin-top: -3%;
  @media (max-width: 1024px) {
    margin-top: -6%;
  }
  @media (max-width: 768px) {
    margin-top: -9%;
  }
}
::v-deep .el-dialog__close.el-icon.el-icon-close {
  width: 24px !important;
  height: 24px !important;
}
::v-deep .el-dialog__close.el-icon.el-icon-close::before {
  color: transparent;
  width: 24px !important;
  height: 24px !important;
}
.course-off {
  margin-bottom: 20px;
  border: 1px solid #f2f2f2;
  border-radius: 10px;
  background: #ffffff;
}
.course-content {
  display: flex;
  margin-bottom: 4px;
}
.course-content img {
  width: 24px;
  height: 24px;
  margin-right: 6px;
}
.course-info {
  padding: 20px 27.5px 30px 27.5px;
}
.info-off {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  color: #0f0f0f;
}
.container-dialog {
  margin: 0;
  width: 100%;
}
.img-dialog {
  position: relative;
  width: auto;
  max-height: 800px;
  @media (max-width: 1600px) {
    max-height: 700px;
  }
}
.dialog {
  width: 70% !important;
  height: 80% !important;
  margin: 0;
}
.dialog img {
  width: 100%;
}
::v-deep .el-dialog__header {
  padding: 0;
  height: 0 !important;
}
::v-deep .el-dialog__body {
  padding: 0;
  margin: 5% 8%;
  display: flex;
  justify-content: center;
  @media (max-width: 1600px) {
    margin: 3% 8%;
  }
  @media (max-width: 1024px) {
    margin: 6% 8%;
  }

  /* @media (max-width: 768px) {
    margin: 20% 8%;
  } */
}
::v-deep .el-dialog {
  margin: 0 !important;
  width: 100% !important;
  height: 100% !important;

  background-color: transparent !important;
  border-radius: none !important;
}
.course-detail {
  margin-top: 30px;
}
.section {
  background: #ffffff;
  border: 1px solid #f2f2f2;
  border-radius: 10px;
  margin-bottom: 20px;
}
.info-detail {
  display: flex;
}
.img-people {
  /* width: 86.13px;
  height: 86.13px;
  border-radius: 100%; */
  margin: 29px 20px 39px 27.5px;
}
.img-people img {
  width: 87px;
  height: 87px;
  border-radius: 100%;
  padding: 2px;
  border: 2px solid #ff7f76;
}
.full-name {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 130%;
  text-transform: uppercase;
  color: #0f0f0f;
  margin-top: 20px;
}
.position {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #5a5a5a;
  border-bottom: 0.5px dashed #c1c1c1;
  padding-bottom: 15px;
}
.number-detail {
  background: #ffeeed;
  border-radius: 100px;
  padding: 0 10px 0 6px;
  display: flex;
  align-items: center;
  height: 28px;
}
.info-name {
  width: 100%;
  padding-right: 27.5px;
  padding-left: 15px;
}
.info-des {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}

.btn-detail {
  background-color: #f2f2f2;
  border: none;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 110%;
  width: 146px;
  height: 34px;
  border-radius: 5px;
  &:hover {
    background: #dedede;
  }
}

.name-detail {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 130%;
  color: #5a5a5a;
  border-bottom: 1px solid #f2f2f2;
  padding: 20px 0px 20px 27.5px;
}
.name-study {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 130%;
  padding-bottom: 10px;
}

.info-number {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  text-align: center;
  display: flex;
  gap: 10px;
  color: #fb4d4d;
  align-content: center;
}
.user-icon {
  height: 20px;
}
.section-lesson {
  display: flex;
  flex-direction: column;
}
.description-course {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: #0f0f0f;
  margin-top: 20px;
  padding: 0 27.5px;
}
.description-course:last-child {
  margin-bottom: 30px;
}
.description-study {
  padding-right: 27.5px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  color: #0f0f0f;
}
.icon-book {
  margin-right: 13px;
}
.course-study {
  display: flex;
  padding-left: 27.5px;
  border-bottom: 1px solid #f2f2f2;
  padding-top: 20px;
  padding-bottom: 15px;
}
.course-study:last-child {
  padding-bottom: 30px;
}
.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 130%;
  color: #0f0f0f;
  padding: 20px 30px 30px;
}
.skill {
  padding: 5px 10px;

  border-radius: 100px;
  background: #f2f2f2;
}
.btn-certificate {
  display: flex;
  justify-content: center;
}
.btn-certificate button {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 110%;
  text-align: center;
  text-transform: uppercase;
  padding: 16px 60px 14px;
  gap: 10px;
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

.img-certificate {
  background-color: #fafafa;
  margin: 20px 30px 20px 30px;
}
.des-certificate {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: #0f0f0f;
  margin: 0 27.5px 30px 27.5px;
  white-space: pre-line;
}
.img-certificate img {
  display: block;
  margin: 0 auto;
  width: 100%;
  //height: 100%;
  cursor: pointer;
}
.description-course ::v-deep(p) {
  margin-bottom: 0px !important;
}

.description-course ::v-deep(body) {
  margin: 0 !important;
  :first-of-type {
    margin-top: 0 !important;
  }
}
.info-number {
  @media (max-width: 1024px) {
    flex-direction: column;
    margin-bottom: 30px;
  }
}
.btn-disabled {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px 40px;
  gap: 10px;
  background: #f2f2f2 !important;
  color: #c1c1c1 !important;
  border-radius: 5px;
}
.video {
  margin: 20px auto 30px auto;
  width: 778px;
  height: 500px;
}
.list-category-head-skeleton {
  width: 100%;
  height: 139.4px;
  margin-bottom: 48px;
  margin-top: -44px;
}

.propskill-detail-course-container-skeleton {
  margin: 0 auto;
  width: 1200px;
}

.el-card-body-skeleton,
.lesson-banner-skeleton,
.box-card-skeleton,
.el-row-skeleton,
.list-category-head-skeleton,
.btn-certificate-skeleton,
.section-lesson-skeleton {
  color: transparent;
  appearance: none;
  -webkit-appearance: none;
  background-color: #eee;
  border-color: #eee;
}
.mid-box-skeleton {
  padding: 5px 0px 50px 0px;
  display: flex;
  justify-content: space-between;
}
.mid-box-left-skeleton {
  height: 100%;
  width: 833px;
  padding-top: 25px;
}
.section-lesson-skeleton {
  height: 550px;
  border-radius: 10px;
}
.btn-certificate-skeleton {
  height: 44px;
  width: 250px;

  margin: 0px auto;
  margin-top: 20px;
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
  margin-right: 19px;
  border-radius: 10px;
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, computed, ref, onMounted, onUnmounted, watch } from 'vue';
import { useInit, formatDate, convertNumberToWord } from '@/services/shared/utils';
import {} from '@/services/features/elearning/elearning.service';
import { findInvestorSuggest } from '@/services/features/investor/investor.service';
import { ApiRequestPaging } from '@/models/api-request';
import { CourseModel, InstructorModel } from '@/services/features/elearning/elearning.model';
import { ApiResponsePaging } from '@/models/api-response';
import { debounce } from 'lodash';
import {
  StatusRegisterEnum,
  StudyTypeEnum,
  FreeTypeEnum,
  StatusPaymentEnum,
  TypePopupEnum,
} from '@/services/shared/enum';
import { PostMediaTypeEnum } from '@/services/features/group/group.model';
import PropskillVideoComponent from '@/components/features/elearning/PropskillVideoComponent.vue';
// Định nghĩa data type của component [data] bằng Typescript
class PropskillCourseDetailComponentProps {
  modelValueCourse: CourseModel;
  courseId: string;
  isLoading: boolean;
}
// Định nghĩa data type của component [data] bằng Typescript
class PropskillCourseDetailComponentData {
  modelValueCourse: CourseModel;
  courseId: string;
  isLoading: boolean;
}
const centerDialogVisible = ref(false);
export default defineComponent({
  name: 'PropskillcourseDetailComponent',
  components: {},
  props: {
    modelValueCourse: {
      type: CourseModel,
      default: null,
      required: false,
    },
    courseId: {
      type: String,
      default: '',
    },
    isLoading: {
      type: Boolean,
      default: null,
    },
  },
  emits: ['toggleDialogRegister', 'downloadAPP', 'showPopupIntructor'],
  setup(props: PropskillCourseDetailComponentProps, { emit }: any) {
    const { base } = useInit();
    const data = reactive<PropskillCourseDetailComponentData>({
      modelValueCourse: { ...props.modelValueCourse },
      courseId: props.courseId,
      isLoading: props.isLoading,
    });
    watch(
      () => props.isLoading,
      (newValue, oldValue) => {
        data.isLoading = newValue;
      }
    );
    const goToSpeakerDetail = async (id: string) => {
      base.router.push({ name: 'propskill-detail-instructor', params: { id } });
    };
    // Functions
    const toggleDialogRegister = debounce(() => {
      emit('toggleDialogRegister', true);
    }, 300);

    // Functions
    const downloadAPP = debounce(() => {
      emit('downloadAPP', true);
    }, 300);

    const goToStudyProgress = async () => {
      base.router.push({ name: 'propskill-progess-lesson', params: { id: data.courseId } });
    };

    const showPopupUserLearn = (id: string) => {
      emit('showPopupIntructor', { type: TypePopupEnum.USER_LEARN, id: id });
    };

    const showDetailIntructor = (dataUser: any) => {
      emit('showPopupIntructor', { type: TypePopupEnum.USER, user: dataUser });
    };
    return {
      goToSpeakerDetail,
      centerDialogVisible,
      toggleDialogRegister,
      StatusRegisterEnum,
      StudyTypeEnum,
      formatDate,
      FreeTypeEnum,
      StatusPaymentEnum,
      goToStudyProgress,
      downloadAPP,
      PostMediaTypeEnum,
      convertNumberToWord,
      showPopupUserLearn,
      showDetailIntructor,
    };
  },
});
</script>
