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
  DisplayByCategory,
} from './components'
import Orders from './components/orders'
import {Home} from './components/home'
// import uuid from 'react-uuid'
// import Axios from 'axios'
import {me, getCategories, getProducts, getOrder, loadPage} from './store'
import {getItems} from './store/orderItems'
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
  async componentDidMount() {
    const {user} = this.props
    console.log(
      'ididididididididididi',
      this.props.location.pathname.slice(13),
      user
    )
    this.props.loadInitialData()
  }
  render() {
    const {isLoggedIn, user} = this.props
    console.log('user in render hshshsh', isLoggedIn)
    this.props.load(user.Id)
    // console.log('User: ')
    // console.log('routes---user logged in ', isLoggedIn, this.props)
    //sessionId().then((res) => {
    //  console.log('ididididididididid', res)
    //})

    return (
      <div>
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/displaysearch" component={DisplaySearch} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/orders/cart/:userId" component={Orders} />

          <Route path="/products/:page?" component={Products} />
          <Route exact path="/product/:id" component={Product} />
          <Route
            exact
            path="/category/:category/:page"
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
  console.log('statestatestate', state)
  const {user} = state
  console.log('User: ', user)
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    user,
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
      // dispatch(getProducts('load'))
      // dispatch(getCategories())
      // dispatch(getOrder(id))
      // dispatch(getItems())
    },
    load: (id) => {
      dispatch(getProducts('load'))
      dispatch(getCategories())
      console.log('dispatch left the building', id)
      //dispatch(getOrder(id))
      //dispatch(getItems())
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
