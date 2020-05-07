import React, {Component} from 'react'
import {connect} from 'react-redux'
//import {Link} from 'react-router-dom'
import {getProducts, getCart} from '../store'

//ASSIGNED TO: Vinayak

class Cart extends Component {
  render() {
    const cart = this.props.cart
    const productList = this.props.products.products
    console.log('Cart in render: ', {...cart})
    console.log('Cart in render: ')
    const itemList = cart.map((item) => {
      return {
        ...item,
        productDetail: productList.find((pl) => pl.id === item.productId),
      }
    })
    console.log(itemList)
    return (
      <div>
        <h1> Cart ({itemList.length} )</h1>
        <ul>
          {itemList
            ? itemList.map((item) => {
                return (
                  <li key="item.id">
                    {/* <img src="{item.productDetail.img}" /> */}
                    {item.productDetail.title} {item.quantity}
                    {item.price}
                  </li>
                )
              })
            : ''}
        </ul>
      </div>
    )
  }
}

const mapState = ({cart, products}) => {
  console.log(' Cart in mapstate : ', products)
  return {
    cart,
    products,
  }
}
const mapDispatch = (dispatch) => {
  return {
    load: () => {
      // dispatch(getProducts())
      dispatch(getCart())
    },
  }
}
// export default connect(mapState, mapDispatch)(Products)
export default connect(mapState, mapDispatch)(Cart)
