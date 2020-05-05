import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_USER_LIST = 'GOT_USER_LIST'
const ADDED_USER = 'ADDED_USER'
const REMOVED_USER = 'REMOVED_USER'
const UPDATED_USER = 'UPDATE_USER'

/**
 * INITIAL STATE
 */
const defaultUsers = []

/**
 * ACTION CREATORS
 */
const gotUserList = (users) => ({type: GOT_USER_LIST, users})
const addedUser = (user) => ({type: ADDED_USER, user})
const removedUser = (id) => ({type: REMOVED_USER, id})
const updatedUser = (user) => ({type: UPDATED_USER, user})

/**
 * THUNK CREATORS
 */
export const getUserList = () => async (dispatch) => {
  const users = (await axios.get('/api/users/user-list')).data
  dispatch(gotUserList(users))
}

export const addUser = (user) => async (dispatch) => {
  const _addedUser = (await axios.put(`/api/users/user-list`, user)).data
  dispatch(addedUser(_addedUser))
}

export const updateUser = (user) => async (dispatch) => {
  const _updatedUser = (await axios.put(`/api/users/user-list`, user)).data
  dispatch(updatedUser(_updatedUser))
}

export const removeUser = (id) => {
  return async (dispatch) => {
    await axios.delete(`/api/users/user-list/${id}`)
    dispatch(removedUser(id))
  }
}

/**
 * REDUCER
 */
export default function (state = defaultUsers, action) {
  switch (action.type) {
    case GOT_USER_LIST:
      return action.users
    default:
      return state
  }
}
