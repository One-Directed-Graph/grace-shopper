import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {getProducts} from '../store/products'

//ASSIGNED TO: Aleks

class Products extends Component {
  componentDidMount() {
    this.props.load()
  }
  render() {
    const {products} = this.props
    console.log(products)
    return (
      <div className="container">
        {products.map((prod) => {
          console.log(prod)
          return (
            <div className="oneProduct">
              <h3>{prod.title}</h3>
              <p>{prod.description}</p>
              <img src="./ireland.jpg"></img>
            </div>
          )
        })}
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
  }
}

// export default connect(mapState, mapDispatch)(Products)
export default connect(mapState, mapDispatch)(Products)
