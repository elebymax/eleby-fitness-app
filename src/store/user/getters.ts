import { GetterTree } from 'vuex';
import { UserState } from './types';
import { RootState } from '../types';

export default {
  token(state): string {
    const { token } = state;
    return token || '';
  },
  user(state): any {
    const { user } = state;
    return user;
  },
  error(state): boolean {
    const { error } = state;
    return error;
  },
} as GetterTree<UserState, RootState>;
