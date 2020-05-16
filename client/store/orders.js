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
// import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ORDER_LIST = 'GET_ORDER_LIST'
const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS'

const GET_USER_ORDERS = 'GET_USER_ORDERS'

// const ADD_ORDER = 'ADD_ORDER'
// const REMOVE_ORDER = 'REMOVE_ORDER'

/**
 * INITIAL STATE
 */
const defaultOrders = [
  {id: '', status: '', dateOfPurchase: '', subTotal: 0, orderitems: []},
]

/**
 * ACTION CREATORS
 */
// const _getOrders = (orders) => ({type: GET_ORDERS, orders})
// const _addToOrder = (item) => ({type: ADD_ORDER, item})
/**
 * THUNK CREATORS
 */
// export const getOrders = () => {
//   return async (dispatch) => {
//     const res = await axios.get('/api/orders')

//     dispatch(_getOrders(res.data))
//   }
// }

// export const addOrder = (item) => {
//   return async (dispatch) => {
//     console.log('addToorder thunk 222222222111111111', item)
//     const {productId, quantity, price, userId, orderId} = item
//     const newItem = await axios.post('/api/orders', {
//       productId,
//       quantity,
//       price,
//       userId,
//     })
//     console.log('addToCart thunk', newItem.data)
//     dispatch(_addToOrder(newItem.data))
//     dispatch(addItems(newItem.data.id, productId))
//   }
// }
/**
 * REDUCER
 */
// export default function (state = {}, action) {
//   switch (action.type) {
//     case GET_ORDERS:
//       return action.orders
//     case ADD_ORDER:
//       console.log('helleoeleoeoeoeoe', action, state)
//       // if new item then add else update existing item's quantity
//       // const existingItem = state.find(
//       //   (item) => item.productId === action.item.productId
//       // )
//       //console.log('Inside ADD_CART reducer: ', action.item, existingItem)
//       // if (existingItem) {
//       //   existingItem.quantity += action.item.quantity
//       //   return state.map((item) => {
//       //     if (item.productId === existingItem.productId) {
//       //       return {...state, orderitems: [...existingItem]}
//       //     }
//       //   })
//       // } else {
//       return {...state, orderitems: [...action.item]}
//}
const _getOrderList = (orders) => ({type: GET_ORDER_LIST, orders})
const _updateOrderStatus = (order) => ({type: UPDATE_ORDER_STATUS, order})

const _getUserOrders = (orders) => ({type: GET_USER_ORDERS, orders})

// const _addOrder = (order) => ({type: ADD_ORDER, order})
// const _removeOrder = (id) => ({type: REMOVE_ORDER, id})

/**
 * THUNK CREATORS
 */
export const getOrderList = () => async (dispatch) => {
  const orders = (await axios.get(`/api/orders/order-list/`)).data
  dispatch(_getOrderList(orders))
}

export const updateOrderStatus = (order) => async (dispatch) => {
  console.log('in updateOrderStatus thunk')
  const _updatedOrder = (await axios.put(`/api/orders/order-list`, order)).data
  dispatch(_updateOrderStatus(_updatedOrder))
}

export const getUserOrders = (userId) => async (dispatch) => {
  console.log('in getUserOrders thunk')
  const orders = (await axios.get(`/api/orders/${userId}`)).data
  dispatch(_getUserOrders(orders))
}

// export const addOrder = (order) => async (dispatch) => {
//   const _addedOrder = (await axios.put(`/api/orders/`, order)).data
//   dispatch(_addOrder(_addedOrder))
// }

// export const removeOrder = (id) => {
//   return async (dispatch) => {
//     await axios.delete(`/api/orders/${id}`)
//     dispatch(_removeOrder(id))
//   }
// }

/**
 * REDUCER
 */
export default function (state = defaultOrders, action) {
  switch (action.type) {
    case GET_ORDER_LIST:
      return action.orders
    case UPDATE_ORDER_STATUS:
      return [...state].map((order) =>
        order.id === action.order.id ? action.order : order
      )
    case GET_USER_ORDERS:
      return action.orders
    // case ADD_ORDER:
    //   return [...state, action.order]
    // case REMOVE_ORDER:
    //   return [...state].filter((order) => order.id !== action.id)
    default:
      return state
  }
}
