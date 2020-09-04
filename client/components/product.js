import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Checkout from './Checkout'
import uuid from 'react-uuid'
import {
  createCart,
  addItems,
  getOrder,
  getProduct,
  getSessionCart,
} from '../store'
import axios from 'axios'
import {createSessionCart} from '../store'
import {ratingStars} from './helpers'

//ASSIGNED TO: Aleks

class Product extends Component {
  constructor(props) {
    //console.log('33333333333333333333', props)
    super()
    this.goToCart = this.goToCart.bind(this)
  }
  async goToCart() {
    const push = this.props.history.push
    const {
      user,
      order,
      product,
      isLoggedIn,
      cartExist,
      sessionCartexist,
    } = this.props
    //console.log('add to cart', user.id, order)
    const item = {
      productId: product.id,
      quantity: 1,
      price: product.price,
      userId: user.id,
    }
    let res3
    let res
    //console.log('hghghdhfghsdhfhdjcfbhdjcvbfdhcvnbf', isLoggedIn, cartExist)
    if (isLoggedIn === false) {
      //res = await axios.get(`/api/orders/session`)
      if (sessionCartexist === false) {
        this.props.addSessionCart(user.id, product.id, product.price, 1, push)
        //res3 = await axios.post(`/api/orders/session`)
        //console.log('res3 res3', res3.data, sessionCartexist)
        // this.props.addToItem(
        //   user.id,
        //   res3.data.id,
        //   product.id,
        //   product.price,
        //   1,
        //   push
        // )
      }
      if (sessionCartexist === true) {
        res = await axios.get(`/api/orders/session`)
        console.log()
        this.props.addToItem(
          user.id,
          res.data.id,
          product.id,
          product.price,
          1,
          push
        )
      }
      //let res2 = await axios.get(`/api/orders/session`)
      //console.log('response 2', res2.data)
    } else {
      if (order.userId !== user.id) {
        await this.props.addCart(
          user.id,
          product.id,
          product.price,
          1,
          push,
          product
        )

        //await this.props.addToItem(order.id, product.id, product.price, 1)
        //this.props.history.push(`/orders/cart/${user.id}`)
      }
      if (cartExist === true) {
        console.log('hello from else else else ', user.id, order.id)
        this.props.addToItem(
          user.id,
          order.id,
          product.id,
          product.price,
          1,
          push
        )
        //this.props.history.push(`/orders/cart/${user.id}`)
      }
    }
    push('/products/1?sortBy=AtoZ')
  }

