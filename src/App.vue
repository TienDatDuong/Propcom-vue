<template>
  <div id="app" data-view>
    <template v-if="dialogAppVisible">
      <AppHomeDialog :visible="dialogAppVisible" @goToApp="goToApp" />
    </template>
    <!-- Dynamic layout load -->
    <component v-else :is="$route.meta.layout || 'div'" class="app-container">
      <router-view :key="$route.path" />
    </component>
    <AppRouteCallDialog></AppRouteCallDialog>
  </div>
</template>

<script lang="ts">
import { Client } from '@stomp/stompjs';
import { defineComponent, onMounted, onUnmounted, provide, ref } from 'vue';
import { AppConstant } from './app.constant';
import { useInit } from './services/shared/utils';
import { ACTIONS_AUTH } from './store/modules/auth';
// import * as xx from './assets/js/stringee_sdk.min.js'

export default defineComponent({
  name: 'App',
  setup() {
    // Setup Default
    const { base, dialogAppVisible, isLoggedIn, currentUser } = useInit();
    // Meta
    const resizePage = () => {
      // We execute the same script as before
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    const client = ref<Client | null>(null);
    provide(AppConstant.PROVIDER_STOMP_CLIENT, client); // ✅ Provide as `stompClient`

    // Life circle
    onMounted(async () => {
      // We listen to the resize event
      window.addEventListener('resize', resizePage);
      // Resize on mount
      resizePage();
      // Setup websocket STOMP
      if (AppConstant.WS_URL && AppConstant.WS_LOGIN && AppConstant.WS_PASSCODE) {
        client.value = new Client({
          brokerURL: AppConstant.WS_URL,
          connectHeaders: {
            login: AppConstant.WS_LOGIN,
            passcode: AppConstant.WS_PASSCODE,
          },
          reconnectDelay: 5000,
          heartbeatIncoming: 4000,
          heartbeatOutgoing: 4000,
          //   stompSubscriber = client.subscribe("/exchange/spx.Exchange.spx-adsg.info", onStompMessage);
          // },
        });
        client.value.activate();
      }
    });

    const updateDialogAppVisible = (value: boolean) =>
      base.store.dispatch(`${ACTIONS_AUTH.ROOT}/${ACTIONS_AUTH.SET_DIALOG_APP_VISIBLE}`, value);

    const goToApp = () => {
      if (navigator.userAgent.toLowerCase().indexOf('android') > -1 && AppConstant.URL_PLAY_STORE) {
        window.location.href = AppConstant.URL_PLAY_STORE;
      }
      if (navigator.userAgent.toLowerCase().indexOf('iphone') > -1 && AppConstant.URL_APP_STORE) {
        window.location.href = AppConstant.URL_APP_STORE;
      }
    };

    onUnmounted(async () => {
      window.removeEventListener('resize', resizePage);
    });
    return {
      client,
      dialogAppVisible,
      updateDialogAppVisible,
      goToApp,
    };
  },
});
</script>
