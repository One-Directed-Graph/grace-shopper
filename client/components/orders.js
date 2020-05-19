import React, {Component} from 'react'
import {getOrder, getSessionCart} from '../store/order.js'
import {connect} from 'react-redux'
import {Form, Modal, Button, ListGroup} from 'react-bootstrap'
import {destroyItem, getItems, editItem} from '../store/orderItems'
import Checkout from './Checkout'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import {me} from '../store'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import OrderSummary from './OrderSummary'
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc')

class Orders extends Component {
  constructor(props) {
    super()
    this.state = {
      quantity: 1,
    }
    this.total = this.total.bind(this)
    // this.itemsForUser = this.itemsForUser.bind(this)
  }
  // setModalShow(input) {
  //   console.log(input)
  //   this.setState({modalShow: input})
  //   console.log(this.state.modalShow)
  // }
  // componentDidUpdate(prevProps) {
  //   if (prevProps.orderItems.length !== this.props.orderItems.length) {
  //     const {id} = this.props.user.id
  //     this.props.load(id)
  //   }
  // }
  /* const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'usd',
    // Verify your integration in this guide by including this parameter
    metadata: {integrationCheck: 'accept_a_payment'},
  })
  amount: 1099
canceled_at: null
cancellation_reason: null
capture_method: "automatic"
client_secret: "pi_1GkN7u2eZvKYlo2C7zuu6gdj_secret_3JXbQIMh5QiSbJxGoGluTuB5M"
confirmation_method: "automatic"
created: 1589862746
currency: "usd"
description: null
id: "pi_1GkN7u2eZvKYlo2C7zuu6gdj"
last_payment_error: null
livemode: false
next_action: null
object: "payment_intent"
payment_method: null
payment_method_types: ["card"]
receipt_email: null
setup_future_usage: null
shipping: null
source: null
status: "requires_payment_method" */

  total() {
    const {order} = this.props

    let total = 0
    if (order.orderitems) {
      let arrayOfPrice = order.orderitems.map((order) => {
        total += order.price * 1 * order.quantity * 1

        return (total = total + total * 0.0825)
      })
    }
    return total.toFixed(2)
  }
  async componentDidMount() {
    const {user, isLoggedIn} = this.props
    let order = this.props

    this.props.load2()

    if (isLoggedIn === false) {
      this.props.getSession()
    } else if (isLoggedIn === true) {
      await this.props.load(this.props.match.params.userId)
    }
  }
  render() {
    const {order, user, isLoggedIn} = this.props

    const {userId} = this.props.match.params

    const {quantity} = this.state
    const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx')
    //this.total()

    return (
      <div>
        <h2> Cart ({order.orderitems ? order.orderitems.length : 0} )</h2>
        <ul>
          {order.orderitems
            ? order.orderitems.map((item, idx) => {
                return (
                  <ListGroup
                    horizontal="sm"
                    className="my-2"
                    key={item.id}
                    id="listgrp"
                  >
                    <ListGroup.Item>
                      {
                        <img
                          src={item.product.img}
                          alt="..loading"
                          className="thumbnail"
                        />
                      }
                      <Button
                        onClick={() => {
                          this.props.destroyItems(userId, item.id)
                        }}
                      >
                        Remove Item
                      </Button>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <p>Quantity</p>
                      <p>{item.quantity}</p>
                      <Form
                        style={{width: '100%'}}
                        onSubmit={(e) => e.preventDefault()}
                        className="colpic"
                      >
                        <Button
                          onClick={(e) => {
                            if (quantity * 1 > 0) {
                              this.setState({quantity: item.quantity * 1 - 1})
                              this.props.change(
                                userId,
                                item.id,
                                item.quantity * 1 - 1
                              )
                              this.setState({quantity: 1})
                            }
                            if (quantity * 1 <= 0) {
                              return this.props.destroyItems(userId, item.id)
                            }
                          }}
                        >
                          -
                        </Button>
                        <Form.Control
                          style={{width: '50px'}}
                          type="number"
                          value={item.quantity}
                          placeholder="add qvantity"
                          onChange={(e) => {
                            this.setState({quantity: e.target.value})
                          }}
                        />
                        <Button
                          onClick={(e) => {
                            this.props.change(
                              userId,
                              item.id,
                              item.quantity * 1 + 1
                            )
                            this.setState({quantity: 1})
                          }}
                        >
                          +
                        </Button>
                      </Form>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <p>Price</p>
                      <p>{item.price}</p>
                      <p>Total Item Price</p>
                      <p>{(item.price * 1 * item.quantity * 1).toFixed(2)}</p>
                    </ListGroup.Item>
                  </ListGroup>
                )
              })
            : []}
        </ul>
        <h3>TOTAL: {this.total()}</h3>
        <button onClick={() => <OrderSummary />}> OrderSummary</button>
        <Elements stripe={stripePromise}>
          {' '}
          <Checkout />
        </Elements>{' '}
        */ }
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

//const mapState = (state) => state

const mapDispatch = (dispatch) => {
  return {
    load2: () => {
      dispatch(me())
    },
    load: (id) => {
      dispatch(getOrder(id))
      dispatch(getItems())
    },
    destroyItems: (userId, id) => {
      dispatch(getOrder(userId))

      dispatch(destroyItem(id))
    },
    change: (userId, id, qv) => {
      dispatch(getOrder(userId))
      dispatch(editItem(userId, id, qv))
    },
    getSession: () => {
      dispatch(getSessionCart())
    },
  }
}
export default withRouter(connect(mapState, mapDispatch)(Orders))
