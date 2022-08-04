<template v-loading="data.isLoading">
  <div class="user-business-profile-component">
    <div class="user-business-profile-component__wrap" :class="{ 'content-center': !data.currentUser }">
      <div id="profile" class="unselectable">
        <div class="user-business-profile-component__wrap__header">
          <div class="user-business-profile-component__wrap__header__logo"></div>
          <div class="user-business-profile-component__wrap__header__user-info">
            <div class="user-business-profile-component__wrap__header__user-info__avatar">
              <img
                :src="props.user?.avatarUrl ? props.user?.avatarUrl : require('@/assets/images/default_avatar.svg')"
              />
            </div>
            <div class="user-business-profile-component__wrap__header__user-info__text-wrapper">
              <span class="user-business-profile-component__wrap__header__user-info__title">{{
                props.user?.name
              }}</span>
              <div class="user-business-profile-component__wrap__header__user-info__subtitle-wrapper">
                <div class="user-business-profile-component__wrap__header__user-info__subtitle">
                  <span>{{ getEmployeeSubtitle(props.user) }}</span>
                </div>
              </div>
            </div>
            <div class="user-business-profile-component__wrap__header__user-info__qrcode-wrapper">
              <canvas id="canvas"></canvas>
            </div>
          </div>
        </div>
        <div class="user-business-profile-component__wrap__header-bottom-line"></div>

        <div class="user-business-profile-component__body">
          <div v-if="props.user?.businessProfile?.quote" class="user-business-profile-component__body__quote-wrapper">
            <div class="user-business-profile-component__body__quote-wrapper__quote">
              <span class="user-business-profile-component__body__quote-wrapper__quote__title">Trích dẫn ưa thích</span>
              <div class="user-business-profile-component__body__quote-wrapper__quote__wrap">
                <img src="@/assets/feature/business-profile/icon_quoteleft.svg" alt="icon_quoteleft" />
                <span class="user-business-profile-component__body__quote-wrapper__quote__value">{{
                  props.user?.businessProfile?.quote
                }}</span>
                <img src="@/assets/feature/business-profile/icon_quoteright.svg" alt="icon_quoteright" />
              </div>
            </div>
          </div>

          <div class="user-business-profile-component__body__section">
            <div class="user-business-profile-component__body__section__title">
              <div class="user-business-profile-component__body__section__title__border"></div>
              <div class="user-business-profile-component__body__section__title__dot"></div>
              <span>giới thiệu bản thân</span>
              <div class="user-business-profile-component__body__section__title__dot"></div>
              <div class="user-business-profile-component__body__section__title__border"></div>
            </div>

            <div
              v-if="props.user?.businessProfile?.introducer"
              class="user-business-profile-component__body__section__introducer"
            >
              <span>
                {{ props.user?.businessProfile?.introducer }}
              </span>
            </div>

            <div class="user-business-profile-component__body__section__user-info">
              <div class="w-100 user-business-profile-component__body__section__user-info__container">
                <div class="user-business-profile-component__body__section__user-info__container__item">
                  <img src="@/assets/icons/colorful/icon_vector.svg" alt="icon_vector" />
                  <span class="user-business-profile-component__body__section__user-info__label"> Họ và tên: </span>
                  <span class="user-business-profile-component__body__section__user-info__value">
                    {{ props.user?.name }}
                  </span>
                </div>
                <div class="user-business-profile-component__body__section__user-info__container__item">
                  <img src="@/assets/icons/colorful/icon_vector.svg" alt="icon_vector" />
                  <span class="user-business-profile-component__body__section__user-info__label"> Số CMND/CCCD: </span>
                  <span class="user-business-profile-component__body__section__user-info__value">
                    {{ props.user?.identityCode }}
                  </span>
                </div>
              </div>

              <div class="w-100 user-business-profile-component__body__section__user-info__container">
                <div class="user-business-profile-component__body__section__user-info__container__item">
                  <img src="@/assets/icons/colorful/icon_vector.svg" alt="icon_vector" />
                  <span class="user-business-profile-component__body__section__user-info__label"> Số điện thoại: </span>
                  <span class="user-business-profile-component__body__section__user-info__value">
                    {{ props.user?.phone }}
                  </span>
                </div>
                <div class="user-business-profile-component__body__section__user-info__container__item">
                  <img src="@/assets/icons/colorful/icon_vector.svg" alt="icon_vector" />
                  <span class="user-business-profile-component__body__section__user-info__label"> Ngày cấp: </span>
                  <span class="user-business-profile-component__body__section__user-info__value">
                    {{ formatDate(props.user?.identityDate, 'dd/MM/yyyy') }}
                  </span>
                </div>
              </div>

              <div class="w-100 user-business-profile-component__body__section__user-info__container">
                <div class="user-business-profile-component__body__section__user-info__container__item">
                  <img src="@/assets/icons/colorful/icon_vector.svg" alt="icon_vector" />
                  <span class="user-business-profile-component__body__section__user-info__label"> Địa chỉ email: </span>
                  <span class="user-business-profile-component__body__section__user-info__value">
                    {{ props.user?.email }}
                  </span>
                </div>
                <div class="user-business-profile-component__body__section__user-info__container__item">
                  <img src="@/assets/icons/colorful/icon_vector.svg" alt="icon_vector" />
                  <span class="user-business-profile-component__body__section__user-info__label"> Nơi cấp: </span>
                  <span class="user-business-profile-component__body__section__user-info__value">
                    {{ props.user?.identityAddress }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="
              props.user?.businessProfile &&
              props.user?.businessProfile.projectPaticipated &&
              props.user?.businessProfile.projectPaticipated.length
            "
            class="user-business-profile-component__body__section"
          >
            <div class="user-business-profile-component__body__section__title">
              <div class="user-business-profile-component__body__section__title__border"></div>
              <div class="user-business-profile-component__body__section__title__dot"></div>
              <span>dự án đã tham gia</span>
              <div class="user-business-profile-component__body__section__title__dot"></div>
              <div class="user-business-profile-component__body__section__title__border"></div>
            </div>
            <div class="user-business-profile-component__body__section__project">
              <div
                v-for="item in props.user?.businessProfile.projectPaticipated"
                :key="item.id"
                class="user-business-profile-component__body__section__project__item"
              >
                <div
                  class="user-business-profile-component__body__section__project__item__image"
                  :style="{ 'background-image': getBackgroundImage(item.imageUrl) }"
                ></div>
                <span class="user-business-profile-component__body__section__project__item__title">{{
                  item.name
                }}</span>
              </div>
            </div>
          </div>

          <div v-if="data.socialUrls && data.socialUrls.length" class="user-business-profile-component__body__section">
            <div class="user-business-profile-component__body__section__title">
              <div class="user-business-profile-component__body__section__title__border"></div>
              <div class="user-business-profile-component__body__section__title__dot"></div>
              <span>trang cá nhân</span>
              <div class="user-business-profile-component__body__section__title__dot"></div>
              <div class="user-business-profile-component__body__section__title__border"></div>
            </div>
            <div
              :class="
                data.socialUrls && data.socialUrls.length === 1
                  ? 'user-business-profile-component__body__section__social-center'
                  : 'user-business-profile-component__body__section__social'
              "
            >
              <div
                v-for="item in data.socialUrls"
                :key="item.name"
                class="user-business-profile-component__body__section__social__item"
              >
                <div class="user-business-profile-component__body__section__social__item__icon">
                  <img :src="findSocialIcon(item)" alt="social_image" />
                </div>
                <a :href="item.url" class="user-business-profile-component__body__section__social__item__value">{{
                  item.url
                }}</a>
              </div>
            </div>
          </div>
        </div>

        <div class="user-business-profile-component__footer-top-line"></div>
        <div class="user-business-profile-component__footer">
          <div class="user-business-profile-component__footer__item">
            <div class="user-business-profile-component__footer__item__img-wrapper">
              <img src="@/assets/feature/business-profile/bg_icon_email.svg" alt="bg_icon_email" />
            </div>
            <div class="user-business-profile-component__footer__item__wrapper">
              <span class="user-business-profile-component__footer__item__label">Địa chỉ email</span>
              <span class="user-business-profile-component__footer__item__value">{{ props.user?.email }}</span>
            </div>
          </div>
          <div class="user-business-profile-component__footer__item">
            <div class="user-business-profile-component__footer__item__img-wrapper">
              <img src="@/assets/feature/business-profile/bg_icon_phone.svg" alt="bg_icon_phone" />
            </div>
            <div class="user-business-profile-component__footer__item__wrapper">
              <span class="user-business-profile-component__footer__item__label">Số điện thoại</span>
              <span class="user-business-profile-component__footer__item__value">{{ props.user?.phone }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="data.isCurrentUser" class="user-business-profile-component__actions">
      <button @click="exportPDF()" class="app-btn app-btn-primary">
        <span>tải về</span>
        <img src="@/assets/feature/business-profile/icon_download.svg" />
      </button>
      <button class="app-btn app-btn-secondary" v-clipboard="data.clipboard" v-clipboard:success="onClipboardSuccess">
        <img src="@/assets/feature/business-profile/icon_link.svg" />
      </button>
      <button class="app-btn app-btn-secondary" @click="goToInfoComponent()">
        <img src="@/assets/feature/business-profile/icon_pencil.svg" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-business-profile-component {
  display: flex;
  flex-direction: column;
  align-items: center;
  #profile {
    width: 100%;
    max-width: 1000px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__wrap {
    display: flex;
    width: 100%;
    &.content-center {
      justify-content: center;
    }
    &__header {
      width: 100%;
      height: 300px;
      background: url('../../../assets/feature/business-profile/bg_header.png');
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      &__logo {
        display: block;
        margin: 40px auto;
        width: 150px;
        height: 40px;
        background: url('../../../assets/feature/business-profile/bg_logo.svg');
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
      }
      &__user-info {
        margin: 40px auto;
        width: 80%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        &__avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          background: linear-gradient(
            270deg,
            #b27f2a 0.11%,
            #b7862e 5.87%,
            #c49939 14.13%,
            #dab84c 23.87%,
            #f4dd62 33.4%,
            #f4e38b 51.65%,
            #f4dd62 66.15%,
            #b27f2a 99.97%
          );
          * {
            width: 94px;
            height: 94px;
            border-radius: 50%;
            background-size: contain;
          }
        }
        &__title {
          font-family: SVN-Santis;
          font-style: normal;
          font-weight: normal;
          font-size: 30px;
          line-height: 1.5;
          color: #ffffff;
          width: 100%;
        }
        &__text-wrapper {
          flex: 1;
          margin-left: 20px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        &__subtitle {
          position: relative;
          padding: 2px 25px;
          background: linear-gradient(89.95deg, #000000 0.84%, #500000 50.34%, #000000 99.94%);
          border-radius: 100px;
          span {
            font-family: Gilroy;
            font-style: normal;
            font-weight: 600;
            font-size: 12px;
            line-height: 1.5;
            letter-spacing: 1px;
            text-transform: uppercase;
            color: #ffdc61;
          }
          &-wrapper {
            position: relative;
            border-radius: 100px;
            padding: 1px;
            &::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              border-radius: 100px;
              padding: 1px;
              background: linear-gradient(
                270deg,
                #b27f2a 0.11%,
                #b7862e 5.87%,
                #c49939 14.13%,
                #dab84c 23.87%,
                #f4dd62 33.4%,
                #f4e38b 51.65%,
                #f4dd62 66.15%,
                #b27f2a 99.97%
              );
              -webkit-mask-composite: destination-out;
              mask-composite: exclude;
            }
          }
        }
        &__qrcode-wrapper {
          width: 100px;
          height: 100px;
          background-color: #ffffff;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          border-radius: 5px;
          & > canvas {
            width: 100% !important;
            height: 100% !important;
          }
        }
      }
      &-bottom-line {
        width: 100%;
        height: 5px;
        background: linear-gradient(180deg, #dd0000 0%, #840000 100%);
        transform: matrix(1, 0, 0, -1, 0, 0);
      }
    }
  }

  &__body {
    width: 100%;
    min-height: 600px;
    padding: 50px 90px 50px 90px;
    background-image: url('../../../assets/feature/business-profile/bg_body_top.png'),
      url('../../../assets/feature/business-profile/bg_body_bottom.png');
    background-position: top, bottom;
    background-repeat: no-repeat, no-repeat;
    background-size: cover, cover;
    background-color: #ffffff;

    &__quote-wrapper {
      position: relative;
      width: 100%;
      &__quote {
        position: absolute;
        width: 100%;
        top: -90px;
        padding: 20px 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #ffffff;
        border-radius: 5px;
        box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.05);
        &__wrap {
          display: flex;
          justify-items: center;
          align-items: flex-start;
          column-gap: 20px;
        }
        &__title {
          font-family: Gilroy;
          font-style: normal;
          font-weight: normal;
          font-size: 12px;
          letter-spacing: 1px;
          color: #0f0f0f;
        }
        &__value {
          font-family: Gilroy;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 130%;
          text-align: center;
          color: #dd0000;
          word-wrap: break-word;
        }
        & > div {
          word-break: break-word;
        }
      }
    }

    &__section {
      margin-top: 50px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      &__title {
        width: 80%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        span {
          padding: 10px 15px;
          font-family: Gilroy;
          font-style: normal;
          font-weight: bold;
          font-size: 12px;
          letter-spacing: 3px;
          text-transform: uppercase;
          white-space: nowrap;
        }
        &__border {
          flex: 1;
          height: 1px;
          background-color: #0f0f0f;
        }
        &__dot {
          width: 6px;
          height: 6px;
          background: #dd0000;
          border-radius: 50%;
        }
      }

      &__introducer {
        padding-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          text-align: center;
          word-break: break-word;
          font-family: Gilroy;
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          color: #0f0f0f;
        }
      }

      &__user-info {
        padding-top: 20px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        row-gap: 15px;
        app-svg {
          width: 16px;
          height: 16px;
        }
        &__label {
          width: 120px;
          font-family: Gilroy;
          font-style: normal;
          font-weight: normal;
          font-size: 13px;
          color: #0f0f0f;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        &__value {
          flex: 1;
          font-family: Gilroy;
          font-style: normal;
          font-weight: bold;
          font-size: 14px;
          color: #0f0f0f;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        &__container {
          display: flex;
          column-gap: 20px;
          &__item {
            display: flex;
            flex: 1 1 100%;
            max-width: 50%;
            column-gap: 20px;
            & > img {
              width: 7px;
              height: 21px;
            }
          }
        }
      }

      &__project {
        padding-top: 20px;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        &__item {
          flex: 0 0 calc(25% - 40px);
          margin: 10px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          &__image {
            width: 100%;
            padding-top: 62.5%;
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            border-radius: 5px;
            margin-bottom: 5px;
          }
          &__title {
            font-family: Gilroy;
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            color: #0f0f0f;
          }
        }
      }

      &__social-center {
        padding-top: 10px;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        &__item {
          display: flex;
          flex-direction: row;
          align-items: center;
          &__icon {
            margin-right: 12px;
            width: 24px;
            height: 24px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            background: #dd0000;
            border-radius: 50%;
          }
          &__value {
            flex: 1;
            font-family: Gilroy;
            font-style: normal;
            font-weight: normal;
            font-size: 13px;
            color: #0f0f0f;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
        }
      }
      &__social {
        padding-top: 10px;
        width: 100%;
        display: grid;
        grid-gap: 5px 10px;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        &__item {
          display: flex;
          flex-direction: row;
          align-items: center;
          &__icon {
            margin-right: 12px;
            width: 24px;
            height: 24px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            background: #dd0000;
            border-radius: 50%;
          }
          &__value {
            flex: 1;
            font-family: Gilroy;
            font-style: normal;
            font-weight: normal;
            font-size: 13px;
            color: #0f0f0f;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            text-decoration: none;
          }
        }
      }
    }
  }

  &__footer-top-line {
    width: 100%;
    height: 3px;
    background: linear-gradient(
      270deg,
      #b27f2a 0.11%,
      #b7862e 5.87%,
      #c49939 14.13%,
      #dab84c 23.87%,
      #f4dd62 33.4%,
      #f4e38b 51.65%,
      #f4dd62 66.15%,
      #b27f2a 99.97%
    );
  }

  &__footer {
    width: 100%;
    height: 150px;
    background: url('../../../assets/feature/business-profile/bg_footer.png');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: row;
    align-items: center;
    &__item {
      flex: 1;
      height: 60px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      &:not(:first-child) {
        background-position: 0 0, 100% 0;
        background-repeat: no-repeat;
        background-size: 1px 100%;
        background-image: linear-gradient(
          to bottom,
          #b27f2a 0.11%,
          #b7862e 5.87%,
          #c49939 14.13%,
          #dab84c 23.87%,
          #f4dd62 33.4%,
          #f4e38b 51.65%,
          #f4dd62 66.15%,
          #b27f2a 99.97%
        );
      }
      &__wrapper {
        display: flex;
        flex-direction: column;
      }
      &__img-wrapper {
        width: 40px;
        height: 40px;
        margin-right: 10px;
        border-radius: 50%;
        background-color: #ffffff;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }
      &__label {
        font-family: Gilroy;
        font-style: normal;
        font-weight: normal;
        font-size: 13px;
        line-height: 130%;
        color: #ffffff;
      }
      &__value {
        font-family: Gilroy;
        font-style: normal;
        font-weight: bold;
        font-size: 15px;
        color: #ffffff;
      }
    }
  }

  &__actions {
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    button:not(:last-child) {
      margin-right: 15px;
    }
    .app-btn-primary {
      font-size: 14px;
      width: 350px;
      padding: 15px 20px;
    }
    .app-btn-secondary {
      padding: 15px;
    }
  }
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, onMounted, watch, ref } from 'vue';
import { useInit, formatDate } from '@/services/shared/utils';
import {
  SocialType,
  EmployeeStatusEnum,
  SocialUrlModel,
  EmployeeModel,
} from '@/services/features/employee/employee.model';
import * as htmlToImage from 'html-to-image';
import * as fs from 'file-saver';
import QRCode from 'qrcode';

// Định nghĩa section của component bằng Typescript
enum UserProfilePageSection {
  PROFILE_INFO = 'info',
  PROFILE_EDIT = 'edit',
  PROFILE_BUSINESS = 'business',
  CHANGE_PASSWORD = 'change-password',
}

const SortOrderSocialUrlsSection = [
  SocialType.SOCIAL_ZALO,
  SocialType.SOCIAL_FACEBOOK,
  SocialType.SOCIAL_VIBER,
  SocialType.SOCIAL_WEBSITE,
  SocialType.SOCIAL_TIKTOK,
  SocialType.SOCIAL_INSTAGRAM,
];

// Định nghĩa data type của component [props] bằng Typescript
class UserBusinessProfileComponentProps {
  user: EmployeeModel;
  slugId: string;
}

// Định nghĩa data type của component [data] bằng Typescript
class UserBusinessProfileComponentData {
  isLoading: boolean;
  socialUrls: any;
  projectPaticipated: SocialUrlModel | null;
  isCurrentUser: boolean;
  clipboard: any;
  sortOrderSocialUrls: any;
}

// Component chính
export default defineComponent({
  name: 'UserBusinessProfileComponent',
  components: {},
  props: {
    user: {
      type: EmployeeModel,
      default: null,
    },
    slugId: {
      type: String,
      default: '',
    },
  },
  setup(props: UserBusinessProfileComponentProps, { emit }: any) {
    // Setup Default
    const { base, isLoggedIn, currentUser } = useInit();

    const data: any = reactive<UserBusinessProfileComponentData>({
      isLoading: false,
      socialUrls: [],
      projectPaticipated: null,
      isCurrentUser: props.slugId ? false : true,
      clipboard: '',
      sortOrderSocialUrls: SortOrderSocialUrlsSection,
    });

    // Function
    const goToInfoComponent = () => {
      emit('changeTab', UserProfilePageSection.PROFILE_INFO);
    };

    const getBackgroundImage = (url: string) => {
      if (url) {
        return `url('${url}')`;
      }
      return `url(${require('@/assets/feature/business-profile/bg_project_default.svg')})`;
    };

    const getProjectPaticipated = () => {
      if (
        props.user.businessProfile &&
        props.user.businessProfile.projectPaticipated &&
        props.user.businessProfile.projectPaticipated.length
      ) {
        data.projectPaticipated = props.user.businessProfile.projectPaticipated
          .map((item: any) => item.name)
          .join(', ');
      }
    };

    const getSocialUrl = () => {
      if (props.user.socialUrls) {
        data.socialUrls = props.user.socialUrls
          .filter((item) => item.url)
          .sort((item1, item2) => {
            const index1 = data.sortOrderSocialUrls.findIndex((value: any) => value === item1.name);
            const index2 = data.sortOrderSocialUrls.findIndex((value: any) => value === item2.name);
            if (index1 < index2) {
              return -1;
            }
            if (index1 > index2) {
              return 1;
            }
            return 0;
          });
      }
    };

    const findSocialIcon = (item: any) => {
      switch (item.name) {
        case SocialType.SOCIAL_FACEBOOK:
          return require('@/assets/feature/business-profile/icon_social_fb.svg');
        case SocialType.SOCIAL_VIBER:
          return require('@/assets/feature/business-profile/icon_social_viber.svg');
        case SocialType.SOCIAL_ZALO:
          return require('@/assets/feature/business-profile/icon_social_zalo.svg');
        case SocialType.SOCIAL_INSTAGRAM:
          return require('@/assets/feature/business-profile/icon_social_insta.svg');
        case SocialType.SOCIAL_TIKTOK:
          return require('@/assets/feature/business-profile/icon_social_tiktok.svg');
        case SocialType.SOCIAL_WEBSITE:
          return require('@/assets/feature/business-profile/icon_social_website.svg');
        default:
          return '';
      }
    };

    const getEmployeeSubtitle = (employee: any) => {
      if (!employee) {
        return '';
      }
      const listSubtitle = [];
      if (employee.role) {
        listSubtitle.push(employee.role.name);
      } else {
        listSubtitle.push('Tư vấn viên');
      }
      if (employee.pos) {
        listSubtitle.push(employee.pos.name);
      }
      return listSubtitle.join(' - ');
    };

    const getBusinessProfileUrl = (employee: any): string => {
      return `${window.location.protocol}//${window.location.hostname}/business-profile/${employee?.slugId}`;
    };

    const exportPDF = () => {
      const node: any = document.getElementById('profile');
      htmlToImage.toPng(node).then((dataUrl) => {
        fs.saveAs(dataUrl, 'profile.png');
      });
    };

    const copyBusinessProfileUrl = () => {
      const result = getBusinessProfileUrl(props.user);
      if (result) {
        data.clipboard = ref(result);
      }
    };

    const onClipboardSuccess = (e: any) => {
      base.toast.success('Đã copy vào bộ nhớ tạm !!');
    };

    const getQRcodeCanvas = () => {
      QRCode.toCanvas(
        document.getElementById('canvas'),
        getBusinessProfileUrl(props.user),
        { errorCorrectionLevel: 'L' },
        () => {
          // TODO
        }
      );
    };

    // Watch
    watch(
      () => props.user,
      () => {
        getProjectPaticipated();
        getSocialUrl();
        copyBusinessProfileUrl();
        getQRcodeCanvas();
      }
    );

    watch(currentUser, () => {
      // Kiểm tra hồ sơ truy cập có phải của người dùng đang đăng nhập hay không?
      if (currentUser.value && props.slugId === currentUser.value.slugId) {
        // Chuyển hương sang trang Profile
        base.router.push({ name: 'profile', query: { activeTab: 'business' } });
        return;
      }
    });
    // Life cylce
    onMounted(() => {
      if (!props.user) {
        return;
      }

      getSocialUrl();
      getProjectPaticipated();
      copyBusinessProfileUrl();
      getQRcodeCanvas();
    });
    return {
      // Enum
      UserProfilePageSection,
      EmployeeStatusEnum,
      // Component props
      props,
      // Component reactive data
      data,
      // Methods
      formatDate,
      getEmployeeSubtitle,
      getBusinessProfileUrl,
      getQRcodeCanvas,
      findSocialIcon,
      getBackgroundImage,
      exportPDF,
      goToInfoComponent,
      copyBusinessProfileUrl,
      onClipboardSuccess,
    };
  },
});
</script>
