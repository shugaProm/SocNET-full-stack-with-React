import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// Register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("api/users/register", userData)
    .then(res => history.push("/login")) // redirects to login
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // now, the response contains the token, save token to localStorage
      const { token } = res.data; // pull token from the response object
      // set token to localstorage
      localStorage.setItem("jwtToken", token);
      // set token to Auth header ===== imported from setAuthToken.js
      setAuthToken(token);
      // decode token to get user data
      const decoded = jwt_decode(token);
      // set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// log user out
export const logoutUser = () => dispatch => {
  // remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header from future request
  setAuthToken(false);
  // set current user to empty object which will set isAutenticated to false
  dispatch(setCurrentUser({}));
};
