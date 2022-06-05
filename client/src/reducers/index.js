import { combineReducers } from "redux";
import auth from "./auth";
import post from "./post";
import image from "./image"
export default combineReducers({
	auth,
	post,
	image
});