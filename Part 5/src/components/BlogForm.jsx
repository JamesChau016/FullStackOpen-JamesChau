import { useState } from 'react'


const BlogForm = ({ handleCreate }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleAdd = (e) => {
        e.preventDefault()
        handleCreate({
            'title' : title,
            'author' : author,
            'url' : url
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }


    return(
        <>
            <h2>create new</h2>
            <form onSubmit={handleAdd}>
                <div>
                    <label>title: &nbsp;
                        <input
                            type = 'text'
                            value = {title}
                            onChange={t => setTitle(t.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>author: &nbsp;
                        <input
                            type = 'text'
                            value = {author}
                            onChange={a => setAuthor(a.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>url: &nbsp;
                        <input
                            type = 'text'
                            value = {url}
                            onChange={u => setUrl(u.target.value)}
                        />
                    </label>
                </div>
                <button type='submit'>create</button>
            </form>
        </>
    )
}


export default BlogForm