<template>
  <div class="post-user-in-group-component">
    <div
      class="post-user-in-group-component__avatar"
      :class="{
        large: large,
        medium: !large,
      }"
      @click="handleDialogUserVisible(true)"
    >
      <UserAvatarComponent :currentUser="user" />
    </div>
    <div class="d-flex flex-column">
      <div class="post-user-in-group-component__title-container">
        <a @click="handleDialogUserVisible(true)" href="javascript:;" class="post-user-in-group-component__title">
          {{ user?.name }}
        </a>
        <img v-if="group" src="@/assets/icons/simple/icon_vector.svg" />
        <a
          v-if="group"
          href="javascript:;"
          class="post-user-in-group-component__title"
          @click="goToGroupDetailPage(group.id)"
        >
          {{ group?.name }}
        </a>
      </div>
    </div>

    <UserDetailDialog v-model="data.dialogUserDetail.model" v-model:visible="data.dialogUserDetail.visible" />
  </div>
</template>

<style lang="scss" scoped>
.post-user-in-group-component {
  display: flex;
  align-items: center;
  padding: 10px 0px;

  &__avatar {
    &.medium {
      width: 35px;
      height: 35px;
    }
    &.large {
      width: 50px;
      height: 50px;
    }
    margin-right: 10px;
    img {
      cursor: pointer;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
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
}
</style>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue';
import { useInit } from '@/services/shared/utils';
import UserDetailDialog from '@/components/features/user-profile/UserDetailDialog.vue';
import UserAvatarComponent from '@/components/features/user-profile/UserAvatarComponent.vue';

class PostUserInGroupComponentProps {
  group: any;
  large: boolean;
}
class PostUserInGroupComponentData {
  dialogUserDetail: any;
}

export default defineComponent({
  name: 'PostUserInGroupComponent',
  components: {
    UserDetailDialog,
    UserAvatarComponent,
  },
  props: {
    group: {
      type: Object,
      default: null,
    },
    large: {
      type: Boolean,
      default: false,
    },
  },
  emit: ['goToGroup'],
  setup(props: PostUserInGroupComponentProps, { emit }: any) {
    const { base, currentUser } = useInit();
    const data = reactive<PostUserInGroupComponentData>({
      dialogUserDetail: {
        model: {},
        visible: false,
      },
    });
    const user = currentUser;

    const handleDialogUserVisible = (isVisible: boolean) => {
      data.dialogUserDetail.model = user.value;
      data.dialogUserDetail.visible = isVisible;
    };

    const goToGroupDetailPage = (id: string) => {
      base.router.push({ name: 'group-detail', params: { id } });
      emit('goToGroup', id);
    };

    return {
      data,
      user,
      handleDialogUserVisible,
      goToGroupDetailPage,
    };
  },
});
</script>
