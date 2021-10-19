import { httpService } from "../../DAL/httpService";
import { onFetchStart, onFetchFailed, onQueryUsersSuccess, onGetUserSuccess } from "./manage.actions";

const url = "http://localhost:3100/api";

export const asyncOnQueryUsers = (query) => {
  return async (dispatch) => {
    dispatch(onFetchStart());
    try {
      const result = await httpService("get", `${url}/users?query=${query}`);
      dispatch(onQueryUsersSuccess(result.data.users));
    } catch (err) {
      dispatch(onFetchFailed(err.message));
    }
  };
};

export const asyncOnGetUser = (email) => {
  return async (dispatch) => {
    dispatch(onFetchStart());
    try {
      const result = await httpService("get", `${url}/user?email=${email}`);
      dispatch(onGetUserSuccess(result.data));
    } catch (err) {
      dispatch(onFetchFailed(err.message));
    }
  };
};
