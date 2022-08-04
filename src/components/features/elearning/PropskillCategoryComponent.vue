<template>
  <div class="category">
    <router-link class="link-category" :to="{ name: 'propskill-detail-category', params: { id: modelValue.id } }">
      <el-card :body-style="{ padding: '0px' }" class="category-info" shadow="never">
        <div class="image-box">
          <img :src="modelValue.iconImgUrl" class="image" />
        </div>
        <div class="category-content">
          <div class="category-description text-font">
            <div class="category-title">{{ modelValue.nameLocale[0].name }}</div>
            <div class="amount-item">({{ modelValue.courseList?.length }} khoá học)</div>
          </div>
        </div>
      </el-card>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.category-content {
  padding: 9px 13.85px 10px 13.85px;
}
.category-info {
  width: 189px;
  height: 200px;
  border-radius: 15px;
  border: 1px solid #f2f2f2;
  display: flex;
}
.image-box {
  width: 189px;
  height: 150px;
  display: flex;
  justify-content: center;
}
.image {
  width: auto;
  height: 150px;
}
.text-font {
  font-family: 'Roboto';
  font-style: normal;
}
.category-description {
  height: 31px;
  display: flex;
  flex-direction: column;
}
.category-title {
  font-weight: 500;
  font-size: 13px;
  line-height: 120%;
  color: #0f0f0f;
  display: block;
  max-width: 98%;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
  text-align: center;
}
.category-title:hover {
  text-decoration: underline;
  color: #dd0000;
}
.amount-item {
  font-weight: 400;
  font-size: 12px;
  line-height: 120%;
  text-align: center;
  color: #5a5a5a;
}
.link-category {
  color: #ffffff;
  text-decoration: none;
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, computed, ref, onMounted, onUnmounted, watch } from 'vue';
import { useInit } from '@/services/shared/utils';
import {} from '@/services/features/elearning/elearning.service';
import { findInvestorSuggest } from '@/services/features/investor/investor.service';
import { ApiRequestPaging } from '@/models/api-request';
import { CategoryModel } from '@/services/features/elearning/elearning.model';
import { ApiResponsePaging } from '@/models/api-response';
import { contentHide } from '@/services/shared/utils';

class PropskillCategoryComponentProps {
  modelValue: CategoryModel;
  masterData: any;
  lengthName: number;
}
// Định nghĩa data type của component [data] bằng Typescript
class PropskillCategoryComponentData {
  modelValue: CategoryModel;
  masterData: any;
  lengthName: number;
}

export default defineComponent({
  name: 'PropskillCategoryComponent',
  components: {},
  props: {
    modelValue: {
      type: CategoryModel,
      default: null,
      required: true,
    },
    masterData: {
      type: Object,
      default: null,
    },
    lengthName: {
      type: Number,
      default: 20,
    },
  },
  setup(props: PropskillCategoryComponentProps) {
    const { base } = useInit();
    const data = reactive<PropskillCategoryComponentData>({
      modelValue: { ...props.modelValue },
      masterData: props.masterData,
      lengthName: props.lengthName,
    });
    return {
      contentHide,
    };
  },
});
</script>
