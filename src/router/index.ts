import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import store from '@/store';
const MobileDetect = require('mobile-detect');
// https://next.router.vuejs.org/guide/advanced/lazy-loading.html#grouping-components-in-the-same-chunk

import HomeLayout from '@/components/layout/HomeLayout.vue';
import AuthLayout from '@/components/layout/AuthLayout.vue';
import { ACTIONS_AUTH } from '@/store/modules/auth';
import { AppConstant } from '@/app.constant';

// Auth
const LoginPage = () => import(/* webpackChunkName: "home" */ '../views/auth/LoginPage.vue');
const RegisterPage = () => import(/* webpackChunkName: "home" */ '../views/auth/RegisterPage.vue');
const ForgotPasswordPage = () => import(/* webpackChunkName: "home" */ '../views/auth/ForgotPasswordPage.vue');
// Home
const HomePage = () => import(/* webpackChunkName: "home" */ '../views/HomePage.vue');
// Group
const GroupHomePage = () => import(/* webpackChunkName: "group" */ '../views/group/GroupHomePage.vue');
const LeadHomePage = () => import(/* webpackChunkName: "group" */ '../views/lead/LeadHomePage.vue');
const GroupSearchResultPage = () => import(/* webpackChunkName: "group" */ '../views/group/GroupSearchResultPage.vue');
const GroupSuggestPage = () => import(/* webpackChunkName: "group" */ '../views/group/GroupSuggestPage.vue');
const GroupParticipatedPage = () => import(/* webpackChunkName: "group" */ '../views/group/GroupParticipatedPage.vue');
const GroupManagePage = () => import(/* webpackChunkName: "group" */ '../views/group/GroupManagePage.vue');
const GroupDetailPage = () => import(/* webpackChunkName: "group" */ '../views/group/GroupDetailPage.vue');
const LeadDetailPage = () => import(/* webpackChunkName: "group" */ '../views/lead/LeadDetailPage.vue');
const LeadUpdatePage = () => import(/* webpackChunkName: "group" */ '../views/lead/LeadUpdatePage.vue');
const LeadHistoryCallPage = () => import(/* webpackChunkName: "group" */ '../views/lead/LeadHistoryCallPage.vue');
const PostDetailPage = () => import(/* webpackChunkName: "group" */ '../views/group/PostDetailPage.vue');
const GroupDiscoverPage = () => import(/* webpackChunkName: "group" */ '../views/group/GroupDiscoverPage.vue');

//Investor
const InvestorDetailPage = () => import(/* webpackChunkName: "group" */ '../views/investor/InvestorDetailPage.vue');

// User profile
const UserProfilePage = () => import(/* webpackChunkName: "user-profile" */ '../views/profile/UserProfilePage.vue');
// News public
const NewPublicPage = () => import(/* webpackChunkName: "news" */ '../views/NewPublicPage.vue');

// Propskill
const PropskillHomePage = () => import(/* webpackChunkName: "propskill" */ '../views/elearning/PropskillHomePage.vue');
const PropskillSearchResultPage = () =>
  import(/* webpackChunkName: "propskill" */ '../views/elearning/PropskillSearchResultPage.vue');
const PropskillListCategoryPage = () =>
  import(/* webpackChunkName: "propskill" */ '../views/elearning/PropskillListCategoryPage.vue');
const PropskillListPage = () => import(/* webpackChunkName: "propskill" */ '../views/elearning/PropskillListPage.vue');
const PropskillDetailCoursePage = () =>
  import(/* webpackChunkName: "propskill" */ '../views/elearning/PropskillDetailCoursePage.vue');
const PropskillDetailInstructorPage = () =>
  import(/* webpackChunkName: "propskill" */ '../views/elearning/PropskillDetailInstructorPage.vue');
const PropskillHistoryStudyPage = () =>
  import(/* webpackChunkName: "propskill" */ '../views/elearning/PropskillHistoryStudyPage.vue');
