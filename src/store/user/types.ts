export interface User {
  id: number;
  name: string;
  token?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface UserResponse {
  success: boolean;
  message: string;
  data: any;
  paginate?: {
    total: number;
  };
}

export interface UserSubmit {
  email: string;
  password: string;
}

export interface UserState {
  user?: User;
  error: boolean;
}
