import Head from 'next/head'
import Layout from '../components/Layout'

import React, { useState, useEffect } from "react";
import firebase from '../utils/firebase-config';
import { useRouter } from 'next/router';
import CircularProgress from '@material-ui/core/CircularProgress';
import { db, serverTimestamp } from '../utils/authProv';
import Avatar from 'react-avatar';
export default function Home({ allpolls }) {
  const [user, setuser] = useState("")
  const [useremail, setuseremail] = useState("")
  const [show, setShow] = useState(false)
  const [result, setResult] = useState(false)
  const [polls, setPolls] = useState(allpolls)
  const [comment, setComment] = useState("")
  const router = useRouter()
  const [allMsg, setAllMsg] = useState([])

  const [ansresult, setAnsResult] = useState([])
  const getAns = async (id) => {
    const res = await db.collection('polls').doc(id).get()

    setAnsResult(res.data())
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {

        if (polls[0].all_reviews?.includes(user.email)) {
          setResult(true)
          getAns(polls[0].id)
        }
        else {
          setResult(false)
        }
        const comm = await db.collection('polls').doc(polls[0].id).collection('comments').orderBy('date', 'desc').get()

        // setAllMsg(comm.docs.map(docsnap=>docsnap.data()))
        const allcom = comm.docs.map(snap => {
          return {
            ...snap.data(),
            date: snap.data().date.toMillis(),

          }
        })
        setAllMsg(allcom)


        setuser(
          user.displayName
        )
        setuseremail(
          user.email
        )
        setShow(true)

      } else {


        router.push('/register')

      }


    })




  }, [])




  const giveAns = (str, id) => {

    getAns(id)


    if (str === "ans1") {

      db.collection("polls").doc(id).update({

        ans1_review: polls[0].ans1_review + 1,
        total_reviews: polls[0].total_reviews + 1,
        all_reviews: firebase.firestore.FieldValue.arrayUnion(useremail)

      })

    } else if (str === "ans2") {
      db.collection("polls").doc(id).update({

        ans2_review: polls[0].ans2_review + 1,
        total_reviews: polls[0].total_reviews + 1,
        all_reviews: firebase.firestore.FieldValue.arrayUnion(useremail)

      })

    } else if (str === "ans3") {
      db.collection("polls").doc(id).update({

        ans3_review: polls[0].ans3_review + 1,
        total_reviews: polls[0].total_reviews + 1,
        all_reviews: firebase.firestore.FieldValue.arrayUnion(useremail)

      })

    }
    else {
      db.collection("polls").doc(id).update({

        ans4_review: polls[0].ans4_review + 1,
        total_reviews: polls[0].total_reviews + 1,
        all_reviews: firebase.firestore.FieldValue.arrayUnion(useremail)

      })

    }

    setResult(true)
  }

  const getCalc = (anscount, total) => {
    return Math.round((anscount / total) * 100)
  }


  const makeCom = async (e) => {
    e.preventDefault()
    await db.collection('polls').doc(polls[0].id).collection('comments').add(
      {
        comment: comment,
        username: user,
        date: serverTimestamp()

      }
    )
    const comm = await db.collection('polls').doc(polls[0].id).collection('comments').orderBy('date', 'desc').get()

    // setAllMsg(comm.docs.map(docsnap=>docsnap.data()))
    const allcom = comm.docs.map(snap => {
      return {
        ...snap.data(),
        date: snap.data().date.toMillis(),

      }
    })
    setAllMsg(allcom)

    alert("Thank You For Your Comment")
    setComment("")
  }



  return (
    <>
      <Layout>
        <div className="hero">
          <div className="container">
            {
              show ? (
                <>
                  <div className="row">
                    {
                      user && <h4 className="pl-3"> <b>Welcome <span style={{ color: '#A05' }}>{user}</span></b> </h4>
                    }


                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-md-8 col-12 mx-auto">
                      {
                        result ?
                          <div className="card p-3">

                            <h5 style={{ color: '#A05', textDecoration: 'underline' }}>Result</h5>
                            {
                              ansresult.question ? (
                                <>
                                  <h5>{ansresult.question}</h5>

                                  <div className="ans  pt-2 pl-2">
                                    <p className="resultp"> <span>{ansresult.ans1}</span>  <span>{getCalc(ansresult.ans1_review, ansresult.total_reviews)}%</span> </p>
                                    <p className="resultp"><span>{ansresult.ans2} </span>  <span>{getCalc(ansresult.ans2_review, ansresult.total_reviews)}%</span> </p>
                                    <p className="resultp"><span>{ansresult.ans3} </span>  <span>{getCalc(ansresult.ans3_review, ansresult.total_reviews)}%</span> </p>
                                    <p className="resultp"><span>{ansresult.ans4} </span>  <span>{getCalc(ansresult.ans4_review, ansresult.total_reviews)}%</span> </p>

                                  </div>
                                  <br />
                                  <small> {ansresult.total_reviews} peoples already given</small>
                                  <br />


                                  <div className="search">
                                    <form onSubmit={makeCom}>
                                      <div class="input-group ">
                                        <input type="text" className="form-control" placeholder="Write a Comment..." value={comment} onChange={(e) => setComment(e.target.value)} required />
                                        {
                                          comment && <div class="input-group-append">
                                            <button type="submit" className="input-group-text btn"><i className="fa fa-paper-plane" aria-hidden="true"></i></button>

                                          </div>
                                        }

                                      </div>
                                    </form>
                                    <hr />
                                    <div className="msgboxes">
                                    {
                                      allMsg?.map((val, ind) => {
                                        return (
                                          <>
                                            <div className="msgbox" key={ind}>
                                              <Avatar name={val.username} size="25" style={{ marginTop: '-20px' }} round />
                                              <p>
                                                <span className="pl-1" style={{ fontSize: '10px' }}> <b>{val.username}</b></span>  <br />
                                                <p className="pl-1" style={{ fontSize: '14px', marginTop: '-7px' }}> {val.comment}</p>
                                              </p>

                                            </div>
                                          </>
                                        )
                                      })
                                    }
                                    </div>



                                  </div>


                                </>
                              ) : <div className="text-center">
                                <CircularProgress color="secondary" />
                              </div>
                            }





                          </div> : <div className="card p-3">

                            {
                              polls?.map((val, ind) => {
                                return (
                                  <>
                                    <div key={ind}>
                                      <h5>{val.question}</h5>

                                      <div className="ans  pt-2 pl-2">
                                        <p onClick={() => giveAns('ans1', val.id)}>{val.ans1}</p>
                                        <p onClick={() => giveAns('ans2', val.id)}>{val.ans2}</p>
                                        <p onClick={() => giveAns('ans3', val.id)}>{val.ans3}</p>
                                        <p onClick={() => giveAns('ans4', val.id)}>{val.ans4}</p>

                                      </div>
                                      <br />
                                      <small>{val.total_reviews} peoples already given</small>
                                    </div>

                                  </>
                                )
                              })
                            }
<br />


<div className="search">
  <form onSubmit={makeCom}>
    <div class="input-group ">
      <input type="text" className="form-control" placeholder="Write a Comment..." value={comment} onChange={(e) => setComment(e.target.value)} required />
      {
        comment && <div class="input-group-append">
          <button type="submit" className="input-group-text btn"><i className="fa fa-paper-plane" aria-hidden="true"></i></button>

        </div>
      }

    </div>
  </form>
  <hr />
  <div className="msgboxes">
  {
    allMsg?.map((val, ind) => {
      return (
        <>
          <div className="msgbox" key={ind}>
            <Avatar name={val.username} size="25" style={{ marginTop: '-20px' }} round />
            <p>
              <span className="pl-1" style={{ fontSize: '10px' }}> <b>{val.username}</b></span>  <br />
              <p className="pl-1" style={{ fontSize: '14px', marginTop: '-7px' }}> {val.comment}</p>
            </p>

          </div>
        </>
      )
    })
  }
  </div>



</div>



                          </div>
                      }
                    </div>
                  </div>



                </>
              ) : <div className="text-center">
                <CircularProgress color="secondary" />
              </div>
            }





          </div>


        </div>


      </Layout>
    </>
  )
}





export async function getServerSideProps(context) {
  const res = await db.collection('polls').orderBy('createdAt', 'desc').limit(1).get()



  const allpolls = res.docs.map(snap => {
    return {
      ...snap.data(),
      createdAt: snap.data().createdAt.toMillis(),
      id: snap.id
    }
  })

  return {
    props: {
      allpolls,

    }
  }


}
