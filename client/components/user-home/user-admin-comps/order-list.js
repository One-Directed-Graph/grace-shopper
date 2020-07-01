import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Moment from 'react-moment'
import ListGroup from 'react-bootstrap/ListGroup'
import {OrderUpdate} from '../'
// import user from '../../../store/user'

/**
 * COMPONENT
 */

const OrderList = ({orders}) => {
  return (
    <div className="user-home-comps">
      <h3>Orders</h3>
      <ListGroup variant="flush" id="order-list-orders">
        {orders.map((order) => (
          <ListGroup.Item key={order.id}>
            <h6>Order Id: {order.id}</h6>
            <p>User Email: {order.userEmail}</p>
            <p>
              Date of Purchase:{' '}
              <Moment format="MMMM D, YYYY h:mma">
                {order.dateOfPurchase}
              </Moment>
            </p>
            <p>Total: ${order.subTotal}</p>
            <OrderUpdate orderToUpdate={order} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = ({orders, users}) => {
  const processedOrders = orders.map((order) => {
    const user = users.find((_user) => _user.id === order.userId)
    if (user) order.userEmail = user.email
    return order
  })
  return {orders: processedOrders}
}

export default connect(mapState)(OrderList)

/**
 * PROP TYPES
 */
OrderList.propTypes = {
  orders: PropTypes.array,
}
