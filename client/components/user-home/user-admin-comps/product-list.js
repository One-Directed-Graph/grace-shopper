import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, HashRouter, Route, Switch} from 'react-router-dom'

class ProductList extends Component {
  // componentDidMount(){
  //     this.props.load()
  // }

  render() {
    return <h3 className="user-home-comps">Products</h3>
  }
}

const mapState = null
const mapDispatch = null

export default connect(mapState, mapDispatch)(ProductList)
