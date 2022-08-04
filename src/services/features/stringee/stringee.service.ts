import { StringeeSetting } from './../../shared/enum';

import { AppConstant } from '@/app.constant';
import { convertTime, parseEmail, parsePhoneLead, useInit } from './../../shared/utils';
import { CommunicationApiClient } from './../../../api/communication.api';
import { routeCall, saveHistory } from '../communicaiton/communication.service';
declare let StringeeCall: any;
declare let StringeeClient: any;
import { Subject } from 'rxjs';
import { ExploitEnum, LeadModel } from '../lead/lead.model';
import router from '@/router';
import { CallBelongType } from '../communicaiton/communication.model';

const subjectNotification = new Subject();
export class VoiceCallService {
  isInCalling = false;
  isTest = false;
  stringeeClient: any;
  call: any;
  interval: any;
  time = 0;
  callInfo: any;
  isNotification: any;
  idLead: null;
  callId: null;
  customer: LeadModel;
  exploitStatus: ExploitEnum;

  async getNotification() {
    return subjectNotification.asObservable();
  }

  async getCallToken() {
    const headersClient = {
      client_id: process.env.VUE_APP_STRINGEE_CLIENT_ID,
      client_secret: process.env.VUE_APP_STRINGEE_CLIENT_SECRET,
    };
    const stringeeToken = localStorage.getItem('stringee_token');
    const expStringeeToken = localStorage.getItem('stringee_token_exp');
    const now = Math.floor(Date.now() / 1000) - 60;
    const exp = now + 3600;
    const params = {
      email: localStorage.getItem('user_email'),
      name: localStorage.getItem('user_name'),
      phone: localStorage.getItem('user_phone'),
    };
    if (stringeeToken && expStringeeToken && now <= +expStringeeToken && localStorage.getItem('stringee_id')) {
      return stringeeToken;
    }
    if (
      !localStorage.getItem('userId') ||
      !localStorage.getItem('user_email') ||
      !localStorage.getItem('user_name') ||
      !localStorage.getItem('user_phone')
    ) {
      return null;
    }
    const res: any = await CommunicationApiClient.getToken(params, headersClient);
    if (res) {
      localStorage.setItem('stringee_token', res.data.callToken);
      localStorage.setItem('stringee_token_exp', exp + '');
      localStorage.setItem('stringee_id', parseEmail(localStorage.getItem('email') + ''));
      return res.data.callToken;
    }
    return null;
  }

