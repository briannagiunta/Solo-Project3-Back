import {useContext, useEffect, useState, useRef} from 'react'
import {UserContext} from '../context/userContext'
import UserContainer from '../components/userContainer'
import axios from 'axios'

const Messages = (props) =>{
    const {userState, hasConvoWithState, currentConvoState, convoNameState, getConvos} = useContext(UserContext)
    const [user,setUser] = userState
    const [hasConvoWith, setHasConvoWith] = hasConvoWithState
    const [currentConvo, setCurrentConvo] = currentConvoState
    const [convoName, setConvoName] = convoNameState
    const [messages, setMessages] = useState([])
    const [content, setContent] = useState('')
    const [count, setCount ] = useState(0)

    function useInterval(callback, delay) {
        const savedCallback = useRef();
        // Remember the latest callback.
        useEffect(() => {
          savedCallback.current = callback;
        }, [callback]);
        // Set up the interval.
        useEffect(() => {
          function tick() {
            savedCallback.current();
          }
          if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
          }
        }, [delay]);
      }

    useEffect(()=>{getConvos()},[])

    const viewMessages = async (id) => {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/convos/messages`,{
            id: id
        })
        setMessages(res.data.messages)
    }
   
    useInterval(() => {
        viewMessages(currentConvo)
        setCount(count + 1);
      }, 1000);

    const respond = async () =>{
        const userId = localStorage.getItem('userId')
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/convos/respond`,{
            id: currentConvo,
            content: content
        },{
            headers:{
                Authorization: userId
            }
        })
        if(res.data.message === 'message sent'){
            setContent(' ')
            viewMessages(currentConvo)
        }
    }
    
    
    return(
        <div className = 'page-container'>
            <UserContainer />

            <div className = 'content-container'>
                <h1>Messages</h1>
                <div className = 'convo-page'>
                    <div className = "convo-list">
                        {hasConvoWith.map(convo=>
                            <button onClick={(e)=>{
                                setCurrentConvo(e.target.value)
                                setConvoName(convo.user.name)
                                }} key = {convo.id} value = {convo.id} >
                                {convo.user.name}
                            </button>
                        )}
                    </div>
                    <div className = "current-convo">
                        {currentConvo === 0 ?
                            <>
                              <h4>Click on a conversation!</h4>   
                            </>
                        :  
                            <>
                            <h4>{`Your conversation with ${convoName}`}</h4>   
                            </>
                        }



                        <div className = 'messages'>
                            {messages.map(mes=>

                               mes.user.email === user.email ? 
                                    <div className = 'sent'>
                                        {`${mes.user.name}: ${mes.content}`}
                                    </div>
                                    :
                                    <div className = 'recieved'>
                                        {`${mes.user.name}: ${mes.content}`}
                                    </div>
                                
                               
                            )}
                        </div>
                    
                        {currentConvo !== 0 &&
                            <>
                                <input className = 'respond' type = 'text' value = {content} onChange={(e)=>(setContent(e.target.value))} />
                                <button onClick={()=>{respond()}}>Send</button>
                            </>
                        }

                    </div>

                </div>
                

            </div>

        </div>
    )
}

export default Messages