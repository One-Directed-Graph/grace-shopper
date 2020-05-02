import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, HashRouter, Route, Switch} from 'react-router-dom'

class Orders extends Component {
  // componentDidMount(){
  //     this.props.load()
  // }

  render() {
    return <h3>My Orders</h3>
  }
}

const mapState = null
const mapDispatch = null

export default connect(mapState, mapDispatch)(Orders)
