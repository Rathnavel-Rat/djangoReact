import React from 'react';
import {  Switch, Route,BrowserRouter as Router} from 'react-router-dom';
import NavigationBar from './Navigations'
import Registration from './Registration';
import Login from './Login';
import Home from './Home';
import MYProfileInfo from './MyProfileInfo'
 function RouteMenu() {
  return (
    <Router>
        <NavigationBar/>
        <Switch>
        
            <Route path="/reg/login" component={<Login/>}><Login/></Route>
            <Route path="/register"><Registration/></Route>
            <Route path="/Profile"><MYProfileInfo/></Route>
            <Route path="/" ><Home/></Route>

        </Switch>
        
    
    </Router>
  );
}

export default RouteMenu;