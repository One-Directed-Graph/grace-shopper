import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, HashRouter, Route, Switch} from 'react-router-dom'
import {getUserList} from '../../../store/users'

class UserList extends Component {
  async componentDidMount() {
    //NOT WORKING
    console.log('id?', this.props.user.id)
    const id = this.props.user.id
    await this.props.load(id)
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.user.id !== this.props.user.id) {
      const id = this.props.user.id
      await this.props.load(id)
    }
  }

  render() {
    return <h3>User List</h3>
  }
}

const mapState = (state) => {
  console.log('in mapState', state)
  return state
}
const mapDispatch = (dispatch) => {
  return {
    load: (id) => dispatch(getUserList(id)),
  }
}

export default connect(mapState, mapDispatch)(UserList)
