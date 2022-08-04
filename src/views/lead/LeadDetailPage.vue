<template>
  <div class="lead-detail-page">
    <AppBreadcrumbBarComponent />
    <div class="container-xl">
      <el-card class="box-card">
        <template #header>
          <div class="header-card">Thông tin khách hàng</div>
        </template>
        <div class="lead-detail-component">
          <div class="lead-detail-component__header">
            <div class="lead-detail-component__header__info">
              <div class="top-left-side">
                <div class="customer-code">Mã khách hàng: {{ data.lead?.code }}</div>
                <div class="customer-contact">
                  <el-container>
                    <el-aside class="avatar">
                      <el-avatar :size="45"><img src="~@/assets/images/avatar-default-red.png" /></el-avatar>
                    </el-aside>
                    <el-main class="customer-info">
                      <div class="customer-phone">
                        {{
                          data.lead?.isUsingPhoneId
                            ? ''
                            : data.lead?.visiblePhone
                            ? data.lead?.phone
                            : hiddenPhoneNumbers(data.lead?.phone)
                        }}
                      </div>
                      <div class="customer-name">{{ data.lead?.name }}</div>
                    </el-main>
                  </el-container>
                </div>
              </div>
            </div>
            <div class="lead-detail-component__header__detail">
              <div class="bottom-left-side">
                <div class="item-list">
                  <span class="detail-content-title"> Nhu cầu: </span>
                  <span class="detail-content-text">
                    {{
                      BuySellEnum && data.lead?.demand?.type
                        ? convertGetMasterData(BuySellEnum, data.lead?.demand?.type)
                        : ''
                    }}
                  </span>
                </div>
                <div class="item-list">
                  <span class="detail-content-title">Giá: </span
                  ><span class="detail-content-text">{{ convertNumberToWord(data.lead?.demand?.price) ?? '' }}</span>
                </div>
                <div class="item-list">
                  <span class="detail-content-title">Diện tích: </span
                  ><span class="detail-content-text">{{ formatNumber(data.lead?.demand?.acreage) ?? '' }}</span>
                </div>
                <div class="item-list">
                  <span class="detail-content-title">Hướng:</span>
                  <span class="detail-content-text">
                    {{
                      data.masterData?.data?.projectDirection && data.lead?.demand?.orientation
                        ? convertGetMasterData(data.masterData?.data?.projectDirection, data.lead?.demand?.orientation)
                        : ''
                    }}
                  </span>
                </div>
              </div>
              <div class="bottom-right-side">
                <div class="item-list">
                  <span class="detail-content-title">Loại BĐS:</span>
                  <span class="detail-content-text">
                    {{
                      data.masterData?.data?.projectTypeList && data.lead?.demand?.realEstate
                        ? convertGetMasterData(data.masterData?.data?.projectTypeList, data.lead?.demand?.realEstate)
                        : ''
                    }}
                  </span>
                </div>
                <div class="item-list">
                  <span class="detail-content-title">Dự án:</span
                  ><span class="detail-content-text"> {{ data.lead?.project?.name }}</span>
                </div>
                <div class="item-list">
                  <span class="detail-content-title">Khu vực:</span
                  ><span class="detail-content-text">{{ data.lead?.demand?.area }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="lead-detail-component__footer">
            <div class="footer-left-side">
              <div class="note">
                <div class="item-list">
                  <span class="detail-content-title">Ghi chú:</span
                  ><span class="detail-content-text">{{ data.lead?.note }}</span>
                </div>
              </div>
              <el-switch
                v-if="data.lead?.exploitStatus !== ExploitEnum.CANCEL"
                v-model="data.isPotential"
                @change="updatePotential(data.isPotential)"
                active-text="Khách hàng tiềm năng"
              />
              <div v-else>
                Lý do:
                {{
                  isNotReasonOption
                    ? convertGetMasterData(optionReturnEnum, data.lead?.rejectReason)
                    : data.lead?.rejectReason
                }}
              </div>
            </div>
          </div>
        </div>
      </el-card>
      <div class="group-button">
        <template v-if="data.lead?.exploitStatus !== ExploitEnum.CANCEL">
          <el-button @click="addInfoCustomer(data.leadId)" class="button add-button" type="primary" text bg>{{
            data.lead?.exploitStatus !== ExploitEnum.DONE ? 'Thêm thông tin' : 'Cập nhật'
          }}</el-button>
          <el-button
            class="button call-button"
            type="primary"
            text
            bg
            @click="onGoPhone()"
            :class="{ disabled: !stringeeToken }"
            >Gọi điện</el-button
          >
        </template>
        <template v-else>
          <el-button class="button add-button" @click="goToLeadPage()" type="primary" text bg
            >Trở về danh sách khách hàng</el-button
          >
          <el-button class="button call-button" @click="openDialogReasonReturnVisible(true)" type="primary" text bg
            >Cập nhật</el-button
          >
        </template>
      </div>
    </div>
    <el-dialog v-model="data.dialogReasonReturnVisible" width="700px" custom-class="app-dialog">
      <template #title>
        <span class="app-dialog-title">Cập nhật lý do trả về</span>
      </template>
      <div class="app-dialog-content">
        <span class="el-radio__label">Lý do khác</span>
        <el-row>
          <el-col :span="4"></el-col>
          <el-col :span="16">
            <el-input prop="name" v-model="data.rejectReason" :rows="2" type="textarea" placeholder="Nhập lý do khác" />
          </el-col>
          <el-col :span="4"></el-col>
        </el-row>
        <div class="group-button">
          <el-button @click="openDialogReasonReturnVisible(false)" class="button add-button" type="primary" text bg
            >Quay lại</el-button
          >
          <el-button class="button call-button" @click="handleSubmitEdit" type="primary" text bg>Cập nhật</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog v-model="data.dialog.isShow" :title="data.dialog.title" width="30%">
      <span>{{ data.dialog.content }}</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button class="default" @click="data.dialog.isShow = false">Cancel</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.lead-detail-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__container {
    padding: 10px 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border: $border;
    box-sizing: border-box;
    border-radius: $borderRadius;
    background: #ffffff;

    &__header {
      padding-top: 50px;
    }
  }
}

