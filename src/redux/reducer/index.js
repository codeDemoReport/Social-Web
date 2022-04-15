import { combineReducers } from "redux";
import { LOGIN, EMAIL_VERIFY, GET_LIST_POST } from "../../utils/constant";

const initialState = {
  infoUser: {},
  emailVerify: "",
  postList: [],
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
    case EMAIL_VERIFY: {
      return {
        ...state,
        emailVerify: action.payload,
      };
    }
    default:
      return state;
  }
}

export default combineReducers({
  reducer,
});
