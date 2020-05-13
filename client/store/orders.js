import axios from 'axios'
import history from '../history'
import {addItems} from './orderItems'
/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'
const ADD_ORDER = 'ADD_ORDER'
/**
 * INITIAL STATE
 */

/**
 * ACTION CREATORS
 */
const _getOrders = (orders) => ({type: GET_ORDERS, orders})
const _addToOrder = (item) => ({type: ADD_ORDER, item})
/**
 * THUNK CREATORS
 */
export const getOrders = () => {
  return async (dispatch) => {
    const res = await axios.get('/api/orders')

    dispatch(_getOrders(res.data))
  }
}

export const addOrder = (item) => {
  return async (dispatch) => {
    console.log('addToorder thunk 222222222111111111', item)
    const {productId, quantity, price, userId, orderId} = item
    const newItem = await axios.post('/api/orders', {
      productId,
      quantity,
      price,
      userId,
    })
    console.log('addToCart thunk', newItem.data)
    dispatch(_addToOrder(newItem.data))
    dispatch(addItems(newItem.data.id, productId))
  }
}
/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    case ADD_ORDER:
      console.log(state)
      // if new item then add else update existing item's quantity
      const existingItem = state.find(
        (item) => item.productId === action.item.productId
      )
      console.log('Inside ADD_CART reducer: ', action.item, existingItem)
      if (existingItem) {
        existingItem.quantity += action.item.quantity
        return state.map((item) => {
          if (item.productId === existingItem.productId) {
            return existingItem
          }
        })
      } else {
        return [...state, action.item]
      }
    default:
      return state
  }
}
