import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, HashRouter, Route, Switch} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {updateUser, removeUser} from '../../../store'

/**
 * COMPONENT
 */
class UserUpdate extends Component {
  constructor() {
    super()
    this.state = {
      admin: false,
      pwReset: false,
    }
  }

  componentDidMount() {
    console.log('in user-update mount', this.props)
  }

  render() {
    const {admin, pwReset, handleSubmit, handleChange} = this.state
    return (
      <div id="user-update-form-div">
        <Form id="user-update-form" onSubmit={handleSubmit} name="user-update">
          <div id="user-udpdate-checkboxes">
            <Form.Check
              inline
              type="checkbox"
              name="admin"
              label="Admin"
              value={admin}
              onChange={handleChange}
            />
            <Form.Check
              inline
              type="checkbox"
              name="pwReset"
              label="Require Password Reset"
              value={pwReset}
              onChange={handleChange}
            />
          </div>
          <Button variant="primary" type="submit" block>
            Submit
          </Button>
          {/* {error && error.response && <div> {error.response.data} </div>} */}
        </Form>
      </div>
    )
  }
}

/**
 * CONTAINER
 */

const mapState = (state) => {
  console.log(state)
  return {
    state,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const id = this.props.id
      const admin = evt.target.admin.value
      const pwReset = evt.target.ppwReset.value
      dispatch(updateUser({id, change: {admin, pwReset}}))
    },
    handleChange(evt) {
      console.log(evt)
    },
  }
}

export default connect(mapState, mapDispatch)(UserUpdate)

/**
 * PROP TYPES
 */
// AuthForm.propTypes = {
//   name: PropTypes.string.isRequired,
//   displayName: PropTypes.string.isRequired,
//   handleSubmit: PropTypes.func.isRequired,
//   error: PropTypes.object,
// }
