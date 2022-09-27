import { DELETE_STATE, SET_STATE, SET_STATES } from "../type";


const initialState = {
    states: [],
    state: {},
};

const state = (state = initialState, action) => {
    switch (action.type) {
        case SET_STATE:
            return {
                ...state,
                state: action.payload,
            };
        case SET_STATES:
            return {
                ...state,
                states: action.payload,
            };
        case DELETE_STATE:
            return {
                ...state,
                states: state.states.filter((state) => state.id !== action.payload),
            };
        default:
            return state;
    }
};

export default state;