  async callOutWithRouteCall(callRequest: any) {
    const {
      toNumber,
      isPhoneId,
      name,
      isMobileCarrier,
      mobileCarriers,
      numberMobileMethodCarriers,
      idLead,
      exploitStatus,
      lead,
    } = callRequest;
    const _this = this; // eslint-disable-line @typescript-eslint/no-this-alias
    _this.idLead = idLead;
    _this.exploitStatus = exploitStatus;
    _this.customer = lead;
    // checking have another call
    if (this.isInCalling) {
      subjectNotification.next({
        isSuccess: false,
        error: 'Đã có lỗi xảy ra',
        message: 'Bạn đang thực hiện một cuộc gọi. Vui lòng kết thúc nó để bắt đầu cuộc gọi mới',
      });
    }

    // check to call to my self
    if (localStorage.getItem('stringee_id') === toNumber) {
      subjectNotification.next({
        isSuccess: false,
        error: 'Đã có lỗi xảy ra',
        message: 'Bạn không thể gọi tới chính mình.',
      });
    }
    this.isInCalling = true;
    const body = {
      fromUserId: localStorage.getItem('stringee_id') + '',
      toNumber,
      isPhoneId,
      isMobileCarrier,
      mobileCarriers,
      numberMobileMethodCarriers,
    };
    const res: any = await routeCall(body);
    if (!this.stringeeClient) {
      this.isInCalling = false;
      subjectNotification.next({
        isSuccess: false,
        error: 'Đã có lỗi xảy ra',
        message: 'Tài khoản không thể thực hiện cuộc gọi',
      });
    }
    this.call = new StringeeCall(this.stringeeClient, res.data.fromNumber, res.data.toNumber);

    let result: any = {};
    result = await this.settingCallEvents(this.call);
    if (!result.isSuccess) {
      return result;
    }
    this.call.makeCall(function (res: any) {
      if (res.callId) {
        _this.callId = res.callId;
      }
      if (res.r === 0) {
        // const callWaitingPlayer: any = document.getElementById('callWaitingPlayer');
        const callOut: any = document.getElementById('call-out');
        const callOutNumber: any = document.getElementById('call-out-number');
        // callWaitingPlayer.setAttribute('currentTime', 0);
        // callWaitingPlayer.play();
        callOut.classList.remove('hide');
        callOut.classList.add('show');
        if (isPhoneId) {
          callOutNumber.innerHTML = '';
        } else {
          callOutNumber.innerHTML = name.trim() ? parsePhoneLead(name) : 'Khách Hàng';
        }

        return { isSuccess: true };
      }
      let message = '';
      switch (res.r) {
        case StringeeSetting.CALL_NOT_ALLOWED_BY_YOUR_SERVER:
          message = 'Hiện người này đang trong 1 cuộc gọi khác. Vui lòng gọi lại trong giây lát.';
          break;
        case StringeeSetting.GET_USER_MEDIA_ERROR:
          message = 'Thiết bị của bạn không hỗ trợ cuộc gọi. Vui lòng kiểm tra lại.';
          break;
        case StringeeSetting.FROM_NUMBER_OR_TO_NUMBER_INVALID_FORMAT:
          message = 'Số điện thoại gọi đi hoặc gọi đến không tồn tại, Vui lòng kiểm tra lại.';
          break;
        case StringeeSetting.TO_NUMBER_INVALID:
          message = 'Số điện thoại không tồn tại, Vui lòng kiểm tra lại.';
          break;
        case StringeeSetting.ACCOUNT_LOCKED:
          message = 'Account bị khoá';
          break;
      }
      _this.call = null;
      _this.hideCallPopup(_this.idLead, _this.exploitStatus);
      subjectNotification.next({
        isSuccess: false,
        error: 'Đã có lỗi xảy ra',
        message: message,
      });
    });
    return result;
  }

  rejectCall() {
    this.hideCallPopup(this.idLead, this.exploitStatus);
    this.call.reject();
  }

  hangupCall() {
    const remoteVideo: any = document.getElementById('remoteVideo');

    this.hideCallPopup(this.idLead, this.exploitStatus);
    remoteVideo.setAttribute('srcObject', null);
    this.call.hangup(function () {}); // eslint-disable-line @typescript-eslint/no-empty-function
  }

  disconnect() {
    this.stringeeClient.disconnect();
  }

  settingClientEvents(client: any) {
    const _this = this; // eslint-disable-line @typescript-eslint/no-this-alias

    this.stringeeClient = client;

    client.on('connect', function (info: any) {}); // eslint-disable-line @typescript-eslint/no-empty-function

    client.on('authen', function (res: any) {
      // if (res.r !== 0) {
      //   setTimeout(() => {
      //     localStorage.removeItem('stringee_token');
      //     _this.getCallToken().then((r) => {
      //       client.connect(r);
      //     });
      //   }, 1000);
      // }
    });

    client.on('disconnect');

    client.on('incomingcall', function (incomingcall: any) {}); // eslint-disable-line @typescript-eslint/no-empty-function

    client.on('requestnewtoken', function () {
      localStorage.removeItem('stringee_token');

      _this.getCallToken().then((r) => {
        client.connect(r);
      });
    });

    client.on('otherdeviceauthen', function (data: any) {}); // eslint-disable-line @typescript-eslint/no-empty-function
  }

