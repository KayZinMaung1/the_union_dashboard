import { DELETE_TOWNSHIP, SET_TOWNSHIP, SET_TOWNSHIPS } from "../type";



const initialState = {
    townships: [],
    township: {},
};

const state = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOWNSHIP:
            return {
                ...state,
                township: action.payload,
            };
        case SET_TOWNSHIPS:
            return {
                ...state,
                townships: action.payload,
            };
        case DELETE_TOWNSHIP:
            return {
                ...state,
                townships: state.townships.filter((township) => township.id !== action.payload),
            };
        default:
            return state;
    }
};

export default state;
