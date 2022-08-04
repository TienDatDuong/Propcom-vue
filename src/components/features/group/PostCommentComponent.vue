<template>
  <div class="group-comment-component">
    <AppCarouselComponent
      v-if="data.carousel.visible"
      :items="data.carousel.items"
      @clickOutside="onCloseCarousel"
      class="app-carousel-fullsize"
    />
    <!-- Avatar người dùng -->
    <div class="group-comment-component__avatar">
      <UserAvatarComponent :currentUser="data.dataSource.user" @click="handleDialogUserVisible(true)" />
    </div>

    <div class="group-comment-component__comment" :class="{ 'comment-disable': disable }">
      <div v-if="!data.isEdit" class="group-comment-component__comment__desc">
        <div>
          <!-- Comment -->
          <div class="group-comment-component__comment__desc__user">
            <!-- tên người dùng -->
            <a href="javascript:;" class="user-name" @click="handleDialogUserVisible(true)">
              {{ data.dataSource.user ? data.dataSource.user.name : "Người dùng hệ thống" }}
            </a>
            <div class="ellipse">
              <div class="ellipse__icon"></div>
            </div>
            <!-- Thời gian comment -->
            <div class="active-time">
              {{ getTimeSince(data.dataSource.createdDate) }}
            </div>
          </div>
          <!-- Bình luận -->
          <div class="group-comment-component__comment__desc__content">
            {{ data.dataSource.description }}
          </div>
        </div>

        <Popover v-if="data.userId === data.dataSource.user.id">
          <PopoverButton as="div" class="group-comment-component__comment__desc__actions app-hover-effect unselectable">
            <img src="@/assets/icons/colorful/post_icon_actions.svg" />
          </PopoverButton>
          <!-- Dropdown -->
          <PopoverPanel as="div" v-slot="{ close }" class="app-dropdown">
            <div
              class="app-dropdown__item"
              @click="
                onRemoveComment(data.dataSource.id);
                close();
              "
            >
              <div class="app-dropdown__item__img-wapper">
                <img src="@/assets/icons/simple/icon_ellipse_delete.svg" />
              </div>
              <span>Xóa bình luận</span>
            </div>
            <div
              class="app-dropdown__item"
              @click="
                data.isEdit = true;
                close();
              "
            >
              <div class="app-dropdown__item__img-wapper">
                <img src="@/assets/icons/simple/icon_pencil.svg" />
              </div>
              <span>Sửa bình luận</span>
            </div>
          </PopoverPanel>
        </Popover>
      </div>
      <div v-if="data.isEdit">
        <PostCommentWriterComponent
          :isShowAvatar="false"
          :isShowSend="false"
          type="edit"
          :default="data.dataSource.description"
          :medias="data.dataSource.medias"
          @esc="() => (data.isEdit = false)"
          @submit="editComment"
        />
      </div>

      <!-- Hình ảnh đính kèm -->
      <template v-if="!isEmpty(data.dataSource.medias) && !data.isEdit">
        <div class="group-comment-component__comment__desc__media">
          <div
            v-for="(media, index) in data.dataSource.medias"
            :key="index"
            class="group-comment-component__comment__desc__media__container"
          >
            <PostMediaComponent
              @click="onClickPostMedia(data.dataSource.medias, index)"
              :dataSource="media"
              class="app-hover-effect"
            />
          </div>
        </div>
      </template>

      <!-- Action like comment -->
      <div class="group-comment-component__comment__action" v-if="!data.isEdit">
        <div @click="clickLike" class="group-comment-component__comment__action__like">
          <img v-if="!data.dataSource.isFavorite" src="@/assets/icons/simple/icon_like.svg" />
          <img v-if="data.dataSource.isFavorite" src="@/assets/icons/colorful/icon_like.svg" />
          <label>{{ data.dataSource.totalFavorites }} thích</label>
        </div>
        <template v-if="!data.isSubComment">
          <div class="group-comment-component__comment__action__comment" @click="showSubComment">
            <img src="@/assets/icons/simple/icon_comment.svg" />
            <!-- <img v-if="!data.dataSource.isComment" src="@/assets/icons/simple/icon_comment.svg" />
            <img v-if="data.dataSource.isComment" src="@/assets/icons/colorful/group_icon_comment.svg" /> -->
            <label>{{ totalComments }} bình luận</label>
          </div>
        </template>
      </div>
    </div>
  </div>
  <UserDetailDialog v-model="data.dialogUserDetail.model" v-model:visible="data.dialogUserDetail.visible" />
</template>

