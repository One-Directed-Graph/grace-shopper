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
    const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx')

    const {order, total} = this.props
    let subtotal = 0

    console.log('Inside OrderSummary', total)
    return (
      <div>
        <h1> Order Summary </h1>
        <h2>
          {' '}
          Total Items ({order.orderitems ? order.orderitems.length : 0} )
        </h2>
        <ul>
          {order.orderitems
            ? order.orderitems.map((item) => {
                subtotal += item.price * item.quantity
                return (
                  <ListGroup horizontal="sm" key={item.id}>
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
                    <ListGroup.Item>
                      <p>Amount</p>
                      <p>{(item.price * 1 * item.quantity * 1).toFixed(2)}</p>
                    </ListGroup.Item>
                  </ListGroup>
                )
              })
            : []}
        </ul>
        <p>Subtotal: ${subtotal}</p>
        <p>Taxes: ${(total - subtotal).toFixed(2)}</p>
        <p>Total Amount to Pay: ${total}</p>

        <div>
          <Elements stripe={stripePromise}>
            <Checkout />
          </Elements>
        </div>
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
