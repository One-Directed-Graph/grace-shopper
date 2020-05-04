import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, getProducts} from '../store'
import Search from './Search'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
// import Form from 'react-bootstrap/Form' -REMOVE?
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// import {render} from 'enzyme' - REMOVE?

class Navbarclass extends Component {
  constructor(props) {
    if (props.products.length > 0) {
      console.log('props from nav bar in constructor', props)
    }
    super()
  }
  componentDidMount() {
    this.props.load()
  }

  render() {
    const {handleClick, isLoggedIn, products} = this.props
    console.log('navbar', products)
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <img
            src="/images/backgroundAmblem.jpg"
            width="50"
            height="50"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
          <Navbar.Brand href="/">Maskerade</Navbar.Brand>
          {isLoggedIn ? (
            <div>
              <Navbar className="mr-auto">
                {/* The navbar will show these links after you log in */}
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link
                  href="#"
                  onClick={() => {
                    handleClick()
                  }}
                >
                  Logout
                </Nav.Link>
                <Nav.Link to="/products">Products</Nav.Link>
              </Navbar>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Navbar className="mr-auto">
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/signup">Sign Up</Nav.Link>
                <Nav.Link href="/products">Products</Nav.Link>
                <Navbar.Collapse className="justify-content-left">
                  <Container>
                    <Search className="" />
                  </Container>
                </Navbar.Collapse>
              </Navbar>
            </div>
          )}
        </Navbar>
        <div>
          <Container>
            <Row class="mx-auto">
              <Col>
                <Link to="/products">
                  <Image src="/images/manuPic3.jpeg" roundedCircle />
                </Link>
              </Col>
              <Col md="auto">
                <Link>
                  <Image src="/images/manuHMpic1.jpg" roundedCircle />
                </Link>
              </Col>
              <Col md="auto">
                <Link>
                  <Image src="/images/menuMed.jpeg" roundedCircle />
                </Link>
              </Col>
            </Row>
          </Container>
        </div>
        <hr />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  const {products} = state
  return {
    isLoggedIn: !!state.user.id,
    products,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick: () => {
      dispatch(logout())
    },
    load: () => {
      console.log('loading product data')
      dispatch(getProducts())
    },
  }
}

export default connect(mapState, mapDispatch)(Navbarclass)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  load: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
