import {Link} from 'react-router-dom'

const Event = (props) => {
    return(
        <div className = 'event-job-container' >
            <Link to={`/events/${props.event.id}`}>
            <span className = 'bold'>{props.event.title}</span><br/>
            </Link>
            
            {/* <span className = 'bold'>{props.event.title}</span><br/> */}
            Type: {props.event.type}

            <div className = 'event-job-text'>
              <div> Date: {props.event.date}</div>
              <div> Zipcode: {props.event.zip}</div>
            </div>
        </div>

    )
}

export default Event