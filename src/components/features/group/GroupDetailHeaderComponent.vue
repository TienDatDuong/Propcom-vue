<template>
  <div
    class="group-detail-header-component"
    :style="
      data.dataSource.coverImage && {
        'background': 'top / cover url(' + encapsulateUrl(data.dataSource.coverImage) + ')',
      }
    "
  >
    <img v-if="!data.dataSource.coverImage" src="@/assets/images/default_image.svg" />
    <div class="group-detail-header-component__overlay">
      <div class="container-xl group-detail-header-component__container">
        <div class="group-detail-header-component__breadcrumb">
          <template v-for="(item, index) in breadcrumb" :key="index">
            <router-link :to="{ name: item.routeName }">{{ item.text }}</router-link>
            <span v-if="index !== breadcrumb.length - 1"> / </span>
          </template>
        </div>

        <div class="group-detail-header-component__name-group">
          <div class="group-detail-header-component__name-group__section-left">
            <span class="group-detail-header-component__name-group__section-left__title">{{
              data.dataSource.name
            }}</span>
            <div class="group-detail-header-component__name-group__section-left__active-time">
              <div class="group-detail-header-component__name-group__section-left__active-time__img-wapper">
                <img src="@/assets/icons/colorful/icon_clock_white.svg" />
              </div>
              <span class="group-detail-header-component__name-group__section-left__active-time__text">{{
                `Hoạt động ${getTimeSince(data.dataSource.modifiedDate)} trước`
              }}</span>
            </div>
          </div>
          <div class="group-detail-header-component__name-group__section-right">
            <template v-if="data.dataSource.isAdmin || data.dataSource.isMember">
              <button disabled class="app-btn app-btn-secondary">
                <span>Đã tham gia</span>
                <img src="@/assets/icons/colorful/icon_checked.svg" />
              </button>
            </template>
            <template v-else-if="data.dataSource.isSendRequest">
              <button class="app-btn app-btn-primary" @click="handleCancelJoinGroup(data.dataSource.id)">
                <span>Hủy tham gia nhóm</span>
              </button>
            </template>
            <template v-else>
              <button class="app-btn app-btn-primary" @click="handleJoinGroup(data.dataSource.id)">
                <span>Tham gia nhóm</span>
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.group-detail-header-component {
  position: relative;
  width: 100%;
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background: linear-gradient(181.77deg, #DD0000 1.5%, #840000 146.62%);
  min-height: 100%;
  & img {
    height: 100%;
  }
  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(179.67deg, rgba(0, 0, 0, 0.2) 37.57%, rgba(0, 0, 0, 0.4) 82.62%);
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  &__container {
    height: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
  }
  &__breadcrumb,
  &__breadcrumb > a {
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    color: #ffffff;
    text-decoration: none;
  }
  &__name-group {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    &__section-left {
      display: flex;
      flex-direction: column;
      &__title {
        font-size: 28px;
        font-weight: 500;
        color: #ffffff;
      }
      &__active-time {
        display: flex;
        flex-direction: row;
        align-items: center;
        &__img-wapper {
          margin-right: 10px;
        }
        &__text {
          font-size: 14px;
          font-style: normal;
          font-weight: normal;
          color: #ffffff;
        }
      }
    }
    &__section-right {
      align-items: center;
    }
  }
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, watch, computed } from 'vue';
import { GroupModel } from '@/services/features/group/group.model';
import { cancleJoinGroup, getTimeSince, joinGroup } from '@/services/features/group/group.service';
import { encapsulateUrl, useInit } from '@/services/shared/utils';

// Định nghĩa data type của component [props] bằng Typescript
class GroupDetailHeaderComponentProps {
  modelValue: GroupModel;
}

// Định nghĩa data type của component [data] bằng Typescript
class GroupDetailHeaderComponentData {
  isLoading: boolean;
  dataSource: GroupModel;
}

export default defineComponent({
  name: 'GroupDetailHeaderComponent',
  props: {
    modelValue: {
      type: GroupModel,
      required: true,
    },
  },
  setup(props: GroupDetailHeaderComponentProps, { emit }: any) {
    const { base, isLoggedIn } = useInit();
    const data = reactive<GroupDetailHeaderComponentData>({
      isLoading: false,
      dataSource: { ...props.modelValue },
    });
    watch(
      () => props.modelValue,
      (newValue, oldValue) => {
        data.dataSource = newValue || null;
      }, {
        deep: true
      }
    );
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
          data.dataSource.isSendRequest = true;
        }
      } else {
        toggleDialogLogin(false);
      }
    };
    const handleCancelJoinGroup = async (id: string) => {
      await cancleJoinGroup(id);
      // Update lại UI
      if (data.dataSource) {
        data.dataSource.isSendRequest = false;
      }
    };
    watch(
      () => props.modelValue,
      (newValue, oldValue) => {
        data.dataSource = newValue;
      }
    );

    return {
      // Base
      breadcrumb: base.route.meta?.breadcrumb || [],
      // Component reactive data
      data,
      encapsulateUrl,
      handleJoinGroup,
      handleCancelJoinGroup,
      getTimeSince,
    };
  },
});
</script>
