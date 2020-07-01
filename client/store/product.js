import axios from 'axios'
import history from '../history'
import {editCart} from './order'

/**
 * ACTION TYPES
 */

const GET_PRODUCT = 'GET_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'

/**
 * INITIAL STATE
 */
const defaultProduct = {
  id: '',
  title: '',
  description: '',
  price: 0,
  quantity: 0,
  img: '',
  categoryId: '',
  reviews: [],
}

/**
 * ACTION CREATORS
 */

const _getProduct = (product) => ({type: GET_PRODUCT, product})
const _editProduct = (product) => ({type: EDIT_PRODUCT, product})

/**
 * THUNK CREATORS
 */

export const getProduct = (id, push) => {
  return async (dispatch) => {
    const product = await axios.get(`/api/products/${id}`)
    push(`/product/${id}`)

    dispatch(_getProduct(product.data))
  }
}

export const editProduct = (id, qv, orderId, total, status) => {
  return async (dispatch) => {
    const product = await axios.put(`/api/products/checkout/${id}`, {
      quantity: qv,
    })
    //push(`/checkout`)

    dispatch(_editProduct(product.data))
  }
}
/**
 * REDUCER
 */
export default function (state = defaultProduct, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    case EDIT_PRODUCT:
      return action.product
    default:
      return state
  }
}
