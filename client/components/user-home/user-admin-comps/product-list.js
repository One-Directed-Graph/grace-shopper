import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import {ProductUpdate} from '../user-actions/product-create-update'

/**
 * COMPONENT
 */

const ProductList = (props) => {
  const products = props.products ? props.products : []
  return (
    <div className="user-home-comps">
      <h3>Products</h3>
      <div id="user-home-products-page">
        <ListGroup id="user-home-products">
          {products.map((product) => (
            <Card
              key={product.id}
              style={{width: '10rem', alignItems: 'center'}}
            >
              <div
                className="product-list-image"
                style={{
                  backgroundImage: 'url(' + product.img + ')',
                }}
              />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={(ev) => console.log(ev.target)}
                >
                  Update
                </Button>
              </Card.Body>
            </Card>
          ))}
        </ListGroup>
        <ProductUpdate />
      </div>
    </div>
  )
}

{
  /* <ListGroupItem key={product.id} className="mx-auto">
<h6>{product.title}</h6>
<div
  className="product-list-image"
  style={{backgroundImage: 'url(' + product.img + ')'}}
/>
<Button
  variant="primary"
  type="submit"
  onClick={(ev) => console.log(ev.target)}
>
  Update
</Button>
</ListGroupItem> */
}

/**
 * CONTAINER
 */
const mapState = ({products}) => ({products})

export default connect(mapState)(ProductList)

/**
 * PROP TYPES
 */
ProductList.propTypes = {
  products: PropTypes.array,
}
