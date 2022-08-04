import { ApiRequestPaging } from '@/models/api-request';
import { ApiResponse, ApiResponsePaging } from '@/models/api-response';
import { BannerPropskillModel, RegisterCourseModel } from './elearning.model';
import { ElearningApiClient } from '@/api/elearning.api';
import { StsApiClient } from '@/api/sts.api';
import { isArray, isEmpty } from 'lodash';
import {
  CourseModel,
  LessonModel,
  TopicModel,
  QuestionModel,
  InstructorModel,
  HistoryStudyModel,
  CategoryModel,
  UserLessonModel,
} from './elearning.model';
/**
 * Lấy danh sách khóa học theo page
 * @returns
 */
export const findCourse = async (params: ApiRequestPaging): Promise<any> => {
  const queryParams = {
    ...params,
  };
  const res = await ElearningApiClient.findCourse(queryParams);
  if (!res || !res.data) {
    return null;
  }
  if (isArray(res.data)) {
    return res.data.map((item) => new CourseModel(item));
  }
  const rows = res.data.rows.map((item: any) => new CourseModel(item));
  return new ApiResponsePaging<CourseModel>({
    rows: rows,
    page: res.data.page,
    pageSize: res.data.pageSize,
    total: res.data.total,
    totalPages: res.data.totalPages,
  });
};

/**
 * Lấy danh sách khóa học theo page
 * @returns
 */
export const findAllCourse = async (params: any): Promise<any> => {
  delete params.page;
  delete params.pageSize;
  const queryParams = {
    ...params,
  };
  const res = await ElearningApiClient.findCourse(queryParams);
  return new ApiResponse({
    isSuccess: true,
    result: res.data,
  });
};

/**
 * Lấy danh sách khóa học theo danh mục
 * @returns
 */
export const findCourseWithCategory = async (
  params: ApiRequestPaging
): Promise<ApiResponsePaging<CourseModel> | null> => {
  const queryParams = {
    ...params,
  };
  const res = await ElearningApiClient.findCourseWithCategory(queryParams);
  if (!res || !res.data) {
    return null;
  }
  const rows = res.data.rows.map((item: any) => new CourseModel(item));
  return new ApiResponsePaging<CourseModel>({
    rows: rows,
    page: res.data.page,
    pageSize: res.data.pageSize,
    total: res.data.total,
    totalPages: res.data.totalPages,
  });
};

/**
 * Lấy chi tiết khóa học
 * @returns
 */
export const getDetailCourse = async (id: string): Promise<ApiResponse<CourseModel> | null> => {
  const res = await ElearningApiClient.getDetailCourse(id);
  if (!res || !res.data) {
    return null;
  }
  return new ApiResponse({
    isSuccess: true,
    result: new CourseModel(res.data),
  });
};

/**
 * Lấy danh sách danh mục
 * @returns
 */
export const findCategory = async (params: ApiRequestPaging): Promise<ApiResponsePaging<CategoryModel> | null> => {
  const queryParams = {
    ...params,
  };
  const res = await ElearningApiClient.findCategory(queryParams);
  if (!res || !res.data) {
    return null;
  }
  const rows = res.data.rows.map((item: any) => new CategoryModel(item));
  return new ApiResponsePaging<CategoryModel>({
    rows: rows,
    page: res.data.page,
    pageSize: res.data.pageSize,
    total: res.data.total,
    totalPages: res.data.totalPages,
  });
};

/**
 * Lấy danh sách diễn giả
 * @returns
 */
export const findInstructor = async (
  params: ApiRequestPaging
): Promise<ApiResponsePaging<InstructorModel> | null | any> => {
  const queryParams = {
    ...params,
  };
  const res = await ElearningApiClient.findInstructor(queryParams);
  if (!res || !res.data) {
    return null;
  }
  const rows = res.data.rows.map((item: any) => new InstructorModel(item));
  return new ApiResponsePaging<InstructorModel>({
    rows: rows,
    page: res.data.page,
    pageSize: res.data.pageSize,
    total: res.data.total,
    totalPages: res.data.totalPages,
  });
};

/**
 * Lấy danh sách người học diễn giả
 * @returns
 */
