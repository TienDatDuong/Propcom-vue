<template>
  <div class="carousel-component" @click="onClickOutside">
    <img class="icon-close" src="@/assets/icons/simple/icon_close.svg" />
    <el-carousel
      :arrow="data.items.length > 1 ? 'always' : 'never'"
      :autoplay="false"
      :initial-index="data.selected"
      :loop="false"
      @change="onChangeSelected"
    >
      <el-carousel-item v-for="item in data.items" :key="item">
        <PostMediaComponent
          @click="onClickInside"
          :dataSource="item"
          class="app-hover-effect"
        />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style lang="scss" scoped>
.carousel-component {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  cursor: pointer;
  z-index: 2021;

  .icon-close {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 15px;
  }
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, onMounted, onUnmounted } from 'vue';
import PostMediaComponent from '@/components/features/group/PostMediaComponent.vue';
import { cloneDeep } from 'lodash';
class AppCarouselComponentProps {
  items: any[];
  selected: number;
}

class AppCarouselComponentData {
  items: any[];
  selected: number;
  isOutisde: boolean;
}

export default defineComponent({
  name: 'AppCarouselComponent',
  props: {
    items: {
      type: Array,
      required: true,
      default: () => [],
    },
    selected: {
      type: Number,
      require: true,
      default: () => null,
    },
  },
  components: {
    PostMediaComponent,
  },
  emits: ['click'],
  setup(props: AppCarouselComponentProps, { emit }: any) {
    const data = reactive<AppCarouselComponentData>({
      items: cloneDeep(props.items),
      selected: props.selected,
      isOutisde: true,
    });

    onMounted(async() => {
      document.body.style.overflow = 'hidden';
    });

    onUnmounted(async() => {
      document.body.style.overflow = '';
    });

    const onClickOutside = () => {
      if (!data.isOutisde) {
        data.isOutisde = true;
        return;
      }

      emit('clickOutside');
    };

    const onClickInside = (e: PointerEvent) => {
      data.isOutisde = false;
    };

    const onChangeSelected = (index: number) => {
      emit('selected', index);
    };

    return {
      data,
      onClickOutside,
      onClickInside,
      onChangeSelected,
    };
  },
});
</script>
