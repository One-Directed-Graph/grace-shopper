import axios from 'axios'
import history from '../history'
import {getOrder, _removeFromOrder, _addToOrder, _editOrder} from './order'
/**
 * ACTION TYPES
 */

const ADD_ITEMS = 'ADD_ITEMS'
const GET_ITEMS = 'GET_ITEMS'
const DESTROY_ITEMS = 'DESTROY_ITEMS'
const EDIT_ITEMS = 'EDIT_ITEMS'
/**
 * INITIAL STATE
 */

/**
 * ACTION CREATORS
 */

const _addItems = (item) => ({type: ADD_ITEMS, item})
const _getItems = (item) => ({type: GET_ITEMS, item})
const _destroyItems = (id) => ({type: DESTROY_ITEMS, id})
const _editItems = (item) => ({type: EDIT_ITEMS, item})

/**
 * THUNK CREATORS
 */
export const destroyItem = (id) => {
  return async (dispatch) => {
    await axios.delete(`/api/items/${id}`)
    dispatch(_destroyItems(id))
    dispatch(_removeFromOrder(id))
  }
}

export const getItems = () => {
  return async (dispatch) => {
    const res = await axios.get('/api/items')
    dispatch(_getItems(res.data))
  }
}
export const combineItem = (orderitemId, orderId) => {
  console.log('store combine item called?')
  return async (dispatch) => {
    const newItem = await axios.put(`/api/items/${orderitemId}`, {
      orderId: orderId,
    })
    dispatch(_editItems(newItem.data))
  }
}
export const editItem = (userId, id, qv) => {
  return async (dispatch) => {
    //const {productId, quantity, price, userId,orderId} = item
    const newItem = await axios.put(`/api/items/${id}`, {
      quantity: qv,
    })
    dispatch(_editItems(newItem.data))
    dispatch(_editOrder(newItem.data))
    //dispatch(getOrder(userId))
  }
}

export const addItems = (userId, orderId, productId, price, qv, push) => {
  return async (dispatch) => {
    //console.log('items thunk 22222222', orderId, productId)
    //const {productId, quantity, price, userId,orderId} = item
    const newItem = await axios.post('/api/items', {
      orderId: orderId,
      productId: productId,
      price: price,
      quantity: qv,
    })
    // dispatch(getOrder(userId))
    //console.log('addToCart thunk 656565666565656565', newItem.data)
    dispatch(_addItems(newItem.data))
    dispatch(_addToOrder(newItem.data))
    //dispatch(getOrder())
    //push(`products/1?sortBy=AtoZ`)
  }
}
/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_ITEMS:
      //console.log('from reducers in side the order list', action.item)
      return action.item
    case ADD_ITEMS:
      return [...state, action.item]
    case DESTROY_ITEMS:
      return state.filter((item) => {
        //console.log('hello from reducer for delete', item.id, action.id, state)
        return item.id !== action.id ? item : ''
      })
    case EDIT_ITEMS:
      const newState = [
        ...state.map((item) => {
          return item.id === action.item.id ? action.item : item
        }),
      ]
      console.log('in EDIT ITEMS', newState)
      return newState
    default:
      return state
  }
}
