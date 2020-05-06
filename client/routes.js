import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, HashRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  AdminHome,
  Products,
  Product,
  DisplaySearch,
  Cart,
  DisplayByCategory,
} from './components'
import {me, getCategories} from './store'
import {getProducts, loadPage} from './store/products'

/**
 * COMPONENT
 */
class Routes extends Component {
  constructor() {
    super()
  }
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div>
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/displaysearch" component={DisplaySearch} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/cart" component={Cart} />
          <Route
            exact
            path="/category/:category"
            component={DisplayByCategory}
          />
          <Route exact path="/products/:id" component={Product} />
          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={UserHome} />
            </Switch>
          )}
        </Switch>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData: async () => {
      await dispatch(me())
      await dispatch(getProducts())
      await dispatch(getCategories())
      await dispatch(loadPage())
    },
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
