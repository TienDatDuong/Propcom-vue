<template>
  <div class="history-call-page">
    <ag-grid-vue
      v-show="!data.isLoading"
      class="ag-theme-alpine app-ag-theme-alpine"
      style="width: 100%; height: 100%"
      :domLayout="'autoHeight'"
      :columnDefs="columnDefs.value"
      :rowData="data.rowData"
      :gridOptions="gridOptions"
      @grid-ready="onGridReady"
    >
    </ag-grid-vue>
    <HistoryCallLeadSkeleton v-if="data.isLoading"></HistoryCallLeadSkeleton>
  </div>
</template>

<style lang="scss" scoped>
.history-call-page {
  &__actions {
    display: flex;
    align-items: center;
  }
}
</style>

<script lang="ts">
import Vue, { computed } from 'vue';
import { useInit, formatDate, convertGetMasterData } from '@/services/shared/utils';
import { GridOptions } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridVue } from 'ag-grid-vue3';
import { defineComponent, reactive, ref, watch } from 'vue';
import { CallHistoryModel } from '../../../services/features/communicaiton/communication.model';
import HistoryCallLeadSkeleton from '../../skeleton/lead/HistoryCallLeadSkeleton.vue';
import AppGridRender from '../../ui/AppGridRender.vue';
import { optionReturnEnum } from '@/services/features/lead/lead.model';

import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
ModuleRegistry.registerModules([ClientSideRowModelModule]);

// Định nghĩa data type của component [props] bằng Typescript
class HistoryCallComponentProps {
  callLog: any[] | null;
  isLoading: boolean;
}
class HistoryCallComponentData {
  callLog: CallHistoryModel[] | null;
  isLoading: boolean;
  rowData: CallHistoryModel[] | null;
}
export default defineComponent({
  name: 'HistoryCallComponent',
  components: {
    AgGridVue,
    HistoryCallLeadSkeleton,
  },
  props: {
    callLog: {
      type: Array,
      default: null,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props: HistoryCallComponentProps, { emit: any }) {
    const { base, isLoggedIn } = useInit();
    const data = reactive<HistoryCallComponentData>({
      callLog: props.callLog,
      isLoading: props.isLoading,
      rowData: [],
    });
    const isNotReasonOption = (rejectReason: string) => {
      return optionReturnEnum.some((item) => item.key === rejectReason);
    };
    // Setting Ag-Grid
    const gridApi = ref();
    const onGridReady = (params: any) => {
      gridApi.value = params.api;
    };

    const columnDefs = reactive({
      value: [
        {
          headerName: 'STT',
          field: 'stt',
          width: 80,
        },
        {
          headerName: 'Số điện thoại gọi',
          field: 'from.number',
          width: 200,
        },
        {
          headerName: 'Mã khách hàng',
          field: 'to.agentInfo.code',
          width: 180,
        },
        {
          headerName: 'Tên khách hàng',
          field: 'to.agentInfo.name',
          width: 250,
        },
        {
          headerName: 'SĐT khách hàng',
          field: 'to.agentInfo.phone',
          width: 200,
        },
        {
          headerName: 'Ghi chú',
          field: 'note',
          width: 350,
        },
        {
          headerName: 'Lý do trả về',
          width: 350,
          valueGetter: (params: any) => {
            return params.data.rejectReason
              ? isNotReasonOption(params.data.rejectReason)
                ? convertGetMasterData(optionReturnEnum, params.data.rejectReason)
                : params.data.rejectReason
              : '';
          },
        },
        {
          headerName: 'Gọi lại',
          width: 165,
          cellRenderer: AppGridRender,
        },
      ],
    });
    const gridOptions: GridOptions = {
      defaultColDef: {
        resizable: true,
        autoHeight: true,
        tooltipComponent: 'customTooltip',
        sortable: false,
        enableCellChangeFlash: false,
      },
      getRowHeight: () => 50,
      autoSizePadding: 10,
      cellFlashDelay: 500,
      rowBuffer: 30,
      animateRows: true,
      suppressRowTransform: true,
      enableCellTextSelection: true,
      singleClickEdit: true,
      enableBrowserTooltips: true,
      tooltipShowDelay: 1,
      overlayNoRowsTemplate: '<span> Không có dữ liệu </span>',
    };

    watch(
      () => props.callLog,
      () => {
        data.callLog = props.callLog;
        data.rowData = props.callLog;
      }
    );
    watch(
      () => props.isLoading,
      () => {
        data.isLoading = props.isLoading;
      }
    );

    return {
      isLoggedIn,
      data,
      onGridReady,
      columnDefs,
      gridOptions,
      isNotReasonOption,
    };
  },
});
</script>
