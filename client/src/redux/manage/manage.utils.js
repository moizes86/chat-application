import { httpService } from "../../DAL/httpService";
import { onGetUsersSuccess, onGetUsersFailure } from "./manage.actions";

const url = "http://localhost:3100/api";

export const asyncOnGetUsers = () => {
  return async (dispatch) => {
    try {
      const users = await httpService("get", `${url}/users`);
      dispatch(onGetUsersSuccess(users));
    } catch (err) {
      dispatch(onGetUsersFailure(err.message));
    }
  };
};
