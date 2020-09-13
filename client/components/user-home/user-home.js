import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, HashRouter, Route, Switch} from 'react-router-dom'
import {
  Reviews,
  Orders,
  UserList,
  ProductList,
  ProductCreate,
  OrderList,
  WelcomeUser,
} from './'
import {
  getUserList,
  getOrderList,
  getUserOrders,
  getUserReviews,
} from '../../store/'
import Nav from 'react-bootstrap/Nav'

//TODO: Load orders and reviews

/**
 * COMPONENT
 */
export class UserHome extends Component {
  constructor() {
    super()
    this.chooseLoad = this.chooseLoad.bind(this)
    //this.combineCarts = this.combineCarts.bind(this)
  }
  // async combineCarts() {
  //   const {order, isLoggedIn, isOrderIn, user} = this.props
  //   if (isLoggedIn === true && isOrderIn === true) {
  //     const res = await axios.get('/api/orders/session')
  //     console.log('res', res)
  //     if (res.data) {
  //       console.log('combine carts from nav bar', res.data)
  //       if (res.data.orderitems.length > 0) {
  //         const orderId = order.orderitems[0].orderId
  //         res.data.orderitems.map((orderitem) => {
  //           console.log('combine carts from nav bar')
  //           this.props.editItem(orderitem.id, orderId)
  //         })
  //       }
  //     }
  //     // this.props.load(user.id)
  //   }
  // }
  componentDidMount() {
    const {admin, id} = this.props.user
    this.chooseLoad(admin, id)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.id !== this.props.user.id) {
      const {admin, id} = this.props.user
      this.chooseLoad(admin, id)
    }
  }

  async chooseLoad(admin, id) {
    if (admin) {
      await this.props.loadAdmin(id)
    } else if (!admin) {
      console.log('non-admin')
      this.props.loadUser(id)
    }
  }

  render() {
    const rootDir = '/account'
    const {email, admin} = this.props.user
    const adminLinkTo = [
      {path: 'user-list', name: 'Users', component: UserList},
      {path: 'order-list', name: 'Orders', component: OrderList},
      {path: 'product-list', name: 'Products', component: ProductList},
      {
        path: 'product-create',
        name: 'Create Product',
        component: ProductCreate,
      },
    ]
    const userLinkTo = [
      {path: 'reviews', name: 'Reviews', component: Reviews},
      {path: 'orders', name: 'Orders', component: Orders},
    ]
    const linkToList = admin ? adminLinkTo : userLinkTo
    //this.combineCarts()
    return (
      <div id="user-home">
        <h4>Account Info</h4>
        <h6 id="user-home-email">Logged in as {email}</h6>
        <hr />
        <Nav variant="tabs" id="user-home-nav" defaultActiveKey="/user-list">
          {linkToList.map((link) => {
            const {path, name} = link
            return (
              <Nav.Item key={path}>
                <Nav.Link as={Link} to={`${rootDir}/${path}`}>
                  {name}
                </Nav.Link>
              </Nav.Item>
            )
          })}
        </Nav>
        <Switch>
          {linkToList.map((link) => {
            const {path, component} = link
            return (
              <Route
                key={path}
                path={`${rootDir}/${path}`}
                component={component}
              />
            )
          })}
          <Route exact path={`${rootDir}`} component={WelcomeUser} />
        </Switch>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
//const mapState = ({user}) => ({user})
const mapState = (state) => {
  const {products} = state
  const {user, order} = state

  return {
    products,
    user,
    order,
    isLoggedIn: !!state.user.id,
    isOrderIn: !!order.orderitems,
  }
}
const mapDispatch = (dispatch) => {
  return {
    loadUser: (id) => {
      console.log('in loadUser', id)
      dispatch(getUserOrders(id))
      dispatch(getUserReviews(id))
    },
    loadAdmin: (id) => {
      dispatch(getUserList(id))
      dispatch(getOrderList())
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
