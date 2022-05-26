import React, { useEffect } from "react";
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';

import Login from './components/login';
//import Home from './components/home'
//import 'bootstrap/dist/css/bootstrap.min.css';
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";
//import PrivateRoute from "./routing/Privateroute";
import Dashboard from "./components/dashboard";
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
            <Route exact path="/dashboard" element={ <Dashboard/> } />
            {/* <Route exact path="/home" element={ <Home/> } /> */}
          </Routes>
        </Router>
    )};

export default App;