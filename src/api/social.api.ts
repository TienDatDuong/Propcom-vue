import { AppConstant } from '@/app.constant';
import { ApiRequestPaging } from '@/models/api-request';
import Axios, { AxiosResponse } from 'axios';

export class SocialApiClient {

  static findGroup = async (params: ApiRequestPaging) => {
    return await Axios.get(`${AppConstant.ROOT_URL_SOCIAL_QUERY}/mobile/group`, { params });
  };

  static findGroupSuggestByCurrentEmployee = async (params: ApiRequestPaging) => {
    return await Axios.get(`${AppConstant.ROOT_URL_SOCIAL_QUERY}/mobile/group/suggest`, { params });
  };

  static findGroupSuggestByCurrentEmployeeNotLogin = async (params: ApiRequestPaging) => {
    return await Axios.get(`${AppConstant.ROOT_URL_SOCIAL_QUERY}/public/group`, { params });
  };

  static findGroupDiscoverByCurrentEmployee = async (params: ApiRequestPaging) => {
    return await Axios.get(`${AppConstant.ROOT_URL_SOCIAL_QUERY}/mobile/group`, { params });
  };

  static findGroupDiscoverByCurrentEmployeeNotLogin = async (params: ApiRequestPaging) => {
    return await Axios.get(`${AppConstant.ROOT_URL_SOCIAL_QUERY}/public/group`, { params });
  };

  static findGroupPostPublic = async (params: ApiRequestPaging) => {
    return await Axios.get(`${AppConstant.ROOT_URL_SOCIAL_QUERY}/public/groupPost`, { params });
  };

  static findGroupPostByCurrentEmployee = async (params: ApiRequestPaging) => {
    return await Axios.get(`${AppConstant.ROOT_URL_SOCIAL_QUERY}/mobile/groupPost/home`, { params });
  };

  static findGroupPostByGroup = async (params: ApiRequestPaging) => {
    return await Axios.get(`${AppConstant.ROOT_URL_SOCIAL_QUERY}/mobile/groupPost`, { params });
  };

  static findGroupPostByGroupPublic = async (params: ApiRequestPaging) => {
    return await Axios.get(`${AppConstant.ROOT_URL_SOCIAL_QUERY}/public/groupPost/getPostByGroup`, { params });
  };

  static findGroupById = async (id: string) => {
    return await Axios.get(`${AppConstant.ROOT_URL_SOCIAL_QUERY}/mobile/group/${id}`);
  };

  static checkTypeGroupById = async (id: string) => {
    return await Axios.get(`${AppConstant.ROOT_URL_SOCIAL_QUERY}/public/group/checkType/${id}`);
  };

  static checkJoinGroup = async (id: string) => {
    return await Axios.get(`${AppConstant.ROOT_URL_SOCIAL_QUERY}/mobile/groupMember/checkJoinGroup/${id}`);
  };

  static findGroupByIdNotLogin = async (id: string) => {
    return await Axios.get(`${AppConstant.ROOT_URL_SOCIAL_QUERY}/public/group/${id}`);
  };

  static findGroupReportById = async (id: string, params: ApiRequestPaging) => {
    return await Axios.get(`${AppConstant.ROOT_URL_SOCIAL_QUERY}/mobile/group/report/${id}`, { params });
  };

  static findAllGroupMember = async (id: string, params: ApiRequestPaging) => {
    return await Axios.get(`${AppConstant.ROOT_URL_SOCIAL_QUERY}/mobile/groupMember/${id}/group`, { params });
  };

  static findAllWaitingGroupMember = async (id: string, params: ApiRequestPaging) => {
    return await Axios.get(`${AppConstant.ROOT_URL_SOCIAL_QUERY}/mobile/groupMember/${id}/waiting`, { params });
  };

  static findAllRejectedGroupMember = async (id: string, params: ApiRequestPaging) => {
    return await Axios.get(`${AppConstant.ROOT_URL_SOCIAL_QUERY}/mobile/groupMember/${id}/rejected`, { params });
  };

  static findAllNotInGroupMember = async (id: string, params: ApiRequestPaging) => {
    return await Axios.get(`${AppConstant.ROOT_URL_SOCIAL_QUERY}/mobile/groupMember/${id}/invite`, { params });
  };

  static findAllInPost = async (id: string, params: ApiRequestPaging) => {
    return await Axios.get(`${AppConstant.ROOT_URL_SOCIAL_QUERY}/mobile/groupComment/post/${id}`, { params });
  };

  static findAllInPostPublic = async (id: string, params: ApiRequestPaging) => {
    return await Axios.get(`${AppConstant.ROOT_URL_SOCIAL_QUERY}/public/groupComment/post/${id}`, { params });
  };

  static findAllInComment = async (id: string, params: ApiRequestPaging) => {
    return await Axios.get(`${AppConstant.ROOT_URL_SOCIAL_QUERY}/mobile/groupComment/comment/${id}`, { params });
  };

  static findAllInCommentPublic = async (id: string, params: ApiRequestPaging) => {
    return await Axios.get(`${AppConstant.ROOT_URL_SOCIAL_QUERY}/public/groupComment/comment/${id}`, { params });
  };

  static findGroupPostById = async (id: any) => {
    return await Axios.get(`${AppConstant.ROOT_URL_SOCIAL_QUERY}/mobile/groupPost/${id}`);
  };

  static findGroupPostPublicById = async (id: any) => {
    return await Axios.get(`${AppConstant.ROOT_URL_SOCIAL_QUERY}/public/groupPost/${id}`);
  };

