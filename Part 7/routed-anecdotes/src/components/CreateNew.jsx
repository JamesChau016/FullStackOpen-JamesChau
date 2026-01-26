import { useField } from './Hooks'

const CreateNew = (props) => {
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')

  

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    props.setAnecdotes(props.anecdotes.concat(anecdote))
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    props.navigate('/')
    props.setNotification(`you created "${content.value}"`)
    setTimeout(() => {
        props.setNotification(null)
    },5000)
}
    

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
            <div>
                content
                <input {...content} />
            </div>
            <div>
                author
                <input {...author} />
            </div>
            <div>
                url for more info
                <input {...info} />
            </div>
            <button>create</button>
            </form>
        </div>
    )
}


export default CreateNew


