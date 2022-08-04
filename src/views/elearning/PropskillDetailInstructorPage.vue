<template>
  <div class="topic-page-header">
    <div class="topic-page-header__breadcrumb" v-if="data.breadcrumb?.length > 0">
      <template v-for="(item, index) in data.breadcrumb" :key="index">
        <router-link :to="{ name: item.routeName, params: item.params }">{{ item.text }}</router-link>
        <span v-if="index !== data.breadcrumb.length - 1"> / </span>
      </template>
    </div>
  </div>

  <div class="list-category" v-if="data.isLoading || data?.instructor">
    <div v-if="data.isLoading">
      <div class="header-skeleton">
        <div class="info-detail-skeleton">
          <div class="img-people-skeleton"></div>
          <div class="info-name-skeleton">
            <div class="full-name-skeleton"></div>
            <div class="info-des-skeleton"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="list-category-head">
      <div class="info-detail">
        <div class="img-people" @click="showDetailUser(data?.instructor.userInfo)">
          <img
            v-if="data?.instructor.userInfo.avatarUrl.length"
            :src="data?.instructor.userInfo.avatarUrl"
            alt="image"
          />
          <img v-else src="~@/assets/images/avatar-default-propskill.png" />
        </div>
        <div class="info-name">
          <div class="speaker-name">
            <div class="full-name">{{ data?.instructor.userInfo?.name }}</div>
            <div class="position">{{ data?.instructor.userInfo?.role?.name }}</div>
          </div>
          <div class="center-border"></div>
          <div class="info-des">
            <div class="info-number">
              <div class="number-detail" v-if="data?.instructor.coursesParticipated.length">
                <img src="~@/assets/images/studying-profile-icon.png" class="book-icon" />
                <span>
                  {{ data?.instructor.coursesParticipated.length }}
                  khóa học
                </span>
              </div>
              <div class="number-detail" @click="showPopupUserLearn" v-if="data?.instructor.countLearners">
                <img src="~@/assets/images/user-fill.png" class="user-icon" />{{ data?.instructor.countLearners }}
                người học
              </div>
            </div>
            <div class="group-btn">
              <router-link :to="{ name: 'propskill-course-instructor', params: data.instructorId }">
                <el-button text class="btn-join">Đăng ký học ngay</el-button>
              </router-link>
              <el-button
                v-if="data.instructor?.isFavorite"
                @click="handleLike(false)"
                text
                class="btn-like"
              ></el-button>
              <el-button
                v-if="!data.instructor?.isFavorite"
                @click="handleLike(true)"
                text
                class="btn-dislike"
              ></el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="group-suggest-page">
    <el-row>
      <el-col :span="17" class="speaker">
        <PropskillSpeakerDetailComponent
          :modelValueSpeaker="data.instructor"
          :modelValueCourse="data.course.items"
          :isLoading="data.isLoading"
        />
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
        </div>
      </el-col>
    </el-row>
  </div>
  <el-dialog v-model="data.dialogUserStudy" width="833px" custom-class="app-dialog">
    <template #title>
      <span class="app-dialog-title">Danh sách người học </span>
    </template>
    <div style="text-align: center; margin-top: 20px">
      <div class="search-user">
        <div class="icon-search"><img src="~@/assets/images/search.svg" /></div>
        <div class="input-search">
          <input v-model="data.userLearns.searchText" placeholder="Tìm kiếm" type="text" @change="onChange" />
        </div>
      </div>
    </div>
    <div class="list-checkbox" ref="scrollComponent" v-loading="data.userLearns.isLoading">
      <div class="app-dialog-content" v-if="data.userLearns.items?.length || data.userLearns.isLoading">
        <div class="person" v-for="(item, index) in data.userLearns.items" :key="index" :virtualIndex="index">
          <div class="info-person">
            <div class="others-rank" @click="showDetailUser(item)">
              <img v-if="item?.avatarUrl?.length" class="img-others" :src="item?.avatarUrl" alt="image" />
              <img v-else class="img-others" src="~@/assets/images/avatar-default-propskill.png" />
            </div>
            <div class="header-name">
              <div class="username">{{ item.name }}</div>
              <div class="user-time-join">Ngày tham gia: {{ formatDate(item.createdDate, 'dd/MM/yyyy') }}</div>
              <div class="user-status">{{ EmployeeStatusTransEnum[item.status] }}</div>
            </div>
          </div>
        </div>
      </div>
      <template v-else>
        <AppEmptyComponent class="empty" title="Không có dữ liệu">
          <img src="@/assets/images/status-empty.png" />
        </AppEmptyComponent>
      </template>
    </div>
  </el-dialog>
  <UserDetailDialog
    v-model="data.dataSource"
    @update:visible="onVisible"
    v-model:visible="data.dialogUserDetailVisible"
  />
</template>

