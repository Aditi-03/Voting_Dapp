import { authConstants } from "./constants";
import axios from "../helpers/axios";
//import { createDispatchHook } from "react-redux";

export const login = (user) => {
  console.log(user);

  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.LOGIN_REQUEST });
      const res = await axios.post(`/admin/signin`, user);
      if (res.status === 200) {
        //const { token, firstName, lastName, email } = res.data;
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: { token, user },
        });
      }
    } catch (error) {
      dispatch({
        type: authConstants.LOGIN_FAILED,
        payload: { error: error.response.data.errors },
      });
    }
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,

        payload: {
          error: "Failed to login",
        },
      });
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    localStorage.clear();
    dispatch({ type: authConstants.LOGOUT_REQUEST });
    // const res = await axios.post(`/admin/signout`);

    // if(res.status === 200){
    //     localStorage.clear();
    //     dispatch({ type: authConstants.LOGOUT_SUCCESS });
    // }else{
    //     dispatch({
    //         type: authConstants.LOGOUT_FAILURE,
    //         payload: { error: res.data.error }
    //     });
  };
};
