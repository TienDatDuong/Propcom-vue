<template>
  <div v-if="data.isLoading">
    <div class="propskill-home-container-skeleton">
      <div class="mid-box-skeleton">
        <div class="mid-box-righ-skeleton">
          <div class="el-card__body-skeleton">
            <div class="progress-title-skeleton"></div>
            <div class="progress-title-skeleton"></div>
            <div class="progress-title-skeleton"></div>
            <div class="progress-title-skeleton"></div>
            <div class="progress-title-skeleton"></div>
            <div class="progress-title-skeleton"></div>
            <div class="progress-title-skeleton"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="side-tab-component">
    <el-card class="box-card" shadow="never">
      <div class="container-content">
        <div class="topic-tag" v-for="(item, index) in modelValue" :key="index" :virtualIndex="index">
          <div
            class="card-content"
            :class="{ active: item.id === data.activeTab, disabled: item.disabled }"
            @click="switchTab(item.disabled ? null : item.id)"
          >
            <div class="topic">
              <img class="topic-icon" :src="loadIconTopic(item)" />
              <span class="topic-content">
                <span class="title-topic">
                  <span class="topic-name"
                    ><span class="topic-head">Chủ đề {{ index + 1 }}: </span>{{ item.name }}</span
                  >
                </span>
                <div class="topic-time">{{ item.time }} phút</div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.container-content {
  display: grid;
  gap: 17px;
}
.lesson-tag {
  cursor: pointer;
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
.box-card {
  border-radius: 10px;
}
.lesson-icon {
  width: 24px;
  height: 24px;
}
.topic-icon {
  width: 23px;
  height: 23px;
  margin-top: 3px;
}
.title-side {
  padding-left: 16px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 130%;
  color: #0f0f0f;
}

.card-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 14px 10px 14px 10px;
  gap: 13px;
  border-radius: 5px;
}
.topic {
  display: flex;
  justify-content: start;
  margin-left: 13px;
  width: 100%;
}
.topic-content {
  padding-left: 11px;
  width: 80%;
}
.topic-head {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 130%;
  color: #0f0f0f;
  display: inline;
}
.topic-name {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  color: #5a5a5a;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.topic-time {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 130%;
  color: #a7a7a7;
  margin-top: 5px;
}
.topic-tag {
  background: #fafafa;
  border-radius: 5px;
}
.active {
  background-image: linear-gradient(90deg, #dd0000 6px, #fafafa 6px);
  border-radius: 5px 0px 0px 5px;
}
.card-content.disabled {
  opacity: 0.3;
}
.card__body-skeleton {
  border-radius: 10px;
  height: 444px;
  margin-bottom: 15px;
  margin-right: 19px;
  border: 2px solid #eee;
  padding: 20px;
}
.header-title-skeleton {
  height: 67px;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #eee;
}
.header-title-text-skeleton {
  height: 30px;
  width: 30%;
}
.propskill-banber-skeleton {
  display: flex;
  justify-content: space-around;
  height: 210px;
  padding: 45px 0px 10px 0px;
}
.banner-img-skeleton {
  width: 592.5px;
  height: 100%;
  border-radius: 10px;
}

.banner-img-skeleton,
.course-skeleton,
.swiper-pagination-skeleton,
.speaker-container-skeleton,
.lesson-banner-skeleton,
.content-text-skeleton,
.title-skeleton,
.el-card__body_lesson-skeleton,
.el-card__body__header-skeleton,
.progress-title-skeleton,
.btn-skeleton,
.header-title-text-skeleton,
.group-suggest-aside__card-skeleton,
.swiper-wrapper-skeleton {
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
.swiper-wrapper-skeleton {
  height: 200px;
}
.mid-box-skeleton {
  padding: 0px 0px 50px 0px;
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
  height: 24px;
  width: 100%;
  padding: 15px 0 15px 15px;
  display: inline-block;
  margin-right: 11px;
}
.swiper-pagination-skeleton {
  height: 29px;
  width: 818px;
  margin-top: 5px;
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
.el-card__body-skeleton {
  width: 334px;
  border-radius: 10px;
  margin-bottom: 30px;
  border: 2px solid #eee;
  min-height: 100px;
}
.el-card__body-skeleton_refer {
  width: 814px;
  height: 338px;
  border-radius: 10px;
  margin-bottom: 30px;
  border: 2px solid #eee;
  margin-right: 19px;
}
.el-card__body__header-skeleton {
  height: 51px;
  width: 100%;
}
.lesson-skeleton {
  padding: 20px;
}
.el-card__body_lesson-skeleton {
  width: 100%;
  height: 45px;
  margin-bottom: 20px;
}
.progress-title-skeleton {
  margin: 20px;
  height: 72px;
}
.btn-skeleton {
  height: 44px;
  width: 334px;
  margin: 20px auto;
}
.group-suggest-aside__card-skeleton {
  margin: 20px;
  height: 100px;
}
.lesson-banner-skeleton {
  width: 334px;
  height: 128.1px;
  padding: 20px 0 25px 20px;
  margin-bottom: 30px;
  border-radius: 10px;
}
.propskill-home-container-skeleton {
  margin: 0 auto;
  width: 1200px;
}
</style>

<script lang="ts">
import { defineComponent, onMounted, reactive, watch, ref } from 'vue';
import { useInit } from '@/services/shared/utils';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { ProgressCourseEnum } from '@/services/shared/enum';
import { Constant } from '@/services/shared/constant';
SwiperCore.use([Navigation, Autoplay]);
// Định nghĩa data type của component [data] bằng Typescript
class PropskillSideTopicTabComponentData {
  isLoading: boolean;
  activeTab: string;
  modelValue: any;
}

// Định nghĩa data type của component [props] bằng Typescript
class PropskillSideTopicTabComponentProps {
  activeTab: string;
  modelValue: any;
  isLoading: boolean;
}

export default defineComponent({
  name: 'PropskillSideTopicTabComponent',
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
    isLoading: {
      type: Boolean,
      default: null,
    },
  },
  emits: ['onActiveSideTopicTabChange'],
  setup(props: PropskillSideTopicTabComponentProps, { emit }: any) {
    // Setup Default
    const { base, userId } = useInit();
    // Component reactive data
    const data = reactive<PropskillSideTopicTabComponentData>({
      isLoading: props.isLoading, // boolean
      activeTab: props.activeTab,
      modelValue: { ...props.modelValue },
    });
    watch(
      () => props.activeTab,
      (newValue, oldValue) => {
        data.activeTab = newValue;
      }
    );
    watch(
      () => [props.isLoading],
      (newValue, oldValue) => {
        data.isLoading = newValue[1];
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
      data.activeTab = activeTab;
      emit('onActiveSideTopicTabChange', activeTab);
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
    };
  },
});
</script>
