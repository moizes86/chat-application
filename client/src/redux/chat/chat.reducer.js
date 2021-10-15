import { ChatActionTypes } from "./chat.types";
import { joinRoom, leaveRoom } from "./chat.utils";

const INITIAL_STATE = {
  rooms: [],
  messages: [],
  usersInRoom: [],
  socket: null,
};

const chatReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ChatActionTypes.ON_JOIN_ROOM:
      joinRoom(action.payload);
      return {
        ...state,
      };

    case ChatActionTypes.ON_CREATE_SOCKET:
      return {
        ...state,
      };

    case ChatActionTypes.ON_CREATE_ROOM:
      console.log(action.payload);
      return {
        ...state,
      };

    case ChatActionTypes.ON_SEND_MESSAGE:
      return {
        ...state,
      };

    case ChatActionTypes.ON_LEAVE_ROOM:
      leaveRoom(action.payload);
      return {
        ...state,
      };

    case ChatActionTypes.ON_GET_ROOMS_LIST:
      return {
        ...state,
      };

    case ChatActionTypes.ON_GET_PREVIOUS_MESSAGES:
      return {
        ...state,
      };

    case ChatActionTypes.ON_MESSAGE_RECIEVED:
      state.messages.push(action.payload);
      return {
        ...state,
      };

    case ChatActionTypes.ON_CLEAR_MESSAGES:
      state.messages = [];
      return {
        ...state,
      };

    case ChatActionTypes.ON_SET_USERS_IN_ROOM:
      state.usersInRoom = action.payload;
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default chatReducer;
