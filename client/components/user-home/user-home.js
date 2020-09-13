import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, Route, Switch} from 'react-router-dom'
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
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: WelcomeUser,
        id: 'dashboard-tab',
        icon: 'ti-layout-grid2',
      },
      {
        path: 'user-list',
        name: 'Users',
        component: UserList,
        id: 'users-tab',
        icon: '',
      },
      {
        path: 'order-list',
        name: 'Orders',
        component: OrderList,
        id: 'orders-tab',
        icon: 'ti-shopping-cart-full',
      },
      {
        path: 'product-list',
        name: 'Products',
        component: ProductList,
        id: 'products-tab',
      },
      {
        path: 'product-create',
        name: 'Create Product',
        component: ProductCreate,
        id: 'product-create-tab',
      },
    ]
    const userLinkTo = [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: WelcomeUser,
        id: 'dashboard-tab',
        icon: 'ti-layout-grid2',
      },
      {
        path: 'orders',
        name: 'Orders',
        component: Orders,
        id: 'orders-tab',
        icon: 'ti-shopping-cart-full',
      },
      {
        path: 'reviews',
        name: 'Reviews',
        component: Reviews,
        icon: 'far fa-star',
      },
      {
        path: 'address',
        name: 'My Address',
        component: WelcomeUser,
        id: 'address-tab',
        icon: 'ti-location-pin',
      },
      {
        path: 'account-detail',
        name: 'Account Detail',
        component: WelcomeUser,
        id: 'account-detail-tab',
        icon: 'ti-id-badge',
      },
    ]
    const linkToList = admin ? adminLinkTo : userLinkTo
    //this.combineCarts()
    return (
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4">
              <div className="dashboard_menu">
                <ul className="nav nav-tabs flex-column" role="tablist">
                  {linkToList.map((link) => {
                    const {path, name, id, icon} = link
                    return (
                      <li className="nav-item" key={path}>
                        <Nav.Link
                          as={Link}
                          to={`${rootDir}/${path}`}
                          className="nav-link"
                          id={id}
                          data-toggle="tab"
                          role="tab"
                          aria-controls={path}
                          aria-selected="false"
                        >
                          <i className={icon} aria-hidden="true"></i>
                          {name}
                        </Nav.Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
            <div className="col-lg-9 col-md-8">
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
          </div>
        </div>
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
