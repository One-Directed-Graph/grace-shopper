import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadPage} from '../store/divided'
import {getProducts} from '../store/products'
import Container from 'react-bootstrap/Container'
import Pagination from 'react-bootstrap/Pagination'
import queryString from 'query-string'
import {getOrder, getSessionCart} from '../store'
import {getPages} from './paginationFunction'
import {withRouter} from 'react-router-dom'
import {ProductCard} from '.'
//ASSIGNED TO: Aleks

class Products extends Component {
  constructor() {
    super()
    this.urlProducer = this.urlProducer.bind(this)
  }
  componentDidUpdate(prevProp, prevState) {
    const {products} = this.props
    const push = this.props.history.push
    const page = this.props.match.params.page
    let sortBy

    if (queryString.parse(this.props.location.search).sortBy) {
      sortBy = queryString.parse(this.props.location.search).sortBy
    }
    // } else {
    //   sortBy = 'AtoZ'
    // }
    console.log(
      'prevState.location.search.slice(8)',
      prevProp.location.search.slice(8),
      queryString.parse(this.props.location.search).sortBy,
      prevProp.products[0].id,
      //products[0].id,
      push,
      prevState
    )
    if (sortBy !== prevProp.location.search.slice(8)) {
      //push(`/products/${page}?sortBy=${sortBy}`)
      this.props.load('do nothing', sortBy, page, push)
    }
  }

  componentDidMount() {
    const {user, isLogedIn} = this.props
    console.log('user from productssssss', user, isLogedIn)
    const sortBy =
      queryString.parse(this.props.location.search).sortBy || 'AtoZ'
    const page = this.props.match.params.page
    const push = this.props.history.push
    if (isLogedIn === true) {
      console.log('hello from true')
      this.props.load('do nothing', sortBy, page, user.id, push)
    }
    if (isLogedIn === false) {
      this.props.loadSession('do nothing', sortBy, page)
    }
  }

  urlProducer(p) {
    const push = this.props.history.push
    const sortBy = queryString.parse(this.props.location.search).sortBy
    let page = p

    push(`/products/${page}?sortBy=${sortBy}`)
    //this.props.loadPages(page)
  }

  render() {
    const {urlProducer} = this
    const {products, divided, user} = this.props
    const push = this.props.history.push
    const page = this.props.match.params.page
    const sortBy = queryString.parse(this.props.location.search).sortBy
    getPages(page, products)
    //console.log('hello hello', productsToDisplay, 'sortby:', sortBy, products)
    return (
      <div className="outsideOfContainer">
        <Container fluid>
          <div className="sortBlock">
            <select
              onChange={(ev) => {
                this.props.load(
                  'no results',
                  ev.target.value,
                  page,
                  user.id,
                  push
                )
                //push(`/products/${page}/?sortBy=${ev.target.value}`)
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
            {getPages(page, products).map((prod) => {
              return (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  history={this.props.history}
                />
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
    load: (str, sortBy = 'AtoZ', page = 1, userId, push) => {
      dispatch(getProducts(str, sortBy, page, push))
      //dispatch(getOrder(userId))
    },
    loadPages: (page, push) => {
      //dispatch(loadPage(page, push))
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
