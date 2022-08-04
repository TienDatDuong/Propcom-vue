<template>
  <div class="app-filter">
    <div class="app-filter__item" v-if="data.filterData.text.isShow">
      <div class="app-filter__item__label">Tìm kiếm nhanh</div>
      <div class="app-filter__item__input">
        <el-input v-model="data.filterData.text.value" placeholder="Nhập từ khoá" />
      </div>
    </div>
    <div class="app-filter__item" v-if="data.filterData.startDate.isShow">
      <div class="app-filter__item__label">Thời gian bắt đầu gọi</div>
      <div class="app-filter__item__input">
        <el-date-picker
          v-model="data.filterData.startDate.value"
          type="date"
          placeholder="DD/MM/YYYY"
          format="DD/MM/YYYY"
          value-format="YYYY-MM-DD"
        >
          <template #default="cell">
            <div class="cell" :class="{ current: cell.isCurrent }">
              <span class="text">{{ cell.text }}</span>
              <span v-if="isHoliday(cell)" class="holiday" />
            </div>
          </template>
        </el-date-picker>
      </div>
    </div>
    <div class="app-filter__item" v-if="data.filterData.endDate.isShow">
      <div class="app-filter__item__label">Thời gian kết thúc gọi</div>
      <div class="app-filter__item__input">
        <el-date-picker
          v-model="data.filterData.endDate.value"
          type="date"
          placeholder="DD/MM/YYYY"
          format="DD/MM/YYYY"
          value-format="YYYY-MM-DD"
        >
          <template #default="cell">
            <div class="cell" :class="{ current: cell.isCurrent }">
              <span class="text">{{ cell.text }}</span>
              <span v-if="isHoliday(cell)" class="holiday" />
            </div>
          </template>
        </el-date-picker>
      </div>
    </div>
    <div class="app-filter__actions">
      <button class="app-btn app-btn-primary" @click="onSearch()">Tìm</button>
      <button class="app-btn" @click="onReset()">Nhập lại</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-filter {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  column-gap: 10px;
  margin-bottom: 20px;
  &__actions {
    display: flex;
    align-items: center;
    column-gap: 10px;
    & .app-btn {
      padding: 10px 25px;
    }
  }
  &__item {
    display: flex;
    flex-direction: column;
    &__label {
      font-size: 13px;
      font-family: 'Roboto';
      color: #5a5a5a;
      font-weight: 400;
    }
    &__input {
      & .el-input__inner {
        color: #f2f2f2;
        border-color: #f2f2f2;
      }
    }
  }
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, onMounted, reactive } from 'vue';

class FilterDataProps {
  isText: boolean;
  isDate: boolean;
}

class FilterData {
  filterData: {
    text: any;
    startDate: any;
    endDate: any;
  };
}

export default defineComponent({
  name: 'AppFilterComponent',
  components: {},
  props: {
    isText: {
      type: Boolean,
      default: false,
    },
    isDate: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['onSearch'],
  setup(props: FilterDataProps, { emit }: any) {
    // Setup Default
    // Component reactive data
    const data = reactive<FilterData>({
      filterData: {
        text: {
          isShow: props.isText,
          value: '',
        },
        startDate: {
          isShow: props.isDate,
          value: '',
        },
        endDate: {
          isShow: props.isDate,
          value: '',
        },
      },
    });

    const onSearch = () => {
      const onSearchData = {
        text: data.filterData?.text?.value ?? '',
        startDate: data.filterData?.startDate?.value ?? '',
        endDate: data.filterData?.endDate?.value ?? '',
      };
      emit('onSearch', onSearchData);
    };

    const onReset = () => {
      data.filterData.text.value = '';
      data.filterData.startDate.value = '';
      data.filterData.endDate.value = '';
      onSearch();
    };

    // Watch

    // Life cycle event
    onMounted(async () => {
      // TODO
    });

    return {
      // Component reactive data
      data,
      // Computed
      // Functions
      onSearch,
      onReset,
    };
  },
});
</script>
