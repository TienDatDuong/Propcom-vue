<template>
  <div v-if="data.isLoading">
    <div class="propskill-home-container-skeleton">
      <div class="exam-card-skeleton">
        <div class="card-header-skeleton">
          <div class="card-header-text-skeleton"></div>
        </div>
        <div class="line-skeleton">
          <div class="progress-bar-skeleton"></div>
          <div class="progress-bar-text-skeleton"></div>
        </div>
        <div class="question-skeleton">
          <div class="question-text-skeleton"></div>
        </div>
        <div class="answer-group-skeleton">
          <div class="answer-skeleton">
            <div class="anwser-text-skeleton"></div>
          </div>
          <div class="answer-skeleton">
            <div class="anwser-text-skeleton"></div>
          </div>
          <div class="answer-skeleton">
            <div class="anwser-text-skeleton"></div>
          </div>
          <div class="answer-skeleton">
            <div class="anwser-text-skeleton"></div>
          </div>
        </div>
        <div class="btn-group-skeleton">
          <div class="btn-line-skeleton">
            <div class="btn-skip-skeleton"></div>
            <div class="btn-skip-skeleton"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="propskill-exam-page">
    <div class="exam-container">
      <el-card class="exam-card" shadow="never">
        <template #header>
          <div class="card-header">
            <span>Làm bài tập</span>
          </div>
        </template>
        <div class="card-content">
          <div>
            <div class="progress">
              <div
                v-for="(item, index) in data.progressAnswers"
                :key="index"
                :virtualIndex="index"
                class="progress-bar"
                :class="item"
                role="progressbar"
                :style="{ width: +(1 / Number(data.progressAnswers?.length)) * 100 + '%' }"
              ></div>
            </div>
            <div class="total">
              {{ data.progressAnswers?.filter((doc) => doc === 'true').length }}/{{ data.progressAnswers?.length }}
              <span class="total-text">câu đúng</span>
            </div>
          </div>
          <div class="question">
            Câu {{ data.indexQuestion + 1 }}:
            {{
              data.questionActive?.type === QuestionTypeEnum.MULTIPLE_CHOICE
                ? data.questionActive?.title
                : 'Hãy hoàn thành đoạn văn sau:'
            }}
          </div>
          <div class="question-image" v-if="data.questionActive?.image">
            <img :src="data.questionActive?.image" />
          </div>
          <div v-if="data.questionActive?.type === QuestionTypeEnum.MULTIPLE_CHOICE" class="answer-group">
            <div v-for="(item, index) in data.questionActive?.answers" :key="index" :virtualIndex="index">
              <button
                class="answer"
                v-if="item.title"
                :class="{
                  active: item.answer === data.answerSelect,
                  checkFalse: data.checkResultAnswer && !item.isCorrect,
                  checkTrue: data.checkResultAnswer && item.isCorrect,
                  showAnswerCorrect:
                    data.checkResultAnswer && data.progressAnswers[data.indexQuestion] === 'false' && item.isCorrect,
                }"
                @click="onSelectAnswer(item.answer)"
                :disabled="data.checkResultAnswer ? true : false"
              >
                <span>{{ item.title }}</span>
              </button>
            </div>
          </div>
          <div v-if="data.questionActive?.type === QuestionTypeEnum.FILL_IN_BLANK">
            <div class="question-choice">
              <div class="w-100">
                <template v-for="(item, index) in data.questionActive.arrsTitle" :key="index" :virtualIndex="index">
                  <template v-if="index === 0">
                    {{ item }}
                  </template>
                  <template v-else>
                    <button class="field-answer" v-if="data.fillInBank?.length === 0">&nbsp;</button>
                    <Transition name="bounce">
                      <button
                        class="field-answer active"
                        v-if="data.fillInBank?.length > 0"
                        :class="{
                          checkFalse: data.checkResultAnswer && data.progressAnswers[data.indexQuestion] === 'false',
                          checkTrue: data.checkResultAnswer && data.progressAnswers[data.indexQuestion] === 'true',
                        }"
                        :disabled="data.checkResultAnswer ? true : false"
                      >
                        {{ data.fillInBank[index - 1] }}
                      </button>
                    </Transition>
                    {{ item }}
                  </template>
                </template>
              </div>
            </div>
            <div class="answer-choice">
              <template v-for="(item, index) in data.questionActive?.answers" :key="index" :virtualIndex="index">
                <button
                  v-if="item.title"
                  class="answer-text"
                  :class="{
                    active: item.answer === data.answerSelect,
                    showAnswerCorrect:
                      data.checkResultAnswer && data.progressAnswers[data.indexQuestion] === 'false' && item.isCorrect,
                  }"
                  @click="onSelectAnswer(item.answer)"
                  :disabled="data.checkResultAnswer ? true : false"
                >
                  {{ item.title.split('{/}').join('/') }}
                </button>
              </template>
            </div>
          </div>
          <div class="btn-group" v-if="!data.checkResultAnswer">
            <button @click="skipQuestion" class="btn-skip">
              {{ data.indexQuestion === data.progressAnswers.length - 1 ? 'Hoàn thành' : 'Bỏ qua' }}
            </button>
            <button v-if="!data.answerSelect" class="btn-check-answer" disabled>
              {{ data.indexQuestion === data.progressAnswers.length - 1 ? 'Hoàn thành' : 'Kiểm tra' }}
            </button>
            <button v-else @click="onCheckResult" class="btn-active-check-answer">
              {{ data.indexQuestion === data.progressAnswers.length - 1 ? 'Hoàn thành' : 'Kiểm tra' }}
            </button>
          </div>
          <div v-if="data.checkResultAnswer && data.progressAnswers[data.indexQuestion] === 'false'" class="wrong">
            <div class="des-wrong">
              <img class="img-wrong" src="@/assets/images/wrong-icon.png" />
              <span class="text-wrong">Sai rồi</span>
            </div>
            <button @click="nextQuestion" class="btn-wrong-continue">
              {{ data.indexQuestion === data.progressAnswers.length - 1 ? 'Hoàn thành' : 'Tiếp tục' }}
            </button>
          </div>
          <div v-if="data.checkResultAnswer && data.progressAnswers[data.indexQuestion] === 'true'" class="correct">
            <div class="des-correct">
              <img class="img-correct" src="@/assets/images/correct-icon.png" />
              <span class="text-correct">Đúng rồi</span>
            </div>
            <button @click="nextQuestion" class="btn-correct-continue">
              {{ data.indexQuestion === data.progressAnswers.length - 1 ? 'Hoàn thành' : 'Tiếp tục' }}
            </button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
  <el-dialog @close="closeDialogSuccess" v-model="data.dialogSuccessLesson" width="833px" custom-class="app-dialog">
    <template #title>
      <div class="app-dialog-title">Xin chúc mừng</div>
    </template>
    <div class="app-dialog-content">
      <div class="direction-app" style="margin-bottom: 23px">
        <img class="img-success-course" alt="img" src="@/assets/images/success-course.png" />
      </div>
      <div>
        Bạn đã hoàn thành bài tập chủ đề {{ data.topicActive.name }} với
        <span style="font-weight: 700">
          {{ data.progressAnswers?.filter((doc) => doc === 'true').length }}/{{ data.progressAnswers?.length }}
        </span>
        câu trả lời đúng.
      </div>
    </div>
    <div class="app-dialog-content__actions" style="gap: 20px">
      <button type="submit" class="app-btn" @click="reloadPage">LÀM LẠI</button>
      <button type="submit" class="app-btn app-btn-primary" @click="closeDialogSuccess">OK</button>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.app-dialog-title {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 110%;
  text-align: center;
  color: #0f0f0f;
  margin: 12px 0 7px 0;
}
.wrong {
  height: 128px;
  width: 833px;
  bottom: 0;
  right: 0;
  background: #ffeeed;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  padding: 17px 0 30px 0;
}
.img-wrong {
  width: 20.25px;
  height: 20.25px;
  margin-bottom: 2px;
  margin-right: 11px;
}
.text-wrong {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 130%;

  color: #fb4d4d;
}
.btn-wrong-continue {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 110%;

  text-align: center;
  text-transform: uppercase;

  color: #ffffff;

  border: 1px solid #ffffff;
  width: 334px;
  padding: 16px 92px;
  background: #fb4d4d;
  border-radius: 5px;
  &:hover {
    background: #e11f1f;
  }
}

