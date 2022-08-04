<template v-loading="data.isLoading">
  <div class="lead-detail-page">
    <AppBreadcrumbBarComponent />
    <div class="container-xl">
      <el-card class="box-card">
        <template #header>
          <div class="header-card">Nhập thông tin khách hàng</div>
        </template>
        <div class="app-content">
          <el-form class="group-detail-aside-component__dialog-form" ref="ruleFormRef" :model="formData" :rules="rules">
            <div class="app-input">
              <label class="app-input__form__label">Tên khách hàng</label>
              <el-form-item prop="name">
                <el-input class="input-form app-select" v-model="formData.name" />
              </el-form-item>
            </div>
            <div class="app-input">
              <label class="app-input__form__label">Số điện thoại</label>
              <el-form-item prop="phone">
                <el-input type="number" class="input-form app-select" v-model="formData.phone" />
              </el-form-item>
            </div>
            <div class="app-input">
              <label class="app-input__form__label">Chọn đối tượng</label>
              <el-form-item prop="customerTarget">
                <el-select
                  class="input-form app-select"
                  v-model="formData.customerTarget"
                  filterable
                  placeholder="Chọn đối tượng"
                >
                  <template v-for="item in data.masterData.data.customerTarget" :key="item">
                    <el-option :label="item.value" :value="item.key"></el-option>
                  </template>
                </el-select>
              </el-form-item>
            </div>
            <div class="app-input">
              <label class="app-input__form__label">Dự án</label>
              <el-form-item prop="project">
                <el-select class="input-form app-select" v-model="formData.project" filterable placeholder="Chọn dự án">
                  <template v-for="item in data.project" :key="item">
                    <el-option :label="item.name" :value="item.id"></el-option>
                  </template>
                </el-select>
              </el-form-item>
            </div>
            <div class="app-input">
              <label class="app-input__form__label">Nhu cầu</label>
              <el-form-item prop="demandType">
                <el-radio-group v-model="formData.demandType" class="radio-button">
                  <el-radio v-for="item in BuySellEnum" :key="item.key" :label="item.key">{{ item.value }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
            <div class="app-input">
              <label class="app-input__form__label">Loại bất động sản</label>
              <el-form-item prop="demandRealEstate">
                <el-select
                  class="input-form app-select"
                  v-model="formData.demandRealEstate"
                  filterable
                  placeholder="Chọn loại bất động sản"
                >
                  <template v-for="item in data.masterData.data.projectTypeList" :key="item">
                    <el-option :label="item.value" :value="item.key"></el-option>
                  </template>
                </el-select>
              </el-form-item>
            </div>
            <div class="app-input">
              <label class="app-input__form__label">Hướng</label>
              <el-form-item prop="demandOrientation">
                <el-select
                  class="input-form app-select"
                  v-model="formData.demandOrientation"
                  filterable
                  placeholder="Chọn hướng"
                >
                  <template v-for="item in data.masterData.data.projectDirection" :key="item">
                    <el-option :label="item.value" :value="item.key"></el-option>
                  </template>
                </el-select>
              </el-form-item>
            </div>
            <div class="app-input">
              <label class="app-input__form__label">Giá tiền</label>
              <el-form-item prop="demandPrice">
                <number
                  class="input-form app-select"
                  placeholder="Nhập giá tiền"
                  v-model="formData.demandPrice"
                ></number>
              </el-form-item>
            </div>
            <div class="app-input">
              <label class="app-input__form__label">Diện tích</label>
              <el-form-item prop="demandAcreage">
                <number
                  class="input-form app-select"
                  placeholder="Nhập diện tích"
                  v-model="formData.demandAcreage"
                ></number>
              </el-form-item>
            </div>
            <div class="app-input">
              <label class="app-input__form__label">Khu vực</label>
              <el-form-item prop="demandArea">
                <el-input placeholder="Nhập khu vực" class="input-form app-select" v-model="formData.demandArea" />
              </el-form-item>
            </div>
            <div class="app-input">
              <label class="app-input__form__label">Ghi chú</label>
              <el-form-item prop="note">
                <el-input placeholder="Nhập ghi chú" class="input-form app-select" v-model="formData.note" />
              </el-form-item>
            </div>

            <div v-if="data.dataSource?.surveyConfig.length && data.surveyOption">
              <div class="app-input" v-for="(name, index) in data.surveyOption" :key="name.name">
                <template v-if="name.value !== TypeInputEnum.SLIDER">
                  <label class="app-input__form__label">{{ name?.name }}</label>
                  <el-form-item :prop="name.code">
                    <!-- Radio -->
                    <el-radio-group
                      v-if="name.type === TypeInputEnum.RADIO"
                      v-model="formData.radio[index]"
                      class="radio-button"
                    >
                      <template v-for="item in data.dataSource?.surveyConfig" :key="item">
                        <template v-if="item.name === name.name">
                          <el-radio :label="item.code">{{ item.value }}</el-radio>
                        </template>
                      </template>
                    </el-radio-group>
                    <!-- Dropdown -->
                    <el-select
                      v-if="name.type === TypeInputEnum.DROPDOWN"
                      v-model="formData.dropdown[index]"
                      :placeholder="name.name"
                      class="input-form app-select"
                    >
                      <template v-for="item in data.dataSource?.surveyConfig" :key="item">
                        <template v-if="item.name === name.name">
                          <el-option :label="item.value" :value="item.code"></el-option>
                        </template>
                      </template>
                    </el-select>
                    <!-- checkbox -->
                    <template v-if="name.type === TypeInputEnum.CHECKBOX">
                      <el-checkbox-group class="radio-button" v-model="formData.checkbox">
                        <template v-for="item in data.dataSource?.surveyConfig" :key="item">
                          <template v-if="item.name === name.name">
                            <el-checkbox :key="item.code" :label="item.code" size="large">{{ item.value }}</el-checkbox>
                          </template>
                        </template>
                      </el-checkbox-group>
                    </template>
                    <!-- textbox -->
                    <template v-if="[TypeInputEnum.TEXT, TypeInputEnum.TEXTARE].includes(name.type)">
                      <template v-for="item in data.dataSource?.surveyConfig" :key="item">
                        <template v-if="item.name === name.name"
                          ><el-input
                            v-model="formData.text.find((i: any) => i.name === name.name && i.code === name.code)['value']"
                            class="input-form app-select"
                            :placeholder="name.name"
                        /></template>
                      </template>
                    </template>
                    <!-- number -->
                    <template v-if="[TypeInputEnum.NUMBER].includes(name.type)">
                      <template v-for="item in data.dataSource?.surveyConfig" :key="item">
                        <template v-if="item.name === name.name"
                          ><el-input
                            type="number"
                            v-model="formData.number.find((i: any) => i.name === name.name && i.code === name.code)['value']"
                            class="input-form app-select"
                            :placeholder="name.name"
                        /></template>
                      </template>
                    </template>
                    <!-- slider -->
                    <template v-if="[TypeInputEnum.SLIDER].includes(name.type)">
                      <template v-for="item in data.dataSource?.surveyConfig" :key="item">
                        <template v-if="item.name === name.name"
                          ><el-slider
                            v-model="formData.slider.find((i: any) => i.name === name.name && i.code === name.code)['value']"
                            class="input-form app-select"
                        /></template>
                      </template>
                    </template>
                  </el-form-item>
                </template>
              </div>
            </div>
          </el-form>
        </div>
      </el-card>
      <div class="group-button">
        <template v-if="data.dataSource.exploitStatus !== ExploitEnum.DONE">
          <el-button class="button return-button" @click="openDialogReturnVisible(true)" type="primary" text bg
            >Trả về</el-button
          >
          <el-button
            class="button draft-button"
            @click="handleSubmitEdit(ruleFormRef, ExploitEnum.PROCESSING)"
            type="primary"
            text
            bg
            >Lưu nháp</el-button
          >
          <el-button
            class="button done-button"
            @click="handleSubmitEdit(ruleFormRef, ExploitEnum.DONE, ExploitEnum.ASSIGN)"
            type="primary"
            text
            bg
            >Hoàn tất</el-button
          >
        </template>
        <template v-else>
          <el-button
            class="button done-button"
            @click="handleSubmitEdit(ruleFormRef, ExploitEnum.DONE)"
            type="primary"
            text
            bg
            >Bổ sung thông tin</el-button
          >
        </template>
      </div>
    </div>
  </div>
  <el-dialog v-model="data.dialogReturnVisible" width="700px" custom-class="app-dialog">
    <template #title>
      <span class="app-dialog-title">Trả về yêu cầu tư vấn</span>
    </template>
    <div class="app-dialog-content">
      <p>Vui lòng chọn 1 lý do dưới đây:</p>
      <el-row>
        <el-col :span="4"></el-col>
        <el-col :span="16">
          <el-radio-group v-model="data.reasonReturn" class="option-return">
            <el-radio
              v-for="item in optionReturnEnum"
              :key="item.key"
              :label="item.key"
              @click="changeOptionReturn(item.key)"
              >{{ item.value }}</el-radio
            >
            <el-input
              prop="name"
              v-if="data.isOpenOtherReason"
              v-model="data.rejectReason"
              :rows="2"
              type="textarea"
              placeholder="Nhập lý do khác"
            />
          </el-radio-group>
        </el-col>
        <el-col :span="4"></el-col>
      </el-row>
      <div class="group-button">
        <el-button @click="openDialogReturnVisible(false)" class="button return-button" type="primary" text bg
          >Tiếp tục khảo sát</el-button
        >
        <el-button
          class="button done-button"
          @click="handleSubmitEdit(ruleFormRef, ExploitEnum.CANCEL, ExploitEnum.ASSIGN)"
          type="primary"
          text
          bg
          >Trả về</el-button
        >
      </div>
    </div>
  </el-dialog>

  <el-dialog v-model="data.dialogDraftVisible" width="800px" custom-class="app-dialog">
    <template #title>
      <span class="app-dialog-title">Thông tin khảo sát đã được lưu</span>
    </template>
    <div class="app-dialog-content">
      <p>
        Thông tin khách hàng đã được lưu vào tệp Đang khảo sát. Vui lòng bổ sung thêm thông tin để hoàn thành khảo sát
      </p>
      <div class="group-button">
        <el-button class="button done-button" @click="openDialogDraftVisible(false)" type="primary" text bg
          >Đóng</el-button
        >
      </div>
    </div>
  </el-dialog>
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

.option-return {
  display: grid;
}
.app-select {
  border-style: none;
  border-bottom-style: double !important;
  border-bottom-color: #f2f2f2;
  border-width: 2px;
  transition: width 2s;
  width: 100%;
  &:focus {
    outline: none;
  }
  &:hover {
    border-bottom-color: #04c35c;
  }
}

.app-content {
  padding: 20px 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  word-wrap: break-word;
  & > *:not(:last-child) {
    margin-bottom: 25px;
  }
  &__input-group {
    width: 100%;
    display: flex;
    flex-direction: column;
    &__label {
      font-size: 13px;
      color: $colorNeutral;
    }
    &__value {
      font-size: 14px;
      font-weight: bold;
      color: #0f0f0f;
    }
  }
}

.app-input {
  padding: 10px 0;
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

.group-button {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
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
  gap: 10px;
  width: 200px;
}
.return-button {
  background: #f2f2f2;
  color: #0f0f0f;
  border-color: #f2f2f2;
}

.done-button {
  background: #dd0000;
  color: #ffffff;
  border-color: #dd0000;
}
.draft-button {
  background: #ffeeed;
  color: #dd0000;
  border-color: #ffeeed;
}
.radio-button {
  height: 70px;
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, watch, onMounted, ref } from 'vue';
import { useInit, getUniqueListBy } from '@/services/shared/utils';
import {
  ExploitEnum,
  LeadModel,
  optionReturnEnum,
  BuySellEnum,
  TypeInputEnum,
} from '@/services/features/lead/lead.model';
import { findListProject, findProjectById } from '@/services/features/property/property.service';
import { ProjectModel } from '@/services/features/property/property.model';
import { updateInfo, updateExploitStatus } from '@/services/features/lead/lead.service';
//@ts-ignore
import type { FormInstance } from 'element-plus';

class LeadFormProps {
  modelValue: any;
  masterData: any;
}
// Định nghĩa data type của component [data] bằng Typescript
class LeadFormData {
  isLoading: boolean;
  isLoadingMore: boolean;
  dataSource: any;
  masterData: any;
  project: ProjectModel | null;
  dialogReturnVisible: boolean;
  dialogDraftVisible: boolean;
  isOpenOtherReason: boolean;
  rejectReason: string | null;
  surveyOption: any | null;
  reasonReturn: string | null;
}

// Component chính
export default defineComponent({
  name: 'LeadFormComponent',
  components: {},
  props: {
    modelValue: {
      type: Object,
      require: true,
    },
    masterData: {
      type: Object,
      require: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props: LeadFormProps, { emit }: any) {
    // Setup Default
    const { base, isLoggedIn } = useInit();
    const data: any = reactive<LeadFormData>({
      isLoading: false,
      isLoadingMore: false,
      dataSource: { ...props.modelValue },
      masterData: { ...props.masterData },
      project: null,
      dialogReturnVisible: false,
      dialogDraftVisible: false,
      isOpenOtherReason: false,
      // dialogBackVisible: false,
      rejectReason: null,
      surveyOption: null,
      reasonReturn: '',
    });

    const formData = reactive({
      name: data.dataSource.name ?? '',
      phone: data.dataSource.phone ?? '',
      customerTarget: data.dataSource.customerTarget ? data.dataSource.customerTarget.key : '',
      project: data.dataSource.project?.id ?? null,
      demandType: data.dataSource.demand?.type ? data.dataSource.demand.type : 'BUY',
      demandAcreage: data.dataSource.demand?.acreage ? data.dataSource.demand.acreage : '',
      demandPrice: data.dataSource.demand?.price ? data.dataSource.demand.price : '',
      demandRealEstate: data.dataSource.demand?.realEstate ? data.dataSource.demand.realEstate : '',
      demandArea: data.dataSource.demand?.area ? data.dataSource.demand.area : '',
      demandOrientation: data.dataSource.demand?.orientation ? data.dataSource.demand.orientation : '',
      note: data.dataSource.note ?? '',
      radio: data.dataSource?.surveys.map((i: any) => {
        if (i.type === TypeInputEnum.RADIO) {
          return i.code;
        }
        return null;
      }),
      dropdown: data.dataSource?.surveys.map((i: any) => {
        if (i.type === TypeInputEnum.DROPDOWN) {
          return i.code;
        }
        return null;
      }),
      checkbox: data.dataSource?.surveys.map((i: any) => {
        if (i.type === TypeInputEnum.CHECKBOX) {
          return i.code;
        }
        return null;
      }),
      text:
        data.dataSource.surveys.filter((i: any) => [TypeInputEnum.TEXT, TypeInputEnum.TEXTARE].includes(i.type))
          .length > 0
          ? data.dataSource.surveys.filter((i: any) => [TypeInputEnum.TEXT, TypeInputEnum.TEXTARE].includes(i.type))
          : data.dataSource.surveyConfig.filter((i: any) =>
              [TypeInputEnum.TEXT, TypeInputEnum.TEXTARE].includes(i.type)
            ),
      number:
        data.dataSource.surveys.filter((i: any) => [TypeInputEnum.NUMBER].includes(i.type)).length > 0
          ? data.dataSource.surveys.filter((i: any) => [TypeInputEnum.NUMBER].includes(i.type))
          : data.dataSource.surveyConfig.filter((i: any) => [TypeInputEnum.NUMBER].includes(i.type)),
      slider:
        data.dataSource.surveys.filter((i: any) => [TypeInputEnum.SLIDER].includes(i.type)).length > 0
          ? data.dataSource.surveys.filter((i: any) => [TypeInputEnum.SLIDER].includes(i.type))
          : data.dataSource.surveyConfig.filter((i: any) => [TypeInputEnum.SLIDER].includes(i.type)),
    });

    const checkPhone = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('Nhập số điện thoại'));
      } else {
        if (!/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(formData.phone)) {
          callback(new Error('Chưa nhập chính xác định số điện thoại!'));
        }
      }
    };

    const rules = reactive({
      phone: [{ validator: checkPhone, trigger: 'blur' }],
    });

    const ruleFormRef = ref<FormInstance>();
    watch(
      () => props.modelValue,
      (newValue, oldValue) => {
        data.dataSource = newValue;
      }
    );

    const openDialogReturnVisible = async (open: boolean) => {
      data.dialogReturnVisible = open;
      data.dialogBackVisible = false;
    };
    const openDialogDraftVisible = async (open: boolean) => {
      if (open) {
        data.dialogDraftVisible = open;
      } else {
        base.toast.success('Lưu thông tin thành công!');
        base.router.push({ name: 'lead', query: { exploitStatus: ExploitEnum.ASSIGN } });
      }
    };

    const changeOptionReturn = async (select: string) => {
      if (select === 'ly_do_khac') {
        data.isOpenOtherReason = true;
      } else {
        data.isOpenOtherReason = false;
      }
    };

    const handleSubmitEdit = async (formEl: FormInstance | undefined, status: ExploitEnum, navigate?: ExploitEnum) => {
      let isValid = true;
      formEl.validate((valid: boolean) => {
        if (!valid) {
          isValid = false;
        }
      });
      if (isValid || status === ExploitEnum.CANCEL) {
        if (data.dataSource && data.dataSource.id) {
          const customerTarget = data.masterData.data.customerTarget.find(
            (item: any) => item.key === formData.customerTarget
          );
          let surveys: any[] = [];
          if (formData.radio.length && Array.isArray(formData.radio)) {
            let radioOptions = formData.radio.map((item: number) => {
              if (item !== null) {
                return data.dataSource?.surveyConfig.find((i: any) => i.code === item);
              }
              return null;
            });
            radioOptions = radioOptions.filter((item: any) => item !== null);
            if (radioOptions.length) {
              surveys = [...surveys, ...radioOptions];
            }
          }
          if (formData.checkbox.length && Array.isArray(formData.checkbox)) {
            let checkboxOptions = formData.checkbox.map((item: number) => {
              if (item !== null) {
                return data.dataSource?.surveyConfig.find((i: any) => i.code === item);
              }
              return null;
            });
            checkboxOptions = checkboxOptions.filter((item: any) => item !== null);
            if (checkboxOptions.length) {
              surveys = [...surveys, ...checkboxOptions];
            }
          }
          if (formData.dropdown.length && Array.isArray(formData.dropdown)) {
            let dropdownOptions = formData.dropdown.map((item: number) => {
              if (item !== null) {
                return data.dataSource?.surveyConfig.find((i: any) => i.code === item);
              }
              return null;
            });
            dropdownOptions = dropdownOptions.filter((item: any) => item !== null);
            if (dropdownOptions.length) {
              surveys = [...surveys, ...dropdownOptions];
            }
          }
          if (formData.text.length && Array.isArray(formData.text)) {
            surveys = [...surveys, ...formData.text];
          }
          if (formData.number.length && Array.isArray(formData.number)) {
            surveys = [...surveys, ...formData.number];
          }
          if (formData.slider.length && Array.isArray(formData.slider)) {
            surveys = [...surveys, ...formData.slider];
          }
          const project = await findProjectById(formData.project);
          const model = {
            ...data.dataSource,
            id: data.dataSource.id,
            name: formData.name,
            customerTarget: customerTarget,
            project: project ? { id: project.id, name: project.name } : null,
            demand: {
              type: formData.demandType,
              realEstate: formData.demandRealEstate,
              orientation: formData.demandOrientation,
              price: formData.demandPrice,
              acreage: formData.demandAcreage,
              area: formData.demandArea,
            },
            phone: formData.phone,
            note: formData.note,
            exploitStatus: status,
            rejectReason: data.reasonReturn,
            surveys,
          };
          if (status === ExploitEnum.CANCEL && !data.reasonReturn) {
            base.toast.error('Bạn chưa chọn lý do');
            return;
          }
          if (data.reasonReturn === 'ly_do_khac' && !data.rejectReason) {
            base.toast.error('Bạn chưa nhập lý do khác');
            return;
          } else if (data.reasonReturn === 'ly_do_khac' && data.rejectReason) {
            model.rejectReason = data.rejectReason;
          }
          const response = await updateInfo(model);
          if (response.isSuccess) {
            if (status !== ExploitEnum.PROCESSING) {
              if (status === ExploitEnum.DONE && data.dataSource.exploitStatus !== ExploitEnum.DONE) {
                await updateExploitStatus({ id: data.dataSource.id, exploitStatus: ExploitEnum.DONE });
              }
              if (status === ExploitEnum.CANCEL) {
                await updateExploitStatus({
                  id: data.dataSource.id,
                  exploitStatus: ExploitEnum.CANCEL,
                  isPotential: false,
                });
              }
              base.toast.success('Cập nhật thông tin thành công!');
              if (navigate?.length) {
                base.router.push({ name: 'lead', query: { exploitStatus: navigate } });
              } else {
                base.router.push({ name: 'lead', query: { exploitStatus: status } });
              }
            } else {
              await openDialogReturnVisible(false);
              await openDialogDraftVisible(true);
            }
          }
          emit('update:modelValue', new LeadModel(data.dataSource));
          // Update UI
        }
      } else {
        base.toast.error('Chưa nhập đủ thông tin');
      }
    };

    onMounted(async () => {
      data.isLoading = true;
      data.dialogBackVisible = false;
      try {
        if (isLoggedIn.value) {
          const projectResponse = await findListProject({ pageSize: 100, page: 1 });
          data.project = projectResponse.rows;
          if (data.dataSource?.surveyConfig?.length) {
            data.surveyOption = getUniqueListBy(data.dataSource?.surveyConfig, 'name');
          }
        }
      } finally {
        data.isLoading = false;
      }
    });

    return {
      // Component reactive data
      // Form + Fields
      isLoggedIn,
      data,
      rules,
      ruleFormRef,
      formData,
      BuySellEnum,
      TypeInputEnum,
      optionReturnEnum,
      ExploitEnum,
      // Methods
      openDialogDraftVisible,
      openDialogReturnVisible,
      changeOptionReturn,
      handleSubmitEdit,
    };
  },
});
</script>