<style lang="scss" scoped>
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
.speaker-name {
  margin-top: 25px;
}
.group-suggest-page {
  //padding-top: 50px;
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
.banner {
  margin-top: 20px;
  margin-bottom: 20px;
}
.suggest {
  margin-bottom: 30px;
}

//
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
  width: auto;
  max-height: 800px;
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
  width: 1200px;
  display: flex;
  justify-content: space-between;
}
.img-people {
  margin: 29px 20px 39px 0;
  cursor: pointer;
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
}
.position {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #5a5a5a;
}
.number-detail {
  background: #ffeeed;
  border-radius: 100px;
  padding: 0 10px 0 6px;
  display: flex;
  align-items: center;
  height: 28px;
  cursor: pointer;
}
.info-name {
  width: 100%;
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
}

.img-certificate {
  background-color: #fafafa;
  margin: 20px 30px 30px 30px;
}

.img-certificate img {
  display: block;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
/* .img-certificate img:active {
  -webkit-transform: scale(2.5);
  transform: scale(2.5);
  cursor: zoom-out;
} */
.description-course ::v-deep(p) {
  margin-bottom: 0px !important;
}

.description-course ::v-deep(body) {
  margin: 0 !important;
  :first-of-type {
    margin-top: 0 !important;
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

//
.group-suggest-page {
  width: 1200px;
  margin: 0 auto;
  min-height: 740px;
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
.list-category {
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.06);
}
.list-category-head {
  width: 1200px;
  margin: 0 auto;
  //background: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  //box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.06);
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

.profile {
  width: 334px;
  padding: 30px 0 0 0;
  margin-left: 16px;
}

:v-deep .el-menu.el-menu--horizontal {
  border: none;
}
.group-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
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
  display: flex;
  justify-content: space-between;
}
.count {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  color: #0f0f0f;
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
}

.list-checkbox {
  height: calc(80vh - 175px);
  overflow: auto;
}
.list-checkbox::-webkit-scrollbar {
  width: 2px;
}
.person {
  display: flex;
  justify-content: space-between;
  margin: 0px 10px 0px;
  align-items: center;
  padding: 5px;
}
.info-person {
  display: flex;
  align-items: center;
  gap: 14px;
}
.info-person .header-name {
  text-align: left;
}
.others-rank {
  cursor: pointer;
}
.img-person {
  width: 42.78px;
  border-radius: 100%;
}
.img-others {
  margin: 9px 1px 5px 2px;
  width: 50px;
  height: 50px;
  border-radius: 100%;
}
.username {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 130%;
  text-transform: uppercase;
  color: #0f0f0f;
}
.user-time-join {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 130%;
  color: #5a5a5a;
}
.user-status {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 130%;
  color: #d6d6d6;
}
.search-user {
  height: 40px;
  display: flex;
  flex-direction: row;
  border-radius: 60px;
  background-color: #ffffff;
  overflow: hidden;
  box-shadow: 0px 10px 30px rgb(0 0 0 / 5%);
  margin: 18px 0px 0px 10px;
  background: #f2f2f2;
  padding: 5px;
  margin-bottom: 15px;
}
.icon-search {
  cursor: pointer;
  width: 40px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.input-search {
  width: 100%;
}
.input-search input {
  width: 100%;
  height: 100%;
  padding: 0 35px 0 5px;
  border: none;
  outline: none;
  background: #f2f2f2;
}

.app-dialog-content {
  padding-top: 10px;
}
.app-empty {
  min-height: unset;
  border: unset;
}

.empty {
  background: #ffffff;
  margin: 0 auto;
  height: calc(80vh - 195px) !important;
  margin-bottom: 20px;
}
.empty img {
  width: 301px;
  height: 164px;
}

//skeleton

.info-detail-skeleton {
  margin: 0 auto;
  width: 1200px;
  height: 155px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.img-people-skeleton {
  width: 87px;
  height: 87px;
  border-radius: 100%;
  padding: 2px;
}
.info-name-skeleton {
  display: flex;
  flex-direction: column;
}
.full-name-skeleton {
  height: 42px;
  width: 1085px;
  margin-bottom: 24px;
}
.info-des-skeleton {
  height: 60px;
  width: 1085px;
}
.img-people-skeleton,
.full-name-skeleton,
.info-des-skeleton,
.info-lable-skeleton,
.info-text-skeleton {
  color: transparent;
  appearance: none;
  -webkit-appearance: none;
  background-color: #eee;
  border-color: #eee;
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, onMounted, onUnmounted, ref, watch } from 'vue';
import { useInit, encapsulateUrl, formatDate } from '@/services/shared/utils';
import {
  getDetailInstructor,
  findAllCourse,
  getHistorySutdy,
  findLessonNotPassExam,
  findCourse,
  favoriteInstructor,
  listUserLearn,
} from '@/services/features/elearning/elearning.service';
import PropskillSpeakerDetailComponent from '@/components/features/elearning/PropskillSpeakerDetailComponent.vue';
import {
  CourseModel,
  HistoryStudyModel,
  InstructorModel,
  UserLessonModel,
} from '@/services/features/elearning/elearning.model';
import { ApiRequestPaging } from '@/models/api-request';
import { debounce } from 'lodash';
import { EmployeeStatusTransEnum } from '@/services/shared/enum';

class PropskillDetailInstructorPageData {
  isLoading: boolean;
  instructorId: string;
  instructor: InstructorModel | null;
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
  course: {
    isLoading: boolean;
    items: CourseModel[] | null;
  };
  dialogUserStudy: boolean;
  userLearns: {
    isLoading: boolean;
    queryParams: ApiRequestPaging;
    noHasItem: boolean;
    searchText: string;
    items: any[];
  };
  dialogUserDetailVisible: boolean;
  dataSource: any;
}

export default defineComponent({
  name: 'PropskillDetailInstructorPage',
  components: { PropskillSpeakerDetailComponent },
  setup() {
    // Setup Default
    const { base } = useInit();
    const data = reactive<PropskillDetailInstructorPageData>({
      isLoading: true,
      instructorId: base.route.params.id as string,
      instructor: null,
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
          isPopular: true,
        },
        items: [],
      },
      course: {
        isLoading: false,
        items: [],
      },
      dialogUserStudy: false,
      userLearns: {
        isLoading: false,
        queryParams: {
          page: 1,
          pageSize: 10,
        },
        noHasItem: false,
        searchText: '',
        items: [],
      },
      dataSource: null,
      dialogUserDetailVisible: false,
    });
    const scrollComponent = ref<any | null>();

    const initPage = async () => {
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

      // Get course interest
      data.courseInterest.isLoading = true;
      try {
        const responseCourseOnline = await findCourse(data.courseInterest.queryParams);
        data.courseInterest.items = responseCourseOnline?.rows || null;
      } finally {
        setTimeout(() => {
          data.courseInterest.isLoading = false;
        }, 300);
      }
      // Get course of speaker
      data.course.isLoading = true;
      try {
        const responseCourse = await findAllCourse({ instructorId: data.instructorId });
        data.course.items = responseCourse.result || null;
      } finally {
        setTimeout(() => {
          data.course.isLoading = false;
        }, 300);
      }
      // Get  info of speaker
      data.isLoading = true;
      try {
        const responseCourse = await getDetailInstructor(data.instructorId);
        data.instructor = responseCourse?.result || null;
      } finally {
        setTimeout(() => {
          data.isLoading = false;
        }, 300);
      }
    };

    const getDataUserLearn = async () => {
      data.userLearns.isLoading = true;
      try {
        if (data.userLearns.noHasItem || !data.instructorId) {
          return;
        }
        const queryParams = {
          ...data.userLearns.queryParams,
        };
        if (data.userLearns.searchText) {
          queryParams.q = data.userLearns.searchText;
        }
        const responeUserLearn = await listUserLearn(data.instructorId, queryParams);
        data.userLearns.items = data.userLearns.items.concat(responeUserLearn?.rows || []);
        if (!responeUserLearn?.rows || responeUserLearn?.rows.length < data.userLearns.queryParams.pageSize) {
          data.userLearns.noHasItem = true;
        }
      } finally {
        data.userLearns.isLoading = false;
      }
    };

    const handleScroll = (e: any) => {
      const element: any = scrollComponent.value;
      if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        data.userLearns.queryParams.page++;
        getDataUserLearn();
      }
    };

    const handleLike = async (isFavorite: boolean) => {
      const responeLike = await favoriteInstructor(data.instructorId, isFavorite);
      if (responeLike && responeLike.isSuccess && data.instructor) {
        data.instructor.isFavorite = !data.instructor.isFavorite;
      }
    };

    const onChange = debounce(() => {
      data.userLearns.queryParams.page = 1;
      data.userLearns.noHasItem = false;
      data.userLearns.items = [];
      getDataUserLearn();
    }, 300);

    const closeDialogUseLearn = () => {
      data.dialogUserStudy = false;
    };

    watch(
      () => scrollComponent.value,
      (newValue) => {
        if (newValue) {
          scrollComponent.value?.addEventListener('scroll', handleScroll);
        }
      }
    );
    const showPopupUserLearn = () => {
      data.dialogUserStudy = true;
    };

    const showDetailUser = (dataUser: any) => {
      data.dataSource = dataUser;
      data.dialogUserDetailVisible = true;
    };

    const onVisible = () => {
      if (data.dialogUserStudy) {
        document.body.classList.add('el-popup-parent--hidden');
      }
    };

    // Life cycle event
    onMounted(async () => {
      // Load query param from url
      await initPage();
      getDataUserLearn();
    });
    return {
      data,
      handleLike,
      onChange,
      formatDate,
      EmployeeStatusTransEnum,
      closeDialogUseLearn,
      showPopupUserLearn,
      showDetailUser,
      onVisible,
      scrollComponent,
    };
  },
});
</script>
