<template>
  <div v-if="isLoading" class="course-profile-skeleton"></div>
  <div v-else class="course-profile">
    <el-card :body-style="{ padding: '0px' }" class="course-profile-container" shadow="never">
      <div class="header-card">Hồ sơ bài học</div>
      <div class="top-profile">
        <router-link class="link-category" :to="{ name: 'propskill-rank-total' }">
          <div class="rank">
            <span class="title-rank"><img class="icon-rank" src="~@/assets/images/award-cup-icon.png" />Xếp hạng:</span
            ><span class="top-profile-amount">{{ modelValue?.rank }}</span>
          </div>
        </router-link>
        <div class="border-element"></div>
        <router-link class="link-category" :to="{ name: 'propskill-rank-total' }">
          <div class="point">
            <span class="title-point"
              ><img class="icon-total" src="~@/assets/images/point-gem-icon.png" />Tổng điểm:</span
            ><span class="top-profile-amount">{{ modelValue?.point }}</span>
          </div>
        </router-link>
        <div class="border-center"></div>
      </div>

      <div class="bottom-profile">
        <router-link class="link-category" :to="{ name: 'propskill-rank-total' }">
          <div class="level">
            <span class="bottom-profile-title"><img class="icon" src="~@/assets/images/level-icon.png" />Cấp độ:</span
            ><span class="bottom-profile-amount bottom-profile-amount-level"
              ><span class="level-title" v-if="modelValue?.iconImage"
                ><span
                  class="level-lable"
                  :style="
                    modelValue?.iconImage && {
                      'background-image':
                        'linear-gradient(90deg, white 16%,' + titleGetLevel(modelValue?.iconImage).color + ' 16%)',
                    }
                  "
                >
                  <img class="icon-level" :src="titleGetLevel(modelValue?.iconImage).icon" />
                  {{ modelValue?.title }}</span
                ></span
              ><img class="icon-path" src="~@/assets/images/path-profile-icon.png"
            /></span>
          </div>
        </router-link>
        <div class="border-element"></div>
        <div class="studying">
          <router-link class="link-category" :to="{ name: 'propskill-course-in-progress' }">
            <span class="bottom-profile-title">
              <img class="icon" src="~@/assets/images/studying-profile-icon.png" />Đang học:
            </span>
          </router-link>
          <span class="bottom-profile-amount"
            >{{ modelValue?.countLessonInProgress ? modelValue?.countLessonInProgress : ''
            }}<img class="icon-path" src="~@/assets/images/path-profile-icon.png"
          /></span>
        </div>
        <div class="border-element"></div>
        <div class="done">
          <router-link class="link-category" :to="{ name: 'propskill-course-completed' }">
            <span class="bottom-profile-title">
              <img class="icon" src="~@/assets/images/done-profile-icon.png" />Đã hoàn thành:
            </span>
          </router-link>
          <span class="bottom-profile-amount"
            >{{ modelValue?.countLessonCompleted ? modelValue?.countLessonCompleted : ''
            }}<img class="icon-path" src="~@/assets/images/path-profile-icon.png"
          /></span>
        </div>
        <div class="border-element"></div>
        <div class="follow-course">
          <router-link class="link-category" :to="{ name: 'propskill-favorite-course' }">
            <span class="bottom-profile-title">
              <img class="icon" src="~@/assets/images/follow-icon.png" />Khoá học quan tâm:
            </span>
          </router-link>
          <span class="bottom-profile-amount"
            >{{ modelValue?.countFavoriteLesson ? modelValue?.countFavoriteLesson : ''
            }}<img class="icon-path" src="~@/assets/images/path-profile-icon.png"
          /></span>
        </div>
        <div class="border-element"></div>
        <div class="follow-speaker">
          <router-link class="link-category" :to="{ name: 'propskill-favorite-intructor' }">
            <span class="bottom-profile-title">
              <img class="icon" src="~@/assets/images/follow-icon.png" />Diễn giả quan tâm:
            </span>
          </router-link>
          <span class="bottom-profile-amount"
            >{{ modelValue?.countFavoriteInstructor ? modelValue?.countFavoriteInstructor : ''
            }}<img class="icon-path" src="~@/assets/images/path-profile-icon.png"
          /></span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.course-profile-skeleton {
  width: 100%;
  height: 430px;
  margin-bottom: 30px;
  background-color: #eee;
  border-color: #eee;
}
.course-profile {
  width: 100%;
  height: 430px;
  margin-bottom: 30px;
}
.course-profile-container {
  display: grid;
  padding: 0px;
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.header-card {
  background: #f2f2f2;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 110%;
  text-align: center;
  text-transform: uppercase;
}
.top-profile {
  padding: 20px 20px 20px 20px;
  gap: 10px;
}
.bottom-profile {
  padding: 0 20px 0 20px;
}
.title-rank {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 130%;
  text-align: center;
  text-transform: uppercase;
  color: #0f0f0f;
}
.title-point {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 130%;
  text-align: center;
  text-transform: uppercase;
  color: #0f0f0f;
}
.top-profile-amount {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 130%;
  text-align: center;
  text-transform: uppercase;
  color: #0f0f0f;
}
.border-center {
  border-bottom: 3px solid #f2f2f2;
}
.border-element {
  border: 1px solid #f2f2f2;
}
.rank,
.point {
  display: flex;
  justify-content: space-between;
  column-gap: 10px;
}
.rank {
  padding-bottom: 8px;
}
.level {
  padding-bottom: 12px;
}
.point,
.follow-speaker {
  padding-top: 12px;
  padding-bottom: 10px;
}
.follow-course,
.done,
.studying {
  padding: 12px 0;
}
.point {
  padding-bottom: 12px;
}
.level,
.studying,
.done,
.follow-course,
.follow-speaker {
  display: flex;
  justify-content: space-between;
}
.bottom-profile-title,
.bottom-profile-amount {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
}
.bottom-profile-title {
  font-size: 16px;
  line-height: 19px;
  color: #333333;
}
.bottom-profile-amount {
  font-size: 14px;
  line-height: 16px;
  text-align: right;
  color: #5a5a5a;
  display: flex;
  justify-content: start;
  align-items: center;
}
.icon {
  width: 28px;
  height: 28px;
  margin-right: 12px;
}
.icon-total {
  margin-right: 10px;
  width: 20px;
  margin-bottom: 3px;
}
.icon-rank {
  margin-right: 7px;
  width: 21px;
  height: 21px;
  margin-bottom: 7px;
}
.icon-level {
  width: 21px;
  height: 25px;
  margin-left: 2px;
}
.icon-path {
  margin-left: 10px;
  width: 6px;
  height: 12px;
}
.level-lable {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  height: 16px;
  padding-right: 10px;
}
.level-title {
  display: flex;
  justify-content: start;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 120%;
  color: #ffffff;
  height: 16px;
}
.link-category {
  color: #ffffff;
  text-decoration: none;
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, computed, ref, onMounted, onUnmounted, watch } from 'vue';
import { useInit } from '@/services/shared/utils';
import {} from '@/services/features/elearning/elearning.service';
import { findInvestorSuggest } from '@/services/features/investor/investor.service';
import { ApiRequestPaging } from '@/models/api-request';
import { HistoryStudyModel } from '@/services/features/elearning/elearning.model';
import { ApiResponsePaging } from '@/models/api-response';
import { TitleImageEnum } from '@/services/shared/enum';
import { Constant } from '@/services/shared/constant';

// Định nghĩa data type của component [data] bằng Typescript
class PropskillCourseProfileComponenProps {
  modelValue: HistoryStudyModel;
  masterData: any;
  isLoading: boolean;
}
// Định nghĩa data type của component [data] bằng Typescript
class PropskillCourseProfileComponentData {
  modelValue: HistoryStudyModel;
  masterData: any;
  isLoading: boolean;
}
export default defineComponent({
  name: 'PropskillCourseProfileComponent',
  components: {},
  props: {
    modelValue: {
      type: HistoryStudyModel,
      default: null,
    },
    masterData: {
      type: Object,
      default: null,
    },
    isLoading: {
      type: Boolean,
      default: null,
    },
  },
  setup(props: PropskillCourseProfileComponenProps) {
    const data = reactive<PropskillCourseProfileComponentData>({
      modelValue: { ...props.modelValue },
      masterData: props.masterData,
      isLoading: props.isLoading,
    });

    watch(
      () => props.isLoading,
      (newValue, oldValue) => {
        data.isLoading = newValue;
      }
    );

    const titleGetLevel = (title: string) => {
      switch (title) {
        case TitleImageEnum.NEWBIE:
          return Constant.LEVEL_PROPSKILL.find((item) => item.key === TitleImageEnum.NEWBIE);
        case TitleImageEnum.STREET:
          return Constant.LEVEL_PROPSKILL.find((item) => item.key === TitleImageEnum.STREET);
        case TitleImageEnum.AMATEURS:
          return Constant.LEVEL_PROPSKILL.find((item) => item.key === TitleImageEnum.AMATEURS);
        case TitleImageEnum.PROFESSIONAL:
          return Constant.LEVEL_PROPSKILL.find((item) => item.key === TitleImageEnum.PROFESSIONAL);
        case TitleImageEnum.AWESOME:
          return Constant.LEVEL_PROPSKILL.find((item) => item.key === TitleImageEnum.AWESOME);
        default:
          return {};
      }
    };
    return { titleGetLevel };
  },
});
</script>
