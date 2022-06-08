import {

    SEARCH_USER_FAILURE,
	SEARCH_USER_SUCCESS,

} from "../actions/types";
const initialState = {
	user: [],
};
export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case SEARCH_USER_SUCCESS:
			return {
				...state,
				user: action.payload,
			};
            case SEARCH_USER_FAILURE:
                return{
                    ...state,
                    user:action.payload
                }
            default:
			return state;
        }
        
        }
