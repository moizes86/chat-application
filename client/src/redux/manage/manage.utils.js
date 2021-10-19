import { httpService } from "../../DAL/httpService";
import {
  onQueryUsersStart,
  onQueryUsersSuccess,
  onQueryUsersFailure,
} from "./manage.actions";

const url = "http://localhost:3100/api";

export const asyncOnQueryUsers = (query) => {
  return async (dispatch) => {
    dispatch(onQueryUsersStart());
    try {
      const result = await httpService("get", `${url}/users?query=${query}`);
      dispatch(onQueryUsersSuccess(result.data.users));
    } catch (err) {
      dispatch(onQueryUsersFailure(err.message));
    }
  };
};
