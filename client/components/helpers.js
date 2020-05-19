export function ratingStars(ratings) {
  const styleStar = 'fa fa-star'
  let rating = ratings
  if (Array.isArray(ratings)) {
    rating =
      ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length
    //console.log('rating from reducer', rating)
  } else {
    rating = ratings
  }
  if (rating > 0) {
    const diff = new Array(5 - rating).fill(styleStar)
    const starArr = new Array(rating).fill(`${styleStar} checked`)
    return [...starArr, ...diff]
  }
  return []
}
