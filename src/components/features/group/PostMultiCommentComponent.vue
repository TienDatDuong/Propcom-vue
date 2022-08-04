<template>
  <div class="group-multi-comment-component">
    <!-- Viết bình luận mới -->
    <template v-if="isLoggedIn && data.isJoinGroup">
      <slot name="comment--writer">
        <PostCommentWriterComponent @submit="addComment" />
      </slot>
    </template>
    <!-- Hiển thị bình luận -->
    <div class="group-multi-comment-component__item" v-for="(item, index) in data.totalItems" :key="index">
      <PostCommentComponent
        :dataSource="item"
        :id="item.id"
        :isDisable="item.isDisable"
        :isSubComment="false"
        @showSubComment="(value) => (item.showSubComment = value)"
        @removeComment="onRemoveComment"
        @editComment="onEditComment($event, item)"
      />
      <template v-if="item.showSubComment">
        <div class="group-multi-comment-component__item__sub">
          <div
            v-for="(subItem, index) in item.subComments"
            :key="index"
            class="group-multi-comment-component__item__sub__comment"
          >
            <PostCommentComponent
              :dataSource="subItem"
              :id="subItem.id"
              :isDisable="subItem.isDisable"
              :parentId="item.id"
              :isSubComment="true"
              @removeComment="onRemoveComment"
              @editComment="onEditComment($event, subItem)"
            />
          </div>
          <template v-if="item.subComments.length < item.totalComments">
            <div
              @click="loadMoreSubcomment(item.id)"
              v-loading="data.isLoadingMore && data.loadingId === item.id"
              element-loading-spinner="el-icon-loading"
              class="read-more"
            >
              {{
                `${
                  data.subQueryParams.page > 1 && item.totalComments - item.subComments.length > 5
                    ? "Xem thêm 5 bình luận"
                    : "Xem thêm bình luận"
                }`
              }}
            </div>
          </template>
          <template v-if="isLoggedIn && data.isJoinGroup">
            <PostCommentWriterComponent @submit="addSubComment($event, data.postId, item.id)" />
          </template>
        </div>
      </template>
    </div>

    <template v-if="isShowMore">
      <div
        @click="loadMoreComment()"
        v-loading="data.isLoadingMore && isEmpty(data.loadingId)"
        element-loading-spinner="el-icon-loading"
        class="read-more"
      >
        Xem thêm 5 bình luận
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.group-multi-comment-component {
  display: flex;
  flex-direction: column;
  row-gap: 15px;

  &__item {
    display: flex;
    flex-direction: column;
    row-gap: 15px;

    &__sub {
      margin-left: 45px;
      position: relative;
      display: flex;
      flex-direction: column;
      row-gap: 5px;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 3px;
        height: calc(100% - 45px);
        background: #f2f2f2;
      }

      &__comment {
        padding: 0 15px;
      }
    }
  }

  .read-more {
    color: #5a5a5a;
    cursor: pointer;
    font-size: 14px;
    width: 175px;
    padding: 5px 15px;
  }

  .read-more:hover {
    text-decoration: underline;
  }
}
</style>

<script lang="ts">
import { defineComponent, reactive, onMounted, computed, watch, onUnmounted, inject, Ref } from 'vue';
import { isNil, isEmpty } from 'lodash';
import PostCommentComponent from '@/components/features/group/PostCommentComponent.vue';
import PostCommentWriterComponent from '@/components/features/group/PostCommentWriterComponent.vue';
import { ApiRequestPaging } from '@/models/api-request';
import {
  createGroupcomment,
  findAllInComment,
  findAllInCommentPublic,
  findAllInPost,
  findAllInPostPublic,
  getTimeSince,
  updateGroupcomment,
} from '@/services/features/group/group.service';
import { GroupCommentModel } from '@/services/features/group/group.model';
import { ApiResponsePaging } from '@/models/api-response';
import { useInit } from '@/services/shared/utils';
import { AppConstant } from '@/app.constant';
import { Client, FrameImpl, StompSubscription } from '@stomp/stompjs';

