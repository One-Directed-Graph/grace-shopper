import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, HashRouter, Route, Switch} from 'react-router-dom'

//ASSIGNED TO: Katt

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email} = props
  const greetName = email.split('@')[0]

  return (
    <div id="user-home-container">
      <h2>My Account</h2>
      <h3>Welcome back, {greetName}!</h3>
      <hr />
      <div id="user-home-acct">
        <nav id="user-home-acct-nav">
          <Link to="home/orders">Orders</Link>
          <Link to="home/reviews">Reviews</Link>
          <Link to="home/addresses">Addresses</Link>
          <Link to="home/payment-info">Payment Info</Link>
        </nav>
        <Switch>
          <Route path="home/orders" />
          <Route path="home/reviews" />
        </Switch>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email,
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
}
