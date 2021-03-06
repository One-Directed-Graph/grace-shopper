import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ListGroup from 'react-bootstrap/ListGroup'
import {UserUpdate} from '../'

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
            {user.reviews && <p># of reviews: {user.reviews.length}</p>}
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

const mapState = ({users}) => ({users})

export default connect(mapState)(UserList)

/**
 * PROP TYPES
 */
UserList.propTypes = {
  users: PropTypes.array,
}
