import React from 'react';
import Cookies from 'universal-cookie';
import Axios from 'axios';


const download=(id)=>{
    console.log("downlaod")
    let cook=new Cookies()
    let token=cook.get("authJWT")
    let  path=id.replace("http://127.0.0.1:8000/media/","")
    path=path.replace("/","\\")
    Axios.get(`http://127.0.0.1:8000/download`,{ headers: {"authorization" : `Bearer ${token}`},params:{"rat":path},responseType:'blob'})
    .then(response=>{
        console.log(response)
        const url=window.URL.createObjectURL(new  Blob([response.data]));
        const link=document.createElement('a')
        link.href=url
        link.setAttribute('download','wall.jpeg')
        document.body.appendChild(link)
        link.click()
  
  
    })
    .catch(er=>{
      alert("File may not exist or Try again later")
    })
  }


export default download ;
