<template>
  <div class="lead-header-component">
    <div class="container-content">
      <el-row>
        <el-col :span="24">
          <div class="tab">
            <div v-for="(item, index) in Constant.CHANGE_TAB" :key="index" :virtualIndex="index">
              <div
                class="card-content"
                :style="{
                  'border-color': item.border,
                }"
              >
                <div
                  class="lead-header-component__header__tab"
                  :class="data.activeTab === item.key && 'lead-header-component__header__tab--active'"
                  @click="switchTab(item.key)"
                >
                  <div
                    class="exploit-status-image exploit-status-image-potential"
                    :style="{
                      color: item.color,
                    }"
                    :class="[
                      item.key === PropSkillTabEnum.COURSE_ONLINE ? 'active-online' : '',
                      item.key === PropSkillTabEnum.COURSE_OFFLINE ? 'active-offline' : '',
                      item.key === PropSkillTabEnum.SPEAKER ? 'active-speaker' : '',
                    ]"
                  >
                    <img :src="item.icon" class="icon-header" />
                    <div class="exploit-status-content">
                      <div class="content-text">
                        <div class="list">Danh sách</div>
                        <span class="exploit-status-content-bottom">{{ item.title }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tab {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.icon-header {
  width: 50px;
  height: 50px;
  position: absolute;
  left: 70%;
  top: 19px;
}
.swiper-slide {
  display: flex;
  justify-content: center;
}
.card-content {
  position: relative;

  width: 267px;
  height: 88px;
  border: 1px solid black;
  border-radius: 10px;
}

.container-content {
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  padding-bottom: 15px;
}

.swiper-button-prev {
  position: absolute;
  top: calc(50% - 20px);
  left: -50px;
}
.swiper-button-next {
  position: absolute;
  top: calc(50% - 20px);
  right: -50px;
}
.lead-header-component {
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}
.exploit-status-content {
  width: 267px;
  height: 88px;
}
.exploit-status-content-bottom {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 130%;
  color: #0f0f0f;
}
.list {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
}
.content-text {
  padding: 23.5px 18px 23.5px 18px;
}
.lead-header-component {
  &__header {
    &__tab {
      cursor: pointer;
      &--active {
        .active-online {
          border: none;
          width: 100%;
          height: 100%;
          border-color: #dd0000;
          background: #dd0000;
          color: #ffffff !important;
          border-radius: 10px;
          box-shadow: 0px 10px 30px rgba(221, 0, 0, 0.2);
        }
        .active-speaker {
          border: none;
          width: 100%;
          height: 100%;
          border-color: #ff9900;
          background: #ff9900;
          color: #ffffff !important;
          border-radius: 10px;
          box-shadow: 0px 10px 30px rgba(255, 153, 0, 0.2);
        }
        .active-offline {
          border: none;
          width: 100%;
          height: 100%;
          border-color: #4792fc;
          background: #4792fc;
          color: #ffffff !important;
          border-radius: 10px;
          box-shadow: 0px 10px 30px rgba(71, 146, 252, 0.2);
        }
        .exploit-status-content-bottom {
          color: #ffffff !important;
        }
      }
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, onMounted, reactive, watch, ref } from 'vue';
import { useInit } from '@/services/shared/utils';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { PropSkillTabEnum } from '@/services/shared/enum';
import { Constant } from '@/services/shared/constant';
SwiperCore.use([Navigation, Autoplay]);
// Định nghĩa data type của component [data] bằng Typescript
class PropskillChangeTabComponentData {
  isLoading: boolean;
  activeTab: PropSkillTabEnum | string;
}

// Định nghĩa data type của component [props] bằng Typescript
class PropskillChangeTabComponentProps {
  activeTab: PropSkillTabEnum | string;
}

export default defineComponent({
  name: 'PropskillChangeTabComponent',
  el: '#tab',
  props: {
    Lead: {
      type: Object as () => any | null | undefined,
      default: null,
    },
    activeTab: {
      type: String,
      default: '',
    },
  },
  emits: ['onActiveTabChange'],
  setup(props: PropskillChangeTabComponentProps, { emit }: any) {
    // Setup Default
    const { base, userId } = useInit();
    // Component reactive data
    const data = reactive<PropskillChangeTabComponentData>({
      isLoading: false, // boolean
      activeTab: props.activeTab,
    });
    watch(
      () => props.activeTab,
      (newValue, oldValue) => {
        data.activeTab = newValue;
      }
    );
    // Chuyển tab
    const switchTab = (activeTab: PropSkillTabEnum) => {
      data.activeTab = activeTab;
      emit('onActiveTabChange', activeTab);
    };
    return {
      isActive: false,
      // Component reactive data
      data,
      // Enum
      PropSkillTabEnum,
      switchTab,
      Constant,
    };
  },
});
</script>
