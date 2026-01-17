import { useDispatch } from 'react-redux'
import { filterChange } from "../reducers/filterReducer"

const Filter = () => {
    const dispatch = useDispatch()
    const handleChange = (e) => {
      e.preventDefault()
      const filValue = e.target.value
      dispatch(filterChange(filValue))
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter