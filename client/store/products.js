import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'

const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const _getProducts = (products) => ({type: GET_PRODUCTS, products})

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

/**
 * REDUCER
 */
export default function (state = [], action) {
  if (action.type === GET_PRODUCTS) {
    return action.products
  }
  console.log('state from thunk for products', state)
  return state
}
