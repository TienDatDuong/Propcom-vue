export enum NewsStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export class NewsModel {
  id: string;
  code: string;
  name: string;
  category: any;
  project: any;
  startDate: string;
  endDate: string;
  coverImage: string;
  content: string;
  isHot: boolean;
  status: NewsStatusEnum;
  slug: string;
  favorites: any[];
  thumbnailUrl: string;

  constructor(init?: Partial<NewsModel>) {
    Object.assign(this, init);
  }
}
