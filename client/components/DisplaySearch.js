import React from 'react'
import {connect} from 'react-redux'
import {getProduct} from '../store/product'
import {ProductCard} from '.'

class DisplaySearch extends React.Component {
  render() {
    const {searchItem} = this.props
    // console.log('search', this.props)
    return (
      <div>
        {searchItem.map((prod) => {
          return (
            <ProductCard
              key={prod.id}
              product={prod}
              history={this.props.history}
            />
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

export default connect(mapState)(DisplaySearch)
