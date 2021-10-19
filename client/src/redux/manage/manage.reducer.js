import { ManageActionTypes } from "./manage.types";

const INITIAL_STATE = {
  loading: false,
  fetchError: null,
  users: [],
};

const manageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ManageActionTypes.ON_QUERY_USERS_START:
      return {
        ...state,
        loading: true,
      };

    case ManageActionTypes.ON_QUERY_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };

    case ManageActionTypes.ON_QUERY_USERS_FAILURE:
      return {
        ...state,
        fetchError: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default manageReducer;
