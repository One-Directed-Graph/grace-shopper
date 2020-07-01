import React, {Component} from 'react'
import {getOrder, getSessionCart} from '../store/order.js'
import {connect} from 'react-redux'
import {Form, Modal, Button, ListGroup} from 'react-bootstrap'
import {destroyItem, getItems, editItem} from '../store/orderItems'
import InjectedCheckoutForm from './Checkout'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import {me} from '../store'

class OrderSummary extends Component {
  render() {
    const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx')

    const {order} = this.props
    let subtotalWithoutTax = 0
    let subTotal = order.subTotal

    console.log('Inside OrderSummary subtotal', this.props.order)
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
                subtotalWithoutTax += item.price * item.quantity
                return (
                  <ListGroup horizontal="md" key={item.id}>
                    <ListGroup.Item>
                      <h6>Description</h6>
                      <p>{item.product.title}</p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <h6>Quantity</h6>
                      <p>{item.quantity}</p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <h6>Price</h6>
                      <p>{item.price}</p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <h6>Amount</h6>
                      <p>{(item.price * 1 * item.quantity * 1).toFixed(2)}</p>
                    </ListGroup.Item>
                  </ListGroup>
                )
              })
            : []}
        </ul>
        <ListGroup variant="flush">
          <ListGroup.Item>Subtotal: ${subtotalWithoutTax}</ListGroup.Item>
          <ListGroup.Item>
            Taxes: ${(subTotal - subtotalWithoutTax).toFixed(2)}
          </ListGroup.Item>
          <ListGroup.Item>Total Amount to Pay: ${subTotal}</ListGroup.Item>
        </ListGroup>

        <div>
          <Elements stripe={stripePromise}>
            {InjectedCheckoutForm(order, this.props.user)}
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

export default connect(mapState)(OrderSummary)
