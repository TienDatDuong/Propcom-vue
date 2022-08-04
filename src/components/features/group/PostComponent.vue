<template>
  <TransitionRoot
    :show="data.isShowing"
    enter="transition-opacity duration-100"
    enter-from="opacity-0"
    enter-to="opacity-100"
    leave="transition-opacity duration-100"
    leave-from="opacity-100"
    leave-to="opacity-0"
  >
    <div class="post-component">
      <AppCarouselComponent
        v-if="data.carousel.visible"
        :items="data.carousel.items"
        :selected="data.carousel.selected"
        @clickOutside="onCloseCarousel"
        class="app-carousel-fullsize"
      />
      <template v-if="data.dataSource">
        <!-- Header Bài viết -->
        <div class="post-component__header unselectable">
          <div class="post-component__header__info-container">
            <div class="post-component__header__info-container__avatar" @click="handleDialogUserVisible(true)">
              <UserAvatarComponent :currentUser="data.dataSource.user" />
            </div>
            <div class="d-flex flex-column">
              <div class="post-component__header__info-container__title-container">
                <a
                  href="javascript:;"
                  class="post-component__header__info-container__title"
                  @click="handleDialogUserVisible(true)"
                >
                  {{ data.dataSource.user?.name }}
                </a>
                <img src="@/assets/icons/simple/icon_vector.svg" />
                <a
                  href="javascript:;"
                  class="post-component__header__info-container__title"
                  @click="goToGroupDetailPage(data.dataSource.group.id)"
                >
                  {{ data.dataSource.group?.name }}
                </a>
              </div>
              <div class="post-component__header__info-container__subtitle">
                {{ formatDate(data.dataSource.createdDate) }}
              </div>
            </div>
          </div>
          <Popover v-if="!data.type">
            <PopoverButton as="div" class="post-component__header__actions app-hover-effect unselectable">
              <img src="@/assets/icons/colorful/post_icon_actions.svg" />
            </PopoverButton>
            <!-- Dropdown -->
            <PopoverPanel as="div" v-slot="{ close }" class="app-dropdown">
              <!-- Admin - Pin/unpin -->
              <template v-if="data.dataSource.isAdmin">
                <template v-if="!data.dataSource.isPinned">
                  <div
                    class="app-dropdown__item"
                    @click="
                      handleTogglePinnedPost(data.dataSource.id);
                      close();
                    "
                  >
                    <div class="app-dropdown__item__img-wapper">
                      <img src="@/assets/icons/simple/icon_bookmark.svg" />
                    </div>
                    <span>Ghim bài viết</span>
                  </div>
                </template>
                <template v-else>
                  <div
                    class="app-dropdown__item"
                    @click="
                      handleTogglePinnedPost(data.dataSource.id);
                      close();
                    "
                  >
                    <div class="app-dropdown__item__img-wapper">
                      <img src="@/assets/icons/simple/icon_bookmark.svg" />
                    </div>
                    <span>Bỏ ghim bài viết</span>
                  </div>
                </template>
              </template>
              <!-- Sửa bài viết -->
              <template v-if="isCreator">
                <div
                  class="app-dropdown__item"
                  @click="
                    editPost();
                    close();
                  "
                >
                  <div class="app-dropdown__item__img-wapper">
                    <img src="@/assets/icons/simple/icon_edit.svg" />
                  </div>
                  <span>Sửa bài viết</span>
                </div>
              </template>
              <!-- Follow/unfollow -->
              <template v-if="!isCreator">
                <template v-if="!data.dataSource.isFollow">
                  <div
                    class="app-dropdown__item"
                    @click="
                      toggleFollowPost(data.dataSource.id);
                      close();
                    "
                  >
                    <div class="app-dropdown__item__img-wapper">
                      <img src="@/assets/icons/simple/icon_notification.svg" />
                    </div>
                    <span>Theo dõi bài viết</span>
                  </div>
                </template>
                <template v-else>
                  <div
                    class="app-dropdown__item"
                    @click="
                      toggleFollowPost(data.dataSource.id);
                      close();
                    "
                  >
                    <div class="app-dropdown__item__img-wapper">
                      <img src="@/assets/icons/simple/icon_unnotification.svg" />
                    </div>
                    <span>Hủy theo dõi bài viết</span>
                  </div>
                </template>
              </template>
              <!-- Lịch sử chỉnh sửa -->
              <div
                class="app-dropdown__item"
                @click="
                  viewHistory(true);
                  close();
                "
              >
                <div class="app-dropdown__item__img-wapper">
                  <img src="@/assets/icons/simple/icon_clock.svg" />
                </div>
                <span>Lịch sử chỉnh sửa</span>
              </div>
              <!-- Xóa bài viết -->
              <template v-if="isCreator || data.dataSource.isAdmin">
                <div
                  class="app-dropdown__item"
                  @click="
                    handleDialogPostVisible(true, GroupPostTypeEnum.MY_POST_ACTIVE);
                    close();
                  "
                >
                  <div class="app-dropdown__item__img-wapper">
                    <img src="@/assets/icons/simple/icon_close_ellipse.svg" />
                  </div>
                  <span>Xóa bài viết</span>
                </div>
              </template>
              <!-- Cài đặt bình luận -->
              <template v-if="isCreator || data.dataSource.isAdmin">
                <div
                  class="app-dropdown__item"
                  @click="
                    data.commentSetting.visible = true;
                    close();
                  "
                >
                  <div class="app-dropdown__item__img-wapper">
                    <img src="@/assets/icons/simple/icon_setting.svg" />
                  </div>
                  <span>Cài đặt bình luận</span>
                </div>
              </template>
            </PopoverPanel>
          </Popover>
        </div>
        <!-- Nội dung bài viết -->
        <div class="post-component__content">
          <span v-html="linkifyHtml(data.dataSource.description)"> </span>
        </div>
        <!-- File đính kèm -->
        <div v-if="data.files && data.files.length" class="post-component__file">
          <template v-for="(file, index) in data.files" :key="index">
            <div class="post-component__file__item">
              <div class="post-component__file__item__icon">
                <img src="@/assets/icons/colorful/icon_file_doc.svg" />
              </div>
              <div class="post-component__file__item__info">
                <span class="post-component__file__item__file-name">{{ file.fileName }}</span>
                <!-- <span class="post-component__file__item__file-size"></span> -->
              </div>
              <div
                class="post-component__file__item__download app-hover-effect"
                @click="downloadFile(file.url, file.fileName)"
              >
                <img src="@/assets/icons/colorful/icon_download.svg" />
              </div>
            </div>
          </template>
        </div>
        <!-- Ảnh/Video -->
        <div v-if="data.medias && data.medias.length" class="post-component__media">
          <template v-if="data.medias.length === 1">
            <!-- Layout 1 item -->
            <div class="post-component__media__container container-1">
              <PostMediaComponent
                @click="onClickPostMedia(data.medias, 0)"
                :dataSource="data.medias[0]"
                class="app-hover-effect"
              />
            </div>
          </template>
          <template v-else-if="data.medias.length === 2">
            <!-- Layout 2 item -->
            <div class="post-component__media__container container-2">
              <PostMediaComponent
                @click="onClickPostMedia(data.medias, 0)"
                :dataSource="data.medias[0]"
                class="app-hover-effect"
              />
              <PostMediaComponent
                @click="onClickPostMedia(data.medias, 1)"
                :dataSource="data.medias[1]"
                class="app-hover-effect"
              />
            </div>
          </template>
          <template v-else-if="data.medias.length === 3">
            <!-- Layout 3 item -->
            <div class="post-component__media__container container-3">
              <div class="container-3__section-left">
                <PostMediaComponent
                  @click="onClickPostMedia(data.medias, 0)"
                  :dataSource="data.medias[0]"
                  class="app-hover-effect"
                />
              </div>
              <div class="container-3__section-right">
                <PostMediaComponent
                  @click="onClickPostMedia(data.medias, 1)"
                  :dataSource="data.medias[1]"
                  :isThumbnail="true"
                  class="app-hover-effect"
                />
                <PostMediaComponent
                  @click="onClickPostMedia(data.medias, 2)"
                  :dataSource="data.medias[2]"
                  :isThumbnail="true"
                  class="app-hover-effect"
                />
              </div>
            </div>
          </template>
          <template v-else>
            <!-- Layout 4 item trở lên -->
            <div class="post-component__media__container container-4">
              <div class="container-4__section-left">
                <PostMediaComponent
                  @click="onClickPostMedia(data.medias, 0)"
                  :dataSource="data.medias[0]"
                  class="app-hover-effect"
                />
              </div>
              <div class="container-4__section-right">
                <PostMediaComponent
                  @click="onClickPostMedia(data.medias, 1)"
                  :dataSource="data.medias[1]"
                  :isThumbnail="true"
                  class="app-hover-effect"
                />
                <PostMediaComponent
                  @click="onClickPostMedia(data.medias, 2)"
                  :dataSource="data.medias[2]"
                  :isThumbnail="true"
                  class="app-hover-effect"
                />
                <template v-if="data.medias.length === 4">
                  <PostMediaComponent
                    @click="onClickPostMedia(data.medias, 3)"
                    :dataSource="data.medias[3]"
                    :isThumbnail="true"
                    class="app-hover-effect"
                  />
                </template>
                <template v-else>
                  <div
                    class="container-4__section-right__item-more app-hover-effect"
                    @click="onClickPostMedia(data.medias, 3)"
                  >
                    <PostMediaComponent :dataSource="data.medias[3]" />
                    <div class="container-4__section-right__item-more__overlay">{{ data.medias.length - 4 }}+</div>
                  </div>
                </template>
              </div>
            </div>
          </template>
        </div>
        <!-- Khảo sát -->
        <div v-if="data.dataSource.poll && data.dataSource.poll.length" class="post-component__poll">
          <!-- Component Khảo sát -->
          <template v-for="item in data.dataSource.poll" :key="item.id">
            <PostPollComponent :modelValue="item" :post="data.dataSource" />
          </template>
        </div>
        <!-- Like/Share/Comment -->
        <div v-if="!data.type" class="post-component__action unselectable">
          <div class="post-component__action__user-actions">
            <div
              class="post-component__action__user-actions__item clickable"
              @click="toggleLikePost(data.dataSource.id)"
            >
              <img v-if="!data.dataSource.isFavorite" src="@/assets/icons/simple/icon_like.svg" />
              <img v-if="data.dataSource.isFavorite" src="@/assets/icons/colorful/icon_like.svg" />
              {{ data.dataSource.totalFavorites }} thích
            </div>
            <div class="post-component__action__user-actions__item clickable" @click="showComment">
              <img src="@/assets/icons/simple/icon_comment.svg" />
              {{ data.dataSource.totalComments }} bình luận
            </div>
            <div class="post-component__action__user-actions__item clickable" @click="handleShare">
              <img src="@/assets/icons/simple/icon_share.svg" />
              <!-- {{ data.dataSource.totalShares }}  -->
              chia sẻ
            </div>
          </div>
          <div class="post-component__action__bookmark">
            <template v-if="data.dataSource.isPinned">
              <img src="@/assets/icons/colorful/icon_bookmarked.svg" />
            </template>
            <template v-else>
              <img src="@/assets/icons/colorful/icon_bookmark.svg" />
            </template>
          </div>
        </div>
        <!-- Bình luận -->
        <template v-if="data.showComment && !data.type && data.dataSource.allowComment !== TypeAllowCommentEnum.HIDDEN">
          <!-- Danh sách bình luận -->
          <PostMultiCommentComponent
            @changeTotal="(value) => (data.dataSource.totalComments = value)"
            :id="data.dataSource.id"
            :isJoinGroup="data.isJoinGroup"
          >
            <template v-slot:comment--writer v-if="data.dataSource.allowComment === TypeAllowCommentEnum.OFF">
              <div class="allow-comment-style">Bài viết đã khóa bình luận</div>
            </template>
            <template v-slot:comment--writer v-else-if="!data.isJoinGroup">
              <div class="allow-comment-style">Bạn chưa theo dõi nhóm này, nên không thể bình luận.</div>
            </template>
          </PostMultiCommentComponent>
        </template>
        <template v-if="data.showComment && !data.type && data.dataSource.allowComment === TypeAllowCommentEnum.HIDDEN">
          <div class="allow-comment-style">Bài viết đã ẩn bình luận</div>
        </template>
        <!-- Form action -->
        <template v-if="data.type">
          <template v-if="data.type === GroupPostTypeEnum.MY_POST_WAITING">
            <div class="post-component__actions">
              <button @click="handleDialogPostVisible(true, data.type)" class="app-btn app-btn-large">Xóa</button>
              <button @click="editPost()" class="app-btn app-btn-primary app-btn-large">Chỉnh sửa</button>
            </div>
          </template>
          <template
            v-else-if="[GroupPostTypeEnum.MY_POST_INACTIVE, GroupPostTypeEnum.MY_POST_ACTIVE].includes(data.type)"
          >
            <div class="post-component__actions">
              <button @click="viewDetailPost(data.dataSource.id)" class="app-btn app-btn-large">Xem bài viết</button>
            </div>
          </template>
          <template v-else-if="data.type === GroupPostTypeEnum.MANAGE_POST_WAITING">
            <div class="post-component__actions">
              <button @click="handleDialogHidePostVisible(true)" class="app-btn app-btn-large">Ẩn bài</button>
              <button @click="approvePost()" class="app-btn app-btn-primary app-btn-large">Duyệt bài</button>
            </div>
          </template>
          <template v-else-if="data.type === GroupPostTypeEnum.MANAGE_POST_ACTIVE">
            <div class="post-component__actions">
              <button @click="handleDialogRejectPostVisible(true)" class="app-btn app-btn-large">
                Gỡ bài đăng khỏi nhóm
              </button>
            </div>
          </template>
          <template v-else-if="data.type === GroupPostTypeEnum.MANAGE_POST_INACTIVE">
            <div class="post-component__actions">
              <button @click="approvePost()" class="app-btn app-btn-primary app-btn-large">Duyệt lại</button>
              <button @click="handleDialogPostVisible(true, data.type)" class="app-btn app-btn-large">
                Xóa vĩnh viễn
              </button>
            </div>
          </template>
        </template>
      </template>
    </div>
  </TransitionRoot>
  <el-dialog v-model="data.historyEditVisible" width="800px" custom-class="app-dialog post-history-dialog">
    <template #title>
      <span class="app-dialog-title">Lịch sử chỉnh sửa</span>
    </template>
    <template v-if="data.dataSource.histories && data.dataSource.histories.length">
      <div class="post-history-dialog__container">
        <div v-for="item in data.dataSource.histories" :key="item.id">
          <PostHistoryComponent :modelValue="item" />
        </div>
      </div>
    </template>
    <template v-else>
      <AppEmptyComponent title="Không có lịch sử bài viết" />
    </template>
    <div class="app-dialog-content__actions">
      <button @click="viewHistory(false)" class="app-btn">Đóng</button>
    </div>
  </el-dialog>
  <el-dialog v-model="data.dialogPost.dialogPostVisible" width="500px" custom-class="app-dialog">
    <template #title>
      <span class="app-dialog-title">{{ data.dialogPost.title }}</span>
    </template>
    <div class="app-dialog-content">
      <span>{{ data.dialogPost.content }}</span>
      <div class="app-dialog-content__actions">
        <button @click="handleDialogPostVisible(false, null)" class="app-btn">huỷ</button>
        <button @click="handleSubmitRemovePost(data.dataSource.id)" class="app-btn app-btn-primary">Xóa</button>
      </div>
    </div>
  </el-dialog>
  <el-dialog v-model="data.dialogRejectPost.dialogPostVisible" width="500px" custom-class="app-dialog">
    <template #title>
      <span class="app-dialog-title">Gỡ bài đăng ra khỏi nhóm</span>
    </template>
    <div class="app-dialog-content">
      <Form
        validate-on-submit
        :validation-schema="formValidation"
        :initial-values="formData"
        @submit="handleSubmitReasonReject"
        class="group-detail-aside-component__dialog-form"
      >
        <Field name="reasonReject" v-slot="{ field, handleChange, handleBlur, errorMessage }">
          <div class="app-input">
            <label class="app-input__form__label">Lý do<span class="app-input__form__label-required">*</span></label>
            <el-input
              :modelValue="field.value"
              @input="handleChange"
              @blur="handleBlur"
              size="small"
              placeholder="Nhập lý do từ chối"
              class="input-form"
            >
              <template #append>
                <div class="underline" :class="{ invalid: errorMessage }"></div>
              </template>
            </el-input>
            <div v-if="errorMessage" class="input-error">
              <img src="@/assets/icons/colorful/icon_error.svg" alt="form-error" />
              <span class="form-error">{{ errorMessage }}</span>
            </div>
          </div>
        </Field>
        <div class="app-dialog-content__actions">
          <button type="button" @click="handleDialogRejectPostVisible(false)" class="app-btn">huỷ</button>
          <button type="submit" class="app-btn app-btn-primary">lưu</button>
        </div>
      </Form>
    </div>
  </el-dialog>
  <el-dialog v-model="data.dialogHidePost.dialogPostVisible" width="500px" custom-class="app-dialog">
    <template #title>
      <span class="app-dialog-title">Bạn muốn từ chối bài viết</span>
    </template>
    <div class="app-dialog-content">
      <Form
        validate-on-submit
        :validation-schema="formValidation"
        :initial-values="formData"
        @submit="hiddenPost"
        class="group-detail-aside-component__dialog-form"
      >
        <Field name="reasonReject" v-slot="{ field, handleChange, handleBlur, errorMessage }">
          <div class="app-input">
            <label class="app-input__form__label"
              >Nêu lý do từ chối<span class="app-input__form__label-required">*</span></label
            >
            <el-input
              :modelValue="field.value"
              @input="handleChange"
              @blur="handleBlur"
              size="small"
              placeholder="Nội dung"
              class="input-form"
            >
              <template #append>
                <div class="underline" :class="{ invalid: errorMessage }"></div>
              </template>
            </el-input>
            <div v-if="errorMessage" class="input-error">
              <img src="@/assets/icons/colorful/icon_error.svg" alt="form-error" />
              <span class="form-error">{{ errorMessage }}</span>
            </div>
          </div>
        </Field>
        <div class="app-dialog-content__actions">
          <button type="button" @click="handleDialogHidePostVisible(false)" class="app-btn">huỷ</button>
          <button type="submit" class="app-btn app-btn-primary">Xác nhận</button>
        </div>
      </Form>
    </div>
  </el-dialog>
  <el-dialog v-model="data.dialogComment.dialogPostVisible" width="500px" custom-class="app-dialog">
    <template #title>
      <span class="app-dialog-title">Bài viết</span>
    </template>

    <div class="app-dialog-content">
      <template v-if="data.isSendRequest">
        <span
          >Bạn chưa thể bình luận bài viết này. Yêu cầu tham gia của bạn đã được gửi thành công. Vui lòng đợi Admin
          duyệt</span
        >
      </template>
      <template v-else>
        <span>Tham gia nhóm để đăng bài, viết bình luận</span>
      </template>
      <div class="app-dialog-content__actions">
        <template v-if="data.isSendRequest">
          <button class="app-btn app-btn-primary" @click="handleCancelJoinGroup(data.dataSource.group.id)">
            <span>Hủy tham gia nhóm</span>
          </button>
        </template>
        <template v-else>
          <button class="app-btn app-btn-primary" @click="handleJoinGroup(data.dataSource.group.id)">
            <span>Tham gia nhóm</span>
          </button>
        </template>
      </div>
    </div>
  </el-dialog>
  <UserDetailDialog v-model="data.dialogUserDetail.model" v-model:visible="data.dialogUserDetail.visible" />
  <template v-if="data.commentSetting && data.commentSetting.visible">
    <PostCommentSettingDialog
      :visible="data.commentSetting && data.commentSetting.visible"
      :id="data.dataSource.id"
      @close="onClosePostCommentSetting"
    />
  </template>
  <template v-if="data.isEdit">
    <PostCreatorDialog
      :visible="true"
      :group="data.dataSource.group"
      :isPoll="!isEmpty(data.dataSource.poll)"
      :poll="data.dataSource.poll"
      :description="data.dataSource.description"
      :medias="data.medias"
      :documents="data.files"
      :postStatus="data.dataSource.requestStatusPost"
      @close="data.isEdit = false"
      @register="onEditPost"
    >
      <template v-slot:title-post> Sửa bài viết </template>
      <template v-slot:title-poll> Sửa bài khảo sát </template>
    </PostCreatorDialog>
  </template>