<style lang="scss" scoped>
.group-comment-component {
  display: flex;

  .comment-disable {
    pointer-events: none;
    opacity: 0.4;
  }

  &__avatar {
    width: 35px;
    height: 35px;
    margin-right: 10px;

    & > img {
      cursor: pointer;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  &__comment {
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    flex: 1;

    &__desc {
      display: flex;
      align-items: center;
      column-gap: 10px;

      & > div:first-child {
        padding: 10px 15px;
        background: #fafafa;
        border-radius: 10px;
        flex-direction: column;
      }

      &__actions {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background: #ffffff;
      }

      &__user {
        display: flex;

        .user-name {
          font-weight: bold;
          font-size: 13px;
          text-transform: uppercase;
          color: #0f0f0f;
          text-decoration: none;
        }

        .active-time {
          font-size: 13px;
          color: #a7a7a7;
        }
      }

      &__content {
        font-size: 14px;
        color: #0f0f0f;
      }

      &__media {
        padding-top: 15%;
        margin-right: 10%;
        padding-left: 15px;
        position: relative;
        display: flex;

        &__container {
          width: 30%;
          height: 100%;
          position: absolute;
          top: 0;

          .app-hover-effect {
            cursor: pointer;
          }
        }
      }

      .ellipse {
        margin: 0px 8px;
        position: relative;

        &__icon {
          width: 3px;
          height: 3px;
          background: #a7a7a7;
          border-radius: 50%;
          position: absolute;
          top: calc(50% - 1px);
          left: calc(50% - 1px);
        }
      }
    }

    &__action {
      display: flex;
      font-size: 12px;
      color: #a7a7a7;
      padding: 0px 15px;

      &__like,
      &__comment {
        margin-right: 5px;
        padding: 2px 5px;
        cursor: pointer;
        border-radius: 5px;
        display: flex;

        label {
          padding: 0 2px;
          cursor: pointer;
        }

        img {
          width: 17px;
          height: 17px;
        }

        &:hover {
          background: #f2f2f2;
        }
      }
    }
  }
}
</style>

<script lang="ts">
import { computed, defineComponent, reactive, watch } from 'vue';
import { cloneDeep, isEmpty } from 'lodash';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import UserAvatarComponent from '@/components/features/user-profile/UserAvatarComponent.vue';
import PostMediaComponent from '@/components/features/group/PostMediaComponent.vue';
import AppCarouselComponent from '@/components/features/group/AppCarouselComponent.vue';
import PostCommentWriterComponent from '@/components/features/group/PostCommentWriterComponent.vue';
import UserDetailDialog from '@/components/features/user-profile/UserDetailDialog.vue';
import { deleteGroupcomment, favoriteGroupcomment, getTimeSince } from '@/services/features/group/group.service';
import { useInit } from '@/services/shared/utils';

class PostCommentComponentProps {
  dataSource: any;
  isSubComment: boolean;
  parentId: string;
  id: string;
  isDisable: boolean;
}

class PostCommentComponentData {
  dataSource: GroupCommentItem;
  isSubComment: boolean;
  parentId: string;
  id: string;
  userId: string;
  carousel: any;
  dialogUserDetail: any;
  isEdit: boolean;
}

class GroupCommentItem {
  description: string;
  user: any;
  medias: any[];
  isFavorite: boolean;
  subComments: any[];
  totalComments: number;
  totalFavorites: number;
  createdDate: string;
  showSubComment: boolean;
  id: string;

  constructor(init?: GroupCommentItem) {
    Object.assign(this, init);
    this.showSubComment = false;
  }
}

export default defineComponent({
  name: 'PostCommentComponent',
  components: {
    Popover,
    PopoverButton,
    PopoverPanel,
    UserAvatarComponent,
    PostMediaComponent,
    AppCarouselComponent,
    UserDetailDialog,
    PostCommentWriterComponent,
  },
  props: {
    dataSource: {
      type: Object,
      require: true,
    },
    isSubComment: {
      type: Boolean,
      require: false,
    },
    parentId: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
    isDisable: {
      type: Boolean,
    },
  },
  emits: ['showSubComment', 'removeComment', 'editComment'],
  setup(props: PostCommentComponentProps, { emit }: any) {
    const { userId } = useInit();
    const data = reactive<PostCommentComponentData>({
      dataSource: cloneDeep(props.dataSource),
      isSubComment: props.isSubComment,
      userId,
      carousel: {
        visible: false,
        items: [],
        selected: 0,
      },
      parentId: props.parentId,
      id: props.id,
      dialogUserDetail: {
        visible: false,
        model: props.dataSource ? props.dataSource.user : null,
      },
      isEdit: false,
    });

    watch(
      () => props.dataSource,
      () => (data.dataSource = props.dataSource),
      {
        deep: true,
      }
    );
    watch(
      () => props.parentId,
      () => (data.parentId = props.parentId)
    );
    watch(
      () => props.id,
      () => {
        data.id = props.id;
        data.dataSource.id = props.id;
      }
    );
    watch(
      () => props.isSubComment,
      () => (data.isSubComment = props.isSubComment)
    );
    const totalComments = computed(() => props.dataSource.totalComments);

    const disable = computed(() => props.isDisable);

    const showSubComment = () => {
      data.dataSource.showSubComment = !data.dataSource.showSubComment;
      emit('showSubComment', data.dataSource.showSubComment);
    };

    const clickLike = async () => {
      if (data.dataSource) {
        data.dataSource.isFavorite = !data.dataSource.isFavorite;
        if (data.dataSource.isFavorite) {
          data.dataSource.totalFavorites = data.dataSource.totalFavorites + 1;
        } else {
          data.dataSource.totalFavorites = data.dataSource.totalFavorites - 1;
        }
      }

      await favoriteGroupcomment(data.dataSource.id);
    };

    const onRemoveComment = async () => {
      await deleteGroupcomment(data.dataSource.id);
      emit('removeComment', {
        isSubComment: data.isSubComment,
        parentId: data.parentId,
        id: data.dataSource.id,
      });
    };

    const onClickPostMedia = (medias: any[], index: number) => {
      data.carousel.visible = true;
      data.carousel.items = medias;
      data.carousel.selected = index;
    };

    const onCloseCarousel = () => {
      data.carousel.visible = false;
    };

    // Ẩn/hiện dialog user
    const handleDialogUserVisible = (isVisible: boolean) => {
      data.dialogUserDetail.visible = isVisible;
    };

    const editComment = (params: { description: string; medias: any[] }) => {
      emit('editComment', params);
      data.isEdit = false;
    };

    return {
      data,
      totalComments,
      disable,
      isEmpty,
      getTimeSince,
      showSubComment,
      clickLike,
      onRemoveComment,
      onClickPostMedia,
      onCloseCarousel,
      handleDialogUserVisible,
      editComment,
    };
  },
});
</script>
