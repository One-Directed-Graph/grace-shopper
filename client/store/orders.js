import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'

/**
 * INITIAL STATE
 */

/**
 * ACTION CREATORS
 */
const _getOrders = (orders) => ({type: GET_ORDERS, orders})

/**
 * THUNK CREATORS
 */
export const getOrders = () => {
  return async (dispatch) => {
    const res = await axios.get('/api/orders')

    dispatch(_getOrders(res.data))
  }
}

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders

    default:
      return state
  }
}
