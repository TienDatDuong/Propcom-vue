<template>
  <div v-if="isLoading">
    <div class="mid-box-righ-skeleton">
      <div class="el-card-body-skeleton">
        <div class="el-card-body-header-skeleton"></div>
        <div class="lesson-skeleton">
          <div class="el-card-body-lesson-skeleton"></div>
          <div class="el-card-body-lesson-skeleton"></div>
        </div>
      </div>
      <div class="el-card-body-skeleton">
        <div class="progress-title-skeleton"></div>
      </div>
    </div>
  </div>
  <div v-else class="side-tab-component">
    <el-card class="box-lesson" shadow="never">
      <template #header>
        <span>Bài học</span>
      </template>
      <div class="container-content">
        <div class="lesson-tag" v-for="(item, index) in modelValue" :key="index" :virtualIndex="index">
          <div
            class="card-content"
            :class="{ active: item.id === data.activeTab, disabled: item.disabled }"
            @click="switchTab(item.disabled ? null : item.id)"
          >
            <div class="lesson">
              <div>
                <el-row>
                  <el-col :span="3"><img class="lesson-icon" :src="Constant.SIDE_TAB[0].icon" /></el-col>
                  <el-col :span="21" class="title-side-name">
                    <span class="title-side">{{ item.name }}</span>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <el-card class="box-progress" shadow="never">
      <div class="progress-body">
        <div class="progress-title">Tiến trình khóa học</div>
        <div class="progress-content">
          <span class="progress-percentage">
            <span class="progress-percentage-title">{{
              data.course?.status === StatusRegisterEnum.COMPLETED ? 'Đã hoàn thành' : 'Đang học'
            }}</span>
            <span class="progress-percentage-amount"
              >{{ Math.round(Number(data.course?.progress) * 100) }}% khóa học</span
            >
          </span>
          <span class="progress-bonus" v-if="data.course?.point"
            >{{ parseToMoney(data.course?.point) }}<img class="bonus-icon" src="~@/assets/images/point-gem-icon.png"
          /></span>
        </div>
        <el-progress :percentage="Math.round(Number(data.course?.progress) * 100)" :show-text="false" color="#04c35c" />
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.side-tab-component {
  display: grid;
  gap: 20px;
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
  width: 294px;
}
.progress-content {
  display: flex;
  justify-content: space-between;
}
.progress-percentage-title {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #5a5a5a;
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
  font-weight: 400;
  font-size: 12px;
  line-height: 130%;
  color: #0f0f0f;
  display: flex;
  align-items: center;
}
.bonus-icon {
  width: 15px;
  height: 15px;
}
.lesson {
  width: 100%;
}
.lesson-tag {
  cursor: pointer;
}
.title-side-name {
  padding-left: 16px;
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
.box-lesson {
  width: 334px;
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
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 130%;
  color: #5a5a5a;
}
.card-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 20px 10px 10px;
  gap: 13px;
  border-radius: 5px;
}
.progress-title {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 130%;
  color: #5a5a5a;
  padding-bottom: 12px;
}
::v-deep .active {
  background: #f2f2f2;
}
::v-deep .active .title-side {
  color: #0f0f0f;
}
:v-deep .el-progress {
  background: #04c35c;
  border-radius: 100px;
  height: 6px !important;
}
.card-content.disabled {
  opacity: 0.3;
}

//skeleton
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

.title-skeleton,
.el-card-body-lesson-skeleton,
.el-card-body-header-skeleton,
.progress-title-skeleton,
.group-suggest-aside-card-skeleton {
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
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.course-skeleton {
  height: 58px;
  width: 100%;
  padding: 15px 0 15px 15px;
  display: inline-block;
  margin-right: 11px;
  border-radius: 10px;
}

.mid-box-right-skeleton {
  height: 100%;
  width: 350px;
  height: 100%;
}
.el-card-body-skeleton {
  width: 334px;
  border-radius: 10px;
  margin-bottom: 30px;
  border: 2px solid #eee;
  min-height: 100px;
}
.el-card-body-header-skeleton {
  height: 51px;
  width: 100%;
}
.lesson-skeleton {
  padding: 20px;
}
.el-card-body-lesson-skeleton {
  width: 100%;
  height: 45px;
  margin-bottom: 20px;
}
.progress-title-skeleton {
  margin: 20px;
  height: 30px;
}

.group-suggest-aside-card-skeleton {
  margin: 20px;
  height: 100px;
}
</style>

<script lang="ts">
import { defineComponent, onMounted, reactive, watch, ref } from 'vue';
import { useInit } from '@/services/shared/utils';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { ProgressCourseEnum, StatusRegisterEnum } from '@/services/shared/enum';
import { Constant } from '@/services/shared/constant';
import { parseToMoney } from '@/services/shared/utils';
SwiperCore.use([Navigation, Autoplay]);
// Định nghĩa data type của component [data] bằng Typescript
class PropskillSideLessonTabComponentData {
  isLoading: boolean;
  activeTab: string;
  modelValue: any;
  course: any;
}

// Định nghĩa data type của component [props] bằng Typescript
class PropskillSideLessonTabComponentProps {
  activeTab: string;
  modelValue: any;
  course: any;
  isLoading: boolean;
}

export default defineComponent({
  name: 'PropskillSideLessonTabComponent',
  props: {
    activeTab: {
      type: String,
      default: '',
    },
    typeTab: {
      type: String,
      default: '',
    },
    modelValue: {
      type: Object,
      default: null,
    },
    course: {
      type: Object,
      default: null,
    },
    isLoading: {
      type: Boolean,
      default: null,
    },
  },
  emits: ['onActiveSideLessonTabChange'],
  setup(props: PropskillSideLessonTabComponentProps, { emit }: any) {
    // Setup Default
    const { base, userId } = useInit();
    // Component reactive data
    const data = reactive<PropskillSideLessonTabComponentData>({
      isLoading: props.isLoading, // boolean
      activeTab: props.activeTab,
      modelValue: { ...props.modelValue },
      course: { ...props.course },
    });
    watch(
      () => [props.activeTab, props.course, props.isLoading],
      (newValue, oldValue) => {
        data.activeTab = newValue[0];
        data.course = newValue[1];
        data.isLoading = newValue[2];
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

    // Chuyển tab
    const switchTab = (activeTab: string) => {
      if (!activeTab) {
        return;
      }
      emit('onActiveSideLessonTabChange', activeTab);
    };
    return {
      isActive: false,
      // Component reactive data
      data,
      // Enum
      ProgressCourseEnum,
      switchTab,
      Constant,
      loadIconTopic,
      parseToMoney,
      StatusRegisterEnum,
    };
  },
});
</script>
