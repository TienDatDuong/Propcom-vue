<template v-if="data.modelValue.userInfo?.name?.length">
  <div class="speaker">
    <el-card :body-style="{ padding: '0px' }" class="speaker-container" shadow="never">
      <div class="favourite-speaker">
        <el-button v-if="data.modelValue.isFavorite" @click="handleLike(false)" text class="btn-like"></el-button>
        <el-button v-if="!data.modelValue.isFavorite" @click="handleLike(true)" text class="btn-dislike"></el-button>
      </div>
      <div class="speaker-info">
        <div
          v-if="modelValue.userInfo.avatarUrl"
          class="speaker-avatar"
          @click="showDetailIntructor"
          :style="
            modelValue.userInfo.avatarUrl && {
              'background-image': 'url(' + encapsulateUrl(modelValue.userInfo.avatarUrl) + ')',
            }
          "
        ></div>
        <div v-else @click="showDetailIntructor">
          <img class="speaker-avatar" src="~@/assets/images/avatar-default-propskill.png" />
        </div>

        <div class="speaker-name">{{ modelValue.userInfo?.name }}</div>
        <div class="speaker-label">{{ modelValue.userInfo?.role?.name }}</div>
        <div class="speaker-tag" v-if="modelValue?.id">
          <span
            class="speaker-lesson"
            @click="goToSpeakerDetail(modelValue?.id)"
            v-if="modelValue.coursesParticipated.length"
            ><img class="icon" src="~@/assets/images/book-open-fill.png" />{{
              modelValue.coursesParticipated.length
            }}
            khoá học</span
          >
          <span class="speaker-student" @click="showPopupUserLearn" v-if="modelValue.countLearners"
            ><img class="icon" src="~@/assets/images/user-fill.png" />{{ modelValue.countLearners }} người học</span
          >
        </div>
        <a href="javascript:;" class="speaker-link" @click="goToSpeakerDetail(modelValue?.id)">
          <span class="speaker-link-text">Khám phá ngay</span>
          <span class="speaker-link-icon"></span>
        </a>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
::v-deep .el-dialog__body {
  padding: 0 7px 30px 0;
}
::v-deep .el-card.is-never-shadow:hover {
  border: 1px solid #ffeeed;
  box-shadow: 0px 10px 30px rgba(221, 0, 0, 0.2);
}
.speaker {
  width: 409px;
}
::v-deep .swiper-slide.swiper-slide-active {
  width: 409px !important;
}
.speaker-container {
  width: 100%;
  height: 200px;
  background: linear-gradient(#ffeeed 30%, #fff 30%);
  border-radius: 10px;
  border: 1px solid #ffeeed;
  display: flex;
  justify-content: space-evenly;
  position: relative;
}
.speaker-container:hover {
  border-color: #dd0000;
  .speaker-link {
    color: #fb4d4d;
  }
  .speaker-link-icon {
    background: url('~@/assets/images/path-red-icon.png');
    background-repeat: no-repeat;
    background-size: 10px 10px;
    width: 10px;
    height: 10px;
    background-position: center;
  }
}
.speaker-info {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
}
.speaker-avatar {
  width: 55px;
  height: 55px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 52px 52px;
  border-radius: 50%;
  border: 2px solid #ff7f76;
  position: absolute;
  left: 43.97%;
  right: 42.49%;
  top: 12.39%;
  bottom: 55.19%;
}
.speaker-name,
.speaker-label {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  text-align: center;
  color: #0f0f0f;
}
.speaker-name {
  text-transform: uppercase;
  font-size: 15px;
  line-height: 130%;
  padding-top: 70px;
}
.speaker-label {
  font-weight: 400;
  font-size: 12px;
  line-height: 130%;
}
.speaker-tag {
  display: inline-block;
  justify-content: start;
  padding-top: 5px;
  text-align: center;
  align-content: center;
}
.speaker-lesson,
.speaker-student {
  display: inline;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px 15px;
  gap: 3px;
  height: 20px;
  background: #ffeeed;
  border-radius: 100px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 130%;
  text-align: center;
  color: #fb4d4d;
  margin: 0 4px;
}
.speaker-lesson img,
.speaker-student img {
  padding-right: 3px;
}
.favourite-speaker {
  width: 25px;
  height: 25px;
  position: absolute;
  right: 1.18%;
  top: 5.83%;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 50%;
}
.btn-like {
  background: url('~@/assets/images/favourite-icon-active.png');
  background-repeat: no-repeat;
  background-position: center;
  border: 1px solid #ffeeed;
  background-size: 16px 14px;
}
.btn-dislike {
  background: url('~@/assets/images/favourite-icon-inactive.png');
  background-repeat: no-repeat;
  background-position: center;
  border: 1px solid #ffeeed;
  background-size: 16px 14px;
}
.icon {
  width: 12px;
  height: 12px;
}
.speaker-link {
  color: #c1c1c1;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 130%;
  padding-top: 10px;
}
.speaker-link-icon {
  width: 10px;
  height: 10px;
  background: url('~@/assets/images/path-grey-icon.png');
  background-repeat: no-repeat;
  background-size: 10px 10px;
  background-position: center;
}
.speaker-link-text {
  margin-left: 10px;
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, computed, ref, onMounted, onUnmounted, watch } from 'vue';
import { useInit } from '@/services/shared/utils';
import { favoriteInstructor } from '@/services/features/elearning/elearning.service';
import { findInvestorSuggest } from '@/services/features/investor/investor.service';
import { ApiRequestPaging } from '@/models/api-request';
import { InstructorModel } from '@/services/features/elearning/elearning.model';
import { ApiResponsePaging } from '@/models/api-response';
import { contentHide, encapsulateUrl } from '@/services/shared/utils';
import { TypePopupEnum } from '@/services/shared/enum';
// Định nghĩa data type của component [data] bằng Typescript
class PropskillSpeakerInfoComponentProps {
  modelValue: InstructorModel;
  masterData: any;
}
// Định nghĩa data type của component [data] bằng Typescript
class PropskillSpeakerInfoComponentData {
  modelValue: InstructorModel;
  masterData: any;
}
export default defineComponent({
  name: 'PropskillSpeakerInfoComponent',
  components: {},
  props: {
    modelValue: {
      type: InstructorModel,
      default: null,
      required: true,
    },
    masterData: {
      type: Object,
      default: null,
    },
  },
  emits: ['showPopupIntructor'],
  setup(props: PropskillSpeakerInfoComponentProps, { emit }: any) {
    const { base } = useInit();
    const data = reactive<PropskillSpeakerInfoComponentData>({
      modelValue: { ...props.modelValue },
      masterData: props.masterData,
    });

    const handleLike = async (isFavorite: boolean) => {
      const responeLike = await favoriteInstructor(data.modelValue.id, isFavorite);
      if (responeLike && responeLike.isSuccess) {
        data.modelValue.isFavorite = !data.modelValue.isFavorite;
      }
    };
    const goToSpeakerDetail = async (id: string) => {
      base.router.push({ name: 'propskill-detail-instructor', params: { id } });
    };

    const showPopupUserLearn = () => {
      emit('showPopupIntructor', { type: TypePopupEnum.USER_LEARN, id: data.modelValue.id });
    };

    const showDetailIntructor = () => {
      emit('showPopupIntructor', { type: TypePopupEnum.USER, user: data.modelValue.userInfo });
    };

    return {
      contentHide,
      encapsulateUrl,
      handleLike,
      data,
      goToSpeakerDetail,
      showPopupUserLearn,
      showDetailIntructor,
    };
  },
});
</script>
