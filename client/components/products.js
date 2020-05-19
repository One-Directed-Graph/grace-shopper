import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProducts} from '../store/products'
import Container from 'react-bootstrap/Container'
import queryString from 'query-string'
import {getOrder, getSessionCart} from '../store'
import {ProductCard, Pager} from '.'
import {getPages, arrayMaker} from './helpers'

class Products extends Component {
  constructor() {
    super()
    this.state = {
      category: 'all',
      productsArr: [],
    }
  }
  componentDidUpdate(prevProp, prevState) {
    console.log('IN DID UPDATE')
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
    // console.log(
    //   'prevState.location.search.slice(8)',
    //   prevProp.location.search.slice(8),
    //   queryString.parse(this.props.location.search).sortBy,
    //   prevProp.products[0].id,
    //   //products[0].id,
    //   push,
    //   prevState
    // )
    if (sortBy !== prevProp.location.search.slice(8)) {
      //push(`/products/${page}?sortBy=${sortBy}`)
      this.props.load('do nothing', sortBy, page, push)
    }

    // if (prevProp.match.params && this.props.match.params) {
    console.log('IN DID UPDATE - LOGIC')
    if (
      prevProp.match.params.category !== this.props.match.params.category ||
      prevProp.match.params.page !== this.props.match.params.page
    ) {
      const {category} = this.props.match.params
      const _page = this.props.match.params.page
      const arr = arrayMaker(category, this.props)
      console.log('IN DID UPDATE - SET STATE', page, category, arr)
      this.setState({
        productsArr: getPages(_page, arr),
      })
    }
    // }
  }

  componentDidMount() {
    console.log('IN DID MOUNT', this.props)
    const {user, isLogedIn} = this.props
    // console.log('user from productssssss', user, isLogedIn)
    const sortBy =
      queryString.parse(this.props.location.search).sortBy || 'AtoZ'
    const page = this.props.match.params.page
    const push = this.props.history.push
    if (isLogedIn === true) {
      // console.log('hello from true')
      this.props.load('do nothing', sortBy, page, user.id, push)
    }
    if (isLogedIn === false) {
      this.props.loadSession('do nothing', sortBy, page)
    }

    // if (this.props.match) {
    console.log('IN DID MOUNT - LOGIC', this.props.match.params)
    const {category} = this.props.match.params
    const arr = arrayMaker(category, this.props)
    console.log('IN DID MOUNT - SET STATE', category, arr)
    this.setState({
      productsArr: getPages(page, arr),
      category,
    })
    // }
  }

  urlProducer = (category, p) => {
    const push = this.props.history.push
    const sortBy = queryString.parse(this.props.location.search).sortBy
    let page = p

    push(`/products/${category}/${page}?sortBy=${sortBy}`)
    //this.props.loadPages(page)
  }

  render() {
    console.log('IN RENDER', this.props, this.state)
    const {urlProducer} = this
    // const {products, divided} = this.props
    const {category, productsArr} = this.state
    const push = this.props.history.push
    const page = this.props.match.params.page
    // console.log('AARRRAYYYYYY', productsArr)
    const sortBy = queryString.parse(this.props.location.search).sortBy
    // getPages(page, products)
    //console.log('hello hello', productsToDisplay, 'sortby:', sortBy, products)
    return (
      <div className="outsideOfContainer">
        <Container fluid>
          {/* <div className="sortBlock">
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
          </div> */}
          <div className="container">
            {productsArr.map((prod) => {
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
          <Pager history={this.props.history} />
        </Container>
      </div>
    )
  }
}

const mapState = ({products, categories, user}) => {
  return {
    products,
    categories,
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
