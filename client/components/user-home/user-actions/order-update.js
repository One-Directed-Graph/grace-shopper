import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
import {updateOrderStatus} from '../../../store'

/**
 * COMPONENT
 */

const OrderUpdate = ({orderToUpdate, handleChange, error}) => {
  const statuses = ['Processing', 'Cancelled', 'Shipped']
  const {id, status} = orderToUpdate
  const disabled = (status) => {
    if (status === 'Cancelled' || status === 'Shipped') return true
    return false
  }

  return (
    <div id="order-update-form-div">
      <div id="order-udpdate-elements"></div>
      <Form.Group controlId="OrderUpdate.status">
        <Form.Label>Status</Form.Label>
        <Form.Control
          as="select"
          name="status"
          value={status}
          disabled={disabled(status)}
          onChange={(evt) => {
            handleChange(id, evt.target.value)
          }}
        >
          {statuses.map((_status) => (
            <option key={_status} value={_status}>
              {_status}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
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
    handleChange(id, evtVal) {
      dispatch(updateOrderStatus({id, status: evtVal}))
    },
  }
}

export default connect(mapState, mapDispatch)(OrderUpdate)

/**
 * PROP TYPES
 */
OrderUpdate.propTypes = {
  orderToUpdate: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  error: PropTypes.object,
}
