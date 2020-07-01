import React, {Component} from 'react'
import {getOrder, getSessionCart} from '../store/order.js'
import {connect} from 'react-redux'
import {Form, Modal, Button, ListGroup} from 'react-bootstrap'
import {destroyItem, getItems, editItem} from '../store/orderItems'
import Checkout from './Checkout'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import {me, editProduct, editCart} from '../store'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import OrderSummary from './OrderSummary'

class Orders extends Component {
  constructor(props) {
    super()
    this.state = {
      quantity: 1,
    }
    this.total = this.total.bind(this)
    this.handleCheckout = this.handleCheckout.bind(this)
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
  handleCheckout() {
    const push = this.props.history.push
    const {order} = this.props
    const orderitems = order.orderitems
    let total = this.total()

    console.log('orderitem', order)
    orderitems.map((item) => {
      let totalQuan = item.product.quantity
      let minusQuan = item.quantity
      let newQuan = totalQuan - minusQuan
      let prodId = item.product.id
      this.props.editProduct(prodId, newQuan)
    })
    this.props.editCart(order.id, total, 'Processing', push)
  }
  render() {
    const {order, user, isLoggedIn} = this.props

    const {userId} = this.props.match.params

    const {quantity} = this.state
    //const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx')
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
        {/*   <button onClick={() => <OrderSummary />}> OrderSummary</button> */}
        <div className="buttonCheckout">
          {/* <h2 style={{marginLeft: '45px'}}>TOTAL: {this.total()}</h2> */}
          <Button style={{marginLeft: '20px'}} onClick={this.handleCheckout}>
            Checkout
          </Button>
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
    editProduct: (id, qv) => {
      dispatch(editProduct(id, qv))
    },
    editCart: (orderId, total, status, push) => {
      dispatch(editCart(orderId, total, status, push))
    },
  }
}
export default withRouter(connect(mapState, mapDispatch)(Orders))
