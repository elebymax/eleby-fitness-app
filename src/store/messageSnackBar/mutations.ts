import {MutationTree} from 'vuex';
import {SnackBarState, MessageData} from './types';

export default {
  setColor(state, color: string) {
    state.messageData.color = color;
  },
  setText(state, text: string) {
    state.messageData.text = text;
  },
  setMessageData(state, messageData: MessageData) {
    state.messageData = messageData;
  },
  setIsShow(state, isShow: boolean) {
    state.isShow = isShow;
  },
  show(state) {
    state.isShow = true;
  },
  dismiss(state) {
    state.isShow = false;
  }
} as MutationTree<SnackBarState>;
