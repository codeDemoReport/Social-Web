import { combineReducers } from "redux";
import { LOGIN, EMAIL_VERIFY } from "../../utils/constant";

const initialState = {
  infoUser: {},
  emailVerify: ""
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        infoUser: { ...action.payload },
      };
    }
    case EMAIL_VERIFY: {
      return {
        ...state,
        emailVerify: action.payload
      }
    }
    default:
      return state;
  }
}

export default combineReducers({
  reducer,
});
