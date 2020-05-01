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
  componentDidMount() {
    this.props.load()
  }
  render() {
    const {products, loadProduct, categories} = this.props
    //console.log(products)
    return (
      <div className="outsideOfContainer">
        <Search history={this.props.history} />
        <div className="container">
          <div className="sortBlock">
            <select>
              <option>Sort By</option>
              <option>By categories</option>
              <option>By Price</option>
            </select>
          </div>
          {products.map((prod) => {
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