const PropskillProgessLessonPage = () =>
  import(/* webpackChunkName: "propskill" */ '../views/elearning/PropskillProgessLessonPage.vue');
const PropskillProgessTopicPage = () =>
  import(/* webpackChunkName: "propskill" */ '../views/elearning/PropskillProgessTopicPage.vue');
const PropskillDetailCategoryPage = () =>
  import(/* webpackChunkName: "propskill" */ '../views/elearning/PropskillDetailCategoryPage.vue');
const PropskillSpeakerFavoritePage = () =>
  import(/* webpackChunkName: "propskill" */ '../views/elearning/PropskillSpeakerFavoritePage.vue');
const PropskillCourseFavoritePage = () =>
  import(/* webpackChunkName: "propskill" */ '../views/elearning/PropskillCourseFavoritePage.vue');
const PropskillCourseInProgressPage = () =>
  import(/* webpackChunkName: "propskill" */ '../views/elearning/PropskillCourseInProgressPage.vue');
const PropskillCourseCompletedPage = () =>
  import(/* webpackChunkName: "propskill" */ '../views/elearning/PropskillCourseCompletedPage.vue');
const PropskillRankTotalPage = () =>
  import(/* webpackChunkName: "propskill" */ '../views/elearning/PropskillRankTotalPage.vue');
const PropskillDoExamPage = () =>
  import(/* webpackChunkName: "propskill" */ '../views/elearning/PropskillDoExamPage.vue');
const PropskillDoHomeworkPage = () =>
  import(/* webpackChunkName: "propskill" */ '../views/elearning/PropskillDoHomeworkPage.vue');
