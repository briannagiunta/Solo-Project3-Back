const Post = (props) => {
    return(
        <div className = 'post'>
            <div className = 'small-pic'>

            </div>
            <div className= 'post-text'>
                <div className = 'post-title'>
                    {props.title}
                </div>
                <div className = 'post-description'>
                    {props.description}
                </div>
            </div>
            <div className = 'comments-button'>
                <button>Comments</button>
            </div>
        </div>
    )
}

export default Post