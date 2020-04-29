import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_PRODUCT = 'GET_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const _getProducts = (products) => ({type: GET_PRODUCTS, products})

const removeProducts = () => ({type: REMOVE_USER})

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
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products

    default:
      return state
  }
}
