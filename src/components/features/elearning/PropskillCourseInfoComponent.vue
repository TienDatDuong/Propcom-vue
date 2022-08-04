<template>
  <div :class="CourseGroup ? 'course-group' : 'course'" v-if="!isSuggest && modelValue">
    <el-card :body-style="{ padding: '0px', width: '100%', height: '100%' }" class="course-container" shadow="never">
      <div
        v-if="modelValue?.status && isShowStatus"
        class="course-status"
        :style="{
          'background-color': statusGetTitle(modelValue?.status).color,
        }"
      >
        <img class="icon-status" :src="statusGetTitle(modelValue?.status).icon" />
        <span class="title-status">{{ statusGetTitle(modelValue?.status).title }}</span>
      </div>
      <div class="course-icon-box">
        <div
          v-if="modelValue.iconWeb?.length"
          class="course-icon"
          :style="{
            'background-image': 'url(' + encapsulateUrl(modelValue.iconWeb) + ')',
          }"
        ></div>
        <div v-else class="course-icon">
          <img src="~@/assets/images/course-icon-default.png" class="image" />
        </div>

        <!-- <img v-else src="~@/assets/images/course-icon-default.png" class="image" /> -->
      </div>
      <div class="course-info">
        <!-- <div class="course-image">
          <div class="image-box" style="position: relative">
            <div class="course-type" v-if="modelValue?.typeFree && modelValue?.typeFree === FreeTypeEnum.FREE">
              Free
            </div>

            <div
              v-if="modelValue?.type"
              class="image-type-bg"
              :style="{
                'background-color': statusGetLevel(modelValue?.type).background,
              }"
            >
              <img v-if="modelValue.icon?.length" :src="modelValue.icon" class="image" />
              <img v-else src="~@/assets/images/course-icon.png" class="image" />
            </div>
          </div>
        </div> -->
        <div class="course-content">
          <div
            class="course-content-container"
            :class="[
              modelValue?.typeStudy === StudyTypeEnum.ONLINE ? 'online' : 'offline',
              isHideDescription ? 'hide-description' : '',
              CourseGroup ? 'hide-description' : '',
            ]"
          >
            <div class="course-title text-font">{{ modelValue.name }}</div>
            <div v-if="!isHideDescription && !CourseGroup" class="course-description text-font">
              {{ modelValue.description }}
            </div>

            <!-- offline -->
            <div
              class="time-start"
              v-if="isShowOpening && modelValue?.timeOpening && modelValue?.typeStudy === StudyTypeEnum.OFFLINE"
            >
              <div class="course-start-date">
                <img src="~@/assets/images/calendar-icon-xl.png" class="calender-icon" />Khai giảng:
                {{ formatDate(modelValue.timeOpening, 'dd/MM/yyyy') }}
              </div>
            </div>
            <!-- <div
              class="time-start"
              v-if="routeName === 'propskill-detail-instructor' && modelValue?.typeStudy === StudyTypeEnum.ONLINE"
            >
              <div class="course-start-date-online"></div>
            </div> -->
            <div
              class="course-type"
              v-if="isShowPrice && modelValue?.typeFree && modelValue?.typeFree === FreeTypeEnum.FREE"
            >
              <img src="~@/assets/icons/course-free.png" class="icon-course-free" />
              <span class="course-type-text"><div>Khóa học miễn phí</div></span>
            </div>
            <div v-else>
              <div class="box-price" v-if="isShowPrice">
                <div v-if="modelValue.payCash || modelValue.payPoint" class="course-price">
                  <template v-if="modelValue?.payCash">
                    <span v-if="modelValue.payCash" class="price-dollar text-font">{{
                      convertNumberToWord(modelValue.amountCash)
                    }}</span>
                    <span v-if="!modelValue.payCash && modelValue.payPoint" class="price-dollar text-font"
                      >{{ parseToMoney(modelValue.amountPoint) }}
                      <img class="icon" src="~@/assets/images/point-gem-icon.png"
                    /></span>
                    <span v-if="modelValue.payPoint && modelValue.payCash" class="price-gem text-font"
                      ><span class="text-connect">{{ modelValue.isPayBoth ? 'và' : 'hoặc' }}</span
                      ><span class="amount-gem">{{ parseToMoney(modelValue.amountPoint) }}</span
                      ><img class="icon" src="~@/assets/images/point-gem-icon.png"
                    /></span>
                  </template>
                  <template v-else>
                    <span class="price-dollar">
                      <span class="amount-gem">{{ parseToMoney(modelValue?.amountPoint) }}</span>
                      <img class="icon" src="~@/assets/images/point-gem-icon.png" />
                    </span>
                  </template>
                </div>
              </div>
            </div>
            <div v-if="isShowProgress">
              <div
                class="progress-body"
                v-if="
                  modelValue.status === StatusCourseEnum.IN_PROGRESS || modelValue.status === StatusCourseEnum.COMPLETED
                "
              >
                <div class="progress-content progress-content-space" style="min-height: 15.59px">
                  <span>{{ modelValue?.point ? 'Điểm đã đạt:' : '' }}</span>
                  <span v-if="modelValue?.point" class="progress-bonus"
                    >{{ parseToMoney(modelValue?.point)
                    }}<img class="bonus-icon" src="~@/assets/images/point-gem-icon.png"
                  /></span>
                </div>
                <el-progress :percentage="Math.round(Number(modelValue?.progress) * 100)" color="#04c35c" />
              </div>
              <div v-else class="progress-body">
                <div class="progress-content" style="min-height: 15.59px"></div>
              </div>
            </div>

            <div class="group-btn">
              <el-button text class="btn-view-more" @click="goToCourseDetail(modelValue.id)">Khám phá</el-button>
              <el-button v-if="data.modelValue.isFavorite" @click="handleLike()" text class="btn-like"></el-button>
              <el-button v-if="!data.modelValue.isFavorite" @click="handleLike()" text class="btn-dislike"></el-button>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
  <!-- khối dùng cho suggest -->
  <div class="course-suggest" v-if="isSuggest">
    <div class="course-info-suggest">
      <div class="course-image">
        <el-row>
          <el-col :span="7">
            <div class="image-suggest" style="position: relative">
              <div
                class="course-type-suggest"
                v-if="modelValue?.typeFree && modelValue?.typeFree === FreeTypeEnum.FREE"
              >
                Free
              </div>
              <div>
                <div
                  v-if="modelValue.iconWeb?.length"
                  class="course-icon-suggest"
                  :style="{
                    'background-image': 'url(' + encapsulateUrl(modelValue.iconWeb) + ')',
                  }"
                ></div>
                <img v-else src="@/assets/images/default_image.svg" class="course-icon-suggest" />
              </div>
            </div>
          </el-col>
          <el-col :span="17">
            <div class="course-content-suggest">
              <div class="course-title text-font">{{ modelValue.name }}</div>
              <div>
                <div v-if="modelValue.payCash || modelValue.payPoint" class="course-price">
                  <span v-if="modelValue.payCash" class="price-dollar text-font">{{
                    convertNumberToWord(modelValue.amountCash)
                  }}</span>
                  <span v-if="!modelValue.payCash && modelValue.payPoint" class="price-dollar text-font"
                    >{{ parseToMoney(modelValue.amountPoint) }}
                    <img class="icon" src="~@/assets/images/point-gem-icon.png"
                  /></span>
                  <span v-if="modelValue.payPoint && modelValue.payCash" class="price-gem text-font"
                    ><span class="text-connect">{{ modelValue.isPayBoth ? 'và' : 'hoặc' }}</span
                    ><span class="amount-gem">{{ parseToMoney(modelValue.amountPoint) }}</span
                    ><img class="icon" src="~@/assets/images/point-gem-icon.png"
                  /></span>
                </div>
              </div>
              <a href="javascript:;" class="course-link" @click="goToCourseDetail(modelValue?.id)">
                <span class="course-link-text">Khám phá</span>
                <span class="course-link-icon"></span>
              </a>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
