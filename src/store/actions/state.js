import { call } from "../../services/api";
import { serverErrorMessage } from "../../utils/messages";
import { ADD_ERROR, DELETE_STATE, REMOVE_ERROR, SET_LOADING, SET_STATE, SET_STATES, SET_SUCCESS } from "../type";

export const getStates = () => {
    return async (dispatch) => {
        dispatch({ type: SET_LOADING });
        try {
            const response = await call("get", "states");
            const result = response.data;

            const transformResult = result.map((data) => {
                return {
                    ...data,
                    key: data.id,
                };
            });
            dispatch({
                type: SET_STATES,
                payload: transformResult,
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

export const deleteState = (id) => {
    return async (dispatch) => {
        dispatch({ type: SET_SUCCESS, payload: false });
        dispatch({ type: SET_LOADING });
        try {
            await call("delete", `states/${id}`);

            dispatch({ type: SET_SUCCESS, payload: true });
            dispatch({ type: DELETE_STATE, payload: id });
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

export const createState = (data) => {
    return async (dispatch) => {
        dispatch({ type: SET_SUCCESS, payload: false });
        dispatch({ type: SET_LOADING });
        try {
            await call("post", "states", data);

            dispatch({ type: SET_SUCCESS, payload: true });
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

export const getState = (id) => {
    return async (dispatch) => {
        dispatch({ type: SET_LOADING });
        try {
            const response = await call("get", `states/${id}`);
            const result = response.data;

            dispatch({
                type: SET_STATE,
                payload: result,
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

export const editState = (id, data) => {
    return async (dispatch) => {
        dispatch({ type: SET_SUCCESS, payload: false });
        dispatch({ type: SET_LOADING });
        try {
            await call("post", `states/${id}?_method=PUT`, data);

            dispatch({ type: SET_SUCCESS, payload: true });
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
