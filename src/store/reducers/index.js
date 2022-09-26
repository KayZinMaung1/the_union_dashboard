import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import status from "./status";
import error from "./error";
const reducers = combineReducers({
    auth,
    status,
    error,

});
export default reducers;