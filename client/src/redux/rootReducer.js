import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import chatReducer from "./chat/chat.reducer";
import manageReducer from "./manage/manage.reducer";

const rootReducer = combineReducers({ user: userReducer, chat: chatReducer, manage: manageReducer });

export default rootReducer;
