import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import uuid from 'react-uuid'
import {createCart, addItems, getOrder, getProduct} from '../store'
import axios from 'axios'

//ASSIGNED TO: Aleks

class Product extends Component {
  constructor(props) {
    console.log('33333333333333333333', props)
    super()
  }
  async goToCart() {
    const {user, order, product, isLoggedIn} = this.props
    console.log('add to cart', user.id, order)
    const item = {
      productId: product.id,
      quantity: 1,
      price: product.price,
      userId: user.id,
    }
    console.log('hghghdhfghsdhfhdjcfbhdjcvbfdhcvnbf', isLoggedIn)
    if (isLoggedIn === false) {
      let res = await axios.post(`/api/orders/session/${product.id}`)
      console.log('in theeeee prrrroducts session', res.data)
    } else {
      console.log('this.props.history.push', order)
      const push = this.props.history.push
      if (order.orderitems.length === 0) {
        console.log('hello from if if if if if fif ', user.id)
        await this.props.addCart(
          user.id,
          product.id,
          product.price,
          1,
          push,
          product
        )

        //await this.props.addToItem(order.id, product.id, product.price, 1)
        //this.props.history.push(`/orders/cart/${user.id}`)
      } else {
        console.log('hello from else else else ', user.id)
        this.props.addToItem(order.id, product.id, product.price, 1)
        //this.props.history.push(`/orders/cart/${user.id}`)
      }
    }
  }

  // componentDidMount() {
  //   window.onload = () => {
  //     let id = uuid()
  //     console.log('hello', id)
  //   }
  // }
  componentDidMount() {
    const push = this.props.history.push
    const productId = this.props.match.params.id
    const {user} = this.props
    console.log('form products line 56', user.id)
    this.props.load(user.id, productId, push)
  }
  render() {
    const {product, user, order} = this.props
    console.log('<>><><<><><><><>><><><>inside render', product, order)
    if (product) {
      return (
        <Card className="text-center" style={{width: '18rem', margin: '10px'}}>
          <Card.Img variant="top" src={product.img} />
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>Product Description: {product.description}</Card.Text>
            <Card.Text>Price: ${product.price}</Card.Text>
            <Card.Text>
              Category Name: {product.category ? product.category.name : ''}
            </Card.Text>
            <Button
              className="buttonInProduct"
              variant="success"
              onClick={() => {
                this.goToCart()
              }}
            >
              add to cart
            </Button>
            <Button
              className="buttonInProduct"
              variant="success"
              onClick={() => {
                console.log('hello')
              }}
            >
              checkout
            </Button>
          </Card.Body>
        </Card>
      )
    }
  }
}

{
  /* <div className="singleProduct">
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <div>price:${product.price}</div>
          <div>avalible amount:{product.quantity}</div>
          <img src={product.img}></img>
          <div>category:{product.category ? product.category.name : ''}</div>
        </div> */
}

const mapState = (state) => {
  const {product, user, order} = state
  return {
    product,
    user,
    order,
    isLoggedIn: !!state.user.id,
  }
}
const mapDispatch = (dispatch) => {
  return {
    addCart: (id, productid, productprice, qv, push, product) => {
      console.log('from dispatch from dispatch', id)
      dispatch(createCart(id, productid, productprice, qv, push, product))
      //dispatch(addItems(orderid, productid, productprice, qv))
    },
    addToItem: (orderId, productId, price, qv) => {
      dispatch(addItems(orderId, productId, price, qv))
    },
    load: (id, productId, push) => {
      dispatch(getProduct(productId, push))
      //dispatch(getOrder(id))
    },
  }
}
// export default connect(mapState, mapDispatch)(Products)
export default connect(mapState, mapDispatch)(Product)
