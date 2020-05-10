import {getProduct} from '../store/product'
import Product from './product'
import Search from './Search'
import {getCategories} from '../store/categories'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Pagination from 'react-bootstrap/Pagination'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import queryString from 'query-string'

class DisplayByCategory extends Component {
  render() {
    const push = this.props.history.push
    //const page = this.props.match.params.page
    //const sortBy = queryString.parse(this.props.location.search).sortBy
    const {products, categories} = this.props
    console.log('categorioes with products', this.props)
    const categoryToDisplay = categories.find((cat) => {
      return cat.name === this.props.match.params.category
    })
    console.log('categorytodisplay', categoryToDisplay.products)
    return (
      <div>
        <h2 align="center">{this.props.match.params.category}</h2>
        <div align="center" className="container">
          {categoryToDisplay
            ? categoryToDisplay.products.map((prod, ind) => {
                //console.log(prod)
                return (
                  <Card
                    key={prod.id}
                    className="text-center"
                    style={{width: '18rem', margin: '10px'}}
                  >
                    <Card.Img variant="top" src={prod.img} />
                    <Card.Body>
                      <Card.Title>{prod.title}</Card.Title>
                      <Card.Text>{prod.description}</Card.Text>
                      <Button
                        variant="success"
                        onClick={() => {
                          console.log('hello', prod.id)
                          this.props.loadProduct(
                            prod.id,
                            this.props.history.push
                          )
                        }}
                      >
                        Select Product
                      </Button>
                    </Card.Body>
                  </Card>
                )
              })
            : ''}
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

          {[...Array(Math.ceil(products.length / 5))].map((pageNumber, ind) => {
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
          })}

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
              this.props.loadPages(Math.ceil(products.length / divided.length))
            }}
          />
        </Pagination>
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
    loadProduct: (id, push) => {
      dispatch(getProduct(id, push))
    },
  }
}
export default connect(mapState, mapDispatch)(DisplayByCategory)
