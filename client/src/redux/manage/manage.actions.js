import { ManageActionTypes } from "./manage.types";

export const onGetUsers = () => ({
  type: ManageActionTypes.ON_GET_USERS,
  payload: null,
});

export const onGetUsersSuccess = (users) => ({
  type: ManageActionTypes.ON_GET_USERS_SUCCESS,
  payload: users,
});

export const onGetUsersFailure = (err) => ({
  type: ManageActionTypes.ON_GET_USERS_FAILURE,
  payload: err,
});
