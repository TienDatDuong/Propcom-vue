export class ApiRequestPaging {
  page: number;
  pageSize: number;
  q?: string;
  [k: string]: any;               // any additional attributes

  constructor(init?: Partial<ApiRequestPaging>) {
    Object.assign(this, init);
  }
}