import React, {Component} from 'react'
import {getOrder, getSessionCart} from '../store/order.js'
import {connect} from 'react-redux'
import {Form, Modal, Button, ListGroup} from 'react-bootstrap'
import {destroyItem, getItems, editItem} from '../store/orderItems'
import Checkout from './Checkout'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import {me} from '../store'

class OrderSummary extends Component {
  render() {
    const {order, total} = this.props
    console.log('Inside OrderSummary')
    return (
      <div>
        <h1> Order Summary </h1>
        <h2>
          {' '}
          Total Items ({order.orderitems ? order.orderitems.length : 0} )
        </h2>
        <ul>
          {order.orderitems
            ? order.orderitems.map((item, idx) => {
                return (
                  <ListGroup horizontal="sm" key={item.id} id="listgrp">
                    <ListGroup.Item>
                      <p>Description</p>
                      <p>{item.product.title}</p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <p>Quantity</p>
                      <p>{item.quantity}</p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <p>Price</p>
                      <p>{item.price}</p>
                    </ListGroup.Item>
                  </ListGroup>
                )
              })
            : []}
        </ul>
        Total Amount to Pay: ${total}
      </div>
    )
  }
}

const mapState = (state) => {
  let {order, user} = state
  return {
    order,
    user,
    isLoggedIn: !!state.user.id,
  }
}

const mapDispatch = () => {}

export default connect(mapState, mapDispatch)(OrderSummary)
