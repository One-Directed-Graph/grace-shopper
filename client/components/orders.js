import React, {Component} from 'react'
import {getOrders} from '../store'
import {connect} from 'react-redux'

class Orders extends Component {
  componentDidMount() {
    this.props.load()
  }
  render() {
    const {orders} = this.props
    console.log('orders yeyeyeyeyeyey', orders)
    return <hr />
  }
}

const mapState = ({orders}) => {
  return {
    orders,
  }
}
const mapDispatch = (dispatch) => {
  return {
    load: () => {
      dispatch(getOrders())
    },
  }
}
export default connect(mapState, mapDispatch)(Orders)
