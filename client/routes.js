import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, HashRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  Products,
  Product,
  DisplaySearch,
  Cart,
  DisplayByCategory,
} from './components'

// import uuid from 'react-uuid'
// import Axios from 'axios'
import {me, getCategories, getProducts, getCart} from './store'

/**
 * COMPONENT
 */

// async function getId() {
//   let id = sessionId().then((res) => {
//     console.log(res)
//   })

//   console.log('sasasasasasasasa', id)
//   return
// }

class Routes extends Component {
  constructor() {
    super()
  }
  componentDidMount() {
    this.props.loadInitialData()
  }
  render() {
    const {isLoggedIn} = this.props

    // sessionId().then((res) => {
    //   console.log('ididididididididid', res)
    // })

    return (
      <div>
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route exact path="/" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/displaysearch" component={DisplaySearch} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/cart" component={Cart} />
          <Route path="/products/:page?" component={Products} />
          <Route exact path="/product/:id" component={Product} />
          <Route
            exact
            path="/category/:category"
            component={DisplayByCategory}
          />
          {/*<Route exact path="/products/:id" component={Product} />*/}
          <Route path="/products" component={Products} />

          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/account" component={UserHome} />
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

// const sessionId = (window.onload = async () => {
//   let id = await Axios.get('/api/sessionId')
//   //console.log(id)
//   return id
// })

const mapDispatch = (dispatch) => {
  return {
    loadInitialData: () => {
      dispatch(me())
      dispatch(getProducts('load'))
      dispatch(getCategories())
      dispatch(getCart())
      //dispatch(loadPage(1))
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
