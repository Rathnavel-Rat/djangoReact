import React, { useEffect, useState } from 'react';
import styles from './Css/profile.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart,faEye,faUpload } from "@fortawesome/free-solid-svg-icons";
import Popup from "reactjs-popup";
import UploadModal from './Fragments/UploadModal';
import Axios from 'axios';
import ImageRenderer from './Fragments/RetrivedImageRenderer'
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import download from './Utils/Cook'

export default function MyProfileInfo() {
  let cook=new Cookies()
  let token=cook.get("authJWT")
  const [FetchedImage, setFetchedImage] = useState([])
  const [FetchedLikedImage,setFetchedLikedImage] =useState([])
  const [load, setload] = useState()
  const [Type, setType] = useState(true)
  let history=useHistory()



const Fetch=()=>{
  console.log("fetch")
  setload(styles.loader)
  Axios.get("http://127.0.0.1:8000/retrive/uploaded",{ headers: {"authorization" : `Bearer ${token}`} })
  .then(response =>{
   console.log(response)
   setFetchedImage(response.data)   
   setload(null)
  })
  .catch(er=>{console.log(er)})


  Axios.get("http://127.0.0.1:8000/image/liked",{ headers: {"authorization" : `Bearer ${token}`} })
  .then(response=>{
    console.log(response)
    setFetchedLikedImage(response.data.list)
  })
  .catch(error=>{
  
  })
}
useEffect(() => {
     if(token===null){
        history.push('/')
     }
     else{
       Fetch()
     }
},[])






const Delete=(id)=>{
  setFetchedImage(FetchedImage.filter(item=>item.image_id!==id))
   Axios.post('http://127.0.0.1:8000/delete/Uploaded',{"image_id":id},{headers:{"authorization" : `Bearer ${token}`}})
   .then(response=>{
      if(response.data.success){
       alert("Deleted your post")
       }
   })
}

const RemoveLiked=(id)=>{
  setFetchedLikedImage(FetchedLikedImage.filter(item=>item.image_id!==id))
  Axios.get('http://127.0.0.1:8000/image/removed_liked',{headers:{"authorization" : `Bearer ${token}`},params:{"image_id":id}})
  .then(response=>{alert("removed from liked")})
  .catch(error=>{})

}



  return (
    
  <div >
    <div className={styles.grad}>
    <div >
         <img className={styles.img_round} alt={ window.sessionStorage.getItem("UserNameWally")} src="https://th.bing.com/th?q=Link+From+Zelda&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.56&pid=InlineBlock&mkt=en-IN&adlt=moderate&t=1&mw=247"/><br/>      
         {window.sessionStorage.getItem("userNameWally")}<br/>   
         <FontAwesomeIcon icon={faHeart}/>{0} <FontAwesomeIcon icon={faEye}/>{1}
        
    </div>
   
    <Popup contentStyle={{padding:"0px",backgroundColor: "#f15d22"}} modal trigger={<button className={styles.uploadButton}>Upload Image</button>}>
          {close => <UploadModal close={close} Retrive={Fetch} />}
    </Popup>
    <br/>
    <div onChange={()=>{setType(!Type)}}>
        <input type="radio" name="type" defaultChecked={true} value="MyUpload"/>MyUploads
        <input type="radio" name="type" value="Liked"/> LikedWalls
    </div>
         <center> <div className={load} ></div></center>
    </div>
    
     {Type ? ( 
         <div className={styles.grid} >   
            {FetchedImage.map(item=>(<ImageRenderer items={item} DownLoad={download}  userLiked={false} del={Delete} isDeleteAble={true}> </ImageRenderer>))}
          </div>) :
          (
          <div className={styles.grid }>{FetchedLikedImage.map(item=>(<ImageRenderer items={item} DownLoad={download} remove={RemoveLiked}  userLiked={true}></ImageRenderer>))} </div>
          )  }
   
    
  </div>
   
    
   
  );
}
