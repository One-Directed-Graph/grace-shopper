import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const _getCart = (cart) => ({type: GET_CART, cart})

/**
 * THUNK CREATORS
 */
export const getCart = () => {
  console.log('from thunk for getCart')
  return async (dispatch) => {
    const cart = await axios.get('/api/cart')
    dispatch(_getCart(cart.data))
  }
}

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_CART:
      return action.cart

    default:
      return state
  }
}
