import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="login_register_wrap section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-md-10">
            <div className="login_wrap">
              <div className="padding_eight_all bg-white">
                <div className="heading_s1">
                  <h3>{displayName}</h3>
                </div>
                <form onSubmit={handleSubmit} name={name}>
                  <div className="form-group" controlId="formBasicEmail">
                    <input
                      type="text"
                      required=""
                      className="form-control"
                      name="email"
                      placeholder="Your Email"
                    />
                  </div>
                  <div className="form-group" controlId="formBasicPassword">
                    <input
                      className="form-control"
                      required=""
                      type="password"
                      name="password"
                      placeholder={
                        name === 'login' ? 'Enter password' : 'Make password'
                      }
                    />
                  </div>

                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-fill-out btn-block"
                      name="login"
                    >
                      Log in
                    </button>
                  </div>
                  {error && error.response && (
                    <div> {error.response.data} </div>
                  )}
                </form>
                <div className="different_login">
                  <span> or</span>
                </div>
                <ul className="btn-login list_none text-center">
                  {/* <li>
                    <a href="#" className="btn btn-facebook">
                      <i className="ion-social-facebook"></i>Facebook
                    </a>
                  </li> */}
                  <li>
                    <Link to="/auth/google" className="btn btn-google">
                      <i className="ion-social-googleplus"></i>Google
                    </Link>
                  </li>
                </ul>
                <div className="form-note text-center">
                  {name === 'login'
                    ? "Don't Have an Account?"
                    : 'Go back to Login?'}{' '}
                  {name === 'login' ? (
                    <Link to="/signup">Sign up now</Link>
                  ) : (
                    <Link to="/login">Have account</Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    /////////////////////////////
    ////////////////////////////
    // <div id="auth-form-div">
    //   <Form id="auth-form" onSubmit={handleSubmit} name={name}>
    //     <Form.Group controlId="formBasicEmail">
    //       <Form.Row>
    //         <Form.Control
    //           size="sm"
    //           type="text"
    //           name="email"
    //           placeholder="Enter email"
    //         />
    //       </Form.Row>
    //     </Form.Group>

    //     <Form.Group controlId="formBasicPassword">
    //       <Form.Row>
    //         <Form.Control
    //           size="sm"
    //           type="text"
    //           name="password"
    //           placeholder={
    //             name === 'login' ? 'Enter password' : 'Make password'
    //           }
    //         />
    //       </Form.Row>
    //     </Form.Group>

    //     <Button variant="primary" type="submit" block>
    //       {displayName}
    //     </Button>

    //     {error && error.response && <div> {error.response.data} </div>}
    //   </Form>
    //   <a id="google" href="/auth/google">
    //     {displayName} with Google
    //   </a>
    //   {name === 'signup' && (
    //     <div>
    //       <p>
    //         Already have an account? <a href="/login">Click here!</a>
    //       </p>
    //     </div>
    //   )}
    // </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      console.log(evt)
      evt.persist()
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    },
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
}
