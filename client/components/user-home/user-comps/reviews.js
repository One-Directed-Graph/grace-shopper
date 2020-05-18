import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ListGroup from 'react-bootstrap/ListGroup'
import Moment from 'react-moment'
// import ReviewDetails from './review-details'

const Reviews = (props) => {
  const reviews = props.reviews || []
  const styleStar = 'fa fa-star'
  const ratingStars = (rating) => {
    const diff = new Array(5 - rating).fill(styleStar)
    const starArr = new Array(rating).fill(`${styleStar} checked`)
    console.log(diff, starArr)
    return [...starArr, ...diff]
  }
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

// const mapState = ({reviews, products}) => {
//   const processedReviews = reviews.map((review) => {
//     const product = products.find(
//       (_product) => _product.id === review.productId
//     )
//     review.productTitle = product.title
//     review.item.productImg = product.img
//   })
//   return {reviews: processedReviews}
// }

export default connect(mapState)(Reviews)

// Reviews.propTypes = {
//   reviews: PropTypes.array.isRequired,
// }
