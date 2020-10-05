import React from 'react';

import './App.css';
import RouteMenu from './components/Routes';
import Cookies from 'universal-cookie';
const cook=new Cookies()

sessionStorage.clear()
//localStorage.clear()
//localStorage.removeItem("isAuthenticatedWally")
function App() {
  return (
    <div className="App">
     <RouteMenu/>
     
    </div>
  );
}

export default App;
