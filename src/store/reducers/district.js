import { DELETE_DISTRICT, SET_DISTRICT, SET_DISTRICTS } from "../type";



const initialState = {
    districts: [],
    district: {},
};

const state = (state = initialState, action) => {
    switch (action.type) {
        case SET_DISTRICT:
            return {
                ...state,
                district: action.payload,
            };
        case SET_DISTRICTS:
            return {
                ...state,
                districts: action.payload,
            };
        case DELETE_DISTRICT:
            return {
                ...state,
                districts: state.districts.filter((district) => district.id !== action.payload),
            };
        default:
            return state;
    }
};

export default state;
