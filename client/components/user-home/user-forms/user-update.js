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
const UserUpdate = ({userToUpdate, handleChange, error}) => {
  return (
    <div id="user-update-form-div">
      <div id="user-udpdate-checkboxes">
        <Form.Check
          inline
          type="checkbox"
          name="admin"
          label="Admin"
          checked={userToUpdate.admin}
          onChange={(evt) => handleChange(userToUpdate, evt.target.name)}
        />
        <Form.Check
          inline
          type="checkbox"
          name="pwReset"
          label="Require Password Reset"
          checked={userToUpdate.pwReset}
          onChange={(evt) => handleChange(userToUpdate, evt.target.name)}
        />
      </div>
      {error && error.response && <div> {error.response.data} </div>}
    </div>
  )
}

/**
 * CONTAINER
 */

const mapState = (state) => {
  console.log('in user-update state', state)
  return {
    state,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleChange(user, evtName) {
      const {id, admin, pwReset} = user
      const newValue = evtName === 'admin' ? !admin : !pwReset
      dispatch(updateUser({id, change: {[evtName]: newValue}}))
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
