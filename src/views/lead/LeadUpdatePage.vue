<template v-loading="data.isLoading">
  <template v-if="data.lead && data.masterData">
    <LeadFormComponent :modelValue="data.lead" :masterData="data.masterData" />
  </template>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
// Composition API
import { defineComponent, onMounted, reactive, watch } from 'vue';
import { useInit } from '@/services/shared/utils';
import { LeadModel } from '@/services/features/lead/lead.model';
import LeadFormComponent from '../../components/features/lead/LeadFormComponent.vue';
import { findLeadById } from '@/services/features/lead/lead.service';
import { getMasterData } from '@/services/features/master-data/master-data.service';

// Định nghĩa data type của component [data] bằng Typescript
class LeadDetailPageData {
  isLoading: boolean;
  isLoadingMore: boolean;
  leadId: string;
  lead: LeadModel | null;
  masterData: any;
}

// Component chính
export default defineComponent({
  name: 'LeadUpdatePage',
  components: {
    LeadFormComponent,
  },
  setup() {
    // Setup Default
    const { base, isLoggedIn } = useInit();
    const data: any = reactive<LeadDetailPageData>({
      isLoading: false,
      isLoadingMore: false,
      leadId: base.route.params.id as string,
      lead: null,
      masterData: null,
    });

    // Life cycle event
    onMounted(async () => {
      data.isLoading = true;
      try {
        if (isLoggedIn.value) {
          const leadResponse = await findLeadById(data.leadId);
          const resMasterData = await getMasterData();
          data.masterData = resMasterData;
          data.lead = leadResponse.result;
        }
      } finally {
        data.isLoading = false;
      }
    });

    return {
      // Component reactive data
      // Form + Fields
      data,
      isLoggedIn,
    };
  },
});
</script>
