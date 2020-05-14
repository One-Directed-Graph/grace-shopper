import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ListGroup from 'react-bootstrap/ListGroup'
import {OrderUpdate} from '../'

/**
 * COMPONENT
 */

const OrderList = (props) => {
  console.log('in order list - props', props)
  const orders = props.orders ? props.orders : []
  return (
    <div className="user-home-comps">
      <h3>Orders</h3>
      <ListGroup variant="flush" id="order-list-orders">
        {orders.map((order) => (
          <ListGroup.Item key={order.id}>
            <h6>Order Id: {order.id}</h6>
            <p>Date of Purchase: {order.dateOfPurchase}</p>
            <p>Total: {order.subTotal}</p>
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
