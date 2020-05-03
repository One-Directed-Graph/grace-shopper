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

/**
 * THUNK CREATORS
 */
export const getUserList = (id) => async (dispatch) => {
  const users = (await axios.get('/api/users/user-list', {id})).data
  dispatch(gotUserList(users))
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
