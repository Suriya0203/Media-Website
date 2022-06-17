import {

	GET_POST_FAILURE,
    GET_POST_SUCCESS,
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
			case GET_POST_FAILURE:
			case GET_POST_SUCCESS:
				return{
                    ...state,
                    user:action.payload
                }
            default:
			return state;
        }
        
        }
