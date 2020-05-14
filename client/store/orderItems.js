import axios from 'axios'
import history from '../history'
import {getOrders} from './orders'
/**
 * ACTION TYPES
 */

const ADD_ITEMS = 'ADD_ITEMS'
const GET_ITEMS = 'GET_ITEMS'
/**
 * INITIAL STATE
 */

/**
 * ACTION CREATORS
 */

const _addItems = (item) => ({type: ADD_ITEMS, item})
const _getItems = (item) => ({type: GET_ITEMS, item})
/**
 * THUNK CREATORS
 */

export const getItems = () => {
  return async (dispatch) => {
    const res = await axios.get('/api/items')
    console.log(',.,.,.,.,.,.,.,.,.,.,.,.,.,.', res.data)
    dispatch(_getItems(res.data))
  }
}

export const addItems = (orderId, productId, price, qv) => {
  return async (dispatch) => {
    const {productId, quantity, price} = item
    console.log('items thunk 22222222', orderId, productId)

    const newItem = await axios.post('/api/items', {
      orderId: orderId,
      productId: productId,
      price: price,
      quantity: qv,
    })
    console.log('addToCart thunk 656565666565656565', newItem.data)
    dispatch(_addItems(newItem.data))
    dispatch(getOrders())
  }
}
/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_ITEMS:
      console.log('from reducers in side the order list', action.item)
      return action.item
    case ADD_ITEMS:
      return [...state, action.item]
    default:
      return state
  }
}
