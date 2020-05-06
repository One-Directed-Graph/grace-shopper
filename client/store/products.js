import axios from 'axios'
import history from '../history'
const LOAD_PAGE = 'LOAD_PAGE'
/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'

const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

/**
 * INITIAL STATE
 */

/**
 * ACTION CREATORS
 */
const _getProducts = (products) => ({type: GET_PRODUCTS, products})
const _loadPage = () => ({type: LOAD_PAGE})

/**
 * THUNK CREATORS
 */
export const getProducts = () => {
  console.log('from thunk for getProducts')
  return async (dispatch) => {
    const products = await axios.get('/api/products')
    dispatch(_getProducts(products.data))
  }
}

export const loadPage = () => {
  console.log('from thunk for getProducts')
  return async (dispatch) => {
    dispatch(_loadPage())
  }
}
/**
 * REDUCER
 */
export default function (
  state = {products: [], count: 0, divided: []},
  action
) {
  if (action.type === GET_PRODUCTS) {
    return {
      products: [...action.products],
      count: action.products.length,
    }
  }
  if (action.type === LOAD_PAGE) {
    return {
      ...state,
      divided: getPages(state),
    }
  }
  return state
}

let getPages = (state) => {
  let count = state.count
  console.log('count count count count', state)
  let perPage = 5
  let totalPages = Math.ceil(count / perPage)
  console.log('count count count count', totalPages)
  let piecedArray = []
  let i = 0
  while (i < count) {
    piecedArray.push(state.products.slice(i, (i += perPage)))
  }
  console.log('ststststststststs', piecedArray)
  return piecedArray
}
