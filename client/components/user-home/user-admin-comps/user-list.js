import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ListGroup from 'react-bootstrap/ListGroup'
import {UserUpdate} from '../index'

//TODO: Error handling
//TODO: Disable delete if user has reviews

/**
 * COMPONENT
 */

const UserList = (props) => {
  const users = props.users ? props.users : []
  return (
    <div className="user-home-comps">
      <h3>Users</h3>
      <ListGroup variant="flush" id="user-list-users">
        {users.map((user) => (
          <ListGroup.Item key={user.id}>
            <h6>{user.email}</h6>
            {user.orders && <p># of orders: {user.orders.length}</p>}
            <UserUpdate userToUpdate={user} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = ({users, orders}) => {
  const processedUsers = users.map((user) => {
    user.orders = orders.filter((order) => order.userId === user.id)
    return user
  })
  return {users: processedUsers}
}

export default connect(mapState)(UserList)

/**
 * PROP TYPES
 */
UserList.propTypes = {
  users: PropTypes.array,
}
