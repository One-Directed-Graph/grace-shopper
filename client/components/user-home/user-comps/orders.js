import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, HashRouter, Route, Switch} from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'

const Orders = ({orders}) => {
  return (
    <div className="user-home-comps">
      <h3>My Orders</h3>
      <ListGroup variant="flush" id="order-list-orders">
        {orders.map((order) => (
          <ListGroup.Item key={order.id}>
            <h6>Order Id: {order.id}</h6>
            <p>Date of Purchase:{order.dateOfPurchase}</p>
            <p>Total: {order.subTotal}</p>
            <p>Status: {order.status}</p>
            {/* <OrderDetails order={order} /> */}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

const mapState = ({orders, products}) => {
  const processedOrders = orders.map((order) => {
    if (order.orderitems) {
      order.orderitems.map((item) => {
        item.productImg = products.find(
          (product) => product.id === item.productId
        ).img
      })
    }
    return order
  })

  console.log('in mapState', processedOrders)
  return {orders: processedOrders}
}

const mapDispatch = null

export default connect(mapState, mapDispatch)(Orders)

Orders.propTypes = {
  orders: PropTypes.array,
}
