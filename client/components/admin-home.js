import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

//ASSIGNED TO:

/**
 * COMPONENT
 */
export const AdminHome = props => {
  const {email} = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(AdminHome)

/**
 * PROP TYPES
 */
AdminHome.propTypes = {
  email: PropTypes.string
}
