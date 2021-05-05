const TopForm = (props) => {
    return(
        <div>
            <div>Title:</div>
            <input type = 'text' onChange={(e)=>(props.setTitle(e.target.value))} />
            <div>Description:</div>
            <input type = 'text' onChange={(e)=>(props.setDescription(e.target.value))} /> 
        </div>

    )
}

export default TopForm