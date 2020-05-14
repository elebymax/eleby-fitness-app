import {GetterTree} from 'vuex';
import {SnackBarState} from './types';
import {RootState} from '../types';

export default {
  color(state): string {
    const { messageData } = state;
    return (messageData && messageData.color) || '';
  },
  text(state): string {
    const { messageData } = state;
    return (messageData && messageData.text) || '';
  },
  isShow(state): boolean {
    const { isShow } = state;
    return isShow || false;
  },
} as GetterTree<SnackBarState, RootState>;
