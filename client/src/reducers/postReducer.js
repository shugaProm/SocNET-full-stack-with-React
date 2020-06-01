import { ADD_POST } from "../actions/types";

const initialstate = {
  posts: [],
  post: {},
  loading: false,
};

export default function (state = initialstate, action) {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    default:
      return state;
  }
}
