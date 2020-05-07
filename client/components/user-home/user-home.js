import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, HashRouter, Route, Switch} from 'react-router-dom'
import {Reviews, Orders, UserList, ProductList, OrderList} from './'
import {getUserList} from '../../store/users'
import {render} from 'enzyme'
import {getProducts} from '../../store'

//ASSIGNED TO: Katt

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
    // const combinedLinkToList = [...adminLinkTo, ...userLinkTo]
    const linkToList = admin ? adminLinkTo : userLinkTo

    return (
      <div id="user-home-container">
        <h2>My Account</h2>
        <h3>Welcome back, {greetName}!</h3>
        <hr />
        <div id="user-home-acct">
          <nav id="user-home-acct-nav">
            {
              <div id="user-home-links">
                {linkToList.map((link) => {
                  const {path, name} = link
                  return (
                    <Link key={path} to={`${rootDir}/${path}`}>
                      {name}
                    </Link>
                  )
                })}
              </div>
            }
          </nav>
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
          </Switch>
        </div>
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
