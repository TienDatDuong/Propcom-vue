<template>
  <div v-if="isLoading">
    <div class="lesson-banner-skeleton"></div>
  </div>
  <div v-else>
    <div v-if="modelValue?.length">
      <swiper
        :slides-per-view="1"
        :loop="false"
        :class="modelValue.length < 2 ? 'swiper-no-swiping' : ''"
        class="container"
      >
        <swiper-slide v-for="(item, index) in modelValue" :key="index" :virtualIndex="index">
          <div class="lesson-banner">
            <div class="banner-name">Bạn đã học xong: {{ item.lesson.name }}</div>
            <div class="banner-des">{{ item.lesson.course.name }}</div>
            <button class="banner-btn" @click="goToDoExam(item.lesson.id)">làm bài thi</button>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
}
.lesson-banner {
  background: url('~@/assets/images/course-complete-banner.png') no-repeat;
  margin-bottom: 30px;
  background-size: 100% 100%;
  padding: 20px 0 25px 20px;
}
.lesson-banner-skeleton {
  background-color: #eee;
  border-color: #eee;
  margin-bottom: 30px;
  width: 100%;
  height: 114.82px;
}
.banner-name {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 130%;
  color: #fb4d4d;
}
.banner-des {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 130%;
  text-transform: uppercase;
  color: #0f0f0f;
  width: 70%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.banner-btn {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 110%;
  display: flex;
  align-items: flex-end;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;
  background: #dd0000;
  border-radius: 5px;
  border: none;
  padding: 10px 20px;
  margin-top: 15px;
  &:hover {
    background: #ad0000;
  }
}
.img-fluid {
  width: 114.82px;
  height: 114.82px;
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
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, computed, ref, onMounted, onUnmounted, watch } from 'vue';
import { useInit } from '@/services/shared/utils';
import { UserLessonModel } from '@/services/features/elearning/elearning.model';
import { CourseModel } from '@/services/features/elearning/elearning.model';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';

SwiperCore.use([Navigation, Autoplay, Pagination]);

class PropskillBannerLessonComponentProps {
  modelValue: UserLessonModel[];
  masterData: any;
  isLoading: boolean;
}
class PropskillBannerLessonComponentData {
  modelValue: UserLessonModel[];
  masterData: any;
  dialogDownload: boolean;
  isLoading: boolean;
}
export default defineComponent({
  name: 'PropskillBannerLessonComponent',
  components: { Swiper, SwiperSlide },
  props: {
    modelValue: {
      type: Array as () => Array<UserLessonModel>,
      default: null,
      required: false,
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
  setup(props: PropskillBannerLessonComponentProps) {
    const { base } = useInit();
    const data = reactive<PropskillBannerLessonComponentData>({
      modelValue: { ...props.modelValue },
      masterData: props.masterData,
      dialogDownload: false,
      isLoading: props.isLoading,
    });
    watch(
      () => props.isLoading,
      (newValue, oldValue) => {
        data.isLoading = newValue;
      }
    );
    const goToDoExam = (id: string) => {
      base.router.push({
        name: 'propskill-do-exam',
        params: { id: id },
      });
    };

    return { data, goToDoExam };
  },
});
</script>