export const findListUserLearn = async (
  id: string,
  params: ApiRequestPaging
): Promise<ApiResponsePaging<InstructorModel> | null> => {
  const queryParams = {
    ...params,
  };
  const res = await ElearningApiClient.findListUserLearn(id, queryParams);
  if (!res || !res.data) {
    return null;
  }
  const rows = res.data.rows.map((item: any) => new InstructorModel(item));
  return new ApiResponsePaging<InstructorModel>({
    rows: rows,
    page: res.data.page,
    pageSize: res.data.pageSize,
    total: res.data.total,
    totalPages: res.data.totalPages,
  });
};

/**
 * Xem chi tiết diễn giả
 * @returns
 */
export const getDetailInstructor = async (id: string): Promise<ApiResponse<InstructorModel> | null> => {
  const res = await ElearningApiClient.getDetailInstructor(id);
  if (!res || !res.data) {
    return null;
  }
  return new ApiResponse({
    isSuccess: true,
    result: new InstructorModel(res.data),
  });
};

/**
 * Lấy hồ sơ bài học
 * @returns
 */
export const getHistorySutdy = async (): Promise<ApiResponse<HistoryStudyModel> | null> => {
  const res = await ElearningApiClient.getHistorySutdy();
  if (!res || !res.data) {
    return null;
  }
  return new ApiResponse({
    isSuccess: true,
    result: new HistoryStudyModel(res.data),
  });
};

/**
 * Lấy danh sách bài học chưa làm bài thi
 * @returns
 */
export const findLessonNotPassExam = async (
  params: ApiRequestPaging
): Promise<ApiResponsePaging<UserLessonModel> | null> => {
  const queryParams = {
    ...params,
  };
  const res = await ElearningApiClient.findLessonNotPassExam(queryParams);
  if (!res || !res.data) {
    return null;
  }
  const rows = res.data.rows.map((item: any) => new UserLessonModel(item));
  return new ApiResponsePaging<UserLessonModel>({
    rows: rows,
    page: res.data.page,
    pageSize: res.data.pageSize,
    total: res.data.total,
    totalPages: res.data.totalPages,
  });
};

/**
 * Lấy banner Propskill
 * @returns
 */
export const getBannerPropskill = async (): Promise<ApiResponse<BannerPropskillModel[]>> => {
  const res = await ElearningApiClient.getBannerPropskill();
  return new ApiResponse({
    isSuccess: true,
    result: isArray(res.data) ? res.data.map((doc) => new BannerPropskillModel(doc)) : res.data,
  });
};

/**
 * Yêu thích khóa học
 * @returns
 */
export const favoriteCourse = async (id: string): Promise<ApiResponse<any> | null> => {
  const res = await ElearningApiClient.favoriteCourse(id);
  if (!res || !res.data) {
    return null;
  }
  return new ApiResponse({
    isSuccess: true,
    result: res.data,
  });
};

/**
 * Yêu thích diễn giả
 * @returns
 */
export const favoriteInstructor = async (id: string, isFavorite: boolean): Promise<ApiResponse<any> | null> => {
  const res = await ElearningApiClient.favoriteInstructor(id, isFavorite);
  if (!res || !res.data) {
    return null;
  }
  return new ApiResponse({
    isSuccess: true,
    result: res.data,
  });
};

/**
 * Đang ký khóa học
 * @returns
 */
export const registerCourse = async (model: RegisterCourseModel): Promise<ApiResponse<any> | null> => {
  const res = await ElearningApiClient.registerCourse(model);
  if (!res || !res.data) {
    return null;
  }
  return new ApiResponse({
    isSuccess: true,
    result: res.data,
  });
};

/**
 * Lấy bảng xếp hạng
 * @returns
 */
export const rankTopPropskill = async (params: ApiRequestPaging): Promise<ApiResponse<any> | null> => {
  const queryParams = {
    ...params,
  };
  const res = await ElearningApiClient.rankTopPropskill(queryParams);
  if (!res || !res.data) {
    return null;
  }
  return new ApiResponse({
    isSuccess: true,
    result: res.data,
  });
};

/**
 * Lấy xếp hạng của user
 * @returns
 */
export const rankUserPropskill = async (params: ApiRequestPaging): Promise<ApiResponse<any> | null> => {
  const queryParams = {
    ...params,
  };
  const res = await ElearningApiClient.rankUserPropskill(queryParams);
  if (!res || !res.data) {
    return null;
  }
  return new ApiResponse({
    isSuccess: true,
    result: res.data,
  });
};

/**
 * Lấy danh sách chủ đề
 * @returns
 */