::v-deep .el-dialog__body {
  padding: 0 7px 30px 0;
}
::v-deep .el-card.is-never-shadow.course-container:hover {
  border: 1px solid #ffeeed;
  filter: drop-shadow(0px 10px 30px rgba(221, 0, 0, 0.2));
}
.course-container:hover {
  border-color: #dd0000;
  .btn-view-more {
    background: #dd0000;
    color: #ffffff;
  }
}
.btn-view-more {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 110%;

  text-align: center;
  text-transform: uppercase;

  color: #0f0f0f;
  width: 183px !important;
  height: 34px !important;
}
.section-suggest {
  padding: 20px;
}
.image-type-bg {
  border-radius: 10px;
}

.course-icon-box {
  display: flex;
  justify-content: center;
}
.course-icon,
.course-icon-suggest {
  width: 100%;
  height: 140px;
  background: linear-gradient(181.77deg, #dd0000 1.5%, #840000 146.62%);
  background-image: url('~@/assets/images/course-icon-default.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.course-icon-suggest {
  height: 70px;
  width: 70px;
  border-radius: 10px;
}
.image {
  height: 140px;
  width: auto;
  display: flex;
  margin: auto;
}
.image-suggest {
  height: 70px;
  width: 70px;
  border-radius: 10px;
}
.icon-suggest {
  margin: 11px 12px;
  height: 48px;
  width: 46px;
  border-radius: 10px;
}
.text-font {
  font-family: 'Roboto';
  font-style: normal;
}
.icon {
  width: 17px;
  height: 17px;
}
.calender-icon {
  width: 12px;
  height: 12px;
  margin-right: 5px;
  margin-bottom: 3px;
}
.image-box {
  width: 70px;
  height: 70px;
  margin: 0 auto;
}
.course-status {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  position: absolute;
  right: 0%;
  top: 0%;
  width: auto;
  padding: 3px 10px 3px 6px;
  border-radius: 0px 0px 0px 10px;
}
.course-type {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 3px 8px;
  gap: 3px;
  width: 124px;
  height: 20px;
  background: #ffcf13;
  border-radius: 100px;
}
.icon-course-free {
  width: 10px;
  height: 10px;
  margin-bottom: 2px;
}
.course-type-text {
  height: 14px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 11.4px;
  line-height: 14.06px;
  color: #dd0000;
}
.course-type-suggest {
  background: #ffcf13;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  position: absolute;
  right: 0%;
  top: 0%;
  width: auto;
  padding: 2px 10px;
  border-radius: 0px 10px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 130%;
  color: #dd0000;
  width: 44px;
  height: 20px;
}
.course-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.course-title {
  height: 36px;
}
.course-content-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: 189px;
}
.online {
  height: 159px;
}
.hide-description {
  height: 133px;
}

.course-suggest {
  width: 294px;
  height: 82px;
}

.time-start {
  height: 20px;
}
.box-price {
  min-height: 20px;
}
.course-price {
  height: 20px;
}
.course-content-suggest {
  margin-left: 0.84px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 7px;
  width: 100%;
  height: 100%;
}
.course-title {
  font-weight: 700;
  font-size: 14px;
  line-height: 130%;
  color: #0f0f0f;
  display: block;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  white-space: normal;
}
.course-description {
  font-weight: 400;
  font-size: 12px;
  line-height: 140%;
  color: #5a5a5a;
  display: block;
  max-width: 100%;
  word-break: break-word;
}
.course-start-date,
.course-start-date-online {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  color: #5a5a5a;
  background: #fafafa;
  border-radius: 100px;
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2px 8px;
  gap: 5px;
}
.course-start-date-online {
  background: transparent;
}
.course {
  width: 267px;
}
.course-container {
  position: relative;
  gap: 12px;
  width: 100%;
  height: 100%;
  border: 1px solid #f2f2f2;
  border-radius: 10px !important;
}
.course-info,
.course-info-suggest {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  //gap 12px
  padding: 12px 20px 20px 20px;
}
.course-info-suggest {
  padding: 0;
}
.course-price {
  display: flex;
  justify-content: start;
}
.price-dollar {
  font-weight: 700;
  font-size: 16px;
  line-height: 130%;
  color: #dd0000;
  padding-right: 5px;
}
.text-connect {
  color: #5a5a5a;
}
.amount-gem {
  color: #dd0000;
}
.price-gem {
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2px 10px;
  gap: 5px;
  width: auto;
  height: 20px;
  background: #f2f2f2;
  border-radius: 100px;
}
.group-btn {
  height: 34px !important;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-like {
  border-radius: 50%;
  background: url('~@/assets/images/favourite-icon-active.png');
  background-repeat: no-repeat;
  background-position: center;
  max-width: 34px;
  background-size: 20px 18px;
}
.btn-dislike {
  border-radius: 50%;
  background: url('~@/assets/images/favourite-icon-inactive.png');
  background-repeat: no-repeat;
  background-position: center;
  max-width: 34px;
  background-size: 20px 18px;
}
::v-deep .el-button.el-button--default.btn-view-more {
  padding-top: 5px;
  padding-bottom: 5px;
}
::v-deep .el-button {
  min-height: 34px;
  padding: 16px 16px;
}
.btn-view-more {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-style: none;
  background: #f2f2f2;
  border-radius: 5px;
  height: 34px !important;
}
.icon-status {
  height: 11px;
  width: 11px;
  margin-right: 3px;
}

.title-status {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 130%;
  color: #ffffff;
}
.course-link {
  color: #c1c1c1;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 130%;
  &:hover {
    color: #fb4d4d;
    .course-link-icon {
      background: url('~@/assets/images/path-red-icon.png');
      background-repeat: no-repeat;
      background-size: 10px 10px;
      width: 10px;
      height: 10px;
      background-position: center;
    }
  }
}
.course-link-icon {
  width: 10px;
  height: 10px;
  background: url('~@/assets/images/path-grey-icon.png');
  background-repeat: no-repeat;
  background-size: 10px 10px;
  background-position: center;
}
:v-deep .el-progress {
  background: #04c35c;
  border-radius: 100px;
  height: 6px !important;
}
.box-progress {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  width: 334px;
  background: #ffffff;
  border-radius: 10px;
}
.progress-body {
  width: 100%;
  height: 40px;
  //height: 43px;
}
.progress-content {
  display: flex;
  justify-content: start;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #5a5a5a;
}
.progress-content-space {
  padding: 0px 0px 11px 0px;
}
.progress-percentage-title {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #5a5a5a;
}
.course-group {
  width: 100%;
}
.progress-percentage-amount {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  color: #5a5a5a;
  padding-left: 4px;
}
.progress-bonus {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 130%;
  color: #5a5a5a;
  display: flex;
  align-items: center;
  padding-left: 2px;
}
.bonus-icon {
  width: 15px;
  height: 15px;
}
:v-deep .el-progress {
  background: #04c35c;
  border-radius: 100px;
  height: 6px !important;
}
::v-deep .el-progress__text {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 80%;
  text-align: center;
  color: #04c35c;
}
::v-deep .el-progress-bar {
  height: 8px;
  &__outer {
    height: 8px !important;
  }
}
::v-deep .el-progress--line {
  width: 238px;
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, computed, ref, onMounted, onUnmounted, watch } from 'vue';
import { useInit } from '@/services/shared/utils';
import { favoriteCourse } from '@/services/features/elearning/elearning.service';
import { findInvestorSuggest } from '@/services/features/investor/investor.service';
import { ApiRequestPaging } from '@/models/api-request';
import {
  StatusRegisterEnum,
  FreeTypeEnum,
  StudyTypeEnum,
  StudyTypeLevelEnum,
  StatusCourseEnum,
} from '@/services/shared/enum';

import { ApiResponsePaging } from '@/models/api-response';
import {
  contentHide,
  formatDate,
  convertNumberToWord,
  formatNumber,
  parseToMoney,
  encapsulateUrl,
} from '@/services/shared/utils';
import { CourseModel } from '@/services/features/elearning/elearning.model';
import { Constant } from '@/services/shared/constant';
// Định nghĩa data type của component [data] bằng Typescript
class PropskillCourseInfoComponenProps {
  modelValue: CourseModel;
  masterData: any;
  isSuggest: boolean;
  isShowProgress: boolean;
  isShowPrice: boolean;
  isHideDescription: boolean;
  isShowOpening: boolean;
  isShowStatus: boolean;
  CourseGroup: string;
}
// Định nghĩa data type của component [data] bằng Typescript
class PropskillCourseInfoComponentData {
  modelValue: CourseModel;
  masterData: any;
  isSuggest: boolean;
  isShowProgress: boolean;
  isShowPrice: boolean;
  isHideDescription: boolean;
  isShowOpening: boolean;
  isShowStatus: boolean;
  CourseGroup: string;
}

export default defineComponent({
  name: 'PropskillCourseInfoComponent',
  components: {},
  props: {
    modelValue: {
      type: CourseModel,
      default: null,
      required: true,
    },
    masterData: {
      type: Object,
      default: null,
    },
    isSuggest: {
      type: Boolean,
      default: null,
    },
    isShowProgress: {
      type: Boolean,
      default: false,
    },
    isHideDescription: {
      type: Boolean,
      default: null,
    },
    isShowPrice: {
      type: Boolean,
      default: true,
    },
    isShowOpening: {
      type: Boolean,
      default: true,
    },
    isShowStatus: {
      type: Boolean,
      default: true,
    },
    CourseGroup: {
      type: String,
      default: null,
    },
  },
  setup(props: PropskillCourseInfoComponenProps) {
    const { base } = useInit();
    const data = reactive<PropskillCourseInfoComponentData>({
      modelValue: { ...props.modelValue },
      CourseGroup: props.CourseGroup,
      masterData: props.masterData,
      isSuggest: props.isSuggest,
      isShowProgress: props.isShowProgress,
      isHideDescription: props.isHideDescription,
      isShowPrice: props.isShowPrice,
      isShowOpening: props.isShowOpening,
      isShowStatus: props.isShowStatus,
    });
    const statusGetTitle = (status: string) => {
      switch (status) {
        case StatusRegisterEnum.IN_CONTACT:
          return Constant.STATUS_REGISTER.find((item) => item.key === StatusRegisterEnum.IN_CONTACT);
        case StatusRegisterEnum.CONTACT:
          return Constant.STATUS_REGISTER.find((item) => item.key === StatusRegisterEnum.CONTACT);
        case StatusRegisterEnum.REGISTER:
          return Constant.STATUS_REGISTER.find((item) => item.key === StatusRegisterEnum.REGISTER);
        case StatusRegisterEnum.IN_PROGRESS:
          return Constant.STATUS_REGISTER.find((item) => item.key === StatusRegisterEnum.IN_PROGRESS);
        case StatusRegisterEnum.RESERVE:
          return Constant.STATUS_REGISTER.find((item) => item.key === StatusRegisterEnum.RESERVE);
        case StatusRegisterEnum.COMPLETED:
          return Constant.STATUS_REGISTER.find((item) => item.key === StatusRegisterEnum.COMPLETED);
        case StudyTypeLevelEnum.LOW:
          return Constant.STATUS_LEVEL.find((item) => item.key === StudyTypeLevelEnum.LOW);
        default:
          return {};
      }
    };
    const statusGetLevel = (level: string) => {
      switch (level) {
        case StudyTypeLevelEnum.LOW:
          return Constant.STATUS_LEVEL.find((item) => item.key === StudyTypeLevelEnum.LOW);
        case StudyTypeLevelEnum.MEDIUM:
          return Constant.STATUS_LEVEL.find((item) => item.key === StudyTypeLevelEnum.MEDIUM);
        case StudyTypeLevelEnum.HIGH:
          return Constant.STATUS_LEVEL.find((item) => item.key === StudyTypeLevelEnum.HIGH);
        default:
          return {};
      }
    };

    const goToCourseDetail = async (id: string) => {
      base.router.push({ name: 'propskill-detail-course', params: { id } });
    };

    const handleLike = async () => {
      const responeLike = await favoriteCourse(data.modelValue.id);
      if (responeLike && responeLike.isSuccess) {
        data.modelValue.isFavorite = !data.modelValue.isFavorite;
      }
    };

    watch(
      () => props.modelValue,
      (newValue) => {
        data.modelValue = newValue;
      }
    );

    return {
      contentHide,
      statusGetTitle,
      formatDate,
      convertNumberToWord,
      formatNumber,
      goToCourseDetail,
      handleLike,
      parseToMoney,
      encapsulateUrl,
      data,
      StudyTypeEnum,
      StatusRegisterEnum,
      StudyTypeLevelEnum,
      statusGetLevel,
      FreeTypeEnum,
      StatusCourseEnum,
      routeName: base.route.name,
    };
  },
});
</script>
