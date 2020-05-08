import axios from 'axios'
import history from '../history'
import store from './index'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const LOW_HIGH = 'LOW_HIGH'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const HIGH_LOW = 'HIGH_LOW'

/**
 * INITIAL STATE
 */

/**
 * ACTION CREATORS
 */
const _getProducts = (products) => ({type: GET_PRODUCTS, products})
const _lowToHigh = (products) => ({type: LOW_HIGH, products})
const _highToLow = (products) => ({type: HIGH_LOW, products})
/**
 * THUNK CREATORS
 */
export const getProducts = (str) => {
  return async (dispatch) => {
    if (str === 'load') {
      //console.log('555555', products.length)
      let products = await axios.get('/api/products')

      return dispatch(_getProducts(products.data))
    }
    if (str === 'do nothing') {
      let products = store.getState().products
      return dispatch(_getProducts(products))
    }
  }
}
export const lowToHigh = () => {
  return async (dispatch) => {
    const products = await store.getState().products
    return dispatch(_lowToHigh(products))
  }
}
export const highToLow = () => {
  return async (dispatch) => {
    const products = await store.getState().products
    return dispatch(_highToLow(products))
  }
}
/**
 * REDUCER
 */
export default function (state = [], action) {
  if (action.type === GET_PRODUCTS) {
    return action.products
  }
  if (action.type === LOW_HIGH) {
    const newState = action.products.sort((a, b) => {
      return a.price - b.price
    })

    return newState
  }
  if (action.type === HIGH_LOW) {
    const newState = action.products.sort((a, b) => {
      return b.price - a.price
    })

    return newState
  }

  return state
}
