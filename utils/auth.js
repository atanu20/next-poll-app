import firebase from "./firebase-config"
const socialAuth=async(provider)=>{
    try{
        const res=await firebase.auth().signInWithPopup(provider)
        return res.user;
    }
    catch(err)
    {
        return err;
    }


}
export default socialAuth