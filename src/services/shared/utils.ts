import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { useToast } from 'vue-toastification';
import { DateTime } from 'luxon';
import { RouteLocationNormalizedLoaded } from 'vue-router';
// https://github.com/craigrileyuk/vue3-mq
import { useMq } from 'vue3-mq';
import * as yup from 'yup';
import QRCode from 'qrcode';
import { saveAs } from 'file-saver';
import { PostMediaTypeEnum } from '../features/group/group.model';
import { computed } from 'vue';
import { Constant } from './constant';
import { CurrencyEnum } from './enum';

export const useInit = () => {
  const { t, locale } = useI18n();
  const store = useStore();
  const router = useRouter();
  const route = useRoute();
  const toast = useToast();
  const mq = useMq();

  const base = {
    i18n: t,
    locale: locale,
    store: store,
    router: router,
    route: route,
    toast: toast,
    mq: mq,
  };

  return {
    base,
    isLoggedIn: computed(() => store.getters['auth/token']),
    dialogAppVisible: computed(() => store.getters['auth/dialogAppVisible']),
    currentUser: computed(() => store.getters['auth/user']),
    userId: store.getters['auth/userId'],
    userPermission: store.getters['auth/userPermission'],
    stringeeToken: store.getters['auth/stringeeToken'],
  };
};

// export const initMetaFromRoute = (route: RouteLocationNormalizedLoaded) => {
//   let description = AppConstant.APP_NAME;
//   if (route.meta) {
//     description = route.meta.breadcrumb && Array.isArray(route.meta.breadcrumb)
//       ? route.meta.breadcrumb
//         .map((item) => item.text)
//         .join('/')
//       : String(route.meta.title);
//   }
//   useMeta({
//     title: route.meta.title,
//     meta: [
//       { property: "og:description", content: description },
//       { property: "og:image", content: AppConstant.PREVIEW_IMAGE_URL },
//     ],
//   });
// };

export const getFormFieldData = (fields: any, fieldName: string) => {
  const fieldData = fields[fieldName];
  if (!fieldData) {
    throw new Error(`Field [${fieldName}] not found`);
  }
  return fieldData;
};

export const isActiveRoute = (route: RouteLocationNormalizedLoaded, routeData: any) => {
  if (typeof routeData === 'string') {
    return route.path === routeData;
  }
  return route.name === routeData.name;
};

export const formatDate = (dateISO: string, format = 'dd/MM/yyyy HH:mm') => {
  return dateISO ? DateTime.fromISO(dateISO).toFormat(format) : '';
};

export const formatNumber = (ammount: number) => {
  return ammount !== null && ammount !== undefined ? Number(ammount).toLocaleString('en-US') : '';
};

export const formatNumberWithDot = (amount: number) => {
  return amount !== null && amount !== undefined ? Number(amount).toLocaleString('es-ES') : '';
};

export const encapsulateUrl = (url: string) => `"${url}"`;

export const zeroPad = (num: number, places: number): string => {
  const zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join('0') + num;
};

export const generateQRCodeUrl = async (params: { userId: string; timestamp: number }) => {
  const qrcodeData = {
    userId: params.userId,
    timestamp: params.timestamp,
  };
  const base64 = window.btoa(unescape(encodeURIComponent(JSON.stringify(qrcodeData))));
  return await QRCode.toDataURL(base64, { errorCorrectionLevel: 'M' });
};

export const downloadFile = async (url: string, fileName: string) => {
  return saveAs(url, fileName);
};

export const createYupSchema = (schema: any, config: any) => {
  const { id, validationType, validations = [] } = config;
  if (!(yup as any)[validationType]) {
    return schema;
  }
  let validator = (yup as any)[validationType]();
  validations.forEach((validation: any) => {
    const { params, type } = validation;
    if (!validator[type]) {
      return;
    }
    validator = validator[type](...params);
  });
  schema[id] = validator;
  return schema;
};

export const youtubeParser = (description: string): { type: string; url: string }[] => {
  const medias: { type: string; url: string }[] = [];
  // replace all enter => space
  description = description.replace(/(?:\r\n|\r|\n)/g, ' ');
  const split = description.split(' ');
  const regExp = new RegExp(
    /^https?:\/\/(?:www\.youtube(?:-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*&)?vi?=|&vi?=|\?(?:.*&)?vi?=)([^#&?\n/<>"']*)/,
    'i'
  );
  for (const text of split) {
    const match = text.match(regExp);
    if (match && match[1].length == 11) {
      const media = {
        type: PostMediaTypeEnum.YOUTUBE,
        url: match[0],
      };
      medias.push(media);
    }
  }
  return medias;
};

export const openNewTab = (url: string) => {
  window.open(url, '_blank');
};

export const checkHasAuthority = (auths: any, authData: any) => {
  let isHasRole = false;
  if (authData) {
    for (const permission of auths) {
      const permissionCurr = authData.find((auth: any) => auth.featureName === permission);
      if (permissionCurr) {
        isHasRole = true;
      }
    }
    return isHasRole;
  }
};

export const markPhone = (phone: string) => {
  if (!phone) {
    return '';
  }
  return '******' + phone.slice(6);
};

export const markEmail = (email: string) => {
  if (!email) {
    return '';
  }
  return email.slice(0, 3) + '****';
};

export const parseEmail = (email: string): string => {
  if (email) {
    return email.replace(Constant.REG_NUMBER_CHARACTERISTICS, '.');
  }
  return '';
};

export const parsePhoneLead = (value: string) => {
  if (!value) {
    return '';
  }
  if (parseInt(value) > -1) {
    return '******' + value.slice(-4);
  }
  return value;
};

export const convertTime = (time: number) => {
  let minute = 0;
  let second = 0;
  if (time > 59) {
    minute = Math.floor(time / 60);
  }
  second = time - minute * 60;

  return (minute + '').padStart(2, '0') + ':' + (second + '').padStart(2, '0');
};

export const convertGetMasterData = (masterData: any, key: string) => {
  if (!Array.isArray(masterData)) {
    return masterData ? masterData : '';
  }
  if (masterData && masterData.length) {
    const value = masterData.find((x: any) => {
      return x.key === key;
    }).value;
    return value;
  }
};

export const contentHide = (content: string, length: number) => {
  if (content && content.length > length) {
    content = content.substring(0, length - 1) + '...';
  }
  return content;
};

export const convertNumberToWord = (money: number) => {
  const billion = 1000000000;
  const million = 1000000;
  const thousand = 1000;
  let unit;
  if (money && money > 0) {
    if (money >= billion) {
      unit = money % billion === 0 ? money / billion : parseFloat((money / billion).toFixed(3));
      return `${unit} ${CurrencyEnum.Billion}`;
    } else if (money >= million) {
      unit = money % million === 0 ? money / million : parseFloat((money / million).toFixed(3));
      return `${unit} ${CurrencyEnum.Million}`;
    } else if (money >= thousand) {
      unit = money % thousand === 0 ? money / thousand : parseFloat((money / thousand).toFixed(3));
      return `${unit} ${CurrencyEnum.Thousand}`;
    }
    return money;
  }
  return '';
};

export const hiddenPhoneNumbers = (phone: any) => {
  if (phone) {
    return phone.replace(/.{0,3}$/, '***');
  }
  return '';
};

export const getUniqueListBy = (arr: any[], key: string) => {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
};

export const parseToMoney = (text: any) => {
  if (text) {
    if (typeof text === 'string') {
      return false;
    }
    text = text.toString().replace(/,/g, '');
    const number = parseInt(text);
    if (Number.isInteger(number)) {
      return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    } else {
      return false;
    }
  }
  return text;
};
