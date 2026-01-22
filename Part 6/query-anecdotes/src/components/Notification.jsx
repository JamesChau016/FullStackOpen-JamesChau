import { useContext } from 'react'
import NotiContext from '../NotiContext'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  const { noti, notiDispatch } = useContext(NotiContext)

  if (noti){
    setTimeout(()=>{
      notiDispatch({
        type: 'SET_NOTI',
        payload: null
      })
    }, 5000)
    return (
      <div style={style}>
        {noti}
      </div>
    )
  }
  else{
    return null
  }
}

export default Notification
