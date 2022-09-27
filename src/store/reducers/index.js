import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import status from "./status";
import error from "./error";
import state from "./state";
import district from "./district";
import township from "./township";
const reducers = combineReducers({
    auth,
    status,
    error,
    state,
    township,
    district

});
export default reducers;