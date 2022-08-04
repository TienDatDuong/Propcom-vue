<template>
  <div class="group-suggest-page">
    <div class="topic-page-header">
      <div class="topic-page-header__breadcrumb" v-if="data.breadcrumb?.length > 0">
        <template v-for="(item, index) in data.breadcrumb" :key="index">
          <router-link :to="{ name: item.routeName, params: item.params }">{{ item.text }}</router-link>
          <span v-if="index !== data.breadcrumb.length - 1"> / </span>
        </template>
      </div>
    </div>
    <template
      v-if="
        !data?.isLoading &&
        !data?.course?.instructors?.length &&
        !data?.course?.certificateFiles[0]?.absoluteUrl?.length &&
        !data?.course?.target?.length &&
        !data?.course?.lessons?.length &&
        !data?.course?.detailIntroduction &&
        !data?.course?.introVideo?.videoType &&
        data?.course?.typeStudy === StudyTypeEnum.ONLINE
      "
    >
      <div class="empty-page">
        <AppEmptyComponent class="empty" title="Khóa học không có dữ liệu">
          <img src="@/assets/images/status-empty.png" />
        </AppEmptyComponent>
      </div>
    </template>
    <template v-else>
      <el-row>
        <el-col v-if="data.isLoading" :span="24">
          <div class="list-category-head-skeleton"></div>
        </el-col>
        <el-col v-else :span="24" class="content">
          <div class="list-category-head">
            <div class="list-category-head-container">
              <div class="flex-box">
                <span class="title">{{ data.course?.name }}</span>
                <div class="fee" v-if="data.course?.typeFree === FreeTypeEnum.NOT_FREE">
                  <div>
                    <img class="icon-money" src="@/assets/images/money-dollar-circle-fill.png" />
                  </div>
                  <span class="count">Học phí: </span>
                  <div v-if="data.course?.payCash || data.course?.payPoint" class="course-price">
                    <template v-if="data.course?.payCash">
                      <span v-if="data.course?.payCash" class="price-dollar text-font money">{{
                        convertNumberToWord(data.course?.amountCash)
                      }}</span>
                      <span v-if="!data.course?.payCash && data.course?.payPoint" class="price-dollar text-font"
                        >{{ parseToMoney(data.course?.amountPoint) }}
                        <img class="icon" src="~@/assets/images/point-gem-icon.png"
                      /></span>
                      <span v-if="data.course?.payPoint && data.course?.payCash" class="price-gem text-font"
                        ><span class="text-connect">{{ data.course?.isPayBoth ? 'và' : 'hoặc' }}</span
                        ><span class="amount-gem">{{ parseToMoney(data.course?.amountPoint) }}</span
                        ><img class="icon" src="~@/assets/images/point-gem-icon.png"
                      /></span>
                    </template>
                    <template v-else>
                      <span class="price-dollar">
                        <span class="amount-gem">{{ parseToMoney(data.course?.amountPoint) }}</span>
                        <img class="icon" src="~@/assets/images/point-gem-icon.png" />
                      </span>
                    </template>
                  </div>
                </div>
              </div>
              <div class="center-border"></div>
              <div class="header">
                <el-menu
                  :default-active="activeIndex"
                  class="menu-header"
                  text-color="#A7A7A7"
                  active-text-color="#DD0000 "
                  mode="horizontal"
                  style="border-style: none"
                  @select="switchTab"
                >
                  <el-menu-item :index="PropskillDetailPageSection.DETAIL">Tổng quan</el-menu-item>
                  <el-menu-item :index="PropskillDetailPageSection.HISTORY">Trạng thái khóa học</el-menu-item>
                  <el-menu-item
                    v-if="data.course?.typeStudy === StudyTypeEnum.ONLINE"
                    :index="PropskillDetailPageSection.RANK"
                    >Bảng xếp hạng</el-menu-item
                  >
                </el-menu>
                <div class="group-btn">
                  <div v-if="data.course?.typeStudy === StudyTypeEnum.OFFLINE">
                    <el-button
                      text
                      class="btn-join"
                      v-if="data.course?.status === StatusRegisterEnum.INIT"
                      @click="toggleDialogRegister(true)"
                      >Đăng ký ngay</el-button
                    >
                    <el-button text class="btn-disabled" v-else disabled>Đã đăng ký</el-button>
                  </div>
                  <div v-else>
                    <el-button
                      text
                      class="btn-join"
                      v-if="
                        data.course?.typeFree !== FreeTypeEnum.FREE &&
                        data.course?.statusPayment !== StatusPaymentEnum.PAID
                      "
                      @click="downloadAPP(true)"
                      >Thanh toán ngay</el-button
                    >
                    <el-button @click="goToStudyProgress" text class="btn-join" v-else>Tham gia khóa học</el-button>
                  </div>
                  <el-button
                    v-if="data?.course && data?.course.isFavorite"
                    @click="handleLike()"
                    text
                    class="btn-like"
                  ></el-button>
                  <el-button
                    v-if="data?.course && !data?.course.isFavorite"
                    @click="handleLike()"
                    text
                    class="btn-dislike"
                  ></el-button>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="container-content">
        <el-row>
          <el-col :span="17" class="content-detail">
            <PropskillCourseDetailComponent
              v-if="data.activeTab === PropskillDetailPageSection.DETAIL"
              :modelValueCourse="data?.course"
              :courseId="data.courseId"
              @toggleDialogRegister="toggleDialogRegister"
              @downloadAPP="downloadAPP"
              @showPopupIntructor="showPopupIntructor"
              :isLoading="data.isLoading"
            />
            <PropskillCourseStatusComponent
              v-if="data.activeTab === PropskillDetailPageSection.HISTORY"
              :modelValue="data?.course?.histories"
              :isLoading="data.isLoading"
              :status="data?.course?.status"
            />
            <PropskillRankComponent
              v-if="data.activeTab === PropskillDetailPageSection.RANK"
              :modelValue="data.rank"
              :activeType="data.activeType"
              :activeDay="data.activeDay"
              :isLoading="data.rank.isLoading"
              @onActiveTypeChange="switchType"
              @onActiveDayChange="switchDay"
              @onViewMore="onViewMore"
              :isViewMore="data.isViewMore"
              :isHide="data.isHide"
            />
          </el-col>
          <el-col :span="7">
            <div v-if="data.currentHistory" class="profile">
              <PropskillCourseProfileComponent
                :modelValue="data.currentHistory?.data"
                :isLoading="data.currentHistory?.isLoading"
              />
              <PropskillBannerLessonComponent
                v-if="data?.course?.typeStudy === StudyTypeEnum.ONLINE"
                :modelValue="data.lessonNotPass.items"
                :isLoading="data.lessonNotPass.isLoading"
                class="banner"
              />
              <PropskillCourseSuggestionComponent
                class="suggest"
                :modelValue="data.courseInterest.items"
                :isLoading="data.courseInterest.isLoading"
              />
            </div>
          </el-col>
        </el-row>
      </div>
    </template>
  </div>
  <el-dialog v-model="data.dialogRegister" width="500px" custom-class="app-dialog">
    <template #title>
      <span class="app-dialog-title">Đăng ký khóa học</span>
    </template>
    <div class="app-dialog-content">
      <Form
        validate-on-submit
        :validation-schema="formValidation"
        :initial-values="data.registerCourse"
        @submit="handleSubmitEdit"
        class="group-detail-aside-component__dialog-form"
      >
        <Field name="name" v-slot="{ field, handleChange, handleBlur, errorMessage }">
          <div class="app-input">
            <label class="app-input__form__label"
              >Họ và tên<span class="app-input__form__label-required">*</span>
            </label>
            <el-input
              :modelValue="field.value"
              @input="handleChange"
              @blur="handleBlur"
              size="small"
              class="input-form"
            >
              <template #append>
                <div class="underline" :class="{ invalid: errorMessage }"></div>
              </template>
            </el-input>
            <div v-if="errorMessage" class="input-error">
              <img src="@/assets/icons/colorful/icon_error.svg" alt="form-error" />
              <span class="form-error">{{ errorMessage }}</span>
            </div>
          </div>
        </Field>
        <Field name="phone" v-slot="{ field, handleChange, handleBlur, errorMessage }">
          <div class="app-input">
            <label class="app-input__form__label"
              >Số điện thoại<span class="app-input__form__label-required">*</span>
            </label>
            <el-input
              :modelValue="field.value"
              @input="handleChange"
              @blur="handleBlur"
              size="small"
              class="input-form"
            >
              <template #append>
                <div class="underline" :class="{ invalid: errorMessage }"></div>
              </template>
            </el-input>
            <div v-if="errorMessage" class="input-error">
              <img src="@/assets/icons/colorful/icon_error.svg" alt="form-error" />
              <span class="form-error">{{ errorMessage }}</span>
            </div>
          </div>
        </Field>
        <Field name="email" v-slot="{ field, handleChange, handleBlur, errorMessage }">
          <div class="app-input">
            <label class="app-input__form__label">Email<span class="app-input__form__label-required">*</span> </label>
            <el-input
              :modelValue="field.value"
              @input="handleChange"
              @blur="handleBlur"
              size="small"
              class="input-form"
            >
              <template #append>
                <div class="underline" :class="{ invalid: errorMessage }"></div>
              </template>
            </el-input>
            <div v-if="errorMessage" class="input-error">
              <img src="@/assets/icons/colorful/icon_error.svg" alt="form-error" />
              <span class="form-error">{{ errorMessage }}</span>
            </div>
          </div>
        </Field>
        <Field name="note" v-slot="{ field, handleChange, handleBlur, errorMessage }">
          <div class="app-input">
            <label class="app-input__form__label">Ghi chú</label>
            <el-input
              :modelValue="field.value"
              @input="handleChange"
              @blur="handleBlur"
              size="small"
              class="input-form"
            >
              <template #append>
                <div class="underline" :class="{ invalid: errorMessage }"></div>
              </template>
            </el-input>
          </div>
        </Field>
        <div class="app-dialog-content__actions">
          <button @click="toggleDialogRegister(false)" class="app-btn">huỷ</button>
          <button type="submit" class="app-btn app-btn-primary">lưu</button>
        </div>
      </Form>
    </div>
  </el-dialog>
  <el-dialog @close="closeConfirm" v-model="data.confirmRegisterSuccess" width="500px" custom-class="app-dialog">
    <template #title>
      <span class="app-dialog-title">Đăng ký thành công</span>
    </template>
    <div class="app-dialog-content">
      <span>Bạn đã đăng ký thành công khóa học {{ data.course?.name }}</span>
      <div class="app-dialog-content__actions">
        <button @click="closeConfirm" class="app-btn app-btn-primary">OK</button>
      </div>
    </div>
  </el-dialog>
  <el-dialog v-model="data.dialogDownload" width="833px" custom-class="app-dialog">
    <template #title>
      <span class="app-dialog-title">Tải APP để thanh toán khóa học</span>
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
      <div>Hiện chúng tôi chưa cập nhật tính năng thanh toán khóa học trên web.</div>
      <div>Vui lòng tải app ngay để thanh toán khóa học.</div>
    </div>
    <div class="app-dialog-content__actions">
      <button type="submit" class="app-btn app-btn-primary" @click="closeDialog">OK</button>
    </div>
  </el-dialog>
  <PropskillUserLearnComponent ref="childUserLearn" />
