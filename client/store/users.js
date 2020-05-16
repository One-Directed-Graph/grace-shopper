import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER_LIST = 'GET_USER_LIST'
const ADD_USER = 'ADD_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'

/**
 * INITIAL STATE
 */
const defaultUsers = [
  {id: '', email: '', admin: false, pwReset: false, orders: [], reviews: []},
]

/**
 * ACTION CREATORS
 */
const _getUserList = (users) => ({type: GET_USER_LIST, users})
const _addUser = (user) => ({type: ADD_USER, user})
const _removeUser = (id) => ({type: REMOVE_USER, id})
const _updateUser = (user) => ({type: UPDATE_USER, user})

/**
 * THUNK CREATORS
 */
export const getUserList = (id) => async (dispatch) => {
  const users = (await axios.get(`/api/users/user-list/${id}`)).data
  dispatch(_getUserList(users))
}

export const addUser = (user) => async (dispatch) => {
  const _addedUser = (await axios.put(`/api/users/user-list`, user)).data
  dispatch(_addUser(_addedUser))
}

export const updateUser = (user) => async (dispatch) => {
  const _updatedUser = (await axios.put(`/api/users/user-list`, user)).data
  dispatch(_updateUser(_updatedUser))
}

export const removeUser = (id) => {
  return async (dispatch) => {
    await axios.delete(`/api/users/user-list/${id}`)
    dispatch(_removeUser(id))
  }
}

/**
 * REDUCER
 */
export default function (state = defaultUsers, action) {
  switch (action.type) {
    case GET_USER_LIST:
      return action.users
    case ADD_USER:
      return [...state, action.user]
    case UPDATE_USER:
      return [...state].map((user) =>
        user.id === action.user.id ? action.user : user
      )
    case REMOVE_USER:
      return [...state].filter((user) => user.id !== action.id)
    default:
      return state
  }
}
