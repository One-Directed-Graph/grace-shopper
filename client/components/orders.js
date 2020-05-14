import React, {Component} from 'react'
import {getOrders} from '../store'
import {connect} from 'react-redux'
import {Form, Modal, Button, ListGroup} from 'react-bootstrap'
import {MyVerticallyCenteredModal} from './modelPopup'
import {destroyItem, getItems, editItem} from '../store/orderItems'
class Orders extends Component {
  constructor(props) {
    console.log('propspropsprops', props)
    super()
    this.state = {
      quantity: 1,
    }
    // this.setModalShow = this.setModalShow.bind(this)
  }
  // setModalShow(input) {
  //   console.log(input)
  //   this.setState({modalShow: input})
  //   console.log(this.state.modalShow)
  // }
  componentDidUpdate(prevProps) {
    if (prevProps.orderItems.length !== this.props.orderItems.length) {
      this.props.load()
    }
    console.log(prevProps.orderItems.length, this.props.orderItems.length)
  }
  componentDidMount() {
    this.props.load()
  }
  render() {
    const {orders, user} = this.props
    const {quantity} = this.state
    let arrayOfItems = []
    //const {orderitems} = this.props.orders
    if (orders && user) {
      console.log('gfgfgfgfgfgfgfgfgf', orders.id, orders)
      let userOrders = user.id
        ? orders.filter((ord) => ord.userId === user.id)
        : ''

      //userOrders ? userOrders.map((item) => item.orderitems) : ''
      console.log('ordersitems 1111', orders[0])
      console.log('userorders 222222', userOrders.length, userOrders[0])
      arrayOfItems = userOrders[0]
      //   if (arrayOfItems) {
      //     console.log(
      //       'aaaaaaaaaaaaaaaaaaaa',
      //       arrayOfItems.orderitems.length,
      //       typeof a
      //     )
      //   }
    }
    //const {modalShow} = this.props
    //const {setModalShow} = this
    // return (
    //   <div>
    //     <Button variant="primary" onClick={() => setModalShow(true)}>
    //       Launch vertically centered modal
    //     </Button>

    //     <MyVerticallyCenteredModal
    //       show={modalShow}
    //       onHide={() => setModalShow(false)}
    //     />
    //   </div>
    // )
    return (
      <div>
        {arrayOfItems ? <h1> Cart ({arrayOfItems.orderitems.length} )</h1> : ''}
        <ul>
          {arrayOfItems
            ? arrayOfItems.orderitems.map((item, idx) => {
                //console.log('lalalala', item[idx])

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
                              this.setState({quantity: quantity - 1})
                            }
                            if (quantity * 1 <= 0) {
                              console.log('quantityt', quantity, item.id)
                              return this.props.destroyItems(item.id)
                            }
                          }}
                        >
                          -
                        </Button>
                        <Form.Control
                          style={{width: '50px'}}
                          type="number"
                          placeholder="add qvantity"
                          onChange={(e) => {
                            this.setState({quantity: e.target.value})
                          }}
                        />
                        <Button
                          onClick={(e) => {
                            this.props.change(item.id, quantity)
                          }}
                        >
                          +
                        </Button>
                      </Form>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <p>Price</p>
                      {item.price}
                    </ListGroup.Item>
                  </ListGroup>
                )
              })
            : ''}
        </ul>
      </div>
    )
  }
}

const mapState = ({orders, user, orderItems}) => {
  return {
    orders,
    user,
    orderItems,
  }
}
const mapDispatch = (dispatch) => {
  return {
    load: () => {
      dispatch(getOrders())
      dispatch(getItems())
    },
    destroyItems: (id) => {
      console.log('gogoggogogogogog')
      dispatch(destroyItem(id))
    },
    change: (id, qv) => {
      dispatch(editItem(id, qv))
    },
  }
}
export default connect(mapState, mapDispatch)(Orders)
