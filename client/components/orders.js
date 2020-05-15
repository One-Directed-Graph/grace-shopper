import React, {Component} from 'react'
import {getOrder} from '../store'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
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
  // itemsForUser() {
  //   const {orders, user} = this.props
  //   let arrayOfItems = []
  //   if (orders && user) {
  //     let userOrders = user.id
  //       ? orders.filter((ord) => ord.userId === user.id)
  //       : ''
  //     arrayOfItems = userOrders[0]
  //   }
  //   return arrayOfItems
  // }
  // total() {
  //   let orders = this.itemsForUser()
  //   let total = 0
  //   if (orders) {
  //     let arrayOfPrice = orders.orderitems.map((order) => {
  //       total += order.price * 1 * order.quantity * 1

  //       return total * 0.0825
  //     })
  //   }
  //   return total.toFixed(2)
  // }
  componentDidMount() {
    const {id} = this.props.user
    console.log('in mount', id)
    this.props.load(id)
  }
  render() {
    console.log('in orders render = props', this.props)
    // const {} = this.state
    // const arrayOfItems = this.itemsForUser()
    // this.total()
    return <hr />
    //   return (
    //     <div>
    //       {arrayOfItems ? <h1> Cart ({arrayOfItems.orderitems.length} )</h1> : ''}
    //       <ul>
    //         {arrayOfItems
    //           ? arrayOfItems.orderitems.map((item, idx) => {
    //               return (
    //                 <ListGroup
    //                   horizontal="sm"
    //                   className="my-2"
    //                   key={item.id}
    //                   id="listgrp"
    //                 >
    //                   <ListGroup.Item>
    //                     {
    //                       <img
    //                         src={item.product.img}
    //                         alt="..loading"
    //                         className="thumbnail"
    //                       />
    //                     }
    //                     <Button
    //                       onClick={() => {
    //                         this.props.destroyItems(item.id)
    //                       }}
    //                     >
    //                       Remove Item
    //                     </Button>
    //                   </ListGroup.Item>
    //                   <ListGroup.Item>
    //                     <p>Quantity</p>
    //                     <p>{item.quantity}</p>
    //                     <Form
    //                       style={{width: '100%'}}
    //                       onSubmit={(e) => e.preventDefault()}
    //                       className="colpic"
    //                     >
    //                       <Button
    //                         onClick={(e) => {
    //                           if (quantity * 1 > 0) {
    //                             this.setState({quantity: item.quantity * 1 - 1})
    //                             this.props.change(item.id, item.quantity * 1 - 1)
    //                             this.setState({quantity: 1})
    //                           }
    //                           if (quantity * 1 <= 0) {
    //                             return this.props.destroyItems(item.id)
    //                           }
    //                         }}
    //                       >
    //                         -
    //                       </Button>
    //                       <Form.Control
    //                         style={{width: '50px'}}
    //                         type="number"
    //                         value={quantity}
    //                         placeholder="add qvantity"
    //                         onChange={(e) => {
    //                           this.setState({quantity: e.target.value})
    //                         }}
    //                       />
    //                       <Button
    //                         onClick={(e) => {
    //                           this.props.change(item.id, item.quantity * 1 + 1)
    //                           this.setState({quantity: 1})
    //                         }}
    //                       >
    //                         +
    //                       </Button>
    //                     </Form>
    //                   </ListGroup.Item>
    //                   <ListGroup.Item>
    //                     <p>Price</p>
    //                     <p>{item.price}</p>
    //                     <p>Total Item Price</p>
    //                     <p>{(item.price * 1 * item.quantity * 1).toFixed(2)}</p>
    //                   </ListGroup.Item>
    //                 </ListGroup>
    //               )
    //             })
    //           : ''}
    //       </ul>
    //       <h2>TOTAL: {this.total()}</h2>
    //     </div>
    //   )
  }
}

// const mapState = ({orders, user, orderItems}) => {
//   return {
//     orders,
//     user,
//     orderItems,
//   }
// }

const mapState = (state) => state

const mapDispatch = (dispatch) => {
  return {
    load: (id) => {
      dispatch(getOrder(id))
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
