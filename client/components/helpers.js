export function ratingStars(ratings) {
  const styleStar = 'fa fa-star'
  let rating = ratings
  if (Array.isArray(ratings)) {
    console.log('ratings', ratings)
    rating =
      ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length
  } else {
    rating = ratings
  }

  if (rating > 0) {
    const diff = new Array(5 - rating).fill(styleStar)
    const starArr = new Array(rating).fill(`${styleStar} checked`)
    console.log(diff, starArr)
    return [...starArr, ...diff]
  }
  return []
}
