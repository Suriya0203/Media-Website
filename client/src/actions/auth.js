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
	COMMENT_DELETED_FAILURE,
	LIKE_ADDED_SUCCESSFULLY,
	LIKE_ADDED_FAILURE,
	REMOVE_LIKE_SUCCESSSFULL,
	REMOVE_LIKE_FAILURE,
	EDIT_COMMENT_SUCCESSFULL,
	EDIT_COMMENT_FAILURE,
	SEARCH_USER_SUCCESS,
	SEARCH_USER_FAILURE,
	VIEW_USER_PROFILE_SUCCESSFULLY,
	VIEW_USER_PROFILE_FAILURE,
	PASSWORD_CHANGED_SUCCESSFULLY,
	PASSWORD_CHANGED_FAILURE,
	GET_POST_FAILURE,
	GET_POST_SUCCESS
	
} from "./types";
import setAuthToken from "../utils/setAuthToken";

// Load User
export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get("http://localhost:5000/auth");

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
				"http://localhost:5000/register",
				body,
				config
			);

			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});

			dispatch(loadUser());
		} catch (err) {
			const errors = err.response.status;
			
            console.log(err)
            if(errors===400){
				alert("user already exists")
			}

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
	console.log(email)
	const body = JSON.stringify({ email, password });

	try {
		const res = await axios.post(
			"http://localhost:5000/login",
			body,
			config
		);
		console.log(res)
		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});
		
		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.status;

		// if (errors) {
		// 	// errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        //     console.log(errors)
        // }
		console.log(errors)
		if(errors===400){
			alert("Password doesn't match")
		}
		else if(errors===401){
			alert("user not found")
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
			"http://localhost:5000/friends",
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

export const logout = () => async(dispatch) => {
	console.log("logout")
	localStorage.removeItem("token");
	console.log('suriya')
	dispatch({ type: LOGOUT });
};

export const Imageupload=(formdata)=>async(dispatch)=>{
	try {
		const res = await axios.post(
			"http://localhost:5000/createpost",
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
		const res=await axios.get("http://localhost:5000/viewpost")
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
				"http://localhost:5000/editprofile2",
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

	
export const profile2 =
(formdata) =>
async (dispatch) => {
	// const config = {
	// 	headers: {
	// 		"Content-Type": "application/json",
	// 	},
	// };

	// const body = JSON.stringify({ name, email, phone });

	try {
		const res = await axios.post(
			"http://localhost:5000/editprofile2",
			formdata
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
			const res=await axios.get("http://localhost:5000/alluser")
			dispatch({
				type:VIEW_ALL_USER,
				payload:res.data
			})
			// dispatch(loadUser());
			// console.log(res.data)
			dispatch(loadUser());
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
				`http://localhost:5000/addfriend/${id}/${name}`,
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
		  return axios.get("http://localhost:5000/alluser",

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
	  return axios.get("http://localhost:5000/allpost",

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
	  return axios.get("http://localhost:5000/viewfriends",

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
			  `http://localhost:5000/removefriend/${id}`,
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
	  return axios.get(`http://localhost:5000/comments/${id}`,

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
			"http://localhost:5000/addcomment",
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
			`http://localhost:5000/deletepost/${id}`,
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
			`http://localhost:5000/deletecomment/${id}`,
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



////

export const Addlike =
( id) =>
async (dispatch) => {
	console.log(id,"kavin")
	console.log("suriya prakash")
	try {
		const res = await axios.put(
			`http://localhost:5000/addlike/${id}`,
		);

		dispatch({
			type: LIKE_ADDED_SUCCESSFULLY,
			payload: res.data,
		});


	} catch (err) {

		
		console.log(err)
		

		dispatch({
			type: LIKE_ADDED_FAILURE,
		});
	}
};





/////
export const RemoveLike =
( id) =>
async (dispatch) => {
	console.log(id,"kavin")
	console.log("suriya prakash")
	try {
		const res = await axios.delete(
			`http://localhost:5000/removelike/${id}`,
		);

		dispatch({
			type: REMOVE_LIKE_SUCCESSSFULL,
			payload: res.data,
		});


	} catch (err) {

		
		console.log(err)
		

		dispatch({
			type: REMOVE_LIKE_FAILURE,
		});
	}
};



export const EditComments =
( formData) =>
async (dispatch) => {
	// console.log(id,"kavin")
	console.log("suriya prakash")
	try {
		const res = await axios.put(
			`http://localhost:5000/editcomment`,
			formData
		);

		dispatch({
			type: EDIT_COMMENT_SUCCESSFULL,
			payload: res.data,
		});


	} catch (err) {

		
		console.log(err)
		

		dispatch({
			type: EDIT_COMMENT_FAILURE,
		});
	}
};


////
export const SearchUsers =()=>async(dispatch)=>{
	console.log("suriya")
	try{
		const res=await axios.get("http://localhost:5000/alluser")
		dispatch({
			type:SEARCH_USER_SUCCESS,
			payload:res.data
		})
		// dispatch(loadUser());
		// console.log(res.data)
		return res.data
	}
	catch(err){
		console.log(err)
		dispatch({
			type:SEARCH_USER_FAILURE
		})
	}
}


///



export const ViewUserprofile =
( id) =>
async (dispatch) => {
	console.log(id,"kavin")
	console.log("suriya prakash")
	try {
		const res = await axios.get(
			`http://localhost:5000/search/${id}`,
		);

		dispatch({
			type: VIEW_USER_PROFILE_SUCCESSFULLY,
			payload: res.data,
		});


	} catch (err) {

		
		console.log(err)
		

		dispatch({
			type: VIEW_USER_PROFILE_FAILURE,
		});
	}
};

/////



export const ChangePassword_action =
( formData) =>
async (dispatch) => {
	// console.log(id,"kavin")
	console.log("suriya prakash")
	try {
		const res = await axios.post(
			`http://localhost:5000/changepassword`,
			formData
		);

		dispatch({
			type: PASSWORD_CHANGED_SUCCESSFULLY,
			payload: res.data,
		});


	} catch (err) {

		
		console.log(err)
		

		dispatch({
			type: PASSWORD_CHANGED_FAILURE,
			payload:err
		});
	}
};
////
////

export const GetPost =
( id) =>
async (dispatch) => {
	console.log(id,"kavin")
	console.log("suriya prakash")
	try {
		const res = await axios.get(
			`http://localhost:5000/getpost/${id}`,
		);

		dispatch({
			type: GET_POST_SUCCESS,
			payload: res.data,
		});


	} catch (err) {

		
		console.log(err)
		

		dispatch({
			type: GET_POST_FAILURE,
		});
	}
};

