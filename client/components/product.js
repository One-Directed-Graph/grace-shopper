import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import uuid from 'react-uuid'
import {
  createCart,
  addItems,
  getOrder,
  getProduct,
  getSessionCart,
} from '../store'
import axios from 'axios'
import {createSessionCart} from '../store'

//ASSIGNED TO: Aleks

class Product extends Component {
  constructor(props) {
    //console.log('33333333333333333333', props)
    super()
  }
  async goToCart() {
    const push = this.props.history.push
    const {
      user,
      order,
      product,
      isLoggedIn,
      cartExist,
      sessionCartexist,
    } = this.props
    //console.log('add to cart', user.id, order)
    const item = {
      productId: product.id,
      quantity: 1,
      price: product.price,
      userId: user.id,
    }
    let res3
    let res
    //console.log('hghghdhfghsdhfhdjcfbhdjcvbfdhcvnbf', isLoggedIn, cartExist)
    if (isLoggedIn === false) {
      //res = await axios.get(`/api/orders/session`)
      if (sessionCartexist === false) {
        this.props.addSessionCart(user.id, product.id, product.price, 1, push)
        //res3 = await axios.post(`/api/orders/session`)
        //console.log('res3 res3', res3.data, sessionCartexist)
        // this.props.addToItem(
        //   user.id,
        //   res3.data.id,
        //   product.id,
        //   product.price,
        //   1,
        //   push
        // )
      }
      if (sessionCartexist === true) {
        res = await axios.get(`/api/orders/session`)
        console.log(
          'in theeeee prrrroducts session',
          sessionCartexist,
          res.data,
          user.id,
          res.data.id,
          product.id,
          product.price
        )
        this.props.addToItem(
          user.id,
          res.data.id,
          product.id,
          product.price,
          1,
          push
        )
      }
      //let res2 = await axios.get(`/api/orders/session`)
      //console.log('response 2', res2.data)
    } else {
      console.log('this.props.history.push', order)

      if (cartExist === false) {
        console.log('hello from if if if if if fif ', order, cartExist)
        console.log('from products and  cart exist false')
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
      }
      if (cartExist === true) {
        console.log('hello from else else else ', user.id, order.id)
        this.props.addToItem(
          user.id,
          order.id,
          product.id,
          product.price,
          1,
          push
        )
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
    const {user, order} = this.props
    console.log('form products line 56', order.userId)
    this.props.load(user.id, productId, push)
  }
  render() {
    const {product, user, order} = this.props
    // console.log('<>><><<><><><><>><><><>inside render', product, order)
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
    cartExist: !!state.order.userId,
    sessionCartexist: !!state.order,
  }
}
const mapDispatch = (dispatch) => {
  return {
    addCart: (id, productid, productprice, qv, push, product) => {
      //console.log('from dispatch from dispatch', id)
      dispatch(createCart(id, productid, productprice, qv, push, product))
      //dispatch(addItems(orderid, productid, productprice, qv))
    },
    addToItem: (userId, orderId, productId, price, qv, push) => {
      dispatch(addItems(userId, orderId, productId, price, qv, push))
      //dispatch(getOrder(userId))
    },
    load: (id, productId, push) => {
      dispatch(getProduct(productId, push))

      //dispatch(getSessionCart())
      //dispatch(getOrder(id))
    },
    addSessionCart: (userId, productId, price, qv, push) => {
      dispatch(createSessionCart(userId, productId, price, qv, push))
      dispatch(getSessionCart())
    },
  }
}
// export default connect(mapState, mapDispatch)(Products)
export default connect(mapState, mapDispatch)(Product)
