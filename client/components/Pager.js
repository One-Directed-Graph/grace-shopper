import Pagination from 'react-bootstrap/Pagination'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProducts} from '../store'
import {getPages, arrayMaker} from './helpers'

class Pager extends Component {
  constructor() {
    super()
    this.state = {
      page: 1,
      category: 'all',
    }
  }

  componentDidMount() {
    // console.log('HEREHEREHEREHEREHEREHERE', this.props)
  }

  urlProducer = (category, p) => {
    console.log('IN URL PRODUCER - PROPS', category, p)
    let pe = p || 1
    this.props.history.push(`/products/${category}/${pe}`)
  }

  render() {
    const {urlProducer} = this
    const {page, category} = this.state
    const productArr = arrayMaker(category, this.props)
    const pages = getPages(page, productArr)
    return (
      <Pagination>
        <Pagination.First
          onClick={() => {
            urlProducer(category, 1)
          }}
        />
        <Pagination.Prev
          onClick={(e) => {
            urlProducer(category, page * 1 - 1)
          }}
        />

        {pages.map((pageNumber, ind) => {
          return (
            <Pagination.Item
              key={ind}
              onClick={() => {
                urlProducer(category, ind + 1)
              }}
            >
              {ind + 1}
            </Pagination.Item>
          )
        })}

        <Pagination.Next
          onClick={(e) => {
            urlProducer(category, page * 1 + 1)
          }}
        />
        <Pagination.Last
          onClick={(e) => {
            urlProducer(category, Math.floor(productArr.length / 5))
          }}
        />
      </Pagination>
    )
  }
}

const mapState = ({products, categories}) => {
  return {
    products,
    categories,
  }
}

// const mapDispatch = (dispatch) => {
//   return {
//     load: () => {
//       dispatch(getProducts('load'))
//     },
//   }
// }

export default connect(mapState)(Pager)
