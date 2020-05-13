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
import {getUserList} from '../../store/users'
import Nav from 'react-bootstrap/Nav'

//TODO: Load orders and reviews?

/**
 * COMPONENT
 */
export class UserHome extends Component {
  constructor() {
    super()
    this.chooseLoad = this.chooseLoad.bind(this)
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

    // <Nav.Link as={Link} to="/">

    return (
      <div id="user-home">
        <h4>Account Info</h4>
        <h6>Logged in as {email}</h6>
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
const mapState = ({user}) => ({user})

const mapDispatch = (dispatch) => {
  return {
    loadUser: () => console.log('user reviews & orders'),
    loadAdmin: (id) => {
      dispatch(getUserList(id))
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
