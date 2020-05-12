/* eslint-disable complexity */
import axios from 'axios'
import history from '../history'
import store from './index'
import {loadPage} from './divided'
/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const LOW_HIGH = 'LOW_HIGH'
const HIGH_LOW = 'HIGH_LOW'
const SORT_CATEGORIES = 'SORT_CATEGORIES'
const A_Z = 'A_Z'
const Z_A = 'Z_A'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const CREATE_PRODUCT = 'CREATE_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

/**
 * INITIAL STATE
 */

const defaultProducts = []

/**
 * ACTION CREATORS
 */

const _getProducts = (products) => ({type: GET_PRODUCTS, products})
const _LowToHigh = (products) => ({type: LOW_HIGH, products})
const _highToLow = (products) => ({type: HIGH_LOW, products})
const _Categories = (products, categories) => ({
  type: SORT_CATEGORIES,
  products,
  categories,
})
const _aToz = (products) => ({type: A_Z, products})
const _zToa = (products) => ({type: Z_A, products})
const _createProduct = (product) => ({type: CREATE_PRODUCT, product})
const _updateProduct = (product) => ({type: UPDATE_PRODUCT, product})

/**
 * THUNK CREATORS
 */
export const getProducts = (str, sortBy, page) => {
  console.log('from getProducts', sortBy, str, page)
  //page = page || 1
  return async (dispatch) => {
    if (str === 'load') {
      //console.log('555555', products.length)
      let products = await axios.get('/api/products')

      dispatch(_getProducts(products.data))
      //dispatch(_aToz(products.data))
      dispatch(loadPage(page))
    }
    if (sortBy === 'Categories') {
      const products = await store.getState().products
      const categories = await store.getState().categories
      dispatch(_Categories(products, categories))
      dispatch(loadPage(page))
    }
    if (sortBy === 'LowToHigh') {
      const products = await store.getState().products

      dispatch(_LowToHigh(products))
      dispatch(loadPage(page))
    }
    if (sortBy === 'HighToLow') {
      const products = await store.getState().products
      dispatch(_highToLow(products))
      console.log('from low to high', products)
      dispatch(loadPage(page))
    }
    if (sortBy === 'AtoZ') {
      const products = await store.getState().products
      dispatch(_aToz(products))
      dispatch(loadPage(page))
    }
    if (sortBy === 'ZtoA') {
      const products = await store.getState().products
      dispatch(_zToa(products))
      dispatch(loadPage(page))
    }
    if (str === 'do nothing') {
      let products = store.getState().products
      return dispatch(_getProducts(products))
    }
  }
}

export const createProduct = (product) => async (dispatch) => {
  const newProduct = (await axios.post('/api/products', product)).data
  dispatch(_createProduct(newProduct))
}

export const updateProduct = (product) => async (dispatch) => {
  const newProduct = (await axios.put(`/api/products/${product.id}`, product))
    .data
  dispatch(_updateProduct(newProduct))
}

// export const lowToHigh = () => {
//   return async (dispatch) => {
//     const products = await store.getState().products
//     return dispatch(_lowToHigh(products))
//   }
// }
// export const highToLow = () => {
//   return async (dispatch) => {
//     const products = await store.getState().products
//     return dispatch(_highToLow(products))
//   }
// }
// export const aToz = () => {
//   return async (dispatch) => {
//     const products = await store.getState().products
//     return dispatch(_aToz(products))
//   }
// }
// export const zToa = () => {
//   return async (dispatch) => {
//     const products = await store.getState().products
//     return dispatch(_zToa(products))
//   }
// }

// export const Categories = () => {
//   return async (dispatch) => {
//     const categories = await store.getState().categories
//     const products = await store.getState().products
//     return dispatch(_Categories(products, categories))
//   }
// }
/**
 * REDUCER
 */
export default function (state = defaultProducts, action) {
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
  if (action.type === A_Z) {
    const newState = action.products.sort((a, b) => {
      return a.title.localeCompare(b.title)
    })
    return newState
  }
  if (action.type === Z_A) {
    const newState = action.products.sort((a, b) => {
      return b.title.localeCompare(a.title)
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

  if (action.type === CREATE_PRODUCT) {
    return [action.product, ...state]
  }

  if (action.type === UPDATE_PRODUCT) {
    return state.map((product) => {
      if (product.id === action.product.id) return action.product
      return product
    })
  }

  return state
}
