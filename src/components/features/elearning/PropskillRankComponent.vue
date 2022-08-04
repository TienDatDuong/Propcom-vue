<template>
  <div v-if="isLoading">
    <div class="mid-box-left-skeleton">
      <div class="card__body-skeleton"></div>
      <div class="day-filter-skeleton"></div>

      <div class="section-skeleton">
        <div class="title-skeleton"></div>
        <div class="person-skeleton"></div>
        <div class="peak-skeleton"></div>
        <div class="person-skeleton"></div>
        <div class="person-skeleton"></div>
        <div class="person-skeleton"></div>
        <div class="person-skeleton"></div>
        <div class="person-skeleton"></div>
        <div class="person-skeleton"></div>
        <div class="person-skeleton"></div>
        <div class="person-skeleton"></div>
        <div class="person-skeleton"></div>
        <div class="btn-more-skeleton"></div>
      </div>
    </div>
  </div>
  <div v-else>
    <el-card class="box-card" shadow="never">
      <div class="group-tag">
        <div
          class="filter-tag"
          v-for="(item, index) in Constant.RANK_FILTER"
          :key="index"
          :virtualIndex="index"
          :class="{ active: item.key === data.activeType }"
          @click="switchType(item.key)"
        >
          <span>{{ item.title }}</span
          ><span class="active-icon-course"></span>
        </div>
      </div>
    </el-card>
    <div class="group-day">
      <div
        class="filter-day"
        v-for="(item, index) in Constant.DAY_FILTER"
        :key="index"
        :virtualIndex="index"
        :class="{ active: item.key === data.activeDay }"
        @click="switchDay(item.key)"
      >
        <span class="border-side" :class="[index === Constant.DAY_FILTER.length - 1 ? 'inactive-border' : '']">{{
          item.title
        }}</span>
      </div>
    </div>
    <div class="lesson-rank">
      <div v-if="data.modelValue?.myRank?.position || data.modelValue?.listRank?.length" class="section">
        <div v-if="data.modelValue?.myRank?.user && data.modelValue?.myRank?.position">
          <div class="title">Xếp hạng của bạn:</div>
          <div class="section-people">
            <div class="header">
              <div class="header-people">
                <div class="number">{{ data.modelValue?.myRank?.position }}</div>
                <!-- <img class="img-people" :src="data.modelValue?.myRank?.user?.avatarUrl" alt="image" /> -->

                <img
                  v-if="data.modelValue?.myRank?.user?.avatarUrl?.length > 0"
                  class="img-people"
                  :src="data.modelValue?.myRank?.user?.avatarUrl"
                  alt="image"
                  @click="showDetailUser(data.modelValue?.myRank?.user)"
                />
                <img
                  v-else
                  class="img-people"
                  src="~@/assets/images/avatar-default-propskill.png"
                  @click="showDetailUser(data.modelValue?.myRank?.user)"
                />

                <div class="header-name">
                  <div class="name-user">{{ data.modelValue?.myRank?.user?.name }}</div>
                  <div class="name-rank">
                    {{ data.modelValue?.myRank?.title?.title }}
                  </div>
                </div>
              </div>
              <div class="point">
                <div>{{ parseToMoney(data.modelValue?.myRank?.point) }}</div>
                <div>
                  <img class="icon-gem" src="~@/assets/images/point-gem-icon.png" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- top1 -->
        <div v-for="(item, index) in data.modelValue?.listRank" :key="index" :virtualIndex="index">
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
                    @click="showDetailUser(item.user)"
                  />
                  <img v-else class="img-top-one" src="~@/assets/images/avatar-default-propskill.png" />
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
                    @click="showDetailUser(item.user)"
                  />
                  <img
                    v-else
                    class="img-others"
                    src="~@/assets/images/avatar-default-propskill.png"
                    @click="showDetailUser(item.user)"
                  />
                </div>
                <div class="header-name">
                  <div class="username">{{ item?.user?.name }}</div>
                  <div v-if="item?.title?.title">
                    <div class="name-rank">{{ item.title?.title }}</div>
                  </div>
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
            <div class="person" v-else>
              <div class="info-person">
                <div class="order">{{ index + 1 }}</div>
                <img
                  v-if="item?.user?.avatarUrl?.length > 0"
                  class="img-others"
                  :src="item?.user?.avatarUrl"
                  alt="image"
                  @click="showDetailUser(item.user)"
                />
                <img
                  v-else
                  class="img-others"
                  src="~@/assets/images/avatar-default-propskill.png"
                  @click="showDetailUser(item.user)"
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
  </div>
  <UserDetailDialog v-model="data.dataSource" v-model:visible="data.dialogUserDetailVisible" />
