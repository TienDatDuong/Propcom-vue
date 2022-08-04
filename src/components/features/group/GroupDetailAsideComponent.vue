<template>
  <div class="group-detail-aside-component">
    <div class="group-detail-aside-component__header">
      <span class="group-detail-aside-component__header__title">thông tin nhóm</span>
    </div>
    <div class="group-detail-aside-component__body">
      <template v-if="data.dataSource.description">
        <span class="group-detail-aside-component__body__description">{{ data.dataSource.description }}</span>
        <hr />
      </template>
      <div class="group-detail-aside-component__body__summary">
        <div class="group-detail-aside-component__body__summary__item">
          <span class="group-detail-aside-component__body__summary__item__value">{{
            data.dataSource.totalMembers
          }}</span>
          <span class="group-detail-aside-component__body__summary__item__label">Thành viên</span>
        </div>
        <div class="group-detail-aside-component__body__summary__item">
          <span class="group-detail-aside-component__body__summary__item__value">{{
            data.dataSource.totalComments
          }}</span>
          <span class="group-detail-aside-component__body__summary__item__label">Bình luận</span>
        </div>
        <div class="group-detail-aside-component__body__summary__item">
          <span class="group-detail-aside-component__body__summary__item__value">{{ data.dataSource.totalPosts }}</span>
          <span class="group-detail-aside-component__body__summary__item__label">Bài viết</span>
        </div>
      </div>
      <template v-if="data.dataSource.isAdmin">
        <hr />
        <div class="group-detail-aside-component__body__edit">
          <span class="group-detail-aside-component__body__edit__title">Chỉnh sửa thông tin</span>
          <div class="group-detail-aside-component__body__edit__btn app-hover-effect" @click="toggleDialogEdit(true)">
            <img src="@/assets/icons/simple/icon_edit.svg" />
          </div>
        </div>
      </template>
    </div>
  </div>

  <el-dialog v-model="data.dialogEditVisible" width="500px" custom-class="app-dialog">
    <template #title>
      <span class="app-dialog-title">Chỉnh sửa thông tin nhóm</span>
    </template>
    <div class="app-dialog-content">
      <Form
        validate-on-submit
        :validation-schema="formValidation"
        :initial-values="formData"
        @submit="handleSubmitEdit"
        class="group-detail-aside-component__dialog-form"
      >
        <Field name="name" v-slot="{ field, handleChange, handleBlur, errorMessage }">
          <div class="app-input">
            <label class="app-input__form__label"
              >Tên nhóm<span class="app-input__form__label-required">*</span>
            </label>
            <el-input
              :modelValue="field.value"
              @input="handleChange"
              @blur="handleBlur"
              size="small"
              placeholder="Nhập tên nhóm"
              class="input-form"
            >
              <template #append>
                <div class="underline" :class="{ invalid: errorMessage }"></div>
              </template>
            </el-input>
            <div v-if="errorMessage" class="input-error">
              <img src="@/assets/icons/colorful/icon_error.svg" alt="form-error" />
              <span class="form-error">{{ errorMessage }}</span>
            </div>
          </div>
        </Field>
        <Field name="description" v-slot="{ field, handleChange, handleBlur, errorMessage }">
          <div class="app-input">
            <label class="app-input__form__label"
              >Giới thiệu nhóm<span class="app-input__form__label-required">*</span>
            </label>
            <el-input
              :modelValue="field.value"
              @input="handleChange"
              @blur="handleBlur"
              size="small"
              placeholder="Nhập giới thiệu nhóm"
              class="input-form"
            >
              <template #append>
                <div class="underline" :class="{ invalid: errorMessage }"></div>
              </template>
            </el-input>
            <div v-if="errorMessage" class="input-error">
              <img src="@/assets/icons/colorful/icon_error.svg" alt="form-error" />
              <span class="form-error">{{ errorMessage }}</span>
            </div>
          </div>
        </Field>
        <div class="app-dialog-content__actions">
          <button @click="toggleDialogEdit(false)" class="app-btn">huỷ</button>
          <button type="submit" class="app-btn app-btn-primary">lưu</button>
        </div>
      </Form>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.group-detail-aside-component {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-radius: $borderRadius;
  border: $border;
  overflow: hidden;
  &__header {
    height: 40px;
    background: #dd0000;
    display: flex;
    justify-content: center;
    align-items: center;
    &__title {
      font-style: normal;
      font-weight: bold;
      font-size: 13px;
      text-align: center;
      text-transform: uppercase;
      color: #ffffff;
    }
  }
  &__body {
    padding: 15px 20px;
    background: #ffffff;
    &__description {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      color: #0f0f0f;
      white-space: pre-line;
      word-break: break-word;
    }
    &__summary {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      &__item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        &__label {
          font-style: normal;
          font-weight: normal;
          font-size: 13px;
          color: #c1c1c1;
        }
        &__value {
          font-style: normal;
          font-weight: bold;
          font-size: 15px;
          color: #0f0f0f;
        }
      }
    }
    &__edit {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      &__title {
        font-style: normal;
        font-weight: normal;
        font-size: 13px;
        color: $colorNeutral;
      }
      &__btn {
        cursor: pointer;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ffffff;
      }
    }
  }
  &__dialog-form {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    row-gap: 20px;
  }
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, reactive, watch } from 'vue';
import { Form, Field } from 'vee-validate';
import * as yup from 'yup';
import { GroupModel } from '@/services/features/group/group.model';
import { useInit } from '@/services/shared/utils';
import { updateGroupInformation } from '@/services/features/group/group.service';

// Định nghĩa data type của component [props] bằng Typescript
class GroupDetailAsideComponentProps {
  modelValue: GroupModel;
}

// Định nghĩa data type của component [data] bằng Typescript
class GroupDetailAsideComponentData {
  isLoading: boolean;
  dataSource: GroupModel;
  dialogEditVisible: boolean;
}

export default defineComponent({
  name: 'GroupDetailAsideComponent',
  components: {
    Form,
    Field,
  },
  props: {
    modelValue: {
      type: GroupModel,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props: GroupDetailAsideComponentProps, { emit }: any) {
    const { base } = useInit();
    const data = reactive<GroupDetailAsideComponentData>({
      isLoading: false,
      dataSource: { ...props.modelValue },
      dialogEditVisible: false,
    });
    watch(
      () => props.modelValue,
      (newValue, oldValue) => {
        data.dataSource = newValue;
      }
    );
    // Setup Form
    const formData = {
      name: data.dataSource?.name,
      description: data.dataSource?.description,
    };
    const formValidation = yup.object().shape({
      name: yup.string().label('Tên nhóm').required('Vui lòng nhập tên nhóm!'),
      description: yup.string().label('Giới thiệu nhóm').required('Vui lòng nhập giới thiệu nhóm*!'),
    });
    // Function
    // Ẩn/hiện dialog edit
    const toggleDialogEdit = (isVisible: boolean) => (data.dialogEditVisible = isVisible);

    const handleSubmitEdit = async (values: { name: string; description: string }) => {
      toggleDialogEdit(false);
      if (data.dataSource && data.dataSource.id) {
        const model = {
          id: data.dataSource.id,
          name: values.name,
          description: values.description,
        };
        await updateGroupInformation(model);
        // Update UI
        data.dataSource.name = values.name;
        data.dataSource.description = values.description;
        emit('update:modelValue', new GroupModel(data.dataSource));
      }
    };

    return {
      // Component reactive data
      data,
      // Form
      formValidation,
      formData,
      // Function
      toggleDialogEdit,
      handleSubmitEdit,
    };
  },
});
</script>
