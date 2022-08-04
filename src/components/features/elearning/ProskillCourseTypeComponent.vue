<template>
  <div class="group-home"></div>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, computed, ref, onMounted, onUnmounted, watch } from 'vue';
import { useInit } from '@/services/shared/utils';
import {} from '@/services/features/elearning/elearning.service';
import { findInvestorSuggest } from '@/services/features/investor/investor.service';
import { ApiRequestPaging } from '@/models/api-request';
import {} from '@/services/features/elearning/elearning.model';
import { ApiResponsePaging } from '@/models/api-response';

// Định nghĩa data type của component [data] bằng Typescript
class PropskillcourseTypeComponentData {}

export default defineComponent({
  name: 'PropskillCourseTypeComponent',
  components: {},
  setup() {
    return {};
  },
});
</script>
