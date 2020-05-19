export function ratingStars(ratings) {
  const styleStar = 'fa fa-star'
  let rating = ratings
  console.log('rating', rating)
  if (Array.isArray(ratings)) {
    rating =
      ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length
    //console.log('rating from reducer', rating)
  } else {
    rating = ratings
  }
  console.log('rating', rating)
  if (rating > 0) {
    const diff = new Array(5 - rating).fill(styleStar)
    const starArr = new Array(rating).fill(`${styleStar} checked`)
    console.log('diff and startArr', diff, starArr)
    return [...starArr, ...diff]
  }
  return []
}
