import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // if it exists, apply to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // delete Auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