  // componentDidMount() {
  //   window.onload = () => {
  //     let id = uuid()
  //     console.log('hello', id)
  //   }
  // }
  componentDidMount() {
    const push = this.props.history.push
    const productId = this.props.match.params.id
    const {user, order} = this.props
    console.log('form products line 56', order.userId)
    this.props.load(user.id, productId, push)
  }
  render() {
    const {product, user, order} = this.props
    // console.log('<>><><<><><><><>><><><>inside render', product, order)
    if (product) {
      return (
        <div className="section">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 mb-4 mb-md-0">
                <div className="product-image">
                  <div className="product_img_box">
                    <img
                      id="product_img_zoom"
                      src={product.img}
                      alt="product_img1"
                    />
                  </div>
                  <div
                    id="pr_item_gallery"
                    className="product_gallery_item slick_slider"
                    data-slides-to-show="4"
                    data-slides-to-scroll="1"
                    data-infinite="false"
                  ></div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="pr_detail">
                  <div className="product_description">
                    <h4 className="product_title">
                      <a href="#">{product.title}</a>
                    </h4>
                    <div className="product_price">
                      <span className="price">${product.price}</span>
                    </div>
                    <div className="rating_wrap">
                      {product.reviews &&
                        ratingStars(product.reviews).map((star, idx) => (
                          <span key={idx} className={star}></span>
                        ))}

                      <span className="rating_num">
                        ({product.reviews ? product.reviews.length : ''})
                      </span>
                    </div>
                    <div className="pr_desc">
                      <p>
                        {product.description} All mask guaranteed excellent
                        workmanship!
                      </p>
                    </div>
                    <div className="product_sort_info">
                      <ul>
                        <li>
                          <i className="linearicons-shield-check"></i> 1 Year AL
                          Jazeera Brand Warranty
                        </li>
                        <li>
                          <i className="linearicons-sync"></i> 30 Day Return
                          Policy
                        </li>
                        <li>
                          <i className="linearicons-bag-dollar"></i> Cash on
                          Delivery available
                        </li>
                      </ul>
                    </div>
                  </div>
                  <hr />
                  <div className="cart_extra">
                    {/* <div className="cart-product-quantity">
                      <div className="quantity">
                        <input type="button" value="-" className="minus" />
                        <input
                          type="text"
                          name="quantity"
                          value="1"
                          title="Qty"
                          className="qty"
                          size="4"
                        />
                        <input type="button" value="+" className="plus" />
                      </div>
                    </div> */}
                    <div className="cart_btn">
                      <button
                        onClick={() => {
                          this.goToCart()
                        }}
                        className="btn btn-fill-out btn-addtocart"
                        type="button"
                      >
                        <i className="icon-basket-loaded"></i> Add to cart
                      </button>
                    </div>
                  </div>
                  <hr />
                  <ul className="product-meta">
                    <li>
                      Category:{' '}
                      <Link
                        to={`/category/${
                          product.category ? product.category.name : ''
                        }/1`}
                      >
                        {product.category ? product.category.name : ''}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="large_divider clearfix"></div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="tab-style3">
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        id="Description-tab"
                        data-toggle="tab"
                        href="#Description"
                        role="tab"
                        aria-controls="Description"
                        aria-selected="true"
                      >
                        Description
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="Reviews-tab"
                        data-toggle="tab"
                        href="#Reviews"
                        role="tab"
                        aria-controls="Reviews"
                        aria-selected="false"
                      >
                        Reviews ({product.reviews ? product.reviews.length : 0})
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content shop_info_tab">
                    <div
                      className="tab-pane fade show active"
                      id="Description"
                      role="tabpanel"
                      aria-labelledby="Description-tab"
                    >
                      <p>
                        Contrary to popular belief, Lorem Ipsum is not simply
                        random text. It has roots in a piece of classical Latin
                        literature from 45 BC, making it over 2000 years old.
                        Vivamus bibendum magna Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit.Contrary to popular belief,
                        Lorem Ipsum is not simply random text. It has roots in a
                        piece of classical Latin literature from 45 BC, making
                        it over 2000 years old.
                      </p>
                      <p>
                        At vero eos et accusamus et iusto odio dignissimos
                        ducimus qui blanditiis praesentium voluptatum deleniti
                        atque corrupti quos dolores et quas molestias excepturi
                        sint occaecati cupiditate non provident, similique sunt
                        in culpa qui officia deserunt mollitia animi, id est
                        laborum et dolorum fuga. Et harum quidem rerum facilis
                        est et expedita distinctio.
                      </p>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="Reviews"
                      role="tabpanel"
                      aria-labelledby="Reviews-tab"
                    >
                      <div className="comments">
                        <h5 className="product_tab_title">
                          {product.reviews ? product.reviews.length : 0} Review
                          For <span>{product.title}</span>
                        </h5>
                        <ul className="list_none comment_list mt-4">
                          {product.reviews
                            ? product.reviews.map((rev, i) => {
                                return (
                                  <li key={i}>
                                    <div className="comment_img">
                                      <img
                                        src="assets/images/user1.jpg"
                                        alt="user1"
                                      />
                                    </div>
                                    <div className="comment_block">
                                      <div className="rating_wrap">
                                        {product.reviews &&
                                          ratingStars(
                                            rev.rating * 1
                                          ).map((star, idx) => (
                                            <span
                                              key={idx}
                                              className={star}
                                            ></span>
                                          ))}
                                      </div>
                                      <p className="customer_meta">
                                        <span className="review_author">
                                          {user.email}
                                        </span>
                                        <span className="comment-date">
                                          March 5, 2018
                                        </span>
                                      </p>
                                      <div className="description">
                                        <p>{rev.description}</p>
                                      </div>
                                    </div>
                                  </li>
                                )
                              })
                            : ''}
                        </ul>
                      </div>
                      <div className="review_form field_form">
                        <h5>Add a review</h5>
                        <form className="row mt-3">
                          <div className="form-group col-12">
                            <div className="star_rating">
                              <span data-value="1">
                                <i className="far fa-star"></i>
                              </span>
                              <span data-value="2">
                                <i className="far fa-star"></i>
                              </span>
                              <span data-value="3">
                                <i className="far fa-star"></i>
                              </span>
                              <span data-value="4">
                                <i className="far fa-star"></i>
                              </span>
                              <span data-value="5">
                                <i className="far fa-star"></i>
                              </span>
                            </div>
                          </div>
                          <div className="form-group col-12">
                            <textarea
                              required="required"
                              placeholder="Your review *"
                              className="form-control"
                              name="message"
                              rows="4"
                            ></textarea>
                          </div>
                          <div className="form-group col-md-6">
                            <input
                              required="required"
                              placeholder="Enter Name *"
                              className="form-control"
                              name="name"
                              type="text"
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <input
                              required="required"
                              placeholder="Enter Email *"
                              className="form-control"
                              name="email"
                              type="email"
                            />
                          </div>

                          <div className="form-group col-12">
                            <button
                              type="submit"
                              className="btn btn-fill-out"
                              name="submit"
                              value="Submit"
                            >
                              Submit Review
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="small_divider"></div>
                <div className="divider"></div>
                <div className="medium_divider"></div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="heading_s1">
                  <h3>Related Products</h3>
                </div>
                <div
                  className="releted_product_slider carousel_slider owl-carousel owl-theme"
                  data-margin="20"
                  data-responsive='{"0":{"items": "1"}, "481":{"items": "2"}, "768":{"items": "3"}, "1199":{"items": "4"}}'
                >
                  <div className="item">
                    <div className="product">
                      <a href="shop-product-detail.html">
                        <div className="product_img">
                          <img
                            src="assets/images/product_img1.jpg"
                            alt="product_img1"
                          />
                        </div>{' '}
                      </a>
                      <div className="product_info">
                        <h6 className="product_title">
                          <a href="shop-product-detail.html">
                            Blue Dress For Woman
                          </a>
                        </h6>
                        <div className="product_price">
                          <span className="price">$45.00</span>
                          <del>$55.25</del>
                          <div className="on_sale">
                            <span>35% Off</span>
                          </div>
                        </div>
                        <div className="rating_wrap">
                          <div className="rating">
                            <div
                              className="product_rate"
                              style={{width: '80%'}}
                            ></div>
                          </div>
                          <span className="rating_num">(21)</span>
                        </div>
                        <div className="pr_desc">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Phasellus blandit massa enim. Nullam id varius
                            nunc id varius nunc.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="product">
                      <a href="shop-product-detail.html">
                        <div className="product_img">
                          <img
                            src="assets/images/product_img1.jpg"
                            alt="product_img1"
                          />
                        </div>{' '}
                      </a>
                      <div className="product_info">
                        <h6 className="product_title">
                          <a href="shop-product-detail.html">
                            Blue Dress For Woman
                          </a>
                        </h6>
                        <div className="product_price">
                          <span className="price">$45.00</span>
                          <del>$55.25</del>
                          <div className="on_sale">
                            <span>35% Off</span>
                          </div>
                        </div>
                        <div className="rating_wrap">
                          <div className="rating">
                            <div
                              className="product_rate"
                              style={{width: '80%'}}
                            ></div>
                          </div>
                          <span className="rating_num">(21)</span>
                        </div>
                        <div className="pr_desc">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Phasellus blandit massa enim. Nullam id varius
                            nunc id varius nunc.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="product">
                      <a href="shop-product-detail.html">
                        <div className="product_img">
                          <img
                            src="assets/images/product_img1.jpg"
                            alt="product_img1"
                          />
                        </div>{' '}
                      </a>
                      <div className="product_info">
                        <h6 className="product_title">
                          <a href="shop-product-detail.html">
                            Blue Dress For Woman
                          </a>
                        </h6>
                        <div className="product_price">
                          <span className="price">$45.00</span>
                          <del>$55.25</del>
                          <div className="on_sale">
                            <span>35% Off</span>
                          </div>
                        </div>
                        <div className="rating_wrap">
                          <div className="rating">
                            <div
                              className="product_rate"
                              style={{width: '80%'}}
                            ></div>
                          </div>
                          <span className="rating_num">(21)</span>
                        </div>
                        <div className="pr_desc">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Phasellus blandit massa enim. Nullam id varius
                            nunc id varius nunc.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="product">
                      <a href="shop-product-detail.html">
                        <div className="product_img">
                          <img
                            src="assets/images/product_img1.jpg"
                            alt="product_img1"
                          />
                        </div>{' '}
                      </a>
                      <div className="product_info">
                        <h6 className="product_title">
                          <a href="shop-product-detail.html">
                            Blue Dress For Woman
                          </a>
                        </h6>
                        <div className="product_price">
                          <span className="price">$45.00</span>
                          <del>$55.25</del>
                          <div className="on_sale">
                            <span>35% Off</span>
                          </div>
                        </div>
                        <div className="rating_wrap">
                          <div className="rating">
                            <div
                              className="product_rate"
                              style={{width: '80%'}}
                            ></div>
                          </div>
                          <span className="rating_num">(21)</span>
                        </div>
                        <div className="pr_desc">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Phasellus blandit massa enim. Nullam id varius
                            nunc id varius nunc.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="product">
                      <a href="shop-product-detail.html">
                        <div className="product_img">
                          <img
                            src="assets/images/product_img1.jpg"
                            alt="product_img1"
                          />
                        </div>{' '}
                      </a>
                      <div className="product_info">
                        <h6 className="product_title">
                          <a href="shop-product-detail.html">
                            Blue Dress For Woman
                          </a>
                        </h6>
                        <div className="product_price">
                          <span className="price">$45.00</span>
                          <del>$55.25</del>
                          <div className="on_sale">
                            <span>35% Off</span>
                          </div>
                        </div>
                        <div className="rating_wrap">
                          <div className="rating">
                            <div
                              className="product_rate"
                              style={{width: '80%'}}
                            ></div>
                          </div>
                          <span className="rating_num">(21)</span>
                        </div>
                        <div className="pr_desc">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Phasellus blandit massa enim. Nullam id varius
                            nunc id varius nunc.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        //////////////////////////////////////////////
        //////////////////////////////////////////////
        // <Card className="text-center" style={{width: '18rem', margin: '10px'}}>
        //   <Card.Header>
        //     <div
        //       className="product-image"
        //       style={{
        //         backgroundImage: 'url(' + product.img + ')',
        //       }}
        //     />
        //   </Card.Header>
        //   {/* <Card.Img variant="top" src={product.img} /> */}
        //   <Card.Body>
        //     <Card.Title>{product.title}</Card.Title>
        //     <p>
        //       {product.reviews &&
        //         ratingStars(product.reviews).map((star, idx) => (
        //           <span key={idx} className={star}></span>
        //         ))}
        //     </p>
        //     <Card.Text>Product Description: {product.description}</Card.Text>
        //     <Card.Text>Price: ${product.price}</Card.Text>
        //     <Card.Text>
        //       Category Name: {product.category ? product.category.name : ''}
        //     </Card.Text>
        //     <Card.Text>
        //       In Stock:{' '}
        //       {product.quantity > 0 ? product.quantity : 'OUT OF STOCK'}
        //     </Card.Text>
        //     <Button
        //       className="buttonInProduct"
        //       variant="success"
        //       onClick={() => {
        //         this.goToCart()
        //       }}
        //     >
        //       add to cart
        //     </Button>
        //     <Button
        //       className="buttonInProduct"
        //       variant="success"
        //       onClick={() => this.props.history.push('/checkout')}
        //     >
        //       checkout
        //     </Button>
        //   </Card.Body>
        // </Card>
      )
    }
  }
}

