// import { authConstants, userConstants } from "./constants";
// import axios from "../helpers/axios";

// export const signup = (user) => {
//   console.log(user);

//   return async (dispatch) => {
//     try {
//       dispatch({ type: userConstants.USER_REGISTER_REQUEST });
//       const res = await axios.post(
//         `http://localhost2000/api/admin/signup`,
//         user
//       );
//       if (res.status === 201) {
//         //const { token, firstName, lastName, email } = res.data;
//         const { message } = res.data;
//         // localStorage.setItem("token", token);
//         // localStorage.setItem("user", JSON.stringify(user));

//         dispatch({
//           type: userConstants.USER_REGISTER_SUCCESS,
//           payload: { message },
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       dispatch({
//         type: userConstants.USER_REGISTER_FAILURE,
//         payload: { error: error.reponse.data.errors },
//       });
//     }
//   };
// };

import { authConstants, userConstants } from "./constants";
import axios from "../helpers/axios";

export const signup = (user) => {
  console.log(user);

  return async (dispatch) => {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST });
    const res = await axios.post(`/admin/signup`, {
      ...user,
    });

    if (res.status === 201) {
      const { message } = res.data;
      dispatch({
        type: userConstants.USER_REGISTER_SUCCESS,
        payload: { message },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: userConstants.USER_REGISTER_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};
