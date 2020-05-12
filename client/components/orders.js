import React, {Component} from 'react'
import {getOrders} from '../store'
import {connect} from 'react-redux'

class Orders extends Component {
  componentDidMount() {
    this.props.load()
  }
  render() {
    const {orders, products} = this.props
    // console.log('User: ',state.user)
    console.log('orders yeyeyeyeyeyey', orders, products)

    const itemList = orders.map((item) => {
      return {
        ...item,
        // orderItems: products.find((pl) => pl.id === item.orderitems.productId),
      }
    })
    console.log('processed cart', itemList)

    return <hr />
  }
}

const mapState = ({orders, products}) => {
  return {
    orders,
    products,
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
