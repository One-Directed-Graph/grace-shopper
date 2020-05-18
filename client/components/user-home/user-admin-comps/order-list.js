import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Moment from 'react-moment'
import ListGroup from 'react-bootstrap/ListGroup'
import {OrderUpdate} from '../'

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
const mapState = ({orders}) => ({orders})

export default connect(mapState)(OrderList)

/**
 * PROP TYPES
 */
OrderList.propTypes = {
  orders: PropTypes.array,
}
