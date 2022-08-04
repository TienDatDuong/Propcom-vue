import { UploaderApiClient } from '@/api/uploader.api';
import { ApiRequestPaging } from '@/models/api-request';
import { ApiResponse, ApiResponsePaging } from '@/models/api-response';
import {
  GroupMemberModel,
  GroupMemberRequestStatusEnum,
  GroupModel,
  GroupPostModel,
  GroupCommentModel,
  PostStatusEnum,
  CreateGroupPostModel,
  UpdateGroupPostModel,
  OnOffCommentGroupPostModel,
} from './group.model';
import { SocialApiClient } from '@/api/social.api';
import { isEmpty } from 'lodash';
import { youtubeParser } from '@/services/shared/utils';

/**
 * Lấy danh sách nhóm của user hiện tại
 * @returns
 */
export const findGroupByCurrentEmployee = async (
  params: ApiRequestPaging
): Promise<ApiResponsePaging<GroupModel> | null> => {
  const queryParams = {
    ...params,
    hasJoin: true, // là admin hoặc member
  };
  const res = await SocialApiClient.findGroup(queryParams);
  if (!res || !res.data) {
    return null;
  }
  const rows = res.data.rows.map((item: any) => new GroupModel(item));
  return new ApiResponsePaging<GroupModel>({
    rows: rows,
    page: res.data.page,
    pageSize: res.data.pageSize,
    total: res.data.total,
    totalPages: res.data.totalPages,
  });
};

/**
 * Lấy danh sách nhóm đề xuất của user hiện tại
 * @returns
 */
export const findGroupSuggestByCurrentEmployee = async (
  params: ApiRequestPaging
): Promise<ApiResponsePaging<GroupModel> | null> => {
  const res = await SocialApiClient.findGroupSuggestByCurrentEmployee(params);
  if (!res || !res.data) {
    return null;
  }
  const rows = res.data.rows.map((item: any) => new GroupModel(item));
  return new ApiResponsePaging<GroupModel>({
    rows: rows,
    page: res.data.page,
    pageSize: res.data.pageSize,
    total: res.data.total,
    totalPages: res.data.totalPages,
  });
};

/**
 * Lấy danh sách nhóm đề xuất không cần login TK
 * @returns
 */
export const findGroupSuggestByCurrentEmployeeNotLogin = async (
  params: ApiRequestPaging
): Promise<ApiResponsePaging<GroupModel> | null> => {
  const res = await SocialApiClient.findGroupSuggestByCurrentEmployeeNotLogin(params);
  if (!res || !res.data) {
    return null;
  }
  const rows = res.data.rows.map((item: any) => new GroupModel(item));
  return new ApiResponsePaging<GroupModel>({
    rows: rows,
    page: res.data.page,
    pageSize: res.data.pageSize,
    total: res.data.total,
    totalPages: res.data.totalPages,
  });
};

/**
 * Lấy danh sách nhóm đang quản lý của user hiện tại
 * @returns
 */
export const findGroupManageByCurrentEmployee = async (
  params: ApiRequestPaging
): Promise<ApiResponsePaging<GroupModel> | null> => {
  const queryParams = {
    ...params,
    isAdmin: true, // là admin
  };
  const res = await SocialApiClient.findGroup(queryParams);
  if (!res || !res.data) {
    return null;
  }
  const rows = res.data.rows.map((item: any) => new GroupModel(item));
  return new ApiResponsePaging<GroupModel>({
    rows: rows,
    page: res.data.page,
    pageSize: res.data.pageSize,
    total: res.data.total,
    totalPages: res.data.totalPages,
  });
};

/**
 * Lấy danh sách bài đăng public
 * @returns
 */
export const findGroupPostPublic = async (
  params: ApiRequestPaging
): Promise<ApiResponsePaging<GroupPostModel> | null> => {
  const res = await SocialApiClient.findGroupPostPublic(params);
  if (!res || !res.data) {
    return null;
  }
  const rows = res.data.rows.map((item: any) => new GroupPostModel(item));
  return new ApiResponsePaging<GroupPostModel>({
    rows: rows,
    page: res.data.page,
    pageSize: res.data.pageSize,
    total: res.data.total,
    totalPages: res.data.totalPages,
  });
};

