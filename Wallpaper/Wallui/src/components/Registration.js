import React,{useState} from 'react';

import { useForm } from 'react-hook-form';
import Axios from 'axios';
import styles from './Css/forms.module.css'
export default function Registration() {

    const{register,handleSubmit,errors,watch}=useForm()
    let confrimPass=watch("password")
    const [serverError, setserverError,reset] = useState(null)

    const RegisterRequest=(e)=>{  
           let data={"username":e.username,"email":e.email,"password":e.password}
           Axios.post("http://127.0.0.1:8000/register",data)
            .then(response=>{
                  
                    if(response.data.success){
                      reset()
                    }
                    else{
                      let Sererorr=""
                      if (typeof response.data.error.email !== 'undefined') {
                           Sererorr=Sererorr+ response.data.error.email
                          }
                      if (typeof response.data.error.username !== 'undefined') {
                        Sererorr=Sererorr+response.data.error.username
                          }
                        
                        setserverError( Sererorr)
                        }
                })
            .catch(error=>{
                
                })
    }
    
  return (
   
    
    <form className={styles.body} onSubmit={e=>e.preventDefault()}>
       <h3 className={styles.logo}>Log In</h3>
      <span>{serverError}</span>
    <label>username</label>
    <input type="text" name="username" ref={register({required:{value:true,message:"Fill this"}})}/>
    {errors.username && <span>{errors.username.message}</span>}
    <label>Email</label>
    <input type="email" name="email" ref={register({required:{value:true,message:"Fill this"},pattern:{value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,message:"ONly Email format"}})} />
    {errors.email && <span>{errors.email.message}</span>}
    <label>Password</label>
    <input type="password" name="password" ref={register({required:{value:true,message:"Fill this"},minLength:{value:8,message:"At Least 8 character"}})}/>
    {errors.password && <span>{errors.password.message}</span>}
    <label>Confrim Password</label>
    <input type="password" name="confrim" ref={register({required:{value:true,message:"Fill this"},validate:value=>confrimPass===value || "Not matched"})}/>
    {errors.confrim && <span>{errors.confrim.message}</span>}
    <br/>
    <input type="submit" onClick={handleSubmit(RegisterRequest)}/>

    </form>
  );
}
