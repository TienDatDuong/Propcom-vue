import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { DateTime } from 'luxon';

// axios
import axios from 'axios';
import VueAxios from 'vue-axios';
import { ACTIONS_AUTH } from '@/store/modules/auth';

// i18n
import i18n from './langs/i18n';

// FontAwesome
// import { FontAwesomeIcon } from '@/plugins/font-awesome';

// Vee-validate
import { configure } from 'vee-validate';
// Default values
configure({
  validateOnBlur: false, // controls if `blur` events should trigger validation with `handleChange` handler
  validateOnChange: false, // controls if `change` events should trigger validation with `handleChange` handler
  validateOnInput: false, // controls if `input` events should trigger validation with `handleChange` handler
  validateOnModelUpdate: false, // controls if `update:modelValue` events should trigger validation with `handleChange` handler
});

// Responsive
import { Vue3Mq } from 'vue3-mq';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

// Element Plus
import ElementPlus from 'element-plus';
import './styles/element-variables.scss';

// Constant
import { AppConstant } from '@/app.constant';

// Toast - vue-toastification
import Toast, { PluginOptions, POSITION, useToast } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
const toastOptions: PluginOptions = {
  // You can set your default options here
  position: POSITION.BOTTOM_RIGHT,
  draggablePercent: 0.6,
  maxToasts: AppConstant.TOAST_LIMIT_NUMBER,
};

// V-calendar
// import VCalendar from 'v-calendar';

// Vue-cropper
import VueCropper from 'vue-cropperjs';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/vue'; // swiper bundle styles
import 'swiper/swiper.min.css';

// video.js
import './styles/videojs-variables.scss';

// font
import './styles/_font.scss';
// form customize
import './styles/_form.scss';
// form customize
import './styles/_html-render.scss';

import './styles/index.scss';
import AppEmptyComponent from '@/components/ui/AppEmptyComponent.vue';
import AppDialogComponent from '@/components/ui/AppDialogComponent.vue';
import AppHomeDialog from '@/components/ui/AppHomeDialog.vue';
import AppBreadcrumbBarComponent from '@/components/ui/AppBreadcrumbBarComponent.vue';
import AppRouteCallDialog from '@/components/ui/AppRouteCallDialog.vue';
import AppFilterComponent from '@/components/ui/AppFilterComponent.vue';
import AppAsideAdvertisement from '@/components/ui/AppAsideAdvertisement.vue';
import AppIconLoading from '@/components/ui/icon/AppIconLoading.vue';
// vue3-youtube
import YouTube from 'vue3-youtube';
// observe-visibility
import { ObserveVisibility } from 'vue-observe-visibility';
import { VueClipboard } from '@soerenmartius/vue3-clipboard';
// @ts-ignore
import number from '@coders-tm/vue-number-format';
// import VueNumberFormat from 'vue-number-format';

const app = createApp(App)
  .use(store)
  .use(router)
  // axios
  .use(VueAxios, axios)
  // i18n
  .use(i18n)
  // Responsive
  .use(Vue3Mq, { preset: 'bootstrap5' })
  // Element Plus
  .use(ElementPlus, { i18n: (key: any, value: any) => i18n.global.t(key, value) })
  // FontAwesome
  // .component('fa', FontAwesomeIcon)
  // Toast
  .use(Toast, toastOptions)
  .use(VueClipboard)
  .use(number, {
    precision: 4,
  })

  // Vue-cropper
  .component('vue-cropper', VueCropper)
  // Swiper
  .component('swiper', Swiper)
  .component('swiper-slide', SwiperSlide)
  // App
  .component('AppEmptyComponent', AppEmptyComponent)
  .component('AppDialogComponent', AppDialogComponent)
  .component('AppBreadcrumbBarComponent', AppBreadcrumbBarComponent)
  .component('AppAsideAdvertisement', AppAsideAdvertisement)
  .component('AppHomeDialog', AppHomeDialog)
  .component('AppRouteCallDialog', AppRouteCallDialog)
  .component('AppFilterComponent', AppFilterComponent)
  .component('AppIconLoading', AppIconLoading)
  .component('YouTube', YouTube)
  .directive('observe-visibility', {
    beforeMount: (el, binding, vnode) => {
      (vnode as any).context = binding.instance;
      ObserveVisibility.bind(el, binding, vnode);
    },
    updated: ObserveVisibility.update,
    unmounted: ObserveVisibility.unbind,
  });
// app.config.errorHandler = (err: any, vm, info) => {
// };
app.axios.defaults.headers.common['Authorization'] = `Bearer ${store.getters['auth/token']}`;
app.axios.defaults.headers.common['timezoneclient'] = DateTime.local().zoneName;
app.axios.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);
app.axios.interceptors.response.use(undefined, (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 400: {
        const toast = useToast();
        toast.clear();
        if (error.response.data && error.response.data.errors) {
          if (typeof error.response.data.errors === 'string') {
            toast.error(error.response?.data?.errors);
          } else if (typeof error.response.data.errors === 'object') {
            const keys = Object.keys(error.response.data.errors);
            if (keys && keys.length) {
              toast.error(error.response?.data?.errors[keys[0]]);
            }
          }
        }
        break;
      }
      case 401: {
        // Logout
        store.dispatch(`${ACTIONS_AUTH.ROOT}/${ACTIONS_AUTH.LOGOUT}`);
        // Điều hướng về màn hình home nếu đang ở trang yêu cầu đăng nhập
        if (
          router.currentRoute &&
          router.currentRoute.value &&
          router.currentRoute.value.meta &&
          router.currentRoute.value.meta.requiresAuth
        ) {
          router.push({ name: 'home' });
        }
        break;
      }
      case 403: {
        const toast = useToast();
        toast.clear();
        if (error.response.data && error.response.data._body && typeof error.response.data._body === 'string') {
          toast.error('Nội dung chứa ký tự $ không hợp lệ, vui lòng kiểm tra lại');
        } else {
          toast.error('Không có quyền truy cập');
        }
        break;
      }
    }
  }
  return Promise.reject(error);
});
app.mount('#app');
