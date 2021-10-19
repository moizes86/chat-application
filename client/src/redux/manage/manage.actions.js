import { ManageActionTypes } from "./manage.types";


export const onQueryUsersStart = () => ({
  type: ManageActionTypes.ON_QUERY_USERS_START,
  payload: null,
});

export const onQueryUsersSuccess = (users) => ({
  type: ManageActionTypes.ON_QUERY_USERS_SUCCESS,
  payload: users,
});

export const onQueryUsersFailure = (err) => ({
  type: ManageActionTypes.ON_QUERY_USERS_FAILURE,
  payload: err,
});
