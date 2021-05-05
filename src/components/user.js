import axios from "axios";
import {useContext, useEffect, useState } from "react";
import {UserContext} from '../context/userContext'
import { Link } from 'react-router-dom'

const User = (props) => {
    const {fetchPending, fetchFriendRequests, shouldRedirectState, hasConvoWithState} = useContext(UserContext)
    const [view, setView] = useState('')
    const [shouldRedirect, setShouldRedirect] = shouldRedirectState
    const [hasConvoWith, setHasConvoWith] = hasConvoWithState
    const [linkTo, setLinkTo] = useState('')


    const checkForConvo = () =>{
        if(hasConvoWith.length > 0){
            hasConvoWith.forEach((convo)=>{
                if(props.id === convo.user.id){
                    setLinkTo(`/messages`)
                }else{
                    setLinkTo(`/startconvo/${props.id}`)
                }
            })
        }else{
            setLinkTo(`/startconvo/${props.id}`)
        }
    }
    useEffect(()=>{checkForConvo()},[])
    useEffect(()=>{setView(props.view)},[])
    useEffect(()=>{setShouldRedirect('false')},[])


    const sendRequest = async () =>{
        const userId = localStorage.getItem('userId')
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/friendships/send/request`,{
            userId2: props.id
        },{
            headers:{
                Authorization: userId
            }
        })
        // console.log(res)
        if(res.data.message === 'request sent'){
            fetchPending()
        }
    }

    const acceptRequest = async () =>{
        const userId = localStorage.getItem('userId')
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/friendships/accept`,{
            userId2: props.id
        },{
            headers:{
                Authorization: userId
            }
        })
        console.log(res)
        if(res.data.message === 'accepted'){
            fetchFriendRequests()
        }
    }


    return(
        <div className = 'user'>
            <div className = 'connect-pic'>

            </div>
            <div className = 'text-container'>
                <div className= 'user-text'>
                    <p><span className = 'bold'> Hi! Im {props.name}</span><br/>
                    Im here {props.hereFor} </p> 
                </div>

                {view === 'connect' && 
                    <div className='userButtons'>
                        {/* <button><Link to= {`/startconvo/${props.id}`}>Message</Link></button> */}
                        <button><Link to= {linkTo}>Message</Link></button>
                        <button onClick = {()=>{sendRequest()}}>Add</button>
                    </div>
                }
                {view === 'friend' && 
                    <div className='userButtons'>
                        <button><Link to= {linkTo}>Message</Link></button>
                        {/* <button><Link to= {`/startconvo/${props.id}`}>Message</Link></button> */}
                        <button>Delete</button>
                    </div>
                }
                {view === 'pending' && 
                    <div className='userButtons'>
                        <button><Link to= {linkTo}>Message</Link></button>
                        {/* <button><Link to= {`/startconvo/${props.id}`}>Message</Link></button> */}
                        <button className = 'pending'>Pending</button>
                    </div>
                }
                {view === 'request' && 
                    <div className='userButtons'>
                        <button><Link to= {linkTo}>Message</Link></button>
                        {/* <button><Link to= {`/startconvo/${props.id}`}>Message</Link></button> */}
                        {/* <button>Message</button> */}
                        <button onClick={()=>{acceptRequest()}}>Accept</button>
                        <button>Reject</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default User