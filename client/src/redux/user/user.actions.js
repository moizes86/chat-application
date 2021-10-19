import { UserActionTypes } from "./user.types";

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const onLogout = () => ({
  type: UserActionTypes.ON_LOGOUT,
  payload: null,
});
