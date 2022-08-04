export class CallHistoryModel {
  stt: number;
  startTime: number;
  answerTime: number;
  stopTime: number;
  duration: number;
  answerDuration: number;
  clientId: string;
  callId: string;
  projectId: number;
  fromUserId: string;
  id: string;
  created: Date;
  from: CallHistoryEmployeeInfoModel;
  to: CallHistoryEmployeeInfoModel;
  note: string;
  rejectReason: string;

  constructor(init?: Partial<CallHistoryModel>) {
    Object.assign(this, init);
  }
}

export class CallHistoryEmployeeInfoModel {
  number: string;
  alias: string;
  agentInfo: AgentModel;
  callType: string;

  constructor(init?: Partial<CallHistoryEmployeeInfoModel>) {
    Object.assign(this, init);
  }
}

export class AgentModel {
  name: string;
  code: string;
  email: string;
  system: string;
  stringeeId: string;
  phone: string;
  avatarUrl: string;
  id: string;

  constructor(init?: Partial<CallHistoryEmployeeInfoModel>) {
    Object.assign(this, init);
  }
}

export enum CallBelongType {
  LEAD = 'LEAD',
  DEFAULT = 'DEFAULT',
}
