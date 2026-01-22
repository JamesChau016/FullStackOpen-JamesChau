const baseUrl = 'http://localhost:3001/anecdotes/'

export const getAll = async () => {
    const response = await fetch(baseUrl)

    if (!response.ok){
        throw new Error('Failed to fetch data')
    }

    return await response.json()
}

export const createNew = async (newAnec) => {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newAnec)
    }

    const response = await fetch(baseUrl, options)

    if (!response.ok){
        throw new Error('Failed to create new anecdote')
    }

    return await response.json()
}

export const voteAnec = async (anecdote) => {
    const options = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(anecdote)
    }

    const response = await fetch(`${baseUrl}/${anecdote.id}`,options)
    if (!response.ok) {
        throw new Error('Failed to vote')
    }

    return await response.json()
}