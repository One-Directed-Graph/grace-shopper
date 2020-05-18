import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {updateUser, removeUser} from '../../../store'

//TODO: Error handling
//TODO: Disable delete if user has order or reviews

/**
 * COMPONENT
 */

const UserUpdate = ({userToUpdate, handleChange, handleDelete, error}) => {
  const disabled = () => {
    if (userToUpdate.admin) return true
    if (userToUpdate.orders && userToUpdate.reviews) {
      if (userToUpdate.orders.length > 0 || userToUpdate.reviews.length > 0)
        return true
    }
  }

  return (
    <div id="user-update-form-div">
      <div id="user-udpdate-elements">
        <Form.Check
          inline
          type="checkbox"
          name="admin"
          label="Admin User"
          width={200}
          checked={userToUpdate.admin}
          onChange={(evt) => handleChange(userToUpdate, evt.target.name)}
        />
        <Form.Check
          inline
          type="checkbox"
          name="pwReset"
          label="Require Password Reset"
          width={200}
          checked={userToUpdate.pwReset}
          onChange={(evt) => handleChange(userToUpdate, evt.target.name)}
        />
        <Button
          inline="true"
          variant="danger"
          disabled={disabled()}
          onClick={() => handleDelete(userToUpdate.id)}
        >
          Delete User
        </Button>
      </div>
      {error && error.response && <div> {error.response.data} </div>}
    </div>
  )
}

/**
 * CONTAINER
 */

const mapState = null

const mapDispatch = (dispatch) => {
  return {
    handleChange(user, evtName) {
      console.log(`updating user ${user.id}`)
      const {id, admin, pwReset} = user
      const newValue = evtName === 'admin' ? !admin : !pwReset
      dispatch(updateUser({id, change: {[evtName]: newValue}}))
    },
    handleDelete(id) {
      console.log(`deleting user ${id}`)
      dispatch(removeUser(id))
    },
  }
}

export default connect(mapState, mapDispatch)(UserUpdate)

/**
 * PROP TYPES
 */
UserUpdate.propTypes = {
  userToUpdate: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  error: PropTypes.object,
}
