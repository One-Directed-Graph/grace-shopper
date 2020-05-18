import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ListGroup from 'react-bootstrap/ListGroup'
import Moment from 'react-moment'
import {ratingStars} from './../../helpers'
// import ReviewDetails from './review-details'

const Reviews = (props) => {
  const reviews = props.reviews || []

  return (
    <div className="user-home-comps">
      <h3>My Reviews</h3>
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
            {ratingStars(review.rating).map((star, idx) => (
              <span key={idx} className={star}></span>
            ))}
            <p>
              Date of Review:{' '}
              <Moment format="MMMM D, YYYY h:mma">{review.createdAt}</Moment>
            </p>
            <p>Review Description: {review.description}</p>
            {/* <ReviewDetails review={review} /> */}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

const mapState = ({reviews}) => ({reviews})

export default connect(mapState)(Reviews)

// Reviews.propTypes = {
//   reviews: PropTypes.array.isRequired,
// }
