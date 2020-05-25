import isEmpty from "../validation/is-empty";
import { SET_CURRENT_USER } from "../actions/types";

const initialstate = {
  isAuthenticated: false,
  user: {},
};

export default function (state = initialstate, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload), // check if the payload is not empty
        user: action.payload,
      };
    default:
      return state;
  }
}
