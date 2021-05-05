import {Link} from 'react-router-dom'

const LinkButton = (props) => {
    return(
        <div className = {props.class}>
        {
            props.setAddFormState ?
            
            <div onClick={()=>{props.setAddFormState(props.text)}} >
                <Link to= {props.path}>{props.text}</Link>
            </div>    
        :
            <div >
                <Link to= {props.path}>{props.text}</Link>
            </div> 
        }

        </div>

    )
}

export default LinkButton