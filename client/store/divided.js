import axios from 'axios'
import history from '../history'
const LOAD_PAGE = 'LOAD_PAGE'
import store from './index'
/**
 * ACTION TYPES
 */

const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

/**
 * INITIAL STATE
 */

/**
 * ACTION CREATORS
 */

const _loadPage = (page, products) => ({type: LOAD_PAGE, page, products})

/**
 * THUNK CREATORS
 */

export const loadPage = (page) => {
  return async (dispatch) => {
    const products = await store.getState().products
    //push(`/products/${page}`)
    dispatch(_loadPage(page, products))
  }
}
/**
 * REDUCER
 */
export default function (state = [], action) {
  if (action.type === LOAD_PAGE) {
    return [...getPages(action.page, action.products)]
  }
  return state
}

const getPages = (pageNumber, products) => {
  let perPage = 6
  let totalPages = Math.ceil(products.length / perPage)
  let piecedArray = []
  const end = perPage * pageNumber * 1
  const start = end - perPage
  piecedArray = products.slice(start, end)
  return piecedArray
}
