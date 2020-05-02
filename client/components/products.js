import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {getProducts} from '../store/products'
import {getProduct} from '../store/product'
import Product from './product'
import Search from './Search'
import {getCategories} from '../store/categories'

//ASSIGNED TO: Aleks

class Products extends Component {
  constructor(props) {
    let products = []

    if (props.products) {
      console.log('vwvwvwvwvwvwvwvwvwwvwvwvwvvw', props)
      products = props.products
    }
    super()
    this.state = {
      products: products,
    }
  }
  componentDidMount() {
    this.props.load()
  }
  sort(sortBy, products) {
    console.log('hello', sortBy, products, this.props.categories)
    if (sortBy === 'LowToHigh') {
      products.sort((a, b) => {
        return a.price - b.price
      })
    }
    if (sortBy === 'HighToLow') {
      products.sort((a, b) => {
        return b.price - a.price
      })
    }
    if (sortBy === 'Categories') {
      let returnArray = []
      for (let i = 0; i < this.props.categories.length; i++) {
        products.filter((prod) => {
          console.log('hello2', this.props.categories[i].id, i)
          if (prod.categoryId === this.props.categories[i].id) {
            console.log('prod', prod)
            returnArray.push(prod)
          }
        })
        console.log(products, 'product', returnArray)
      }
      products = returnArray
    }
    this.setState({products: products})
    console.log('hello', products)
  }
  render() {
    const {products, loadProduct, categories} = this.props
    //console.log('vwvwvwvwvwvwvwvwvwwvwvwvwvvw', this.state.props)
    //console.log(products)
    return (
      <div className="outsideOfContainer">
        <Search history={this.props.history} />
        <div className="sortBlock">
          <select
            onChange={(ev) => {
              this.sort(ev.target.value, products)
            }}
          >
            <option>Sort By</option>
            <option>Categories</option>
            <option>LowToHigh</option>
            <option>HighToLow</option>
          </select>
        </div>
        <div className="container">
          {this.state.products.map((prod) => {
            //console.log(prod)
            return (
              <div className="oneProduct" key={prod.id}>
                {/* <Link to={`/products/${prod.id}`}> */}
                <h3>{prod.title}</h3>
                <button
                  onClick={() => {
                    console.log('hello', prod.id)
                    this.props.loadProduct(prod.id, this.props.history.push)
                  }}
                >
                  select product
                </button>
                {/* </Link> */}
                <p>{prod.description}</p>
                <img src={prod.img} alt="image loading" />
                <div>{prod.price}</div>
              </div>
            )
          })}
          <br />
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
      dispatch(getProducts())
      dispatch(getCategories())
    },

    loadProduct: (id, push) => {
      dispatch(getProduct(id, push))
    },
  }
}

// export default connect(mapState, mapDispatch)(Products)
export default connect(mapState, mapDispatch)(Products)
