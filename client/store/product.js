import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const GET_PRODUCT = 'GET_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */

const _getProduct = (product) => ({type: GET_PRODUCT, product})

/**
 * THUNK CREATORS
 */

export const getProduct = (id, push) => {
  //   if (!id) {
  //     id = location.pathname.slice(9)
  //   }

  return async (dispatch) => {
    const product = await axios.get(`/api/products/${id}`)
    push(`/product/${id}`)

    dispatch(_getProduct(product.data))
  }
}
/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product

    default:
      return state
  }
}