.correct {
  height: 128px;
  width: 833px;
  bottom: 0;
  right: 0;
  background: #ddffe4;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  padding: 17px 0 30px 0;
}
.img-correct {
  width: 20.25px;
  height: 20.25px;
  margin-bottom: 2px;
  margin-right: 11px;
}
.text-correct {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 130%;

  color: #04c35c;
}
.btn-correct-continue {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 110%;

  text-align: center;
  text-transform: uppercase;

  color: #ffffff;

  border: 1px solid #ffffff;
  width: 334px;
  padding: 16px 92px;
  background: #04c35c;
  border-radius: 5px;
  &:hover {
    background: #009f49;
  }
}

.exam-container {
  padding: 45px 0 45px 0;
}
.exam-card {
  border-radius: 10px;
  position: relative;
}
.total-text {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;

  color: #5a5a5a;
  padding-left: 5px;
}
.total {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;

  color: #5a5a5a;
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.card-header {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 130%;
  text-align: center;
  color: #0f0f0f;
  background: #ffffff;
  padding: 17px 0;
}
.card-content {
  display: flex;
  flex-direction: column;
}
.exam-container {
  width: 833px;
  margin: 0 auto;
}
.progress {
  margin: 25px 20px 0 20px;
  height: 12px;
  background: #f2f2f2;
  border-radius: 30px;
}
.question {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 130%;
  text-align: center;
  color: #000000;
  padding: 40px 0 30px 0;
}
.answer-group {
  display: grid;
  gap: 25px;
  padding: 0 50px 50px 50px;
}
.answer {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 20px;
  gap: 10px;
  width: 100%;
  min-height: 66px;
  background: #ffffff;
  border: 2px solid #f2f2f2;
  box-shadow: 0px 3px 0px #f2f2f2;
  border-radius: 10px;
}
.answer.active {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 20px;
  gap: 10px;
  background: #ffffff;
  border: 2px solid #0f0f0f;
  box-shadow: 0px 3px 0px #0f0f0f;
  border-radius: 10px;
}
.answer.active.checkFalse {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 20px;
  gap: 10px;
  background: #ffffff;
  border: 2px solid #fb4d4d;
  box-shadow: 0px 3px 0px #fb4d4d;
  border-radius: 10px;
}
.answer.active.checkTrue {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 20px;
  gap: 10px;
  background: #ffffff;
  border: 2px solid #04c35c;
  box-shadow: 0px 3px 0px #04c35c;
  border-radius: 10px;
}

.answer-text.active {
  border: none;
  background: #f2f2f2;
  box-shadow: inset 0px 2px 4px rgb(0 0 0 / 4%);
  border-radius: 5px;
  color: #f2f2f2;
  pointer-events: none;
}

.answer.showAnswerCorrect,
.answer-text.showAnswerCorrect {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 20px;
  gap: 10px;
  background: #ffffff;
  border: 2px solid #04c35c;
  box-shadow: 0px 3px 0px #04c35c;
  border-radius: 10px;
}
.btn-group {
  padding: 30px 50px 20px 50px;
  display: flex;
  justify-content: space-around;
}
.btn-skip,
.btn-check-answer,
.btn-active-check-answer {
  border-radius: 5px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 110%;
  text-align: center;
  text-transform: uppercase;
  border-style: none;
  width: 334px;
  height: 44px;
}
.btn-skip {
  background: #f2f2f2;
  color: #0f0f0f;
  &:hover {
    background: #dedede;
  }
}
.btn-check-answer {
  background: #f2f2f2;
  color: #c1c1c1;
}
.btn-active-check-answer {
  background: #dd0000;
  color: #ffffff;
  &:hover {
    background: #ad0000;
  }
}
.progress-bar {
  background: #f2f2f2;
}
.progress-bar.true {
  background: #04c35c;
}
.progress-bar.false {
  background: #fb4d4d;
}

::v-deep .el-card__header {
  padding: 0;
}
::v-deep .el-card__body {
  padding: 0;
}

.question-choice {
  text-align: center;
  padding: 0 71.5px 32px 71.5px;
}
.field-answer {
  min-width: 108px;
  min-height: 41px;
  border: none;
  background: #f2f2f2;
  box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.04);
  border-radius: 5px;
}

