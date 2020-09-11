import React from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
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
    <div className="col-md-4 col-6">
      <div className="product">
        <Link
          to="#"
          onClick={(e) => {
            loadProduct(product.id, push)
          }}
        >
          <div className="product_img">
            <img src={product.img} alt="product_img1" />
          </div>
        </Link>
        <div className="product_info">
          <h6 className="product_title">
            <Link
              to="#"
              onClick={(e) => {
                loadProduct(product.id, push)
              }}
            >
              {product.title}
            </Link>
          </h6>
          <div className="product_price">
            <span className="price">{`$${product.price}`}</span>
            <del>{`$${(product.price * 1 * 0.35 + product.price * 1).toFixed(
              2
            )}`}</del>
            <div className="on_sale">
              <span>35% Off</span>
            </div>
          </div>
          <div className="rating_wrap">
            {product.reviews
              ? ratingStars(product.reviews).map((star, idx) => (
                  // <div className="rating_wrap">
                  //   <div className="rating">
                  //     <div className="product_rate" style={{width: '80%'}}></div>
                  //   </div>
                  //   <span className="rating_num">(21)</span>
                  // </div>
                  // <span className="rating">

                  <span
                    key={idx}
                    className={star}
                    aria-hidden="true"
                    style={{display: 'flex', flexDirection: 'row'}}
                  ></span>

                  // </span>
                  // <span className="rating_num">(21)</span>
                ))
              : ''}
          </div>
          {/* <div className="product_rate" style={{width: '80%'}}></div> */}

          {/* <p className="cart_buttons">
            <Link
              // to={`/orders/cart/${user.id || 'session'}`}
              className="btn btn-fill-line rounded-0 view-cart"
            >
              View Product
            </Link>
          </p> */}
          <div className="pr_desc">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              blandit massa enim. Nullam id varius nunc id varius nunc.
            </p>
          </div>
        </div>
      </div>
    </div>
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
