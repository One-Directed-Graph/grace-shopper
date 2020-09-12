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
    this.combineCarts = this.combineCarts.bind(this)
  }
  async combineCarts() {
    const {order, isLoggedIn, isOrderIn, user} = this.props
    if (isLoggedIn === true && isOrderIn === true) {
      const res = await axios.get('/api/orders/session')
      console.log('res', res)
      if (res.data) {
        console.log('combine carts from nav bar', res.data)
        if (res.data.orderitems.length > 0) {
          const orderId = order.orderitems[0].orderId
          res.data.orderitems.map((orderitem) => {
            console.log('combine carts from nav bar')
            this.props.editItem(orderitem.id, orderId)
          })
        }
      }
      // this.props.load(user.id)
    }
  }
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
      {path: 'reviews', name: 'Reviews', component: Reviews},
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
                          <i className={icon}></i>
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

// return (
//   <div className="section">
//     <div className="container">
//       <div className="row">
//         <div className="col-lg-3 col-md-4">
//           <div className="dashboard_menu">
//             <ul className="nav nav-tabs flex-column" role="tablist">
//               <li className="nav-item">
//                 <a className="nav-link active" id="dashboard-tab" data-toggle="tab" href="#dashboard" role="tab" aria-controls="dashboard" aria-selected="false"><i className="ti-layout-grid2"></i>Dashboard</a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" id="orders-tab" data-toggle="tab" href="#orders" role="tab" aria-controls="orders" aria-selected="false"><i className="ti-shopping-cart-full"></i>Orders</a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" id="address-tab" data-toggle="tab" href="#address" role="tab" aria-controls="address" aria-selected="true"><i className="ti-location-pin"></i>My Address</a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" id="account-detail-tab" data-toggle="tab" href="#account-detail" role="tab" aria-controls="account-detail" aria-selected="true"><i className="ti-id-badge"></i>Account details</a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="login.html"><i className="ti-lock"></i>Logout</a>
//               </li>
//             </ul>
//           </div>
//         </div>
//         <div className="col-lg-9 col-md-8">
//           <div className="tab-content dashboard_content">
//             <div className="tab-pane fade active show" id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
//               <div className="card">
//                 <div className="card-header">
//                   <h3>Dashboard</h3>
//                 </div>
//                 <div className="card-body">
//                   <p>From your account dashboard. you can easily check &amp; view your <a href="javascript:void(0);" onclick="$('#orders-tab').trigger('click')">recent orders</a>, manage your <a href="javascript:void(0);" onclick="$('#address-tab').trigger('click')">shipping and billing addresses</a> and <a href="javascript:void(0);" onclick="$('#account-detail-tab').trigger('click')">edit your password and account details.</a></p>
//                 </div>
//               </div>
//             </div>
//             <div className="tab-pane fade" id="orders" role="tabpanel" aria-labelledby="orders-tab">
//               <div className="card">
//                 <div className="card-header">
//                   <h3>Orders</h3>
//                 </div>
//                 <div className="card-body">
//                   <div className="table-responsive">
//                     <table className="table">
//                       <thead>
//                         <tr>
//                           <th>Order</th>
//                           <th>Date</th>
//                           <th>Status</th>
//                           <th>Total</th>
//                           <th>Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         <tr>
//                           <td>#1234</td>
//                           <td>March 15, 2020</td>
//                           <td>Processing</td>
//                           <td>$78.00 for 1 item</td>
//                           <td><a href="#" className="btn btn-fill-out btn-sm">View</a></td>
//                         </tr>
//                         <tr>
//                           <td>#2366</td>
//                           <td>June 20, 2020</td>
//                           <td>Completed</td>
//                           <td>$81.00 for 1 item</td>
//                           <td><a href="#" className="btn btn-fill-out btn-sm">View</a></td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="tab-pane fade" id="address" role="tabpanel" aria-labelledby="address-tab">
//               <div className="row">
//                 <div className="col-lg-6">
//                   <div className="card mb-3 mb-lg-0">
//                     <div className="card-header">
//                       <h3>Billing Address</h3>
//                     </div>
//                     <div className="card-body">
//                       <address>House #15<br />Road #1<br />Block #C <br />Angali <br /> Vedora <br />1212</address>
//                       <p>New York</p>
//                       <a href="#" className="btn btn-fill-out">Edit</a>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-lg-6">
//                   <div className="card">
//                     <div className="card-header">
//                       <h3>Shipping Address</h3>
//                     </div>
//                     <div className="card-body">
//                       <address>House #15<br />Road #1<br />Block #C <br />Angali <br /> Vedora <br />1212</address>
//                       <p>New York</p>
//                       <a href="#" className="btn btn-fill-out">Edit</a>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="tab-pane fade" id="account-detail" role="tabpanel" aria-labelledby="account-detail-tab">
//               <div className="card">
//                 <div className="card-header">
//                   <h3>Account Details</h3>
//                 </div>
//                 <div className="card-body">
//                   <p>Already have an account? <a href="#">Log in instead!</a></p>
//                   <form method="post" name="enq">
//                     <div className="row">
//                       <div className="form-group col-md-6">
//                         <label>First Name <span className="required">*</span></label>
//                         <input required="" className="form-control" name="name" type="text" />
//                       </div>
//                       <div className="form-group col-md-6">
//                         <label>Last Name <span className="required">*</span></label>
//                         <input required="" className="form-control" name="phone" />
//                       </div>
//                       <div className="form-group col-md-12">
//                         <label>Display Name <span className="required">*</span></label>
//                         <input required="" className="form-control" name="dname" type="text" />
//                       </div>
//                       <div className="form-group col-md-12">
//                         <label>Email Address <span className="required">*</span></label>
//                         <input required="" className="form-control" name="email" type="email" />
//                       </div>
//                       <div className="form-group col-md-12">
//                         <label>Current Password <span className="required">*</span></label>
//                         <input required="" className="form-control" name="password" type="password" />
//                       </div>
//                       <div className="form-group col-md-12">
//                         <label>New Password <span className="required">*</span></label>
//                         <input required="" className="form-control" name="npassword" type="password" />
//                       </div>
//                       <div className="form-group col-md-12">
//                         <label>Confirm Password <span className="required">*</span></label>
//                         <input required="" className="form-control" name="cpassword" type="password" />
//                       </div>
//                       <div className="col-md-12">
//                         <button type="submit" className="btn btn-fill-out" name="submit" value="Submit">Save</button>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// )
