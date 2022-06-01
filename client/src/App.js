import React, { useEffect } from "react";
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import "./App.css";
import Login from './components/login';
import Profile from "./components/profile"
// import Home from './components/home'
// import 'bootstrap/dist/css/bootstrap.min.css';
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";
import Dashboard from "./components/dashboard";
import Register from "./components/register";
import ResponsiveAppBar from "./components/Navbar"

import Post from './components/post'
import FriendsPage from './components/friendspage'
import Createpost from './components/createpost'
import Viewpost from "./components/viewpost";
import {ViewFriends} from './components/friends'
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
            <Route exact path="/view_friends" element={ <ViewFriends/> } />
            <Route exact path="/post" element={ <Post/> } />
            <Route exact path="/createpost" element={ <Createpost/> } />
            <Route exact path="/viewpost" element={ <Viewpost/> } />
          </Routes>
        </Router>
    )};

export default App;