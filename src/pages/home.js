import {useContext} from 'react'
import {UserContext} from '../context/userContext'

const Home = (props) =>{
    const {userState, postState} = useContext(UserContext)
    const [user,setUser] = userState


    return(
        <div className = 'home-page'>
            <div className = 'home-container'>
                <h1>About Us</h1>
                <div className = 'about'>
                Never Alone is an online community dedicated to helping individuals struggling with addiction. Create an account and start interacting, supporting, and engaging with other people in recovery. Posting your experiences in our public forum or making direct connections with others in the recovery process can help you remain sober while also helping others in the community. Join us today to start making a difference.
                </div>

            </div>
        </div>
    )
}

export default Home