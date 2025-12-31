const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
  if (blogs.length === 1){
    return blogs[0].likes
  }
  else{
    return blogs.reduce((accumulator, curr)=>{ 
      return accumulator + curr.likes
    },0)
  }
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 1){
    return blogs[0]
  }
  else{
    return blogs.find(b => b.likes === Math.max(...blogs.map(b => b.likes)))
  }
}

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }

