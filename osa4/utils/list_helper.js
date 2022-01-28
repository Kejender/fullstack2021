const dummy = (blogs) => {
    console.log("yeah")
    return 1
  }

const totalLikes = (blogs) => {
  
  let initialValue = 0

  let alllikes = blogs.reduce(
    (previousValue, currentValue) => previousValue + currentValue.likes
    , initialValue
  )
  
  console.log("yeah", alllikes)
  return 1
}

const mostLikes = (blogs) => {
  
    let initialValue = 0
  
    let alllikes = blogs.reduce(
      (previousValue, currentValue) => previousValue.concat(currentValue.likes)
      ,[]
    )

    console.log(Math.max(...alllikes));

    let maxlikes = (Math.max(...alllikes));

    let most_index = alllikes.indexOf(Math.max(...alllikes));
    
    console.log("yeah", alllikes, most_index)

    console.log(blogs[most_index])

    return 1
  }

  module.exports = {
    totalLikes,
    mostLikes
  }