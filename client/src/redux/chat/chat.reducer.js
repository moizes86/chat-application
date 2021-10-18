import { ChatActionTypes } from "./chat.types";
import { io } from "socket.io-client";

const INITIAL_STATE = {
  rooms: [],
  messages: [],
  roomUsers: [],
  socket: null,
};

const chatReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ChatActionTypes.ON_CONNECT_SOCKET:
      return {
        ...state,
        socket: io("http://localhost:3100"),
      };

    case ChatActionTypes.ON_SET_ROOMS:
      return {
        ...state,
        rooms: action.payload,
      };

    case ChatActionTypes.ON_SET_ROOM_USERS:
      return {
        ...state,
        roomUsers: action.payload,
      };

    case ChatActionTypes.ON_MESSAGE_RECIEVED:
      state.messages.push(action.payload);
      return {
        ...state,
      };

    case ChatActionTypes.ON_CLEAR_MESSAGES:
      return {
        ...state,
        messages: [],
      };

    case ChatActionTypes.ON_SET_PREVIOUS_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };

    default:
      return state;
  }
};

export default chatReducer;
