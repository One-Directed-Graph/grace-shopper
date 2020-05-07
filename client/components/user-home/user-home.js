import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, HashRouter, Route, Switch} from 'react-router-dom'
import {
  Reviews,
  Orders,
  UserList,
  ProductList,
  OrderList,
  WelcomeUser,
} from './'
import {getUserList} from '../../store/users'
import Nav from 'react-bootstrap/Nav'

//TODO: highlight selected tab
//TODO: add welcome comp

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
      console.log('non-admin')
      // this.props.loadUser()
    }
  }

  render() {
    console.log('in user-home', this.props)
    const rootDir = '/account'
    const {email, admin} = this.props
    const greetName = email.split('@')[0]
    const adminLinkTo = [
      {path: 'user-list', name: 'Users', component: UserList},
      {path: 'product-list', name: 'Products', component: ProductList},
      {path: 'order-list', name: 'Orders', component: OrderList},
    ]
    const userLinkTo = [
      {path: 'reviews', name: 'Reviews', component: Reviews},
      {path: 'orders', name: 'Orders', component: Orders},
    ]
    const linkToList = admin ? adminLinkTo : userLinkTo

    return (
      <div id="user-home">
        <h4>Account Info</h4>
        <hr />
        <Nav variant="tabs" id="user-home-nav" defaultActiveKey="/user-list">
          {linkToList.map((link) => {
            const {path, name} = link
            return (
              <Nav.Item key={path}>
                <Nav.Link href={`${rootDir}/${path}`}>{name}</Nav.Link>
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
const mapState = ({user}) => ({email: user.email, admin: user.admin})

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
