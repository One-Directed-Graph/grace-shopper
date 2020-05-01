import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'GET_CATEGORIES'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const _getCategories = (categories) => ({type: GET_CATEGORIES, categories})

/**
 * THUNK CREATORS
 */
export const getCategories = () => {
  console.log('from thunk for getProducts')
  return async (dispatch) => {
    const categories = await axios.get('/api/categories')
    dispatch(_getCategories(categories.data))
  }
}

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories

    default:
      return state
  }
}
