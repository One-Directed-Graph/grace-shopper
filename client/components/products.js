import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {getProducts} from '../store/products'
import {getProduct} from '../store/product'
import Product from './product'

//ASSIGNED TO: Aleks

class Products extends Component {
  componentDidMount() {
    this.props.load()
  }
  render() {
    const {products, loadProduct} = this.props
    //console.log(products)
    return (
      <div className="container">
        {products.map((prod) => {
          //console.log(prod)
          return (
            <div className="oneProduct" key={prod.id}>
              {/* <Link to={`/products/${prod.id}`}> */}
              <h3>{prod.title}</h3>
              <button
                onClick={() => {
                  console.log('hello', prod.id)
                  loadProduct(prod.id, this.props.history.push)
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
    )
  }
}

const mapState = ({products}) => {
  return {
    products,
  }
}
const mapDispatch = (dispatch) => {
  return {
    load: () => {
      dispatch(getProducts())
    },
    loadProduct: (id, push) => {
      dispatch(getProduct(id, push))
    },
  }
}

// export default connect(mapState, mapDispatch)(Products)
export default connect(mapState, mapDispatch)(Products)
