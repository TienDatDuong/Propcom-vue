<template>
  <div v-if="isLoading">
    <div class="mid-box-skeleton">
      <div class="mid-box-left-skeleton">
        <div class="info-skeleton">
          <div class="info-lable-skeleton"></div>
          <div class="info-text-skeleton"></div>
          <div class="info-text-skeleton"></div>
          <div class="info-text-skeleton"></div>
        </div>
        <div class="info-ac-skeleton">
          <div class="info-lable-skeleton"></div>
          <div class="info-text-skeleton"></div>
          <div class="info-text-skeleton"></div>
          <div class="info-text-skeleton"></div>
          <div class="info-text-skeleton"></div>
          <div class="info-text-skeleton"></div>
        </div>
        <div class="carousel-container-skeleton">
          <div class="group-carousel-header-skeleton"></div>
          <div class="group-carousel-body-skeleton">
            <div class="course-container-skeleton">
              <div class="row row-cols-auto g-3">
                <div class="col-4" v-for="index in 6" :key="index" :virtualIndex="index">
                  <div class="course-skeleton"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="group-home" v-else>
    <el-card class="quote" shadow="never" v-if="modelValueSpeaker?.userInfo?.businessProfile?.quote?.length">
      <div class="quote-title">
        <img class="quote-title-icon" src="~@/assets/images/left-quote-title-icon.png" />
        <div class="quote-title-label">Trích dẫn ưa thích</div>
        <img class="quote-title-icon-right" src="~@/assets/images/right-quote-title-icon.png" />
      </div>
      <div class="quote-content">{{ modelValueSpeaker.userInfo.businessProfile.quote }}</div>
    </el-card>
    <div class="introduce" v-if="modelValueSpeaker?.userInfo?.businessProfile?.introducer?.length">
      <div class="title">Giới thiệu về diễn giả</div>
      <div class="introduce-content">{{ modelValueSpeaker.userInfo.businessProfile.introducer }}</div>
    </div>
    <div v-if="modelValueSpeaker?.userInfo?.businessProfile?.introducer?.length" class="underline"></div>
    <div class="course">
      <el-row>
        <div style="width: 100%">
          <div class="header-title">Khoá học của diễn giả</div>
          <div class="row row-cols-auto g-3" v-if="modelValueCourse.length">
            <div
              class="col-lg-6 col-md-6 col-sm-4 col-xl-4 col-xxl-4"
              v-for="(item, index) in modelValueCourse"
              :key="index"
              :virtualIndex="index"
            >
              <!-- <PropskillCourseInfoComponent
                v-if="modelValueCourse === PropskillDataGet.ALL"
                :modelValue="item"
                :isShowProgress="true"
                
                :isHide="true"
                :isHideDescription="true"
              /> -->
              <PropskillCourseInfoComponent :modelValue="item" :isHideDescription="true" :isShowPrice="true" />
            </div>
          </div>
        </div>
        <!-- <PropskillCourseCarouselComponent
          class="course-list"
          v-if="modelValueCourse"
          :modelValue="modelValueCourse"
          :isHide="true"
          :title="'Khoá học của diễn giả'"
        /> -->
      </el-row>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.underline {
  width: 833px;
  height: 2px;
  background: #f2f2f2;
  margin-bottom: 20px;
}

.group-home {
  margin-top: 30px;
  padding-right: 17px;
}
.quote {
  border: 1px solid #f2f2f2;
  border-radius: 10px;
}
.quote-title {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
}
.quote-title-icon {
  width: 22px;
  height: 16px;
  margin-right: 10px;
}
.quote-title-icon-right {
  width: 22px;
  height: 16px;
  margin-left: 10px;
}
.quote-title-label {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 130%;
  color: #dd0000;
}
.quote-content {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 150%;
  color: #0f0f0f;
  text-indent: 10px;
  text-align: center;
}
.title {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 130%;
  color: #0f0f0f;
}
.introduce-content {
  margin-top: 10px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: #0f0f0f;
}
.course {
  margin-bottom: 30px;
}
.course-list {
  padding: 0px;
  padding-right: 5px;
}
.introduce {
  margin-bottom: 20px;
  margin-top: 20px;
}
.header-title {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 130%;
  /* or 19px */

  color: #0f0f0f;
  margin-bottom: 10px;
}

//skeleton
.info-skeleton {
  height: 183px;
  width: 100%;
  border: 2px solid #eee;
  padding: 27px;
  border-radius: 10px;
}
.info-ac-skeleton {
  width: 100%;
  padding: 27px 0;
  border-radius: 10px;
}
.info-lable-skeleton {
  height: 27px;
  width: 30%;
  margin-bottom: 15px;
}
.info-text-skeleton {
  height: 22px;
  width: 100%;
  margin-bottom: 5px;
}
.course-skeleton,
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
.group-carousel-skeleton {
  height: 297px;
  padding: 30px 0 50px 0px;
}
.group-carousel-header-skeleton {
  height: 30px;
  margin-bottom: 17px;
  display: flex;
  flex-direction: column;
}
.mid-box-skeleton {
  padding: 30px 0px 50px 0px;
  display: flex;
  justify-content: space-between;
}
.mid-box-left-skeleton {
  height: 100%;
  width: 833px;
}

.carousel-container-skeleton {
  padding-bottom: 20px;
  display: flex;
}
.course-skeleton {
  height: 272px;
  width: 265px;
  display: inline-block;
  margin-right: 11px;
  border-radius: 10px;
}
.swiper-pagination-skeleton {
  height: 29px;
  width: 818px;
  margin-top: 5px;
}
.group-carousel-body-skeleton {
  display: flex;
  flex-direction: column;
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
.el-card-body-skeleton {
  width: 334px;
  height: 428px;
  border-radius: 10px;
  margin-bottom: 30px;
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, computed, ref, onMounted, onUnmounted, watch } from 'vue';
import { useInit } from '@/services/shared/utils';
import {} from '@/services/features/elearning/elearning.service';
import { findInvestorSuggest } from '@/services/features/investor/investor.service';
import { ApiRequestPaging } from '@/models/api-request';
import { CourseModel, InstructorModel } from '@/services/features/elearning/elearning.model';
import { ApiResponsePaging } from '@/models/api-response';
import PropskillCourseInfoComponent from './PropskillCourseInfoComponent.vue';
import { PropskillDataGet } from '@/services/shared/enum';
// Định nghĩa data type của component [data] bằng Typescript
class PropskillSpeakerDetailComponentProps {
  modelValueSpeaker: InstructorModel;
  modelValueCourse: CourseModel;
  isLoading: boolean;
}
class PropskillSpeakerDetailComponentData {
  modelValueSpeaker: InstructorModel;
  modelValueCourse: CourseModel;
  isLoading: boolean;
}
export default defineComponent({
  name: 'PropskillSpeakerDetailComponent',
  components: { PropskillCourseInfoComponent },
  props: {
    modelValueSpeaker: {
      type: InstructorModel,
      default: null,
      required: true,
    },
    modelValueCourse: {
      type: CourseModel,
      default: null,
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props: PropskillSpeakerDetailComponentProps) {
    const { base } = useInit();
    const data = reactive<PropskillSpeakerDetailComponentData>({
      modelValueSpeaker: { ...props.modelValueSpeaker },
      modelValueCourse: { ...props.modelValueCourse },
      isLoading: props.isLoading,
    });
    watch(
      () => props.isLoading,
      (newValue, oldValue) => {
        data.isLoading = newValue;
      }
    );

    return { PropskillDataGet };
  },
});
</script>