export const getListTopic = async (id: string): Promise<ApiResponse<any> | null> => {
  const res = await ElearningApiClient.getListTopic(id);
  if (!res || !res.data) {
    return null;
  }
  return new ApiResponse({
    isSuccess: true,
    result: res.data,
  });
};

/**
 * Lấy danh sách bài học
 * @returns
 */
export const getListLessons = async (courseId: string): Promise<ApiResponse<any> | null> => {
  const res = await ElearningApiClient.getListLessons(courseId);
  if (!res || !res.data) {
    return null;
  }
  return new ApiResponse({
    isSuccess: true,
    result: res.data,
  });
};

/**
 * Hoàn thành chủ đề
 * @returns
 */
export const finishTopic = async (model: any): Promise<ApiResponse<any> | null> => {
  const res = await ElearningApiClient.finishTopic(model);
  if (!res || !res.data) {
    return null;
  }
  return new ApiResponse({
    isSuccess: true,
    result: res.data,
  });
};

/**
 * Hoàn thành bài học
 * @returns
 */
export const finishLesson = async (model: any): Promise<ApiResponse<any> | null> => {
  const res = await ElearningApiClient.finishLesson(model);
  if (!res || !res.data) {
    return null;
  }
  return new ApiResponse({
    isSuccess: true,
    result: res.data,
  });
};

/**
 * Lấy danh sách bài học
 * @returns
 */
export const getListLesson = async (id: string): Promise<ApiResponse<any> | null> => {
  const res = await ElearningApiClient.getListLesson(id);
  if (!res || !res.data) {
    return null;
  }
  return new ApiResponse({
    isSuccess: true,
    result: res.data,
  });
};

/**
 * Lấy chi tiết bài học
 * @returns
 */
export const getDetailLesson = async (id: string): Promise<ApiResponse<any> | null> => {
  const res = await ElearningApiClient.getDetailLesson(id);
  if (!res || !res.data) {
    return null;
  }
  return new ApiResponse({
    isSuccess: true,
    result: res.data,
  });
};

/**
 * Lấy danh sách câu hỏi
 * @returns
 */
export const getListQuestion = async (id: string): Promise<ApiResponse<any> | null> => {
  const res = await ElearningApiClient.getListQuestion(id);
  if (!res || !res.data) {
    return null;
  }
  return new ApiResponse({
    isSuccess: true,
    result: res.data,
  });
};

/**
 * Bài học tiếp theo
 * @returns
 */
export const getNextLesson = async (id: string, params: any): Promise<ApiResponse<any> | null> => {
  const res = await ElearningApiClient.getNextLesson(id, params);
  if (!res || !res.data) {
    return null;
  }
  return new ApiResponse({
    isSuccess: true,
    result: res.data,
  });
};

/**
 * Lấy thông tin học bài học
 * @returns
 */
export const getUserLesson = async (id: string): Promise<ApiResponse<any> | null> => {
  const res = await ElearningApiClient.getUserLesson(id);
  if (!res || !res.data) {
    return null;
  }
  return new ApiResponse({
    isSuccess: true,
    result: res.data,
  });
};

/**
 * Xem chi tiết diễn giả
 * @returns
 */
export const getCategoryById = async (id: string): Promise<ApiResponse<any> | null> => {
  const res = await ElearningApiClient.getCategoryById(id);
  if (!res || !res.data) {
    return null;
  }
  return new ApiResponse({
    isSuccess: true,
    result: res.data,
  });
};

/**
 * Lấy danh sách người học
 * @returns
 */
export const listUserLearn = async (id: string, params: ApiRequestPaging): Promise<ApiResponsePaging<any> | null> => {
  const queryParams = {
    ...params,
  };
  const res = await ElearningApiClient.listUserLearn(id, queryParams);
  if (!res || !res.data) {
    return null;
  }
  return new ApiResponsePaging<any>({
    rows: res.data.rows,
    page: res.data.page,
    pageSize: res.data.pageSize,
    total: res.data.total,
    totalPages: res.data.totalPages,
  });
};

/**
 * Lấy thông tin người dùng
 * @returns
 */
export const findUserDetail = async (id: string): Promise<ApiResponsePaging<any> | null> => {
  const res = await StsApiClient.findUserDetail(id);
  if (!res || !res.data) {
    return null;
  }
  return res.data;
};