/**
 * Lấy danh sách bài đăng ở trang home của user hiện tại
 * @returns
 */
export const findGroupPostByCurrentEmployee = async (
  params: ApiRequestPaging
): Promise<ApiResponsePaging<GroupPostModel> | null> => {
  const res = await SocialApiClient.findGroupPostByCurrentEmployee(params);
  if (!res || !res.data) {
    return null;
  }
  const rows = res.data.rows.map((item: any) => new GroupPostModel(item));
  return new ApiResponsePaging<GroupPostModel>({
    rows: rows,
    page: res.data.page,
    pageSize: res.data.pageSize,
    total: res.data.total,
    totalPages: res.data.totalPages,
  });
};

/**
 * Lấy danh sách bài đăng theo nhóm
 * @returns
 */
export const findGroupPostByGroup = async (
  groupId: string,
  params: ApiRequestPaging
): Promise<ApiResponsePaging<GroupPostModel> | null> => {
  const queryParams = {
    ...params,
    groupId: groupId,
  };
  const res = await SocialApiClient.findGroupPostByGroup(queryParams);
  if (!res || !res.data) {
    return null;
  }
  const rows = res.data.rows.map((item: any) => new GroupPostModel(item));
  return new ApiResponsePaging<GroupPostModel>({
    rows: rows,
    page: res.data.page,
    pageSize: res.data.pageSize,
    total: res.data.total,
    totalPages: res.data.totalPages,
  });
};

/**
 * Lấy danh sách bài đăng theo nhóm public
 * @returns
 */
export const findGroupPostByGroupPublic = async (
  groupId: string,
  params: ApiRequestPaging
): Promise<ApiResponsePaging<GroupPostModel> | null> => {
  const queryParams = {
    ...params,
    groupId: groupId,
  };
  const res = await SocialApiClient.findGroupPostByGroupPublic(queryParams);
  if (!res || !res.data) {
    return null;
  }
  const rows = res.data.rows.map((item: any) => new GroupPostModel(item));
  return new ApiResponsePaging<GroupPostModel>({
    rows: rows,
    page: res.data.page,
    pageSize: res.data.pageSize,
    total: res.data.total,
    totalPages: res.data.totalPages,
  });
};

/**
 * Lấy chi tiết nhóm cần login
 * @returns
 */
export const findGroupById = async (id: string): Promise<ApiResponse<GroupModel | null>> => {
  const res = await SocialApiClient.findGroupById(id);
  if (!res || !res.data) {
    return new ApiResponse({
      isSuccess: false,
      result: null,
    });
  }
  return new ApiResponse({
    isSuccess: true,
    result: new GroupModel(res.data),
  });
};

/**
 * Check type group
 * @returns
 */
export const checkTypeGroupById = async (id: string): Promise<ApiResponse<any | null>> => {
  const res = await SocialApiClient.checkTypeGroupById(id);
  if (!res || !res.data) {
    return new ApiResponse({
      isSuccess: false,
      result: null,
    });
  }
  return new ApiResponse({
    isSuccess: true,
    result: res.data,
  });
};

/**
 * Check xem user đã tham gia nhóm hay chưa
 * @returns
 */
export const checkJoinGroup = async (id: string): Promise<ApiResponse<any | null>> => {
  const res = await SocialApiClient.checkJoinGroup(id);
  if (!res || !res.data) {
    return new ApiResponse({
      isSuccess: false,
      result: null,
    });
  }
  return new ApiResponse({
    isSuccess: true,
    result: res.data,
  });
};

/**
 * lấy danh sách bình chọn theo answerId
 * @returns
 */

export const findRespondentByAnswerId = async (
  id: string,
  params: ApiRequestPaging
): Promise<ApiResponsePaging<GroupMemberModel> | null> => {
  const res = await SocialApiClient.findRespondentByAnswerId(id, params);
  if (!res || !res.data) {
    return null;
  }
  const rows = res.data.rows.map((item: any) => {
    const newItem = new GroupMemberModel(item);
    return newItem;
  });
  return new ApiResponsePaging<GroupMemberModel>({
    rows: rows,
    page: res.data.page,
    pageSize: res.data.pageSize,
    total: res.data.total,
    totalPages: res.data.totalPages,
  });
};
// Lấy chi tiết nhóm không cần login
// @returns
//
export const findGroupByIdNotLogin = async (id: string): Promise<ApiResponse<GroupModel | null>> => {
  const res = await SocialApiClient.findGroupByIdNotLogin(id);
  if (!res || !res.data) {
    return new ApiResponse({
      isSuccess: false,
      result: null,
    });
  }
  return new ApiResponse({
    isSuccess: true,
    result: new GroupModel(res.data),
  });
};

