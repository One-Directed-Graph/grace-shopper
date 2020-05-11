import React, {Component} from 'react'
import {connect} from 'react-redux'

import {logout} from '../store'
import {loadPage} from '../store/divided'
import {getProducts} from '../store/products'
import {getProduct} from '../store/product'
import Product from './product'
import Search from './Search'
import {getCategories} from '../store/categories'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Pagination from 'react-bootstrap/Pagination'
import {lowToHigh} from '../store/products'
import {highToLow} from '../store/products'
import {Categories, aToz, zToa} from '../store/products'
import queryString from 'query-string'
//ASSIGNED TO: Aleks

class Products extends Component {
  constructor(props) {
    console.log('props', props)
    console.log('from props', queryString.parse(props.location.search))
    super()
  }
  //

  componentDidUpdate(prevState) {
    const push = this.props.history.push
    let sortBy

    if (queryString.parse(this.props.location.search).sortBy) {
      sortBy = queryString.parse(this.props.location.search).sortBy
    } else {
      sortBy = 'AtoZ'
    }
    const page = this.props.match.params.page || 1
    //sortBy === 'undefined' ? 'AtoZ' : sortBy
    if (prevState.location.search.slice(8) !== sortBy) {
      push(`/products/${page}?sortBy=${sortBy}`)
      this.props.load(sortBy, page)
    }
  }

  componentDidMount() {
    const sortBy = queryString.parse(this.props.location.search).sortBy

    const page = this.props.match.params.page || 1
    const push = this.props.history.push
    this.props.load(sortBy, page)
  }
  render() {
    const {products, divided} = this.props
    const push = this.props.history.push
    const page = this.props.match.params.page
    const sortBy = queryString.parse(this.props.location.search).sortBy
    return (
      <div className="outsideOfContainer">
        <Container fluid>
          <div className="sortBlock">
            <select
              onChange={(ev) => {
                push(`/products/${page}/?sortBy=${ev.target.value}`)
                //this.sort(ev.target.value)
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
                  <Card.Img variant="top" src={prod.img} />
                  <Card.Body>
                    <Card.Title>{prod.title}</Card.Title>
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
                push(`/products/${1}?sortBy=${sortBy}`)
                this.props.loadPages(1)
              }}
            />
            <Pagination.Prev
              onClick={(e) => {
                push(`/products/${page * 1 - 1}?sortBy=${sortBy}`)
                this.props.loadPages(page * 1 - 1)
              }}
            />

            {[...Array(Math.ceil(products.length / 5))].map(
              (pageNumber, ind) => {
                return (
                  <Pagination.Item
                    key={ind}
                    onClick={() => {
                      push(`/products/${ind + 1}?sortBy=${sortBy}`)
                      this.props.loadPages(ind + 1)
                    }}
                  >
                    {ind + 1}
                  </Pagination.Item>
                )
              }
            )}

            <Pagination.Next
              onClick={(e) => {
                push(`/products/${page * 1 + 1}?sortBy=${sortBy}`)
                this.props.loadPages(page * 1 + 1)
              }}
            />
            <Pagination.Last
              onClick={(e) => {
                push(
                  `/products/${Math.ceil(
                    products.length / divided.length
                  )}?sortBy=${sortBy}`
                )
                this.props.loadPages(
                  Math.ceil(products.length / divided.length)
                )
              }}
            />
          </Pagination>
        </Container>
      </div>
    )
  }
}

const mapState = ({products, divided}) => {
  return {
    products,
    divided,
  }
}
const mapDispatch = (dispatch) => {
  return {
    load: (sortBy = 'AtoZ', page = 1) => {
      dispatch(getProducts('load', sortBy, page))
    },

    loadProduct: (id, push) => {
      dispatch(getProduct(id, push))
    },
    loadPages: async (page, push) => {
      await dispatch(loadPage(page, push))
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
