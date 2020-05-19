// import product from "../store/product"

export function ratingStars(ratings) {
  const styleStar = 'fa fa-star'
  let rating = ratings
  if (Array.isArray(ratings)) {
    rating =
      ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length
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

export function getPages(pageNumber, arrayToPaginate) {
  console.log('GGETTTT PAGES - PROPS', pageNumber, arrayToPaginate)
  let perPage = 6
  let totalPages = Math.ceil(arrayToPaginate.length / perPage)
  let piecedArray = []
  const end = perPage * pageNumber * 1
  const start = end - perPage
  piecedArray = arrayToPaginate.slice(start, end)
  console.log('GGETTTT PAGES - RESULT', piecedArray)
  return piecedArray
}

export function arrayMaker(category, props) {
  console.log('PPPPRRROOOOPPPSSS', category, props)
  const {products, categories} = props
  const categoryNames = categories.map((_category) => {
    return _category.name
  })

  if (categoryNames.includes(category)) {
    const arr = products.filter((product) => product.category.name === category)
    console.log('NEEW ARRRRRAY', arr)
  }
  console.log('AARRAAAY MAAAKERR', products)
  return products
}
