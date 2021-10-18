import { ChatActionTypes } from "./chat.types";

export const onSetRooms = (rooms) => ({
  type: ChatActionTypes.ON_SET_ROOMS,
  payload: rooms,
});

export const onConnectSocket = () => ({
  type: ChatActionTypes.ON_CONNECT_SOCKET,
  payload: null,
});

export const onSetRoomUsers = (roomUsers) => ({
  type: ChatActionTypes.ON_SET_ROOM_USERS,
  payload: roomUsers,
});

export const onMessageRecieved = (msg) => ({
  type: ChatActionTypes.ON_MESSAGE_RECIEVED,
  payload: msg,
});

export const onClearMessages = () => ({
  type: ChatActionTypes.ON_CLEAR_MESSAGES,
  payload: null,
});

export const onSetPreviousMessages = (previousMsgs) => ({
  type: ChatActionTypes.ON_SET_PREVIOUS_MESSAGES,
  payload: previousMsgs,
});
