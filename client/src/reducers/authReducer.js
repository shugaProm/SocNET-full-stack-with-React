const initialstate = {
  isAuthenticated: false,
  user: {},
};

export default function (state = initialstate, action) {
  switch (action.type) {
    default:
      return state;
  }
}
