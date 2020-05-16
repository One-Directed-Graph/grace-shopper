import axios from 'axios'
import history from '../history'
import {getOrder} from './order'
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
  console.log('heklelelelelelelel', id)
  return async (dispatch) => {
    await axios.delete(`/api/items/${id}`)
    //console.log(',.,.,.,.,.,.,.,.,.,.,.,.,.,.', res.data)
    dispatch(_destroyItems(id))
  }
}

export const getItems = () => {
  return async (dispatch) => {
    const res = await axios.get('/api/items')
    //console.log(',.,.,.,.,.,.,.,.,.,.,.,.,.,.', res.data)
    dispatch(_getItems(res.data))
  }
}

export const editItem = (userId, id, qv) => {
  return async (dispatch) => {
    //console.log('items thunk 22222222', orderId, productId)
    //const {productId, quantity, price, userId,orderId} = item
    const newItem = await axios.put(`/api/items/${id}`, {
      quantity: qv,
    })
    //console.log('fgfgfgfgfgfgfgfgfgfgfgffggffggfgfgfgfgfgf', newItem.data)
    dispatch(_editItems(newItem.data))
    dispatch(getOrder(userId))
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

    //console.log('addToCart thunk 656565666565656565', newItem.data)
    dispatch(_addItems(newItem.data))
    //dispatch(getOrder())
    // push(`/orders/cart/${userId}`)
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
      return [
        ...state,
        state.map((item) => {
          return item.id === action.item.id ? action.item : item
        }),
      ]
    default:
      return state
  }
}