/**
 * Lấy báo cáo theo nhóm
 * @returns
 */
export const findGroupReportById = async (id: string, params: ApiRequestPaging): Promise<ApiResponse<any | null>> => {
  const res = await SocialApiClient.findGroupReportById(id, params);
  if (!res || !res.data) {
    return new ApiResponse({
      isSuccess: false,
      result: null,
    });
  }
  return new ApiResponse({
    isSuccess: true,
    result: res.data,
  });
};

/**
 * Cập nhật thông tin nhóm
 * @returns
 */
export const updateGroupInformation = async (model: {
  id: string;
  name: string;
  description: string;
}): Promise<any> => {
  const requestModel = {
    id: model.id,
    name: model.name,
    description: model.description,
  };
  return await SocialApiClient.updateGroupInformation(requestModel);
};

/**
 * Tham gia nhóm
 * @returns
 */
export const joinGroup = async (id: string): Promise<any> => {
  return await SocialApiClient.joinGroup(id);
};

/**
 * Hủy tham gia nhóm
 * @returns
 */
export const cancleJoinGroup = async (id: string): Promise<any> => {
  return await SocialApiClient.cancleJoinGroup(id);
};

/**
 * Share nhóm
 * @returns
 */
export const shareGroup = async (id: string): Promise<any> => {
  return await SocialApiClient.shareGroup(id);
};

/**
 * Rời nhóm
 * @returns
 */
export const leaveGroup = async (id: string): Promise<any> => {
  return await SocialApiClient.leaveGroup(id);
};

/**
 * Follow/UnFollow nhóm
 * @returns
 */
export const toggleFollowGroup = async (id: string): Promise<any> => {
  return await SocialApiClient.toggleFollowGroup(id);
};

/**
 * Like/UnLike bài đăng
 * @returns
 */
export const toggleLikeGroupPost = async (id: string): Promise<any> => {
  return await SocialApiClient.toggleLikeGroupPost(id);
};

/**
 * Follow/UnFollow bài đăng
 * @returns
 */
export const toggleFollowGroupPost = async (id: string): Promise<any> => {
  return await SocialApiClient.toggleFollowGroupPost(id);
};

/**
 * Ghim/bỏ ghim bài viết
 * @returns
 */
export const togglePinnedGroupPost = async (id: string): Promise<any> => {
  return await SocialApiClient.togglePinnedGroupPost(id);
};

/**
 * Lấy danh sách thành viên theo nhóm
 * @returns
 */
export const findAllGroupMember = async (
  groupId: string,
  params: ApiRequestPaging
): Promise<ApiResponsePaging<GroupMemberModel> | null> => {
  const res = await SocialApiClient.findAllGroupMember(groupId, params);
  if (!res || !res.data) {
    return null;
  }
  const rows = res.data.rows.map((item: any) => new GroupMemberModel(item));
  return new ApiResponsePaging<GroupMemberModel>({
    rows: rows,
    page: res.data.page,
    pageSize: res.data.pageSize,
    total: res.data.total,
    totalPages: res.data.totalPages,
  });
};

/**
 * Lấy danh sách thành viên [Đang chờ duyệt] theo nhóm
 * @returns
 */
export const findAllWaitingGroupMember = async (
  groupId: string,
  params: ApiRequestPaging
): Promise<ApiResponsePaging<GroupMemberModel> | null> => {
  const res = await SocialApiClient.findAllWaitingGroupMember(groupId, params);
  if (!res || !res.data) {
    return null;
  }
  const rows = res.data.rows.map((item: any) => {
    const newItem = new GroupMemberModel(item);
    // Set status trong trường hợp API không trả về
    if (!newItem.requestStatus) {
      newItem.requestStatus = GroupMemberRequestStatusEnum.WAITING;
    }
    return newItem;
  });
  return new ApiResponsePaging<GroupMemberModel>({
    rows: rows,
    page: res.data.page,
    pageSize: res.data.pageSize,
    total: res.data.total,
    totalPages: res.data.totalPages,
  });
};

