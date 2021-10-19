import { ManageActionTypes } from "./manage.types";

export const onFetchStart = () => ({
  type: ManageActionTypes.ON_FETCH_START,
  payload: null,
});

export const onFetchFailed = (err) => ({
  type: ManageActionTypes.ON_FETCH_FAILED,
  payload: err,
});

export const onQueryUsersSuccess = (users) => ({
  type: ManageActionTypes.ON_QUERY_USERS_SUCCESS,
  payload: users,
});

export const onGetUserSuccess = (data) => ({
  type: ManageActionTypes.ON_GET_USER_SUCCESS,
  payload: data,
});

export const onClearUsers = () => ({
  type: ManageActionTypes.ON_CLEAR_USERS,
  payload: null,
});
