import { ManageActionTypes } from "./manage.types";
import { asyncOnGetUsers } from "./manage.utils";

const INITIAL_STATE = {
  loading: false,
  fetchError: null,
  users: [],
};

const manageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ManageActionTypes.ON_GET_USERS:
      return {
        ...state,
        loading: true,
      };

    case ManageActionTypes.ON_GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };

    case ManageActionTypes.ON_GET_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        fetchError: action.payload,
      };

    default:
      return state;
  }
};

export default manageReducer;