class PostMultiCommentComponentProps {
  id: string;
  isJoinGroup: boolean;
}

class PostMultiCommentComponentData {
  loadingId: string | null;
  isLoadingMore: boolean;
  postId: string;
  isJoinGroup: boolean;
  totalItems: GroupCommentModelData[];
  paging: ApiResponsePaging<GroupCommentModel> | null;
  queryParams: ApiRequestPaging;
  subQueryParams: ApiRequestPaging = new ApiRequestPaging({
    page: 1,
    pageSize: 1,
  });
  currentUser: any;
  perpage: number;
  total: number;
}

class GroupCommentModelData implements GroupCommentModel {
  description: string;
  user: object;
  medias: object[];
  createdDate: string;
  id: string;
  totalFavorites = 0;
  isFavorite: boolean;
  isComment: boolean;
  subComments: any[] = [];
  totalComments = 0;
  value: string;
  subQueryParams: ApiRequestPaging = new ApiRequestPaging({
    page: 1,
    pageSize: 1,
  });
  isDisable = false;

  constructor(init?: Partial<GroupCommentModelData>) {
    Object.assign(this, init);
  }
}

export default defineComponent({
  name: 'PostMultiCommentComponent',
  props: {
    id: {
      type: String,
      default: null,
    },
    isJoinGroup: {
      type: Boolean,
      default: null,
    },
  },
  components: {
    PostCommentComponent,
    PostCommentWriterComponent,
  },
  setup(props: PostMultiCommentComponentProps, { emit }: any) {
    const { currentUser, isLoggedIn } = useInit();
    
    const stompClient: Ref<Client | null> | undefined = inject(AppConstant.PROVIDER_STOMP_CLIENT);
    let stompClientSubscription: StompSubscription | null = null;
    const data = reactive<PostMultiCommentComponentData>({
      loadingId: '',
      isLoadingMore: false,
      postId: props.id,
      isJoinGroup: props.isJoinGroup,
      totalItems: [],
      paging: null,
      queryParams: {
        page: 1,
        pageSize: 5,
      },
      subQueryParams: {
        page: 1,
        pageSize: 5,
      },
      currentUser,
      perpage: 5,
      total: 0,
    });

    const isShowMore = computed(() => {
      if (!data.paging) {
        return false;
      }

      return data.paging.page < data.paging.totalPages;
    });

    watch(
      () => data.total,
      () => emit('changeTotal', data.total)
    );

    onMounted(async () => {
      let response: any = {};
      if (!isLoggedIn.value) {
        response = await findAllInPostPublic(data.postId, data.queryParams);
      } else {
        response = await findAllInPost(data.postId, data.queryParams);
      }
      data.paging = response;
      data.totalItems = (response?.rows || []).map((item: GroupCommentModel) => new GroupCommentModelData(item));
    });

    const addComment = async (params: { description: string; medias: any[] }) => {
      const model = {
        id: data.postId,
        description: params.description,
        medias: params.medias || [],
      };
      data.totalItems.push(
        new GroupCommentModelData({
          description: model.description,
          user: data.currentUser,
          medias: model.medias,
          createdDate: new Date().toISOString(),
          id: '',
          totalFavorites: 0,
          isFavorite: false,
          isComment: false,
          subComments: [],
          isDisable: true,
          value: '',
        })
      );

      await createGroupcomment(model);
    };

    const loadComment = async () => {
      let response: any = {};
      if (!isLoggedIn.value) {
        response = await findAllInPostPublic(data.postId, data.queryParams);
      } else {
        response = await findAllInPost(data.postId, data.queryParams);
      }
      data.paging = response;
      if (response) {
        const ids = data.totalItems.map((item) => item.id);
        response.rows.map((item: GroupCommentModel) => {
          if (ids.includes(item.id)) {
            return;
          }
          data.totalItems.push(new GroupCommentModelData(item));
        });

        data.total = response.total;
      }
    };

    const loadSubComment = async (id: string, deleteId?: string) => {
      let response: any = {};
      if (!isLoggedIn.value) {
        response = await findAllInCommentPublic(id, data.subQueryParams);
      } else {
        response = await findAllInComment(id, data.subQueryParams);
      }
      if (response && response.rows) {
        data.totalItems.forEach((item: any) => {
          if (item.id !== id) {
            return;
          }

          item.subComments = response.rows;
          item.totalComments = response.total;
        });
      }
    };

    const addSubComment = async (params: { description: string; medias: any[] }, postId: string, parentId: string) => {
      const model = {
        id: postId,
        description: params.description,
        medias: params.medias || [],
        parentId,
      };
      data.totalItems.forEach(async (item: GroupCommentModelData) => {
        if (item.id !== model.parentId) {
          return;
        }
        item.subComments.push(
          new GroupCommentModelData({
            description: model.description,
            user: data.currentUser,
            medias: model.medias,
            createdDate: new Date().toISOString(),
            id: '',
            totalFavorites: 0,
            isFavorite: false,
            isComment: false,
            subComments: [],
            value: '',
            isDisable: true,
          })
        );

        await createGroupcomment(model);
      });
    };

    const loadMoreSubcomment = async (loadingId: string) => {
      data.loadingId = loadingId;
      data.isLoadingMore = true;
      const finder = data.totalItems.find((item: GroupCommentModelData) => {
        if (item.id === loadingId) {
          item.subQueryParams.pageSize += data.perpage;
          return true;
        }
        return false;
      });

      if (finder) {
        data.subQueryParams = finder.subQueryParams;
      }
      try {
        loadSubComment(loadingId);
      } finally {
        data.loadingId = '';
        data.isLoadingMore = false;
      }
    };

    const loadMoreComment = async () => {
      data.queryParams.pageSize += data.perpage;
      data.loadingId = null;
      data.isLoadingMore = true;
      try {
        await loadComment();
      } finally {
        data.isLoadingMore = false;
      }
    };

    const onRemoveComment = async (params: { isSubComment: boolean; parentId: string; id: string }) => {
      if (!params.isSubComment) {
        data.totalItems = data.totalItems.filter((i) => i.id !== params.id);
        if (data.subQueryParams.pageSize > 0 && data.subQueryParams.pageSize === data.total) {
          data.subQueryParams.pageSize--;
        }

        data.total--;
        await loadComment();
        return;
      }

      data.totalItems.forEach((item) => {
        if (item.id !== params.parentId) {
          return;
        }

        item.subComments = item.subComments.filter((i) => i.id !== params.id);
        if (item.subQueryParams.pageSize > 0 && item.subQueryParams.pageSize === item.totalComments) {
          item.subQueryParams.pageSize--;
        }
      });

      await loadSubComment(params.parentId);
    };

    const onEditComment = async (params: { description: string; medias: any[] }, item: any) => {
      const model = {
        id: item.id,
        description: params.description,
        medias: params.medias || [],
      };
      const response = await updateGroupcomment(model);
      if (!response) {
        return;
      }
      item.description = params.description;
      item.medias = params.medias;
    };

    // Subscribe Realtime: channel bài đăng
    const subscribeRealtime = async (handler: (message: any) => void) => {
      if (data.postId && stompClient && stompClient.value) {
        stompClientSubscription = stompClient.value.subscribe(
          `${AppConstant.SERVICE_WS_CHANNEL}.social.groupPost-${data.postId}`,
          handler
        );
      }
    };

    // Unsubscribe Realtime: channel bài đăng
    const unsubscribeRealtime = () => {
      try {
        if (stompClientSubscription) {
          stompClientSubscription.unsubscribe();
        }
      } catch (err) {
        // Nuốt lỗi WebSocket is already in CLOSING or CLOSED state.
      }
    };

    // Life circle
    onMounted(() => {
      subscribeRealtime((message: FrameImpl) => {
        const messageData = JSON.parse(message.body);
        switch (messageData.eventName) {
          // Lọc tất cả event tạo mới comment/subcomment
          case AppConstant.REALTIME_EVENT.POST_COMMENT_CREATED: {
            if (messageData.parentId) {
              // Là subcomment mới của comment có id === parentId
              const parentIndex = data.totalItems.findIndex((item) => item.id === messageData.parentId);
              if (parentIndex > -1) {
                const parentItem = { ...data.totalItems[parentIndex] };
                parentItem.subQueryParams.pageSize++;
                parentItem.totalComments++;

                const lastSubIndex = parentItem.subComments.length - 1;
                if (parentItem.subComments[lastSubIndex].isDisable) {
                  Object.assign(parentItem.subComments[lastSubIndex], new GroupCommentModelData(messageData));
                } else {
                  parentItem.subComments.push(new GroupCommentModelData(messageData));
                }
                data.totalItems[parentIndex] = parentItem;
              }
            } else {
              // Là comment mới
              const lastIndex = data.totalItems.length - 1;
              if (data.totalItems[lastIndex].isDisable) {
                Object.assign(data.totalItems[lastIndex], new GroupCommentModelData(messageData));
              } else {
                data.totalItems.push(new GroupCommentModelData(messageData));
              }

              if (data.paging) {
                data.paging.total++;
              }
            }
            data.total = messageData.totalPostComments;
            break;
          }
          // Lọc tất cả event sửa comment/subcomment
          case AppConstant.REALTIME_EVENT.POST_COMMENT_UPDATED: {
            if (messageData.parentId) {
              const parentIndex = data.totalItems.findIndex((item) => item.id === messageData.parentId);
              if (parentIndex > -1) {
                const parentItem = { ...data.totalItems[parentIndex] };
                const updatedIndex = parentItem.subComments.findIndex((item) => item.id === messageData.id);
                if (updatedIndex > -1) {
                  parentItem.subComments[updatedIndex] = new GroupCommentModelData(messageData);
                }
                data.totalItems[parentIndex] = parentItem;
              }
            } else {
              const updatedIndex = data.totalItems.findIndex((item) => item.id === messageData.id);
              if (updatedIndex > -1) {
                data.totalItems[updatedIndex] = new GroupCommentModelData(messageData);
              }
            }
            break;
          }
          // Lọc tất cả event xóa comment/subcomment
          case AppConstant.REALTIME_EVENT.POST_COMMENT_DELETED: {
            if (messageData.parentId) {
              const parentIndex = data.totalItems.findIndex((item) => item.id === messageData.parentId);
              if (parentIndex > -1) {
                const parentItem = { ...data.totalItems[parentIndex] };
                const deletedIndex = parentItem.subComments.findIndex((item) => item.id === messageData.id);
                if (deletedIndex > -1) {
                  parentItem.subComments.splice(deletedIndex, 1);
                  parentItem.subQueryParams.pageSize--;
                  parentItem.totalComments--;
                }
                data.totalItems[parentIndex] = parentItem;
              }
            } else {
              const deletedIndex = data.totalItems.findIndex((item) => item.id === messageData.id);
              if (deletedIndex > -1) {
                data.totalItems.splice(deletedIndex, 1);
                if (data.paging) {
                  data.paging.total--;
                }
              }
            }
            data.total = messageData.totalPostComments;
            break;
          }
        }
      });
    });
    onUnmounted(() => {
      // Unsubscribe khi bài đăng bị đóng/hủy
      unsubscribeRealtime();
    });

    return {
      data,
      isShowMore,
      isLoggedIn,
      isNil,
      isEmpty,
      addComment,
      addSubComment,
      loadMoreSubcomment,
      loadMoreComment,
      onRemoveComment,
      onEditComment,
    };
  },
});
</script>