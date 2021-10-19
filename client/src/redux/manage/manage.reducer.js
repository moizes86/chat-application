import { ManageActionTypes } from "./manage.types";

const INITIAL_STATE = {
  loading: false,
  fetchError: null,
  users: [],
  user: null,
};

const manageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ManageActionTypes.ON_FETCH_START:
      return {
        ...state,
        loading: true,
      };

    case ManageActionTypes.ON_FETCH_FAILED:
      return {
        ...state,
        fetchError: action.payload,
        loading: false,
      };

    case ManageActionTypes.ON_QUERY_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };

    case ManageActionTypes.ON_GET_USER_SUCCESS:
      return {
        ...state,
        user: { details: action.payload.details, messages: action.payload.messages },
        loading: false,
      };

    case ManageActionTypes.ON_CLEAR_USERS:
      return {
        ...state,
        users: [],
      };

    default:
      return state;
  }
};

export default manageReducer;
