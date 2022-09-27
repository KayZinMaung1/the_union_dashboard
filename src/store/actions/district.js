import { call } from "../../services/api";
import { serverErrorMessage } from "../../utils/messages";
import { ADD_ERROR, DELETE_DISTRICT, REMOVE_ERROR, SET_DISTRICT, SET_DISTRICTS, SET_LOADING, SET_SUCCESS } from "../type";

export const getDistricts = () => {
    return async (dispatch) => {
        dispatch({ type: SET_LOADING });
        try {
            const response = await call("get", "districts");
            const result = response.data;

            const transformResult = result.map((data) => {
                return {
                    ...data,
                    key: data.id,
                };
            });
            dispatch({
                type: SET_DISTRICTS,
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

export const deleteDistirct = (id) => {
    return async (dispatch) => {
        dispatch({ type: SET_SUCCESS, payload: false });
        dispatch({ type: SET_LOADING });
        try {
            await call("delete", `districts/${id}`);

            dispatch({ type: SET_SUCCESS, payload: true });
            dispatch({ type: DELETE_DISTRICT, payload: id });
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

export const createDistrict = (data) => {
    return async (dispatch) => {
        dispatch({ type: SET_SUCCESS, payload: false });
        dispatch({ type: SET_LOADING });
        try {
            await call("post", "districts", data);

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

export const getDistrict = (id) => {
    return async (dispatch) => {
        dispatch({ type: SET_LOADING });
        try {
            const response = await call("get", `districts/${id}`);
            const result = response.data;

            dispatch({
                type: SET_DISTRICT,
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

export const editDistrict = (id, data) => {
    return async (dispatch) => {
        dispatch({ type: SET_SUCCESS, payload: false });
        dispatch({ type: SET_LOADING });
        try {
            await call("post", `districts/${id}?_method=PUT`, data);

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
