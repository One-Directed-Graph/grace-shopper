import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import {ProductUpdate} from '../'
import Search from '../../Search'
import {Link, Route} from 'react-router-dom'

/**
 * COMPONENT
 */

const ProductList = ({products, history}) => {
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
              <div
                className="product-list-image"
                style={{
                  backgroundImage: 'url(' + product.img + ')',
                }}
              />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                {/* <Link to={`${rootDir}/${product.id}`}> */}
                <Button
                  variant="primary"
                  type="submit"
                  onClick={() => {
                    history.push(`${rootDir}/${product.id}`)
                  }}
                >
                  Update
                </Button>
                {/* </Link> */}
                <Button variant="danger">Delete</Button>
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

export default connect(mapState)(ProductList)

/**
 * PROP TYPES
 */
ProductList.propTypes = {
  products: PropTypes.array,
}