  settingCallEvents(call1: any) {
    this.call = call1;
    const _this = this; // eslint-disable-line @typescript-eslint/no-this-alias

    call1.on('error', function () {
      _this.call = null;
      _this.hideCallPopup(_this.idLead, _this.exploitStatus);

      subjectNotification.next({
        isSuccess: false,
        error: 'Đã có lỗi xảy ra',
        message: 'Thiết bị của bạn không hỗ trợ cuộc gọi. Vui lòng kiểm tra lại.',
      });
    });

    call1.on('addlocalstream', function (stream: any) {}); // eslint-disable-line @typescript-eslint/no-empty-function

    call1.on('addremotestream', function (stream: any) {
      const remoteVideo: any = document.getElementById('remoteVideo');
      remoteVideo.srcObject = null;
      remoteVideo.srcObject = stream;
    });

    call1.on('signalingstate', function (state: any) {
      switch (state.code) {
        case StringeeSetting.ANSWERED: // calling
          _this.countTime();
          break;
        case StringeeSetting.BUSY: // busy here
          _this.hideCallPopup(_this.idLead, _this.exploitStatus);
          break;
        case StringeeSetting.ENDED: // call ended
          _this.hideCallPopup(_this.idLead, _this.exploitStatus);
          if (state.sipCode === StringeeSetting.TEMPORARILY_UNAVAILABLE) {
            subjectNotification.next({
              isSuccess: false,
              error: 'Đã có lỗi xảy ra',
              message: 'Số điện thoại không tồn tại, Vui lòng kiểm tra lại',
            });
          }
          break;
      }
    });

    call1.on('mediastate', function (state: any) {}); // eslint-disable-line @typescript-eslint/no-empty-function

    call1.on('info', function (info: any) {}); // eslint-disable-line @typescript-eslint/no-empty-function

    call1.on('otherdevice', function (data: any) {
      if ((data.type === 'CALL_STATE' && data.code >= 200) || data.type === 'CALL_END') {
        _this.hideCallPopup(_this.idLead, _this.exploitStatus);
      }
    });
    return { isSuccess: true };
  }

  countTime() {
    this.time = 0;
    const callOut: any = document.getElementById('call-out');
    // const callWaitingPlayer: any = document.getElementById('callWaitingPlayer');
    const countTime: any = document.getElementById('count-time');
    callOut.classList.add('is-answer');
    // callWaitingPlayer.pause();
    this.interval = setInterval(() => {
      this.time++;
      countTime.innerHTML = convertTime(this.time);
    }, 1000);
  }

  async hideCallPopup(idLead: string | null, exploitStatus?: ExploitEnum) {
    // const callWaitingPlayer: any = document.getElementById('callWaitingPlayer');
    const callOut: any = document.getElementById('call-out');
    const countTime: any = document.getElementById('count-time');
    if (
      idLead &&
      idLead !== null &&
      exploitStatus &&
      [ExploitEnum.PROCESSING, ExploitEnum.REASSIGN, ExploitEnum.ASSIGN].includes(exploitStatus) &&
      this.time > 0
    ) {
      router.push({ name: 'lead-update', params: { id: idLead } });
    }

    if (
      idLead &&
      idLead !== null &&
      exploitStatus &&
      [ExploitEnum.PROCESSING, ExploitEnum.REASSIGN, ExploitEnum.PROCESSING].includes(exploitStatus) &&
      this.time > 0
    ) {
      router.push({ name: 'lead-update', params: { id: idLead } });
    }

    this.time = 0;
    this.idLead = null;
    this.isInCalling = false;
    clearInterval(this.interval);
    callOut.classList.add('hide');
    callOut.classList.remove('show');
    countTime.innerHTML = '00:00';
    // callWaitingPlayer.pause();
    callOut.classList.remove('is-answer');
    if (this.callId && this.customer) {
      const body = {
        type: 'stringee_call',
        call_id: this.callId,
        typeBelong: CallBelongType.LEAD,
        leadId: this.customer.id,
        agentInfoName: this.customer.name,
        agentInfoCode: this.customer.code,
        agentInfoPhone: this.customer.phone,
        agentInfoEmail: this.customer.email,
        note: this.customer.note ? this.customer.note : '',
      };
      setTimeout(() => {
        saveHistory(body);
        this.callId = null;
      }, 3000);
    }
  }

  connect(token: string) {
    this.stringeeClient = new StringeeClient();
    VoiceCallService.prototype.settingClientEvents(this.stringeeClient);
    this.stringeeClient._stringeeServerAddr = AppConstant.URL_STRINGEE;
    this.stringeeClient.connect(token);
  }
}
