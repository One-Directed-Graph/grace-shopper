import React from 'react'
import {connect} from 'react-redux'
// import {loadPage} from '../store/divided'
// import {getProducts} from '../store/products'
import {getProduct} from '../store/product'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import {ratingStars} from './helpers'
// import {Product} from '.'

const ProductCard = ({product, loadProduct, history}) => {
  const {push} = history
  return (
    <Card
      key={product.id}
      className="text-center"
      style={{width: '18rem', margin: '10px'}}
    >
      <Card.Header>
        <div
          className="product-image"
          style={{
            backgroundImage: 'url(' + product.img + ')',
          }}
        />
      </Card.Header>
      {/* <Card.Img variant="top" src={prod.img} /> */}
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <p>
          {product.reviews &&
            ratingStars(product.reviews).map((star, idx) => (
              <span key={idx} className={star}></span>
            ))}
        </p>
        <Card.Text>Product Description: {product.description}</Card.Text>
        <Card.Text>Price: ${product.price}</Card.Text>

        <Button
          variant="success"
          onClick={(e) => {
            loadProduct(product.id, push)
          }}
        >
          Select Product
        </Button>
      </Card.Body>
    </Card>
  )
}

const mapState = ({products, divided, user}) => {
  return {
    products,
    divided,
    user,
    isLogedIn: !!user.id,
  }
}
const mapDispatch = (dispatch) => {
  return {
    loadProduct: (id, push) => {
      dispatch(getProduct(id, push))
    },
  }
}

export default connect(mapState, mapDispatch)(ProductCard)
