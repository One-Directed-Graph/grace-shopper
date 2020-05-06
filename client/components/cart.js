import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getProducts} from '../store'
import {getCart} from '../store'

//ASSIGNED TO: Vinayak

class Cart extends Component {
  constructor(props) {
    super()
    console.log('from constructor of Cart')
    this.state = {
      cart: props.cart,
      products: props.products,
    }
  }
  componentDidMount() {
    this.props.load()
    this.setState({products: this.props.products}, {cart: this.props.cart})
  }
  render() {
    const {cart, products} = this.state
    return (
      <div>
        <h1> Cart </h1>
        <ul>
          {cart.map((item) => {
            return (
              <li key="item.id">
                {item.productId}
                {item.quantity}
                {item.price}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

const mapState = ({products, cart}) => {
  return {
    products,
    cart,
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
