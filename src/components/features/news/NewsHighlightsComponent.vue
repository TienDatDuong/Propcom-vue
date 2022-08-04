<template>
  <div class="news-highlights-component">
    <div class="container-xl">
      <span class="app-section-title">Tin tức nổi bật</span>
      <div class="d-flex flex-row">
        <!-- Tin tức nổi bật bên trái -->
        <div class="news-highlights-component__flex-5">
          <!-- Loading skeleton items -->
          <template v-if="data.isLoading">
            <div class="news-highlights-component__news-highlights">
              <div
                class="
                  news-highlights-component__news-highlights__image-wrapper
                  app-skeletor
                "
              ></div>
            </div>
          </template>
          <!-- Real items -->
          <template v-else>
            <div
              v-if="data.items"
              class="news-highlights-component__news-highlights unselectable"
              @click="() => alert('clicked')"
            >
              <div
                class="
                  news-highlights-component__news-highlights__image-wrapper
                "
                :style="{
                  'background-image':
                    'url(' + encapsulateUrl(data.items[0]?.coverImage) + ')',
                }"
              ></div>
              <div class="news-highlights-component__news-highlights__content">
                <span
                  class="
                    news-highlights-component__news-highlights__content__title
                  "
                  >{{ data.items[0]?.name }}</span
                >
                <div class="mt-1 news-highlights-component__datetime">
                  <div class="news-highlights-component__datetime__icon">
                    <IconClockSvg />
                  </div>
                  <span>{{ formatDate(data.items[0]?.createdDate) }}</span>
                </div>
                <div
                  class="
                    news-highlights-component__news-highlights__content__preview
                  "
                  v-if="data.items[0]?.content"
                  v-html="data.items[0]?.content"
                ></div>
              </div>
            </div>
          </template>
        </div>
        <!-- List tin tức bên phải -->
        <div class="news-highlights-component__flex-3">
          <!-- Loading skeleton items -->
          <template v-if="data.isLoading">
            <template v-for="index in 4" :key="index">
              <div class="news-highlights-component__news-item">
                <div
                  class="
                    news-highlights-component__news-item__image-wrapper
                    app-skeletor
                  "
                ></div>
                <div
                  class="news-highlights-component__news-item__section-right"
                >
                  <div
                    class="
                      news-highlights-component__news-item__title
                      app-skeletor
                    "
                  ></div>
                  <div
                    class="news-highlights-component__datetime app-skeletor"
                  ></div>
                </div>
              </div>
            </template>
          </template>
          <!-- Real items -->
          <template v-else>
            <template v-for="(news, index) in data.items" :key="news.id">
              <div
                v-if="index"
                class="
                  news-highlights-component__news-item
                  app-hover-effect
                  unselectable
                "
              >
                <div
                  class="news-highlights-component__news-item__image-wrapper"
                  :style="{
                    'background-image':
                      'url(' + encapsulateUrl(news.thumbnailUrl) + ')',
                  }"
                ></div>
                <div
                  class="news-highlights-component__news-item__section-right"
                >
                  <span class="news-highlights-component__news-item__title">{{
                    news.name
                  }}</span>
                  <div class="news-highlights-component__datetime">
                    <div class="news-highlights-component__datetime__icon">
                      <IconClockSvg />
                    </div>
                    <span>{{ formatDate(news.createdDate) }}</span>
                  </div>
                </div>
              </div>
            </template>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.news-highlights-component {
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  &__flex-5 {
    flex: 5;
  }
  &__flex-3 {
    flex: 3;
  }

  &__news-highlights {
    margin-right: 60px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    &__image-wrapper {
      width: 100%;
      aspect-ratio: 16 / 9;
      border-radius: $borderRadius;
      overflow: hidden;
      background-repeat: no-repeat;
      background-size: cover;
    }
    &__content {
      position: absolute;
      bottom: -40px;
      padding: 20px 35px;
      width: 80%;
      height: 180px;
      border-radius: $borderRadius;
      box-shadow: $boxShadow;
      overflow: hidden;
      background-color: #ffffff;
      display: flex;
      flex-direction: column;
      &__title {
        color: #0f0f0f;
        font-weight: bold;
        font-size: 24px;
        line-height: 1.2;
        /* css mutiple line ellipsis */
        display: block;
        display: -webkit-box;
        height: 60px;
        word-break: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      &__preview {
        flex: 1;
        padding-top: 15px;
        overflow: hidden;
        font-size: 14px;
        color: #0f0f0f;
      }
    }
  }

  &__news-item {
    &:not(:last-child) {
      margin-bottom: 25px;
    }
    cursor: pointer;
    padding: 0 10px 0 0;
    height: 95px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: $borderRadius;
    overflow: hidden;
    background: #ffffff;

    &__image-wrapper {
      margin-right: 20px;
      width: 145px;
      height: 100%;
      border-radius: $borderRadius;
      overflow: hidden;
      background-repeat: no-repeat;
      background-size: cover;
    }

    &__section-right {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    &__title {
      color: #0f0f0f;
      font-size: 15px;
      font-weight: bold;
      line-height: 1.2;
      /* css mutiple line ellipsis */
      display: block;
      display: -webkit-box;
      height: 40px;
      word-break: break-word;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }

  &__datetime {
    margin-top: 5px;
    min-height: 14px;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #a7a7a7;
    font-size: 12px;
    font-weight: normal;
    &__icon {
      width: 16px;
      margin-right: 8px;
    }
    span {
      line-height: 1;
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import IconClockSvg from '@/assets/icons/colorful/icon_clock.svg';
import { useInit, formatDate, encapsulateUrl } from '@/services/shared/utils';
import { findAllNews } from '@/services/features/news/news.service';
import { ApiRequestPaging } from '@/models/api-request';
import { NewsModel } from '@/services/features/news/news.model';

// Định nghĩa data type của component [data] bằng Typescript
class NewsHighlightsComponentData {
  isLoading: boolean;
  queryParams: ApiRequestPaging;
  items: NewsModel[] | null;
}

export default defineComponent({
  name: 'NewsHighlightsComponent',
  components: { IconClockSvg },
  setup() {
    // Setup Default
    const { base } = useInit();
    const data = reactive<NewsHighlightsComponentData>({
      isLoading: false,
      queryParams: {
        page: 1,
        pageSize: 5,
      },
      items: null,
    });
    onMounted(async () => {
      data.isLoading = true;
      try {
        const response = await findAllNews(data.queryParams);
        if (response && response.rows) {
          data.items = response.rows;
        }
      } finally {
        data.isLoading = false;
      }
    });

    return {
      // Data
      data,
      // Default
      formatDate,
      encapsulateUrl,
      // Function
    };
  },
});
</script>