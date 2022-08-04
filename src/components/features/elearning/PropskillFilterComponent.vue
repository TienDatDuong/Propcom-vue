<template>
  <div class="group-home">
    <el-card class="box-card" shadow="never">
      <div class="group-tag" v-if="data?.activeTab === PropSkillTabEnum.COURSE_ONLINE">
        <div
          class="filter-tag"
          v-for="(item, index) in Constant.STATUS_FILTER_ONLINE"
          :key="index"
          :virtualIndex="index"
          :class="{ active: item.key === data.typeGet }"
          @click="switchType(item.key)"
        >
          <span>{{ item.title }}</span
          ><span
            class="icon"
            :class="[
              item.key === PropskillDataGet.IN_PROGRESS ? 'active-icon-progress' : '',
              item.key === PropskillDataGet.COMPLETED ? 'active-icon-complete' : '',
              item.key === PropskillDataGet.ALL ? 'active-icon-all' : '',
            ]"
          ></span>
        </div>
      </div>
      <div class="group-tag" v-if="data?.activeTab === PropSkillTabEnum.COURSE_OFFLINE">
        <div
          class="filter-tag"
          v-for="(item, index) in Constant.STATUS_FILTER_OFFLINE"
          :key="index"
          :virtualIndex="index"
          :class="{ active: item.key === data.typeGet }"
          @click="switchType(item.key)"
        >
          <span>{{ item.title }}</span
          ><span
            class="icon"
            :class="[
              item.key === PropskillDataGet.OFFLINE_REGISTER ? 'active-icon-progress' : '',
              item.key === PropskillDataGet.COMPLETED ? 'active-icon-complete' : '',
              item.key === PropskillDataGet.ALL ? 'active-icon-all' : '',
            ]"
          ></span>
        </div>
      </div>
      <button class="filter-button" @click="toggledialogCategory">
        Theo thư mục<img src="~@/assets/images/filter/filter-category.png" class="icon" />
      </button>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.box-card {
  border-radius: 10px;
}

.group-home {
  padding-bottom: 20px;
}
::v-deep .el-card__body {
  width: 100%;
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  justify-content: space-between;
  padding: 14px 20px 13px 20px;
}
.group-tag {
  display: flex;
  flex-direction: row;
  gap: 10px;
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
.active-icon-progress {
  background-image: url('~@/assets/images/filter/in-progress-inactive-icon.png');
  width: 13px;
  height: 14px;
  background-size: 13px 14px;
  background-repeat: no-repeat;
  background-position: center;
}
.active-icon-complete {
  background-image: url('~@/assets/images/filter/done-inactive-icon.png');
  width: 13px;
  height: 14px;
  background-size: 13px 14px;
  background-repeat: no-repeat;
  background-position: center;
}
.active-icon-all {
  background-image: url('~@/assets/images/filter/all-inactive-icon.png');
  width: 13px;
  height: 14px;
  background-size: 13px 14px;
  background-repeat: no-repeat;
  background-position: center;
}
.filter-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 7px 12px;
  gap: 10px;
  width: 137px;
  height: 32px;
  background: #f2f2f2;
  border-radius: 100px;
  border-style: none;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 130%;
  color: #0f0f0f;
}
.lead-header-component {
  &__header {
    &__tab {
      cursor: pointer;
      &--active {
        .filter-tag {
          width: 100%;
          height: 100%;
          background: #ffeeed;
          color: #fb4d4d !important;
          border-radius: 10px;
          border-radius: 100px;
        }
        .active-icon-progress {
          background-image: url('~@/assets/images/filter/in-progress-active-icon.png');
          width: 13px;
          height: 14px;
          background-size: 13px 14px;
          background-repeat: no-repeat;
          background-position: center;
        }
        .active-icon-complete {
          background-image: url('~@/assets/images/filter/done-active-icon.png');
          width: 13px;
          height: 14px;
          background-size: 13px 14px;
          background-repeat: no-repeat;
          background-position: center;
        }
        .active-icon-all {
          background-image: url('~@/assets/images/filter/all-active-icon.png');
          width: 13px;
          height: 14px;
          background-size: 13px 14px;
          background-repeat: no-repeat;
          background-position: center;
        }
      }
    }
  }
}

.active .active-icon-progress,
.active .active-icon-complete,
.active .active-icon-all {
  width: 13px;
  height: 14px;
  background-size: 13px 14px;
  background-repeat: no-repeat;
  background-position: center;
}
.active .active-icon-progress {
  background-image: url('~@/assets/images/filter/in-progress-active-icon.png');
}
.active .active-icon-complete {
  background-image: url('~@/assets/images/filter/done-active-icon.png');
}
.active .active-icon-all {
  background-image: url('~@/assets/images/filter/all-active-icon.png');
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, computed, ref, onMounted, onUnmounted, watch } from 'vue';
import { useInit } from '@/services/shared/utils';
import {} from '@/services/features/elearning/elearning.service';
import { findInvestorSuggest } from '@/services/features/investor/investor.service';
import { ApiRequestPaging } from '@/models/api-request';
import {} from '@/services/features/elearning/elearning.model';
import { ApiResponsePaging } from '@/models/api-response';
import { Constant } from '@/services/shared/constant';
import { PropskillDataGet, PropSkillTabEnum } from '@/services/shared/enum';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { debounce } from 'lodash';
SwiperCore.use([Navigation, Autoplay]);

// Định nghĩa data type của component [data] bằng Typescript
class PropskillFilterComponentData {
  activeTab: PropSkillTabEnum | string;
  typeGet: PropskillDataGet | string;
  filterTag: any;
}

export default defineComponent({
  name: 'PropskillFilterComponent',
  components: {},
  emits: ['onActiveTypeChange', 'toggledialogCategory'],
  props: {
    activeTab: {
      type: String,
      default: '',
    },
    typeGet: {
      type: String,
      default: '',
    },
    filterTag: {
      type: Array,
      default: null,
    },
  },
  setup(props: PropskillFilterComponentData, { emit }: any) {
    const data = reactive<PropskillFilterComponentData>({
      activeTab: props.activeTab,
      typeGet: props.typeGet,
      filterTag: { ...props.filterTag },
    });
    watch(
      () => [props.activeTab, props.typeGet],
      (newValue) => {
        data.activeTab = newValue[0];
        data.typeGet = newValue[1];
      }
    );

    // Chuyển tab
    const switchType = (typeGet: PropskillDataGet) => {
      data.typeGet = typeGet;
      emit('onActiveTypeChange', typeGet);
    };
    // Functions
    const toggledialogCategory = debounce(() => {
      emit('toggledialogCategory', true);
    }, 300);

    return { Constant, PropskillDataGet, PropSkillTabEnum, data, switchType, toggledialogCategory };
  },
});
</script>
