<template>
  <div class="app-call-out">
    <section id="call-out" class="call-out">
      <div class="call-out__info">
        <div class="wrap-info-text">
          <section class="wrap-status display-flex">
            <div class="wrap-status-text">
              <span class="status-text">Cuộc gọi đi</span>
            </div>
          </section>
          <section class="wrap-info">
            <div class="info-name"><span id="call-out-number"></span></div>
          </section>
        </div>
      </div>
      <div class="call-out__action" id="call-out-action">
        <section class="wrap-time">
          <div id="count-time" class="call-out__count-time">00:00</div>
        </section>
        <div class="wrap-circle" id="call-out-action-circle">
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle last"></div>
        </div>
        <button
          id="call-out-action-hangup"
          class="call-out__action__hangup btn-action-incomming btn-round border-none"
          @click="hangupCall()"
        >
          <img src="@/assets/images/reject.svg" class="icon" id="btn-call-out-ring" />
          <img src="@/assets/images/end-call.svg" class="icon" id="btn-call-out-answer" />
        </button>
      </div>
    </section>
    <video id="remoteVideo" playsinline autoplay style="width: 100px" hidden="true"></video>
    <audio
      preload="auto"
      id="callWaitingPlayer"
      playsinline=""
      style="width: 1px"
      src="https://dxs-o2o-static.s3-ap-southeast-1.amazonaws.com/tones/waiting_tone.mp3"
      loop=""
    ></audio>
  </div>
</template>

<style lang="scss" scoped>
.app-call-out {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  & .call-out {
    position: absolute;
    right: 50px;
    bottom: 40px;
    width: 300px;
    border-radius: 4px;
    background: #333333 0% 0% no-repeat padding-box;
    z-index: 9;
    pointer-events: none;
    opacity: 0;

    &__count-time {
      font-size: 18px;
      color: #ffffff;
      text-align: center;
      letter-spacing: 0;
      opacity: 1;
      padding-bottom: 10px;
    }

    .border-none {
      border: none;
    }

    .btn-round {
      background: transparent;
    }

    .display-flex {
      display: flex;
    }

    &__info {
      width: 90%;
      margin-left: 5%;
      height: 80%;

      .wrap-status-text {
        margin-top: 20px;
        width: 100%;
        text-align: center;

        .status-text {
          font-size: 12px;
          letter-spacing: 0;
          color: #ffffff;
          opacity: 1;
        }
      }

      .info-name {
        text-align: center;
        font-size: 24px;
        color: #93cdff;
      }
    }

    &__action {
      width: 100%;
      text-align: center;

      .wrap-circle {
        width: 100px;
        margin: 0 auto;
        position: relative;
        overflow: hidden;
        color: white;
        text-align: center;
      }

      &__hangup {
        margin-top: 10px;
      }
    }

    .circle {
      float: left;
      margin-right: 12px;
      width: 10px;
      height: 10px;
      border-radius: 100%;
      background: rgba(255, 255, 255, 0.1);
      animation: calling 1s backwards infinite;

      @keyframes calling {
        from {
          background: rgba(255, 255, 255, 0.1);
        }
        to {
          background: rgba(255, 255, 255, 0.9);
        }
      }

      @for $i from 1 through 5 {
        &:nth-child(#{$i}) {
          animation-delay: $i * 0.2 + s;
        }
      }

      &.last {
        margin-right: 0;
      }
    }

    #btn-call-out-ring {
      display: block;
    }
    #btn-call-out-answer,
    &__count-time {
      display: none;
    }

    &.is-answer {
      .wrap-circle {
        display: none;
      }
      #btn-call-out-ring {
        display: none;
      }

      #btn-call-out-answer,
      .call-out__count-time {
        display: block;
      }
      .status-text {
        display: none;
      }
    }
  }

  & .show {
    pointer-events: auto;
    opacity: 0.9;
  }
  & .hide {
    pointer-events: none;
    opacity: 0;
  }
}
</style>

<script lang="ts">
// Composition API
import { defineComponent, onMounted, reactive, watch } from 'vue';
import { useInit } from '@/services/shared/utils';
import { VoiceCallService } from '@/services/features/stringee/stringee.service';

export default defineComponent({
  name: 'AppRouteCallDialog',
  setup(props: {}) {
    // Setup Default
    const { base } = useInit();

    const stringeeSetting = async () => {
      const res = await VoiceCallService.prototype.getCallToken();
      await VoiceCallService.prototype.connect(res);
    };

    const hangupCall = async () => {
      await VoiceCallService.prototype.hangupCall();
    };

    onMounted(async () => {
      await stringeeSetting();
    });

    return {
      // Component reactive data
      // Functions
      hangupCall,
    };
  },
});
</script>
