import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import {db,serverTimestamp} from '../utils/authProv'
import firebase from '../utils/firebase-config';
const postpoll = () => {
    const [question, setQuestion] = useState("")
    const [ans1, setAns1] = useState("")
    const [ans2, setAns2] = useState("")
    const [ans3, setAns3] = useState("")
    const [ans4, setAns4] = useState("")
    const [user, setuser] = useState("")
    const router=useRouter()


    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
          if(user)
          {
            setuser(
              user.displayName,
              )
    
          }else{
            
        
          router.push('/register')
        
          }
    
         
        })
    
        
          },[])

    const onsub=async(e)=>{
        e.preventDefault()

        await db.collection('polls').add({
           question,
           ans1,
           ans1_review:0,
           ans2,
           ans2_review:0,
           ans3,
           ans3_review:0,
           ans4,
           ans4_review:0,
           all_reviews:[],
           total_reviews:0,
            postedBy:user,
            createdAt:serverTimestamp()
        })
        alert('Question added')
        router.push('/')

    }

    return (
        <>
            <Layout>
            <div className="hero">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-8 col-12 mx-auto">
                            <div className="card p-3">
                                <form onSubmit={onsub}>
                                <div class="form-group">
                                    <label htmlFor="">Question:</label>
                                    <input type="text" placeholder="Write Question" class="form-control" value={question} onChange={(e) => setQuestion(e.target.value)} required />
                                </div>
                                <div class="form-group">
                                    <label htmlFor="">Answer 1:</label>
                                    <input type="text" placeholder="Write Answer 1" class="form-control" value={ans1} onChange={(e) => setAns1(e.target.value)} required />
                                </div>
                                <div class="form-group">
                                    <label htmlFor="">Answer 2:</label>
                                    <input type="text" placeholder="Write Answer 2" class="form-control" value={ans2} onChange={(e) => setAns2(e.target.value)} required />
                                </div>
                                <div class="form-group">
                                    <label htmlFor="">Answer 3:</label>
                                    <input type="text" placeholder="Write Answer 3" class="form-control" value={ans3} onChange={(e) => setAns3(e.target.value)} required />
                                </div>
                                <div class="form-group">
                                    <label htmlFor="">Answer 4:</label>
                                    <input type="text" placeholder="Write Answer 4" class="form-control" value={ans4} onChange={(e) => setAns4(e.target.value)} required />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                                </form>
                                
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            </Layout>

        </>
    )
}

export default postpoll