</template>

<style lang="scss" scoped>
.post-component {
  width: 100%;
  padding: 25px;
  background-color: #ffffff;
  border: $border;
  border-radius: $borderRadius;
  & > *:not(:last-child) {
    margin-bottom: 10px;
  }
  &__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    &__info-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      &__avatar {
        margin-right: 10px;
        cursor: pointer;
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      &__title-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        & > *:not(:last-child) {
          margin-right: 10px;
        }
        svg {
          fill: #5a5a5a;
        }
      }
      &__title {
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        text-transform: uppercase;
        color: #0f0f0f;
        text-decoration: none;
      }
      &__subtitle {
        font-style: normal;
        font-weight: normal;
        font-size: 13px;
        color: #a7a7a7;
      }
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
  }
  &__content {
    font-size: 14px;
    line-height: 1.5;
    color: #0f0f0f;
    word-break: break-word;

    & > span {
      white-space: break-spaces;
    }
  }
  &__file {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    &__item {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      column-gap: 15px;
      &__icon {
        width: 60px;
        height: 60px;
        border: $border;
        border-radius: $borderRadius;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      &__download {
        margin-right: 10px;
        width: 30px;
        height: 30px;
        cursor: pointer;
        border-radius: 50%;
        background-color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      &__info {
        flex: 1;
        display: flex;
        flex-direction: column;
        word-wrap: break-word;
      }
      &__file-name {
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        color: #0f0f0f;
      }
      &__file-size {
        font-style: normal;
        font-weight: 300;
        font-size: 12px;
        color: $colorNeutral;
      }
    }
  }
  &__media {
    position: relative;
    width: 100%;
    padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
    &__container {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }
  &__action {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    &__user-actions {
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      column-gap: 10px;
      &__item {
        min-width: 140px;
        padding: 5px 0;
        border-radius: $borderRadiusSmall;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        column-gap: 5px;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        background: #ffffff;
        color: $colorNeutral;
        fill: #5a5a5a;
        &.clickable {
          cursor: pointer;
        }
        &:hover {
          color: $colorPrimary;
        }
      }
    }
    &__bookmark {
      width: 30px;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
    }
  }
  &__poll {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    row-gap: 15px;
  }
  &__comment {
    display: flex;
    flex-direction: row;
    align-items: center;
    &__avatar {
      margin-right: 10px;
      width: 35px;
      height: 35px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    &__input {
      position: relative;
      flex: 1;
      padding-left: 16px;
      padding-right: 46px;
      background: #f2f2f2;
      border-radius: 100px;
      input {
        width: 100%;
        border: none;
        outline: none;
        padding: 0;
        background: transparent;
        height: 42px;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        color: #0f0f0f;
        &::placeholder {
          color: #a7a7a7;
        }
      }
      &__send-icon {
        position: absolute;
        top: calc(42px / 2 - 15px);
        right: 6px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        fill: #d6d6d6;
        &:hover {
          fill: $colorActive;
        }
      }
    }
  }
  &__actions {
    padding-top: 15px;
    display: flex;
    flex-direction: row;
    column-gap: 15px;
    justify-content: center;
    button {
      width: 40%;
      max-width: 300px;
    }
  }
  .container-1 {
    flex: 1;
  }
  .container-2 {
    flex: 1;
    display: flex;
    flex-direction: row;
    column-gap: 5px;
  }
  .container-3 {
    flex: 1;
    display: flex;
    flex-direction: row;
    column-gap: 5px;
    &__section-left {
      flex: 2;
    }
    &__section-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      row-gap: 5px;
    }
  }
  .container-4 {
    flex: 1;
    display: flex;
    flex-direction: row;
    column-gap: 6px;
    &__section-left {
      flex: 3;
    }
    &__section-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      row-gap: 6px;
      &__item-more {
        cursor: pointer;
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: $borderRadius;
        overflow: hidden;
        &__overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
          font-size: 28px;
          color: #ffffff;
        }
      }
    }
  }
  .post-media-component {
    cursor: pointer;
  }
  .allow-comment-style {
    text-align: center;
    color: #dd0000;
  }
}
.post-history-dialog {
  &__container {
    overflow: auto;
    height: 60vh;
    padding: 0 10px;
  }
  .app-empty {
    border: none;
  }
}
</style>

