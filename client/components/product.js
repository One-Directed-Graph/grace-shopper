import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

//ASSIGNED TO: Aleks

class Product extends Component {
  constructor() {
    super()
  }
  render() {
    const {product} = this.props
    console.log('<>><><<><><><><>><><><><><><><><', product)
    if (product) {
      return (
        <div className="singleProduct">
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <div>price:${product.price}</div>
          <div>avalible amount:{product.quantity}</div>
          <img src={product.img}></img>
          {/* <div>category:{product.category.name}</div> */}
        </div>
      )
    }
  }
}

const mapState = ({product}) => {
  return {
    product,
  }
}
// const mapDispatch = (dispatch) => {
//   return {
//     load: () => {
//       dispatch(getProducts())
//     },
//     loadProduct: (id) => {
//       dispatch(getProduct(id))
//     },
//   }
// }

// export default connect(mapState, mapDispatch)(Products)
export default connect(mapState)(Product)
