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
    let isDecimal = rating % 1

    if (isDecimal === 0) {
      const diff = new Array(5 - rating).fill(styleStar)
      const starArr = new Array(rating).fill(`${styleStar} checked`)

      return [...starArr, ...diff]
    } else {
      rating = Math.ceil(rating)
      const diff = new Array(4 - rating).fill(styleStar)
      const starArr = new Array(rating).fill(`${styleStar} checked`)

      return [...starArr, `fa fa-star-half-alt checked`, ...diff]
    }
  }

  return []
}