<script lang="ts">
// Composition API
import { computed, defineComponent, inject, onMounted, onUnmounted, reactive, Ref, watch } from 'vue';
import { Form, Field } from 'vee-validate';
import * as yup from 'yup';
import { Popover, PopoverButton, PopoverPanel, TransitionRoot } from '@headlessui/vue';
import { cloneDeep, map, isEmpty, isNil, keys } from 'lodash';
import linkifyHtml from 'linkify-html';
import PostMediaComponent from '@/components/features/group/PostMediaComponent.vue';
import AppCarouselComponent from '@/components/features/group/AppCarouselComponent.vue';
import PostMultiCommentComponent from '@/components/features/group/PostMultiCommentComponent.vue';
import PostHistoryComponent from '@/components/features/group/PostHistoryComponent.vue';
import PostPollComponent from '@/components/features/group/PostPollComponent.vue';
import UserDetailDialog from '@/components/features/user-profile/UserDetailDialog.vue';
import UserAvatarComponent from '@/components/features/user-profile/UserAvatarComponent.vue';
import PostCreatorDialog from '@/components/features/group/PostCreatorDialog.vue';
import PostCommentSettingDialog from '@/components/features/group/PostCommentSettingDialog.vue';

import { useInit, formatDate, encapsulateUrl, downloadFile } from '@/services/shared/utils';
import {
  getTimeSince,
  toggleLikeGroupPost,
  toggleFollowGroupPost,
  togglePinnedGroupPost,
  shareGroupPost,
  removeGroupPost,
  approveGroupPost,
  findGroupPostById,
  updateGrouppost,
  uploadFile,
  joinGroup,
  cancleJoinGroup,
} from '@/services/features/group/group.service';
import {
  GroupPostModel,
  GroupPostTypeEnum,
  PostMediaTypeEnum,
  PostStatusEnum,
  UpdateGroupPostModel,
  TypeAllowCommentEnum,
} from '@/services/features/group/group.model';
import { AppConstant } from '@/app.constant';
import { Client, FrameImpl, StompSubscription } from '@stomp/stompjs';

