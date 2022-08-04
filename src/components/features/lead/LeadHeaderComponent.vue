<template>
  <div class="lead-header-component">
    <AppBreadcrumbBarComponent />
    <div class="container-xl container-content">
      <el-row>
        <el-col :span="24">
          <swiper
            :slides-per-view="4"
            :space-between="0"
            :loop="false"
            :navigation="{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }"
            :autoplay="{ delay: 5000 }"
            :breakpoints="{
              '400': {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              '733': {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              '1000': {
                slidesPerView: 4,
                spaceBetween: 15,
              },
              '1400': {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }"
            :pagination="{
              clickable: true,
            }"
          >
            <swiper-slide
              ><div class="card-content">
                <div
                  class="lead-header-component__header__tab"
                  :class="data.activeTab === ExploitEnum.POTENTIAL && 'lead-header-component__header__tab--active'"
                  @click="switchTab(ExploitEnum.POTENTIAL)"
                >
                  <div class="exploit-status-image exploit-status-image-potential">
                    <div class="exploit-status-content">
                      <div class="content-text">
                        <span class="exploit-status-content-top">{{ data?.statusPotential }}</span
                        ><br />
                        <span class="exploit-status-content-bottom">Tiềm năng</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div></swiper-slide
            >
            <swiper-slide
              ><div class="card-content">
                <div
                  class="lead-header-component__header__tab"
                  :class="data.activeTab === ExploitEnum.ASSIGN && 'lead-header-component__header__tab--active'"
                  @click="switchTab(ExploitEnum.ASSIGN)"
                >
                  <div class="exploit-status-image exploit-status-image-wait">
                    <div class="exploit-status-content">
                      <div class="content-text">
                        <span class="exploit-status-content-top">{{ data.statusData?.assigned }}</span
                        ><br />
                        <span class="exploit-status-content-bottom">Chờ khảo sát</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div></swiper-slide
            >
            <swiper-slide
              ><div class="card-content">
                <div
                  class="lead-header-component__header__tab"
                  :class="data.activeTab === ExploitEnum.PROCESSING && 'lead-header-component__header__tab--active'"
                  @click="switchTab(ExploitEnum.PROCESSING)"
                >
                  <div class="exploit-status-image exploit-status-image-waiting">
                    <div class="exploit-status-content">
                      <div class="content-text">
                        <span class="exploit-status-content-top">{{ data.statusData?.processing }}</span
                        ><br />
                        <span class="exploit-status-content-bottom">Đang chờ khảo sát</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div></swiper-slide
            >
            <swiper-slide
              ><div class="card-content">
                <div
                  class="lead-header-component__header__tab"
                  :class="data.activeTab === ExploitEnum.DONE && 'lead-header-component__header__tab--active'"
                  @click="switchTab(ExploitEnum.DONE)"
                >
                  <div class="exploit-status-image exploit-status-image-done">
                    <div class="exploit-status-content">
                      <div class="content-text">
                        <span class="exploit-status-content-top">{{ data.statusData?.done }}</span
                        ><br />
                        <span class="exploit-status-content-bottom">Đã hoàn tất</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div></swiper-slide
            >
            <swiper-slide
              ><div class="card-content">
                <div
                  class="lead-header-component__header__tab"
                  :class="data.activeTab === ExploitEnum.CANCEL && 'lead-header-component__header__tab--active'"
                  @click="switchTab(ExploitEnum.CANCEL)"
                >
                  <div class="exploit-status-image exploit-status-image-returned">
                    <div class="exploit-status-content">
                      <div class="content-text">
                        <span class="exploit-status-content-top">{{ data.statusData?.cancel }}</span
                        ><br />
                        <span class="exploit-status-content-bottom">Đã trả về</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div></swiper-slide
            >
            ...
          </swiper>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <div v-if="data.activeTab === ExploitEnum.POTENTIAL">
            <div class="title">Tệp khách hàng tiềm năng</div>
          </div>
          <div v-else-if="data.activeTab === ExploitEnum.ASSIGN">
            <div class="title">Khách hàng khảo sát</div>
          </div>
          <div v-else-if="data.activeTab === ExploitEnum.PROCESSING">
            <div class="title">Khách hàng đang chờ khảo sát</div>
          </div>
          <div v-else-if="data.activeTab === ExploitEnum.DONE">
            <div class="title">Khách hàng đã hoàn tất</div>
          </div>
          <div v-else>
            <div class="title">Khách hàng đã trả về</div>
          </div>
        </el-col>

        <el-col :span="8" v-if="data.activeTab !== ExploitEnum.CANCEL"
          ><div class="history-call" @click="goToHistoryCall()">
            <img src="~@/assets/images/history-call.png" />
            <span class="history-call-text"> Lịch sử cuộc gọi</span>
          </div></el-col
        >
        <el-col :span="8" v-else>
          <div class="history-call">
            <el-button ref="excel" class="control-text control-text-color" show-close="false">
              <a @click="downloadTemplate"> Tải template về </a>
            </el-button>
            <el-button class="control-text" type="primary" text @click="data.dialogVisible = true" show-close="false"
              >Nhập từ Excel
            </el-button>

            <el-dialog
              v-model="data.dialogVisible"
              title="Nhập từ Excel"
              width="750px"
              height="50%"
              class="boxUpload"
              draggable
            >
              <template #footer>
                <el-upload
                  ref="upload"
                  class="upload-demo"
                  action=""
                  :auto-upload="false"
                  :on-change="onChangeFile"
                  v-loading="data.isLoading"
                  :show-file-list="false"
                  accept=".xlsx,.xlsm,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                >
                  <div class="el-upload__text">
                    <img src="@/assets/images/upload-icon-20627.png" />
                    <div>Nhập file Excel</div>
                  </div>
                </el-upload>
              </template>
            </el-dialog>
            <el-dialog
              v-model="data.dialogVisibleInfo"
              title="Nhập từ Excel"
              width="750px"
              class="boxUpload lable-text"
              draggable
            >
              <template :class="data.responseImport.length > 2 ? 'footer' : 'footer-min'">
                <div :class="data.responseImport.length > 2 ? 'upload-demo-suc-max' : 'upload-demo-suc'">
                  <div class="upload">
                    <div class="lable-text" v-for="(item, index) in data.responseImport" :key="index">
                      {{
                        data.responseImport.length > 0
                          ? `Lỗi: ${data.responseImport[index]?.error} - Tại bản ghi: ${data.responseImport[index]?.line} `
                          : 'Tải file về thành công không có bản ghi nào bị lỗi '
                      }}
                    </div>
                  </div>
                </div>
                <el-button @click="data.dialogVisibleInfo = false" :on-change="successfulUpload" class="Cancel-Upload"
                  >Thoát</el-button
                >
              </template>
            </el-dialog>
          </div>
          <div class="text-line-clamp-1"></div
        ></el-col>
      </el-row>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.swiper-slide {
  display: flex;
  justify-content: center;
}
.card-content {
  border-radius: 10px;
  width: 224px;
  height: 120px;
}

.container-content {
  height: 170px;
  display: flex;
  flex-direction: column;
  row-gap: 5px;
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

  .title {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 130%;
    color: #5a5a5a;
    padding-left: 8px;
  }
  .history-call {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 130%;
    color: #a7a7a7;
    text-align: center;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: end;
    min-width: 150px;
  }
  .history-call-text {
    padding-left: 5px;
    padding-right: 8px;
    &:hover {
      color: #dd0000;
    }
  }
  &__header {
    height: 150px;
    border-top: $border;
    display: flex;
    flex-direction: row;
    column-gap: 40px;

    &__tab {
      cursor: pointer;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      color: #a7a7a7;

      .exploit-status-image {
        width: 225px;
        height: 110px;
        display: flex;
        flex-direction: column;
        border-radius: 10px;
      }

      .exploit-status-content {
        margin: 20px;
      }

      .exploit-status-content-top {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 130%;
      }

      .exploit-status-content-bottom {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 130%;
      }

      .exploit-status-image-potential {
        background: url('~@/assets/images/potential.png');
        color: #4376e2;
      }

      .exploit-status-image-wait {
        background: url('~@/assets/images/wait-survey.png');
        color: #dd0000;
      }

      .exploit-status-image-waiting {
        background: url('~@/assets/images/waiting-survey.png');
        color: #fe9f06;
      }

      .exploit-status-image-done {
        background: url('~@/assets/images/done.png');
        color: #4bb645;
      }

      .exploit-status-image-returned {
        background: url('~@/assets/images/returned.png');
        color: #796479;
      }

      &--active {
        .exploit-status-image-potential {
          background: url('~@/assets/images/potential-hover.png');
          box-shadow: 0px 5px 15px rgba(69, 131, 244, 0.3);
        }

        .exploit-status-image-wait {
          background: url('~@/assets/images/wait-survey-hover.png');
          box-shadow: 0px 5px 15px rgba(221, 0, 0, 0.2);
        }

        .exploit-status-image-waiting {
          background: url('~@/assets/images/waiting-survey-hover.png');
          box-shadow: 0px 5px 15px rgba(254, 188, 11, 0.3);
        }

        .exploit-status-image-done {
          background: url('~@/assets/images/done-hover.png');
          box-shadow: 0px 5px 15px rgba(75, 182, 69, 0.3);
        }

        .exploit-status-image-returned {
          background: url('~@/assets/images/returned-hover.png');
          box-shadow: 0px 5px 15px rgba(121, 99, 121, 0.2);
        }

        .content-text {
          color: #ffffff !important;
        }
      }

      .exploit-status-image-potential,
      .exploit-status-image-wait,
      .exploit-status-image-waiting,
      .exploit-status-image-done,
      .exploit-status-image-returned {
        background-repeat: no-repeat;
        background-position: center;
      }
    }
  }
}
.upload-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 130px;
}
.upload-demo-suc {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 64px;
  margin-top: 3%;
}
.upload-demo-suc-max {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 169px;
  margin-top: 3%;
}
.el-upload__text {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  line-height: 1.6;
  border-radius: 10px;
  width: 482px;
  height: 65px;
  background-color: #f2f2f2;
  font-family: 'Roboto';
  font-style: normal;
  font-size: 16px;
  line-height: 26px;
  text-align: center;
  color: #0f0f0f;
  &:hover {
    background: #fff;
    border: 2px dashed #f2f2f2;
  }
}
.el-upload__text_em {
  font-size: 16px;
}
::v-deep.el-upload-dragger {
  width: 400px;
}
.btn_server {
  margin-top: 20px;
}
::v-deep .el-upload-list__item:first-child {
  margin-top: 50px;
}
::v-deep .el-dialog__title {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  color: #0f0f0f;
}

