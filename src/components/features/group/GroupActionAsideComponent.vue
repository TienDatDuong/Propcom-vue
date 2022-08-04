<template>
  <div class="group-action-aside-component" v-if="data.dataSource">
    <!-- <div class="group-action-aside-component__item" @click="handleShareGroup">
      <div class="group-action-aside-component__item__img-wapper">
        <img src="@/assets/icons/simple/icon_share.svg" />
      </div>
      <span>Chia sẻ</span>
    </div> -->
    <template v-if="data.dataSource.isFollow">
      <div class="group-action-aside-component__item" @click="handleUnFollowGroup">
        <div class="group-action-aside-component__item__img-wapper">
          <img src="@/assets/icons/simple/icon_unnotification.svg" />
        </div>
        <span>Bỏ theo dõi nhóm</span>
      </div>
    </template>
    <template v-if="!data.dataSource.isFollow && (data.dataSource.isMember || data.dataSource.isAdmin)">
      <div class="group-action-aside-component__item" @click="handleFollowGroup">
        <div class="group-action-aside-component__item__img-wapper">
          <img src="@/assets/icons/simple/icon_notification.svg" />
        </div>
        <span>Theo dõi nhóm</span>
      </div>
    </template>
    <template v-if="data.dataSource.isAdmin || data.dataSource.isMember">
      <div class="group-action-aside-component__item" @click="handleLeaveGroup">
        <div class="group-action-aside-component__item__img-wapper">
          <img src="@/assets/icons/simple/icon_logout.svg" />
        </div>
        <span>Rời nhóm</span>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.group-action-aside-component {
  width: 100%;
  margin-top: 5px;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: $borderRadius;
  border: $border;
  &__item {
    cursor: pointer;
    padding: 10px 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: $colorNeutral;
    &:hover,
    &:focus & {
      color: $colorPrimary;
    }
    &:hover &__img-wapper,
    &:focus &__img-wapper {
      fill: $colorPrimary;
    }
    &:not(:last-child) {
      border-bottom: $border;
    }
    &__img-wapper {
      width: 30px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin-right: 5px;
      fill: $colorNeutral;
    }
    span {
      flex: 1;
      font-size: 14px;
    }
  }
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, watch, computed } from 'vue';
import { GroupModel } from '@/services/features/group/group.model';
import { useInit } from '@/services/shared/utils';
import { toggleFollowGroup, shareGroup, leaveGroup } from '@/services/features/group/group.service';

// Định nghĩa data type của component [props] bằng Typescript
class GroupActionAsideComponentProps {
  modelValue?: GroupModel;
}

// Định nghĩa data type của component [data] bằng Typescript
class GroupActionAsideComponentData {
  isLoading: boolean;
  dataSource: GroupModel | null;
}

export default defineComponent({
  name: 'GroupActionAsideComponent',
  props: {
    modelValue: {
      type: GroupModel,
      required: false,
    },
  },
  emits: ['update:modelValue', 'isLogin' ],
  setup(props: GroupActionAsideComponentProps, { emit }: any) {
    const { base, isLoggedIn } = useInit();
    const data = reactive<GroupActionAsideComponentData>({
      isLoading: false,
      dataSource: props.modelValue ? { ...props.modelValue } : null,
    });
    watch(
      () => props.modelValue,
      (newValue, oldValue) => {
        data.dataSource = newValue || null;
      }
    );
    // Theo dõi nhóm
    const handleFollowGroup = async () => {
      if (!isLoggedIn.value) {return emit('isLogin', true);}
      if (data.dataSource) {
        await toggleFollowGroup(data.dataSource.id);
        data.dataSource.isFollow = true;
        emit('update:modelValue', new GroupModel(data.dataSource));
      }
    };
    // Hủy theo dõi nhóm
    const handleUnFollowGroup = async () => {
      if (!isLoggedIn.value) {return emit('isLogin', true);}
      if (data.dataSource) {
        await toggleFollowGroup(data.dataSource.id);
        data.dataSource.isFollow = false;
        emit('update:modelValue', new GroupModel(data.dataSource));
      }
    };
    // Chia sẻ nhóm
    const handleShareGroup = async () => {
      if (!isLoggedIn.value) {return emit('isLogin', true);}
      if (data.dataSource) {
        await shareGroup(data.dataSource.id);
        await navigator.clipboard.writeText(data.dataSource.shareUrl);
        base.toast.success('Đã sao chép đường dẫn chia sẻ nhóm vào bộ nhớ tạm.');
      }
    };
    // Rời nhóm
    const handleLeaveGroup = async () => {
      if (!isLoggedIn.value) {return emit('isLogin', true);}
      if (data.dataSource) {
        await leaveGroup(data.dataSource.id);
        base.router.push({ name: 'group' });
      }
    };

    return {
      data,
      // Function
      handleFollowGroup,
      handleUnFollowGroup,
      handleShareGroup,
      handleLeaveGroup,
    };
  },
});
</script>
