import React, {Component} from 'react'
import {connect} from 'react-redux'
import DisplaySearch from './DisplaySearch'
import {Route, Link} from 'react-router-dom'
import {getSearchProducts} from '../store/searchItem'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import {Container, Row, Col} from 'react-bootstrap'

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

    this.setState({searchOutput: searchList})
    return searchList
  }
  render() {
    const {searchInput, searchOutput} = this.state
    const {history} = this.props

    return (
      <Form
        inline
        onSubmit={(e) => {
          e.preventDefaulte()
        }}
      >
        <FormControl
          className="mr-sm-2"
          value={searchInput}
          type="text"
          placeholder="search"
          onChange={(ev) => {
            this.setState({searchInput: ev.target.value})
          }}
        />

        <Link to="/displaysearch">
          <Button
            onClick={() => {
              let searchResults = this.search()
              //console.log(history)
              this.props.sendSearch(searchResults)
            }}
          >
            search
          </Button>
        </Link>
      </Form>
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
    sendSearch: (searchResults) => {
      dispatch(getSearchProducts(searchResults))
    },
  }
}
export default connect(mapState, mapDispatch)(Search)
