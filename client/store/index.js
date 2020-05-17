import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
// import thunkMiddleware from 'redux-thunk'
import thunks from 'redux-thunk'
// import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import users from './users'
import products from './products'
import product from './product'
import searchItem from './searchItem'
import categories from './categories'
import cart from './cart'
import divided from './divided'
import orders from './orders'
import order from './order'
import orderItems from './orderItems'

const reducer = combineReducers({
  user,
  users,
  products,
  product,
  searchItem,
  categories,
  cart,
  divided,
  orders,
  order,
  orderItems,
})

// const middleware = composeWithDevTools(
//   applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
// )
// const store = createStore(reducer, middleware)

const preloadedState = {
  cart: [{}],
  categories: [{}],
  divided: [],
  order: {},
  orderItems: [],
  orders: [{}],
  product: [],
  products: [{}],
  searchItem: [],
  user: {},
  users: [{}],
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducer,
  preloadedState,
  composeEnhancers(applyMiddleware(thunks, createLogger({collapsed: true})))
)

export default store
export * from './user'
export * from './users'
export * from './products'
export * from './product'
export * from './searchItem'
export * from './categories'
export * from './cart'
export * from './divided'
export * from './orders'
export * from './order'
export * from './orderItems'
