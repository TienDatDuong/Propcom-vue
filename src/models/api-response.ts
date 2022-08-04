export class ApiResponse<T> {
  isSuccess: boolean;
  message: string;
  result: T;

  constructor(init?: Partial<ApiResponse<T>>) {
    Object.assign(this, init);
  }
}

export class ApiResponsePaging<T> {
  rows: T[] = [];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;

  constructor(init?: Partial<ApiResponsePaging<T>>) {
    Object.assign(this, init);
  }
}