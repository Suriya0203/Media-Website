import axios from "axios";
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	COMMENT_ADDED_FAIL,
	COMMENT_ADDED_SUCCESS,
	LOGOUT,
	FRIENDS_DETAILS,
	IMAGE_UPLOAD_SUCCESS,
	IMAGE_UPLOAD_FAIL,
	VIEW_POST,
	VIEW_POST_ERR,
	VIEW_ALL_USER,
	FRIEND_ADDEED_SUCCESSS,
	FRIEND_ADDEED_FAIL,
	PROFILE_UPDATED_ERROR,
	PROFILE_UPDATED_SUCCESSFULLY,
	FETCH_PRODUCTS_BEGIN,
	FETCH_PRODUCTS_FAILURE,
	FETCH_PRODUCTS_SUCCESS,
	FETCH_IMAGE_BEGIN,
	FETCH_IMAGE_FAILURE,
	FETCH_IMAGE_SUCCESS,
	FETCH_FRIENDS_BEGIN,
	FETCH_FRIENDS_FAILURE,
	FETCH_FRIENDS_SUCCESS,
	REMOVE_FRIEND_BEGIN,
	REMOVE_FRIEND_SUCCESSFULLY,
	REMOVE_FRIEND_FAILURE,
	FETCH_COMMENTS_SUCCESS,
	FETCH_COMMENTS_BEGIN,
	FETCH_COMMENTS_FAILURE,
	DELETE_POST_SUCCESS,
	DELETE_POST_FAILURE,
	COMMENT_DELETED_SUCCESSFULLY,
	COMMENT_DELETED_FAILURE
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
	localStorage.removeItem("token");
	console.log('suriya')
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
				type: PROFILE_UPDATED_SUCCESSFULLY,
				payload: res.data,
			});

		} catch (err) {

			
            console.log(err)
            

			dispatch({
				type: PROFILE_UPDATED_ERROR,
			});
		}
	};
