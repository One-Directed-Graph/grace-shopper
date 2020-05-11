export const getPages = (pageNumber, arrayToPaginate) => {
  let perPage = 6
  let totalPages = Math.ceil(arrayToPaginate.length / perPage)
  let piecedArray = []
  const end = perPage * pageNumber * 1
  const start = end - perPage
  piecedArray = arrayToPaginate.slice(start, end)
  return piecedArray
}
