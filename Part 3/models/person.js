const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

console.log('connecting to', url)
mongoose.connect(url, { family: 4 })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })


const personSchema = new mongoose.Schema({
    "name" : {
      type: String,
      minLength: 3,
      required: true
    },
    "number" : {
      type: String,
      minLength: 9,
      validate: {
        validator: function (v){
          return /^\d{2,3}-\d{3,}$/.test(v)
        },
        message: props => `${props.value} is not a valid phone number!`
      },
      required: true
    }
})

personSchema.set('toJSON', {
    transform: (doc, obj) =>{
        obj.id = obj._id.toString()
        delete obj._id
        delete obj.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
