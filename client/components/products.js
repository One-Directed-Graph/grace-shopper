import React, {Component} from 'react'
import {Link} from 'react-router-dom'
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
import categories from '../store/categories'
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
    // console.log(
    //   'prevState.location.search.slice(8)',
    //   prevProp.location.search.slice(8),
    //   queryString.parse(this.props.location.search).sortBy,
    //   prevProp.products[0].id,
    //   //products[0].id,
    //   push,
    //   'prevstate:',
    //   prevState
    // )
    if (sortBy !== prevProp.location.search.slice(8)) {
      //push(`/products/${page}?sortBy=${sortBy}`)
      this.props.load('do nothing', sortBy, page, push)
    }
  }
  // componentWillMount() {
  //   const script = document.createElement('script')
  //   script.src = '/js/scripts.js'
  //   script.async = true
  //   document.body.appendChild(script)
  // }
  // componentWillUnmount() {
  //   var scripts = document.getElementsByTagName('script')
  //   console.log(scripts)
  //   for (var i = scripts.length; i--; ) {
  //     if (scripts[i].title == 'aleks') {
  //       scripts[i].parentNode.removeChild(scripts[i])
  //     }
  //   }
  //   // script.parentNode.removeChild(theScript)
  // }

  componentDidMount() {
    // let scriptChecker = () => {
    //   let title = 'aleks'
    //   var scripts = document.getElementsByTagName('script')
    //   console.log(scripts)
    //   for (var i = scripts.length; i--; ) {
    //     if (scripts[i].title == title) {
    //       return
    //     }
    //   }
    // const script = document.createElement('script')

    // script.async = true
    // script.defer = true
    // script.title = 'aleks'
    // script.src = '/js/scripts.js'

    // document.body.appendChild(script)
    //}

    //scriptChecker()
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
      this.props.loadSession('do nothing', sortBy, page, push)
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
    const {products, divided, user, categories} = this.props
    const push = this.props.history.push
    const page = this.props.match.params.page
    const sortBy = queryString.parse(this.props.location.search).sortBy
    getPages(page, products)
    //console.log('hello hello', productsToDisplay, 'sortby:', sortBy, products)
    return (
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <div className="row align-items-center mb-4 pb-1">
                <div className="col-12">
                  <div className="product_header">
                    <div className="product_header_left"></div>
                    <div className="product_header_right">
                      <div className="custom_select">
                        <select
                          className="form-control form-control-sm"
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
                          <option value="Categories">Categories</option>
                          <option value="LowToHigh">LowToHigh</option>
                          <option value="HighToLow">HighToLow</option>
                          <option value="AtoZ">AtoZ</option>
                          <option value="ZtoA">ZtoA</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row shop_container">
                {getPages(page, products).map((prod) => {
                  return (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      history={this.props.history}
                    />
                  )
                })}
              </div>
              <div className="row">
                <div className="col-12">
                  <ul className="pagination mt-3 justify-content-center pagination_style1">
                    <li className="page-item">
                      <Link
                        className="page-link"
                        to="#"
                        onClick={(e) => {
                          if (page * 1 > 1) {
                            urlProducer(page * 1 - 1)
                          }
                          if (page == 1) {
                            urlProducer(5)
                          }
                        }}
                      >
                        <i className="linearicons-arrow-left"></i>
                      </Link>
                    </li>
                    {[...Array(Math.floor(products.length / 5))].map(
                      (pageNumber, ind) => {
                        return (
                          <li
                            className={
                              ind + 1 == this.props.match.params.page
                                ? 'page-item active'
                                : 'page-item'
                            }
                            key={ind * Math.random()}
                          >
                            <Link
                              to="#"
                              className="page-link"
                              onClick={() => {
                                urlProducer(ind + 1)
                              }}
                            >
                              {ind + 1}
                            </Link>
                          </li>
                        )
                      }
                    )}
                    <li className="page-item">
                      <Link
                        className="page-link"
                        to="#"
                        onClick={(e) => {
                          if (page * 1 < Math.floor(products.length / 5)) {
                            urlProducer(page * 1 + 1)
                          }
                          if (page == Math.floor(products.length / 5)) {
                            urlProducer(1)
                          }
                        }}
                      >
                        <i className="linearicons-arrow-right"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 order-lg-first mt-4 pt-2 mt-lg-0 pt-lg-0">
              <div className="sidebar">
                <div className="widget">
                  <h5 className="widget_title">Mask Categories</h5>
                  <ul className="widget_categories">
                    {categories.map((cat) => {
                      return (
                        <li key={cat.id}>
                          <Link to={`/category/${cat.name}/1`}>
                            <span className="categories_name">{cat.name}</span>
                            <span className="categories_num">
                              {cat.products ? cat.products.length : ''}
                            </span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = ({products, divided, user, categories}) => {
  return {
    products,
    categories,
    divided,
    user,
    isLogedIn: !!user.id,
  }
}
const mapDispatch = (dispatch) => {
  return {
    load: (str, sortBy = 'AtoZ', page = 1, userId, push) => {
      //dispatch(getProducts(str, sortBy, page, push))
      //dispatch(getOrder(userId))
    },
    loadPages: (page, push) => {
      //dispatch(loadPage(page, push))
    },
    loadSession: (sortBy, page, push) => {
      // dispatch(getSessionCart())
      // dispatch(getProducts('load', sortBy, page, push))
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
