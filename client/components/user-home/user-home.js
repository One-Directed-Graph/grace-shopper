import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, HashRouter, Route, Switch} from 'react-router-dom'
import {Reviews, Orders, UserList, ProductList} from './'
import {getUserList} from '../../store/users'
import {render} from 'enzyme'
import {getProducts} from '../../store'

//ASSIGNED TO: Katt

/**
 * COMPONENT
 */
export class UserHome extends Component {
  constructor() {
    super()
    this.chooseLoad = this.chooseLoad.bind(this)
  }
  componentDidMount() {
    this.chooseLoad(this.props.admin)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.email !== this.props.email) {
      this.chooseLoad(this.props.admin)
    }
  }

  async chooseLoad(admin) {
    if (admin) {
      await this.props.loadAdmin()
    } else if (!admin) {
      this.props.loadUser()
    }
  }

  render() {
    const {email, admin} = this.props
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
}

/**
 * CONTAINER
 */
const mapState = ({user}) => {
  return {
    email: user.email,
    admin: user.admin,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadUser: () => console.log('user reviews & orders'),
    loadAdmin: () => {
      dispatch(getUserList())
    },
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
}