.Upload-btn-line {
  display: flex;
  flex-direction: column;
}
.Upload-btn-line span {
  font-size: 16px;
}
.Upload-btn-line p {
  font-size: 12px;
}
.Cancel-Upload {
  margin: 30px 0 0 0;
  padding: 10px, 20px, 10px, 20px;
  background: #dd0000;
  border-radius: 5px;
  color: #fff;
  width: 334px;
  height: 34px;
  text-align: center;
  margin: 10px auto 0px auto;
}
.upload {
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.lable-text {
  line-height: 26px;
  text-align: center;
  letter-spacing: 0.5px;
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 16px;
  color: #0f0f0f;
  padding: 10px 0px;
  margin: 4px 20px;
  text-overflow: ellipsis;
  justify-content: start;
  flex: start;
  display: flex;
}
.lable-text:nth-child(1) {
  margin-top: -12px;
}

.control-text {
  text-transform: none;
  margin: 0px 10px 0px 0px;
  min-width: 150px;
}
.control-text-color {
  color: #000;
}
.control-text a {
  text-decoration-line: none;
}
::v-deep .el-dialog__footer {
  min-height: 150px;
  display: flex;
  justify-content: center;
  background-color: #fff;
  border-radius: 0 0 10px 10px;
  display: flex;
  flex-direction: column;
}
.footer {
  min-height: 250px;
  display: flex;
  background-color: #fff;
  border-radius: 0 0 10px 10px;
  display: flex;
  flex-direction: column;
}
.footer-min {
  min-height: 150px;
  display: flex;
  justify-content: center;
  background-color: #fff;
  border-radius: 0 0 10px 10px;
  display: flex;
  flex-direction: column;
}
::v-deep .el-dialog__header {
  border-bottom: 1px solid #f2f2f2;
}
.el-upload__text img {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
</style>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, watch } from 'vue';
import { useInit } from '@/services/shared/utils';
import { ExploitEnum } from '@/services/features/lead/lead.model';
import { findLeadCount, findLeadAssign, importReasonLeadFromExcel } from '@/services/features/lead/lead.service';
import SwiperCore, { Navigation, Autoplay } from 'swiper';

import { downloadFile } from '@/services/shared/utils';
SwiperCore.use([Navigation, Autoplay]);
// Định nghĩa data type của component [data] bằng Typescript
class LeadHeaderComponentData {
  isLoading: boolean;
  activeTab: ExploitEnum | string;
  statusData: any | null;
  statusPotential: number | 0;
  fileList: any[];
  UploadInf: boolean;
  status: any;
  dialogVisibleInfo: boolean;
  dialogVisible: boolean;
  responseImport: any[];
  files: any[] | null;
}

// Định nghĩa data type của component [props] bằng Typescript
class LeadHeaderComponentProps {
  activeTab: ExploitEnum | string;
}

export default defineComponent({
  name: 'LeadHeaderComponent',
  components: {},
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
  setup(props: LeadHeaderComponentProps, { emit }: any) {
    // Setup Default
    const { base, userId } = useInit();
    // Component reactive data
    const data = reactive<LeadHeaderComponentData>({
      isLoading: false, // boolean
      activeTab: props.activeTab,
      statusData: null,
      statusPotential: 0,
      fileList: [],
      UploadInf: true,
      status: 'unsent',
      dialogVisibleInfo: false,
      dialogVisible: false,
      responseImport: [],
      files: null,
    });
    watch(
      () => props.activeTab,
      (newValue, oldValue) => {
        data.activeTab = newValue;
      }
    );
    onMounted(async () => {
      const countResponse = await findLeadCount();
      data.statusData = countResponse.data;
      const countPotential = await findLeadAssign({
        page: 1,
        pageSize: 10,
        isPotential: true,
      });
      data.statusPotential = countPotential.total;
    });
    // Chuyển tab
    const switchTab = (activeTab: ExploitEnum) => {
      data.activeTab = activeTab;
      emit('onActiveTabChange', activeTab);
    };
    const goToHistoryCall = () => {
      base.router.push({ name: 'lead-history-call', params: { id: userId } });
    };
    const excel = ref<any | null>(null);

    const onChangeFile = async (files: any) => {
      data.isLoading = true;
      try {
        const frmData: FormData = new FormData();
        frmData.append('files', files.raw);
        const res = await importReasonLeadFromExcel(frmData);
        data.responseImport = res.data;
      } finally {
        data.isLoading = false;
        data.UploadInf = false;
        data.dialogVisibleInfo = true;
        data.dialogVisible = false;
      }
    };

    const dialog = (files: any) => {
      setTimeout(() => {
        data.UploadInf = true;
      }, 500);
    };
    const downloadTemplate = () => {
      const link = document.createElement('a');
      link.download = 'Template-Import_ghi-chu-va-ly-do-leads.xlsx';
      link.href = 'template/Template-Import_ghi-chu-va-ly-do-leads.xlsx';
      link.click();
    };

    return {
      // Component reactive data
      data,
      // Enum
      ExploitEnum,
      switchTab,
      goToHistoryCall,
      onChangeFile,
      dialog,
      downloadFile,
      downloadTemplate,
    };
  },
});
</script>
