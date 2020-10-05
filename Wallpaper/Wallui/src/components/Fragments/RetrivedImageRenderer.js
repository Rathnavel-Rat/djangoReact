
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart,faEye,faDownload,faTrash,faThumbsDown} from "@fortawesome/free-solid-svg-icons";
import styles from '../Css/gallery.module.css'
 function ImageRenderer({items,DownLoad,del,isDeleteAble,like,userLiked,remove,Imageview}) {
  if(isDeleteAble){
        return (
                <div className={styles.gallery  } >
                  <img src={items.image_preview} onClick={()=>Imageview(items.image,items.image_id)} with={100} height={100}></img>
                  <div className={styles.desc}>
                     <FontAwesomeIcon size={"2x"} color={"red"} icon={faHeart} />{items.like}  <FontAwesomeIcon size={"2x"} color={"grey"} icon={faEye}/>{items.view}
                     <br/>
                      
                     <button className={styles.rnd_but}    onClick={()=>DownLoad(items.image)}><FontAwesomeIcon size={"2x"} icon={faDownload}/></button>
                     <button className={styles.rnd_but}    onClick={()=>del(items.image_id)} ><FontAwesomeIcon size={"2x"} icon={faTrash}/></button>
                   </div>
                </div>
              );
   }  
 else if(isDeleteAble===false) {
         return(
          <div className={styles.gallery }  >
           
          <img src={items.image_preview} onClick={()=>Imageview(items.image,items.image_id)} with={100} height={100}></img>
            <div className={styles.desc}>
               <button className={styles.rnd_but} onClick={()=>like(items.image_id)}   > <FontAwesomeIcon size={"2x"} color={"red"} icon={faHeart} />{items.like}  </button>
               <FontAwesomeIcon size={"2x"} color={"grey"} icon={faEye}   />{items.view}
               <br/>
               <button className={styles.rnd_but}    onClick={()=>DownLoad(items.image)}><FontAwesomeIcon size={"2x"} icon={faDownload}/></button>
           </div>
        </div>
         )
 }
 else if(userLiked===true){// myprofile liked
   return(
  <div className={styles.gallery}>          
  <img src={items.image_preview} with={100} height={100}></img>
    <div className={styles.desc}>
       <button className={styles.rnd_but}    onClick={()=>DownLoad(items.image)}><FontAwesomeIcon size={"2x"} icon={faDownload}/></button>
       <button className={styles.rnd_but}  onClick={()=>{remove(items.image_id)}}><FontAwesomeIcon size={"2x"}  icon={faThumbsDown}/> </button> 
  
   </div>
  </div>)
 }
 }

export default ImageRenderer;

