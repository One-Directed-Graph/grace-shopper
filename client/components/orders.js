import React, {Component} from 'react'
import {getOrders} from '../store'
import {connect} from 'react-redux'
import {Modal, Button, ListGroup} from 'react-bootstrap'
import {MyVerticallyCenteredModal} from './modelPopup'
class Orders extends Component {
  constructor() {
    super()
    // this.state = {
    //   modalShow: false,
    // }
    // this.setModalShow = this.setModalShow.bind(this)
  }
  // setModalShow(input) {
  //   console.log(input)
  //   this.setState({modalShow: input})
  //   console.log(this.state.modalShow)
  // }
  componentDidMount() {
    this.props.load()
  }
  render() {
    const {orders, user} = this.props
    console.log(orders, user)
    const userOrders = user.id
      ? orders.filter((ord) => ord.userId === user.id)
      : ''

    const orderItems = userOrders
      ? userOrders.map((item) => item.orderitems)
      : ''
    console.log('orders 1111', orderItems, userOrders)
    //     const {modalShow} = this.props
    //     const {setModalShow} = this
    //     return (
    //       <div>
    //         <Button variant="primary" onClick={() => setModalShow(true)}>
    //           Launch vertically centered modal
    //         </Button>

    //         <MyVerticallyCenteredModal
    //           show={modalShow}
    //           onHide={() => setModalShow(false)}
    //         />
    //       </div>
    //     )
    return (
      <div>
        <h1> Cart ({orderItems.length} )</h1>
        {/* <ul className="listgrp">
          {orderItems
            ? orderItems.map((item, idx) => {
                console.log(item[idx])
                let el = item[idx]
                return (
                  <ListGroup horizontal="sm" className="my-2" key={el.id}>
                    <ListGroup.Item>
                      {
                        <img
                          src={el.product.img}
                          alt="..loading"
                          className="thumbnail"
                        />
                      }
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <p>Quantity</p>
                      {el.quantity}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <p>Price</p>
                      {el.price}
                    </ListGroup.Item>
                  </ListGroup>
                )
              })
            : ''}
          <Button>add</Button>
        </ul> */}
      </div>
    )
  }
}

const mapState = ({orders, user}) => {
  return {
    orders,
    user,
  }
}
const mapDispatch = (dispatch) => {
  return {
    load: () => {
      dispatch(getOrders())
    },
  }
}
export default connect(mapState, mapDispatch)(Orders)
