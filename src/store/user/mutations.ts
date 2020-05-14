import { MutationTree } from 'vuex';
import { UserState, User } from './types';

export default {
  setUser(state, payload: User) {
    state.error = false;
    state.user = payload;
  },
  userError(state) {
    state.error = true;
    state.user = undefined;
  },
  logoutUser(state) {
    state.user = undefined;
  },
  setToken(state, token) {
    if (state.user) {
      state.user.token = token;
    }
  },
} as MutationTree<UserState>;