/**
 * Lấy danh sách thành viên [Đã bị từ chối] theo nhóm
 * @returns
 */
export const findAllRejectedGroupMember = async (
  groupId: string,
  params: ApiRequestPaging
): Promise<ApiResponsePaging<GroupMemberModel> | null> => {
  const res = await SocialApiClient.findAllRejectedGroupMember(groupId, params);
  if (!res || !res.data) {
    return null;
  }
  const rows = res.data.rows.map((item: any) => {
    const newItem = new GroupMemberModel(item);
    // Set status trong trường hợp API không trả về
    if (!newItem.requestStatus) {
      newItem.requestStatus = GroupMemberRequestStatusEnum.REJECT;
    }
    return newItem;
  });
  return new ApiResponsePaging<GroupMemberModel>({
    rows: rows,
    page: res.data.page,
    pageSize: res.data.pageSize,
    total: res.data.total,
    totalPages: res.data.totalPages,
  });
};

/**
 * Lấy danh sách thành viên [Chưa thuộc nhóm] theo nhóm
 * @returns
 */
export const findAllNotInGroupMember = async (
  groupId: string,
  params: ApiRequestPaging
): Promise<ApiResponsePaging<GroupMemberModel> | null> => {
  const res = await SocialApiClient.findAllNotInGroupMember(groupId, params);
  if (!res || !res.data) {
    return null;
  }
  const rows = res.data.rows.map((item: any) => {
    const newItem = new GroupMemberModel(item);
    // // Set status trong trường hợp API không trả về
    // if (!newItem.requestStatus) {
    //   newItem.requestStatus = GroupMemberRequestStatusEnum.REJECT;
    // }
    return newItem;
  });
  return new ApiResponsePaging<GroupMemberModel>({
    rows: rows,
    page: res.data.page,
    pageSize: res.data.pageSize,
    total: res.data.total,
    totalPages: res.data.totalPages,
  });
};

/**
 * Trưởng nhóm duyệt thành viên
 * @param groupId
 * @param id
 * @returns
 */
export const approveGroupMember = async (model: { groupId: string; id: string }): Promise<ApiResponse<any> | null> => {
  const requestModel = {
    groupId: model.groupId,
    id: model.id,
  };
  const res = await SocialApiClient.approveGroupMember(requestModel);
  return new ApiResponse({
    isSuccess: true,
    result: res.data,
  });
};

/**
 * Trưởng nhóm từ chối duyệt thành viên
 * @param groupId
 * @param id
 * @returns
 */
export const rejectGroupMember = async (model: {
  groupId: string;
  id: string;
  reason: string;
}): Promise<ApiResponse<any> | null> => {
  const requestModel = {
    groupId: model.groupId,
    id: model.id,
    reasonReject: model.reason,
  };
  const res = await SocialApiClient.rejectGroupMember(requestModel);
  return new ApiResponse({
    isSuccess: true,
    result: res.data,
  });
};

/**
 * Trưởng nhóm xóa thành viên
 * @param groupId
 * @param id
 * @returns
 */
export const removeGroupMember = async (model: { groupId: string; id: string }): Promise<ApiResponse<any> | null> => {
  const requestModel = {
    id: model.groupId,
    userId: model.id,
  };
  const res = await SocialApiClient.removeGroupMember(requestModel);
  return new ApiResponse({
    isSuccess: true,
    result: res.data,
  });
};

/**
 * xóa lựa chọn khảo sát
 * @param questionId
 * @param postId
 * @param answerId
 * @returns
 */
export const removeOptionPoll = async (model: {
  postId: string;
  questionId: string;
  answerId: string;
}): Promise<ApiResponse<any> | null> => {
  const requestModel = {
    id: model.postId,
    questionId: model.questionId,
    answerId: model.answerId,
  };
  const res = await SocialApiClient.removeOptionPoll(requestModel);
  return new ApiResponse({
    isSuccess: true,
    result: res.data,
  });
};

