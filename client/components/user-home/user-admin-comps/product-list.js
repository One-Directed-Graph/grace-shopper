import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import {ProductUpdate} from '../user-actions/product-create-update'
import Search from '../../Search'
import {Link, Route} from 'react-router-dom'
// import {getProduct} from '../../../store'

/**
 * COMPONENT
 */

const ProductList = ({products, history}) => {
  const rootDir = '/account/product-list'
  let product
  const findProduct = (id) => {
    product = products.find((_product) => _product.id === id)
    return product
  }
  // const products = props.products ? props.products : []
  return (
    <div className="user-home-comps">
      <div id="user-home-product-title">
        <h3>Products</h3>
        {/* <Search /> */}
      </div>
      <div id="user-home-products-page">
        <ListGroup id="user-home-products">
          {products.map((product) => (
            <Card key={product.id}>
              <div
                className="product-list-image"
                style={{
                  backgroundImage: 'url(' + product.img + ')',
                  margin: '1rem',
                }}
              />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                {/* <Link to={`${rootDir}/${product.id}`}> */}
                <Button
                  variant="primary"
                  type="submit"
                  onClick={() => {
                    findProduct(product.id)
                    console.log(product)
                    history.push(`${rootDir}/${product.id}`)
                  }}
                >
                  Update
                </Button>
                {/* </Link> */}
              </Card.Body>
            </Card>
          ))}
        </ListGroup>
        <Route
          exact
          path={`${rootDir}/:id`}
          render={(props) => <ProductUpdate {...props} product={product} />}
        />
      </div>
    </div>
  )
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
