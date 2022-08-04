<template>
  <div class="user-avatar-component">
    <template v-if="data.imgSrc">
      <img :src="data.imgSrc" class="user-avatar-component__avatar" />
    </template>
    <template v-else-if="data.currentUser && data.currentUser.avatarUrl">
      <img :src="data.currentUser.avatarUrl" class="user-avatar-component__avatar" />
    </template>
    <template v-else-if="data.currentUser && data.currentUser.avatarThumbnailUrl">
      <img :src="data.currentUser.avatarThumbnailUrl" class="user-avatar-component__avatar" />
    </template>
    <template v-else-if="data.currentUser && data.currentUser.avatar">
      <img :src="data.currentUser.avatar" class="user-avatar-component__avatar" />
    </template>
    <template v-else>
      <img src="@/assets/images/default_avatar.svg" class="user-avatar-component__avatar" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.user-avatar-component {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  &__avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, watch } from 'vue';
import { useInit } from '@/services/shared/utils';

// Định nghĩa data type của component [props] bằng Typescript
class UserAvatarComponentProps {
  currentUser: any;
  imgSrc: string;
}

// Định nghĩa data type của component [data] bằng Typescript
class UserAvatarComponentData {
  currentUser: any | null;
  imgSrc: string | '';
}

export default defineComponent({
  name: 'UserAvatarComponent',
  props: {
    currentUser: {
      type: Object,
      default: null,
    },
    imgSrc: {
      type: String,
      default: '',
    },
  },
  setup(props: UserAvatarComponentProps, { emit }: any) {
    // Setup Default
    const { base } = useInit();
    const data = reactive<UserAvatarComponentData>({
      currentUser: props.currentUser,
      imgSrc: props.imgSrc,
    });

    watch(
      () => props.currentUser,
      (newValue, oldValue) => (data.currentUser = newValue)
    );
    watch(
      () => props.imgSrc,
      (newValue, oldValue) => (data.imgSrc = newValue)
    );
    return {
      // Component reactive data
      data,
    };
  },
});
</script>
