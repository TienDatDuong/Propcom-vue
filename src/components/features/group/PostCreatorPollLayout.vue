<template>
  <div class="post-creator-poll-layout">
    <div
      class="post-creator-poll-layout__question"
      v-for="(question, i) in data.poll"
      :key="i"
    >
      <div class="post-creator-poll-layout__question__title">
        <input
          :disabled="postStatus === GroupMemberRequestStatusEnum.APPROVED"
          v-model="question.name"
          placeholder="Đặt câu hỏi..."
          class="app-input-hidden-border"
        />
        <template v-if="postStatus !== GroupMemberRequestStatusEnum.APPROVED">
          <img
            class="post-creator-poll-layout__close-icon post-creator-poll-layout__transform"
            src="@/assets/icons/simple/icon_close_docx.svg"
            @click="closeQuestion(i)"
          />
        </template>
      </div>
      <div
        class="post-creator-poll-layout__question__answer"
        v-for="(answer, ii) in question.answers"
        :key="ii"
      >
        <div class="post-creator-poll-layout__question__answer__item">
          <img src="@/assets/icons/simple/icon_ellipse.svg" />
          <div class="post-creator-poll-layout__question__answer__item__content">
            {{ answer.name }}
          </div>
          <template v-if="postStatus !== GroupMemberRequestStatusEnum.APPROVED">
            <img
              class="post-creator-poll-layout__close-icon post-creator-poll-layout__transform"
              src="@/assets/icons/simple/icon_close_docx.svg"
              @click="closeAnswer(i, ii)"
            />
          </template>
        </div>
      </div>
      <div class="post-creator-poll-layout__question__add-answer" v-if="postStatus !== GroupMemberRequestStatusEnum.APPROVED">
        <img src="@/assets/icons/simple/icon_plus.svg" />
        <input
          placeholder="Thêm lựa chọn thăm dò ý kiến"
          class="app-input-hidden-border"
          @keyup.enter='(event) => addAnswer(event, i)'
        />
        <Popover>
          <PopoverButton as="div" class="group-comment-component__comment__desc__actions app-hover-effect unselectable">
            <img
              class="post-creator-poll-layout__transform"
              src="@/assets/icons/simple/icon_setting2.svg"
            />
          </PopoverButton>
          <!-- Dropdown -->
          <PopoverPanel as="div" :class="{
            'app-dropdown': true,
            'app-dropdown-above': data.poll.length > 2 && i === data.poll.length - 1,
          }">
            <div class="app-dropdown__item" @click="question.isAddOption = !question.isAddOption">
              Cho phép thành viên thêm lựa chọn
              <div>
                <img src="@/assets/icons/colorful/icon_checked.svg" v-if="question.isAddOption"/>
              </div>
            </div>
            <div class="app-dropdown__item" @click="question.isMultipleSelection = !question.isMultipleSelection">
              Cho phép mọi người chọn nhiều lựa chọn
              <div>
                <img src="@/assets/icons/colorful/icon_checked.svg" v-if="question.isMultipleSelection"/>
              </div>
            </div>
          </PopoverPanel>
        </Popover>
      </div>
    </div>

    <div class="post-creator-poll-layout__add-question" v-if="postStatus !== GroupMemberRequestStatusEnum.APPROVED">
      <div
        class="post-creator-poll-layout__add-question__pointer post-creator-poll-layout__transform"
        @click="addQuestion"
      >
        <img src="@/assets/icons/simple/icon_plus.svg" />
        Thêm câu hỏi
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$transform: translateY(2px);
$greyBorder: 5px solid #f2f2f2;

.post-creator-poll-layout {
  &__transform {
    &:active {
      transform: $transform;
    }
  }
  &__close-icon {
    width: 12px;
    height: 12px;
    margin-right: 25px;
    cursor: pointer;
  }
  &__question {
    display: flex;
    flex-direction: column;
    border-top: $greyBorder;

    &__title {
      display: flex;
      position: relative;
      align-items: center;
      column-gap: 5px;
      height: 40px;
      border-bottom: 1px solid #f2f2f2;

      & > input {
        flex: 1;
        color: #000000;
        font-weight: bolder;
        margin-left: 25px;
        &::placeholder {
          color: #000000;
          font-weight: bolder;
        }
        &:disabled {
          background: #ffffff;
        }
      }
    }

    &__answer {
      &__item {
        display: flex;
        align-items: center;
        padding-left: 25px;
        height: 40px;
        column-gap: 5px;
        border-bottom: 1px solid #f2f2f2;

        & > img:first-child {
          width: 6px;
          height: 6px;
        }

        &__content {
          flex: 1;
          padding-left: 5px;
        }
      }
    }

    &__add-answer {
      display: flex;
      position: relative;
      column-gap: 5px;
      align-items: center;
      color: #c1c1c1;
      height: 40px;
      padding: 0px 25px;

      & > input {
        flex: 1;
      }
      & > img:last-child {
        cursor: pointer;
      }
    }
  }

  &__add-question {
    padding: 5px 25px;
    display: flex;
    border-top: $greyBorder;
    border-bottom: $greyBorder;
    height: 50px;
    &__pointer {
      display: flex;
      align-items: center;
      column-gap: 5px;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .app-dropdown__item {
    display: flex;
    &>div {
      flex: 1;
      text-align: right;
    }
  }
  ::v-deep .app-dropdown {
    min-width: 350px;
    right: 10px;
  }
  ::v-deep .app-dropdown-above {
    bottom: 30px;
  }
}
</style>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useInit } from '@/services/shared/utils';
import { PostAnswerModel, PostPollModel, GroupMemberRequestStatusEnum } from '@/services/features/group/group.model';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import { isEmpty } from 'lodash';

class PostCreatorPollLayoutProps {
  poll: any[];
}
class PostCreatorPollLayoutData {
  poll: PostPollModel[];
}

export default defineComponent({
  name: 'PostCreatorPollLayout',
  components: {
    Popover,
    PopoverButton,
    PopoverPanel,
  },
  props: {
    poll: {
      type: Array,
      default: null,
    },
    postStatus: {
      type: String,
      default: null,
    },
  },
  setup(props: PostCreatorPollLayoutProps, { emit }: any) {
    const { base } = useInit();
    const data = reactive<PostCreatorPollLayoutData>({
      poll: props.poll && !isEmpty(props.poll) ?
        props.poll :
        [
          new PostPollModel({
            name: '',
            answers: [],
          })
        ],
    });

    const addAnswer = (event: any, index: number) => {
      if (!event || !event.target) {return;}
      const value = event.target.value;
      event.target.value = '';
      if (!data.poll[index]) {return;}
      data.poll[index].answers.push(
        new PostAnswerModel({
          name: value,
        })
      );
      emit('poll', data.poll);
    };

    const closeAnswer = (parentIndex: number, index: number) => {
      if (!data.poll[parentIndex]) {return;}

      if (!data.poll[parentIndex].answers[index]) {return;}
      data.poll[parentIndex].answers.splice(index, 1);
      emit('poll', data.poll);
    };

    const addQuestion = () => {
      data.poll.push(
        new PostPollModel({
          name: '',
          answers: [],
        })
      );
      emit('poll', data.poll);
    };

    const closeQuestion = (index: number) => {
      if (!data.poll[index]) {return;}
      data.poll.splice(index, 1);
      emit('poll', data.poll);
    };

    return {
      data,
      GroupMemberRequestStatusEnum,
      addAnswer,
      closeAnswer,
      addQuestion,
      closeQuestion,
    };
  },
});
</script>
