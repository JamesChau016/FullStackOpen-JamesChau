require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')
const app = express()



app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (request)=> JSON.stringify(request.body))
morgan.format('tiny and body', ':method :url :status :res[content-length] - :response-time ms :body')
app.use(morgan('tiny and body'))

app.get('/', (req, res) => {
    res.send('Backend is running!');
  });


app.get('/api/persons', (request,response)=>{
    Person.find({}).then(persons =>{
        response.json(persons)
    })
})


app.get('/api/persons/:id', (request, response, next)=>{
    const id = request.params.id
    Person.findById(id).then(result =>{
        if (result){
            response.json(result)
        }
        else{
            response.status(404).end()
        }
        
    })
    .catch(error=>next(error))
})

app.post('/api/persons', (request, response) =>{
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
          error: 'name missing',
        })
    } else if (!body.number) {
        return response.status(400).json({
          error: 'number missing',
        })}
   


    const person = new Person({
        name : body.name,
        number : body.number
    })
    
    person.save().then(savedValue =>{
        response.json(savedValue)
    })
    
})

app.delete('/api/persons/:id', (request,response,next)=>{
    const idDel = request.params.id
    Person.findByIdAndDelete(idDel)
    .then(result => {
      response.status(204).end()
    }).catch(error=>next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    }
    next(error)
}

app.use(errorHandler)



const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})