/**
 * Trưởng nhóm thêm thành viên
 * @param groupId
 * @param id
 * @returns
 */
export const addGroupMember = async (model: { groupId: string; id: string }): Promise<ApiResponse<any> | null> => {
  const requestModel = {
    id: model.groupId,
    userId: model.id,
  };
  const res = await SocialApiClient.addGroupMember(requestModel);
  return new ApiResponse({
    isSuccess: true,
    result: res.data,
  });
};

/**
 * gỡ bài viết
 * @param id
 * @param action
 * @returns
 */
export const approveGroupPost = async (model: {
  id: string;
  action: PostStatusEnum;
  reasonReject?: string;
}): Promise<ApiResponse<any> | null> => {
  const requestModel = {
    id: model.id,
    action: model.action,
    reasonReject: model.reasonReject ?? null,
  };
  const res = await SocialApiClient.approveGroupPost(requestModel);
  return new ApiResponse({
    isSuccess: true,
    result: res.data,
  });
};
/**
 * Thêm khảo sát
 * @param id
 * @param questionId
 * @param answer
 * @returns
 */
export const addPollOption = async (model: {
  id: string;
  questionId: string;
  answer: string;
}): Promise<ApiResponse<any> | null> => {
  const requestModel = {
    id: model.id,
    questionId: model.questionId,
    answerName: model.answer,
  };
  const res = await SocialApiClient.addPollOption(requestModel);
  return new ApiResponse({
    isSuccess: true,
    result: res.data,
  });
};
/**
 * Thêm khảo sát bởi user
 * @param id
 * @param userId
 * @param questionId
 * @param answer
 * @returns
 */
export const addPollOptionByUser = async (model: {
  id: string;
  userId: string;
  questionId: string;
  answer: string;
}): Promise<ApiResponse<any> | null> => {
  const requestModel: any = {
    id: model.id,
    userId: model.userId,
    pollInfos: [
      {
        questionId: model.questionId,
        answer: { name: model.answer },
      },
    ],
  };
  const res = await SocialApiClient.submitPollOption(requestModel);
  return new ApiResponse({
    isSuccess: true,
    result: res.data,
  });
};
/**
 * chọn khảo sát
 * @param id
 * @param userId
 * @param questionId
 * @param answer
 * @returns
 */
export const submitPollOption = async (model: {
  id: string;
  userId: string;
  questionId: string;
  answerId: string;
}): Promise<ApiResponse<any> | null> => {
  const requestModel: any = {
    id: model.id,
    userId: model.userId,
    pollInfos: [
      {
        questionId: model.questionId,
        answerId: model.answerId,
      },
    ],
  };
  const res = await SocialApiClient.submitPollOption(requestModel);
  return new ApiResponse({
    isSuccess: true,
    result: res.data,
  });
};
/**
 * xóa bài viết
 * @param id
 * @returns
 */
export const removeGroupPost = async (id: string): Promise<any> => {
  return await SocialApiClient.removeGroupPost(id);
};
/**
 * xóa bài viết
 * @param id
 * @returns
 */
export const hiddenGroupPost = async (id: string): Promise<any> => {
  return await SocialApiClient.hiddenGroupPost(id);
};

/**
 * Share bài viết
 * @returns
 */
export const shareGroupPost = async (id: string): Promise<any> => {
  return await SocialApiClient.shareGroupPost(id);
};

/**
 * Lấy text "... phút trước" từ Date
 * @param date
 * @returns
 */
export const getTimeSince = (date?: string | Date) => {
  if (!date) {
    return '';
  }
  const checkDate = typeof date === 'string' ? new Date(date) : date;
  const seconds = Math.floor((new Date().getTime() - checkDate.getTime()) / 1000);
  if (seconds <= 0) {
    return 'vừa mới đây';
  }
  let interval = seconds / 31536000;
  if (interval > 1) {
    return `${Math.floor(interval)} năm`;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return `${Math.floor(interval)} tháng`;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return `${Math.floor(interval)} ngày`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return `${Math.floor(interval)} giờ`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    return `${Math.floor(interval)} phút`;
  }
  return `${Math.floor(seconds)} giây`;
};

