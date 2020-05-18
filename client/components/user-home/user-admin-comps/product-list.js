import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import {ProductUpdate} from '../'
import {removeProduct} from '../../../store'
import {Link, Route} from 'react-router-dom'

//TODO: Add search and sorting
//FIX: Infinite delete

/**
 * COMPONENT
 */

const ProductList = ({products, history, handleDelete}) => {
  const rootDir = '/account/product-list'

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
              <Card.Header>
                <div
                  className="product-list-image"
                  style={{
                    backgroundImage: 'url(' + product.img + ')',
                  }}
                />
              </Card.Header>
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Button
                  variant="primary"
                  // type="submit"
                  onClick={() => {
                    history.push(`${rootDir}/${product.id}`)
                  }}
                >
                  Update
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          ))}
        </ListGroup>
        <Route exact path={`${rootDir}/:id`} component={ProductUpdate} />
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = ({products}) => ({products})

const mapDispatch = (dispatch) => {
  return {
    handleDelete(id) {
      console.log(`deleting product ${id}`)
      dispatch(removeProduct(id))
    },
  }
}

export default connect(mapState, mapDispatch)(ProductList)

/**
 * PROP TYPES
 */
ProductList.propTypes = {
  products: PropTypes.array,
}
