import React, {useCallback } from 'react';
import styles from './Css/home.module.css'
import { useState,useEffect } from 'react';
import Axios from 'axios';
import ImageRenderer from './Fragments/RetrivedImageRenderer';
import download from './Utils/Cook'
import Pagination from '@material-ui/lab/Pagination';
import Cookies from 'universal-cookie';
import Viewer from 'react-viewer';
import SimpleImageSlider from "react-simple-image-slider";

function Home() {

  const [Gallery, setGallery] = useState([])
  const [pageIndex, setpageIndex] = useState(1)//current page
  const [Images, setImages] = useState([])//setting thr image per page
  const [load, setload] = useState(styles.loader)//laoding
  const [IntializingTotalPage, setIntializingTotalPage] = useState(10)// to display total pages 
  let imageIter=0;
  let cook=new Cookies()
  let token=cook.get("authJWT")
  const [ visible, setVisible ] = useState();
  const[view,setView]=useState()
  
  useEffect(() => {
    Axios.get("http://127.0.0.1:8000/homepage",{params:{"page":Number(1)}})
    .then(response=>{
      setIntializingTotalPage(response.data.Total_Pages)
      response.data.list.map(e=>{e.on=1})// for toogling state i.e add like and remove like
      setImages(response.data.list)
      setGallery(response.data.gallery)
      setload(null)
   
    })
    .catch(error=>{alert("Try again Later")})
   
  },[]);
 
 const onPageChange=(event,value)=>{
  
    setpageIndex(value)
    Axios.get("http://127.0.0.1:8000/homepage",{params:{"page":value}})
   
    .then(response=>{
       response.data.list.map(e=>{e.on=1})
       setpageIndex(response.data.Total_Pages) 
       setImages(response.data.list)
    })
   .catch(error=>{console.log("Try again Later")})
  }

const LikeProceed=useCallback((id)=>{
  let form=new FormData()
  form.append("image_id",id)
  Images.filter(e=>{
    
    if(e.image_id===id)
     { 
        if(e.on===1) { //when val is 1 add like else 
           e.like++;
           e.on--;  }
        else         {     //when val is 0 remove like
           e.like--;
            e.on++ ;  }  
        form.append("type",e.on)    
     }
     
     setImages([...Images])
  })
  Axios.post("http://127.0.0.1:8000/imageLikes",form,{ headers: {"authorization" : `Bearer ${token}`} })
 .then(response=>{})
 .catch(error=>{} )
},[Images]) 

const like=(id)=>{
    
   if(token){
   LikeProceed(id)}
   else{
     alert("please logon to continue")
   }
   
  }

const onView=(image,id)=>{

  setVisible(true)
  setView([{src: image, alt: ''}])
  if(token){
    let form=new FormData()
    form.append("image_id",id)
    Axios.post("http://127.0.0.1:8000/image/view",form,{ headers: {"authorization" : `Bearer ${token}`} })
    .then(response=>{})
    .catch(error=>{} )
  }
  
 
 
}
  return (
   
    <div>
     

      <div className={styles.galleryBackground}>
    
       <center><SimpleImageSlider
                    width={896}
                    height={500}
                    slideDuration={0}
                    images={Gallery.map(e=>{return {url:e.image}})}
                /></center>
      <center><div className={load}/></center>
      </div>
      <div className={styles.grid} > 
        {Images.map(item=>(<ImageRenderer key={item.image_id} Imageview={onView} items={item} DownLoad={download} like={like} isDeleteAble={false}> </ImageRenderer>))}
      </div>
  
      <center><div className={styles.pagination}> 
  
         <Pagination count={IntializingTotalPage} defaultPage={1}    onChange={onPageChange} color="primary"/>
 
       </div></center>
       <Viewer   visible={visible} rotatable={false} zoomable={false} onClose={() => { setVisible(false); } }  images={view} />
    </div>
  );
}

export default Home