</template>

<style lang="scss" scoped>
.group-suggest-page {
  &__container {
    width: 1200px;
    margin: 0 auto;
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
.container-content {
  width: 1200px;
  margin: 0 auto;
  min-height: 750px;
}
::v-deep .el-menu-item {
  padding-left: 0 !important;
  margin-right: 34px;
}
.list-category-head,
.list-category-head-skeleton {
  width: 100%;
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.06);
}
.list-category-head-skeleton {
  color: transparent;
  appearance: none;
  -webkit-appearance: none;
  background-color: #eee;
  border-color: #eee;
  height: 140px;
}
.list-category-head-container {
  width: 1200px;
  margin: 0 auto;
}
.flex-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 45px;
}
.center-border {
  margin-top: 12px;
  border: 1px solid #f2f2f2;
}
.title {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 110%;
  color: #0f0f0f;
}
.menu-header {
  border: none;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 130%;
  color: #a7a7a7;
  display: flex;
  width: 50%;
  //height: 63px;
  align-items: center;
  //margin-bottom: -9px;
  background-color: transparent;
}
::v-deep .el-menu-item {
  margin-top: 10px;
  height: 44px !important;
}
.content-detail {
  padding-right: 17px;
}
.profile {
  margin-top: 30px;
  margin-left: 16px;
  width: 334px;
}
:v-deep .el-menu.el-menu--horizontal {
  border: none;
}
.group-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  //margin: 10px 0;
}
::v-deep .el-button {
  min-height: 34px !important;
  padding: 11px 15px;
}
::v-deep .el-button.el-button--default.btn-dislike,
.el-button.el-button--default.btn-like {
  min-height: 32px !important;
}
.btn-join {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 110%;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;
  padding: 10px 40px;
  background: #dd0000;
  border-radius: 5px;
  border: none;
  margin-right: 13px;
  &:hover {
    background: #ad0000;
  }
}
.btn-like {
  border-radius: 50%;
  background: url('~@/assets/images/favourite-icon-active.png');
  background-repeat: no-repeat;
  background-position: center;
}
.btn-dislike {
  border-radius: 50%;
  background: url('~@/assets/images/favourite-icon-inactive.png');
  background-repeat: no-repeat;
  background-position: center;
}
.header {
  height: 54px;
  display: flex;
  justify-content: space-between;
}
.icon-money {
  width: 17px;
  height: 17px;
}
.count {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #0f0f0f;
}
.money {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 110%;
  color: #dd0000;
}
.fee {
  display: flex;
  gap: 7px;
  align-items: center;
}
.app-input {
  margin-top: 10px;
}
.banner {
  margin-top: 20px;
  margin-bottom: 20px;
}
.suggest {
  margin-bottom: 30px;
}
.btn-disabled {
  border-style: none;
  padding: 10px 40px;
  gap: 10px;
  background: #f2f2f2 !important;
  color: #c1c1c1 !important;
  border-radius: 5px;
  margin-right: 14px;
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
.course-price {
  display: flex;
  justify-content: start;
}
.price-dollar {
  font-weight: 700;
  font-size: 18px;
  line-height: 110%;
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
.course-price .icon {
  width: 17px;
  height: 17px;
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
.empty-page {
  min-height: calc(100vh - 225px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.empty {
  background: #ffffff;
  border: 1px solid #f2f2f2;
  margin: 0 auto;
  width: 833px;
  margin-bottom: 20px;
  min-height: 480px;
  margin-top: 45px;
  margin-bottom: 45px;
}
.empty img {
  width: 301px;
  height: 164px;
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, onMounted, ref } from 'vue';
import { useInit, encapsulateUrl, parseToMoney } from '@/services/shared/utils';
import {
  favoriteCourse,
  findAllCourse,
  rankTopPropskill,
  rankUserPropskill,
  registerCourse,
} from '@/services/features/elearning/elearning.service';
import { getMasterData } from '@/services/features/master-data/master-data.service';
import { ApiRequestPaging } from '@/models/api-request';
import { Form, Field } from 'vee-validate';
import * as yup from 'yup';
import {
  CourseModel,
  InstructorModel,
  HistoryStudyModel,
  UserLessonModel,
  HistoryUpdateStatusModel,
  RegisterCourseModel,
} from '@/services/features/elearning/elearning.model';
import {
  getDetailCourse,
  getHistorySutdy,
  findCourse,
  findLessonNotPassExam,
} from '@/services/features/elearning/elearning.service';
import PropskillCourseDetailComponent from '@/components/features/elearning/PropskillCourseDetailComponent.vue';
import PropskillCourseProfileComponent from '@/components/features/elearning/PropskillCourseProfileComponent.vue';
import PropskillCourseStatusComponent from '@/components/features/elearning/PropskillCourseStatusComponent.vue';
import PropskillUserLearnComponent from '@/components/features/elearning/PropskillUserLearnComponent.vue';
import { findCurrentEmployee } from '@/services/features/employee/employee.service';
import {
  FreeTypeEnum,
  PropskillDataGet,
  PropSkillTabEnum,
  RankTypeEnum,
  StatusPaymentEnum,
  StatusRegisterEnum,
  StudyTypeEnum,
  TableRankEnum,
  TypePopupEnum,
} from '@/services/shared/enum';
import { convertNumberToWord, formatNumberWithDot } from '@/services/shared/utils';

enum PropskillDetailPageSection {
  DETAIL = 'detail', // Bài viết
  HISTORY = 'history', // Thành viên
  RANK = 'rank', // Bài viết của tôi
}

class PropskillDetailCoursePageData {
  isLoading: boolean;
  activeTab: PropskillDetailPageSection | string;
  activeType: TableRankEnum | string;
  activeDay: RankTypeEnum | string;
  courseId: string;
  course: CourseModel | null;
  instructors: InstructorModel[] | null;
  histories: HistoryUpdateStatusModel[] | null;
  breadcrumb: any;
  currentHistory: {
    isLoading: boolean;
    data: HistoryStudyModel | null;
  };
  lessonNotPass: {
    isLoading: boolean;
    queryParams: ApiRequestPaging;
    items: UserLessonModel[] | null;
  };
  courseInterest: {
    isLoading: boolean;
    queryParams: ApiRequestPaging;
    items: CourseModel[] | null;
  };
  registerCourse: RegisterCourseModel | any;
  dialogRegister: boolean;
  confirmRegisterSuccess: boolean;
  rank: {
    isLoading: boolean;
    queryParams: ApiRequestPaging;
    listRank: any[];
    myRank: any;
    typeRank: RankTypeEnum | string;
    tableRank: TableRankEnum | string;
    total: any;
  };
  dialogDownload: boolean;
  isViewMore: boolean;
  isHide: boolean;
  maxPage: any;
}

export default defineComponent({
  name: 'PropskillDetailCoursePage',
  components: {
    Form,
    Field,
    PropskillCourseDetailComponent,
    PropskillCourseProfileComponent,
    PropskillCourseStatusComponent,
    PropskillUserLearnComponent,
  },

  setup() {
    // Setup Default
    const { base, isLoggedIn } = useInit();
    let activeIndex = '';
    const data = reactive<PropskillDetailCoursePageData>({
      isLoading: false,
      activeTab: PropskillDetailPageSection.DETAIL,
      activeType: TableRankEnum.COURSE,
      activeDay: RankTypeEnum.ALL,
      courseId: base.route.params.id as string,
      course: null,
      instructors: null,
      histories: null,
      breadcrumb:
        base.route.meta?.breadcrumb && Array.isArray(base.route.meta?.breadcrumb) ? base.route.meta?.breadcrumb : [],
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
      courseInterest: {
        isLoading: false,
        queryParams: {
          page: 1,
          pageSize: 3,
          isDifferentCourseId: base.route.params.id as string,
        },
        items: [],
      },
      registerCourse: { name: '', phone: '', email: '', note: '' },
      dialogRegister: false,
      confirmRegisterSuccess: false,
      rank: {
        isLoading: true,
        queryParams: {
          page: 1,
          pageSize: 10,
        },
        listRank: [],
        myRank: null,
        typeRank: RankTypeEnum.ALL,
        tableRank: TableRankEnum.COURSE,
        total: null,
      },
      dialogDownload: false,
      isViewMore: true,
      isHide: false,
      maxPage: 100,
    });
    if (base.route.query && base.route.query.activeTab && typeof base.route.query.activeTab === 'string') {
      data.activeTab = base.route.query.activeTab;
      activeIndex = base.route.query.activeTab;
    } else {
      data.activeTab = PropskillDetailPageSection.DETAIL;
      activeIndex = PropskillDetailPageSection.DETAIL;
    }

    const getUserData = async () => {
      data.isLoading = true;
      try {
        const model: any = await findCurrentEmployee();
        data.registerCourse = {
          name: model.name,
          phone: model.phone,
          email: model.email,
          note: '',
        };
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
        data.instructors = data.course?.instructors || null;
        data.histories = data.course?.histories || null;
        data.breadcrumb[2] = {
          text: responseCourse?.result.name,
          routeName: 'propskill-detail-course',
          params: { id: data.courseId },
        };
      } finally {
        setTimeout(() => {
          data.isLoading = false;
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

    const loadCourseInterest = async () => {
      // Get course interest
      data.courseInterest.isLoading = true;
      try {
        if (data.course) {
          if (!data.course.categories || data.course.categories.length === 0) {
            return;
          }
          data.courseInterest.queryParams.typeStudy = data.course.typeStudy;
          data.courseInterest.queryParams.pageSize = data.course.typeStudy === StudyTypeEnum.OFFLINE ? 4 : 3;
          if (data.course.categories && Array.isArray(data.course.categories)) {
            data.courseInterest.queryParams.category = data.course.categories
              .filter((doc) => doc.id)
              .map((doc) => doc.id)
              .join(';');
          }
        }
        const responseCourseOnline = await findAllCourse(data.courseInterest.queryParams);
        data.courseInterest.items = responseCourseOnline?.result || null;
      } finally {
        setTimeout(() => {
          data.courseInterest.isLoading = false;
        }, 300);
      }
    };

    const getTableRank = async () => {
      data.isViewMore = true;
      data.rank.queryParams.page = 1;
      data.rank.listRank = [];
      const paramUser: any = {};
      if (data.activeDay !== RankTypeEnum.ALL) {
        paramUser.type = data.activeDay;
      }
      if (data.activeType === TableRankEnum.COURSE) {
        paramUser.courseId = data.courseId;
      }
      const paramTable = {
        ...data.rank.queryParams,
        ...paramUser,
      };
      // Get rank
      data.rank.isLoading = true;
      try {
        const res = await Promise.all([rankTopPropskill(paramTable), rankUserPropskill(paramUser)]);
        if (res[0]?.result && Array.isArray(res[0]?.result.rows)) {
          data.rank.listRank = res[0]?.result.rows;
          data.rank.total = res[0]?.result.total;
          if (res[0]?.result.rows.length < 10 || data.rank.total === 10) {
            data.isViewMore = false;
          }
        }
        if (res[1]?.result) {
          data.rank.myRank = res[1]?.result;
        }
      } finally {
        setTimeout(() => {
          data.rank.isLoading = false;
        }, 500);
      }
      data.rank = { ...data.rank };
    };

    const getMoreRank = async () => {
      const paramUser: any = {};
      if (data.activeDay !== RankTypeEnum.ALL) {
        paramUser.type = data.activeDay;
      }
      if (data.activeType === TableRankEnum.COURSE) {
        paramUser.courseId = data.courseId;
      }
      const paramTable = {
        ...data.rank.queryParams,
        ...paramUser,
      };
      // Get rank
      data.rank.isLoading = true;
      try {
        const res = await rankTopPropskill(paramTable);
        if (res?.result && Array.isArray(res?.result.rows)) {
          data.rank.listRank = res?.result.rows;
          if (
            res?.result.rows.length < 10 ||
            data.rank.listRank.length === data.maxPage ||
            data.rank.listRank.length === data.rank.total
          ) {
            data.isViewMore = false;
            data.isHide = true;
          }
        }
      } finally {
        setTimeout(() => {
          data.rank.isLoading = false;
        }, 500);
      }
      data.rank = { ...data.rank };
    };

    const getMasterDataMaxPage = async () => {
      const res: any = await getMasterData();
      data.maxPage = res.data.maximumCount;
    };

    const initPage = async () => {
      await Promise.all([
        loadDetailCourse(),
        loadHistoryStudy(),
        loadLesonNotPass(),
        getUserData(),
        getMasterDataMaxPage(),
      ]);
      getTableRank();
      loadCourseInterest();
    };

    // Chuyển tab
    const switchTab = (activeTab: string) => {
      data.activeTab = activeTab;
      // Add query param to url
      if (activeTab === PropskillDetailPageSection.RANK) {
        data.activeDay = RankTypeEnum.ALL;
        data.activeType = TableRankEnum.COURSE;
        getTableRank();
      }
      if (base.route.name) {
        if (activeTab === PropskillDetailPageSection.RANK) {
          base.router.replace({
            name: base.route.name.toString(),
            params: { id: data.courseId },
            query: { activeTab: data.activeTab, activeType: data.activeType, activeDay: data.activeDay },
          });
        } else {
          base.router.replace({
            name: base.route.name.toString(),
            params: { id: data.courseId },
            query: { activeTab: data.activeTab },
          });
        }
      }
    };
    const onViewMore = () => {
      window.scrollTo(0, 0);
      if (data.isHide) {
        data.rank.queryParams.pageSize = 10;
        data.isViewMore = true;
      } else {
        data.rank.queryParams.pageSize = data.maxPage;
      }
      data.isHide = false;
      getMoreRank();
    };

    // Life cycle event
    onMounted(async () => {
      // Load query param from url
      if (base.route.query && base.route.query.activeType && typeof base.route.query.activeType === 'string') {
        data.activeType = base.route.query.activeType;
      }
      if (base.route.query && base.route.query.activeDay && typeof base.route.query.activeDay === 'string') {
        data.activeDay = base.route.query.activeDay;
      }
      if (base.route.query && base.route.query.needPayment && typeof base.route.query.needPayment === 'string') {
        base.router.push({
          name: 'propskill-detail-course',
          params: { id: data.courseId },
        });
        data.dialogDownload = true;
      }
      await initPage();
    });

    const handleLike = async () => {
      if (data?.course) {
        const responeLike = await favoriteCourse(data.courseId);
        if (responeLike && responeLike.isSuccess) {
          data.course.isFavorite = !data.course.isFavorite;
        }
      }
    };

    // Ẩn/hiện dialog edit
    const toggleDialogRegister = (isVisible: boolean) => {
      data.dialogRegister = isVisible;
    };

    const formValidation = yup.object().shape({
      name: yup.string().label('Họ và tên').required('Vui lòng nhập họ và tên!'),
      phone: yup.string().label('Số điện thoại').required('Vui lòng nhập số điện thoại!'),
      email: yup.string().label('Email').required('Vui lòng nhập email!'),
    });

    const handleSubmitEdit = async (values: { name: string; phone: string; email: string; note: string }) => {
      toggleDialogRegister(false);
      if (data.courseId) {
        const model = {
          courseId: data.courseId,
          name: values.name,
          phone: values.phone,
          email: values.email,
          note: values.note,
        };
        // Get course Online
        data.isLoading = true;
        try {
          await registerCourse(model);
          if (data?.course) {
            data.course.status = StatusRegisterEnum.NOT_ADVISED;
          }
        } finally {
          setTimeout(() => {
            data.isLoading = false;
            data.confirmRegisterSuccess = true;
          }, 500);
        }
      }
    };

    const closeConfirm = async () => {
      data.confirmRegisterSuccess = false;
      base.router.push({
        name: 'propskill-list',
        query: { activeTab: PropSkillTabEnum.COURSE_OFFLINE, typeGet: PropskillDataGet.OFFLINE_REGISTER },
      });
    };

    const goToStudyProgress = async () => {
      base.router.push({ name: 'propskill-progess-lesson', params: { id: data.courseId } });
    };

    // Chuyển tab
    const switchType = (activeType: TableRankEnum) => {
      if (data.activeType === activeType) {
        return;
      }
      data.activeType = activeType;
      // Add query param to url
      if (base.route.name) {
        base.router.replace({
          name: base.route.name.toString(),
          params: { id: data.courseId },
          query: { activeTab: data.activeTab, activeType: data.activeType, activeDay: data.activeDay },
        });
      }
      data.rank.queryParams.pageSize = 10;
      data.isViewMore = true;
      data.isHide = false;
      getTableRank();
    };
    // Chuyển tab
    const switchDay = (activeDay: RankTypeEnum) => {
      if (data.activeType === activeDay) {
        return;
      }
      data.activeDay = activeDay;
      data.rank.queryParams.pageSize = 10;
      data.isViewMore = true;
      data.isHide = false;
      // Add query param to url
      getTableRank();
      // Add query param to url
      if (base.route.name) {
        base.router.replace({
          name: base.route.name.toString(),
          params: { id: data.courseId },
          query: { activeTab: data.activeTab, activeType: data.activeType, activeDay: data.activeDay },
        });
      }
    };

    const downloadAPP = () => {
      data.dialogDownload = true;
    };

    const closeDialog = () => {
      data.dialogDownload = false;
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
      isLoggedIn,
      data,
      activeIndex,
      PropskillDetailPageSection,
      // Form
      formValidation,
      // Function
      switchTab,
      switchType,
      switchDay,
      handleLike,
      toggleDialogRegister,
      handleSubmitEdit,
      StatusRegisterEnum,
      StudyTypeEnum,
      FreeTypeEnum,
      convertNumberToWord,
      closeConfirm,
      StatusPaymentEnum,
      goToStudyProgress,
      parseToMoney,
      downloadAPP,
      closeDialog,
      onViewMore,
      formatNumberWithDot,
      showPopupIntructor,
      childUserLearn,
    };
  },
});
</script>
