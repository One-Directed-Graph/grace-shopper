import React, {Component} from 'react'
import {connect} from 'react-redux'
//import {Link} from 'react-router-dom'
import {getProducts, getCart} from '../store'
import {ListGroup, Image, DropdownButton, Dropdown} from 'react-bootstrap'

//ASSIGNED TO: Vinayak

class Cart extends Component {
  render() {
    console.log(this.props)
    const cart = this.props.cart
    const productList = this.props.products
    //console.log('Cart in render: ', {...cart})
    //console.log('Cart in render: ')
    const itemList = cart.map((item) => {
      return {
        ...item,
        /* productDetail: productList.find((pl) => pl.id === item.productId),*/
      }
    })
    console.log(itemList)
    return (
      <div>
        {/*  <DropdownButton
          id="dropdown-item-button"
          className="dropdown"
          title="Dropdown button"
        >
          <Dropdown.Item as="button">Action</Dropdown.Item>
          <Dropdown.Item as="button">Another action</Dropdown.Item>
          <Dropdown.Item as="button">Something else</Dropdown.Item>
        </DropdownButton> */}
        <h1> Cart ({itemList.length} )</h1>
        <ul className="listgrp">
          {itemList
            ? itemList.map((item) => {
                return (
                  <ListGroup horizontal="sm" className="my-2" key={item.id}>
                    <ListGroup.Item>
                      {/* <Image
                        src={item.productDetail.img}
                        className="thumbnail"
                      /> */}
                    </ListGroup.Item>
                    {/*  <Image src={item.productDetail.img} thumbnail /> */}
                    {/*   <ListGroup.Item>{item.productDetail.title} </ListGroup.Item> */}
                    <ListGroup.Item>
                      <p>Quantity</p>{' '}
                      <input className="plusminus" type="button" value="-" />{' '}
                      <input className="plusminus" value={item.quantity} />{' '}
                      <input className="plusminus" type="button" value="+" />
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {' '}
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

const mapState = ({cart, products}) => {
  console.log(' Cart in mapstate Products: ', products)
  return {
    cart,
    products,
  }
}
const mapDispatch = (dispatch) => {
  return {
    load: () => {
      dispatch(getProducts())
      dispatch(getCart())
    },
  }
}
// export default connect(mapState, mapDispatch)(Products)
export default connect(mapState, mapDispatch)(Cart)
