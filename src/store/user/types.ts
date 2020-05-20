export interface User {
  name: string;
  email: string;
  token?: string;
  createdAt?: string;
}

export interface UserState {
  token?: string;
  user?: User;
  error: boolean;
}
