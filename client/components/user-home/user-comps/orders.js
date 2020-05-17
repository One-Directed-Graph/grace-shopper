import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, HashRouter, Route, Switch} from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import OrderDetails from './order-details'

const Orders = (props) => {
  const orders = props.orders || []
  return (
    <div className="user-home-comps">
      <h3>My Orders</h3>
      <ListGroup variant="flush" id="order-list-orders">
        {orders.map((order) => (
          <ListGroup.Item key={order.id}>
            <h6>Order Id: {order.id}</h6>
            <p>Date of Purchase: {order.dateOfPurchase}</p>
            <p>Total: {order.subTotal}</p>
            <p>Status: {order.status}</p>
            <OrderDetails order={order} />
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
        const product = products.find(
          (_product) => _product.id === item.productId
        )
        item.productTitle = product.title
        item.productImg = product.img
      })
    }
    return order
  })
  return {orders: processedOrders}
}

export default connect(mapState)(Orders)

Orders.propTypes = {
  orders: PropTypes.array.isRequired,
}