</template>

<style lang="scss" scoped>
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
  background-image: url('~@/assets/images/filter/rank-inactive-course-icon.png');
  width: 13px;
  height: 14px;
  background-size: 13px 14px;
  background-repeat: no-repeat;
  background-position: center;
}
.active .active-icon-course {
  background-image: url('~@/assets/images/filter/rank-active-course-icon.png');
  width: 13px;
  height: 14px;
  background-size: 13px 14px;
  background-repeat: no-repeat;
  background-position: center;
}
.group-day {
  display: flex;
  flex-direction: row;
  gap: 20px;
}
.filter-day {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 130%;
  color: #c1c1c1;
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
.filter-day,
.img-people,
.img-top-one,
.img-others {
  cursor: pointer;
}

//skeleton
.day-filter-skeleton,
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
.day-filter-skeleton {
  height: 20px;
  margin-bottom: 20px;
  width: 35%;
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
  height: 1158px;
  border: 2px solid #eee;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  padding: 20px;
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
import { defineComponent, reactive, watch } from 'vue';
import { Constant } from '@/services/shared/constant';
import { RankTypeEnum, TableRankEnum } from '@/services/shared/enum';
import { parseToMoney } from '@/services/shared/utils';
import { findUserDetail } from '@/services/features/elearning/elearning.service';
// Định nghĩa data type của component [data] bằng Typescript
class PropskillRankComponentData {
  modelValue: any;
  masterData: any;
  activeType: TableRankEnum | any;
  activeDay: RankTypeEnum | any;
  isViewMore: boolean;
  isHide: boolean;
  dataSource: any;
  dialogUserDetailVisible: boolean;
  isLoading: boolean;
}
class PropskillRankComponentProps {
  modelValue: any;
  masterData: any;
  activeType: TableRankEnum | any;
  activeDay: RankTypeEnum | any;
  isViewMore: boolean;
  isHide: boolean;
  isLoading: boolean;
}
export default defineComponent({
  name: 'PropskillRankComponent',
  components: {},
  props: {
    modelValue: {
      type: Object,
      default: null,
    },
    masterData: {
      type: Object,
      default: null,
    },
    activeType: {
      type: String,
      default: '',
    },
    activeDay: {
      type: String,
      default: '',
    },
    isViewMore: {
      type: Boolean,
      default: null,
    },
    isHide: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: true,
    },
  },

  emits: ['onActiveTypeChange', 'onActiveDayChange', 'onViewMore'],
  setup(props: PropskillRankComponentProps, { emit }: any) {
    const data = reactive<PropskillRankComponentData>({
      modelValue: { ...props.modelValue },
      masterData: { ...props.masterData },
      activeType: props.activeType,
      activeDay: props.activeDay,
      isViewMore: props.isViewMore,
      isHide: props.isHide,
      dataSource: null,
      dialogUserDetailVisible: false,
      isLoading: props.isLoading,
    });

    watch(
      () => [props.activeType, props.activeDay, props.modelValue, props.isViewMore, props.isHide, props.isLoading],
      (newValue) => {
        data.activeType = newValue[0];
        data.activeDay = newValue[1];
        data.modelValue = newValue[2];
        data.isViewMore = newValue[3];
        data.isHide = newValue[4];
        data.isLoading = newValue[5];
      }
    );

    // Chuyển tab
    const switchType = (activeType: any) => {
      data.activeType = activeType;
      emit('onActiveTypeChange', activeType);
    };
    // Chuyển tab
    const switchDay = (activeDay: any) => {
      data.activeDay = activeDay;
      emit('onActiveDayChange', activeDay);
    };
    const onViewMore = () => {
      emit('onViewMore');
    };
    const loadUserDetail = async (id: string) => {
      const res = await findUserDetail(id);
      data.dataSource = res;
    };
    const showDetailUser = (dataUser: any) => {
      loadUserDetail(dataUser.id);
      data.dialogUserDetailVisible = true;
    };

    return {
      Constant,
      switchType,
      RankTypeEnum,
      TableRankEnum,
      data,
      switchDay,
      parseToMoney,
      onViewMore,
      showDetailUser,
    };
  },
});
</script>
