

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await fetch(baseUrl)

    if (!response.ok){
        throw new Error('failed to fetch data')
    }

    return await response.json()
}

export default { getAll }