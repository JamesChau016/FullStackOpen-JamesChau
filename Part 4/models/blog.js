const mongoose = require('mongoose')


const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON', {
  transform: (document, object) =>{
    object.id = object._id.toString()
    delete object.__v
    delete object._id
  }
})


module.exports = mongoose.model('Blog', blogSchema)
