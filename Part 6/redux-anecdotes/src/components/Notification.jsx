import { useSelector } from "react-redux"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  const noti = useSelector(state => state.noti)

  if (noti){
    return (
      <div style={style}>
        {noti}
      </div>
    )
  }
}

export default Notification
