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


app.get('/api/persons/:id', (request, response)=>{
    const id = request.params.id
    Person.findById(id).then(result =>{
        response.json(result)
    })
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
    // } else if (persons.map(p=>p.name).includes(body.name)){
    //     return response.status(400).json({ error: 'name must be unique' })
    // }


    const person = new Person({
        name : body.name,
        number : body.number
    })
    
    person.save().then(savedValue =>{
        response.json(savedValue)
    })
    
})




const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})