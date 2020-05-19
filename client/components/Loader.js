import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me, getCategories, getProducts} from '../store'
class Loader extends Component {
  componentDidMount() {
    this.props.load()
  }
  render() {
    return <hr />
  }
}

const mapState = (state) => {
  //console.log('statestatestate', state)
  const {user, order} = state
  //console.log('User: ', user)
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    // isLoggedIn: !!state.user.id,
    // isOrderIn: !!state.order || !!state.order,

    user,
  }
}

const mapDispatch = (dispatch) => {
  return {
    load: () => {
      dispatch(me())
      dispatch(getProducts('load'))
      dispatch(getCategories())
      //dispatch(getOrder(id))
      //dispatch(getItems())
    },
  }
}
export default connect(mapState, mapDispatch)(Loader)
