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
      title: 'Trang chủ',
      breadcrumb: [{ text: 'Trang chủ', routeName: 'home' }],
      layout: HomeLayout,
      isDesktopOnly: true, // Nếu isDesktopOnly = true thì sẽ hiện dialog bắt tải app về
    },
    redirect: { name: 'group' },
    // component: HomePage,
  },
  // Nhóm
  {
    path: '/group',
    name: 'group',
    meta: {
      title: 'Nhóm',
      breadcrumb: [
        { text: 'Trang chủ', routeName: 'home' },
        { text: 'Nhóm', routeName: 'group' },
      ],
      layout: HomeLayout,
      isDesktopOnly: true, // Nếu isDesktopOnly = true thì sẽ hiện dialog bắt tải app về
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
        { text: 'Trang chủ', routeName: 'home' },
        { text: 'Khai thác khách hàng', routeName: 'lead' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // Nếu isDesktopOnly = true thì sẽ hiện dialog bắt tải app về
    },
    component: LeadHomePage,
  },
  {
    path: '/investor/:id',
    name: AppConstant.ROUTE_NAME.INVESTOR_DETAIL,
    meta: {
      title: 'Kênh gian hàng',
      breadcrumb: [
        { text: 'Trang chủ', routeName: 'home' },
        { text: 'Kênh gian hàng', routeName: AppConstant.ROUTE_NAME.INVESTOR_DETAIL },
        { text: 'Gian hàng của tôi', routeName: AppConstant.ROUTE_NAME.INVESTOR_DETAIL },
      ],
      layout: HomeLayout,
      isDesktopOnly: true, // Nếu isDesktopOnly = true thì sẽ hiện dialog bắt tải app về
    },
    component: InvestorDetailPage,
  },
  {
    path: '/group/search',
    name: 'group-search',
    meta: {
      title: 'Kết quả tìm kiếm',
      breadcrumb: [
        { text: 'Trang chủ', routeName: 'home' },
        { text: 'Nhóm', routeName: 'group' },
        { text: 'Kết quả tìm kiếm', routeName: 'group-search' },
      ],
      layout: HomeLayout,
      isDesktopOnly: true, // Nếu isDesktopOnly = true thì sẽ hiện dialog bắt tải app về
    },
    component: GroupSearchResultPage,
  },
  {
    path: '/group/suggest',
    name: 'group-suggest',
    meta: {
      title: 'Có thể bạn quan tâm',
      breadcrumb: [
        { text: 'Trang chủ', routeName: 'home' },
        { text: 'Nhóm', routeName: 'group' },
        { text: 'Có thể bạn quan tâm', routeName: 'group-suggest' },
      ],
      layout: HomeLayout,
      isDesktopOnly: true, // Nếu isDesktopOnly = true thì sẽ hiện dialog bắt tải app về
    },
    component: GroupSuggestPage,
  },
  {
    path: '/group/participated',
    name: 'group-participated',
    meta: {
      title: 'Nhóm đã tham gia',
      breadcrumb: [
        { text: 'Trang chủ', routeName: 'home' },
        { text: 'Nhóm', routeName: 'group' },
        { text: 'Nhóm đã tham gia', routeName: 'group-participated' },
      ],
      layout: HomeLayout,
      isDesktopOnly: true, // Nếu isDesktopOnly = true thì sẽ hiện dialog bắt tải app về
    },
    component: GroupParticipatedPage,
  },
  {
    path: '/group/manage',
    name: 'group-manage',
    meta: {
      title: 'Quản lý của tôi',
      breadcrumb: [
        { text: 'Trang chủ', routeName: 'home' },
        { text: 'Nhóm', routeName: 'group' },
        { text: 'Quản lý của tôi', routeName: 'group-manage' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // Nếu isDesktopOnly = true thì sẽ hiện dialog bắt tải app về
    },
    component: GroupManagePage,
  },
  {
    path: '/group/:id',
    name: 'group-detail',
    meta: {
      title: 'Chi tiết nhóm',
      breadcrumb: [
        { text: 'Trang chủ', routeName: 'home' },
        { text: 'Nhóm', routeName: 'group' },
        { text: 'Chi tiết nhóm', routeName: 'group-detail' },
      ],
      layout: HomeLayout,
      isDesktopOnly: true, // Nếu isDesktopOnly = true thì sẽ hiện dialog bắt tải app về
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
      title: 'Chi tiết khai thác',
      breadcrumb: [
        { text: 'Trang chủ', routeName: 'home' },
        { text: 'Khai thác', routeName: 'lead' },
        { text: 'Chi tiết khai thác', routeName: 'lead-detail' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // Nếu isDesktopOnly = true thì sẽ hiện dialog bắt tải app về
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
      title: 'Chi tiết khai thác',
      breadcrumb: [
        { text: 'Trang chủ', routeName: 'home' },
        { text: 'Khai thác', routeName: 'lead' },
        { text: 'Chi tiết khai thác', routeName: 'lead-update' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // Nếu isDesktopOnly = true thì sẽ hiện dialog bắt tải app về
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
      title: 'Danh sách lịch sử cuộc gọi',
      breadcrumb: [
        { text: 'Trang chủ', routeName: 'home' },
        { text: 'Khai thác', routeName: 'lead' },
        { text: 'Danh sách lịch sử cuộc gọi', routeName: 'lead-history-call' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // Nếu isDesktopOnly = true thì sẽ hiện dialog bắt tải app về
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
      title: 'Chi tiết bài viết',
      breadcrumb: [
        { text: 'Trang chủ', routeName: 'home' },
        { text: 'Bài viết', routeName: 'group-post' },
        { text: 'Chi tiết bài viết', routeName: 'group-post-detail' },
      ],
      layout: HomeLayout,
      isDesktopOnly: true, // Nếu isDesktopOnly = true thì sẽ hiện dialog bắt tải app về
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
      title: 'Khám phá',
      breadcrumb: [
        { text: 'Trang chủ', routeName: 'home' },
        { text: 'Nhóm', routeName: 'group' },
        { text: 'Khám phá', routeName: 'group-discover' },
      ],
      layout: HomeLayout,
      isDesktopOnly: true, // Nếu isDesktopOnly = true thì sẽ hiện dialog bắt tải app về
    },
    component: GroupDiscoverPage,
  },
  // User profile
  {
    path: '/profile',
    name: 'profile',
    meta: {
      title: 'Thông tin cá nhân',
      breadcrumb: [
        { text: 'Trang chủ', routeName: 'home' },
        { text: 'Thông tin cá nhân', routeName: 'profile' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: false, // Nếu isDesktopOnly = true thì sẽ hiện dialog bắt tải app về
    },
    component: UserProfilePage,
  },
  {
    path: '/business-profile/:id',
    name: 'business-profile',
    meta: {
      title: 'Kênh gian hàng',
      breadcrumb: [
        { text: 'Trang chủ', routeName: 'home' },
        { text: 'Business profile', routeName: 'business-profile' },
      ],
      layout: HomeLayout,
      isDesktopOnly: false, // Nếu isDesktopOnly = true thì sẽ hiện dialog bắt tải app về
    },
    component: UserProfilePage,
  },
  // News public
  {
    path: '/news-public/:id',
    name: 'news-public',
    meta: {
      title: 'Tin tức',
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
        { text: 'Trang chủ', routeName: 'home' },
        { text: 'Propskill', routeName: 'propskill' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // Nếu isDesktopOnly = true thì sẽ hiện dialog bắt tải app về
    },
    component: PropskillHomePage,
  },
  {
    path: '/propskill/search/',
    name: 'propskill-search',
    meta: {
      title: 'Tìm kiếm',
      breadcrumb: [
        { text: 'Trang chủ', routeName: 'home' },
        { text: 'Propskill', routeName: 'propskill' },
        { text: 'Tìm kiếm', routeName: 'propskill-search' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // Nếu isDesktopOnly = true thì sẽ hiện dialog bắt tải app về
    },
    component: PropskillSearchResultPage,
  },
  {
    path: '/propskill/category',
    name: 'propskill-category',
    meta: {
      title: 'Danh sách danh mục',
      breadcrumb: [
        { text: 'Trang chủ', routeName: 'home' },
        { text: 'Propskill', routeName: 'propskill' },
        { text: 'Danh sách danh mục', routeName: 'propskill-category' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // Nếu isDesktopOnly = true thì sẽ hiện dialog bắt tải app về
    },
    component: PropskillListCategoryPage,
  },
  {
    path: '/propskill/list',
    name: 'propskill-list',
    meta: {
      title: 'Danh sách',
      breadcrumb: [
        { text: 'Trang chủ', routeName: 'home' },
        { text: 'Propskill', routeName: 'propskill' },
        { text: 'Danh sách khóa học', routeName: 'propskill-list' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // Nếu isDesktopOnly = true thì sẽ hiện dialog bắt tải app về
    },
    component: PropskillListPage,
  },
  {
    path: '/propskill/detail-course/:id',
    name: 'propskill-detail-course',
    meta: {
      title: 'Chi tiết khóa học',
      breadcrumb: [
        { text: 'Trang chủ', routeName: 'home' },
        { text: 'Propskill', routeName: 'propskill' },
        { text: 'Chi tiết khóa học', routeName: 'propskill-detail-course' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // Nếu isDesktopOnly = true thì sẽ hiện dialog bắt tải app về
    },
    component: PropskillDetailCoursePage,
  },
  {
    path: '/propskill/detail-instructor/:id',
    name: 'propskill-detail-instructor',
    meta: {
      title: 'Chi tiết diễn giả',
      breadcrumb: [
        { text: 'Trang chủ', routeName: 'home' },
        { text: 'Propskill', routeName: 'propskill' },
        { text: 'Chi tiết diễn giả', routeName: 'propskill-detail-instructor' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // Nếu isDesktopOnly = true thì sẽ hiện dialog bắt tải app về
    },
    component: PropskillDetailInstructorPage,
  },
  {
    path: '/propskill/history',
    name: 'propskill-history',
    meta: {
      title: 'Hồ sơ bài học',
      breadcrumb: [
        { text: 'Trang chủ', routeName: 'home' },
        { text: 'Propskill', routeName: 'propskill' },
        { text: 'Hồ sơ bài học', routeName: 'propskill-history' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // Nếu isDesktopOnly = true thì sẽ hiện dialog bắt tải app về
    },
    component: PropskillHistoryStudyPage,
  },
  {
    path: '/propskill/progess-lesson/:id',
    name: 'propskill-progess-lesson',
    meta: {
      title: 'Tiến trình bài học',
      breadcrumb: [
        { text: 'Trang chủ', routeName: 'home' },
        { text: 'Propskill', routeName: 'propskill' },
        { text: 'Tiến trình bài học', routeName: 'propskill-progess-lesson' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // Nếu isDesktopOnly = true thì sẽ hiện dialog bắt tải app về
    },
    component: PropskillProgessLessonPage,
  },
  {
    path: '/propskill/progess-topic/:id',
    name: 'propskill-progess-topic',
    meta: {
      title: 'Tiến trình bài học',
      breadcrumb: [
        { text: 'Trang chủ', routeName: 'home' },
        { text: 'Propskill', routeName: 'propskill' },
        { text: 'Tiến trình chủ đề', routeName: 'propskill-progess-topic' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // Nếu isDesktopOnly = true thì sẽ hiện dialog bắt tải app về
    },
    component: PropskillProgessTopicPage,
  },
  {
    path: '/propskill/detail-category/:id',
    name: 'propskill-detail-category',
    meta: {
      title: 'Chi tiết danh mục',
      breadcrumb: [
        { text: 'Trang chủ', routeName: 'home' },
        { text: 'Propskill', routeName: 'propskill' },
        { text: 'Chi tiết danh mục', routeName: 'propskill-detail-category' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // Nếu isDesktopOnly = true thì sẽ hiện dialog bắt tải app về
    },
    component: PropskillDetailCategoryPage,
  },
  {
    path: '/propskill/favorite-intructor',
    name: 'propskill-favorite-intructor',
    meta: {
      title: 'Diễn giả quan tâm',
      breadcrumb: [
        { text: 'Trang chủ', routeName: 'home' },
        { text: 'Propskill', routeName: 'propskill' },
        { text: 'Diễn giả quan tâm', routeName: 'propskill-favorite-intructor' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // Nếu isDesktopOnly = true thì sẽ hiện dialog bắt tải app về
    },
    component: PropskillSpeakerFavoritePage,
  },
  {
    path: '/propskill/favorite-course',
    name: 'propskill-favorite-course',
    meta: {
      title: 'Khóa học quan tâm',
      breadcrumb: [
        { text: 'Trang chủ', routeName: 'home' },
        { text: 'Propskill', routeName: 'propskill' },
        { text: 'Khóa học quan tâm', routeName: 'propskill-favorite-course' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // Nếu isDesktopOnly = true thì sẽ hiện dialog bắt tải app về
    },
    component: PropskillCourseFavoritePage,
  },
  {
    path: '/propskill/course-in-progress',
    name: 'propskill-course-in-progress',
    meta: {
      title: 'Khóa học đang học',
      breadcrumb: [
        { text: 'Trang chủ', routeName: 'home' },
        { text: 'Propskill', routeName: 'propskill' },
        { text: 'Khóa học đang học', routeName: 'propskill-course-in-progress' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // Nếu isDesktopOnly = true thì sẽ hiện dialog bắt tải app về
    },
    component: PropskillCourseInProgressPage,
  },
  {
    path: '/propskill/course-completed',
    name: 'propskill-course-completed',
    meta: {
      title: 'Khóa học đã hoàn thành',
      breadcrumb: [
        { text: 'Trang chủ', routeName: 'home' },
        { text: 'Propskill', routeName: 'propskill' },
        { text: 'Khóa học đã hoàn thành', routeName: 'propskill-course-completed' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // Nếu isDesktopOnly = true thì sẽ hiện dialog bắt tải app về
    },
    component: PropskillCourseCompletedPage,
  },
  {
    path: '/propskill/rank-total',
    name: 'propskill-rank-total',
    meta: {
      title: 'Bảng xếp hạng tổng',
      breadcrumb: [
        { text: 'Trang chủ', routeName: 'home' },
        { text: 'Propskill', routeName: 'propskill' },
        { text: 'Bảng xếp hạng tổng', routeName: 'propskill-rank-total' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // Nếu isDesktopOnly = true thì sẽ hiện dialog bắt tải app về
    },
    component: PropskillRankTotalPage,
  },
  {
    path: '/propskill/do-exam/:id',
    name: 'propskill-do-exam',
    meta: {
      title: 'Làm bài thi',
      breadcrumb: [
        { text: 'Trang chủ', routeName: 'home' },
        { text: 'Propskill', routeName: 'propskill' },
        { text: 'Làm bài thi', routeName: 'propskill-do-exam' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // Nếu isDesktopOnly = true thì sẽ hiện dialog bắt tải app về
    },
    component: PropskillDoExamPage,
  },
  {
    path: '/propskill/do-home-work/:id',
    name: 'propskill-do-home-work',
    meta: {
      title: 'Làm bài tập',
      breadcrumb: [
        { text: 'Trang chủ', routeName: 'home' },
        { text: 'Propskill', routeName: 'propskill' },
        { text: 'Làm bài tập', routeName: 'propskill-do-home-work' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // Nếu isDesktopOnly = true thì sẽ hiện dialog bắt tải app về
    },
    component: PropskillDoHomeworkPage,
  },
  {
    path: '/propskill/course-instructor/:id',
    name: 'propskill-course-instructor',
    meta: {
      title: 'Chọn khóa học',
      breadcrumb: [
        { text: 'Trang chủ', routeName: 'home' },
        { text: 'Propskill', routeName: 'propskill' },
        { text: 'Chọn khóa học', routeName: 'propskill-course-instructor' },
      ],
      layout: HomeLayout,
      requiresAuth: true,
      isDesktopOnly: true, // Nếu isDesktopOnly = true thì sẽ hiện dialog bắt tải app về
    },
    component: PropskillCourseSpeakerPage,
  },
  // Login
  {
    path: '/auth/login',
    name: 'login',
    meta: {
      title: 'Đăng nhập',
      layout: AuthLayout,
      isDesktopOnly: true, // Nếu isDesktopOnly = true thì sẽ hiện dialog bắt tải app về
    },
    component: LoginPage,
  },
  // Signup
  {
    path: '/auth/signup',
    name: 'signup',
    meta: {
      title: 'Đăng ký',
      layout: AuthLayout,
      isDesktopOnly: true, // Nếu isDesktopOnly = true thì sẽ hiện dialog bắt tải app về
    },
    component: RegisterPage,
  },
  // Forgot password
  {
    path: '/auth/forgot-password',
    name: 'forgot-password',
    meta: {
      title: 'Quên mật khẩu',
      layout: AuthLayout,
      isDesktopOnly: true, // Nếu isDesktopOnly = true thì sẽ hiện dialog bắt tải app về
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
  // Nếu isDesktopOnly = true thì sẽ hiện dialog bắt tải app về
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
