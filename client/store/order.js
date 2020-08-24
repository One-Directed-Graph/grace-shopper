import axios from 'axios'
import history from '../history'
import {addItems} from './orderItems'
/**
 * ACTION TYPES
 */
const GET_ORDER = 'GET_ORDER'
const ADD_ORDER = 'ADD_ORDER'
const REMOVE_FROM_ORDER = 'REMOVE_FROM_ORDER'
const EDIT_ORDER = 'EDIT_ORDER'
const CREATE_CART = 'CREATE_CART'
const CREATE_SESSION_CART = 'CREATE_SESSION_CART'
const GET_SESSION_CART = 'GET_SESSION_CART'
/**
 * INITIAL STATE
 */

const defaultOrder = {
  id: '',
  status: '',
  dateOfPurchase: '',
  subTotal: 0,
  orderitems: [],
}

/**
 * ACTION CREATORS
 */
const _getOrder = (order) => ({type: GET_ORDER, order})
export const _addToOrder = (item) => ({type: ADD_ORDER, item})
export const _editOrder = (item) => ({type: EDIT_ORDER, item})
export const _removeFromOrder = (id) => ({type: REMOVE_FROM_ORDER, id})
const _createCart = (item) => ({type: CREATE_CART, item})
const _createSessionCart = (item) => ({type: CREATE_SESSION_CART, item})
const _getSessionCart = (order) => ({type: GET_SESSION_CART, order})
/**
 * THUNK CREATORS
 */

export const getSessionCart = () => {
  //console.log('id from getOrder idcfrom getOrder', id)
  return async (dispatch) => {
    console.log('before going through the api')
    const res = await axios.get('/api/orders/session')
    console.log('response from the getssesioncart', res)
    if (res === null) {
      //console.log('create create create create', id)
      // createSessionCart()
    } else {
      //console.log('in getOrder thunk', res.data)
      dispatch(_getSessionCart(res.data))
    }
  }
}

export const createSessionCart = (userId, productId, price, qv, push) => {
  return async (dispatch) => {
    const res = await axios.post(`/api/orders/session`)

    //console.log(
    // 'create sessionpost post post post in getsesioncart thunk',
    //res.data
    //),
    dispatch(_createSessionCart(res.data))
    dispatch(addItems(userId, res.data.id, productId, price, qv, push))

    //push(`/orders/cart/${res.data.userId}`)
  }
}
export const getOrder = (id) => {
  console.log('id from getOrder idcfrom getOrder', id)
  return async (dispatch) => {
    const res = await axios.get(`/api/orders/cart/${id}`)
    console.log(res)
    if (res.data == null) {
      console.log('create create create create', id)
      createCart(id)
    } else {
      //console.log('in getOrder thunk', res.data)
      dispatch(_getOrder(res.data))
    }
  }
}

export const createCart = (id, productid, productprice, qv, push, product) => {
  return async (dispatch) => {
    const res = await axios.post(`/api/orders`, {
      userId: id,
    })

    // console.log('post post post post in getOrder thunk', res.data),
    dispatch(_createCart(res.data))

    dispatch(addItems(id, res.data.id, productid, productprice, qv, push))

    //push(`/orders/cart/${res.data.userId}`)
  }
}

export const editCart = (id, total, status, push) => {
  return async (dispatch) => {
    const res = await axios.put(`/api/orders/${id} `, {
      subTotal: total,
      status: status,
    })
    push('/checkout')
    dispatch(_editOrder(res.data))
  }
}

// export const addOrder = (item) => {
//   return async (dispatch) => {
//     //console.log('addToorder thunk 222222222111111111', item)
//     const {productId, quantity, price, userId, orderId} = item
//     const newItem = await axios.post('/api/orders', {
//       productId,
//       quantity,
//       price,
//       userId,
//     })
//     console.log('addToCart thunk', newItem.data)
//     await dispatch(_addToOrder(newItem.data))
//     await dispatch(addItems(newItem.data.id, productId))
//   }
// }
/**
 * REDUCER
 */
export default function (state = defaultOrder, action) {
  switch (action.type) {
    case GET_ORDER:
      return action.order
    case GET_SESSION_CART:
      return action.order
    case ADD_ORDER:
      console.log(state)
      return {
        ...state,
        orderitems: [...state.orderitems, action.item],
      }
    case EDIT_ORDER:
      return {
        ...state,
        orderitems: state.orderitems.map((item) => {
          if (item.id === action.item.id) {
            const processedItem = {...action.item}
            processedItem.product = item.product
            return processedItem
          }
          return item
        }),
      }
    case REMOVE_FROM_ORDER:
      console.log(state)
      return {
        ...state,
        orderitems: state.orderitems.filter((item) => item.id !== action.id),
      }
    case CREATE_CART:
      console.log(state)
      return action.item
    case CREATE_SESSION_CART:
      return action.item
    default:
      return state
  }
}
