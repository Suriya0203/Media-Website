import axios from "axios";
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	FRIENDS_DETAILS,
	IMAGE_UPLOAD_SUCCESS,
	IMAGE_UPLOAD_FAIL,
	VIEW_POST,
	VIEW_POST_ERR
} from "./types";
import setAuthToken from "../utils/setAuthToken";

// Load User
export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get("http://localhost:2000/auth");

		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

// Register User
export const register =
	({ name, email, password }) =>
	async (dispatch) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const body = JSON.stringify({ name, email, password });

		try {
			const res = await axios.post(
				"http://localhost:2000/register",
				body,
				config
			);

			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});

			dispatch(loadUser());
		} catch (err) {

			
            console.log(err)
            

			dispatch({
				type: REGISTER_FAIL,
			});
		}
	};

// Login User
export const login = (email, password) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const body = JSON.stringify({ email, password });

	try {
		const res = await axios.post(
			"http://localhost:2000/login",
			body,
			config
		);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});

		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			// errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
            console.log(errors)
        }

		dispatch({
			type: LOGIN_FAIL,
		});
	}
};

// Logout / Clear Profile
export const friends=()=>async(dispatch)=>{
	try{
		const res = await axios.get(
			"http://localhost:2000/friends",
		);
		dispatch({
			type: FRIENDS_DETAILS,
			payload:res.data
		})

	}
	catch(err){

		console.log(err)
		dispatch({
			type:LOGIN_FAIL
		})
	}
}

export const logout = () => (dispatch) => {
	dispatch({ type: LOGOUT });
};

export const Imageupload=(formdata)=>async(dispatch)=>{
	try {
		const res = await axios.post(
			"http://localhost:2000/createpost",
			formdata,
		);

		dispatch({
			type: IMAGE_UPLOAD_SUCCESS,
			payload: res.data,
		});	
}catch(err){
	console.log(err)
	dispatch({
		type: IMAGE_UPLOAD_FAIL,
	});	
}
}
export const Viewpostaction =()=>async(dispatch)=>{
	try{
		const res=await axios.get("http://localhost:2000/viewpost")
		dispatch({
			type:VIEW_POST,
			payload:res.data
		})
		// console.log(res.data)
		return res.data
	}
	catch(err){
		console.log(err)
		dispatch({
			type:VIEW_POST_ERR
		})
	}
}

export const profile =
	({ name, email, phone }) =>
	async (dispatch) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const body = JSON.stringify({ name, email, phone });

		try {
			const res = await axios.post(
				"http://localhost:2000/editprofile",
				body,
				config
			);

			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});

			dispatch(loadUser());
		} catch (err) {

			
            console.log(err)
            

			dispatch({
				type: REGISTER_FAIL,
			});
		}
	};
