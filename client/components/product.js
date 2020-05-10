import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import {addToCart} from '../store'
//ASSIGNED TO: Aleks

class Product extends Component {
  constructor() {
    super()
  }
  render() {
    const {product} = this.props
    console.log('<>><><<><><><><>><><><>inside render', product)
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
                console.log('add to cart')
                const item = {
                  productId: product.id,
                  quantity: 1,
                  price: product.price,
                }
                this.props.addToCart(item)
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

const mapState = ({product}) => {
  return {
    product,
  }
}
const mapDispatch = (dispatch) => {
  return {
    addToCart: (item) => dispatch(addToCart(item)),
  }
}
// export default connect(mapState, mapDispatch)(Products)
export default connect(mapState, mapDispatch)(Product)
