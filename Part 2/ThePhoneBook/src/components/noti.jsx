const Notification = ({ messageS, messageE }) => {
    if ((messageS === null)&&(messageE===null)) {
      return null
    }
    if (messageS){
        return(
            <div className="success">
                {messageS}
            </div>
        )
    }
    else if (messageE){
        return(
            <div className="error">
                {messageE}
            </div>
        )
    }
  }
  
  export default Notification