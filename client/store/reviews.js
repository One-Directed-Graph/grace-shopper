import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_USER_REVIEWS = 'GET_USER_REVIEWS'

/**
 * INITIAL STATE
 */

const defaultReviews = [
  {
    id: '',
    description: '',
    productId: '',
    userId: '',
  },
]

/**
 * ACTION CREATORS
 */

const _getUserReviews = (reviews) => ({type: GET_USER_REVIEWS, reviews})

/**
 * THUNK CREATORS
 */

export const getUserReviews = (userId) => async (dispatch) => {
  console.log('in getUserReviews thunk')
  const reviews = (await axios.get(`/api/reviews/${userId}`)).data
  dispatch(_getUserReviews(reviews))
}

/**
 * REDUCER
 */
export default function (state = defaultReviews, action) {
  switch (action.type) {
    case GET_USER_REVIEWS:
      return action.reviews
    default:
      return state
  }
}
