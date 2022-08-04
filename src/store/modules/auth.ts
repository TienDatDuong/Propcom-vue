import { StsApiClient } from '@/api/sts.api';
import { getToken } from '@/services/features/communicaiton/communication.service';
import { findCurrentEmployee } from '@/services/features/employee/employee.service';
import Axios from 'axios';

export enum AuthStatus {
  NOT_LOGIN = 'NOT_LOGIN',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export const ACTIONS_AUTH = {
  ROOT: 'auth',
  LOGIN: 'login',
  LOGOUT: 'logout',
  GET_USER_DETAIL: 'getUserDetail',
  SET_USER_DETAIL: 'setUserDetail',
  // GET_MASTER_DATA: 'getMasterData',
  // SET_MASTER_DATA: 'setMasterData',
  SET_DIALOG_APP_VISIBLE: 'setDialogAppVisible',
  SET_USER_PERMISSION: 'setUserPermission',
  SET_SCROLL_BEHAVIOR: 'setScrollBehavior',
  SET_STRINGEE_TOKEN: 'setStringeeToken',
};
const MUTATIONS = {
  AUTH_REQUEST: 'AUTH_REQUEST',
  AUTH_SUCCESS: 'AUTH_SUCCESS',
  AUTH_ERROR: 'AUTH_ERROR',
  LOGOUT: 'LOGOUT',
  SET_USER_DETAIL: 'SET_USER_DETAIL',
  // SET_MASTER_DATA: 'SET_MASTER_DATA',
  SET_DIALOG_APP_VISIBLE: 'SET_DIALOG_APP_VISIBLE',
  SET_USER_PERMISSION: 'SET_USER_PERMISSION',
  SET_SCROLL_BEHAVIOR: 'SET_SCROLL_BEHAVIOR',
  SET_STRINGEE_TOKEN: 'SET_STRINGEE_TOKEN',
};

const state = () => ({
  status: AuthStatus.NOT_LOGIN,
  token: localStorage.getItem('token') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  userId: localStorage.getItem('userId') || null,
  user: null,
  masterData: null,
  dialogAppVisible: false,
  userPermission: null,
  scrollBehavior: null,
  stringeeToken: localStorage.getItem('stringee_token') || null,
});

// getters
const getters = {
  authStatus: (state: any) => state.status,
  token: (state: any) => state.token,
  userId: (state: any) => state.userId,
  user: (state: any) => state.user,
  masterData: (state: any) => state.masterData,
  dialogAppVisible: (state: any) => state.dialogAppVisible,
  userPermission: (state: any) => state.userPermission,
  scrollBehavior: (state: any) => state.scrollBehavior,
  stringeeToken: (state: any) => state.stringeeToken,
};

// actions
const actions = {
  async login({ commit, state }: any, user: any): Promise<any> {
    commit(MUTATIONS.AUTH_REQUEST);
    try {
      const res = await StsApiClient.login(user.username, user.password);
      if (res.data.isError) {
        commit(MUTATIONS.AUTH_ERROR);
        throw new Error(res.data.message);
      }
      const token = res.data.access_token;
      const refreshToken = res.data.refresh_token;
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userId', res.data.id);
      commit(MUTATIONS.AUTH_SUCCESS, { token, refreshToken, userId: res.data.id });
      // Xử lý lấy permission
      const userInfo = await StsApiClient.findUser(res.data.id);
      commit(MUTATIONS.SET_USER_PERMISSION, { permission: userInfo.data.permissions });
      // Connect stringee
      const stringeeToken = await getToken(userInfo.data);
      commit(MUTATIONS.SET_STRINGEE_TOKEN, stringeeToken);
      return res.data;
    } catch (err) {
      commit(MUTATIONS.AUTH_ERROR);
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('stringee_token');
      localStorage.removeItem('stringee_id');
      localStorage.removeItem('stringee_token_exp');
      localStorage.removeItem('user_email');
      localStorage.removeItem('user_name');
      localStorage.removeItem('user_phone');
      throw err;
    }
  },
  logout({ commit, state }: any): any {
    commit(MUTATIONS.LOGOUT);
    commit(MUTATIONS.SET_USER_DETAIL, null);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('stringee_token');
    localStorage.removeItem('stringee_id');
    localStorage.removeItem('stringee_token_exp');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_phone');
    return true;
  },
  async getUserDetail({ commit, state }: any, payload: any): Promise<any> {
    const res = await findCurrentEmployee();
    commit(MUTATIONS.SET_USER_DETAIL, res);
    return res;
  },
  setUserDetail({ commit, state }: any, payload: any): any {
    commit(MUTATIONS.SET_USER_DETAIL, payload);
  },
  // async getMasterData({ commit, state }: any, payload: any): Promise<any> {
  //   const res = await CareApiClient.findMasterData();
  //   if (res.data.isError) {
  //     throw new Error(res.data.message);
  //   }
  //   commit(MUTATIONS.SET_MASTER_DATA, res.data);
  //   return res.data;
  // },
  // setMasterData({ commit, state }: any, payload: any): any {
  //   commit(MUTATIONS.SET_MASTER_DATA, payload);
  // }
  setDialogAppVisible({ commit, state }: any, payload: any): any {
    commit(MUTATIONS.SET_DIALOG_APP_VISIBLE, payload);
  },
  setScrollBehavior({ commit, state }: any, payload: any): any {
    commit(MUTATIONS.SET_SCROLL_BEHAVIOR, payload);
  },
};

// mutations
const mutations = {
  AUTH_REQUEST(state: any) {
    state.status = AuthStatus.LOADING;
  },
  AUTH_SUCCESS(state: any, data: any) {
    Axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    state.status = AuthStatus.SUCCESS;
    state.token = data.token;
    state.refreshToken = data.refreshToken;
    state.userId = data.userId;
  },
  AUTH_ERROR(state: any) {
    Axios.defaults.headers.common['Authorization'] = null;
    state.status = AuthStatus.ERROR;
    state.token = null;
    state.refreshToken = null;
    state.userId = null;
  },
  LOGOUT(state: any) {
    Axios.defaults.headers.common['Authorization'] = null;
    state.status = AuthStatus.NOT_LOGIN;
    state.token = null;
    state.refreshToken = null;
    state.userId = null;
  },
  SET_USER_DETAIL(state: any, data: any) {
    state.user = data;
  },
  SET_MASTER_DATA(state: any, data: any) {
    state.masterData = data;
  },
  SET_DIALOG_APP_VISIBLE(state: any, data: any) {
    state.dialogAppVisible = data;
  },
  SET_USER_PERMISSION(state: any, data: any) {
    state.userPermission = data.permission;
  },
  SET_SCROLL_BEHAVIOR(state: any, data: any) {
    state.scrollBehavior = data;
  },
  SET_STRINGEE_TOKEN(state: any, data: any) {
    state.stringeeToken = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