/**
 * Lấy danh sách comment theo post
 * @param {string} postId ID của bài viết
 * @returns
 */
export const findAllInPost = async (
  postId: string,
  params: ApiRequestPaging
): Promise<ApiResponsePaging<GroupCommentModel> | null> => {
  const res = await SocialApiClient.findAllInPost(postId, params);
  if (!res || !res.data) {
    return null;
  }
  const rows = res.data.rows.map((item: any) => new GroupCommentModel(item));

  return new ApiResponsePaging<GroupCommentModel>({
    rows: rows,
    page: res.data.page,
    pageSize: res.data.pageSize,
    total: res.data.total,
    totalPages: res.data.totalPages,
  });
};

/**
 * Lấy danh sách comment theo post
 * @param {string} postId ID của bài viết
 * @returns
 */
export const findAllInPostPublic = async (
  postId: string,
  params: ApiRequestPaging
): Promise<ApiResponsePaging<GroupCommentModel> | null> => {
  const res = await SocialApiClient.findAllInPostPublic(postId, params);
  if (!res || !res.data) {
    return null;
  }
  const rows = res.data.rows.map((item: any) => new GroupCommentModel(item));

  return new ApiResponsePaging<GroupCommentModel>({
    rows: rows,
    page: res.data.page,
    pageSize: res.data.pageSize,
    total: res.data.total,
    totalPages: res.data.totalPages,
  });
};

/**
 * Lấy danh sách comment theo parent comment
 * @param {string} postId ID của bài viết
 * @returns
 */
export const findAllInComment = async (
  parentId: string,
  params: ApiRequestPaging
): Promise<ApiResponsePaging<GroupCommentModel> | null> => {
  const res = await SocialApiClient.findAllInComment(parentId, params);
  if (!res || !res.data) {
    return null;
  }

  let rows: GroupCommentModel[] = [];
  if (params.pageSize) {
    rows = res.data.rows.map((item: any) => new GroupCommentModel(item));
  }

  if (!params.pageSize) {
    rows = res.data.map((item: any) => new GroupCommentModel(item));
  }

  return new ApiResponsePaging<GroupCommentModel>({
    rows: rows,
    page: res.data.page,
    pageSize: res.data.pageSize,
    total: res.data.total,
    totalPages: res.data.totalPages,
  });
};

/**
 * Lấy danh sách comment theo parent comment
 * @param {string} postId ID của bài viết
 * @returns
 */
export const findAllInCommentPublic = async (
  parentId: string,
  params: ApiRequestPaging
): Promise<ApiResponsePaging<GroupCommentModel> | null> => {
  const res = await SocialApiClient.findAllInCommentPublic(parentId, params);
  if (!res || !res.data) {
    return null;
  }

  let rows: GroupCommentModel[] = [];
  if (params.pageSize) {
    rows = res.data.rows.map((item: any) => new GroupCommentModel(item));
  }

  if (!params.pageSize) {
    rows = res.data.map((item: any) => new GroupCommentModel(item));
  }

  return new ApiResponsePaging<GroupCommentModel>({
    rows: rows,
    page: res.data.page,
    pageSize: res.data.pageSize,
    total: res.data.total,
    totalPages: res.data.totalPages,
  });
};

/**
 * Thêm 1 bình luận cho bài viết
 * @returns
 */
export const createGroupcomment = async (model: any): Promise<any> => {
  const { id, description, medias, parentId } = model;

  const requestModel = {
    postId: id,
    description,
    medias,
    parentId,
  };
  return await SocialApiClient.createGroupcomment(requestModel);
};

/**
 * Like/Unlike bài viết
 * @param {string} id: ID của comment
 * @returns
 */
export const favoriteGroupcomment = async (id: string): Promise<any> => {
  return await SocialApiClient.favoriteGroupcomment(id);
};

/**
 * Upload file
 * @param {File[]} files: Các file sẽ upload
 * @param {any} dto: Body param
 * @returns
 */
export const uploadFile = async (
  file: File,
  dto: {
    createThumbnail?: boolean;
    featureName?: string;
    id?: number;
  }
): Promise<any> => {
  const res = await UploaderApiClient.uploadFile(file, dto);
  return new ApiResponse({
    isSuccess: true,
    result: res.data[0] || res.data,
  });
};

