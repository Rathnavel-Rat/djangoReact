import React from 'react';
import {NavLink,Link} from  'react-router-dom'
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import Cookies from 'universal-cookie';
 function NavFrag() {

    const history =useHistory()
    console.log(sessionStorage.getItem('token'))
    let cook=new Cookies()
    let token=cook.get("authJWT")
const logout=()=>{
   
 

    Axios.get("http://127.0.0.1:8000/logout",{ headers: {"authorization" : `Bearer ${token}`} })
    .then(response=>{
        console.log(response)
        if(response.data.success){
            alert("LoggedOut")
            history.push('/')
        }
    })
    .catch(errors=>{
        console.log(errors)
    })
}

     if( cook.get("authJWT")){
        console.log(cook.getAll())
          return (  
            <div>
            <ul className="navbar-nav ml-auto" >
                
              <li style={{cursor: "pointer",display:"block",left:0}} className="nav-link" onClick={logout} >
               Logout
              </li>
              </ul>
              <ul className="navbar-nav ml-auto" >
              <li>
              
                  <NavLink className="nav-link" to="/Profile">My Profile</NavLink> 
              </li>


              </ul>
              </div>
           );
            
     }
    else{
        console.log(cook.getAll())
        return(
          <div>
            <ul className="navbar-nav ml-auto" >    
                 <li > <Link className="nav-link" to="/reg/login"> LogIn </Link> </li>
            </ul>
            <ul className="navbar-nav ml-auto">
                 <li > <Link className="nav-link" to="/register"> SignUp </Link> </li>      
           </ul>
           </div>
        )

    }
}
export default NavFrag