export const getAlluser =()=>async(dispatch)=>{
		console.log("suriya")
		try{
			const res=await axios.get("http://localhost:2000/alluser")
			dispatch({
				type:VIEW_ALL_USER,
				payload:res.data
			})
			// dispatch(loadUser());
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


export const AddfriendByid =
	( id,name) =>
	async (dispatch) => {
		console.log(id,"kavin")
		console.log("suriya prakash")
		try {
			const res = await axios.get(
				`http://localhost:2000/addfriend/${id}/${name}`,
			);

			dispatch({
				type: FRIEND_ADDEED_SUCCESSS,
				payload: res.data,
			});

	
		} catch (err) {

			
            console.log(err)
            

			dispatch({
				type: FRIEND_ADDEED_FAIL,
			});
		}
	};
	export const fetchProductsBegin = () => ({
		type: FETCH_PRODUCTS_BEGIN
	  });
	  
	  export const fetchProductsSuccess = data => ({
		// console.log(data)
		type: FETCH_PRODUCTS_SUCCESS,
		payload:  data 
	  });
	  
	  export const fetchProductsFailure = error => ({
		type: FETCH_PRODUCTS_FAILURE,
		payload: { error }
	  });

export function fetchProducts(id) {
		console.log(id)
		console.log("suriya")
		return dispatch => {
		  dispatch(fetchProductsBegin());
		  return axios.get("http://localhost:2000/alluser",

		  )
			
			.then(res =>
				// console.log(res)
				res.json={data: res.data})
			.then(json => {
				//console.log(12345,json.data)
			  dispatch(fetchProductsSuccess(json.data));
			  console.log(json.data)
			  return json.data;
			})
			.catch(error => {
				console.log(error)
				dispatch(fetchProductsFailure(error))});
		};
	  }

////////
///////



export const fetchimagesBegin = () => ({
	type: FETCH_IMAGE_BEGIN
  });
  
  export const fetchimagesSuccess = data => ({
	// console.log(data)
	type: FETCH_IMAGE_SUCCESS,
	payload:  data 
  });
  
  export const fetchimagesFailure = error => ({
	type: FETCH_IMAGE_FAILURE,
	payload: { error }
  });

export function fetchimages() {
	console.log("suriya")
	return dispatch => {
	  dispatch(fetchimagesBegin());
	  return axios.get("http://localhost:2000/allpost",

	  )
		
		.then(res =>
			// console.log(res)
			res.json={data: res.data})
		.then(json => {
			//console.log(12345,json.data)
		  dispatch(fetchimagesSuccess(json.data));
		  console.log(json.data)
		  return json.data;
		})
		.catch(error => {
			console.log(error)
			dispatch(fetchimagesFailure(error))});
	};
  }

///////
///////


export const fetchFriendsBegin = () => ({
	type: FETCH_FRIENDS_BEGIN
  });
  
  export const fetchFriendsSuccess = data => ({
	// console.log(data)
	type: FETCH_FRIENDS_SUCCESS,
	payload:  data 
  });
  
  export const fetchFriendsFailure = error => ({
	type: FETCH_FRIENDS_FAILURE,
	payload: { error }
  });

export function fetchFriendsdetails() {
	console.log("suriya")
	return dispatch => {
	  dispatch(fetchFriendsBegin());
	  return axios.get("http://localhost:2000/viewfriends",

	  )
		
		.then(res =>
			// console.log(res)
			res.json={data: res.data})
		.then(json => {
			//console.log(12345,json.data)
		  dispatch(fetchFriendsSuccess(json.data));
		  console.log(json.data)
		  return json.data;
		})
		.catch(error => {
			console.log(error)
			dispatch(fetchFriendsFailure(error))});
	};
  }


  /////
  //////
  //////


  export const removeFriend =
  ( id) =>
  async (dispatch) => {
	  console.log(id,"kavin")
	  console.log("suriya prakash")
	  try {
		  const res = await axios.delete(
			  `http://localhost:2000/removefriend/${id}`,
		  );

		  dispatch({
			  type: REMOVE_FRIEND_SUCCESSFULLY,
			  payload: res.data,
		  });

  
	  } catch (err) {

		  
		  console.log(err)
		  

		  dispatch({
			  type: REMOVE_FRIEND_FAILURE,
		  });
	  }
  };




  /////

  /////




  

export const fetchcommentsBegin = () => ({
	type: FETCH_COMMENTS_BEGIN
  });
  
  export const fetchcommentsSuccess = data => ({
	// console.log(data)
	type: FETCH_COMMENTS_SUCCESS,
	payload:  data 
  });
  
  export const fetchcommentsFailure = error => ({
	type: FETCH_COMMENTS_FAILURE,
	payload: { error }
  });

export function fetchcomments(id) {
	console.log("suriya")
	console.log(id)
	return dispatch => {
	  dispatch(fetchcommentsBegin());
	  return axios.get(`http://localhost:2000/comments/${id}`,

	  )
		
		.then(res =>
			// console.log(res)
			res.json={data: res.data})
		.then(json => {
			//console.log(12345,json.data)
		  dispatch(fetchcommentsSuccess(json.data));
		  console.log(json.data)
		  dispatch(loadUser());
		  return json.data;
		})
		.catch(error => {
			console.log(error)
			dispatch(fetchcommentsFailure(error))});
	};
  }

////

export const AddComment=(formdata)=>async(dispatch)=>{
	console.log(formdata)
	try {
		const res = await axios.post(
			"http://localhost:2000/addcomment",
			formdata,
		);

		dispatch({
			type: COMMENT_ADDED_SUCCESS,
			payload: res.data,
		});	
}catch(err){
	console.log(err)
	dispatch({
		type: COMMENT_ADDED_FAIL,
	});	
}
}



//////




export const DeletePost =
( id) =>
async (dispatch) => {
	console.log(id,"kavin")
	console.log("suriya prakash")
	try {
		const res = await axios.delete(
			`http://localhost:2000/deletepost/${id}`,
		);

		dispatch({
			type: DELETE_POST_SUCCESS,
			payload: res.data,
		});


	} catch (err) {

		
		console.log(err)
		

		dispatch({
			type: DELETE_POST_FAILURE,
		});
	}
};

/////
/////



export const DeleteComment =
( id) =>
async (dispatch) => {
	console.log(id,"kavin")
	console.log("suriya prakash")
	try {
		const res = await axios.delete(
			`http://localhost:2000/deletecomment/${id}`,
		);

		dispatch({
			type: COMMENT_DELETED_SUCCESSFULLY,
			payload: res.data,
		});


	} catch (err) {

		
		console.log(err)
		

		dispatch({
			type: COMMENT_DELETED_FAILURE,
		});
	}
};



