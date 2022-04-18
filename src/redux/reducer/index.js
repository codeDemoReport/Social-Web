import { combineReducers } from "redux";
import {
  LOGIN,
  EMAIL_VERIFY,
  GET_LIST_POST,
  LOADING,
  CREATE_POST,
  DELETE_POST,
  EDIT_POST,
} from "../../utils/constant";

const initialState = {
  infoUser: {},
  emailVerify: "",
  postList: [],
  loading: false,
  dataCreate: {},
  dataDelete: {},
  dataEdit: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        infoUser: { ...action.payload },
      };
    }
    case GET_LIST_POST: {
      return {
        ...state,
        postList: [...action.payload],
      };
    }
    case CREATE_POST: {
      return {
        ...state,
        dataCreate: { ...action.payload },
      };
    }
    case DELETE_POST: {
      return {
        ...state,
        dataDelete: { ...action.payload },
      };
    }
    case EDIT_POST: {
      return {
        ...state,
        dataEdit: { ...action.payload },
      };
    }
    case EMAIL_VERIFY: {
      return {
        ...state,
        emailVerify: action.payload,
      };
    }
    case LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    default:
      return state;
  }
}

export default combineReducers({
  reducer,
});