  static findRespondentByAnswerId = async (id: any, params: ApiRequestPaging) => {
    return await Axios.get(`${AppConstant.ROOT_URL_SOCIAL_QUERY}/mobile/groupPost/${id}/users-answer`, { params });
  };

  static updateGroupInformation = async (model: {
    id: string;
    name: string;
    description: string;
    coverImage?: string;
  }) => {
    return await Axios.put(`${AppConstant.ROOT_URL_SOCIAL_DOMAIN}/mobile/group/information`, model);
  };

  static joinGroup = async (id: string) => {
    return await Axios.put(`${AppConstant.ROOT_URL_SOCIAL_DOMAIN}/mobile/group/${id}/join`);
  };

  static cancleJoinGroup = async (id: string) => {
    return await Axios.put(`${AppConstant.ROOT_URL_SOCIAL_DOMAIN}/mobile/group/${id}/cancelJoin`);
  };

  static shareGroup = async (id: string) => {
    return await Axios.put(`${AppConstant.ROOT_URL_SOCIAL_DOMAIN}/mobile/group/${id}/shareGroup`);
  };

  static leaveGroup = async (id: string) => {
    return await Axios.put(`${AppConstant.ROOT_URL_SOCIAL_DOMAIN}/mobile/group/${id}/leave`);
  };

  static approveGroupMember = async (model: any) => {
    return await Axios.put(`${AppConstant.ROOT_URL_SOCIAL_DOMAIN}/mobile/groupMember/approve`, model);
  };

  static rejectGroupMember = async (model: any) => {
    return await Axios.put(`${AppConstant.ROOT_URL_SOCIAL_DOMAIN}/mobile/groupMember/reject`, model);
  };

  static removeGroupMember = async (model: any) => {
    return await Axios.put(`${AppConstant.ROOT_URL_SOCIAL_DOMAIN}/mobile/group/removeMember`, model);
  };
  static removeOptionPoll = async (model: any) => {
    return await Axios.put(`${AppConstant.ROOT_URL_SOCIAL_DOMAIN}/mobile/groupPost/removeOptionPoll`, model);
  };

  static addGroupMember = async (model: any) => {
    return await Axios.put(`${AppConstant.ROOT_URL_SOCIAL_DOMAIN}/mobile/group/addMember`, model);
  };

  static approveGroupPost = async (model: any) => {
    return await Axios.put(`${AppConstant.ROOT_URL_SOCIAL_DOMAIN}/mobile/groupPost/approveGroupPost`, model);
  };
  static addPollOption = async (model: any) => {
    return await Axios.put(`${AppConstant.ROOT_URL_SOCIAL_DOMAIN}/mobile/groupPost/addOptionPoll`, model);
  };
  static submitPollOption = async (model: any) => {
    return await Axios.put(`${AppConstant.ROOT_URL_SOCIAL_DOMAIN}/mobile/groupPost/submitPoll`, model);
  };

  static removeGroupPost = async (id: string) => {
    return await Axios.put(`${AppConstant.ROOT_URL_SOCIAL_DOMAIN}/mobile/groupPost/removeGroupPost/${id}`);
  };
  static hiddenGroupPost = async (id: string) => {
    return await Axios.put(`${AppConstant.ROOT_URL_SOCIAL_DOMAIN}/mobile/groupPost/hiddenGroupPost/${id}`);
  };

  static toggleFollowGroup = async (id: string) => {
    return await Axios.put(`${AppConstant.ROOT_URL_SOCIAL_DOMAIN}/mobile/group/${id}/followGroup`);
  };

  static toggleLikeGroupPost = async (id: string) => {
    return await Axios.put(`${AppConstant.ROOT_URL_SOCIAL_DOMAIN}/mobile/groupPost/likePost/${id}`);
  };

  static toggleFollowGroupPost = async (id: string) => {
    return await Axios.put(`${AppConstant.ROOT_URL_SOCIAL_DOMAIN}/mobile/groupPost/followPost/${id}`);
  };

  static togglePinnedGroupPost = async (id: string) => {
    return await Axios.put(`${AppConstant.ROOT_URL_SOCIAL_DOMAIN}/mobile/groupPost/pinnedPost/${id}`);
  };

  static shareGroupPost = async (id: string) => {
    return await Axios.put(`${AppConstant.ROOT_URL_SOCIAL_DOMAIN}/mobile/groupPost/sharePost/${id}`);
  };

  static createGroupcomment = async (model: any) => {
    return await Axios.post(`${AppConstant.ROOT_URL_SOCIAL_DOMAIN}/mobile/groupComment`, model);
  };

  static favoriteGroupcomment = async (id: string) => {
    return await Axios.put(`${AppConstant.ROOT_URL_SOCIAL_DOMAIN}/mobile/groupComment/${id}/favorite`);
  };

  static deleteGroupcomment = async (id: string) => {
    return await Axios.delete(`${AppConstant.ROOT_URL_SOCIAL_DOMAIN}/mobile/groupComment/${id}`);
  };

  static updateGroupcomment = async (model: any) => {
    return await Axios.put(`${AppConstant.ROOT_URL_SOCIAL_DOMAIN}/mobile/groupComment`, model);
  };

  static createGrouppost = async (model: any) => {
    return await Axios.post(`${AppConstant.ROOT_URL_SOCIAL_DOMAIN}/mobile/groupPost`, model);
  };

  static updateGrouppost = async (model: any) => {
    return await Axios.put(`${AppConstant.ROOT_URL_SOCIAL_DOMAIN}/mobile/groupPost`, model);
  };

  static onOffCommentPost = async (model: any) => {
    return await Axios.put(`${AppConstant.ROOT_URL_SOCIAL_DOMAIN}/mobile/groupPost/onOffCommentPost`, model);
  };

}