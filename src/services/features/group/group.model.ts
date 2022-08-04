import { EmployeeStatusEnum } from '../employee/employee.model';

export enum PostMediaTypeEnum {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  YOUTUBE = 'YOUTUBE',
  FILE = 'FILE',
  THUMBNAIL = 'THUMBNAIL',
  VIDEO_FILE = 'VIDEO_FILE'
}

export enum GroupTypeEnum {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export enum GroupShowTypeEnum {
  SHOW = 'SHOW',
  HIDDEN = 'HIDDEN',
}

export enum GroupMemberStatusEnum {
  ACTIVE = 'ACTIVE',
  DEACTIVE = 'DEACTIVE',
}
export enum PostStatusEnum {
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
}

export enum GroupPostStatusEnum {
  WAITING = 'WAITING',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum GroupStatusEnum {
  'ACTIVE' = 'ACTIVE',
  'DEACTIVE' = 'DEACTIVE',
}

export enum GroupPostTypeEnum {
  MY_POST_WAITING = 'MY_POST_WAITING',
  MY_POST_ACTIVE = 'MY_POST_ACTIVE',
  MY_POST_INACTIVE = 'MY_POST_INACTIVE',
  MANAGE_POST_WAITING = 'MANAGE_POST_WAITING',
  MANAGE_POST_ACTIVE = 'MANAGE_POST_ACTIVE',
  MANAGE_POST_INACTIVE = 'MANAGE_POST_INACTIVE',
}

export enum GroupMemberOutStatusEnum {
  INIT = 'INIT', // không thuộc 2 case dưới, tham gia lần đầu
  KICKED = 'KICKED', // bị kick
  LEAVE = 'LEAVE' // tự rời nhóm
}

export enum GroupMemberRequestStatusEnum {
  WAITING = 'WAITING',
  APPROVED = 'APPROVED',
  REJECT = 'REJECT',
}

export enum TypeAllowCommentEnum {
  ON = 'ON', // Cho phép bình luận
  OFF = 'OFF', // Tắt bình luận
  HIDDEN = 'HIDDEN', // Ẩn bình luận
}

export class GroupModel {
  id: string;
  name: string;
  type: GroupTypeEnum;
  showType: GroupShowTypeEnum;
  coverImage: string;
  totalComments: number;
  totalPosts: number;
  totalMembers: number;
  totalPendingMembers: number;
  totalPendingPosts: number;
  isAdmin: boolean;
  isMember: boolean;
  isFollow: boolean;
  isSendRequest: boolean;
  isViewPublic: boolean;
  modifiedDate: string;
  shareUrl: string;
  description: string;

  constructor(init?: Partial<GroupModel>) {
    Object.assign(this, init);
  }
}

export class GroupPostModel {
  id: string;
  user: object; // Người đăng bài
  group: object; // Nhóm
  medias: any[]; // Ảnh, video, attachment files bài viết
  isPinned: boolean; // Ghim bài viết trên nhóm
  isFollow: boolean; // User đăng nhập đã theo dõi bài viết đó chưa
  isFavorite: boolean; // User đăng nhập đã like bài viết đó chưa
  isShared: boolean; // User đăng nhập đã chia sẻ bài viết đó chưa
  isComment: boolean; // User đăng nhập đã bình luận bài viết đó chưa
  // comments: [string];
  favorites: any[]; // like bài viết; danh sách những người đã liked bài viết
  // shares: [string]; // chia sẻ bài viết; danh sách những người (userId) đã chia sẻ bài viết
  status: string; // Trạng thái của bài viết
  requestStatusPost: string; // Trạng thái yêu cầu của bài viết khi đăng bài. Mặc định là cần được admin phê duyệt
  histories: any[]; // Lịch sử cập nhật
  description: string; // Nội dung bài viết
  modifiedBy: string;
  createdBy: string;
  createdDate: string;
  modifiedDate: string;
  totalFavorites: number;
  totalComments: number;
  totalShares: number;
  shareUrl: string;
  allowComment: string;
  isAdmin: boolean;
  poll: any;
  reasonReject: string;

  constructor(init?: Partial<GroupPostModel>) {
    Object.assign(this, init);
  }
}

export class GroupMemberModel {
  id: string | null;
  name: string;
  avatar: string | null;
  status: EmployeeStatusEnum;
  joinedDate: string | null;
  rejectedDate: string | null;
  requestedDate: string | null;
  isAdmin: boolean | null;
  userId: string | null;
  groupStatus: GroupMemberStatusEnum | null;
  outStatus: GroupMemberOutStatusEnum | null;
  requestStatus: GroupMemberRequestStatusEnum | null;
  rejectBy: any | null;

  constructor(init?: Partial<GroupMemberModel>) {
    Object.assign(this, init);
  }
}

export class GroupCommentModel {
  description: string;
  user: object;
  medias: object[];
  createdDate: string;
  id: string;
  totalFavorites: number;
  isFavorite: boolean;
  isComment: boolean;
  subComments: object[];
  value: string;
  totalComments: number;
  isDisable: boolean;

  constructor(init?: Partial<GroupCommentModel>) {
    Object.assign(this, init);
  }
}

export class CreateGroupPostModel {
  groupId: string;
  medias: any[];
  description: string;
  poll: any[]

  constructor(init?: Partial<CreateGroupPostModel>) {
    Object.assign(this, init);
  }
}

export class UpdateGroupPostModel {
  id: string;
  groupId: string;
  medias: any[];
  description: string;
  poll: any[]

  constructor(init?: Partial<UpdateGroupPostModel>) {
    Object.assign(this, init);
  }
}

export class PostPollModel {
  name: string;
  id: string;
  isAddOption: boolean;
  isMultipleSelection: boolean;
  answers: PostAnswerModel[];

  constructor(init?: Partial<PostPollModel>) {
    Object.assign(this, init);
  }
}

export class PostAnswerModel {
  id: string;
  name: string;

  constructor(init?: Partial<PostAnswerModel>) {
    Object.assign(this, init);
  }
}

export class OnOffCommentGroupPostModel {
  id: string;
  allowComment: TypeAllowCommentEnum;

  constructor(init?: Partial<OnOffCommentGroupPostModel>) {
    Object.assign(this, init);
  }
}