.header-card {
  background: white !important;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 130%;
  color: #5a5a5a;
  text-align: center;
}

.box-card {
  margin-top: 40px;
  border-radius: 10px !important;
}

.avatar {
  @media (min-width: 2560px) {
    width: 7%;
  }

  @media (max-width: 2559px) {
    width: 7%;
  }

  @media (max-width: 1600px) {
    width: 7%;
  }

  @media (max-width: 1024px) {
    width: 10%;
  }

  @media (max-width: 768px) {
    width: 12%;
  }

  @media (max-width: 425px) {
    width: 25%;
  }
}

.group-button {
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.customer-info {
  padding: 0px !important;
}

.button {
  width: 85%;
  height: 40%;
  border-radius: 5px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 110%;
}

.add-button {
  gap: 10px;
  width: 250px;
  border-radius: 5px;
  background: #f2f2f2;
  color: #0f0f0f;
  border-color: #f2f2f2;
}

.call-button {
  gap: 10px;
  width: 250px;
  background: #dd0000;
  border-radius: 5px;
  color: #ffffff;
  border-color: #dd0000;
  &.disabled {
    pointer-events: none;
    opacity: 0.6;
  }
}

.lead-detail-component {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 60%;

  &__header {
    align-items: flex-start;
    padding: 0px;
    gap: 15px;
    width: 100%;
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
    border-bottom: 1px dashed #c1c1c1;
    height: 50%;
    padding-bottom: 10px;
  }

  .lead-detail-component__header__detail {
    display: flex;
    justify-content: flex-start;
    height: 50%;
    border-bottom: 1px dashed #c1c1c1;
    padding: 10px 0;
  }

  .top-left-side {
    width: 65%;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }

  .bottom-left-side,
  .bottom-right-side {
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    width: 50%;
    padding-left: 15px;
  }

  .customer-phone {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 130%;
    color: #0f0f0f;
  }

  .customer-contact {
    height: 50%;
  }

  .customer-code {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    color: #dd0000 !important;
    height: 25%;
  }

  .customer-name {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 130%;
    color: #0f0f0f;
  }

  .lead-detail-component__footer {
    display: flex;
    justify-content: start;
    gap: 5px;
    width: 100%;
    height: 30%;
    padding-top: 10px;
  }
}
.detail-content-text {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 130%;
  color: #0f0f0f;
}
.detail-content-title {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 130%;
  color: #5a5a5a;
  padding-right: 10px;
}
.item-list {
  display: list-item;
  list-style-image: url('~@/assets/images/bullet-for-list.png');
  padding-inline-start: 1ch;
  padding-left: 10px;
}
.note {
  padding-left: 15px;
  padding-bottom: 15px;
}
.app-dialog-title {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  color: #0f0f0f;
}
.app-dialog-content p {
  line-height: 26px;
  font-weight: 700;
  text-align: center;
  letter-spacing: 0.5px;
}
::v-deep .el-dialog {
  min-width: 836px;
}
.el-radio {
  width: 530px;
  margin: 0 auto;
}
.el-textarea__inner {
  height: 70px;
}
.el-radio__label {
  font-size: var(--el-radio-font-size);
  padding-left: 10px;
  width: 547px;
  margin: 10px auto;
  display: flex;
  font-weight: 600;
  color: #0f0f0f;
}
</style>

<script lang="ts">
import { ExploitEnum, LeadModel, BuySellEnum, optionReturnEnum } from '@/services/features/lead/lead.model';
import { findLeadById, updateExploitStatus, updateInfo } from '@/services/features/lead/lead.service';
import { VoiceCallService } from '@/services/features/stringee/stringee.service';
import {
  useInit,
  formatNumber,
  convertGetMasterData,
  convertNumberToWord,
  hiddenPhoneNumbers,
} from '@/services/shared/utils';
import { ElLoading } from 'element-plus';
import { defineComponent, onMounted, reactive, computed } from 'vue';
import { getMasterData } from '@/services/features/master-data/master-data.service';

// Định nghĩa data type của component [data] bằng Typescript
class LeadDetailPageData {
  isLoading: boolean;
  isLoadingMore: boolean;
  leadId: string;
  lead: LeadModel | null;
  isPotential: boolean;
  dialogReasonReturnVisible: boolean;
  notification: any;
  dialog: any | null;
  rejectReason: string | null;
  masterData: any;
}

export default defineComponent({
  name: 'LeadDetailPage',
  components: {},
  setup() {
    // Setup Default
    const { base, isLoggedIn, stringeeToken } = useInit();
    // Component reactive data
    const data = reactive<LeadDetailPageData>({
      isLoading: false,
      isLoadingMore: false,
      leadId: base.route.params.id as string,
      lead: null,
      isPotential: false,
      dialogReasonReturnVisible: false,
      notification: {},
      dialog: {
        isShow: false,
        title: '',
        content: '',
      },
      rejectReason: null,
      masterData: null,
    });

    const onGoPhone = async () => {
      const requestCallRoute = {
        toNumber: data.lead?.isUsingPhoneId && data.lead?.phoneId ? data.lead?.phoneId : data.lead?.phone,
        name: data.lead?.isUsingPhoneId && data.lead?.phoneId ? data.lead?.phoneId : data.lead?.phone,
        isPhoneId: data.lead?.isUsingPhoneId ? true : false,
        isMobileCarrier: data.lead?.isCallingViaCarrier,
        mobileCarriers: data.lead?.callingMethodCarrier,
        numberMobileMethodCarriers: data.lead?.numberMobileMethodCarriers,
        idLead: data.lead?.id,
        exploitStatus: data.lead?.exploitStatus,
        lead: data.lead,
      };
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      try {
        await VoiceCallService.prototype.callOutWithRouteCall(requestCallRoute);
        // Cập nhật trạng thái lead khi bắt đầu gọi điện, để thực hiện khảo sát
        if (
          requestCallRoute.exploitStatus === ExploitEnum.ASSIGN ||
          requestCallRoute.exploitStatus === ExploitEnum.REASSIGN
        ) {
          await updateExploitStatus({ id: requestCallRoute.idLead, exploitStatus: ExploitEnum.PROCESSING });
        }
        data.notification = await (
          await VoiceCallService.prototype.getNotification()
        ).subscribe((noti: any) => {
          if (!noti.isSuccess) {
            data.dialog.isShow = true;
            data.dialog.title = noti?.error;
            data.dialog.content = noti?.message;
          }
        });
      } finally {
        loading.close();
      }
    };

    const addInfoCustomer = async (id: string) => {
      if (data.lead && [ExploitEnum.ASSIGN, ExploitEnum.REASSIGN].includes(data.lead?.exploitStatus)) {
        await updateExploitStatus({ id: id, exploitStatus: ExploitEnum.PROCESSING });
      }
      base.router.push({ name: 'lead-update', params: { id } });
    };
    const goToLeadPage = () => {
      base.router.push({ name: 'lead' });
    };

    const updatePotential = async (isPotential: boolean) => {
      if (data.leadId) {
        await updateInfo({ id: data.leadId, isPotential: isPotential });
      }
    };

    const openDialogReasonReturnVisible = async (open: boolean) => {
      data.dialogReasonReturnVisible = open;
    };

    const handleSubmitEdit = async () => {
      if (data.lead && data.lead.id) {
        const model = { exploitStatus: ExploitEnum.CANCEL, id: data.lead.id, rejectReason: data.rejectReason };
        if (!data.rejectReason) {
          base.toast.error('Bạn chưa nhập lý do');
          return;
        }
        const response = await updateInfo(model);
        if (response.isSuccess) {
          base.toast.success('Cập nhật thông tin thành công!');
          data.dialogReasonReturnVisible = false;
        }
      }
    };

    const isNotReasonOption = computed(() => {
      return optionReturnEnum.some((item) => item.key === data.lead?.rejectReason);
    });

    // Life cycle event
    onMounted(async () => {
      data.isLoading = true;
      try {
        if (isLoggedIn.value) {
          const leadResponse = await findLeadById(data.leadId);
          const resMasterData = await getMasterData();
          data.masterData = resMasterData;
          data.lead = leadResponse.result;
          data.rejectReason = leadResponse.result.rejectReason;
          data.isPotential = leadResponse.result.isPotential;
        }
      } finally {
        data.isLoading = false;
      }
    });

    return {
      // Enum
      // Data
      data,
      ExploitEnum,
      BuySellEnum,
      optionReturnEnum,
      // Computed
      stringeeToken,
      isLoggedIn,
      isNotReasonOption,
      // Function
      goToLeadPage,
      formatNumber,
      hiddenPhoneNumbers,
      updatePotential,
      openDialogReasonReturnVisible,
      addInfoCustomer,
      onGoPhone,
      convertGetMasterData,
      convertNumberToWord,
      handleSubmitEdit,
    };
  },
});
</script>
