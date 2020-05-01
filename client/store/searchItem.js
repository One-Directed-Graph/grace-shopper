import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_SEARCH = 'GET_SEARCH'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const _getSearchProducts = (products) => ({type: GET_SEARCH, products})

/**
 * THUNK CREATORS
 */
export const getSearchProducts = (results, push) => {
  console.log('from thunk for getProducts111111111', results)
  return async (dispatch) => {
    dispatch(_getSearchProducts(results))
    push('/displaysearch')
  }
}

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_SEARCH:
      return action.products

    default:
      return state
  }
}
