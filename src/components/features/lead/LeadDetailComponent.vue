<template>
  <el-card :body-style="{ padding: '0px' }" shadow="never" class="box-card">
    <div class="lead-detail-component">
      <div class="lead-detail-component__header">
        <div class="lead-detail-component__header__info">
          <div class="top-left-side">
            <div class="customer-code">
              <div class="customer-code-title">
                <div class="icon-hot" v-if="data.dataSource?.isPotential">
                  <img src="~@/assets/images/hot-deal.png" />
                </div>
                Mã khách hàng:
                {{ data.dataSource?.code }}
              </div>
              <span
                class="customer-code-title"
                v-if="[ExploitEnum.REASSIGN, ExploitEnum.ASSIGN].includes(data.dataSource?.exploitStatus)"
              >
                <span class="image-timer"><img src="~@/assets/images/timer.png" /></span>
                <span v-if="timer.minutes.value === 0 && timer.seconds.value === 0"> Hết thời gian đăng ký </span
                ><span v-else>
                  {{ timer.minutes.value < 10 ? `0${timer.minutes.value}` : timer.minutes }}:{{
                    timer.seconds.value < 10 ? `0${timer.seconds.value}` : timer.seconds
                  }}
                </span>
              </span>
            </div>
          </div>
          <div class="top-right-side">
            <div class="customer-contact">
              <div class="customer-phone">
                {{
                  data.dataSource?.isUsingPhoneId
                    ? ''
                    : data.dataSource?.visiblePhone?.value
                    ? data.dataSource?.phone
                    : hiddenPhoneNumbers(data.dataSource?.phone)
                }}
              </div>
              <el-tooltip placement="top" :disabled="data.dataSource?.name?.length > 20 ? false : true">
                <template #content v-if="data.dataSource?.name">
                  <span>{{ data.dataSource?.name }}</span>
                </template>
                <div class="customer-name">{{ data.dataSource?.name }}</div>
              </el-tooltip>
            </div>
            <div v-if="data.activeTab != ExploitEnum.CANCEL">
              <div class="call">
                <CallComponent :modelValue="data.dataSource" />
              </div>
            </div>
            <div v-else>
              <div class="block">
                <el-avatar :size="50">
                  <img src="~@/assets/images/avatar-default.png" />
                </el-avatar>
              </div>
            </div>
          </div>
        </div>
        <div v-if="data.activeTab != ExploitEnum.CANCEL" class="lead-detail-component__header__detail">
          <div class="bottom-left-side">
            <el-tooltip
              placement="top"
              :disabled="
                (BuySellEnum && data.dataSource?.demand?.type
                  ? convertGetMasterData(BuySellEnum, data.dataSource?.demand?.type)
                  : ''
                ).length > 11
                  ? false
                  : true
              "
            >
              <template #content>
                <span>{{
                  BuySellEnum && data.dataSource?.demand?.type
                    ? convertGetMasterData(BuySellEnum, data.dataSource?.demand?.type)
                    : ''
                }}</span>
              </template>
              <div style="display: flex">
                <div class="detail-content-title">Nhu cầu:</div>
                <div class="detail-content-text">
                  {{
                    BuySellEnum && data.dataSource?.demand?.type
                      ? convertGetMasterData(BuySellEnum, data.dataSource?.demand?.type)
                      : ''
                  }}
                </div>
              </div>
            </el-tooltip>
            <el-tooltip
              placement="top"
              :disabled="
                (data.masterData?.data.projectTypeList && data.dataSource?.demand?.realEstate
                  ? convertGetMasterData(data.masterData?.data.projectTypeList, data.dataSource?.demand.realEstate)
                  : ''
                ).length > 11
                  ? false
                  : true
              "
            >
              <template #content>
                <span>{{
                  data.masterData?.data.projectTypeList && data.dataSource?.demand?.realEstate
                    ? convertGetMasterData(data.masterData?.data.projectTypeList, data.dataSource?.demand.realEstate)
                    : ''
                }}</span>
              </template>
              <div style="display: flex">
                <div class="detail-content-title">Loại BĐS:</div>
                <div class="detail-content-text">
                  {{
                    data.masterData?.data.projectTypeList && data.dataSource?.demand?.realEstate
                      ? convertGetMasterData(data.masterData?.data.projectTypeList, data.dataSource?.demand.realEstate)
                      : ''
                  }}
                </div>
              </div>
            </el-tooltip>
          </div>
          <div class="bottom-right-side">
            <el-tooltip
              placement="top"
              :disabled="convertNumberToWord(data.dataSource?.demand?.price).length > 11 ? false : true"
            >
              <template #content>
                <span>{{ convertNumberToWord(data.dataSource?.demand?.price) }}</span>
              </template>
              <div style="display: flex">
                <div style="display: flex" v class="detail-content-title">Giá:</div>
                <div class="detail-content-text" style="max-width: 70%">
                  {{ convertNumberToWord(data.dataSource?.demand?.price) }}
                </div>
              </div>
            </el-tooltip>
            <el-tooltip
              placement="top"
              :disabled="formatNumber(data.dataSource?.demand?.acreage).length > 6 ? false : true"
            >
              <template #content>
                <span>{{ formatNumber(data.dataSource?.demand?.acreage) }}</span>
              </template>
              <div style="display: flex">
                <div class="detail-content-title">Diện tích:</div>
                <div class="detail-content-text">
                  {{ data.dataSource?.demand?.acreage ? formatNumber(data.dataSource?.demand?.acreage) : 0 }}
                </div>
                <div class="unit">m2</div>
              </div>
            </el-tooltip>
          </div>
        </div>
      </div>
      <div class="lead-detail-component__footer">
        <el-button @click="goToLeadDetail(data.dataSource?.id)" class="button" type="primary" text bg
          ><span v-if="data?.dataSource?.exploitStatus !== ExploitEnum.CANCEL">Thêm</span><span v-else>Xem</span> thông
          tin khách hàng</el-button
        >
      </div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.lead-detail-component {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px 20px;
  width: 100%;
  height: 100%;

  .box-card {
    border-radius: 10px !important;
  }

  &__header {
    align-items: flex-start;
    padding: 0px;
    gap: 15px;
    width: 350px;
    height: auto;
  }
  &__footer {
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 9px;

    width: 234px;
    height: 34px;
  }
  .lead-detail-component__header__info {
    display: flex;
    border-bottom: 1px dashed #c1c1c1;
    height: 50%;
    padding-bottom: 5px;
    flex-direction: column;
  }

  .lead-detail-component__header__detail {
    display: flex;
    justify-content: flex-start;
    height: 50%;
    padding: 5px 0;
  }
  .top-left-side {
    width: 100%;
    display: grid;
    flex-direction: column;
    row-gap: 10px;
  }
  .top-right-side {
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    row-gap: 10px;
  }
  .image-timer {
    padding-right: 5px;
  }
  .bottom-left-side,
  .bottom-right-side {
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    width: 50%;
  }
  .customer-phone {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 130%;
    color: #0f0f0f;
    width: 40%;
  }
  .customer-contact {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .customer-code {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    color: #dd0000 !important;
    display: flex;
    justify-content: space-between;
  }
  .customer-code-title {
    display: flex;
    justify-content: start;
    align-items: center;
  }
  .customer-name {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 130%;
    color: #0f0f0f;
    display: list-item;
    width: 60%;
  }
  .lead-detail-component__footer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
    gap: 5px;
    width: 100%;
    height: 30%;
  }
  .button {
    width: 85%;
    height: 100%;
    background: #f2f2f2;
    border-radius: 5px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 13px;
    line-height: 110%;
    color: #0f0f0f;
    border-color: #f2f2f2;
  }
}
.unit {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 130%;
  color: #0f0f0f;
}
.detail-content-text {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 130%;
  color: #0f0f0f;
  max-width: 50%;
  overflow: hidden;
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 2px;
}
.detail-content-title {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 130%;
  color: #5a5a5a;
}
.icon-hot {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 5px;
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive } from 'vue';
import CallComponent from './CallComponent.vue';
import {
  useInit,
  formatNumber,
  convertGetMasterData,
  convertNumberToWord,
  hiddenPhoneNumbers,
} from '@/services/shared/utils';
import { ExploitEnum, LeadModel, BuySellEnum } from '@/services/features/lead/lead.model';
import { updateExploitStatus } from '@/services/features/lead/lead.service';
import { useTimer } from 'vue-timer-hook';

