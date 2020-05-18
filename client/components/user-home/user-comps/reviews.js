import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ListGroup from 'react-bootstrap/ListGroup'
// import Moment from 'react-moment'
// import ReviewDetails from './review-details'

const Reviews = (props) => {
  const reviews = props.reviews || []
  return (
    <div className="user-home-comps">
      <h3>My Review</h3>
      <ListGroup variant="flush" id="order-list-orders">
        {reviews.map((review) => (
          <ListGroup.Item key={review.id}>
            <h6>Product: {review.product.title}</h6>
            <div
              className="product-list-image"
              style={{
                backgroundImage: 'url(' + review.product.img + ')',
              }}
            />
            <p>{review.description}</p>
            {/* <ReviewDetails review={review} /> */}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

const mapState = ({reviews}) => {
  console.log('in reviews mapState')
  return {reviews}
}

export default connect(mapState)(Reviews)

// Reviews.propTypes = {
//   reviews: PropTypes.array.isRequired,
// }
