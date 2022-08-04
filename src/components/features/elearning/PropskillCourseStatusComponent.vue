<template>
  <div v-if="data.isLoading">
    <div class="container_box-skeleton">
      <div class="container_box_title-skeleton"></div>
      <div class="container_box_text-skeleton">
        <div class="line-text"></div>
      </div>
    </div>
  </div>
  <div v-else class="course-status">
    <div class="section" v-if="modelValue.length">
      <div class="title-status">
        <div class="header-status">Trạng thái khoá học</div>
        <div
          class="course-status-tag title-done"
          :style="{
            'background-color': statusGetTitle(status).color,
          }"
        >
          <img class="icon-status-title" :src="statusGetTitle(status).icon" />
          <span class="title-status-tag-title">{{ statusGetTitle(status).title }}</span>
        </div>
      </div>
      <div>
        <div class="timeline">
          <div class="outer">
            <div class="card" v-for="(item, index) in modelValue" :key="index" :virtualIndex="index">
              <div class="info">
                <div
                  class="bg-dot"
                  :style="{
                    'background-color': statusGetTitle(item.statusNew).dot,
                  }"
                >
                  <div
                    class="dot"
                    :style="{
                      'background-color': statusGetTitle(item.statusNew).color,
                    }"
                  ></div>
                </div>
                <div class="info-title">
                  <div class="title status-registered">
                    <span class="time">{{ formatDate(item.createdDate, 'HH:mm') }}</span>
                    <span class="date">{{ formatDate(item.createdDate, 'dd/MM/yyyy') }}</span>
                  </div>
                  <div class="group-status">
                    <span class="des-status">Đã chuyển sang trạng thái {{ statusGetTitle(item.statusNew).title }}</span>
                    <div
                      class="course-status-tag"
                      :style="{
                        'background-color': statusGetTitle(item.statusNew).color,
                      }"
                    >
                      <img class="icon-status" :src="statusGetTitle(item.statusNew).icon" />
                      <span class="title-status-tag">{{ statusGetTitle(item.statusNew).title }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template v-else>
      <AppEmptyComponent class="empty" title="Chưa có trạng thái khoá học">
        <img src="@/assets/images/status-empty.png" />
      </AppEmptyComponent>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.header-status {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 130%;
  color: #5a5a5a;
  margin: 20px 0px 20px 27.5px;
}
.icon-status-title {
  height: 16px;
  width: 16px;
  margin-right: 3px;
}
.icon-status {
  height: 11px;
  width: 11px;
  margin-right: 3px;
}
.title-status-tag-title::marker {
  color: transparent;
}
.title-status-tag-title {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  color: #ffffff;
}
.title-status-tag::marker {
  color: transparent;
}
.title-status-tag {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 130%;
  color: #ffffff;
}

.course-status-tag {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  width: auto;
  padding: 3px 10px 3px 6px;
  border-radius: 10px;
}
.course-status {
  margin-top: 30px;
}
.section {
  background: #ffffff;
  border: 1px solid #f2f2f2;
  border-radius: 10px;
  margin-bottom: 20px;
}

.title {
  display: flex;
  gap: 24px;
  padding-bottom: 8px;
}
.date {
  display: list-item;
}
.title-status {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f2f2f2;
}
.title-done {
  margin: 21px 27.5px 21px 0;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
  background: #04c35c;
  height: 24px;
  padding: 3px 8px 3px 5px;
  border-radius: 100px;
}
.time::marker {
  color: transparent;
}
.des-status::marker {
  color: transparent;
}
.des-status {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  color: #5a5a5a;
}
.timeline {
  margin: 20px 30px 30px 30px;
}
.info:first-child {
  padding-top: 6px;
}
.info {
  padding-top: 16px;
  border-left: 2px solid #f2f2f2;
  padding-left: 14px;
}
.info-title {
  margin-top: -14px;
}
.bg-dot {
  padding: 3px;
  width: 12px;
  height: 12px;
  display: block;
  border-radius: 100%;
  margin-left: -21px;
  margin-top: 6px;
}
.dot {
  border-radius: 100%;

  width: 6px;
  height: 6px;
}
.card {
  position: relative;
  border: none;
}

.status {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 130%;
  color: #ffffff;
}

.title {
  position: relative;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #a7a7a7;
}
span {
  display: list-item;
}
.title::before {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 999px;
  left: -27px;
}

.group-status {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px 0 16px 0;
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
//skeleton
.container_box-skeleton {
  width: 833px;
  height: 172px;
  margin-bottom: 20px;
  border: 2px solid #eee;
  margin-top: 30px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}
.container_box_title-skeleton,
.line-text {
  height: 67px;
  color: transparent;
  appearance: none;
  -webkit-appearance: none;
  background-color: #eee;
  border-color: #eee;
}
.container_box_text-skeleton {
  display: flex;
  padding: 20px;
  justify-content: space-around;
}
.line-text {
  height: 53px;
  width: 100%;
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, computed, ref, onMounted, onUnmounted, watch } from 'vue';
import { useInit, formatDate } from '@/services/shared/utils';
import {} from '@/services/features/elearning/elearning.service';
import { findInvestorSuggest } from '@/services/features/investor/investor.service';
import { ApiRequestPaging } from '@/models/api-request';
import { HistoryUpdateStatusModel } from '@/services/features/elearning/elearning.model';
import { ApiResponsePaging } from '@/models/api-response';
import { StatusRegisterEnum } from '@/services/shared/enum';
import { Constant } from '@/services/shared/constant';

// Định nghĩa data type của component [data] bằng Typescript
class PropskillCourseStatusComponentData {
  modelValue: HistoryUpdateStatusModel;
  status: any;
  isLoading: boolean;
}
class PropskillCourseStatusComponentProps {
  modelValue: HistoryUpdateStatusModel;
  status: any;
  isLoading: boolean;
}
export default defineComponent({
  name: 'PropskillCourseStatusComponent',
  components: {},
  props: {
    modelValue: {
      type: HistoryUpdateStatusModel,
      default: [],
      required: false,
    },
    status: {
      type: String,
      default: '',
      required: false,
    },
    isLoading: {
      type: Boolean,
      default: null,
    },
  },
  setup(props: PropskillCourseStatusComponentProps) {
    const { base } = useInit();
    const data = reactive<PropskillCourseStatusComponentData>({
      isLoading: props.isLoading, // boolean
      modelValue: { ...props.modelValue },
      status: props.status,
    });
    watch(
      () => props.isLoading,
      (newValue, oldValue) => {
        data.isLoading = newValue;
      }
    );
    const statusGetTitle = (status: string) => {
      switch (status) {
        case StatusRegisterEnum.IN_CONTACT:
          return Constant.STATUS_REGISTER.find((item) => item.key === StatusRegisterEnum.IN_CONTACT);
        case StatusRegisterEnum.CONTACT:
          return Constant.STATUS_REGISTER.find((item) => item.key === StatusRegisterEnum.CONTACT);
        case StatusRegisterEnum.REGISTER:
          return Constant.STATUS_REGISTER.find((item) => item.key === StatusRegisterEnum.REGISTER);
        case StatusRegisterEnum.IN_PROGRESS:
          return Constant.STATUS_REGISTER.find((item) => item.key === StatusRegisterEnum.IN_PROGRESS);
        case StatusRegisterEnum.RESERVE:
          return Constant.STATUS_REGISTER.find((item) => item.key === StatusRegisterEnum.RESERVE);
        case StatusRegisterEnum.COMPLETED:
          return Constant.STATUS_REGISTER.find((item) => item.key === StatusRegisterEnum.COMPLETED);
        default:
          return {};
      }
    };

    return {
      data,
      statusGetTitle,
      formatDate,
    };
  },
});
</script>
