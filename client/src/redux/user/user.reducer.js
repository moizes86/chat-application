import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
  currentUser: {email:'moshe.mn86@gmail.com', username:'Moshe'},
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

    case UserActionTypes.LOGOUT_CURRENT_USER:
      return {
        ...state,
        currentUser: null,
      };

    default:
      return state;
  }
};

export default userReducer;
