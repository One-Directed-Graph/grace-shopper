import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadPage} from '../store/divided'
import {getProducts} from '../store/products'
import {getProduct} from '../store/product'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Pagination from 'react-bootstrap/Pagination'
import queryString from 'query-string'
import {getOrder, getSessionCart} from '../store'
import {ratingStars} from './helpers'
//ASSIGNED TO: Aleks

class Products extends Component {
  constructor() {
    super()
    this.urlProducer = this.urlProducer.bind(this)
  }
  componentDidUpdate(prevState) {
    const push = this.props.history.push
    const page = this.props.match.params.page || 1
    let sortBy

    if (queryString.parse(this.props.location.search).sortBy) {
      sortBy = queryString.parse(this.props.location.search).sortBy
    } else {
      sortBy = 'AtoZ'
    }

    if (prevState.location.search.slice(8) !== sortBy) {
      push(`/products/${page}?sortBy=${sortBy}`)
      this.props.load(sortBy, page)
    }
  }

  componentDidMount() {
    const {user, isLogedIn} = this.props
    console.log('user from productssssss', user, isLogedIn)
    const sortBy = queryString.parse(this.props.location.search).sortBy
    const page = this.props.match.params.page || 1
    const push = this.props.history.push
    if (isLogedIn === true) {
      this.props.load(sortBy, page, user.id)
    }
    if (isLogedIn === false) {
      this.props.loadSession(sortBy, page)
    }
  }

  urlProducer(p) {
    const push = this.props.history.push
    const sortBy =
      queryString.parse(this.props.location.search).sortBy || 'AtoZ'
    let page = p || 1

    push(`/products/${page}?${sortBy}`)
    //this.props.loadPages(page)
  }

  render() {
    const {urlProducer} = this
    const {products, divided} = this.props
    const push = this.props.history.push
    const page = this.props.match.params.page

    return (
      <div className="outsideOfContainer">
        <Container fluid>
          <div className="sortBlock">
            <select
              onChange={(ev) => {
                push(`/products/${page}/?sortBy=${ev.target.value}`)
              }}
            >
              <option>Sort By</option>
              <option>Categories</option>
              <option>LowToHigh</option>
              <option>HighToLow</option>
              <option>AtoZ</option>
              <option>ZtoA</option>
            </select>
          </div>
          <div className="container">
            {divided.map((prod) => {
              return (
                <Card
                  key={prod.id}
                  className="text-center"
                  style={{width: '18rem', margin: '10px'}}
                >
                  <Card.Header>
                    <div
                      className="product-image"
                      style={{
                        backgroundImage: 'url(' + prod.img + ')',
                      }}
                    />
                  </Card.Header>
                  {/* <Card.Img variant="top" src={prod.img} /> */}
                  <Card.Body>
                    <Card.Title>{prod.title}</Card.Title>
                    <p>
                      {prod.reviews &&
                        ratingStars(prod.reviews).map((star, idx) => (
                          <span key={idx} className={star}></span>
                        ))}
                    </p>
                    <Card.Text>
                      Product Description: {prod.description}
                    </Card.Text>
                    <Card.Text>Price: ${prod.price}</Card.Text>

                    <Button
                      variant="success"
                      onClick={(e) => {
                        this.props.loadProduct(prod.id, push)
                      }}
                    >
                      Select Product
                    </Button>
                  </Card.Body>
                </Card>
              )
            })}
            <br />
          </div>
          <Pagination>
            <Pagination.First
              onClick={() => {
                urlProducer(1)
              }}
            />
            <Pagination.Prev
              onClick={(e) => {
                urlProducer(page * 1 - 1)
              }}
            />

            {[...Array(Math.floor(products.length / 5))].map(
              (pageNumber, ind) => {
                return (
                  <Pagination.Item
                    key={ind}
                    onClick={() => {
                      urlProducer(ind + 1)
                    }}
                  >
                    {ind + 1}
                  </Pagination.Item>
                )
              }
            )}

            <Pagination.Next
              onClick={(e) => {
                urlProducer(page * 1 + 1)
              }}
            />
            <Pagination.Last
              onClick={(e) => {
                urlProducer(Math.floor(products.length / 5))
              }}
            />
          </Pagination>
        </Container>
      </div>
    )
  }
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
    load: (sortBy = 'AtoZ', page = 1, userId) => {
      dispatch(getProducts('load', sortBy, page))
      dispatch(getOrder(userId))
    },

    loadProduct: (id, push) => {
      dispatch(getProduct(id, push))
    },
    loadPages: async (page, push) => {
      await dispatch(loadPage(page, push))
    },
    loadSession: (sortBy, page) => {
      dispatch(getProducts('load', sortBy, page))
      dispatch(getSessionCart())
    },
  }
}

// function setCookie(name, valu, days) {
//   var date = new Date()
//   date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
//   var expires = ';expires=' + date.toGMTString()
//   document.cookie = name + '=' + value + expires
// }
// function getParam(p) {
//   var match = RegExp('[?&]' + p + '=([^&])').exec(window.location.search)
//   return match && decodeURIComponent(match[1].replace(/\+/g, ''))
// }
// var params=getParam(myparam);
// if((myparam){
//   setCookie('mycookie',paramVal,90)
// })
// console.log(params)

export default connect(mapState, mapDispatch)(Products)
