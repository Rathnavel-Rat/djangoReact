import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from '../Css/upload.module.css'
import Axios from 'axios';
import Cookies from 'universal-cookie';
 function UploadModal(props) {
   const [load, setload] = useState()
   const [uploaderror,setuploaderror]=useState(null)
    
   const upload=(formData)=>{
        setload(styles.loader)//start loading
       
        let cook=new Cookies()
        let token=cook.get("authJWT")
       
        let form=new FormData()
        form.append("user_foreign","")
        form.append("user_name","")
        form.append("image_name",formData.image_name)
        form.append("image",formData.image[0])
        form.append("image_cateogry",formData.image_cateogry)
        
        Axios.post("http://127.0.0.1:8000/upload",form,{ headers: {"authorization" : `Bearer ${token}`} })
        .then(res=>{
         if(res.data.success === true){
           props.Retrive()// to reload the data
           props.close() //close the modal open
           setload(null)// stop loading
         }
         if(res.data.success === false)
         {
          setload(null)// stop loading
          setuploaderror("Cannot Upload Try again later")
         }
        })
        .catch(Error=>{console.log(Error)})
    }
    
    
const{register,handleSubmit,errors,watch}=useForm()


  return (
   <div >   
  <form className={styles.form} onSubmit={handleSubmit(upload)}>
      <label className={styles.label} >Select Image</label>
      <input className={styles.inputfile} type="file" name="image" ref={register({required:{value:true,message:"not null"}})}/>
      {errors.file && <span>{errors.file.message}</span>}
      
      <label  className={styles.label}  >Enter image Name</label>
      <input  type="text" name="image_name" ref={register({required:{value:true,message:"please enter"}})} />
      {errors.image_name && <span>errors.image_name.message</span>}

      <label  className={styles.label} >Select Category</label>
      <select className={styles.select} name="image_cateogry" ref={register({required:{value:true,message:"select a cateogory"}})}>
      <option value='None'>None</option>
      <option value='Nature'>Nature</option>
      <option value='GOD'>GOD</option>
      <option value='Anime'>Anime</option>
      </select>
      <br/>

      <input type="submit" /> 
      <center><div className={load}/></center>
  </form>
  <h1>{uploaderror}</h1>
  
  </div>
  );
}

export default UploadModal
