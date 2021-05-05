import axios from 'axios'
import LogSignForm from '../components/log-signForm'
import SignForm from '../components/signForm'
import {UserContext} from '../context/userContext'
import {useContext,useEffect,useState} from 'react'
const LogOrSign = (props) =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState
    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [HereFor, setHereFor] = useState('')
    const [Zipcode, setZipcode] = useState('')
    
    const handleSignUp = async () => {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/signup`,{
            Name, Email, Password, Zipcode, HereFor
        })
        console.log(res);
        if(res.data.message === 'Signed up'){
            localStorage.setItem('userId', res.data.user.id)
            setUser(res.data.user)
        }else{
            alert('Email already taken')
        }
    }
    
    const handleLogin = async () => {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/login`,{
            Name, Email, Password
        })
        if(res.data.message === 'login successful'){
            localStorage.setItem('userId', res.data.user.id)
            setUser(res.data.user)
        }else{
            alert('Incorrect email or password')
        }
    }


    return(
        <div className = 'home-page'>
            {props.LogOrSignState === 'signup' &&
                <div className = 'home-container'>
                    <div className = 'signup-form'>
                        <div className = "form-section">
                            <SignForm Name = {Name} setName={setName} Zipcode={Zipcode} setZipcode={setZipcode}  />
                            <LogSignForm Email = {Email} Password={Password} setEmail={setEmail} setPassword = {setPassword} />
                        </div>
                        <h4>I'm Here:</h4>
                        <select value={HereFor} onChange={(e) => { setHereFor(e.target.value) }}>
                            <option value=""></option>
                            <option value="for help">For Help</option>
                            <option value="to help">To Help</option>
                        </select><br/>

                        <div>
                            <button onClick={()=>{handleSignUp()}} >Sign Up</button>
                        </div>

                   </div>    
                </div>
            } 

            {props.LogOrSignState === 'login' &&
                <div className = 'home-container'>
                    <LogSignForm Email = {Email} Password={Password} setEmail={setEmail} setPassword = {setPassword} /><br/>
                    <button onClick={()=>{handleLogin()}}>Login</button>
                </div>
            }

        </div>
    )
}

export default LogOrSign