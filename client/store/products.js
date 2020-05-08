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
const SORT_CATEGORIES = 'SORT_CATEGORIES'
const A_B = 'A_B'
/**
 * INITIAL STATE
 */

/**
 * ACTION CREATORS
 */
const _getProducts = (products) => ({type: GET_PRODUCTS, products})
const _lowToHigh = (products) => ({type: LOW_HIGH, products})
const _highToLow = (products) => ({type: HIGH_LOW, products})
const _Categories = (products, categories) => ({
  type: SORT_CATEGORIES,
  products,
  categories,
})
const _aTob = (products) => ({type: A_B, products})
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
export const aTob = () => {
  return async (dispatch) => {
    const products = await store.getState().products
    return dispatch(_aTob(products))
  }
}

export const Categories = () => {
  return async (dispatch) => {
    const categories = await store.getState().categories
    const products = await store.getState().products
    return dispatch(_Categories(products, categories))
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
  if (action.type === A_B) {
    const newState = action.products.sort((a, b) => {
      return a.title < b.title
    })

    return newState
  }
  if (action.type === SORT_CATEGORIES) {
    let returnArray = []
    for (let i = 0; i < action.categories.length; i++) {
      action.products.filter((prod) => {
        if (prod.categoryId === action.categories[i].id) {
          returnArray.push(prod)
        }
      })
    }
    return returnArray
  }

  return state
}
