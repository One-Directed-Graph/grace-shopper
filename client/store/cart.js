import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const INCREASE_QTY = 'INCRREASE_QTY'
const DECREASE_QTY = 'DESCREASE_QTY'
const REMOVE_ITEM = 'REMOVE_ITEM'
/**
 * INITIAL STATE
 */
//const initState={addedItems:[],total:0}
//const defaultUser = {}

/**
 * ACTION CREATORS
 */
const _getCart = (cart) => ({type: GET_CART, cart})
const _addToCart = (id) => ({type: ADD_TO_CART, id})
/**
 * THUNK CREATORS
 */
export const getCart = () => {
  console.log('from thunk for getCart')
  return async (dispatch) => {
    const cart = await axios.get('/api/cart')
    console.log(cart.data)
    dispatch(_getCart(cart.data))
  }
}
export const addToCart = (id, qty, price) => {
  return async (dispatch) => {
    console.log('addToCart thunk')
    const newItem = await axios.post('/api/cart', {
      productId: id,
      quantity: qty,
      price: price,
    })
    console.log('addToCart thunk', newItem.data)
    // dispatch(_addToCart(newItem))
  }
}

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_TO_CART:
      //to add item
      //const addedItem = state.addedItems.find(item=>item.id===action.id)
      return state
    default:
      return state
  }
}
