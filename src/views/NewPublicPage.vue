<template>
  <div class="news-public-page">
    <div class="content-builder" v-html="data.content"></div>
  </div>
</template>

<style lang="scss" scoped>
.news-public-page {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  .content-builder {
    font-family: "Roboto", sans-serif;
    &.is-builder {
      padding: 15px 72px !important;
      min-height: unset;
    }
  }
  .action-area {
    position: absolute;
    top: 10px;
    right: 50px;
    button {
      margin-left: 30px;
    }
  }
  .is-browse-area {
    display: none !important;
  }
  .cdk-overlay-container {
    z-index: 10010 !important;
  }
  .column.full {
    padding-left: 0;
    padding-right: 0;
  }
  .edit-image {
    // TODO: refactor sang vueMQ
    @media (max-width: 800px) {
      width: 600px !important;
      .upload-image-list {
        .upload-image-item {
          width: 32% !important;
          margin: 4px calc(4% / 6) !important;
        }
      }
    }
    // TODO: refactor sang vueMQ
    @media (min-width: 800px) {
      width: 750px !important;
      .upload-image-list {
        .upload-image-item {
          width: 24% !important;
          margin: 4px calc(4% / 8) !important;
        }
      }
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import { getSlug } from '@/services/features/news/news.service';
import { useInit } from '@/services/shared/utils';

export default defineComponent({
  name: 'NewPublicPage',
  components: {},
  setup() {
    // Setup Default
    const { base } = useInit();
    const data = reactive({
      isLoading: false,
      slugId: base.route.params.id as string,
      content: '',
    });
    onMounted(async () => {
      data.isLoading = true;
      try {
        if (data.slugId) {
          const res = await getSlug(data.slugId);
          if (res && res.content) {
            data.content = res.content;
          }
        }
      } finally {
        data.isLoading = false;
      }
    });

    // Function
    return {
      // Data
      data,
      // Function
    };
  },
});
</script>