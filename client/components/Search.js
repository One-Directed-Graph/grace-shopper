import React, {Component} from 'react'
import {connect} from 'react-redux'
import DisplaySearch from './DisplaySearch'
import {Route} from 'react-router-dom'
import {getSearchProducts} from '../store/searchItem'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchInput: '',
      searchOutput: [],
    }
  }
  search = () => {
    const {products} = this.props
    const {searchInput, searchOutput} = this.state
    let titleLowCase = ''
    const searchList = products.filter((product) => {
      titleLowCase = product.title.toLowerCase()
      return titleLowCase.includes(searchInput)
    })
    //console.log(searchList)
    //this.state.searchOutput = searchList
    this.setState({searchOutput: searchList})
    return searchList
  }
  render() {
    const {searchInput, searchOutput} = this.state
    const {history} = this.props
    console.log('hfhfhdfhjdf', this.props.history)
    return (
      <div>
        <input
          value={searchInput}
          type="text"
          placeholder="search"
          onChange={(ev) => {
            this.setState({searchInput: ev.target.value})
          }}
        />
        <button
          onClick={() => {
            let searchResults = this.search()
            //console.log(history)
            this.props.sendSearch(searchResults, this.props.history.push)
          }}
        >
          search
        </button>
        <select>
          {searchOutput.map((prod) => {
            return <option key={prod.id}>{prod.title}</option>
          })}
        </select>
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
    sendSearch: (searchResults, push) => {
      dispatch(getSearchProducts(searchResults, push))
    },
  }
}
export default connect(mapState, mapDispatch)(Search)
