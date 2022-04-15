import { combineReducers } from "redux";
import { LOGIN } from "../../utils/constant";

const initialState = {
  infoUser: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        infoUser: { ...action.payload },
      };
    }
    default:
      return state;
  }
}

export default combineReducers({
  reducer,
});
