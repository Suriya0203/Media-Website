import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	FRIENDS_DETAILS,
	IMAGE_UPLOAD_FAIL,
	IMAGE_UPLOAD_SUCCESS,
	VIEW_POST,
	VIEW_POST_ERR
} from "../actions/types";

const initialState = {
	token: localStorage.getItem("token"),
	isAuthenticated: null,
	loading: true,
	user: null,
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: payload,
			};
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem("token", payload.token);
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: false,
			};
		case REGISTER_FAIL:
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case LOGOUT:
			localStorage.removeItem("token");
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
			};
		case FRIENDS_DETAILS:
			return{
				...state,
				isAuthenticated: true,
				loading: false,
				user:action.payload
			};
		case IMAGE_UPLOAD_SUCCESS:
			return{
				...state,
				isAuthenticated: true,
				user:payload
				
			}
		case IMAGE_UPLOAD_FAIL:

		case VIEW_POST:
			return{
				...state,
				user:action.payload
			}
		default:
			return state;
	}
}