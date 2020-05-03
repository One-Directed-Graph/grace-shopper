import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, HashRouter, Route, Switch} from 'react-router-dom'
import {Reviews, Orders, UserList, ProductList} from './'

//ASSIGNED TO: Katt

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  //   console.log('in userHome', props)
  const {email, admin, id} = props
  const greetName = email.split('@')[0]

  return (
    <div id="user-home-container">
      <h2>My Account</h2>
      <h3>Welcome back, {greetName}!</h3>
      <hr />
      <div id="user-home-acct">
        <nav id="user-home-acct-nav">
          {admin ? (
            <div id="user-home-admin-links">
              <Link to="/home/orders">Orders</Link>
              <Link to="/home/user-list">User List</Link>
              <Link to="/home/product-list">Product List</Link>
            </div>
          ) : (
            <div id="user-home-nonadmin-links">
              <Link to="/home/orders">Orders</Link>
              <Link to="/home/reviews">Reviews</Link>
            </div>
          )}
        </nav>
        <Switch>
          <Route path="/home/orders" component={Orders} />
          <Route path="/home/reviews" component={Reviews} />
          <Route path="/home/user-list" component={UserList} />
          <Route path="/home/product-list" component={ProductList} />
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
    admin: state.user.admin,
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
}
