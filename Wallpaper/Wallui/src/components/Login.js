import React,{useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import Axios from 'axios';
import styles from './Css/forms.module.css'
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';

   
function Login() {
    const{register,handleSubmit,errors}=useForm()
    const history =useHistory()
    const [ServerError, setServerError] = useState(null)
    const cook=new Cookies()
   
  const PostRequest=(formData)=>{
         Axios.post("http://127.0.0.1:8000/reg/login",formData)
         .then(
               response =>{ 
    
                         if(response.data.success){ 
                          history.push('/')       
                         }
                         else{
                           setServerError(response.data.error)
                         }

                          }
           )
         .catch(
             errors=>{

                      setServerError("Please Try Again Later")
                    }
            )
        }
useEffect(() => {
  if( cook.get("authJWT")){
    history.push('/')
  }
  
},)
      
     
  return (
 
    
    <form className={styles.body} onSubmit={handleSubmit(PostRequest)}>
       <h3 className={styles.logo}>Sign In</h3>
      <span>{ServerError}</span>
        <label>Email</label>
        <input type="eamil" name="email" ref={register({required:{value:true,message:"Not to be null"},pattern:{value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,message:"seems to be not an email"}})} />
  {errors.email && <span>{errors.email.message}</span>}<br/>
  <label>Password</label>
  <input type="password" name="password" ref={register({required:{value:true,message:"Not to be null"}})} />
  {errors.password && <sapn>{errors.password.message}</sapn>}<br/>
    <input type="submit"></input>
    </form>
   
  
  );
}
export default Login;
