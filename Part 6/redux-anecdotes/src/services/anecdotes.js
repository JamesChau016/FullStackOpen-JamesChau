

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await fetch(baseUrl)

    if (!response.ok){
        throw new Error('failed to fetch data')
    }

    return await response.json()
}

const create = async (content) => {
    const response = await fetch(baseUrl, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({content, votes:0})
    })
    if (!response.ok){
        throw new Error('Failed to create new anecdotes')
    }
    return await response.json()
}

export default { getAll, create }