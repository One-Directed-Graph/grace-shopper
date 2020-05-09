import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Jumbotron from 'react-bootstrap/Jumbotron'

/**
 * COMPONENT
 */
const WelcomeUser = ({user}) => {
  const {email} = user
  const greetName = email.split('@')[0]

  return (
    <Jumbotron>
      <h2>Welcome back, {greetName}!</h2>
      <p>
        Check out all the available content in your account by clicking around!
      </p>
    </Jumbotron>
  )
}

/**
 * CONTAINER
 */

const mapState = ({user}) => ({user})

export default connect(mapState)(WelcomeUser)

/**
 * PROP TYPES
 */
