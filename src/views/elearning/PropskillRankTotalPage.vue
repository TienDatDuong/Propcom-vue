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
    <div class="container-content">
      <el-row>
        <el-col v-if="data.isLoading" :span="17" class="content-detail">
          <div class="mid-box-left-skeleton">
            <div class="card__body-skeleton"></div>
            <div class="section-skeleton">
              <div class="title-skeleton"></div>
              <div class="person-skeleton"></div>
              <div class="peak-skeleton"></div>
              <div class="person-skeleton"></div>
              <div class="person-skeleton"></div>
              <div class="person-skeleton"></div>
              <div class="person-skeleton"></div>
              <div class="btn-more-skeleton"></div>
            </div>
          </div>
        </el-col>
        <el-col v-else :span="17" class="content-detail">
          <el-card class="box-card" shadow="never">
            <div class="group-tag">
              <div
                class="filter-tag"
                v-for="(item, index) in Constant.DAY_FILTER"
                :key="index"
                :virtualIndex="index"
                :class="{ active: item.key === data.activeTab }"
                @click="switchTab(item.key)"
              >
                <span>{{ item.title }}</span
                ><span class="active-icon-course"></span>
              </div>
            </div>
          </el-card>
          <div class="lesson-rank">
            <div v-if="data.myRank?.position || data?.listRank?.length" class="section">
              <div v-if="data.myRank?.user && data.myRank?.position">
                <div class="title">Xếp hạng của bạn:</div>
                <div class="section-people">
                  <div class="header">
                    <div class="header-people">
                      <div class="number">{{ data.myRank?.position }}</div>
                      <img
                        v-if="data.myRank?.user?.avatarUrl?.length > 0"
                        class="img-people"
                        :src="data.myRank?.user?.avatarUrl"
                        alt="image"
                        @click="showDetailUser(data.myRank?.user)"
                      />
                      <img
                        v-else
                        class="img-people"
                        src="~@/assets/images/avatar-default-propskill.png"
                        @click="showDetailUser(data.myRank?.user)"
                      />

                      <div class="header-name">
                        <div class="name-user">{{ data.myRank?.user?.name }}</div>
                        <div class="name-rank">{{ data.myRank?.title?.title }}</div>
                      </div>
                    </div>
                    <div class="point">
                      <div>{{ parseToMoney(data.myRank?.point) }}</div>
                      <div>
                        <img class="icon-gem" src="~@/assets/images/point-gem-icon.png" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- top1 -->
              <div v-for="(item, index) in data.listRank" :key="index" :virtualIndex="index">
                <div class="section-peak" v-if="index === 0">
                  <div class="peak">
                    <div><img class="icon-rank" :src="Constant.RANK_BOARD[0].icon" /></div>
                    <div class="peak-people">
                      <div
                        class="first-rank"
                        :style="{
                          'background-image': 'url(' + Constant.RANK_BOARD[0].background + ')',
                        }"
                      >
                        <img
                          v-if="item?.user?.avatarUrl?.length"
                          class="img-top-one"
                          :src="item?.user?.avatarUrl"
                          alt="image"
                          @click="showDetailUser(item?.user)"
                        />
                        <img
                          v-else
                          class="img-top-one"
                          src="~@/assets/images/avatar-default-propskill.png"
                          @click="showDetailUser(item?.user)"
                        />
                      </div>
                      <div class="peak-name">{{ item?.user?.name }}</div>
                      <div class="peak-rank">
                        <div class="peak-rank-name">{{ item.title?.title }}</div>
                      </div>
                    </div>
                    <div class="point-peak">
                      <div class="peak-icon"><img class="icon-gem" src="~@/assets/images/point-gem-icon.png" /></div>
                      <div>{{ parseToMoney(item.point) }}</div>
                    </div>
                  </div>
                </div>
                <div class="section-list" v-else>
                  <!-- top2 -->
                  <div class="person" v-if="index === 1">
                    <div class="info-person">
                      <div><img class="icon-rank" :src="Constant.RANK_BOARD[1].icon" /></div>
                      <div
                        class="others-rank"
                        :style="{
                          'background-image': 'url(' + Constant.RANK_BOARD[1].background + ')',
                        }"
                      >
                        <img
                          v-if="item?.user?.avatarUrl?.length"
                          class="img-others"
                          :src="item?.user?.avatarUrl"
                          alt="image"
                          @click="showDetailUser(item?.user)"
                        />
                        <img
                          v-else
                          class="img-others"
                          src="~@/assets/images/avatar-default-propskill.png"
                          @click="showDetailUser(item?.user)"
                        />
                      </div>
                      <div class="header-name">
                        <div class="username">{{ item?.user?.name }}</div>
                        <div class="name-rank">{{ item.title?.title }}</div>
                      </div>
                    </div>
                    <div class="point">
                      <div>{{ parseToMoney(item.point) }}</div>
                      <div><img class="icon-gem" src="~@/assets/images/point-gem-icon.png" /></div>
                    </div>
                  </div>
                  <!-- top other -->
                  <div class="person" v-else-if="index === 2">
                    <div class="info-person">
                      <div><img class="icon-rank" :src="Constant.RANK_BOARD[2].icon" /></div>
                      <div
                        class="others-rank"
                        :style="{
                          'background-image': 'url(' + Constant.RANK_BOARD[2].background + ')',
                        }"
                      >
                        <img
                          v-if="item?.user?.avatarUrl?.length > 0"
                          class="img-others"
                          :src="item?.user?.avatarUrl"
                          alt="image"
                          @click="showDetailUser(item?.user)"
                        />
                        <img
                          v-else
                          class="img-others"
                          src="~@/assets/images/avatar-default-propskill.png"
                          @click="showDetailUser(item?.user)"
                        />
                      </div>
                      <div class="header-name">
                        <div class="username">{{ item?.user?.name }}</div>
                        <div class="name-rank">{{ item?.title?.title }}</div>
                      </div>
                    </div>
                    <div class="point">
                      <div>{{ parseToMoney(item.point) }}</div>
                      <div><img class="icon-gem" src="~@/assets/images/point-gem-icon.png" /></div>
                    </div>
                  </div>
                  <div class="person" v-else>
                    <div class="info-person">
                      <div class="order">{{ index + 1 }}</div>
                      <img
                        v-if="item?.user?.avatarUrl?.length > 0"
                        class="img-others"
                        :src="item?.user?.avatarUrl"
                        alt="image"
                        @click="showDetailUser(item?.user)"
                      />
                      <img
                        v-else
                        class="img-others"
                        src="~@/assets/images/avatar-default-propskill.png"
                        @click="showDetailUser(item?.user)"
                      />
                      <div class="header-name">
                        <div class="username">{{ item?.user?.name }}</div>
                        <div v-if="item?.title?.title">
                          <div class="name-rank">{{ item?.title?.title }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="point">
                      <div>{{ parseToMoney(item.point) }}</div>
                      <div><img class="icon-gem" src="~@/assets/images/point-gem-icon.png" /></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="button-more" v-if="data.isViewMore || data.isHide">
                <button class="btn-more" @click="onViewMore">{{ data.isHide ? 'ẩn bớt' : 'xem thêm' }}</button>
              </div>
            </div>
            <template v-else>
              <AppEmptyComponent class="empty" title="Chưa có bảng xếp hạng">
                <img src="@/assets/images/status-empty.png" />
              </AppEmptyComponent>
            </template>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="profile">
            <PropskillCourseProfileComponent
              :isLoading="data.currentHistory.isLoading"
              :modelValue="data.currentHistory?.data"
            />
            <PropskillBannerLessonComponent
              class="banner"
              :modelValue="data.lessonNotPass.items"
              :isLoading="data.lessonNotPass.isLoading"
            />
            <PropskillCourseSuggestionComponent
              class="suggest"
              :isLoading="data.courseInterest.isLoading"
              :modelValue="data.courseInterest.items"
            />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
  <UserDetailDialog v-model="data.dataSource" v-model:visible="data.dialogUserDetailVisible" />
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

.container-content {
  width: 1200px;
  margin: 0 auto;
}
::v-deep .el-menu-item {
  padding-left: 0 !important;
  margin-right: 34px;
}
.list-category-head {
  width: 100%;
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.06);
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
  justify-content: center;
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

.name-user {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 15px;
  text-transform: uppercase;
  color: #0f0f0f;
}
.button-more {
  display: flex;
  justify-content: center;
}
.btn-more {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 110%;
  text-align: center;
  text-transform: uppercase;
  color: #0f0f0f;
  background: #f2f2f2;
  border-radius: 5px;
  border: none;
  padding: 16px 133px 14px 132px;
  margin: 20px 0 30px 0;
  &:hover {
    background: #dedede;
  }
}
.order {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  color: #dd0000;
  width: 25px;
}
.peak-icon {
  display: flex;
  justify-content: center;
}
.point-peak {
  display: grid;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #0f0f0f;
}
.point {
  display: flex;
  flex-direction: row;
}
.icon-gem {
  width: 16px;
  height: 16px;
}
.icon-rank {
  width: 25px;
  height: 30px;
}
.first-rank,
.others-rank {
  width: 160px;
  height: 95px;
  background-size: 160px 95px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-position: center;
  background-repeat: no-repeat;
}
.others-rank {
  width: 42px;
  height: 55px;
  background-size: 42px 55px;
}
.lesson-rank {
  margin-top: 20px;
}
.section {
  background: #ffffff;
  border: 1px solid #f2f2f2;
  border-radius: 10px;
  margin-bottom: 20px;
}
.title {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 130%;
  text-align: center;
  color: #dd0000;
  margin-top: 20px;
}
.section-people {
  border-bottom: 1px solid #f2f2f2;
}
.img-people {
  width: 42.78px;
  border-radius: 100%;
  border: 2px solid #ff7f76;
  padding: 1px;
}
.img-top-one {
  margin-top: 2.54px;
  width: 59.24px;
  height: 59.24px;
  border-radius: 100%;
}
.img-others {
  margin: 9px 1px 5px 2px;
  width: 35px;
  height: 35px;
  border-radius: 100%;
}
.img-people,
.img-top-one,
.img-others {
  cursor: pointer;
}
.header {
  display: flex;
  justify-content: space-between;
  background: #fff5f4;
  border-radius: 10px;
  padding: 10px 20px 10px 10px;
  align-items: center;
  margin: 10px 27.5px 20px 27.5px;
}
.header-people {
  display: flex;
  align-items: center;
  gap: 14px;
}
.number {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  color: #dd0000;
  margin-bottom: 0px;
}
.header-name h1 {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 15px;
  text-transform: uppercase;
  color: #0f0f0f;
}
.username {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 15px;
  text-transform: uppercase;

  color: #0f0f0f;
}
.name-rank {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 120%;
  color: #dd0000;
  background: #ffeeed;
  border-radius: 100px;
  padding: 2px 8px;
  display: inline-block;
}
.point {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  color: #0f0f0f;
}

.peak {
  display: flex;
  justify-content: space-between;
  padding: 20px 0px 10px;
  align-items: center;
  border-bottom: 1px solid #f2f2f2;
  margin: 0 27.5px;
}
.peak-people {
  align-content: center;
}
.peak-name {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 15px;
  text-align: center;
  text-transform: uppercase;

  color: #0f0f0f;
  margin-top: 8px;
}
.peak-rank {
  display: flex;
  justify-content: center;
}
.peak-rank-name {
  margin-top: 3px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 120%;
  color: #dd0000;
  background: #ffeeed;
  border-radius: 100px;
  padding: 2px 8px;
  display: inline-block;
  text-align: center;
}

.person {
  display: flex;
  justify-content: space-between;
  margin: 18px 27.5px 0px;
  border-bottom: 1px solid #f2f2f2;
  align-items: center;
  padding-bottom: 15px;
}
.info-person {
  display: flex;
  align-items: center;
  gap: 14px;
}
.img-person {
  width: 42.78px;
  border-radius: 100%;
}
.empty {
  background: #ffffff;
  border: 1px solid #f2f2f2;
  border-radius: 10px;
  margin-bottom: 20px;
}
.empty img {
  width: 301px;
  height: 164px;
}
.filter-tag {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 7px 12px;
  gap: 10px;
  background: #fafafa;
  border-radius: 100px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 130%;
  color: #a7a7a7;
  cursor: pointer;
}

.filter-tag.active {
  background: #ffeeed;
  color: #fb4d4d !important;
}

.icon {
  width: 13px;
  height: 14px;
  background-size: 13px 14px;
  background-repeat: no-repeat;
  background-position: center;
}
.box-card {
  height: 59px;
  border-radius: 10px;
  margin: 30px 0 20px 0;
}
::v-deep .el-card__body {
  padding: 0;
}
.group-tag {
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin: 13px 0 0 20px;
}
.active-icon-course {
  background-image: url('~@/assets/images/rank/date-inactive.png');
  width: 13px;
  height: 14px;
  background-size: 13px 14px;
  background-repeat: no-repeat;
  background-position: center;
}
.active .active-icon-course {
  background-image: url('~@/assets/images/rank/date-active.png');
  width: 13px;
  height: 14px;
  background-size: 13px 14px;
  background-repeat: no-repeat;
  background-position: center;
}
.border-side {
  padding-right: 20px;
  border-right: 2px solid #d6d6d6;
}
.inactive-border {
  padding-right: 0;
  border-style: none;
}
.active .border-side {
  color: #0f0f0f;
}
.button-more {
  display: flex;
  justify-content: center;
}
.btn-more {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 110%;
  text-align: center;
  text-transform: uppercase;
  color: #0f0f0f;
  background: #f2f2f2;
  border-radius: 5px;
  border: none;
  padding: 16px 133px 14px 132px;
  margin: 20px 0 30px 0;
}

.el-card__body-skeleton,
.card__body-skeleton,
.content-text-skeleton,
.course-info-skeleton,
.title-skeleton,
.person-skeleton,
.peak-skeleton,
.btn-more-skeleton,
.swiper-wrapper-skeleton {
  color: transparent;
  appearance: none;
  -webkit-appearance: none;
  background-color: #eee;
  border-color: #eee;
}
.mid-box-left-skeleton {
  height: 100%;
  width: 833px;
  margin-top: 30px;
}
.card__body-skeleton {
  border-radius: 10px;
  height: 59px;
  margin-bottom: 15px;
}
.section-skeleton {
  border-radius: 10px;
  border: 2px solid #eee;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  padding: 20px;
  margin-bottom: 50px;
}
.title-skeleton {
  height: 18px;
  margin: 18px 0px;
  width: 30%;
}
.person-skeleton {
  height: 62px;
  border-radius: 10px;
  width: 100%;
  margin: 10px 0;
}
.peak-skeleton {
  height: 170px;
  padding: 0 -20px;
  width: 100%;
}
.btn-more-skeleton {
  height: 44px;
  width: 330px;
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, onMounted } from 'vue';
import {
  findCourse,
  rankTopPropskill,
  rankUserPropskill,
  findUserDetail,
} from '@/services/features/elearning/elearning.service';
import { ApiRequestPaging } from '@/models/api-request';
import { CourseModel, HistoryStudyModel, UserLessonModel } from '@/services/features/elearning/elearning.model';
import { getHistorySutdy, findLessonNotPassExam } from '@/services/features/elearning/elearning.service';
import PropskillCourseProfileComponent from '@/components/features/elearning/PropskillCourseProfileComponent.vue';
import { useInit, convertNumberToWord, parseToMoney } from '@/services/shared/utils';
import { RankTypeEnum } from '@/services/shared/enum';
import { Constant } from '@/services/shared/constant';
import { getMasterData } from '@/services/features/master-data/master-data.service';

class PropskillRankCoursePageData {
  isLoading: boolean;
  activeTab: RankTypeEnum | string;
  queryParams: ApiRequestPaging;
  listRank: any[];
  myRank: any;
  breadcrumb: any;
  dataSource: any;
  dialogUserDetailVisible: any;
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
  isViewMore: boolean;
  isHide: boolean;
  maxPage: any;
}

export default defineComponent({
  name: 'PropskillRankTotalPage',
  components: {
    PropskillCourseProfileComponent,
  },
  setup() {
    // Setup Default
    const { base, isLoggedIn } = useInit();
    let activeIndex = '';
    const data = reactive<PropskillRankCoursePageData>({
      isLoading: true,
      activeTab: RankTypeEnum.ALL,
      queryParams: {
        page: 1,
        pageSize: 10,
      },
      listRank: [],
      dataSource: null,
      myRank: null,
      dialogUserDetailVisible: false,
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
      isViewMore: true,
      isHide: false,
      maxPage: 100,
    });

    if (base.route.query && base.route.query.activeTab && typeof base.route.query.activeTab === 'string') {
      data.activeTab = base.route.query.activeTab;
      activeIndex = base.route.query.activeTab;
    } else {
      data.activeTab = RankTypeEnum.ALL;
    }

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
        const responseCourseOnline = await findCourse(data.courseInterest.queryParams);
        data.courseInterest.items = responseCourseOnline?.rows || null;
      } finally {
        setTimeout(() => {
          data.courseInterest.isLoading = false;
        }, 300);
      }
    };

    const getTableRank = async () => {
      data.isViewMore = true;
      data.queryParams.page = 1;
      data.listRank = [];
      const paramUser: any = {};
      if (data.activeTab !== RankTypeEnum.ALL) {
        paramUser.type = data.activeTab;
      }
      const paramTable = {
        ...data.queryParams,
        ...paramUser,
      };
      // Get rank
      data.isLoading = true;
      try {
        const res = await Promise.all([rankTopPropskill(paramTable), rankUserPropskill(paramUser)]);
        if (res[0]?.result && Array.isArray(res[0]?.result.rows)) {
          data.listRank = res[0]?.result.rows;
        }
        if (res[0]?.result.rows.length < 10 || res[0]?.result.total === 10) {
          data.isViewMore = false;
        }
        if (res[1]?.result) {
          data.myRank = res[1]?.result;
        }
      } finally {
        setTimeout(() => {
          data.isLoading = false;
        }, 300);
      }
    };

    const getMoreRank = async () => {
      const paramUser: any = {};
      if (data.activeTab !== RankTypeEnum.ALL) {
        paramUser.type = data.activeTab;
      }
      const paramTable = {
        ...data.queryParams,
        ...paramUser,
      };
      // Get rank
      data.isLoading = true;
      try {
        const res = await rankTopPropskill(paramTable);
        if (res?.result && Array.isArray(res?.result.rows)) {
          data.listRank = res?.result.rows;
          if (
            res?.result.rows.length < 10 ||
            data.listRank.length === data.maxPage ||
            data.listRank.length === res?.result.total
          ) {
            data.isViewMore = false;
            data.isHide = true;
          }
        }
      } finally {
        setTimeout(() => {
          data.isLoading = false;
        }, 300);
      }
    };

    const onViewMore = () => {
      window.scrollTo(0, 0);
      if (data.isHide) {
        data.queryParams.pageSize = 10;
        data.isViewMore = true;
      } else {
        data.queryParams.pageSize = data.maxPage;
      }
      data.isHide = false;
      getMoreRank();
    };
    const getMasterDataMaxPage = async () => {
      const res: any = await getMasterData();
      data.maxPage = res.data.maximumCount;
    };
    const initPage = async () => {
      await Promise.all([loadHistoryStudy(), loadLesonNotPass(), loadCourseInterest(), getMasterDataMaxPage()]);
      getTableRank();
    };

    // Chuyển tab
    const switchTab = (activeTab: string) => {
      if (data.activeTab === activeTab) {
        return;
      }
      data.activeTab = activeTab;
      if (base.route.name) {
        base.router.replace({
          name: base.route.name.toString(),
          query: { activeTab: data.activeTab },
        });
      }
      getTableRank();
    };
    const loadUserDetail = async (id: string) => {
      const res = await findUserDetail(id);
      data.dataSource = res;
    };
    const showDetailUser = (dataUser: any) => {
      loadUserDetail(dataUser.id);
      data.dialogUserDetailVisible = true;
    };

    // Life cycle event
    onMounted(async () => {
      // Load query param from url
      if (base.route.query && base.route.query.activeTab && typeof base.route.query.activeTab === 'string') {
        data.activeTab = base.route.query.activeTab;
      }
      await initPage();
    });

    return {
      isLoggedIn,
      data,
      activeIndex,
      // Function
      switchTab,
      convertNumberToWord,
      Constant,
      parseToMoney,
      onViewMore,
      showDetailUser,
    };
  },
});
</script>
