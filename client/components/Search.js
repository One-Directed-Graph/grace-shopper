import React, {Component} from 'react'
import {connect} from 'react-redux'
import DisplaySearch from './DisplaySearch'
import {withRouter, Link} from 'react-router-dom'
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
  search(e) {
    //e.preventDefault()
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
  // componentDidMount() {
  //   const script = document.createElement('script')
  //   script.src = '/js/scripts.js'
  //   script.async = true
  //   document.body.appendChild(script)
  //   console.log('hello grom search')
  // }
  componentWillUnmount() {
    var scripts = document.getElementsByTagName('script')
    console.log(scripts)
    for (var i = scripts.length; i--; ) {
      if (scripts[i].title == 'aleks') {
        scripts[i].parentNode.removeChild(scripts[i])
      }
    }
    // script.parentNode.removeChild(theScript)
  }
  render() {
    const {searchInput, searchOutput} = this.state
    const {history} = this.props

    return (
      <div>
        <a
          href="javascript:void(0);"
          className="nav-link search_trigger"
          // onClick={() => {
          //   //console.log('scripts,/.,.,.,.,', scripts)

          //   const script = document.createElement('script')
          //   script.title = 'aleks'
          //   script.defer = true
          //   script.src = '/js/scripts.js'
          //   script.async = true
          //   document.body.appendChild(script)
          // }}
        >
          <i className="linearicons-magnifier"></i>
        </a>
        <div className="search_wrap">
          <span className="close-search">
            <i className="ion-ios-close-empty"></i>
          </span>
          <form
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <input
              type="text"
              placeholder="Search"
              className="form-control"
              id="search_input"
              value={this.state.searchInput}
              onChange={(ev) => {
                console.log(ev.target.value)
                this.setState({searchInput: ev.target.value})
                let searchResults = this.search(ev)
                this.props.sendSearch(searchResults)
                this.props.history.push('/displaysearch')
              }}
            />
            <Link to="/displaysearch">
              <button
                //type="submit"
                className="search_icon"
                onClick={(e) => {
                  let searchResults = this.search(e)
                  console.log(this.props.searchInput)
                  console.log(searchResults)
                  this.props.sendSearch(searchResults)

                  $('.search_wrap,.search_overlay').removeClass('open')
                  $('body').removeClass('search_open')
                }}
              >
                <i className="ion-ios-search-strong"></i>
              </button>
            </Link>
          </form>
        </div>
        <div className="search_overlay"></div>
      </div>
      // <Form
      //   inline
      //   onSubmit={(e) => {
      //     e.preventDefaulte()
      //   }}
      // >
      //   <FormControl
      //     className="mr-sm-2"
      //     value={searchInput}
      //     type="text"
      //     placeholder="search"
      //     onChange={(ev) => {
      //       this.setState({searchInput: ev.target.value})
      //     }}
      //   />

      //   <Link to="/displaysearch">
      //     <Button
      //       style={{backgroundColor: ' #38495e', border: 'none'}}
      //       onClick={() => {
      //         let searchResults = this.search()
      //         //console.log(history)
      //         this.props.sendSearch(searchResults)
      //       }}
      //     >
      //       search
      //     </Button>
      //   </Link>
      // </Form>
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
      console.log('from dispatch search result', searchResults)
      dispatch(getSearchProducts(searchResults))
    },
  }
}
export default withRouter(connect(mapState, mapDispatch)(Search))
