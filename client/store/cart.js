import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
//const EDIT_CART ='EDIT_CART'
const INCREASE_QTY = 'INCRREASE_QTY'
const DECREASE_QTY = 'DESCREASE_QTY'
const REMOVE_ITEM = 'REMOVE_ITEM'
/**
 * INITIAL STATE
 */
//const initState={productId,quantity,price}
//const defaultUser = {}

/**
 * ACTION CREATORS
 */
const _getCart = (items) => ({type: GET_CART, items})
const _addToCart = (item) => ({type: ADD_TO_CART, item})
/**
 * THUNK CREATORS
 */
export const getCart = () => {
  console.log('from thunk for getCart')
  return async (dispatch) => {
    const items = await axios.get('/api/cart')
    console.log(items.data)
    dispatch(_getCart(items.data))
  }
}
export const addToCart = (item) => {
  return async (dispatch) => {
    console.log('addToCart thunk')
    const {productId, quantity, price} = item
    const newItem = await axios.post('/api/cart', {productId, quantity, price})

    console.log('addToCart thunk', newItem.data)
    dispatch(_addToCart(newItem.data))
  }
}

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_CART:
      return action.items

    case ADD_TO_CART:
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
