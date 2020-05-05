import React from 'react'
import {connect} from 'react-redux'
import {getProduct} from '../store/product'

class DisplaySearch extends React.Component {
  render() {
    const {searchItem} = this.props
    console.log('searchitem from display page', searchItem)
    return (
      <div className="container">
        {searchItem > 0 ? (
          searchItem.map((prod) => {
            //console.log(prod)
            return (
              <div className="oneProduct" key={prod.id}>
                {/* <Link to={`/products/${prod.id}`}> */}
                <h3>{prod.title}</h3>
                <button
                  onClick={() => {
                    //console.log('hello', prod.id, this.props.history.push)
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
          })
        ) : (
          <h3>'No Results'</h3>
        )}
      </div>
    )
  }
}

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
