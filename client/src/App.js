import React, { useEffect } from "react";
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import "./App.css";
import Login from './components/login';
import Profile from "./components/profile"
// import Home from './components/home'
// import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteuserById from "./components/deletFriendbyid";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";
import AdduserById from "./components/addfriendbyid";
import Dashboard from "./components/dashboard";
import Register from "./components/register";
import ResponsiveAppBar from "./components/Navbar"
import  AddFriends from "./components/AddFriends";
import Post from './components/post'
import FriendsPage from './components/friendspage'
import Createpost from './components/createpost'
import Viewpost from "./components/viewpost";
import {ViewFriends} from './components/friends'
import Fetchimages from "./components/fetchimage";
import ViewFriendsdetails from './components/viewfriends';
import Comments from './components/comments';
import UserContainer from './components/check'
import Image from './components/image'
import DeletePostByid from "./components/deletepost";
import DeleteCommentById from "./components/Deletecomment";


if (localStorage.token) {

	setAuthToken(localStorage.token);
}
const App = ()=>{
  useEffect(() => {
		store.dispatch(loadUser());
	}, []);
  return( 
      <Router>
        <Routes>
            <Route exact path="/login" element={ <Login/> } />
            <Route exact path="/" element={ <Login/> } />
            <Route exact path="/register" element={ <Register/> } />
            <Route exact path="/dashboard" element={ <Dashboard/> } />
            <Route exact path="/profile" element={ <Profile/> } />
            <Route exact path="/navbar" element={ <ResponsiveAppBar/> } />
            <Route exact path="/friends" element={ <FriendsPage/> } />
            <Route exact path="/view_friends" element={ <ViewFriendsdetails/> } />
            <Route exact path="/add_friends" element={ <AddFriends/> } />
            <Route exact path="/alluser" element={ <UserContainer/> } />
            <Route exact path="/post" element={ <Post/> } />
            <Route exact path="/createpost" element={ <Createpost/> } />
            <Route exact path="/viewpost" element={ <Viewpost/> } />
            <Route exact path="/allpost" element={ <Fetchimages/> } />
            <Route exact path="/images" element={ <Image/> } />
            <Route exact path="/comments/:id" element={ <Comments/> } />
            <Route exact path="/viewfriends" element={ <ViewFriendsdetails/> } />
            <Route exact path="/addfriendbyid/:userId/:name" element={ <AdduserById/> } />
            <Route exact path="/removefriend/:userId" element={ <DeleteuserById
            /> } />
              <Route exact path="/deletepost/:postId" element={ <DeletePostByid
            /> } />
            <Route exact path="/deletecomment/:userId" element={ <DeleteCommentById/> } />
          </Routes>
        </Router>
    )};

export default App;