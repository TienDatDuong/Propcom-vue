<template>
  <div class="project-list-item-component">
    <div
      class="project-list-item-component__img"
      :style="
        data.project?.imageUrl && {
          background: 'top / cover url(' + encapsulateUrl(data.project.imageUrl) + ')',
        }
      "
    >
      <img
        v-if="!data.project.imageUrl"
        src="@/assets/images/default_image.svg"
        class="project-list-item-component__img__default-logo"
      />
      <div class="project-list-item-component__img--box">
        <div class="project-list-item-component__img--hot" v-if="data.project?.isHotPackage">
          <img src="@/assets/feature/investor/fire-icon.svg" />
          <span>Dự án Hot</span>
        </div>
        <div v-if="isSaleComing(data.project?.status)" class="project-list-item-component__img--wait-sale">
          Sắp mở bán
        </div>
      </div>
    </div>
    <div class="project-list-item-component__project">
      <div class="project-list-item-component__project__header">
        <span class="project-list-item-component__project__header__title">{{ data.project?.name }}</span>
        <div class="project-list-item-component__project__header__box-info">
          <div
            v-if="data.project?.group?.id && data.project?.group?.name"
            class="project-list-item-component__project__info-3__actions__group"
            @click="goToGroupDetailPage(data.project.group.id)"
          >
            <img src="@/assets/feature/investor/group-icon.svg" />
            Nhóm
          </div>
          <Popover v-if="isShowBtnDocs(data.project)">
            <PopoverButton as="div" class="project-list-item-component__project__info-3__actions__document">
              <img src="@/assets/feature/investor/eye-icon.svg" />
              Tài liệu dự án
            </PopoverButton>
            <!-- Dropdown -->
            <PopoverPanel as="div" v-slot="{ close }" class="app-dropdown">
              <!-- Esalekit -->
              <template v-if="data.project?.esalekit">
                <div
                  class="app-dropdown__item"
                  @click="
                    handleBuy();
                    close();
                  "
                >
                  <div class="app-dropdown__item__img-wapper">
                    <img src="@/assets/icons/simple/icon_esalekit.svg" />
                  </div>
                  <span>E-Salekit dự án</span>
                </div>
              </template>
              <!-- Virtual tour 360 -->
              <template v-if="data.project?.url360">
                <div
                  class="app-dropdown__item"
                  @click="
                    openNewTab(data.project.url360);
                    close();
                  "
                >
                  <div class="app-dropdown__item__img-wapper">
                    <img src="@/assets/icons/simple/icon_tour_360.svg" />
                  </div>
                  <span>Virtual tour 360</span>
                </div>
              </template>
              <!-- Tài liệu mặt bằng 3D -->
              <template v-if="data.project?.url3D">
                <div
                  class="app-dropdown__item"
                  @click="
                    openNewTab(data.project.url3D);
                    close();
                  "
                >
                  <div class="app-dropdown__item__img-wapper">
                    <img src="@/assets/icons/simple/icon_doc_3d.svg" />
                  </div>
                  <span>Tài liệu mặt bằng 3D</span>
                </div>
              </template>
              <!-- Tài liệu mặt bằng 2D -->
              <template v-if="data.project?.floorMap">
                <div
                  class="app-dropdown__item"
                  @click="
                    openNewTab(data.project.floorMap);
                    close();
                  "
                >
                  <div class="app-dropdown__item__img-wapper">
                    <img src="@/assets/icons/simple/icon_doc_2d.svg" />
                  </div>
                  <span>Tài liệu mặt bằng 2D</span>
                </div>
              </template>
            </PopoverPanel>
          </Popover>
        </div>
        <!-- <div v-if="isSaleComing(data.project?.status)" class="project-list-item-component__project__header--wait-sale">
          Sắp mở bán
        </div> -->
      </div>
      <div class="project-list-item-component__project__info-1">
        <div class="project-list-item-component__project__info-1__container">
          <div class="project-list-item-component__project__info-1__container__item project-list-item-component__project__flex_2">
            <img
              class="project-list-item-component__project__info-1__container__item__img project-list-item-component__project__info-1__container__item__img-commission"
              src="@/assets/feature/investor/rose-icon.svg"
            />
            <div class="project-list-item-component__project__info-1__container__item__wrap">
              <span class="project-list-item-component__project__info-1__container__item__wrap__label">Hoa hồng</span>
              <span class="project-list-item-component__project__info-1__container__item__wrap__value">{{
                data.project && (data.project.minComm || data.project.maxComm) ? getCommissionText() : '0%'
              }}</span>
            </div>
          </div>
          <div class="project-list-item-component__project__info-1__container__item project-list-item-component__project__flex_3">
            <img
              class="project-list-item-component__project__info-1__container__item__img"
              src="@/assets/feature/investor/money-bag-icon.svg"
            />
            <div class="project-list-item-component__project__info-1__container__item__wrap">
              <span class="project-list-item-component__project__info-1__container__item__wrap__label"
                >Phí kí quỹ tối thiểu</span
              >
              <span class="project-list-item-component__project__info-1__container__item__wrap__value"
                >{{ data.project && data.project.minAdvance ? formatNumber(data.project.minAdvance) : '0' }}đ</span
              >
            </div>
          </div>
          <div class="project-list-item-component__project__info-1__container__item project-list-item-component__project__flex_3">
            <img
              class="project-list-item-component__project__info-1__container__item__img"
              src="@/assets/feature/investor/gift-icon.svg"
            />
            <div class="project-list-item-component__project__info-1__container__item__wrap">
              <span class="project-list-item-component__project__info-1__container__item__wrap__label"
                >Thưởng tối đa</span
              >
              <span class="project-list-item-component__project__info-1__container__item__wrap__value"
                >{{ data.project && data.project.maxBonus ? formatNumber(data.project.maxBonus) : '0' }}đ</span
              >
            </div>
          </div>
        </div>

        <div class="project-list-item-component__project__info-1__calendar">
          <div class="project-list-item-component__project__info-1__calendar__row">
            <div
              v-if="data.project?.unitTotal"
              class="project-list-item-component__project__info-1__calendar__item calendar-color--red"
              @click="handleBuy"
            >
              <span>{{ data.project.unitTotal }}</span>
            </div>
            <div
              v-if="data.project?.unitAvailable"
              class="project-list-item-component__project__info-1__calendar__item calendar-color--red"
              @click="handleBuy"
            >
              <span>{{ data.project.unitAvailable }}</span>
            </div>
            <div
              v-if="data.project?.unitOpen"
              class="project-list-item-component__project__info-1__calendar__item"
              @click="handleBuy"
            >
              <span>{{ data.project.unitOpen }}</span>
            </div>
            <div
              v-if="data.project?.unitWarehouse"
              class="project-list-item-component__project__info-1__calendar__item calendar-color--gray"
              @click="handleBuy"
            >
              <span>{{ data.project.unitWarehouse }}</span>
            </div>
            <div
              v-if="data.project?.unitComplete"
              class="project-list-item-component__project__info-1__calendar__item calendar-color--green"
              @click="handleBuy"
            >
              <span>{{ data.project.unitComplete }}</span>
            </div>
          </div>
          <div class="project-list-item-component__project__info-1__calendar__row">
            <div
              v-if="data.project?.unitTransactionLater"
              class="project-list-item-component__project__info-1__calendar__item calendar-color--yellow-fill"
              @click="handleBuy"
            >
              <span>{{ data.project.unitTransactionLater }}</span>
            </div>
            <div
              v-if="data.project?.unitRegister"
              class="project-list-item-component__project__info-1__calendar__item calendar-color--blue-fill"
              @click="handleBuy"
            >
              <span>{{ data.project.unitRegister }}</span>
            </div>
            <div
              v-if="data.project?.unitWaitingForConfirm"
              class="project-list-item-component__project__info-1__calendar__item calendar-color--red-fill"
              @click="handleBuy"
            >
              <span>{{ data.project.unitWaitingForConfirm }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="project-list-item-component__project__info-2">
        <div class="project-list-item-component__project__info-2__container">
          <div class="project-list-item-component__project__info-2__container__box__item">
            <div class="project-list-item-component__project__info-2__container__item project-list-item-component__project__flex_2">
              <span class="project-list-item-component__project__info-2__container__item__label">Đơn giá</span>
              <span class="project-list-item-component__project__info-2__container__item__value">{{
                getPriceText()
              }}</span>
            </div>
            <div class="project-list-item-component__project__info-2__container__item project-list-item-component__project__flex_2">
              <span class="project-list-item-component__project__info-2__container__item__label">Loại dự án</span>
              <span
                v-if="data.project && data.project.type"
                class="project-list-item-component__project__info-2__container__item__value"
                >{{ getProjectType(data.project.type) }}</span
              >
            </div>
          </div>
          <div class="project-list-item-component__project__info-2__container__box__item">
            <div class="project-list-item-component__project__info-2__container__item project-list-item-component__project__flex_2">
              <span class="project-list-item-component__project__info-2__container__item__label">Hiện trạng</span>
              <span
                v-if="data.project && data.project.currentStatus"
                class="project-list-item-component__project__info-2__container__item__value"
                >{{ data.project.currentStatus }}</span
              >
            </div>
            <div class="project-list-item-component__project__info-2__container__item project-list-item-component__project__flex_2">
              <span class="project-list-item-component__project__info-2__container__item__label">Chủ đầu tư</span>
              <span
                v-if="data.project && data.project.investor"
                class="project-list-item-component__project__info-2__container__item__value"
              >{{ data.project.investor }}</span>
            </div>
          </div>
        </div>
        <div v-if="data.project?.isBooking" class="project-list-item-component__project__info-2__activated">
          Đã giữ chỗ
        </div>
        <div v-if="!data.project?.isBooking" class="project-list-item-component__project__info-2__whiteSpace">
        </div>
      </div>

      <div class="project-list-item-component__project__line"></div>

      <div class="project-list-item-component__project__info-3">
        <div class="project-list-item-component__project__info-3__container">
          <template v-if="data.project?.investorInfo">
            <template v-if="data.project.investorInfo?.logo">
              <div class="project-list-item-component__project__info-3__container__avatar">
                <img :src="data.project.investorInfo.logo" />
              </div>
            </template>
            <template v-else>
              <div class="project-list-item-component__project__info-3__container__avatar project-list-item-component__project__info-3__container__avatar__default-logo">
                <img src="@/assets/images/default_image.svg" />
              </div>
            </template>
            <span class="project-list-item-component__project__info-3__container__title">{{
              data.project.investorInfo?.name
            }}</span>
          </template>
        </div>
        <div class="project-list-item-component__project__info-3__actions">
          <template v-if="data.project?.allowBooking && data.project?.status === ProjectStatusEnum.TRADING">
            <button class="app-btn app-btn-secondary" @click="handleOrder">
              <span>ĐĂNG KÝ TƯ VẤN</span>
            </button>
            <button class="app-btn app-btn-primary" @click="handleBuy">
              <span>ĐĂNG KÝ GIAO DỊCH</span>
            </button>
          </template>
          <template v-else-if="data.project?.status === ProjectStatusEnum.COMING_SALE">
            <button class="app-btn app-btn-secondary" @click="handleOrder">
              <span>ĐĂNG KÝ TƯ VẤN</span>
            </button>
          </template>
          <template v-else>
            <button class="app-btn app-btn-primary" @click="handleBuy">
              <span>ĐĂNG KÝ GIAO DỊCH</span>
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.project-list-item-component {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: $colorWhite;
  border: $border;
  border-radius: $borderRadius;
  &:hover {
    box-shadow: 0px 10px 30px rgba(221, 0, 0, 0.2);
  }
  &__img {
    position: relative;
    margin: 20px 0 20px 20px;
    height: 180px;
    width: 150px;
    border-radius: $borderRadius;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(181.77deg, #dd0000 1.5%, #840000 146.62%);
    &__default-logo {
      width: 100px;
    }
    &--hot {
      background-color: $colorPrimary;
      color: $colorWhite;
      border-radius: 10px 0px;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 91px;
      background: linear-gradient(90deg, #dd0000 0%, #ff2d2d 100%);
      height: 21px;
      span {
        font-size: 13px;
        line-height: 130%;
        margin-left: 7.5px;
      }
    }
    &--wait-sale {
      background-color: $colorSecondary;
      color: $colorPrimary;
      border-radius: 100px;
      padding: 2px 10px;
      font-size: 13px;
      min-width: 80px;
      top: 6px;
      left: 6px;
      position: relative;
    }
    &--box {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  &__project {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 180px;
    margin-right: 20px;
    margin-left: 22px;
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      &__title {
        font-weight: bold;
        font-size: 15px;
        overflow: hidden;
      }
      &__box-info {
        display: flex;
        column-gap: 10px;
      }
    }
    &__info-1 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      column-gap: 10px;
      // Modify Bonus Project
      &__container {
        display: flex;
        align-items: center;
        flex: 5;
        column-gap: 20px;
        &__item {
          display: flex;
          align-items: center;
          flex: 2;
          &__wrap {
            float: left;
            margin-left: 6px;
            &__label {
              font-size: 13px;
              line-height: 130%;
              color: $colorNeutral;
              margin: 0;
              overflow: hidden;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              max-width: 110px;
            }
            &__value {
              font-weight: bold;
              font-size: 16px;
              line-height: 110%;
              color: $textColor;
              margin: 0;
              overflow: hidden;
            }
          }
          &__img-commission {
            margin-right: 6px;
          }
        }
      }
      // Modify Calendar Project
      &__calendar {
        display: flex;
        flex-direction: column;
        row-gap: 7px;
        align-items: flex-end;
        min-width: 120px;
        &__row {
          display: flex;
          flex-direction: row;
          column-gap: 7px;
          justify-content: flex-end;
          align-items: center;
        }
        &__item {
          cursor: pointer;
          position: relative;
          height: 20px;
          width: 24px;
          border: 1px solid $colorGray;
          background-color: $colorWhite;
          color: $textColor;

          &::after {
            content: '';
            border-bottom: 1px solid $colorGray;
            width: 23px;
            position: absolute;
            top: 20%;
            right: 0;
            left: 0;
          }
          span {
            font-weight: bold;
            font-size: 10px;
            line-height: 10px;
            position: absolute;
            bottom: 10%;
            left: 50%;
            transform: translateX(-50%);
          }
        }
        // Modifier Color Item
        .calendar-color--red {
          border: 1px solid $colorPink;
          background-color: $colorSecondary;
          color: $colorPrimary;
          &::after {
            border-bottom: 1px solid $colorPink;
          }
        }
        .calendar-color--green {
          border: 1px solid $colorGreen;
          background-color: $colorGreenLight;
          color: $colorGreen;
          &::after {
            border-bottom: 1px solid $colorGreen;
          }
        }
        .calendar-color--gray {
          border: 1px solid $colorNeutral;
          background-color: $textColorLight;
          color: $colorNeutral;
          &::after {
            border-bottom: 1px solid $colorNeutral;
          }
        }
        .calendar-color--yellow-fill {
          border: 1px solid $colorYellow;
          background-color: $colorYellow;
          color: $colorWhite;
          &::after {
            border-bottom: 1px solid $colorWhite;
          }
        }
        .calendar-color--blue-fill {
          border: 1px solid $colorBlue;
          background-color: $colorBlue;
          color: $colorWhite;
          &::after {
            border-bottom: 1px solid $colorWhite;
          }
        }
        .calendar-color--red-fill {
          border: 1px solid $colorPrimary;
          background-color: $colorPrimary;
          color: $colorWhite;
          &::after {
            border-bottom: 1px solid $colorWhite;
          }
        }
      }
    }
    &__info-2 {
      display: inline-flex;
      justify-content: space-between;
      align-items: center;
      column-gap: 10px;
      &__container {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap: wrap;
        min-height: 34px;
        column-gap: 20px;
        overflow: hidden;
        flex-direction: column;
        &__item {
          display: flex;
          align-items: center;
          padding: 1px 2px;
          &__label {
            font-size: 11px;
            line-height: 13px;
            color: $textColorLight;
            min-width: 60px;
            margin: 0;
            margin-right: 4px;
          }
          &__value {
            font-weight: 500;
            font-size: 11px;
            line-height: 13px;
            color: $colorNeutral;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }
        &__box__item {
          display: flex;
          flex-direction: row;
          width: 100%;
        }
      }
      &__activated {
        background-color: $colorBlue;
        color: $colorWhite;
        border-radius: 100px;
        padding: 2px 10px;
        font-size: 13px;
        min-width: 80px;
        margin-left: 40px;
      }
      &__whiteSpace {
        min-width: 120px;
      }
    }
    &__flex_2 {
      flex: 2;
    }
    &__flex_3 {
      flex: 3;
    }
    &__flex_4 {
      flex: 4;
    }
    &__line {
      border-bottom: 0.5px dashed $textColorLight;
    }
    &__info-3 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      column-gap: 10px;
      &__container {
        display: flex;
        flex-direction: row;
        align-items: center;
        column-gap: 10px;
        &__avatar {
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid #ffffff;
          &__default-logo {
            background: linear-gradient(181.77deg, #dd0000 1.5%, #840000 146.62%);
          }
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        &__title {
          font-style: normal;
          font-weight: bold;
          font-size: 13px;
          color: #5a5a5a;
          width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          line-height: 16px;
        }
      }
      &__actions {
        display: flex;
        align-items: center;
        column-gap: 10px;
        flex-shrink: 0;
        &__group {
          display: flex;
          flex-direction: row;
          column-gap: 5px;
          align-items: center;
          cursor: pointer;
          font-size: 13px;
          border-radius: $borderRadiusSmall;
          background-color: $colorBlueLight;
          color: $colorBlue;
          padding: 4px 8px;
        }
        &__document {
          display: flex;
          flex-direction: row;
          column-gap: 5px;
          align-items: center;
          cursor: pointer;
          font-size: 13px;
          border-radius: $borderRadiusSmall;
          background-color: $colorGreenLight;
          color: $colorGreen;
          padding: 4px 8px;
        }
      }
    }
  }

  @media screen and (max-width: 1200px) {
    &__project {
      &__info-1__container {
        column-gap: 5px;
      }
    }
  }
  @media screen and (max-width: 1080px) {
    &__project {
      &__info-1__container__item__wrap__label {
        font-size: 11.5px;
      }
      &__info-1__container__item__wrap__value {
        font-size: 14px;
      }
      &__info-1__container__item__wrap {
        margin-left: 0;
      }
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue';
import { encapsulateUrl, formatNumber, openNewTab, useInit } from '@/services/shared/utils';
import { ProjectModel, ProjectStatusEnum } from '@/services/features/property/property.model';
import {
  getProjectStatus,
  getProjectType,
} from '@/services/features/property/property.service';
import { Popover, PopoverButton, PopoverPanel, TransitionRoot } from '@headlessui/vue';

// Định nghĩa data type của component [data] bằng Typescript
class ProjectListItemComponentData {
  isLoading: boolean;
  project: ProjectModel;
}

// Định nghĩa data type của component [props] bằng Typescript
class ProjectListItemComponentProps {
  project: ProjectModel | null | undefined;
}

export default defineComponent({
  name: 'ProjectListItemComponent',
  components: {
    Popover,
    PopoverButton,
    PopoverPanel,
  },
  props: {
    project: {
      type: Object as () => any | null | undefined,
      required: false,
      default: null,
    },
  },
  emits: ['onOpenDialog'],
  setup(props: ProjectListItemComponentProps, { emit }: any) {
    // Setup Default
    const { base } = useInit();
    const data = reactive<ProjectListItemComponentData>({
      isLoading: false, // boolean
      project: props.project || new ProjectModel(),
    });
    watch(
      () => props.project,
      (newValue, oldValue) => {
        data.project = newValue || new ProjectModel();
      }
    );
    const getPriceText = () => {
      if (!data.project) {
        return '';
      }
      let text = '';
      if (data.project.priceFrom && data.project.priceTo) {
        if (data.project.priceFrom === data.project.priceTo) {
          text = `${formatNumber(data.project.priceFrom)}tr/m2`;
        } else {
          text = `${formatNumber(data.project.priceFrom)}-${formatNumber(data.project.priceTo)}tr/m2`;
        }
      } else if (data.project.priceFrom) {
        text = `${formatNumber(data.project.priceFrom)}tr/m2`;
      } else if (data.project.priceTo) {
        text = `${formatNumber(data.project.priceTo)}tr/m2`;
      }
      return text;
    };
    const getCommissionText = () => {
      if (!data.project) {
        return '';
      }
      let text = '';
      if (data.project.minComm && data.project.maxComm) {
        if (data.project.minComm === data.project.maxComm) {
          text = `${data.project.minComm}%`;
        } else {
          text = `${data.project.minComm}-${data.project.maxComm}%`;
        }
      } else if (data.project.minComm) {
        text = `${data.project.minComm}%`;
      } else if (data.project.maxComm) {
        text = `${data.project.maxComm}%`;
      }
      return text;
    };
    const isSaleComing = (status: ProjectStatusEnum) => {
      return status === ProjectStatusEnum.COMING_SALE;
    };
    const goToGroupDetailPage = (id: string) => base.router.push({ name: 'group-detail', params: { id } });
    const handleOrder = () => {
      emit('onOpenDialog');
    };
    const handleBuy = () => {
      emit('onOpenDialog');
    };
    const isShowBtnDocs = (project: ProjectModel) => {
      return project.url360 || project.url3D || project.floorMap;
    };
    return {
      data,
      formatNumber,
      encapsulateUrl,
      openNewTab,
      getPriceText,
      getCommissionText,
      getProjectType,
      getProjectStatus,
      isSaleComing,
      goToGroupDetailPage,
      ProjectStatusEnum,
      handleOrder,
      handleBuy,
      isShowBtnDocs,
    };
  },
});
</script>