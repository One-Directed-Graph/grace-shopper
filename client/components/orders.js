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
    let a = []
    //const {orderitems} = this.props.orders
    if (orders && user) {
      console.log('gfgfgfgfgfgfgfgfgf', orders.id, orders)
      let userOrders = user.id
        ? orders.filter((ord) => ord.userId === user.id)
        : ''

      //userOrders ? userOrders.map((item) => item.orderitems) : ''
      //console.log('ordersitems 1111', orderItems)
      console.log('userorders 222222', userOrders.length, userOrders[0])
      a = userOrders[0]
      if (a) {
        console.log('aaaaaaaaaaaaaaaaaaaa', a.orderitems.length, typeof a)
      }
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
        {a ? <h1> Cart ({a.orderitems.length} )</h1> : ''}
        <ul className="listgrp">
          {a
            ? a.orderitems.map((item, idx) => {
                //console.log('lalalala', item[idx])

                return (
                  <ListGroup horizontal="sm" className="my-2" key={item.id}>
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
                      {item.quantity}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <p>Price</p>
                      {item.price}
                    </ListGroup.Item>
                  </ListGroup>
                )
              })
            : ''}
          <Button>add</Button>
        </ul>
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
