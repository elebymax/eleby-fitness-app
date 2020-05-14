import { Module } from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import { SnackBarState } from './types';
import { RootState } from '../types';

export const state: SnackBarState = {
  messageData: {
    color: '',
    text: '',
  },
  isShow: false,
};

const namespaced = true;

export const messageSnackBar: Module<SnackBarState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
