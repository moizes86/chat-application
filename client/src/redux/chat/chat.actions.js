import { ChatActionTypes } from "./chat.types";

export const onCreateRoom = (data) => ({
  type: ChatActionTypes.ON_CREATE_ROOM,
  payload: data,
});

export const onSendMessage = (data) => ({
  type: ChatActionTypes.ON_SEND_MESSAGE,
  payload: data,
});

export const onJoinRoom = (data) => ({
  type: ChatActionTypes.ON_JOIN_ROOM,
  payload: data,
});

export const onLeaveRoom = (data) => ({
  type: ChatActionTypes.ON_LEAVE_ROOM,
  payload: data,
});

export const onGetRoomsList = (data) => ({
  type: ChatActionTypes.ON_GET_ROOMS_LIST,
  payload: data,
});

export const onGetPreviousMessages = (data) => ({
  type: ChatActionTypes.ON_GET_PREVIOUS_MESSAGES,
  payload: data,
});

export const onGetMessage = (data) => ({
  type: ChatActionTypes.ON_GET_MESSAGE,
  payload: data,
});

export const onCreateSocket = () => ({
  type: ChatActionTypes.ON_CREATE_SOCKET,
  payload: null,
});

export const onMessageRecieved = (data) => ({
  type: ChatActionTypes.ON_MESSAGE_RECIEVED,
  payload: data,
});

export const onClearMessages = () => ({
  type: ChatActionTypes.ON_CLEAR_MESSAGES,
  payload: null,
});

export const onSetUsersInRoom = (users)=>({
  type: ChatActionTypes.ON_SET_USERS_IN_ROOM,
  payload:users
})