.field-answer.active {
  background: #ffbd00;
  box-shadow: inset 0px 2px 4px #ffbd00;
  color: #ffffff;
  margin: 5px;
}

.field-answer.active.checkFalse {
  background: #fb4d4d;
  box-shadow: inset 0px 2px 4px #fb4d4d;
}
.field-answer.active.checkTrue {
  background: #04c35c;
  box-shadow: inset 0px 2px 4px #04c35c;
}
.answer-choice {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  padding: 0 71.5px 32px 71.5px;
}
.answer-text {
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: start;
  padding: 12px 20px;
  gap: 10px;
  width: 100%;
  min-height: 66px;
  background: #ffffff;
  border: 2px solid #f2f2f2;
  box-shadow: 0px 3px 0px #f2f2f2;
  border-radius: 10px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: #0f0f0f;
}
.question-image {
  text-align: center;
  margin-bottom: 20px;
}
.question-image img {
  text-align: center;
  max-height: 200px;
  border-radius: 15px;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  display: none;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
.propskill-home-container-skeleton {
  margin: 0 auto;
  width: 833px;
  margin-top: 45px;
}
.exam-card-skeleton {
  height: 724px;
  width: 100%;
  border: 2px solid #eee;
  border-radius: 10px;
  margin-bottom: 45px;
}
.card-header-skeleton {
  height: 61px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-header-text-skeleton {
  width: 20%;
  height: 28px;
  text-align: center;
}
.line-skeleton {
  height: 63px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.progress-bar-skeleton {
  height: 12px;
  width: 90%;
  border-radius: 10px;
}
.progress-bar-text-skeleton {
  width: 10%;
  height: 16px;
  margin-top: 3px;
}
.question-skeleton {
  height: 96px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.question-text-skeleton {
  height: 20px;
  width: 60%;
}
.answer-group-skeleton {
  height: 371px;
  width: 100%;
  padding: 0 71.5px 32px 71.5px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.answer-skeleton {
  height: 66px;
  width: 100%;
  border: 2px solid #eee;
  display: flex;
  align-items: center;
  padding: 0px 12px;
  border-radius: 10px;
}
.anwser-text-skeleton {
  width: 20%;
  height: 40%;
}
.btn-group-skeleton {
  height: 130px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 40px 72.5px 30px 72.5px;
}
.btn-line-skeleton {
  height: 44px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.btn-skip-skeleton {
  height: 100%;
  width: 300px;
  border-radius: 10px;
}
.card-header-text-skeleton,
.progress-bar-text-skeleton,
.question-text-skeleton,
.anwser-text-skeleton,
.btn-skip-skeleton,
.progress-bar-skeleton {
  color: transparent;
  appearance: none;
  -webkit-appearance: none;
  background-color: #eee;
  border-color: #eee;
}
</style>

<script lang="ts">
// Composition API

import { QuestionModel } from '@/services/features/elearning/elearning.model';
import {
  finishLesson,
  finishTopic,
  getDetailCourse,
  getDetailLesson,
  getListQuestion,
  getListTopic,
  getUserLesson,
} from '@/services/features/elearning/elearning.service';
import {
  AnswersEnum,
  AnswersIndexEnum,
  FreeTypeEnum,
  QuestionTypeEnum,
  StatusPaymentEnum,
} from '@/services/shared/enum';
import { parseToMoney, useInit } from '@/services/shared/utils';
import { defineComponent, onMounted, reactive, Transition, watch } from 'vue';
import { Constant } from '@/services/shared/constant';

// Định nghĩa data type của component [data] bằng Typescript
class PropskillDoExamPageData {
  isLoading: boolean;
  lessonId: string;
  topicId: string;
  topicActive: any;
  lesson: any;
  userLesson: any;
  questions: QuestionModel[];
  correctQuestions: string[];
  questionActive: QuestionModel | null;
  indexQuestion: number;
  answerSelect: AnswersEnum | null;
  checkResultAnswer: boolean;
  fillInBank: string[];
  activeAnswer: string;
  progressAnswers: string[];
  dialogSuccessLesson: boolean;
}

export default defineComponent({
  name: 'PropskillDoHomeworkPage',
  components: { Transition },
  setup() {
    // Setup Default
    const { base } = useInit();
    const data = reactive<PropskillDoExamPageData>({
      isLoading: false,
      topicId: '',
      topicActive: null,
      lessonId: base.route.params.id as string,
      lesson: null,
      userLesson: null,
      questions: [],
      correctQuestions: [],
      questionActive: null,
      indexQuestion: 0,
      answerSelect: null,
      checkResultAnswer: false,
      fillInBank: [],
      activeAnswer: '',
      progressAnswers: [],
      dialogSuccessLesson: false,
    });

    const switchAnswer = (activeAnswer: string) => {
      data.activeAnswer = activeAnswer;
    };

    const loadListTopic = async () => {
      // Get course Online
      data.isLoading = true;
      try {
        const responseTopic = await getListTopic(data.lessonId);
        if (responseTopic?.result.topics && Array.isArray(responseTopic?.result.topics)) {
          responseTopic?.result.topics.map((doc: any) => {
            if (doc.id === data.topicId && doc.hasPractice && doc.questions.length > 0) {
              data.topicActive = doc;
            }
          });
        }
        if (!data.topicActive) {
          base.router.push({ name: 'propskill-progess-topic', params: { id: data.lessonId } });
          return;
        }
        data.questions = data.topicActive.questions.map((doc: any, indexQuestion: number) => {
          data.progressAnswers.push('');
          doc.id = indexQuestion + 1;
          if (doc.type === QuestionTypeEnum.FILL_IN_BLANK) {
            doc.arrsTitle = doc.title.split('{blank}');
          }
          if (doc.answers && Array.isArray(doc.answers)) {
            doc.answers = doc.answers.map((item: any, index: number) => {
              return {
                ...item,
                answer: AnswersIndexEnum[index],
              };
            });
          }
          return doc;
        });
        data.questionActive = data.questions[data.indexQuestion];
      } finally {
        setTimeout(() => {
          data.isLoading = false;
        }, 300);
      }
    };

    const onSelectAnswer = (key: AnswersEnum) => {
      data.answerSelect = key;
      if (data.questionActive?.type === QuestionTypeEnum.FILL_IN_BLANK) {
        const valueBlank = data.questionActive?.answers[AnswersIndexEnum[data.answerSelect]].title;
        if (data.fillInBank.length === 0) {
          data.fillInBank = valueBlank.split('{/}');
        } else {
          data.fillInBank = [];
          setTimeout(() => {
            data.fillInBank = valueBlank.split('{/}');
          }, 0);
        }
      }
    };

    const onCheckResult = () => {
      data.checkResultAnswer = true;
      const checkResult = data.questionActive?.answers?.find(
        (doc) => doc.isCorrect && doc.answer === data.answerSelect
      );
      if (checkResult && data.questionActive?.id) {
        data.correctQuestions.push(data.questionActive?.id);
        data.progressAnswers[data.indexQuestion] = 'true';
      } else {
        data.progressAnswers[data.indexQuestion] = 'false';
      }
    };

    const nextQuestion = async () => {
      data.isLoading = true;
      if (data.indexQuestion === data.questions.length - 1) {
        await finishTopic({
          lessonId: data.lessonId,
          topicId: data.topicId,
          time: 1,
        });
        data.dialogSuccessLesson = true;
        let check = true;
        const responseTopic = await getListTopic(data.lessonId);
        if (responseTopic?.result.topics && Array.isArray(responseTopic?.result.topics)) {
          responseTopic?.result.topics.map((doc: any) => {
            if (!doc.isPassed) {
              check = false;
            }
          });
        }
        if (check) {
          await finishLesson({
            lessonId: data.lessonId,
            time: 1,
            correctQuestions: [],
          });
        }
        return;
      }
      setTimeout(() => {
        data.isLoading = false;
      }, 300);
      window.scrollTo(0, 0);
      data.indexQuestion++;
      data.questionActive = data.questions[data.indexQuestion];
      data.checkResultAnswer = false;
      data.answerSelect = null;
      data.fillInBank = [];
    };

    const checkPaid = async () => {
      const responseLesson = await getDetailLesson(data.lessonId);
      const responseCourse = await getDetailCourse(responseLesson?.result?.course?.id);
      if (
        responseCourse?.result?.typeFree !== FreeTypeEnum.FREE &&
        responseCourse?.result?.statusPayment !== StatusPaymentEnum.PAID
      ) {
        base.router.push({
          name: 'propskill-detail-course',
          params: { id: responseLesson?.result?.course?.id },
          query: { needPayment: 'payment' },
        });
      }
    };

    const initPage = async () => {
      await Promise.all([loadListTopic(), checkPaid()]);
    };

    // Life cycle event
    onMounted(async () => {
      if (base.route.query && base.route.query.topicId && typeof base.route.query.topicId === 'string') {
        data.topicId = base.route.query.topicId;
      }
      if (!data.topicId) {
        base.router.push({ name: 'propskill-progess-topic', params: { id: data.lessonId } });
      }
      await initPage();
    });

    const closeDialogSuccess = () => {
      base.router.push({
        name: 'propskill-progess-topic',
        params: { id: data.lessonId },
        query: { topicId: data.topicId },
      });
    };

    const reloadPage = () => {
      window.location.reload();
    };

    const skipQuestion = () => {
      data.isLoading = true;
      data.checkResultAnswer = true;
      data.progressAnswers[data.indexQuestion] = 'false';
      nextQuestion();
      window.scrollTo(0, 0);
      setTimeout(() => {
        data.isLoading = false;
      }, 300);
    };

    return {
      data,
      onSelectAnswer,
      onCheckResult,
      switchAnswer,
      Constant,
      QuestionTypeEnum,
      nextQuestion,
      closeDialogSuccess,
      reloadPage,
      skipQuestion,
    };
  },
});
</script>
