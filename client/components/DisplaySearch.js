import React from 'react'
import {connect} from 'react-redux'
import {getProduct} from '../store/product'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class DisplaySearch extends React.Component {
  render() {
    const {searchItem} = this.props
    console.log('search', this.props)
    return (
      <div>
        {searchItem.map((product) => {
          return (
            <Card
              key={product.id}
              className="text-center"
              style={{width: '18rem', margin: '10px'}}
            >
              <Card.Img variant="top" src={product.img} />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                  Product Description: {product.description}
                </Card.Text>
                <Card.Text>Price: ${product.price}</Card.Text>
                <Card.Text>
                  Category Name: {product.category ? product.category.name : ''}
                </Card.Text>
                <Button
                  className="buttonInProduct"
                  variant="success"
                  onClick={() => {}}
                >
                  add to cart
                </Button>
                <Button
                  className="buttonInProduct"
                  variant="success"
                  onClick={() => {}}
                >
                  checkout
                </Button>
              </Card.Body>
            </Card>
          )
        })}
      </div>
    )
  }
}

//       <div className="container">
//         {searchItem ? (
//           searchItem.map((prod) => {
//             //console.log(prod)
//             return (
//               <div className="oneProduct" key={prod.id}>
//                 {/* <Link to={`/products/${prod.id}`}> */}
//                 <h3>{prod.title}</h3>
//                 <button
//                   onClick={() => {
//                     //console.log('hello', prod.id, this.props.history.push)
//                     this.props.loadProduct(prod.id, this.props.history.push)
//                   }}
//                 >
//                   select product
//                 </button>
//                 {/* </Link> */}
//                 <p>{prod.description}</p>
//                 <img src={prod.img} alt="image loading" />
//               </div>
//             )
//           })
//         ) : (
//           <h3>'No Results'</h3>
//         )}
//       </div>
//     )
//   }
// }

const mapState = ({searchItem}) => {
  return {
    searchItem,
  }
}
const mapDispatch = (dispatch) => {
  return {
    loadProduct: (id, push) => {
      dispatch(getProduct(id, push))
    },
  }
}
export default connect(mapState, mapDispatch)(DisplaySearch)
