import React from 'react';
import {withRouter,NavLink} from  'react-router-dom'
import NavFrag from  './Fragments/NavFrag';
import styles from './Css/dropdown.module.css'

function NavigationsBar() {

  return ( 
    <div className="navigation">
      
    <nav className="navbar  nav-expand  navbar-dark bg-dark" >
    <center><h1 style={{color:"#00BFFF",alignSelf:"center"}}>WALLI</h1></center>
 
    
        <div className="container" style={{marginRight:"2px",width:"auto"}}>
          <ul className="navbar-nav ml-auto">
             <li>
              <NavLink className="nav-link" to="/" style={{color:"#00BFFF",fontSize:"35px"}}> Home</NavLink>
            </li>
            </ul>
            <div className={styles.dropdown}>
               <button className={styles.dropbtn}><div className={styles.hamMenu}/><div className={styles.hamMenu}/><div className={styles.hamMenu}/></button>
                    <div className={styles.dropdowncontent}>
                      <NavFrag/>
                     </div>
             </div>       
        </div>
        
    </nav>
</div>
  );
}

export default withRouter(NavigationsBar)