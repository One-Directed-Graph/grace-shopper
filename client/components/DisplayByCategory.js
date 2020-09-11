import Pagination from 'react-bootstrap/Pagination'
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getPages} from './paginationFunction'
import {withRouter} from 'react-router-dom'
import {getProducts} from '../store'
import {ProductCard} from '.'

class DisplayByCategory extends Component {
  constructor() {
    super()
    this.urlProducer = this.urlProducer.bind(this)
    this.displayProducer = this.displayProducer.bind(this)
  }

  urlProducer(p) {
    const push = this.props.history.push
    // console.log(push)
    let category = this.props.match.params.category

    let pe = p || 1
    this.props.history.push(`/category/${category}/${pe}`)
  }
  displayProducer() {
    let array = []
    let {categories} = this.props
    const page = this.props.match.params.page || 1
    let categoryToDisplay = categories.find((cat) => {
      // console.log(
      //   'hellloooooooooooo display categories i dispaly producer',
      //   cat.name,
      //   this.props.match.params.category
      // )
      return cat.name === this.props.match.params.category
    })
    if (categoryToDisplay) {
      array = [...categoryToDisplay.products]
    }
    const pagedCategory = getPages(page, array)
    return {pagedCategory, categoryToDisplay}
  }
  render() {
    const {urlProducer} = this
    const {pagedCategory, categoryToDisplay} = this.displayProducer()
    const page = this.props.match.params.page
    const {categories, products} = this.props
    // if (categoryToDisplay) {
    //   console.log(
    //     'hello in render dispaly categories',
    //     pagedCategory,
    //     categoryToDisplay.products.length
    //   )
    // }
    return (
      <div>
        <div>
          <h2 align="center">
            {this.props.match.params.category}(
            {categoryToDisplay ? categoryToDisplay.products.length : ''})
          </h2>
          <div align="center" className="container">
            {pagedCategory
              ? pagedCategory.map((prod, ind) => {
                  return (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      history={this.props.history}
                    />
                  )
                })
              : ''}
          </div>

          <div className="row shop_container">
            <div className="row">
              <div className="col-12">
                {categoryToDisplay ? (
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
                            urlProducer(
                              Math.ceil(categoryToDisplay.products.length / 6)
                            )
                          }
                        }}
                      >
                        <i className="linearicons-arrow-left"></i>
                      </Link>
                    </li>
                    {[
                      ...Array(
                        Math.ceil(categoryToDisplay.products.length / 6)
                      ),
                    ].map((pageNumber, ind) => {
                      return (
                        <li
                          className={
                            ind + 1 == this.props.match.params.page
                              ? 'page-item active'
                              : 'page-item'
                          }
                          key={ind}
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
                    })}
                    <li className="page-item">
                      <Link
                        className="page-link"
                        to="#"
                        onClick={(e) => {
                          if (page * 1 <= Math.ceil(products.length / 6)) {
                            urlProducer(page * 1 + 1)
                          }
                          if (
                            page ==
                            Math.ceil(categoryToDisplay.products.length / 6)
                          ) {
                            urlProducer(1)
                          }
                        }}
                      >
                        <i className="linearicons-arrow-right"></i>
                      </Link>
                    </li>
                  </ul>
                ) : (
                  ''
                )}
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
          {/* <Pagination>
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

            {categoryToDisplay
              ? [
                  ...Array(Math.floor(categoryToDisplay.products.length / 6)),
                ].map((pageNumber, ind) => {
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
                })
              : ''}

            <Pagination.Next
              onClick={(e) => {
                urlProducer(page * 1 + 1)
              }}
            />
            <Pagination.Last
              onClick={(e) => {
                urlProducer(Math.ceil(pagedCategory.length / 5))
              }}
            />
          </Pagination> */}
        </div>
      </div>
    )
  }
}

const mapState = ({products, categories}) => {
  return {
    products,
    categories,
  }
}

const mapDispatch = (dispatch) => {
  return {
    load: () => {
      dispatch(getProducts('load'))
    },
  }
}
export default connect(mapState, mapDispatch)(DisplayByCategory)
