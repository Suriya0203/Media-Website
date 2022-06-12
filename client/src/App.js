import React, { useEffect } from "react";
import { BrowserRouter,Switch,Routes, Route ,Navigate} from 'react-router-dom';
import "./App.css";
import Login from './components/login';
import Profile from "./components/profile"
import {connect} from 'react-redux'
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
import EditComment from "./components/EditComments";
import Logout_auth from "./components/logout"
import SearchUser from "./components/search";
import ViewUser from './components/ViewUser';
import ChangePassword from './components/Changepassword'
// import PrivateRoute from './routing/PrivateRoute'
// import profile2 from './components/profile2'
import Profile2 from "./components/profile2";

if (localStorage.token) {

	setAuthToken(localStorage.token);
}
const App = ({user})=>{

  useEffect(() => {
		store.dispatch(loadUser());
	}, []);
  console.log(user,12345)
  // if(user===null){
  //   return navigate('/login');
  // }
  return( 
    
      <BrowserRouter>
        <Routes>
            <Route exact path="/login" element={ <Login/> } />
            {/* <Route path="/alluser" element={user?()=>{<AddFriends/>}:()=>{<Login/>}}/> */}
            <Route exact path="/" element={ <Login/> } />
            <Route exact path="/logout" element={ <Logout_auth/> } />
            <Route exact path="/register" element={ <Register/> } />
            <Route exact path="/dashboard" element={ <Dashboard/> } />
            {/* <Route exact path='/add_friends/*' element={<PrivateRoute component={AddFriends}/>}/> */}
            <Route exact path="/profile" element={ <Profile/> } />
            <Route exact path="/profile2" element={ <Profile2/> } />
            <Route exact path="/navbar" element={ <ResponsiveAppBar/> } />
            <Route exact path="/friends" element={ <FriendsPage/> } />
            <Route exact path="/view_friends" element={ <ViewFriendsdetails/> } />
            <Route exact path="/add_friends" element={ <AddFriends/> } />
            {/* <PrivateRoute exact path="/dashboard" component={Dashboard} /> */}
            <Route exact path="/alluser" element={ <UserContainer/> } />
            <Route exact path="/post" element={ <Post/> } />
            <Route exact path="/createpost" element={ <Createpost/> } />
            <Route exact path="/viewpost" element={ <Viewpost/> } />
            {/* <Route exact path="/allpost" element={ <Fetchimages/> } /> */}
            <Route exact path="/images" element={ <Image/> } />
            <Route exact path="/comments/:id" element={ <Comments/> } />
            <Route exact path="/viewfriends" element={ <ViewFriendsdetails/> } />
            <Route exact path="/addfriendbyid/:userId/:name" element={ <AdduserById/> } />
            <Route exact path="/removefriend/:userId" element={ <DeleteuserById
            /> } />
              <Route exact path="/deletepost/:postId" element={ <DeletePostByid
            /> } />
            <Route exact path="/deletecomment/:userId" element={ <DeleteCommentById/> } />
            <Route exact path="/editcomment/:userId" element={ <EditComment/> } />
            <Route exact path="/searchuser/:searchname" element={ <SearchUser/> } />
            <Route exact path="/viewuser/:id" element={ <ViewUser/> } />
            <Route exact path="/changepassword" element={ <ChangePassword/> } />
{/* {
  user&&
  <Route exact path="/allpost" element={ <Fetchimages/> } />
} */}
            </Routes>
        </BrowserRouter>



    )};
    const mapStateToProps=state=>{
      return {
        user:state.auth.user
      }
    }

export default connect(mapStateToProps)(App);