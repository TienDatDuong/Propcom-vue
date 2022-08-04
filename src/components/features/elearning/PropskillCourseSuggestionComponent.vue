<template>
  <div v-if="isLoading">
    <div class="mid-box-righ-skeleton">
      <div class="right-text-skeleton"></div>
      <div class="section-suggest-skeleton">
        <div class="course-info-skeleton"></div>
        <div class="course-info-skeleton"></div>
        <div class="course-info-skeleton"></div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="course-suggestion" v-if="modelValue?.length > 0">
      <div class="header">Có thể bạn quan tâm</div>
      <div class="section-suggest">
        <div class="row row-cols-auto g-3" style="width: 100%">
          <div class="col-12" v-for="(item, index) in modelValue" :key="index" :virtualIndex="index">
            <PropskillCourseInfoComponent :modelValue="item" :isSuggest="true" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.course-suggestion {
  margin-top: 20px;
}
.section-suggest {
  background: #ffffff;
  border: 1px solid #f2f2f2;
  border-radius: 10px;
  padding: 20px;
  margin-top: 15px;
  display: flex;
  gap: 36px;
}
.header {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 130%;
  color: #5a5a5a;
}
.right-text-skeleton,
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
.mid-box-right-skeleton {
  height: 100%;
  width: 350px;
  height: 100%;
}
.el-card__body-skeleton {
  width: 334px;
  height: 428px;
  border-radius: 10px;
  margin-bottom: 30px;
}
.lesson-banner-skeleton {
  width: 334px;
  height: 128.1px;
  padding: 20px 0 25px 20px;
  margin-bottom: 30px;
  border-radius: 10px;
}
.right-text-skeleton {
  height: 26px;
  width: 100%;
  margin-bottom: 20px;
}
.section-suggest-skeleton {
  border: 2px solid #eee;
  width: 334px;
  height: 320px;
  padding: 20px;
  border-radius: 10px;
}
.course-info-skeleton {
  height: 82px;
  width: 100%;
  border-radius: 10px;
  margin-bottom: 20px;
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, computed, ref, onMounted, onUnmounted, watch } from 'vue';
import { useInit } from '@/services/shared/utils';
import {} from '@/services/features/elearning/elearning.service';
import { findInvestorSuggest } from '@/services/features/investor/investor.service';
import { ApiRequestPaging } from '@/models/api-request';
import { CourseModel } from '@/services/features/elearning/elearning.model';
import { ApiResponsePaging } from '@/models/api-response';
import PropskillCourseInfoComponent from '@/components/features/elearning/PropskillCourseInfoComponent.vue';
// Định nghĩa data type của component [data] bằng Typescript
class PropskillCourseSuggestionComponentData {
  modelValue: CourseModel;
  masterData: any;
  isLoading: boolean;
}
class PropskillCourseSuggestionComponentProps {
  modelValue: CourseModel;
  masterData: any;
  isLoading: boolean;
}

export default defineComponent({
  name: 'PropskillCourseSuggestionComponent',
  components: { PropskillCourseInfoComponent },
  props: {
    modelValue: {
      type: CourseModel,
      // type: Array as () => Array<CourseModel>,

      default: null,
      required: true,
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
  setup(props: PropskillCourseSuggestionComponentProps) {
    const { base } = useInit();
    const data = reactive<PropskillCourseSuggestionComponentData>({
      isLoading: props.isLoading,
      modelValue: { ...props.modelValue },
      masterData: props.masterData,
    });
    watch(
      () => props.isLoading,
      (newValue, oldValue) => {
        data.isLoading = newValue;
      }
    );
    return {};
  },
});
</script>
