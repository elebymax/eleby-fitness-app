import { Module } from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import { UserState } from './types';
import { RootState } from '../types';

export const state: UserState = {
  token: '',
  user: undefined,
  error: false,
};

const namespaced = true;

export const user: Module<UserState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
