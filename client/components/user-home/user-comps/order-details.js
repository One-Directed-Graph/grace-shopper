import React, {Component, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, HashRouter, Route, Switch} from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'

//TODO: Link goes to weird URL

const OrderDetails = ({order}) => {
  const [open, setOpen] = useState(false)
  const orderItems = order.orderitems || []

  return (
    <div>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="order-details-collapse"
        aria-expanded={open}
      >
        Details
      </Button>
      <Collapse in={open}>
        <div id="order-details-collapse">
          <ListGroup variant="flush" id="order-list-orders">
            {orderItems.map((item) => (
              <ListGroup.Item key={item.id}>
                <Link to={`/product/${item.productId}`}>
                  {item.productTitle}
                </Link>
                <div
                  className="product-list-image"
                  style={{
                    backgroundImage: 'url(' + item.productImg + ')',
                  }}
                />
                <p>Price: {item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </Collapse>
    </div>
  )
}

const mapState = null

export default connect(mapState)(OrderDetails)

// OrderDetails.propTypes = {
//   order: PropTypes.object.isRequired,
//
