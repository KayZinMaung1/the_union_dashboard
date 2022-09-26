import { call, setAccessToken } from "../../services/api";
import { serverErrorMessage } from "../../utils/messages";
import { ADD_ERROR, DELETE_USER, REMOVE_ERROR, SET_CURRENT_USER, SET_LOADING, SET_SUCCESS, SET_USERS } from "../type";

export const authUser = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: REMOVE_ERROR });
    try {
      const response = await call("post", "io-login", data);
      const { name, phone, position, access_token } = response.data;

      localStorage.setItem("jwtToken", access_token);
      dispatch({
        type: SET_CURRENT_USER,
        payload: { name, phone, position, access_token },
      });
      dispatch({
        type: REMOVE_ERROR,
      });
      setAccessToken(access_token);
    }
    catch (error) {
      // console.log("Error:", error.response )
      const { status, data } = error.response;
      if (status === 401) {
        localStorage.removeItem("jwtToken");
        dispatch({
          type: ADD_ERROR,
          payload: data.data.message,
        });
      }
      if (status === 500) {
        dispatch({
          type: ADD_ERROR,
          payload: serverErrorMessage,
        });
      }

    }
    dispatch({ type: SET_LOADING });
  };
};

export const getUser = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await call("get", "user");
      const { name, phone, position } = response.data;

      dispatch({
        type: SET_CURRENT_USER,
        payload: { name, phone, position },
      });
      dispatch({
        type: REMOVE_ERROR,
      });
    } catch (error) {
      const { status, data } = error.response;

      if (status === 401) {
        localStorage.removeItem("jwtToken");
        dispatch({
          type: ADD_ERROR,
          payload: data.message,
        });
      }
      if (status === 500) {
        dispatch({
          type: ADD_ERROR,
          payload: serverErrorMessage,
        });
      }
    }
    dispatch({ type: SET_LOADING });
  };
};



export const logout = () => {
  return async (dispatch) => {
    localStorage.removeItem("jwtToken");
    setAccessToken(null);
    dispatch({
      type: SET_CURRENT_USER,
      payload: {},
    });
    dispatch({
      type: REMOVE_ERROR,
    });
  }
}

export const registerUser = (data) => {
  return async (dispatch) => {
    dispatch({
      type: SET_SUCCESS,
      payload: false,
    });
    dispatch({ type: SET_LOADING });
    try {
      await call("post", "io-register", data);

      dispatch({
        type: SET_SUCCESS,
        payload: true,
      });
      dispatch({
        type: REMOVE_ERROR,
      });
    } catch (error) {
      const { status, data } = error.response;

      if (status === 401) {
        localStorage.removeItem("jwtToken");
        dispatch({
          type: ADD_ERROR,
          payload: data.data.message,
        });
      }
      if (status === 422) {
        dispatch({
          type: ADD_ERROR,
          payload: data.errors.phone[0],
        });
      }
      if (status === 500) {
        dispatch({
          type: ADD_ERROR,
          payload: serverErrorMessage,
        });
      }
    }

    dispatch({ type: SET_LOADING });
    setTimeout(() => {
      dispatch({ type: SET_SUCCESS, payload: false });
    }, 1);
  };
};

export const getUsers = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });

    try {
      const response = await call("get", "users");
      const result = response.data;

      const transfromResult = result.map((data) => {
        return {
          ...data,
          key: data.id,
        };
      });

      dispatch({
        type: SET_USERS,
        payload: transfromResult,
      });
      dispatch({
        type: REMOVE_ERROR,
      });
    } catch (error) {
      const { status, data } = error.response;

      if (status === 401) {
        localStorage.removeItem("jwtToken");
        dispatch({
          type: ADD_ERROR,
          payload: data.message,
        });
      }

      if (status === 500) {
        dispatch({
          type: ADD_ERROR,
          payload: serverErrorMessage,
        });
      }
    }
    dispatch({ type: SET_LOADING });
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      await call("delete", `users/${id}`);

      dispatch({ type: SET_SUCCESS, payload: true });
      dispatch({ type: DELETE_USER, payload: id });
      dispatch({
        type: REMOVE_ERROR,
      });
    } catch (error) {
      const { status, data } = error.response;

      if (status === 401) {
        localStorage.removeItem("jwtToken");
        dispatch({
          type: ADD_ERROR,
          payload: data.message,
        });
      }

      if (status === 500) {
        dispatch({
          type: ADD_ERROR,
          payload: serverErrorMessage,
        });
      }
    }
    setTimeout(() => {
      dispatch({ type: SET_SUCCESS, payload: false });
    }, 1);

    dispatch({ type: SET_LOADING });
  };
};