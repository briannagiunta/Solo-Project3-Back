import {useContext, useEffect, useState} from 'react'
import {UserContext} from '../context/userContext'
import UserContainer from '../components/userContainer'
import axios from 'axios'

const SendMessage = (props) => {
    const {shouldRedirectState, redirectState, currentConvoState,convoNameState} = useContext(UserContext)
    const [shouldRedirect, setShouldRedirect] = shouldRedirectState
    const [redirectTo, setRedirectTo] = redirectState
    const [content, setContent] = useState('')
    const [currentConvo, setCurrentConvo] = currentConvoState
    const [convoName, setConvoName] = convoNameState

    useEffect(()=>{setShouldRedirect('false')},[])



    const startConvo = async () =>{
        const userId = localStorage.getItem('userId')
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/convos/create`,{
            userId2: props.id,
            content: content
        },{
            headers:{
                Authorization: userId
            }
        })
        console.log(res);
        setRedirectTo('/messages')
        setCurrentConvo(res.data.newConvo.id)
        setConvoName(res.data.newConvo.user.name)
        if(res.data.message === 'conversation added'){
            setShouldRedirect('true')
        }
    }
   

    return(
        <div className = 'page-container'>
        <UserContainer />

        <div className = 'content-container'>
            <h1>Messages </h1>
            <div className = 'send-container'>
                <h3>{`Start A Conversation with ${props.name} `}</h3>
                <div className = 'send-form'>
                <input className = 'content' type = 'text' value = {content} onChange={(e)=>(setContent(e.target.value))} />
                <button onClick={()=>{startConvo()}}>Send</button>
                </div>
            </div>
            

        </div>

    </div>
    )
}

export default SendMessage