
const Noti = (props) => {
    if (props.succ) {
        return(
            <>
                <div id='success'>
                    {props.succ}
                </div>
            </>
        )
    }
    else if (props.err) {
        return(
            <>
                <div id='error'>
                    {props.err}
                </div>
            </>
        )
    }
}

export default Noti