
import Layout from '../components/Layout'
import { useRouter } from 'next/router'
import { googleProvider } from '../utils/authProv'
import socialAuth from '../utils/auth'

import  {useState, useEffect} from "react";
import firebase from '../utils/firebase-config';



const register = () => {
    const router=useRouter()
    const handelClick=async (provider)=>{
        const res=await socialAuth(provider)
        console.log(res)
//         displayName: "Atanu Jana"
// email: "atanuj383@gmail.com"
router.push('/')
    }


   

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
        if(user)
        {
            router.push('/')
  
        }


     
    })

    
      },[])

    return (
        <>
            <div className="auth">
                
                <button className="btn btn-dark" onClick={()=>handelClick(googleProvider)}><i className="fa fa-google-plus" aria-hidden="true"></i> Login With Google</button>
            </div>
        </>
    )
}

export default register