/**
 * Xóa comment
 * @param {string} id: ID của comment
 * @returns
 */
export const deleteGroupcomment = async (id: string): Promise<any> => {
  return await SocialApiClient.deleteGroupcomment(id);
};

/**
 * Edit comment
 * @param {string} id
 * @param {string} description
 * @param {any} medias
 * @returns
 */
export const updateGroupcomment = async (model: { id: string; description: string; medias: any[] }): Promise<any> => {
  return await SocialApiClient.updateGroupcomment(model);
};

export const createGrouppost = async (model: CreateGroupPostModel): Promise<any> => {
  const description = model.description;
  const youtubeMedias = youtubeParser(description);
  if (!isEmpty(youtubeMedias)) {
    model.medias.push(youtubeMedias[0]);
  }
  return await SocialApiClient.createGrouppost(model);
};

export const updateGrouppost = async (model: UpdateGroupPostModel): Promise<any> => {
  return await SocialApiClient.updateGrouppost(model);
};

export const findGroupPostById = async (postId: string): Promise<ApiResponse<GroupPostModel | null>> => {
  const res = await SocialApiClient.findGroupPostById(postId);

  if (!res || !res.data) {
    return new ApiResponse({
      isSuccess: false,
      result: null,
    });
  }
  return new ApiResponse({
    isSuccess: true,
    result: new GroupPostModel(res.data),
  });
};

export const findGroupPostPublicById = async (postId: string): Promise<ApiResponse<GroupPostModel | null>> => {
  const res = await SocialApiClient.findGroupPostPublicById(postId);

  if (!res || !res.data) {
    return new ApiResponse({
      isSuccess: false,
      result: null,
    });
  }
  return new ApiResponse({
    isSuccess: true,
    result: new GroupPostModel(res.data),
  });
};

/**
 * Tìm kiếm nhóm
 * @returns
 */
export const groupSearch = async (params: ApiRequestPaging): Promise<ApiResponsePaging<GroupModel> | null> => {
  const res = await SocialApiClient.findGroup(params);
  if (!res || !res.data) {
    return null;
  }
  const rows = res.data.rows.map((item: any) => new GroupModel(item));
  return new ApiResponsePaging<GroupModel>({
    rows: rows,
    page: res.data.page,
    pageSize: res.data.pageSize,
    total: res.data.total,
    totalPages: res.data.totalPages,
  });
};

/**
 * Lấy danh sách nhóm khám phá của user hiện tại
 * @returns
 */
export const findGroupDiscoverByCurrentEmployee = async (
  params: ApiRequestPaging
): Promise<ApiResponsePaging<GroupModel> | null> => {
  const queryParams = {
    ...params,
    hasJoin: false,
  };
  const res = await SocialApiClient.findGroupDiscoverByCurrentEmployee(queryParams);
  if (!res || !res.data) {
    return null;
  }
  const rows = res.data.rows.map((item: any) => new GroupModel(item));
  return new ApiResponsePaging<GroupModel>({
    rows: rows,
    page: res.data.page,
    pageSize: res.data.pageSize,
    total: res.data.total,
    totalPages: res.data.totalPages,
  });
};

/**
 * Lấy danh sách nhóm khám phá không cần login TK
 * @returns
 */
export const findGroupDiscoverByCurrentEmployeeNotLogin = async (
  params: ApiRequestPaging
): Promise<ApiResponsePaging<GroupModel> | null> => {
  const res = await SocialApiClient.findGroupDiscoverByCurrentEmployeeNotLogin(params);
  if (!res || !res.data) {
    return null;
  }
  const rows = res.data.rows.map((item: any) => new GroupModel(item));
  return new ApiResponsePaging<GroupModel>({
    rows: rows,
    page: res.data.page,
    pageSize: res.data.pageSize,
    total: res.data.total,
    totalPages: res.data.totalPages,
  });
};

export const onOffCommentPost = async (model: OnOffCommentGroupPostModel) => {
  const res = await SocialApiClient.onOffCommentPost(model);
  if (!res || !res.data) {
    return new ApiResponse({
      isSuccess: false,
      result: null,
    });
  }
  return new ApiResponse({
    isSuccess: true,
    result: res.data,
  });
};
