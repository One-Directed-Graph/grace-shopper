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
import {Categories, aTob} from '../store/products'

//ASSIGNED TO: Aleks

class Products extends Component {
  constructor(props) {
    super()
  }
  //   if (sortBy === 'Categories') {
  //     let returnArray = []
  //     for (let i = 0; i < this.props.categories.length; i++) {
  //       products.products.filter((prod) => {
  //         //console.log('hello2', this.props.categories[i].id, i)
  //         if (prod.categoryId === this.props.categories[i].id) {
  //           //console.log('prod', prod)
  //           returnArray.push(prod)
  //         }
  //       })
  //       console.log(products, 'product', returnArray)
  //     }
  //     products = returnArray
  //   }
  //   this.setState({products: products})
  //   console.log('hello', products)
  // }
  sort(sortBy) {
    const push = this.props.history.push
    const page = this.props.match.params.page
    if (sortBy === 'LowToHigh') {
      this.props.LowToHigh(page, push)
    }
    if (sortBy === 'HighToLow') {
      this.props.HighToLow(page, push)
    }
    if (sortBy === 'Categories') {
      this.props.sortCategories(page, push)
    }
    if (sortBy === 'AtoB') {
      this.props.AtoB(page, push)
    }
  }

  // componentDidUpdate(prevState) {
  //   console.log(
  //     '11111111111111',
  //     prevState.location.pathname,
  //     this.props.location.pathname
  //   )
  //   if (prevState.location.pathname === this.props.location.pathname) {
  //     this.props.history.push(this.props.location.pathname)
  //   }
  // }

  componentDidMount() {
    this.props.load()
  }
  render() {
    const {products, divided} = this.props
    const push = this.props.history.push

    return (
      <div className="outsideOfContainer">
        <Container>
          <div className="sortBlock">
            <select
              onChange={(ev) => {
                this.sort(ev.target.value)
              }}
            >
              <option>Sort By</option>
              <option>Categories</option>
              <option>LowToHigh</option>
              <option>HighToLow</option>
              <option>AtoB</option>
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
                this.props.loadPages(1, push)
              }}
            />
            <Pagination.Prev
              onClick={(e) => {
                this.props.loadPages(this.props.match.params.page * 1 - 1, push)
              }}
            />

            {[...Array(Math.ceil(products.length / 5))].map(
              (pageNumber, ind) => {
                return (
                  <Pagination.Item
                    key={ind}
                    onClick={() => {
                      this.props.loadPages(ind + 1, push)
                    }}
                  >
                    {ind + 1}
                  </Pagination.Item>
                )
              }
            )}

            <Pagination.Next
              onClick={(e) => {
                this.props.loadPages(this.props.match.params.page * 1 + 1, push)
              }}
            />
            <Pagination.Last
              onClick={(e) => {
                this.props.loadPages(
                  Math.ceil(products.length / divided.length),
                  push
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
    load: () => {
      dispatch(getProducts('load'))
    },

    loadProduct: (id, push) => {
      dispatch(getProduct(id, push))
    },
    loadPages: async (page, push) => {
      await dispatch(loadPage(page, push))
    },
    LowToHigh: async (page, push) => {
      await dispatch(lowToHigh())

      await dispatch(loadPage(page, push))
    },
    HighToLow: async (page, push) => {
      await dispatch(highToLow())
      await dispatch(loadPage(page, push))
    },
    sortCategories: async (page, push) => {
      await dispatch(Categories())
      await dispatch(loadPage(page, push))
    },
    AtoB: async (page, push) => {
      await dispatch(aTob())
      await dispatch(loadPage(page, push))
    },
  }
}

export default connect(mapState, mapDispatch)(Products)
