import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, HashRouter, Route, Switch} from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import {UserUpdate} from '../index'

/**
 * COMPONENT
 */

class UserList extends Component {
  render() {
    const users = this.props.users ? this.props.users : []
    return (
      <div className="user-home-comps">
        <h3>Users</h3>
        <ListGroup variant="flush" id="user-list-users">
          {users.map((user) => (
            <ListGroup.Item key={user.id}>
              <h6>{user.email}</h6>
              <UserUpdate userToUpdate={user} />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = ({users}) => ({users})

export default connect(mapState)(UserList)

/**
 * PROP TYPES
 */
UserList.propTypes = {
  users: PropTypes.array,
}
