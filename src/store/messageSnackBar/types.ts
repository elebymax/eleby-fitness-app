export interface SnackBarState {
  isShow: boolean,
  messageData: MessageData
}

export interface MessageData {
  color?: string;
  text?: string;
}