// Định nghĩa data type của component [props] bằng Typescript
class PostComponentProps {
  modelValue: GroupPostModel;
  type: string;
  isJoinGroup: boolean;
  isSendRequest: boolean;
}

// Định nghĩa data type của component [data] bằng Typescript
class PostComponentData {
  isLoading: boolean;
  isShowing: boolean;
  showComment: boolean;
  dataSource: GroupPostModel | null;
  type: string;
  isJoinGroup: boolean;
  isSendRequest: boolean;
  medias: any[] | null;
  files: any[] | null;
  carousel: any;
  dialogPost: any;
  dialogRejectPost: any;
  dialogHidePost: any;
  dialogComment: any;
  historyEditVisible: boolean;
  dialogUserDetail: any;
  commentSetting: any;
  isEdit: boolean;
}

// Định nghĩa enum thứ tự hiển thị media bằng Typescript
enum PostMediaDisplayOrder {
  First = 0,
  Second = 1,
  Third = 2,
  Fourth = 3,
  More = 4,
}

export default defineComponent({
  name: 'PostComponent',
  components: {
    Popover,
    PopoverButton,
    PopoverPanel,
    TransitionRoot,
    PostMediaComponent,
    AppCarouselComponent,
    PostMultiCommentComponent,
    PostHistoryComponent,
    PostPollComponent,
    Form,
    Field,
    UserDetailDialog,
    UserAvatarComponent,
    PostCreatorDialog,
    PostCommentSettingDialog,
  },
  props: {
    modelValue: {
      type: GroupPostModel,
      default: null,
      required: true,
    },
    type: {
      type: String,
      default: null,
    },
    isJoinGroup: {
      type: Boolean,
      default: false,
    },
    isSendRequest: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'isSendRequestJoinGroup'],
  setup(props: PostComponentProps, { emit }: any) {
    // Setup Default
    const { base, isLoggedIn, userId } = useInit();
    const stompClient: Ref<Client | null> | undefined = inject(AppConstant.PROVIDER_STOMP_CLIENT);
    let stompClientSubscription: StompSubscription | null = null;
    const data = reactive<PostComponentData>({
      isLoading: false,
      isShowing: true,
      showComment: false,
      dataSource: { ...props.modelValue }, // Lưu vào biến thuộc component để xử lý nội bộ
      type: props.type,
      isJoinGroup: props.isJoinGroup,
      isSendRequest: props.isSendRequest,
      medias: null,
      files: null,
      carousel: {
        visible: false,
        items: [],
        selected: 0,
      },
      dialogPost: {
        dialogPostVisible: false,
        title: null,
        content: null,
      },
      dialogRejectPost: {
        dialogPostVisible: false,
      },
      dialogHidePost: {
        dialogPostVisible: false,
      },
      dialogComment: {
        dialogPostVisible: false,
      },
      historyEditVisible: false,
      dialogUserDetail: {
        visible: false,
        model: props.modelValue ? props.modelValue.user : null,
      },
      isEdit: false,
      commentSetting: { visible: false },
    });

    watch(
      () => props.isSendRequest,
      (newValue, oldValue) => {
        data.isSendRequest = newValue || false;
      }
    );

    // Setup Form
    const formData = {
      reasonReject: data.dataSource?.reasonReject,
    };
    const formValidation = yup.object().shape({
      reasonReject: yup.string().label('Lý do').required('Vui lòng nhập lý do!'),
    });

    const isCreator = computed(() => {
      const loginUserId = userId;
      if (data.dataSource && data.dataSource.user) {
        return (data.dataSource.user as any).id === loginUserId;
      }
      return false;
    });

    const splitMedias = () => {
      // Tách file image/video ra từ mảng [medias]
      if (data.dataSource && data.dataSource.medias) {
        let newMedias = cloneDeep(data.dataSource.medias);
        newMedias = newMedias.filter((item) => item.type && item.type.toUpperCase() !== PostMediaTypeEnum.FILE);
        // Gom 2 item type THUMBNAIL và VIDEO lại làm 1
        const mediaVideoIndex = newMedias.findIndex((item) => item.type === PostMediaTypeEnum.VIDEO);
        if (mediaVideoIndex > -1) {
          const mediaThumbnail = newMedias.find((item) => item.type === PostMediaTypeEnum.THUMBNAIL);
          newMedias[mediaVideoIndex].thumbnail = mediaThumbnail ? mediaThumbnail.url : null;
          newMedias = newMedias.filter((item) => item.type !== PostMediaTypeEnum.THUMBNAIL);
        }
        data.medias = newMedias;
      }

      // Tách file tài liệu ra từ mảng [medias]
      if (data.dataSource && data.dataSource.medias) {
        let newFiles = cloneDeep(data.dataSource.medias);
        newFiles = newFiles
          .filter((item) => item.type && item.type.toUpperCase() === PostMediaTypeEnum.FILE)
          .map((item) => {
            if (item.url) {
              const paths = item.url.split('/');
              // Remove UUID
              item.fileName = paths[paths.length - 1].substring(14);
              item.name = paths[paths.length - 1].substring(14);
            }
            return item;
          });
        data.files = newFiles;
      }
    };

    splitMedias();

    // Functions
    const goToGroupDetailPage = (id: string) => base.router.push({ name: 'group-detail', params: { id } });

    // Dialog thông báo đăng nhập
    const toggleDialogLogin = (isLogin: boolean) => {
      if (!isLogin) {
        base.router.push({ name: 'login', query: { redirect: base.route.path } });
      }
    };

    // Gửi yêu cầu tham gia nhóm
    const handleJoinGroup = async (id: string) => {
      if (isLoggedIn.value) {
        await joinGroup(id);
        // Update lại UI
        if (data.dataSource) {
          data.isSendRequest = true;
          return emit('isSendRequestJoinGroup', true);
        }
      } else {
        toggleDialogLogin(false);
      }
    };

    const handleCancelJoinGroup = async (id: string) => {
      await cancleJoinGroup(id);
      // Update lại UI
      if (data.dataSource) {
        data.isSendRequest = false;
        return emit('isSendRequestJoinGroup', false);
      }
    };

    // Thích/bỏ thích bài viết
    const toggleLikePost = async (id: string) => {
      if (!isLoggedIn.value) {
        return;
      }
      if (data.dataSource) {
        data.dataSource.isFavorite = !data.dataSource.isFavorite;
        if (data.dataSource.isFavorite) {
          data.dataSource.totalFavorites = data.dataSource.totalFavorites + 1;
        } else {
          data.dataSource.totalFavorites = data.dataSource.totalFavorites - 1;
        }
      }
      await toggleLikeGroupPost(id);
    };

    // Ghim/bỏ ghim bài viết
    const handleTogglePinnedPost = async (id: string) => {
      if (data.dataSource) {
        data.dataSource.isPinned = !data.dataSource.isPinned;
      }
      await togglePinnedGroupPost(id);
    };

    // Theo dõi/bỏ theo dõi bài viết
    const toggleFollowPost = async (id: string) => {
      if (data.dataSource) {
        data.dataSource.isFollow = !data.dataSource.isFollow;
      }
      await toggleFollowGroupPost(id);
    };

    // Hiện lịch sử bài viết
    const viewHistory = (isVisible: boolean) => (data.historyEditVisible = isVisible);

    // Ẩn/hiện dialog bài viết
    const handleDialogPostVisible = (isVisible: boolean, type: string | null) => {
      data.dialogPost.dialogPostVisible = isVisible;
      if (type) {
        switch (type) {
          case GroupPostTypeEnum.MY_POST_WAITING:
          case GroupPostTypeEnum.MY_POST_ACTIVE:
            data.dialogPost.title = 'Xóa bài viết';
            data.dialogPost.content = 'Bạn có chắc chắn muốn xóa bài viết?';
            break;
          case GroupPostTypeEnum.MANAGE_POST_INACTIVE:
            data.dialogPost.title = 'Xóa vĩnh viễn bài viết';
            data.dialogPost.content = 'Bạn có chắc chắn muốn xóa vĩnh viễn bài viết?';
            break;
          default:
            break;
        }
      }
    };

    // Submit dialog bài viết
    const handleSubmitRemovePost = async () => {
      handleDialogPostVisible(false, null);
      if (data.dataSource && data.dataSource.id) {
        await removeGroupPost(data.dataSource.id);
        base.toast.success('Xóa thành công');
        emit('update:modelValue', new GroupPostModel(data.dataSource));
        data.isShowing = false;
      }
    };

    // Ẩn/hiện dialog lý do từ chối bài viết
    const handleDialogRejectPostVisible = (isVisible: boolean) => {
      data.dialogRejectPost.dialogPostVisible = isVisible;
    };
    // Ẩn/hiện dialog lý do ẩn bài viết
    const handleDialogHidePostVisible = (isVisible: boolean) => {
      data.dialogHidePost.dialogPostVisible = isVisible;
    };

    // Submit dialog lý do từ chối bài viết
    const handleSubmitReasonReject = async (values: { reasonReject: string }) => {
      handleDialogRejectPostVisible(false);
      if (data.dataSource && data.dataSource.id) {
        const model = {
          id: data.dataSource.id,
          reasonReject: values.reasonReject,
          action: PostStatusEnum.REJECT,
        };
        await approveGroupPost(model);
        base.toast.success('Đã gỡ bài đăng');
        // Update UI
        emit('update:modelValue', new GroupPostModel(data.dataSource));
        data.isShowing = false;
      }
    };

    const approvePost = async () => {
      if (data.dataSource && data.dataSource.id) {
        const model = {
          id: data.dataSource.id,
          action: PostStatusEnum.APPROVE,
        };
        await approveGroupPost(model);
        base.toast.success('Duyệt thành công');
        // Update UI
        emit('update:modelValue', new GroupPostModel(data.dataSource));
        data.isShowing = false;
      }
    };

    const hiddenPost = async (values: any) => {
      handleDialogHidePostVisible(false);
      if (data.dataSource && data.dataSource.id) {
        const model = {
          id: data.dataSource.id,
          reasonReject: values.reasonReject,
          action: PostStatusEnum.REJECT,
        };
        await approveGroupPost(model);
        base.toast.success('Ẩn thành công bài viết');
        emit('update:modelValue', new GroupPostModel(data.dataSource));
        data.isShowing = false;
      }
    };

    const viewDetailPost = (id: string) => base.router.push({ name: 'group-post-detail', params: { id } });
    const editPost = () => {
      data.isEdit = true;
    };

    // Ẩn/hiện dialog user
    const handleDialogUserVisible = (isVisible: boolean) => {
      data.dialogUserDetail.visible = isVisible;
    };

    // Share bài viết
    const handleShare = async () => {
      if (data.dataSource) {
        // khi user ấn vào share sẽ không call api để count tăng số lượng share
        // await shareGroupPost(data.dataSource.id);
        await navigator.clipboard.writeText(data.dataSource.shareUrl);
        data.dataSource.totalShares = data.dataSource.totalShares + 1;
        base.toast.success('Đã sao chép đường dẫn chia sẻ bài viết vào bộ nhớ tạm.');
      }
    };

    // Hiển thị Carousel ảnh
    const onClickPostMedia = (medias: any[], index: number) => {
      const selectedItem = medias[index];
      // Chỉ mở carousel nếu click vào image (để tránh mở khi thao tác trực tiếp với controls trên video)
      const isMoreMedia = index >= 3 && medias.length > 4;
      if (
        (selectedItem && selectedItem.type && selectedItem.type.toUpperCase() === PostMediaTypeEnum.IMAGE) ||
        isMoreMedia
      ) {
        data.carousel.visible = true;
        data.carousel.items = medias;
        if (index === PostMediaDisplayOrder.More) {
          data.carousel.selected = PostMediaDisplayOrder.First;
        }
        if (index < PostMediaDisplayOrder.More) {
          data.carousel.selected = index;
        }
      }
    };

    // Đóng carousel
    const onCloseCarousel = () => {
      data.carousel.visible = false;
    };

    // Hiện phần bình luận
    const showComment = () => {
      if (!data.showComment) {
        data.showComment = true;
      }
      if (!data.isJoinGroup) {
        data.dialogComment.dialogPostVisible = true;
      }
    };

    const onEditPost = async (model: UpdateGroupPostModel) => {
      console.log('model', model);

      data.isEdit = false;
      if (!model.id && data.dataSource) {
        model.id = data.dataSource.id;
      }
      model.medias.filter((media) => media && !isEmpty(keys(media)));
      await Promise.all(
        map(model.medias, async (media) => {
          if (isNil(media.file)) {
            return;
          }
          const response = await uploadFile(media.file, { createThumbnail: true });

          let fileType = PostMediaTypeEnum.FILE;

          if (response && response.result) {
            media.type = fileType;
            media.thumbnail = response.result.thumbnail;
            media.url = response.result.url;
            if (response.result.imageInfo) {
              fileType = PostMediaTypeEnum.IMAGE;
              media.type = fileType;
              media.thumbnail = response.result.thumbnail;
              media.url = response.result.absoluteUrl;
            }
            if (response.result.fileType) {
              fileType = response.result.fileType.toUpperCase();
              media.type = fileType;
              media.thumbnail = response.result.thumbnail;
              media.url = response.result.url;
            }
          }
        })
      );

      if (!model.id || !data.dataSource) {
        return;
      } else {
        let newMedias = cloneDeep(model.medias);
        newMedias = newMedias.filter((item) => item.type && item.type.toUpperCase() !== PostMediaTypeEnum.FILE);
        const mediaVideoIndex = newMedias.findIndex((item) => item.type === PostMediaTypeEnum.VIDEO);
        if (mediaVideoIndex > -1) {
          model.medias.push({
            type: 'THUMBNAIL',
            thumbnail: null,
            url: newMedias[mediaVideoIndex].thumbnail,
          });
        }
      }
      await updateGrouppost(model);

      const groupPostResponse = await findGroupPostById(data.dataSource.id);
      if (groupPostResponse.isSuccess && groupPostResponse.result) {
        data.dataSource = { ...groupPostResponse.result };
        splitMedias();
        base.toast.success('Sửa thành công');
      }
    };

    const onClosePostCommentSetting = (allowComment: TypeAllowCommentEnum) => {
      data.commentSetting.visible = false;
      if (!data.dataSource) {
        return;
      }
      data.dataSource.allowComment = allowComment;
    };

    // Subscribe Realtime: channel bài đăng
    const subscribeRealtime = async (handler: (message: any) => void) => {
      if (data.dataSource && data.dataSource.id && stompClient && stompClient.value) {
        stompClientSubscription = stompClient.value.subscribe(
          `${AppConstant.SERVICE_WS_CHANNEL}.social.groupPost-${data.dataSource.id}`,
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

    // Watch
    watch(
      () => props.modelValue,
      (newValue, oldValue) => {
        data.dataSource = newValue || null;
        if (data.dataSource && data.dataSource.poll) {
          subscribeRealtime(async (message: FrameImpl) => {
            const messageData = JSON.parse(message.body);
            switch (messageData.eventName) {
              // Lọc tất cả event update bình luận
              case AppConstant.REALTIME_EVENT.POLL_UPDATED: {
                // Load lại chi tiết bài đăng, cập nhật poll
                if (data.dataSource) {
                  const groupPostResponse = await findGroupPostById(data.dataSource.id);
                  if (!groupPostResponse.isSuccess) {
                    return;
                  }
                  data.dataSource.poll = groupPostResponse.result?.poll;
                }
                break;
              }
            }
          });
        }
      }
    );

    // Life circle
    onMounted(() => {
      if (data.dataSource && data.dataSource.poll) {
        subscribeRealtime(async (message: FrameImpl) => {
          const messageData = JSON.parse(message.body);
          switch (messageData.eventName) {
            // Lọc tất cả event update bình luận
            case AppConstant.REALTIME_EVENT.POLL_UPDATED: {
              // Load lại chi tiết bài đăng, cập nhật poll
              if (data.dataSource) {
                const groupPostResponse = await findGroupPostById(data.dataSource.id);
                if (!groupPostResponse.isSuccess) {
                  return;
                }
                data.dataSource.poll = groupPostResponse.result?.poll;
              }
              break;
            }
          }
        });
      }
    });
    onUnmounted(() => {
      // Unsubscribe khi bài đăng bị đóng/hủy
      unsubscribeRealtime();
    });

    return {
      linkifyHtml,
      formatDate,
      encapsulateUrl,
      // Enum
      GroupPostTypeEnum,
      TypeAllowCommentEnum,
      // Component reactive data
      data,
      isCreator,
      formValidation,
      formData,
      isLoggedIn,
      // Functions
      getTimeSince,
      goToGroupDetailPage,
      toggleLikePost,
      handleTogglePinnedPost,
      toggleFollowPost,
      viewHistory,
      handleDialogRejectPostVisible,
      handleDialogHidePostVisible,
      handleDialogPostVisible,
      handleSubmitRemovePost,
      approvePost,
      hiddenPost,
      handleSubmitReasonReject,
      downloadFile,
      showComment,
      handleShare,
      onClickPostMedia,
      onCloseCarousel,
      viewDetailPost,
      editPost,
      handleDialogUserVisible,
      isEmpty,
      onEditPost,
      onClosePostCommentSetting,
      handleJoinGroup,
      handleCancelJoinGroup,
    };
  },
});
</script>