const PropskillCourseSpeakerPage = () =>
  import(/* webpackChunkName: "propskill" */ '../views/elearning/PropskillCourseSpeakerPage.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: 'Trang ch???',
      breadcrumb: [{ text: 'Trang ch???', routeName: 'home' }],
      layout: HomeLayout,
      isDesktopOnly: true, // N???u isDesktopOnly = true th?? s??? hi???n dialog b???t t???i app v???
    },
    redirect: { name: 'group' },
    // component: HomePage,
  },
  // Nh??m
  {
    path: '/group',
    name: 'group',
    meta: {
      title: 'Nh??m',
      breadcrumb: [
        { text: 'Trang ch???', routeName: 'home' },
        { text: 'Nh??m', routeName: 'group' },
      ],
      layout: HomeLayout,
      isDesktopOnly: true, // N???u isDesktopOnly = true th?? s??? hi???n dialog b???t t???i app v???
    },
    component: GroupHomePage,
  },
  // Lead
  {
    path: '/lead',
    name: 'lead',
    meta: {
      title: 'Lead',
      breadcrumb: [
        { text: 'Trang ch???', routeName: 'home' },
        { text: 'Khai th??c kh??ch h??ng', routeName: 'lead' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // N???u isDesktopOnly = true th?? s??? hi???n dialog b???t t???i app v???
    },
    component: LeadHomePage,
  },
  {
    path: '/investor/:id',
    name: AppConstant.ROUTE_NAME.INVESTOR_DETAIL,
    meta: {
      title: 'K??nh gian h??ng',
      breadcrumb: [
        { text: 'Trang ch???', routeName: 'home' },
        { text: 'K??nh gian h??ng', routeName: AppConstant.ROUTE_NAME.INVESTOR_DETAIL },
        { text: 'Gian h??ng c???a t??i', routeName: AppConstant.ROUTE_NAME.INVESTOR_DETAIL },
      ],
      layout: HomeLayout,
      isDesktopOnly: true, // N???u isDesktopOnly = true th?? s??? hi???n dialog b???t t???i app v???
    },
    component: InvestorDetailPage,
  },
  {
    path: '/group/search',
    name: 'group-search',
    meta: {
      title: 'K???t qu??? t??m ki???m',
      breadcrumb: [
        { text: 'Trang ch???', routeName: 'home' },
        { text: 'Nh??m', routeName: 'group' },
        { text: 'K???t qu??? t??m ki???m', routeName: 'group-search' },
      ],
      layout: HomeLayout,
      isDesktopOnly: true, // N???u isDesktopOnly = true th?? s??? hi???n dialog b???t t???i app v???
    },
    component: GroupSearchResultPage,
  },
  {
    path: '/group/suggest',
    name: 'group-suggest',
    meta: {
      title: 'C?? th??? b???n quan t??m',
      breadcrumb: [
        { text: 'Trang ch???', routeName: 'home' },
        { text: 'Nh??m', routeName: 'group' },
        { text: 'C?? th??? b???n quan t??m', routeName: 'group-suggest' },
      ],
      layout: HomeLayout,
      isDesktopOnly: true, // N???u isDesktopOnly = true th?? s??? hi???n dialog b???t t???i app v???
    },
    component: GroupSuggestPage,
  },
  {
    path: '/group/participated',
    name: 'group-participated',
    meta: {
      title: 'Nh??m ???? tham gia',
      breadcrumb: [
        { text: 'Trang ch???', routeName: 'home' },
        { text: 'Nh??m', routeName: 'group' },
        { text: 'Nh??m ???? tham gia', routeName: 'group-participated' },
      ],
      layout: HomeLayout,
      isDesktopOnly: true, // N???u isDesktopOnly = true th?? s??? hi???n dialog b???t t???i app v???
    },
    component: GroupParticipatedPage,
  },
  {
    path: '/group/manage',
    name: 'group-manage',
    meta: {
      title: 'Qu???n l?? c???a t??i',
      breadcrumb: [
        { text: 'Trang ch???', routeName: 'home' },
        { text: 'Nh??m', routeName: 'group' },
        { text: 'Qu???n l?? c???a t??i', routeName: 'group-manage' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // N???u isDesktopOnly = true th?? s??? hi???n dialog b???t t???i app v???
    },
    component: GroupManagePage,
  },
  {
    path: '/group/:id',
    name: 'group-detail',
    meta: {
      title: 'Chi ti???t nh??m',
      breadcrumb: [
        { text: 'Trang ch???', routeName: 'home' },
        { text: 'Nh??m', routeName: 'group' },
        { text: 'Chi ti???t nh??m', routeName: 'group-detail' },
      ],
      layout: HomeLayout,
      isDesktopOnly: true, // N???u isDesktopOnly = true th?? s??? hi???n dialog b???t t???i app v???
    },
    component: GroupDetailPage,
    beforeEnter: (to: any, from: any, next) => {
      if (to.meta && to.meta.breadcrumb) {
        to.meta.breadcrumb[2].params = to.params;
      }
      next();
    },
  },
  {
    path: '/lead/:id',
    name: 'lead-detail',
    meta: {
      title: 'Chi ti???t khai th??c',
      breadcrumb: [
        { text: 'Trang ch???', routeName: 'home' },
        { text: 'Khai th??c', routeName: 'lead' },
        { text: 'Chi ti???t khai th??c', routeName: 'lead-detail' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // N???u isDesktopOnly = true th?? s??? hi???n dialog b???t t???i app v???
    },
    component: LeadDetailPage,
    beforeEnter: (to: any, from: any, next) => {
      if (to.meta && to.meta.breadcrumb) {
        to.meta.breadcrumb[2].params = to.params;
      }
      next();
    },
  },
  {
    path: '/lead/update/:id',
    name: 'lead-update',
    meta: {
      title: 'Chi ti???t khai th??c',
      breadcrumb: [
        { text: 'Trang ch???', routeName: 'home' },
        { text: 'Khai th??c', routeName: 'lead' },
        { text: 'Chi ti???t khai th??c', routeName: 'lead-update' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // N???u isDesktopOnly = true th?? s??? hi???n dialog b???t t???i app v???
    },
    component: LeadUpdatePage,
    beforeEnter: (to: any, from: any, next) => {
      if (to.meta && to.meta.breadcrumb) {
        to.meta.breadcrumb[2].params = to.params;
      }
      next();
    },
  },
  {
    path: '/lead/history-call/:id',
    name: 'lead-history-call',
    meta: {
      title: 'Danh s??ch l???ch s??? cu???c g???i',
      breadcrumb: [
        { text: 'Trang ch???', routeName: 'home' },
        { text: 'Khai th??c', routeName: 'lead' },
        { text: 'Danh s??ch l???ch s??? cu???c g???i', routeName: 'lead-history-call' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // N???u isDesktopOnly = true th?? s??? hi???n dialog b???t t???i app v???
    },
    component: LeadHistoryCallPage,
    beforeEnter: (to: any, from: any, next) => {
      if (to.meta && to.meta.breadcrumb) {
        to.meta.breadcrumb[2].params = to.params;
      }
      next();
    },
  },
  {
    path: '/group-post/:groupId/:id',
    name: 'group-post-detail',
    meta: {
      title: 'Chi ti???t b??i vi???t',
      breadcrumb: [
        { text: 'Trang ch???', routeName: 'home' },
        { text: 'B??i vi???t', routeName: 'group-post' },
        { text: 'Chi ti???t b??i vi???t', routeName: 'group-post-detail' },
      ],
      layout: HomeLayout,
      isDesktopOnly: true, // N???u isDesktopOnly = true th?? s??? hi???n dialog b???t t???i app v???
    },
    component: PostDetailPage,
    beforeEnter: (to: any, from: any, next) => {
      if (to.meta && to.meta.breadcrumb) {
        to.meta.breadcrumb[2].params = to.params;
      }
      next();
    },
  },
  {
    path: '/group/discover',
    name: 'group-discover',
    meta: {
      title: 'Kh??m ph??',
      breadcrumb: [
        { text: 'Trang ch???', routeName: 'home' },
        { text: 'Nh??m', routeName: 'group' },
        { text: 'Kh??m ph??', routeName: 'group-discover' },
      ],
      layout: HomeLayout,
      isDesktopOnly: true, // N???u isDesktopOnly = true th?? s??? hi???n dialog b???t t???i app v???
    },
    component: GroupDiscoverPage,
  },
  // User profile
  {
    path: '/profile',
    name: 'profile',
    meta: {
      title: 'Th??ng tin c?? nh??n',
      breadcrumb: [
        { text: 'Trang ch???', routeName: 'home' },
        { text: 'Th??ng tin c?? nh??n', routeName: 'profile' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: false, // N???u isDesktopOnly = true th?? s??? hi???n dialog b???t t???i app v???
    },
    component: UserProfilePage,
  },
  {
    path: '/business-profile/:id',
    name: 'business-profile',
    meta: {
      title: 'K??nh gian h??ng',
      breadcrumb: [
        { text: 'Trang ch???', routeName: 'home' },
        { text: 'Business profile', routeName: 'business-profile' },
      ],
      layout: HomeLayout,
      isDesktopOnly: false, // N???u isDesktopOnly = true th?? s??? hi???n dialog b???t t???i app v???
    },
    component: UserProfilePage,
  },
  // News public
  {
    path: '/news-public/:id',
    name: 'news-public',
    meta: {
      title: 'Tin t???c',
    },
    component: NewPublicPage,
  },
  // Propskill public
  {
    path: '/propskill',
    name: 'propskill',
    meta: {
      title: 'Propskill',
      breadcrumb: [
        { text: 'Trang ch???', routeName: 'home' },
        { text: 'Propskill', routeName: 'propskill' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // N???u isDesktopOnly = true th?? s??? hi???n dialog b???t t???i app v???
    },
    component: PropskillHomePage,
  },
  {
    path: '/propskill/search/',
    name: 'propskill-search',
    meta: {
      title: 'T??m ki???m',
      breadcrumb: [
        { text: 'Trang ch???', routeName: 'home' },
        { text: 'Propskill', routeName: 'propskill' },
        { text: 'T??m ki???m', routeName: 'propskill-search' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // N???u isDesktopOnly = true th?? s??? hi???n dialog b???t t???i app v???
    },
    component: PropskillSearchResultPage,
  },
  {
    path: '/propskill/category',
    name: 'propskill-category',
    meta: {
      title: 'Danh s??ch danh m???c',
      breadcrumb: [
        { text: 'Trang ch???', routeName: 'home' },
        { text: 'Propskill', routeName: 'propskill' },
        { text: 'Danh s??ch danh m???c', routeName: 'propskill-category' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // N???u isDesktopOnly = true th?? s??? hi???n dialog b???t t???i app v???
    },
    component: PropskillListCategoryPage,
  },
  {
    path: '/propskill/list',
    name: 'propskill-list',
    meta: {
      title: 'Danh s??ch',
      breadcrumb: [
        { text: 'Trang ch???', routeName: 'home' },
        { text: 'Propskill', routeName: 'propskill' },
        { text: 'Danh s??ch kh??a h???c', routeName: 'propskill-list' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // N???u isDesktopOnly = true th?? s??? hi???n dialog b???t t???i app v???
    },
    component: PropskillListPage,
  },
  {
    path: '/propskill/detail-course/:id',
    name: 'propskill-detail-course',
    meta: {
      title: 'Chi ti???t kh??a h???c',
      breadcrumb: [
        { text: 'Trang ch???', routeName: 'home' },
        { text: 'Propskill', routeName: 'propskill' },
        { text: 'Chi ti???t kh??a h???c', routeName: 'propskill-detail-course' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // N???u isDesktopOnly = true th?? s??? hi???n dialog b???t t???i app v???
    },
    component: PropskillDetailCoursePage,
  },
  {
    path: '/propskill/detail-instructor/:id',
    name: 'propskill-detail-instructor',
    meta: {
      title: 'Chi ti???t di???n gi???',
      breadcrumb: [
        { text: 'Trang ch???', routeName: 'home' },
        { text: 'Propskill', routeName: 'propskill' },
        { text: 'Chi ti???t di???n gi???', routeName: 'propskill-detail-instructor' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // N???u isDesktopOnly = true th?? s??? hi???n dialog b???t t???i app v???
    },
    component: PropskillDetailInstructorPage,
  },
  {
    path: '/propskill/history',
    name: 'propskill-history',
    meta: {
      title: 'H??? s?? b??i h???c',
      breadcrumb: [
        { text: 'Trang ch???', routeName: 'home' },
        { text: 'Propskill', routeName: 'propskill' },
        { text: 'H??? s?? b??i h???c', routeName: 'propskill-history' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // N???u isDesktopOnly = true th?? s??? hi???n dialog b???t t???i app v???
    },
    component: PropskillHistoryStudyPage,
  },
  {
    path: '/propskill/progess-lesson/:id',
    name: 'propskill-progess-lesson',
    meta: {
      title: 'Ti???n tr??nh b??i h???c',
      breadcrumb: [
        { text: 'Trang ch???', routeName: 'home' },
        { text: 'Propskill', routeName: 'propskill' },
        { text: 'Ti???n tr??nh b??i h???c', routeName: 'propskill-progess-lesson' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // N???u isDesktopOnly = true th?? s??? hi???n dialog b???t t???i app v???
    },
    component: PropskillProgessLessonPage,
  },
  {
    path: '/propskill/progess-topic/:id',
    name: 'propskill-progess-topic',
    meta: {
      title: 'Ti???n tr??nh b??i h???c',
      breadcrumb: [
        { text: 'Trang ch???', routeName: 'home' },
        { text: 'Propskill', routeName: 'propskill' },
        { text: 'Ti???n tr??nh ch??? ?????', routeName: 'propskill-progess-topic' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // N???u isDesktopOnly = true th?? s??? hi???n dialog b???t t???i app v???
    },
    component: PropskillProgessTopicPage,
  },
  {
    path: '/propskill/detail-category/:id',
    name: 'propskill-detail-category',
    meta: {
      title: 'Chi ti???t danh m???c',
      breadcrumb: [
        { text: 'Trang ch???', routeName: 'home' },
        { text: 'Propskill', routeName: 'propskill' },
        { text: 'Chi ti???t danh m???c', routeName: 'propskill-detail-category' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // N???u isDesktopOnly = true th?? s??? hi???n dialog b???t t???i app v???
    },
    component: PropskillDetailCategoryPage,
  },
  {
    path: '/propskill/favorite-intructor',
    name: 'propskill-favorite-intructor',
    meta: {
      title: 'Di???n gi??? quan t??m',
      breadcrumb: [
        { text: 'Trang ch???', routeName: 'home' },
        { text: 'Propskill', routeName: 'propskill' },
        { text: 'Di???n gi??? quan t??m', routeName: 'propskill-favorite-intructor' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // N???u isDesktopOnly = true th?? s??? hi???n dialog b???t t???i app v???
    },
    component: PropskillSpeakerFavoritePage,
  },
  {
    path: '/propskill/favorite-course',
    name: 'propskill-favorite-course',
    meta: {
      title: 'Kh??a h???c quan t??m',
      breadcrumb: [
        { text: 'Trang ch???', routeName: 'home' },
        { text: 'Propskill', routeName: 'propskill' },
        { text: 'Kh??a h???c quan t??m', routeName: 'propskill-favorite-course' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // N???u isDesktopOnly = true th?? s??? hi???n dialog b???t t???i app v???
    },
    component: PropskillCourseFavoritePage,
  },
  {
    path: '/propskill/course-in-progress',
    name: 'propskill-course-in-progress',
    meta: {
      title: 'Kh??a h???c ??ang h???c',
      breadcrumb: [
        { text: 'Trang ch???', routeName: 'home' },
        { text: 'Propskill', routeName: 'propskill' },
        { text: 'Kh??a h???c ??ang h???c', routeName: 'propskill-course-in-progress' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // N???u isDesktopOnly = true th?? s??? hi???n dialog b???t t???i app v???
    },
    component: PropskillCourseInProgressPage,
  },
  {
    path: '/propskill/course-completed',
    name: 'propskill-course-completed',
    meta: {
      title: 'Kh??a h???c ???? ho??n th??nh',
      breadcrumb: [
        { text: 'Trang ch???', routeName: 'home' },
        { text: 'Propskill', routeName: 'propskill' },
        { text: 'Kh??a h???c ???? ho??n th??nh', routeName: 'propskill-course-completed' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // N???u isDesktopOnly = true th?? s??? hi???n dialog b???t t???i app v???
    },
    component: PropskillCourseCompletedPage,
  },
  {
    path: '/propskill/rank-total',
    name: 'propskill-rank-total',
    meta: {
      title: 'B???ng x???p h???ng t???ng',
      breadcrumb: [
        { text: 'Trang ch???', routeName: 'home' },
        { text: 'Propskill', routeName: 'propskill' },
        { text: 'B???ng x???p h???ng t???ng', routeName: 'propskill-rank-total' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // N???u isDesktopOnly = true th?? s??? hi???n dialog b???t t???i app v???
    },
    component: PropskillRankTotalPage,
  },
  {
    path: '/propskill/do-exam/:id',
    name: 'propskill-do-exam',
    meta: {
      title: 'L??m b??i thi',
      breadcrumb: [
        { text: 'Trang ch???', routeName: 'home' },
        { text: 'Propskill', routeName: 'propskill' },
        { text: 'L??m b??i thi', routeName: 'propskill-do-exam' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // N???u isDesktopOnly = true th?? s??? hi???n dialog b???t t???i app v???
    },
    component: PropskillDoExamPage,
  },
  {
    path: '/propskill/do-home-work/:id',
    name: 'propskill-do-home-work',
    meta: {
      title: 'L??m b??i t???p',
      breadcrumb: [
        { text: 'Trang ch???', routeName: 'home' },
        { text: 'Propskill', routeName: 'propskill' },
        { text: 'L??m b??i t???p', routeName: 'propskill-do-home-work' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // N???u isDesktopOnly = true th?? s??? hi???n dialog b???t t???i app v???
    },
    component: PropskillDoHomeworkPage,
  },
  {
    path: '/propskill/course-instructor/:id',
    name: 'propskill-course-instructor',
    meta: {
      title: 'Ch???n kh??a h???c',
      breadcrumb: [
        { text: 'Trang ch???', routeName: 'home' },
        { text: 'Propskill', routeName: 'propskill' },
        { text: 'Ch???n kh??a h???c', routeName: 'propskill-course-instructor' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // N???u isDesktopOnly = true th?? s??? hi???n dialog b???t t???i app v???
    },
    component: PropskillCourseSpeakerPage,
  },
  // Login
  {
    path: '/auth/login',
    name: 'login',
    meta: {
      title: '????ng nh???p',
      layout: AuthLayout,
      isDesktopOnly: true, // N???u isDesktopOnly = true th?? s??? hi???n dialog b???t t???i app v???
    },
    component: LoginPage,
  },
  // Signup
  {
    path: '/auth/signup',
    name: 'signup',
    meta: {
      title: '????ng k??',
      layout: AuthLayout,
      isDesktopOnly: true, // N???u isDesktopOnly = true th?? s??? hi???n dialog b???t t???i app v???
    },
    component: RegisterPage,
  },
  // Forgot password
  {
    path: '/auth/forgot-password',
    name: 'forgot-password',
    meta: {
      title: 'Qu??n m???t kh???u',
      layout: AuthLayout,
      isDesktopOnly: true, // N???u isDesktopOnly = true th?? s??? hi???n dialog b???t t???i app v???
    },
    component: ForgotPasswordPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active', // active class for non-exact links.
  linkExactActiveClass: 'active', // active class for *exact* links.
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      store.dispatch(`${ACTIONS_AUTH.ROOT}/${ACTIONS_AUTH.SET_SCROLL_BEHAVIOR}`, {
        key: AppConstant.ROUTE_NAME.INVESTOR_DETAIL,
        value: savedPosition.top,
      });
    } else {
      const scrollStore = store.getters['auth/scrollBehavior'];
      if (
        scrollStore &&
        from.name === AppConstant.ROUTE_NAME.INVESTOR_DETAIL &&
        scrollStore.key === AppConstant.ROUTE_NAME.INVESTOR_DETAIL
      ) {
        const scrollBack = { top: scrollStore.value };
        store.dispatch(`${ACTIONS_AUTH.ROOT}/${ACTIONS_AUTH.SET_SCROLL_BEHAVIOR}`, {});
        return scrollBack;
      }
      return { top: 0 };
    }
  },
});
// Handle auth request
router.beforeEach((to, from, next) => {
  // N???u isDesktopOnly = true th?? s??? hi???n dialog b???t t???i app v???
  const mobileDetect = new MobileDetect(window.navigator.userAgent);
  if (mobileDetect.mobile() && to.meta && to.meta.isDesktopOnly) {
    store.dispatch(`${ACTIONS_AUTH.ROOT}/${ACTIONS_AUTH.SET_DIALOG_APP_VISIBLE}`, true);
  } else {
    store.dispatch(`${ACTIONS_AUTH.ROOT}/${ACTIONS_AUTH.SET_DIALOG_APP_VISIBLE}`, false);
  }
  // Auth
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const userId = store.getters['auth/userId'];
    if (userId) {
      next();
      return;
    }
    next({ name: 'login' });
  } else {
    next();
  }
});
export default router;