// Định nghĩa data type của component [props] bằng Typescript
class LeadDetailComponentProps {
  modelValue: LeadModel;
  activeTab: ExploitEnum | string;
  masterData: any;
}

// Định nghĩa data type của component [data] bằng Typescript
class LeadDetailComponentData {
  dataSource: LeadModel | null;
  activeTab: ExploitEnum | string;
  masterData: any;
}

export default defineComponent({
  name: 'LeadDetailComponent',
  components: {
    CallComponent,
  },
  props: {
    modelValue: {
      type: LeadModel,
      default: null,
      required: true,
    },
    activeTab: {
      type: String,
      default: '',
    },
    masterData: {
      type: Object,
      default: null,
    },
  },
  setup(props: LeadDetailComponentProps, { emit }: any) {
    // Setup Default
    const { base } = useInit();
    const data = reactive<LeadDetailComponentData>({
      dataSource: { ...props.modelValue },
      activeTab: props.activeTab,
      masterData: props.masterData,
    });

    const goToLeadDetail = async (id: string) => {
      if (data.dataSource && data.dataSource.exploitStatus === ExploitEnum.ASSIGN) {
        await updateExploitStatus({ id: id, exploitStatus: ExploitEnum.PROCESSING });
      }
      base.router.push({ name: 'lead-detail', params: { id } });
    };

    const time = new Date(data.dataSource?.assignedDate ?? '');
    time.setMinutes(time.getMinutes() + (data.dataSource?.assignDuration ?? 1));
    const timeToNumber = time.getTime();
    const timer = useTimer(timeToNumber, true);

    return {
      // Component reactive data
      data,
      timer,
      ExploitEnum,
      BuySellEnum,
      goToLeadDetail,
      formatNumber,
      hiddenPhoneNumbers,
      convertNumberToWord,
      convertGetMasterData,
    };
  },
});
</script>
