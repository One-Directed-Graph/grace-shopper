import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import thunks from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import users from './users'
import products from './products'
import product from './product'
import searchItem from './searchItem'
import categories from './categories'
import cart from './cart'
import divided from './divided'
import orders from './orders'

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
})
// const middleware = composeWithDevTools(
//   applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
// )
// const store = createStore(reducer, middleware)

const store = createStore(
  reducer,
  applyMiddleware(thunks, createLogger({collapsed: true}))
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
