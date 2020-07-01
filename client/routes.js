import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
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
  OrderSummary,
} from './components'
import Orders from './components/orders'
import {Home} from './components/home/home'
// import uuid from 'react-uuid'
// import Axios from 'axios'
import {
  me,
  getCategories,
  getProducts,
  getOrder,
  loadPage,
  getSessionCart,
} from './store'
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
    this.getOrder = this.getOrder.bind(this)
    //this.combineCarts = this.combineCarts.bind(this)
  }

  getOrder(userId) {
    const {isLoggedIn, user} = this.props

    if (isLoggedIn) {
      this.props.loadOrder(userId)
    }
    if (isLoggedIn === false) {
      this.props.loadSessionCart()
    }
  }
  async componentDidMount() {
    const {user} = this.props

    this.props.loadInitialData()
    //this.props.load(user.Id)
  }
  render() {
    const {isLoggedIn, user} = this.props

    this.getOrder(user.id)
    //this.combineCarts()
    //this.props.load(user.Id)
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
          <Route exact path="/checkout" component={OrderSummary} />
          {/* //<Route exact path="/orders/cart/session " component={Orders} /> */}

          <Route path="/products/:page?" component={Products} />
          <Route exact path="/product/:id" component={Product} />
          <Route
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
  //console.log('statestatestate', state)
  const {user, order} = state
  //console.log('User: ', user)
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isOrderIn: !!state.order.orderitems,
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
      dispatch(getProducts('load'))
      dispatch(getCategories())
      //dispatch(getOrder(id))
      //dispatch(getItems())
    },
    loadOrder: (id) => {
      dispatch(getOrder(id))
    },
    loadSessionCart: () => {
      dispatch(getSessionCart())
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
