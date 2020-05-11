import React, {Component} from 'react'
import {connect} from 'react-redux'
//import {Link} from 'react-router-dom'
import {getProducts, getCart, getUser} from '../store'
import {ListGroup} from 'react-bootstrap'
import Image from 'react-bootstrap/Image'

//ASSIGNED TO: Vinayak

class Cart extends Component {
  /*   constructor() {
    super()
  } */
  /* componentDidMount() {
    this.props.load()
  } */
  render() {
    console.log(this.props)
    const cart = this.props.cart
    const productList = this.props.products
    //  console.log('Cart in render: ',cart)
    //  console.log('Cart in render: ',productList)
    const itemList = cart.map((item) => {
      return {
        ...item,
        productDetail: productList.find((pl) => pl.id === item.productId),
      }
    })
    console.log('processed cart', itemList)
    return (
      <div>
        <h1> Cart ({itemList.length} )</h1>
        <ul className="listgrp">
          {itemList
            ? itemList.map((item) => {
                return (
                  <ListGroup horizontal="sm" className="my-2" key={item.id}>
                    <ListGroup.Item>
                      <img
                        src={item.productDetail.img}
                        alt="..loading"
                        className="thumbnail"
                      />
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <p>Quantity</p>
                      <input className="plusminus" type="button" value="-" />
                      <input className="plusminus" value={item.quantity} />
                      <input
                        className="plusminus"
                        type="button"
                        value="+"
                      />}{' '}
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

const mapState = ({cart, products, user}) => {
  // console.log('in cart mapstate ', state)
  //const {cart,products,user} = state
  return {
    cart,
    products,
    user,
  }
}
const mapDispatch = (dispatch) => {
  return {
    load: () => {
      // dispatch(getProducts('load'))
      //  dispatch(getCart())
    },
  }
}
export default connect(mapState, mapDispatch)(Cart)