{
  /* <div className="singleProduct">
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <div>price:${product.price}</div>
          <div>avalible amount:{product.quantity}</div>
          <img src={product.img}></img>
          <div>category:{product.category ? product.category.name : ''}</div>
        </div> */
}

const mapState = (state) => {
  const {product, user, order} = state
  return {
    product,
    user,
    order,
    isLoggedIn: !!state.user.id,
    cartExist: !!state.order.userId,
    sessionCartexist: !!state.order,
  }
}
const mapDispatch = (dispatch) => {
  return {
    addCart: (id, productid, productprice, qv, push, product) => {
      //console.log('from dispatch from dispatch', id)
      dispatch(createCart(id, productid, productprice, qv, push, product))
      //dispatch(addItems(orderid, productid, productprice, qv))
    },
    addToItem: (userId, orderId, productId, price, qv, push) => {
      dispatch(addItems(userId, orderId, productId, price, qv, push))
      //dispatch(getOrder(userId))
    },
    load: (id, productId, push) => {
      dispatch(getProduct(productId, push))

      //dispatch(getSessionCart())
      //dispatch(getOrder(id))
    },
    addSessionCart: (userId, productId, price, qv, push) => {
      dispatch(createSessionCart(userId, productId, price, qv, push))
      //dispatch(getSessionCart())
    },
  }
}
// export default connect(mapState, mapDispatch)(Products)
export default connect(mapState, mapDispatch)(Product)
