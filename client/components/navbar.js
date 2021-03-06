import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {
  logout,
  getProducts,
  loadPage,
  combineItem,
  destroyItem,
  getProduct,
} from '../store'
import Search from './Search'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Image from 'react-bootstrap/Image'
import {CategoryBar} from './'
import order, {getSessionCart, getOrder} from '../store/order'
import axios from 'axios'
import queryString from 'query-string'

class Navbarclass extends Component {
  constructor(props) {
    super()

    this.combineCarts = this.combineCarts.bind(this)
  }
  async combineCarts() {
    const {order, isLoggedIn, isOrderIn, user} = this.props
    if (isLoggedIn === true && isOrderIn === true) {
      const res = await axios.get('/api/orders/session')

      if (res.data) {
        if (res.data.orderitems.length > 0) {
          const orderId = order.orderitems[0].orderId
          res.data.orderitems.map((orderitem) => {
            this.props.editItem(orderitem.id, orderId)
          })
        }
      }
      // this.props.load(user.id)
    }
  }
  // componentWillMount() {
  //   const script = document.createElement('script')
  //   script.src = '/js/scripts.js'
  //   script.async = true
  //   document.body.appendChild(script)
  // }
  componentDidMount() {
    // const script = document.createElement('script')
    // script.src = '/js/scripts.js'
    // script.async = true
    // document.body.appendChild(script)
    const {user} = this.props
    const {isLoggedIn} = this.props
    if (isLoggedIn === false) {
      this.props.getSession()
    } else {
      this.props.load(user.id)
    }
  }
  total() {
    const {order} = this.props

    let total = 0
    if (order.orderitems) {
      let arrayOfPrice = order.orderitems.map((order) => {
        total += order.price * 1 * order.quantity * 1

        return (total = total + total * 0.0825)
      })
    }
    return total.toFixed(2)
  }
  // componentDidUpdate(prevProp) {
  //   const {order, isOrderIn, isLoggedIn, user} = this.props
  //   if (isOrderIn === true && isLoggedIn === true) {
  //     if (prevProp.order.orderitems.length !== order.orderitems.length) {
  //       this.props.load(user.id)
  //     }
  //   }
  // }
  componentWillUpdate(prevProp, prevState) {
    const {handleClick, isLoggedIn, user, orderItems, order} = this.props

    if (order.orderitems && prevProp.order.orderitems) {
      if (prevProp.order.orderitems.length != order.orderitems.length) {
        if (isLoggedIn === false) {
          this.props.getSession()
        } else {
          this.props.load(user.id)
        }
      }
    }
  }
  render() {
    const navStyle = {color: ' #38495E', fontWeight: '500', fontSize: '120%'}
    const navStyle2 = {
      color: ' #38495E',
      fontWeight: '500',

      fontSize: '150%',
      margin: '0',
    }
    let total = this.total()
    //console.log('documenta cookie', document.cookie)
    const {handleClick, isLoggedIn, user, order} = this.props
    //this.combineCarts()

    let sortBY = queryString.parse(this.props.location.search).sortBy
    return (
      <div>
        <div className="preloader">
          <div className="lds-ellipsis">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <header className="header_wrap fixed-top header_with_topbar">
          <div className="top-header">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="d-flex align-items-center justify-content-center justify-content-md-start">
                    <ul className="contact_detail text-center text-lg-left">
                      <li>
                        <i className="ti-mobile"></i>
                        <span>123-456-7890</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="text-center text-md-right">
                    <ul className="header_list">
                      {isLoggedIn ? (
                        <div
                          style={{alignItems: 'inline'}}
                          className="header_list"
                        >
                          <li>
                            <Link to="/account">
                              {/* <i className="ti-user"></i> */}
                              <span>account</span>
                            </Link>
                          </li>
                          <li
                            onClick={() => {
                              handleClick()
                            }}
                          >
                            <Link to="/logout">
                              <i className="ti-user"></i>
                              <span>logout</span>
                            </Link>
                          </li>
                        </div>
                      ) : (
                        <div
                          style={{alignItems: 'inline'}}
                          className="header_list"
                        >
                          <li>
                            <Link to="/signup">
                              <span>Sign Up</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="/login">
                              <i className="ti-user"></i>
                              <span>Login</span>
                            </Link>
                          </li>
                        </div>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom_header dark_skin main_menu_uppercase">
            <div className="container">
              <nav className="navbar navbar-expand-lg">
                <Link className="navbar-brand" to="/">
                  <img
                    className="logo_light"
                    src="/images/imageSite/logo_light.png"
                    alt="logo"
                  />
                  <img
                    className="logo_dark"
                    src="/images/imageSite/maskerade_logo_white.png"
                    alt="logo"
                  />
                </Link>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-expanded="false"
                >
                  <span className="ion-android-menu"></span>
                </button>
                <div
                  className="collapse navbar-collapse justify-content-end"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav">
                    <li>
                      <Link
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-expanded="false"
                        className={
                          !sortBY
                            ? 'nav-link nav_item  active'
                            : 'nav-link nav_item '
                        }
                        to="/"
                      >
                        Home
                        {/* <span className="ion-android-menu"></span> */}
                      </Link>
                    </li>
                    <li>
                      <Link
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-expanded="false"
                        className={
                          sortBY == 'AtoZ'
                            ? 'nav-link nav_item active'
                            : 'nav-link nav_item'
                        }
                        to="/products/1?sortBy=AtoZ"
                      >
                        Products
                      </Link>
                    </li>
                    <li>
                      <Link
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-expanded="false"
                        className="nav-link nav_item"
                        to="/contactpage"
                      >
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>
                <ul className="navbar-nav attr-nav align-items-center">
                  <li>
                    <Search />
                  </li>
                  <li className="dropdown cart_dropdown">
                    <Link
                      className="nav-link cart_trigger"
                      to="#"
                      data-toggle="dropdown"
                    >
                      <i className="linearicons-cart"></i>
                      <span className="cart_count">
                        {order.orderitems ? order.orderitems.length : 0}
                      </span>
                    </Link>
                    <div className="cart_box dropdown-menu dropdown-menu-right">
                      <ul className="cart_list">
                        {order.orderitems
                          ? order.orderitems.map((item, idx) => {
                              console.log('item:', item)
                              // console.log('order from nabar', item)
                              return (
                                <li key={idx}>
                                  <Link to="#" className="item_remove">
                                    <i
                                      className="ion-close"
                                      onClick={() => {
                                        this.props.destroyItems(
                                          user.id,
                                          item.id
                                        )
                                      }}
                                    ></i>
                                  </Link>
                                  <Link
                                    to="#"
                                    onClick={(e) => {
                                      this.props.loadProduct(
                                        item.product.id,
                                        this.props.history.push
                                      )
                                    }}
                                  >
                                    <img
                                      src={item.product ? item.product.img : ''}
                                      alt="cart_thumb1"
                                    />
                                    {item.product ? item.product.title : ''}
                                  </Link>
                                  <span className="cart_quantity">
                                    {' '}
                                    {item.quantity}
                                    {'x '}
                                    <span className="cart_amount">
                                      {' '}
                                      <span className="price_symbole">$</span>
                                    </span>
                                    {item.price}
                                  </span>
                                </li>
                              )
                            })
                          : ''}
                      </ul>
                      <div className="cart_footer">
                        <p className="cart_total">
                          <strong>Subtotal:</strong>{' '}
                          <span className="cart_price">
                            {' '}
                            <span className="price_symbole">$</span>
                          </span>
                          {total}
                        </p>
                        <p className="cart_buttons">
                          <Link
                            to={`/orders/cart/${user.id || 'session'}`}
                            className="btn btn-fill-line rounded-0 view-cart"
                          >
                            View Cart
                          </Link>
                          <Link
                            to="/checkout"
                            className="btn btn-fill-out rounded-0 checkout"
                          >
                            Checkout
                          </Link>
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  const {products, orderItems} = state
  const {user, order} = state

  return {
    orderItems,
    products,
    user,
    order,
    isLoggedIn: !!state.user.id,
    isOrderIn: !!order.orderitems,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick: () => {
      dispatch(logout())
    },
    loadPages: (pg, push) => {
      //dispatch(loadPage(pg, push))
    },
    load: (userId) => {
      dispatch(getOrder(userId))
      //dispatch(getProducts('load'))
    },
    getSession: () => {
      dispatch(getSessionCart())
    },
    editItem: (orderitemId, orderId) => {
      dispatch(combineItem(orderitemId, orderId))
    },
    destroyItems: (userId, id) => {
      //dispatch(getOrder(userId))
      dispatch(destroyItem(id))
    },
    loadProduct: (id, push) => {
      dispatch(getProduct(id, push))
    },
  }
}

export default withRouter(connect(mapState, mapDispatch)(Navbarclass))

/**
 * PROP TYPES
 */
Navbarclass.propTypes = {
  // load: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
