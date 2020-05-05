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

class DisplayByCategory extends Component {
  render() {
    const {categories} = this.props
    console.log('categorioes with products', this.props)
    const categoryToDisplay = categories.find((cat) => {
      return cat.name === this.props.match.params.category
    })
    // console.log('categorytodisplay', categoryToDisplay.products)
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
      </div>
    )
  }
}

const mapState = ({products, categories}) => {
  return {
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
