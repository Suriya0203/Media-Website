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
	VIEW_POST_ERR,
	VIEW_ALL_USER,
	FRIEND_ADDEED_FAIL,
	FRIEND_ADDEED_SUCCESSS,
	PROFILE_UPDATED_ERROR,
	PROFILE_UPDATED_SUCCESSFULLY,
	PASSWORD_CHANGED_SUCCESSFULLY,
	PASSWORD_CHANGED_FAILURE,
} from "../actions/types";

const initialState = {
	token: localStorage.getItem("token"),
	isAuthenticated: false,
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
			window.location.replace('/dashboard')
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
		case PASSWORD_CHANGED_SUCCESSFULLY:
		alert("Passowrd changed successfully")		
		return{
					...state,
					isAuthenticated: true,
					loading: false,
					user:action.payload
				};
		case PASSWORD_CHANGED_FAILURE:
		case IMAGE_UPLOAD_SUCCESS:
			alert("post created successfully")
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
		case VIEW_ALL_USER:
				return {
					...state,
					isAuthenticated: true,
					loading: false,
					user: action.payload.data,
				};
		case FRIEND_ADDEED_SUCCESSS:
			return{
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload.data,
			};
		case FRIEND_ADDEED_FAIL:
		case PROFILE_UPDATED_SUCCESSFULLY:
			alert(action.payload.message)
			return{
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload.data,
			}
		default:
			return state;
	}
}
