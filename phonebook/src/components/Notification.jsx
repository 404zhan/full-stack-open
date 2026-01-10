const Notification = ({message}) => {
    if(message === null){
        return null
    }
    return (
        <div className = 'error-green'>
            {message}
        </div>
    )
}

export default Notification