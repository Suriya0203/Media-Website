import React, { useEffect } from "react";
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';

import Login from './components/login';
// import Home from './components/home'
// import 'bootstrap/dist/css/bootstrap.min.css';
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";
import Dashboard from "./components/dashboard";
import Register from "./components/register";


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
            <Route exact path="/register" element={ <Register/> } />
            <Route exact path="/dashboard" element={ <Dashboard/> } />
          </Routes>
        </Router>
    )};

export default App;