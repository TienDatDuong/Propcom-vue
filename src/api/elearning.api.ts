import { AppConstant } from '@/app.constant';
import { ApiRequestPaging } from '@/models/api-request';
import { BannerPositionEnum } from '@/services/shared/enum';
import Axios, { AxiosResponse } from 'axios';

export class ElearningApiClient {
  static findCourse = async (params: ApiRequestPaging) => {
    return await Axios.get(`${AppConstant.ROOT_URL_ELEARNING}/auth/course`, { params });
  };

  static findCourseWithCategory = async (params: ApiRequestPaging) => {
    return await Axios.get(`${AppConstant.ROOT_URL_ELEARNING}/auth/course/category`, { params });
  };

  static getDetailCourse = async (id: string) => {
    return await Axios.get(`${AppConstant.ROOT_URL_ELEARNING}/auth/course/${id}`);
  };

  static findCategory = async (params: ApiRequestPaging) => {
    return await Axios.get(`${AppConstant.ROOT_URL_ELEARNING}/auth/category`, { params });
  };

  static findInstructor = async (params: ApiRequestPaging) => {
    return await Axios.get(`${AppConstant.ROOT_URL_ELEARNING}/auth/instructor`, { params });
  };

  static findListUserLearn = async (id: string, params: ApiRequestPaging) => {
    return await Axios.get(`${AppConstant.ROOT_URL_ELEARNING}/auth/instructor/listUserLearn/${id}`, { params });
  };

  static getDetailInstructor = async (id: string) => {
    return await Axios.get(`${AppConstant.ROOT_URL_ELEARNING}/auth/instructor/${id}`);
  };

  static getHistorySutdy = async () => {
    return await Axios.get(`${AppConstant.ROOT_URL_ELEARNING}/auth/userLesson/current`);
  };

  static findLessonNotPassExam = async (params: ApiRequestPaging) => {
    return await Axios.get(`${AppConstant.ROOT_URL_ELEARNING}/auth/userLesson/findLessonNotPassExamination`, {
      params,
    });
  };

  static getBannerPropskill = async () => {
    return await Axios.get(`${AppConstant.ROOT_URL_EMPLOYEE_QUERY}/mobile-auth/campaign/banner-promotions/current/v2`, {
      params: { displayPosition: BannerPositionEnum.PROPSKILL },
    });
  };

  static favoriteCourse = async (courseId: string) => {
    return await Axios.post(`${AppConstant.ROOT_URL_ELEARNING}/auth/favorite-course/toggle-fav`, {
      courseId,
    });
  };

  static favoriteInstructor = async (instructorId: string, isFavorite: boolean) => {
    return await Axios.post(`${AppConstant.ROOT_URL_ELEARNING}/auth/favorite-instructor/toggle-fav`, {
      instructorId,
      isFavorite,
    });
  };

  static registerCourse = async (model: any) => {
    return await Axios.post(`${AppConstant.ROOT_URL_ELEARNING}/auth/register-course/register`, model);
  };

  static rankTopPropskill = async (params: ApiRequestPaging) => {
    return await Axios.get(`${AppConstant.ROOT_URL_ELEARNING}/auth/userLearning`, { params });
  };

  static rankUserPropskill = async (params: ApiRequestPaging) => {
    return await Axios.get(`${AppConstant.ROOT_URL_ELEARNING}/auth/userLearning/myPosition`, { params });
  };

  static getListTopic = async (id: string) => {
    return await Axios.get(`${AppConstant.ROOT_URL_ELEARNING}/auth/topic/${id}`);
  };

  static getListLessons = async (id: string) => {
    return await Axios.get(`${AppConstant.ROOT_URL_ELEARNING}/auth/lesson/${id}`);
  };

  static finishTopic = async (model: any) => {
    return await Axios.put(`${AppConstant.ROOT_URL_ELEARNING}/auth/userLesson/finishTopic`, model);
  };

  static finishLesson = async (model: any) => {
    return await Axios.put(`${AppConstant.ROOT_URL_ELEARNING}/auth/userLesson/finishLesson`, model);
  };

  static getListLesson = async (id: string) => {
    return await Axios.get(`${AppConstant.ROOT_URL_ELEARNING}/auth/lesson/${id}`);
  };

  static getDetailLesson = async (id: string) => {
    return await Axios.get(`${AppConstant.ROOT_URL_ELEARNING}/auth/lesson/findById/${id}`);
  };

  static getListQuestion = async (id: string) => {
    return await Axios.get(`${AppConstant.ROOT_URL_ELEARNING}/auth/question/${id}`);
  };

  static getNextLesson = async (id: string, params: any) => {
    return await Axios.get(`${AppConstant.ROOT_URL_ELEARNING}/auth/lesson/${id}/nextLessonId`, { params });
  };

  static getUserLesson = async (id: string) => {
    return await Axios.get(`${AppConstant.ROOT_URL_ELEARNING}/auth/userLesson/userLesson/${id}`);
  };

  static getCategoryById = async (id: string) => {
    return await Axios.get(`${AppConstant.ROOT_URL_ELEARNING}/auth/category/${id}`);
  };

  static listUserLearn = async (id: string, params: any) => {
    return await Axios.get(`${AppConstant.ROOT_URL_ELEARNING}/auth/instructor/listUserLearn/${id}`, { params });
  };
}
