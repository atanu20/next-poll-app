import { useRouter } from "next/router";
import {useState, useEffect} from "react";
import firebase from '../utils/firebase-config';
import Link from 'next/link'
const Navbar = () => {
const route=useRouter()
  const [user, setuser] = useState("")
  useEffect(() => {
    firebase.auth().onAuthStateChanged( (user) => {
      
      if(user)
      {
        setuser(
          user.displayName,
          )

      }else{
        
    
      route.push('/register')
    
      }
    })
      },[])

     

  return (
    <>
    <nav className="navbar navbar-dark bg-dark">
  <Link href="/">
  <a className="navbar-brand" >
    <img src="./favicon.ico" width="30" height="30" className="d-inline-block align-top" alt="" />
    <span className="pl-2 text-white">NextPoll</span>

  </a>
  </Link>
  {
    user && <button className="btnn" onClick={()=>firebase.auth().signOut()}>Logout</button>
  }
</nav>
      
    </>
  )
}

export default Navbar
